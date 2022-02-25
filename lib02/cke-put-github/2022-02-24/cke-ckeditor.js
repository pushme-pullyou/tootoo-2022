// copyright 2021 Theo Armour. MIT license.
/* global COR, main, divMainContent, showdown, detNavMenu, sumNavMenu */
// jshint esversion: 6
// jshint loopfunc: true

const CKE = {};

//CKE.base = "https://api.github.com/repos/pushme-pullyou/tootoo-2022/contents/";
//CKE.file = "test-cases/text-to-hack.htm";
//CKE.source = "https://github.com/pushme-pullyou/tootoo-2022/blob/main/";
//CKE.defaultFile = "README.md";


CKE.init = function ( url ) {

	CKE.base = `https://api.github.com/repos/${ COR.user }/${ COR.repo }/contents/`;
	CKE.file = COR.defaultFile;
	CKE.url = CKE.base + CKE.file;
	CKE.url = url || CKE.url;
	//console.log( "url", url);

	CKE.source = `https://github.com/${ COR.user }/${ COR.repo }/blob/${ COR.branch }/`;

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


	CKE.accessToken = localStorage.getItem( "githubAccessToken" ) || "";

	if ( CKE.accessToken === "null" || CKE.accessToken === "" ) {

		CKE.accessToken = prompt( "Enter GitHub Personal Access Token" );

		localStorage.setItem( "githubAccessToken", CKE.accessToken );

	}

	window.addEventListener( "hashchange", CKE.onHashChange, false );

	window.addEventListener( "beforeunload", CKE.checkForChange );

};



CKE.onHashChange = function () {

	if ( CKE.editorData !== undefined ) {

		//console.log( "equal", CKE.editor.data.get() === CKE.editorData );

		if ( CKE.editor.data.get() !== CKE.editorData ) {

			const response = confirm( "Changes you made may not be saved. Click OK to proceed without saving" );

			if ( response !== true ) { return; }

		}

	}

	CKE.url = location.hash ? CKE.base + location.hash.slice( 1 ) : CKE.url;

	CKE.fileName = CKE.url.split( "/" ).pop();

	aSource.href = CKE.source + CKE.fileName;

	spnTitle.innerText = CKE.fileName.split( "/" ).pop().split( "." ).shift();

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

	CKE.responseContent = atob( xhr.target.response.content );

	chkAutoSave.checked = true;

	if ( CKE.url.endsWith( "htm" ) ) {

		divMainContent.hidden = false;

		divOther.hidden = true;

		CKE.editor.data.set( CKE.responseContent );

		CKE.editorData = CKE.editor.getData();


	} else {

		divMainContent.hidden = true;

		divOther.hidden = false;

		divOther.innerText = CKE.responseContent;

	}

	spnMessage.innerText = `Get ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ CKE.responseContent.length }`;

	CKE.autoSave()
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

	if ( divOther.hidden ) {

		if ( CKE.editorData.length === CKE.editor.data.get().length ) return;

	} else {

		if ( divOther.innerText.length === CKE.responseContent.length ) return;

	}

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

	if ( divOther.hidden ) {

		CKE.editorData = CKE.editor.data.get();

	} else {

		CKE.editorData = divOther.innerText;

	}


	//console.log( "CKE.editorData.length", CKE.editorData.length );

	const codedData = window.btoa( CKE.editorData ); // encode the string

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

	spnMessage.innerText = `Put ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ CKE.editorData.length }`;

};



CKE.checkForChange = function ( event ) {

	if ( CKE.editor.data.get() === CKE.editorData ) { return; }

	if ( CKE.editorData === divOther.innerText ) { return; }

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


