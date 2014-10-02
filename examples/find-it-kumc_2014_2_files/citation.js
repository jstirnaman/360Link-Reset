window.onload = setAnchorProperties;

function renameResElements(n){
	if(n == 0){ //n = cssShown
		if (!document.getElementsByClassName) return;
		citationlabels = document.getElementsByClassName("CitationLabel");
		citations = document.getElementsByClassName("CitationValue");
		results = document.getElementsByClassName("ResultsRow");
		
		for (i=0; i<citations.length; i++) citations[i].className='res';
		for (i=0; i<citationlabels.length; i++) citationlabels[i].className='res';
		for (i=0; i<results.length; i++) results[i].className='c1';
	}
}

function switchCSS(f){
	cssShown = f;
	document.getElementById("borderCSS").href = 'http://intranet.sersol.il.pqe/products/al/mgh/mockups/client/frame' + f + '.css';
}

function divShowHide(show,hide){
	document.getElementById(show).style.display="block";
	document.getElementById(hide).style.display="none";
}

function changeClass(id, newClassName) {
   if (document.getElementById(id)) {
      element = document.getElementById(id);
      element.className = newClassName;
   }
}

function showHide(id) {
   if (document.getElementById(id)) {
      element = document.getElementById(id);
      element.style.display = element.style.display=='none' || element.style.display ==''?'block':'none';
   }
} 


function removeText(id) {
   element = document.getElementById(id);
   if (element != null) {
      element.innerHTML = "";
   }
}

function setAnchorProperties() {
	if (!document.getElementsByTagName) return;
	anchors = document.getElementsByTagName("a");
	for (i=0; i<anchors.length; i++) {
		var anchor = anchors[i];
		if (anchor.getAttribute("href") && anchor.getAttribute("rel") == "external") anchor.target = "_blank";
		if (document.all && anchor.className == 'AnchorButton') anchor.style.width = "150px";
	}
}

function formNewWin(f){
	f.target="ssNewWin";
	newWin = setNewWin('800','600','ssNewWin','');
	f.onsubmit = newWin;
	f.submit();
}

function getForm(f){
	return document.forms[f];
}	
	
function localFocus(){
	var elem = document.getElementById("SS_CFocusTag");
	if(elem)elem.focus();
}

function openNewWin(){			
	newWin = setNewWin('500','500','popup','');
	newWin.document.open();
	var sOutput = '<html xmlns="http://www.w3.org/1999/xhtml"> <title>Get Article Linker URL</title>';
	sOutput += '<style> div.headtext {font-family:verdana; color:#243A57; font-size:14px; font-weight:bold} div.urlstring {font-family:verdana; color:#243A57; font-size:11px} div.text1 {font-family:verdana; color:white ; font-size:11px; text-align:right}  </style>';
	sOutput += '<body bgcolor="#243A57"> ';
	sOutput += '  <table bgcolor="#ffffff"><tr><td>  ';
	sOutput += '<td border="1">';			
	sOutput += '<img src="http://www.lib.montana.edu/icons/home_01.jpg" /></td>';
	sOutput += '<td>&#160;</td><td>';
	sOutput += '<div class="headtext"><br />To share this Article Linker page, copy the URL below: </div>';
	sOutput += '<br />';			
	sOutput += '<div class="urlstring">';
	sOutput += location.href;
	sOutput += '<br /></div>';
	sOutput += ' </td></tr></table>';
	newWin.document.write(sOutput);
	newWin.document.close(); 
}

function setNewWin(w,h,name,loc){
	window.open(loc, name, w+','+h+",location=yes,scrollbars=yes,menubars=yes,toolbars=yes,resizable=yes").focus();
}

function writeRefiner(div){
	document.getElementById(div).innerHTML = '<iframe src="refiner_iframe.html" marginwidth="0" marginheight="0" width="100%" height="550" frameborder="0" scrolling="no" class="Refiner"> </iframe>';
}

