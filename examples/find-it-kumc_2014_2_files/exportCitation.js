//Export Citation javascript functions

var openId = null;

function exportArrowLinkSet(id){
	emailConfirmClose();
	if (openId == id) {
		hideExportOption(id);
		openId = null;
	}
	else {
		if (openId != null) {
			hideExportOption(openId);
		}
		showExportOption(id);
		openId = id;
	}
}

function showExportOption(id) {
	exportShowForm(id);
	exportSetArrow(id, true);
}

function hideExportOption(id) {
	exportHideForm(id);
	exportSetArrow(id, false);
}

function exportSetArrow(id, up) {
	var el = document.getElementById(id);
	var imgs = el.getElementsByTagName('img');
	if (up) {
		imgs[0].style.display = 'none';
	    imgs[1].style.display = 'inline';
	}
	else {
		imgs[0].style.display = 'inline';
	    imgs[1].style.display = 'none';
	}
}

function exportShowForm(id) {
	var formName = id + 'Form';
	var el = document.getElementById(formName);
	el.style.display = 'block';
	el.focus();
	
	// get the selected radio button in this form
	// and pass the value with id to toggleCitationStyles
	
	var radios = el.getElementsByTagName('input');
	var value;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].type === 'radio' && radios[i].checked) {
        	value = radios[i].value;    
        	break;           
        }
    }

	toggleCitationStyles(value, id);
	
}

function exportHideForm(id) {
	var formName = id + 'Form';
	var el = document.getElementById(formName);
	el.style.display = 'none';
}

function setExportActionValue(id, value) {
	var key = id + 'Buttons';
	var td = document.getElementById(key);
	var inputs = td.getElementsByTagName('input');
	var input = inputs[0];
	input.value = value;
}

function exportFormReset() {
	hideExportOption("exportCitation");
	openId = null;
}

function toggleCitationStyles(value, id) {
	if (value == 'directlytoflow' || value == 'refworks' || value == 'endnoteweb' || value == 'desktop' || value == 'saveasris') {
		hideCitationStyles(id);
	}
	else {
		showCitationStyles(id);
	}	
}

function hideCitationStyles(id) {
	var styleName = id + 'Styles';
	var styleDiv = document.getElementById(styleName);
	styleDiv.style.display = 'none';

	var headerName = id + 'Header';
	var headerDiv = document.getElementById(headerName);
	headerDiv.style.display = 'none';
}

function showCitationStyles(id) {
	var styleName = id + 'Styles';
	var styleDiv = document.getElementById(styleName);
	styleDiv.style.display = 'block';

	var headerName = id + 'Header';
	var headerDiv = document.getElementById(headerName);
	headerDiv.style.display = 'block';
}

function exportFormSubmit() {
	var form = document.getElementById("exportCitationFormId");
	
	var btn = valButton(form.itemExportType);
	if (btn != null && (btn == "directlytoflow" || btn == "refworks" || btn == "endnoteweb")) {
		form.target = "_blank";
	}
	form.submit();

	hideExportOption("exportCitation");
	openId = null;
}

function valButton(btn) {
    var value = null;
    
	for (var i = 0; i < btn.length; i++) {
      if (btn[i].checked) { 
      	value = btn[i].value; 
      	break;
      }
    }
    
   	return value;
}

function exportFormSubmitNoList() {
	var form = document.getElementById("exportCitationFormId");
	var hiddenExportType = document.getElementById("itemExportTypeId");
	
	if (hiddenExportType.value == "directlytoflow" || hiddenExportType.value == "refworks" || hiddenExportType.value == "endnoteweb") {
		form.target = "_blank";
	}
	form.submit();

	hideExportOption("emailCitation");
	openId = null;
}

function emailFormSubmit() {
	var form = document.getElementById("emailCitationFormId");
	form.target = "HiddenStatusUpdater";
	
	//confirm required values are present
	if (!validateField('senderNameId') || !validateField('recipEmailId') ||
	    !validateField('mailSubjectId')) 
	{
		showErrorMessage('emailValidationMessageId', true);
	    return false;
	}

	var recipientEmail = document.getElementById("recipEmailId").value;

	form.submit();
	clearEmailForm();
	hideExportOption("emailCitation");
	openId = null;
	
	//display the email sent message
	var baseConfirmMsg = document.getElementById("confirmEmailMsgId").value;
	var divMsg = document.getElementById("confirmEmailMsgDivId");
	
	var re = new RegExp("\\%1", "g");
	var confirmMsg = baseConfirmMsg.replace(re, recipientEmail);
	divMsg.innerHTML = confirmMsg;
	
	var confirmDiv = document.getElementById("emailConfirmation");
	confirmDiv.style.display = 'block';
}

function emailFormReset() {
	clearEmailForm();
	hideExportOption("emailCitation");
	openId = null;
}

function validateField(id) {
	if (id != null) {
		var el = document.getElementById(id);
	    if (el != null) {
	       var value = el.value;
	       if (value != null && value.length > 0) {
	          return true;
	       }
	    }
	}

	return false;
}

