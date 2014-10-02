/* page linking to this script MUST feature the sSelTab variable for the TAB functions to work properly*/
var sSelTab;

function getForm(f){return document.forms[f];}

function showTabForm(tab) {
	sSelTab = (tab == '')?'Journal':tab;
	hideTab('Book');
	hideTab('Dissertation');
	hideTab('Patent');
	hideTab('Journal');
	showTab(sSelTab);
}

function hideTab(tab) {document.getElementById(tab+'tab').className = 'RefinerTabInactive';}
function showTab(tab) {document.getElementById(tab+'tab').className = 'RefinerTabActive';}
function tabOver(tab){if(tab != sSelTab) document.getElementById(tab+'tab').className = 'RefinerTabHover'}
function tabOut(tab){if(tab != sSelTab) document.getElementById(tab+'tab').className = 'RefinerTabInactive'}
function setTarget(f){f.target = (window.parent.document.getElementById('CitationResults'))?'_parent':'_self';}

function submitFormAsHyperlink(f,v,s,l){
	f = getForm(f);
	var getStr ='?SS_Page=refiner&SS_RefinerEditable=yes';
		
	for(i=0;i<f.elements.length;i++)
		if(f.elements[i].value != '' 
			&& f.elements[i].name != 'SS_ReferentFormat'
			&& f.elements[i].name != 'url_ver')getStr += '&' + f.elements[i].name + '=' + encodeURIComponent(f.elements[i].value);
	
	getStr += '&SS_ReferentFormat=' + v + '&SS_formatselector=radio';
	//getStr += (s)?'radio':'tabs';
	//if (cssShown) getStr += '&cssShown=' + cssShown;
	window.location.href = getStr;
}

//document.getElementById(tab + 'tab').setAttribute('class', 'RefinerTabInactive');
