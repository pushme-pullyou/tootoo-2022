// copyright 2021 Theo Armour. MIT license.
/* global COR, main, divMainContent, showdown, detNavMenu, sumNavMenu */
// jshint esversion: 6
// jshint loopfunc: true

const CKE = {};


CKE.defaultBase = "https://api.github.com/repos/theo-armour/qdata/contents/";
CKE.defaultFile = "snippets/notes.htm";
CKE.url = CKE.defaultBase + CKE.defaultFile;
CKE.content = divMainContent;


CKE.init = function ( url ) {

	//console.log( "url", url);

	ClassicEditor
		.create( document.querySelector( '.editor' ), {

			licenseKey: "",

			htmlSupport: {
				allow: [
					{
						name: /.*/,
						attributes: true,
						classes: true,
						styles: true
					}
				]
			}

		} )

		.then( editor => {
			CKE.editor = editor;

			CKE.onHashChange();

			CKE.autoSave();

		} )

		.catch( error => {
			console.error( 'Oops, something went wrong!' );
			console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
			console.warn( 'Build id: dgdeuqd4cpet-wmmf9tcepw2' );
			console.error( error );
		} );

	CKE.url = url || CKE.url;

	CKE.accessToken = localStorage.getItem( "githubAccessToken" ) || "";

	if ( CKE.accessToken === "null" || CKE.accessToken === "" ) {

		CKE.accessToken = prompt( "Enter GitHub Personal Access Token" );

		localStorage.setItem( "githubAccessToken", CKE.accessToken );

	}

	window.addEventListener( "hashchange", CKE.onHashChange, false );

	window.addEventListener( "beforeunload", CKE.checkForChange );

};



CKE.onHashChange = function () {

	if ( CKE.contentEditor !== undefined ) {

	  //console.log( "equal", CKE.editor.data.get() === CKE.contentEditor );

		if ( CKE.editor.data.get() !== CKE.contentEditor ) {

			const response = confirm( "Changes you made may not be saved. Click OK to proceed without saving" );

			if ( response !== true ) { return; }

		}

	}

	CKE.url = location.hash ? CKE.defaultBase  + location.hash.slice( 1 ) : CKE.url;

	CKE.fileName = CKE.url.split( "/" ).pop();
	console.log( "file", CKE.fileName );

	CKE.requestFile();

};



CKE.requestFile = function () {
	//console.log( "CKE.url ", CKE.url );

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", CKE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + CKE.accessToken );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = CKE.onLoad;
	xhr.send( null );

};



CKE.onLoad = function ( xhr ) {

	CKE.content = atob( xhr.target.response.content );

	CKE.editor.data.set( CKE.content );

	CKE.contentEditor = CKE.editor.data.get();

	spnMessage.innerText = `Get ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ CKE.contentEditor.length }`;

};



CKE.autoSave = function () {

	if ( chkAutoSave.checked ) {

		CKE.saveInterval = setInterval( CKE.getSha, 5000 ); // in ms

	} else {

		clearInterval( CKE.saveInterval );

	}

};



//////////

CKE.getSha = function () {

	if ( CKE.url === "" ) { alert( "No URL" ); return; }

	if ( CKE.contentEditor.length === CKE.editor.data.get().length ) return;

	CKE.contentEditor = CKE.editor.data.get();

	console.log( "saving" );

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", CKE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + CKE.accessToken );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = ( xhr ) => {
		//console.log( "", xhr );
		CKE.sha = xhr.target.response.sha;
		CKE.putFile();
	};
	xhr.send( null );

};



CKE.putFile = function () {

	CKE.contentEditor = CKE.editor.data.get();
	//console.log( "CKE.contentEditor.length", CKE.contentEditor.length );

	const codedData = window.btoa( CKE.contentEditor ); // encode the string

	const body = JSON.stringify( {
		"branch": CKE.branch,
		"content": codedData,
		"message": `add to file`,
		"sha": CKE.sha

	} );

	xhr = new XMLHttpRequest();
	xhr.open( "PUT", CKE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + CKE.accessToken );
	xhr.setRequestHeader( "Content-Type", "application/json" );
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.send( body );

	spnMessage.innerText = `Put ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ CKE.contentEditor.length }`;

};



CKE.checkForChange = function ( event ) {

	if ( CKE.editor.data.get() === CKE.contentEditor ) { return; }

	console.log( "file", CKE.url.split( "/" ).pop() );

	event.preventDefault();

	event.returnValue = "";

};



CKE.onKeyUp = function ( event ) {

	//console.log( "key", event.keyCode );

	event.preventDefault();

	if ( event.altKey && event.keyCode === 83 ) {

		CKE.getSha();

	}

};