function clearEmailForm() {
	clearField('senderNameId');
	clearField('recipEmailId');
	clearField('mailSubjectId');
	clearField('mailMsgId');

	showErrorMessage('emailValidationMessageId', false);
}

function clearField(id) {
	if (id != null) {
		var el = document.getElementById(id);
	    if (el != null) {
	       el.value = "";
	    }
	    
	    return false;
	}
}

function showErrorMessage(id, show) {
	var msgDiv = document.getElementById(id);
	if (show) {
		msgDiv.style.display = 'block';
	}
	else {
		msgDiv.style.display = 'none';
	}
}

//hide the email confirmation panel
function emailConfirmClose() {
	var confirmDiv = document.getElementById("emailConfirmation");
	confirmDiv.style.display = 'none';
}

//create the save link window
function openSaveLinkWindow(url, title, description) 
{
    hostURL = window.location.protocol + "//" + window.location.host + window.location.pathname;
    if (hostURL.charAt(hostURL.length - 1) != "/") {
    	hostURL += "/";
    }
    var re = new RegExp("\\./", "g");
	var newURL = url.replace(re, hostURL);
	
	var new_window = open("","displayWindow","width=670,height=200,resizable=yes,left=10,top=10");
	new_window.document.open();
	new_window.document.write("<html><head><title>" + title + "</title>");
	new_window.document.write("<meta content=\"text/html; charset=utf-8\" http-equiv=\"Content-type\" />");

	new_window.document.write("<style> div.headtext {font-family:verdana; color:#000000; font-size:14px; font-weight:bold} div.urlstring {font-family:verdana; color:#0000EE; font-size:11px; overflow:auto; word-wrap:break-word; white-space:normal; width:600px;} div.text1 {font-family:verdana; color:white ; font-size:11px; text-align:right}  </style>");
	new_window.document.write("</head>");
	new_window.document.write("<body bgcolor='#FFFFFF'> ");
	new_window.document.write("  <table bgcolor='#FFFFFF'><tr>  ");
	new_window.document.write("<td>&nbsp;</td><td>");
	new_window.document.write("<div class='headtext'><br>" + description + "</div>");
	new_window.document.write("<br>");
	
	new_window.document.write("<div class='urlstring'>");
	new_window.document.write(newURL); 
	new_window.document.write("<br><br></div>");
	new_window.document.write(" </td></tr></table>");
	new_window.document.write("</body></html>");
	new_window.document.close(); 
}

//get the cookie based on name
function getCookie(name) {
	var search = name + "=";
	var returnvalue = "";
	
	if (document.cookie.length > 0) {
		offset = document.cookie.indexOf(search)
		// if cookie exists
		if (offset != -1) {
			offset += search.length
			// set index of beginning of value
			end = document.cookie.indexOf(";", offset);
			// set index of end of cookie value
			if (end == -1) {
				end = document.cookie.length;
			}
			
			returnvalue = unescape(document.cookie.substring(offset, end))
		}
	}
	
	return returnvalue;
}

//function that gets called on the page load to restore the previous
//BCM values for email and export/save
function setCitationExportValues() {
	setExportSaveValues();
	setEmailExportValues();
}

//restore the previous BCM export/save values
function setExportSaveValues() {
	var formName = "exportCitationForm";
	var eType = getCookie("exportSaveType");
	var cType = getCookie("exportSaveCitationType");
	var form = document.getElementById(formName + "Id");
	
	if (eType != "" && form != null) {
		var inputs = form.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if(inputs[i].type == "radio" && inputs[i].value == eType) {
				inputs[i].checked = true;
				
				//show the citation style if necessary
				toggleCitationStyles(eType, "exportCitation");
				break;
			}
		}
	}
	
	if (cType != "" && form != null) {
		var selEl = form.getElementsByTagName("select");
		if (selEl != null) {
			setSelectedIndex(selEl[0], cType);
		}
	}
}

//restore the previous BCM email values 
function setEmailExportValues() {
	var formName = "emailCitationForm";
	var eType = getCookie("emailExportType");
	var cType = getCookie("emailCitationType");

	var form = document.getElementById(formName + "Id");

	if (eType != "" && form != null) {
		var inputs = form.getElementsByTagName("input");
		for (var i = 0; i < inputs.length; i++) {
			if(inputs[i].type == "radio" && inputs[i].value == eType) {
				inputs[i].checked = true;
				
				//show the citation style if necessary
				toggleCitationStyles(eType, "emailCitation");
				break;
			}
		}
	}
	
	if (cType != "" && form != null) {
		var selEl = form.getElementsByTagName("select");
		if (selEl != null && selEl.length > 0) {
			setSelectedIndex(selEl[0], cType);
		}
	}
}

//set the selected item in the combobox based on the value
function setSelectedIndex(el, value) {
    for (var i = 0; i < el.options.length; i++) {
        if (el.options[i].value == value ) {
            el.options[i].selected = true;
            return;
        }
    }
}

