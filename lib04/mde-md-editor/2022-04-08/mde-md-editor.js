// copyright 2021 Theo Armour. MIT license.
/* global COR, main, divMainContent, showdown, detNavMenu, sumNavMenu */
// jshint esversion: 6
// jshint loopfunc: true

const MDE = {};


MDE.init = function () {

	MDE.base = `https://api.github.com/repos/${ COR.user }/${ COR.repo }/contents/`;
	MDE.file = COR.defaultFile;
	MDE.url = MDE.base + MDE.file;
	//MDE.url = url || MDE.url;
	//console.log( "url", MDE.url);

	MDE.source = `https://github.com/${ COR.user }/${ COR.repo }/blob/${ COR.branch }/`;


	MDE.accessToken = localStorage.getItem( "githubAccessToken" ) || "";

	if ( MDE.accessToken === "null" || MDE.accessToken === "" ) {

		MDE.accessToken = prompt( "Enter GitHub Personal Access Token" );

		localStorage.setItem( "githubAccessToken", MDE.accessToken );

	}

	window.addEventListener( "hashchange", MDE.onHashChange, false );

	window.addEventListener( "beforeunload", MDE.checkForChange );

};



MDE.onHashChange = function () {

	if ( MDE.editorData !== undefined ) {

		//console.log( "equal", MDE.editor.data.get() === MDE.editorData );

		if ( MDE.editor.getData() !== MDE.editorData ) {

			const response = confirm( "Changes you made may not be saved. Click OK to proceed without saving" );

			if ( response !== true ) { return; }

		}

	}

	MDE.file = location.hash ? location.hash.slice( 1 ) : MDE.file;

	MDE.url = location.hash ? MDE.base + MDE.file : MDE.url;

	aSource.href = MDE.source + MDE.file;

	MDE.fileName = MDE.url.split( "/" ).pop();

	spnTitle.innerText = MDE.fileName.split( "/" ).pop().split( "." ).shift();

	console.log( "file", MDE.fileName );

	MDE.requestFile();

};



MDE.requestFile = function () {
	//console.log( "MDE.url ", MDE.url );

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", MDE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + MDE.accessToken );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = MDE.onLoad;
	xhr.send( null );

};



MDE.onLoad = function ( xhr ) {

	https://developer.mozilla.org/en-US/docs/Web/API/btoa

	MDE.responseContent = atob( xhr.target.response.content );

	chkAutoSave.checked = true;

	if ( MDE.url.endsWith( "htm" ) ) {

		divMainContent.hidden = false;

		divOther.hidden = true;

		divMainContent.innerHTML = MDE.responseContent;


	} else {

		divMainContent.hidden = true;

		divOther.hidden = false;

		divOther.innerText = MDE.responseContent;

	}

	spnMessage.innerText = `Get ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ MDE.responseContent.length }`;

	MDE.autoSave()
};



MDE.autoSave = function () {

	if ( chkAutoSave.checkedd ) {

		MDE.saveInterval = setInterval( MDE.getSha, 5000 ); // in ms

	} else {

		clearInterval( MDE.saveInterval );

	}

};



//////////

MDE.getSha = function () {

	if ( MDE.url === "" ) { alert( "No URL" ); return; }

	if ( divOther.hidden ) {

		if ( MDE.editorData.length === MDE.editor.data.get().length ) return;

	} else {

		if ( divOther.innerText.length === MDE.responseContent.length ) return;

	}

	console.log( "saving" );

	const xhr = new XMLHttpRequest();
	xhr.open( "GET", MDE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + MDE.accessToken );
	xhr.responseType = "json";
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.onload = ( xhr ) => {
		//console.log( "", xhr );
		MDE.sha = xhr.target.response.sha;
		MDE.putFile();
	};
	xhr.send( null );

};



MDE.putFile = function () {

	if ( divOther.hidden ) {

		MDE.editorData = MDE.editor.data.get();

	} else {

		MDE.editorData = divOther.innerText;

	}


	//console.log( "MDE.editorData.length", MDE.editorData.length );

	text = new TextEncoder( "utf-8" ).encode( MDE.editorData );

	console.log( "text", text );
	const codedData = window.btoa( MDE.editorData ); // encode the string

	const body =  JSON.stringify( {
		"branch": MDE.branch,
		"content": codedData,
		"message": `add to file`,
		"sha": MDE.sha

	} );

	xhr = new XMLHttpRequest();
	xhr.open( "PUT", MDE.url, true );
	xhr.setRequestHeader( "Authorization", "token " + MDE.accessToken );
	xhr.setRequestHeader( "Content-Type", "application/json" );
	xhr.onerror = ( xhr ) => console.log( "error:", xhr );
	//xhr.onprogress = ( xhr ) => console.log( "bytes loaded:", xhr.loaded );
	xhr.send( body );

	spnMessage.innerText = `Put ${ new Date().toLocaleString().split( "," ).pop().slice( 1, -3 ) } ${ MDE.editorData.length }`;

};



MDE.checkForChange = function ( event ) {

	if ( MDE.editor.data.get() === MDE.editorData ) { return; }

	if ( MDE.editorData === divOther.innerText ) { return; }

	console.log( "file", MDE.url.split( "/" ).pop() );

	event.preventDefault();

	event.returnValue = "";

};



MDE.onKeyUp = function ( event ) {

	//console.log( "key", event.keyCode );

	event.preventDefault();

	if ( event.altKey && event.keyCode === 83 ) {

		MDE.getSha();

	}

};


