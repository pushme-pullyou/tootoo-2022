// copyright 2021 Theo Armour. MIT license.
/* global COR, main, divMainContent, showdown, detNavMenu, sumNavMenu */
// jshint esversion: 6
// jshint loopfunc: true

const CKE = {};

CKE.base = "https://api.github.com/repos/theo-armour/qdata/contents/";
CKE.file = "apps/2022-new-tab/new-tab-content.htm";


CKE.init = function () {

	ClassicEditor
		.create( document.querySelector( '.editor' ), {

			licenseKey: '',

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

		} )

		.catch( error => {
			console.error( 'Oops, something went wrong!' );
			console.error( 'Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:' );
			console.warn( 'Build id: dgdeuqd4cpet-wmmf9tcepw2' );
			console.error( error );
		} );

	CKE.accessToken = localStorage.getItem( "githubAccessToken" ) || "";

	if ( CKE.accessToken === "null" || CKE.accessToken === "" ) {

		CKE.accessToken = prompt( "Enter GitHub Personal Access Token" );

		localStorage.setItem( "githubAccessToken", CKE.accessToken );

	}


	CKE.url = CKE.base + CKE.file;

	CKE.requestFile();

	window.addEventListener( "beforeunload", CKE.checkForChange );

};



CKE.requestFile = function () {
	//console.log( "CKE.hash ", CKE.hash );

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

	//console.log( "xhr", xhr );
	CKE.content = atob( xhr.target.response.content );

	CKE.editor.data.set( CKE.content );

	CKE.contentEditor = CKE.editor.data.get();

	spnMessage.innerText = `Get ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ CKE.contentEditor.length }`;

};




//////////

CKE.getSha = function () {

	if ( CKE.url === "" ) { alert( "No URL" ); return; }

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

	//console.log( "file", CKE.url.split( "/" ).pop() );

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
