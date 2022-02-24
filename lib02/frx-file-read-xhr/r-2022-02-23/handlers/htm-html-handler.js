// copyright 2021 Theo Armour. MIT license.
/* global THREE, COR */
// jshint esversion: 6
// jshint loopfunc: true

HTM = {};

HTM.src = FRX.urlLoaders;

HTM.handle = function () {

	if ( FRX.file ) { console.log( "file", FRX.file.name ); HTM.read(); return; }

	if ( FRX.url ) { console.log( "url", FRX.url.split( "/" ).pop() ); HTM.onChange(); return; }

	if ( FRX.content ) { console.log( "zip", FRX.zipFileName ); HTM.checkLoader(); return; }

};



HTM.read = function () {

	HTM.readFile();

};



HTM.readFile = function () {

	const reader = new FileReader();
	reader.onload = ( event ) => HTM.display( event.target.result );
	reader.readAsText( FRX.file );

};



HTM.onChange = function () {

	//HTM.request();

};

HTM.onLoad = function () {

	console.log( "", 23 );

	location.hash = "test-cases/text-to-hack.htm"


}

HTM.onChange = function () {

	console.log( "FRX.url", FRX.url );

	file = "../../../../lib02/cke-put-github/2022-02-22/cke-ckeditor.html";
	//file = "../../cke-put-github/2022-02-06/cke-put-github.html";

	divMainContent.innerHTML =
		`<iframe id=ifr onload=HTM.onLoad() src="${ file }" height=${ window.innerHeight } style="border:1px solid green;width:100%;" ></iframe>`;

};

HTM.ccconChange = function () {

	divMainContent.innerHTML =
		`<iframe src="${ FRX.url }" height=${ window.innerHeight } style="border:none;width:100%;" ></iframe>`;

};

HTM.checkLoader = function () {

	HTM.display();

};



HTM.request = function () {

	const xhr = new XMLHttpRequest();
	xhr.open( "get", FRX.url, true );
	xhr.onload = () => { HTM.display( xhr.responseText ); };
	xhr.send( null );

	return;

};



HTM.display = function ( content = FRX.content ) {

	//console.log( "url display", url );

	divMainContent.innerHTML = `
<div style="border:0px solid red; margin: 0 auto; padding: 0 1rem; max-width: 40rem;" >
	${ content }
</div>`;

};



HTM.handle();