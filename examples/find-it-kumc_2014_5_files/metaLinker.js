var htmlReq = false;
var targetHrefCallbackParam;
var metaLinkerIdCallbackParam;
var metaLinkerElement;

function sendMetaLinkerRequest(targetHref, metaLinkerId) {
   htmlReq = false;
   targetHrefCallbackParam = targetHref;
   metaLinkerIdCallbackParam = metaLinkerId;
   // branch for native XMLHttpRequest object
   if (window.XMLHttpRequest) {
       try {
          htmlReq = new XMLHttpRequest();
       } catch(e) {
          htmlReq = false;
       }
   // branch for IE/Windows ActiveX version
   } else if (window.ActiveXObject) {
       try {
          htmlReq = new ActiveXObject("Msxml2.XMLHTTP");
       } catch(e) {
          try {
             htmlReq = new ActiveXObject("Microsoft.XMLHTTP");
          } catch(e) {
             htmlReq = false;
          }
       }
   }
   if (htmlReq) {
      htmlReq.onreadystatechange = metaLinkerResponseCallback;
      htmlReq.open("GET", targetHref, true);
      htmlReq.send("");
   }
}


/**
   The returned XML will have the following format:

<Response>
<Date>2004-04</Date>
<Url>http://jairo.nii.ac.jp/0003/00014366</Url>
<DatabaseText>NII IRDB (author version)</DatabaseText>
</Response>
 */
function findChildWithId(node, id) {
   children = node.childNodes;
   if (children == null)
      return null;
      
   for (var i = 0; i < children.length; i++)  {
      if (children[i].id == id)
         return children[i];
   }
}

function metaLinkerResponseCallback() {
  if (htmlReq != null && htmlReq.readyState == 4) {
     if (htmlReq.status == 200) {
        metaLinkerElement = document.getElementById(metaLinkerIdCallbackParam);
        dbLinkerElement = document.getElementById(metaLinkerIdCallbackParam + 'DB');
        if (metaLinkerElement != null && typeof(metaLinkerElement) != "undefined") {
           messageElement = htmlReq.responseXML.getElementsByTagName("DatabaseText")[0];
           var isMSIE = /*@cc_on!@*/false;
           if (messageElement != null) {
              if (messageElement.firstChild == null) {
                 // No database name so, nothing to do.
              } else {
	             columnElement = metaLinkerElement.parentNode.parentNode;
	             while(columnElement != null && (findChildWithId(columnElement, "DatabaseCL") == null)) {
	                columnElement = columnElement.nextSibling;
	             }
	             columnElement = findChildWithId(columnElement, "DatabaseCL");
	             
                 if (isMSIE) {
                    var newDatabaseText = document.createTextNode(messageElement.firstChild.nodeValue);
                    var oldDBText = columnElement.firstChild;
                    columnElement.replaceChild(newDatabaseText, oldDBText);
                 } else {
	                columnElement.textContent = messageElement.firstChild.nodeValue;
	             }
              }
           } else {
              // element.innerHTML =;
              // Output 'not found'?.?
           }
           urlElement = htmlReq.responseXML.getElementsByTagName("Url")[0];
           if (urlElement != null)  {
              var resultUrl = urlElement.firstChild.nodeValue;
              if (resultUrl.indexOf('TimeOut') == 0) {
                 // Timeout condition.
                 window.location.reload();
              } else {
                 window.open(resultUrl);
                 if (isMSIE) {
                    var newMetaLinkerElement = document.createElement('a');
                    newMetaLinkerElement.setAttribute('href', resultUrl);
                    newMetaLinkerElement.setAttribute('onclick', '');
                    newMetaLinkerElement.setAttribute('target', '_blank');
                    if (metaLinkResultsMessage.toLowerCase().indexOf('<div') >= 0) {
                       removeChildren(metaLinkerElement);
                       populateElement(metaLinkResultsMessage, 'div', newMetaLinkerElement);
                    } else if (metaLinkResultsMessage.toLowerCase().indexOf('<span') >= 0) {
                       removeChildren(metaLinkerElement);
                       populateElement(metaLinkResultsMessage, 'span', newMetaLinkerElement);
                    } else {
                       var textElement = document.createTextNode(metaLinkResultsMessage);
                       newMetaLinkerElement.appendChild(textElement);
                    }
                    
                    var parentMetaLinkerElement = metaLinkerElement.parentNode;
                    parentMetaLinkerElement.replaceChild(newMetaLinkerElement, metaLinkerElement);
                 } else {
                    metaLinkerElement.href = resultUrl;
                    metaLinkerElement.onclick = '';
                    metaLinkerElement.target = '_blank';

                    if (metaLinkResultsMessage.toLowerCase().indexOf('<div') >= 0) {
                       removeChildren(metaLinkerElement);
                       populateElement(metaLinkResultsMessage, 'div', metaLinkerElement);
                    } else if (metaLinkResultsMessage.toLowerCase().indexOf('<span') >= 0) {
                       removeChildren(metaLinkerElement);
                       populateElement(metaLinkResultsMessage, 'span', metaLinkerElement);
                    } else {
                       metaLinkerElement.textContent = metaLinkResultsMessage;
                    }
                 }
              }
           }
        } else {
           // Nothing to do -- maybe reset the url?
           metaLinkerElement.href = targetHrefCallbackParam;
        }
     } else {
        metaLinkerElement = document.getElementById(metaLinkerIdCallbackParam);
        var isMSIE = /*@cc_on!@*/false;
        if (targetHrefCallbackParam.indexOf('SS_RefDatabaseCode=1KH') > 0) {
           if (!isMSIE) {
              metaLinkerElement.parentNode.parentNode.parentNode.innerHTML = noAIRwayMetaLinkResultsMessage;
           } else {
              // IE6 needs special handling.
              var replaceNode = metaLinkerElement.parentNode.parentNode.parentNode.parentNode;
              replaceNode.removeChild(metaLinkerElement.parentNode.parentNode.parentNode);
              populateRow(noAIRwayMetaLinkResultsMessage, replaceNode);
           }
    	} else {
           var isIE6 = false /*@cc_on || @_jscript_version < 5.7 @*/;
    	
           if (!isIE6) {
              metaLinkerElement.parentNode.innerHTML = noMetaLinkResultsMessage;
           } else {
              var replaceNode = metaLinkerElement.parentNode;
              replaceNode.removeChild(metaLinkerElement);
              var textElement = document.createTextNode(noMetaLinkResultsMessage);
              replaceNode.appendChild(textElement);
           }
      	}
     }
  }
}

function checkMetaLinker(metaLinkerId) {
  targetElement = document.getElementById(metaLinkerId);
  targetHref = targetElement.href + '&SS_PostParamDict=disableMetaOneClick';
  
  targetElement.target = '';
  
  if (metaLinkerId != '')
     sendMetaLinkerRequest(targetHref, metaLinkerId);

  return false;
}

//
// IE 6.0 html->dom parsing code follows.
//

function populateRow(configStr, bodyDOM) {
   var row = document.createElement('tr');
   populateElement(configStr, 'td', row);
   bodyDOM.appendChild(row);
}

function removeChildren(node) {
   var child;
   while ((child = node.firstChild) != null) {
      node.removeChild(child);
   }
}

function populateElement(elementPiece, tag, parentElement) {
   var i = 0;
   var j = 0;
   var elementTag = '<' + tag;
   var elementEndTag = '</' + tag;
   var elementToAdd;
   if (elementPiece == null) {
      return null;
   }
   
   while ((i = elementPiece.indexOf(elementTag, i)) >= 0) {
      elementToAdd = document.createElement(tag);
      parentElement.appendChild(elementToAdd);
      j = elementPiece.indexOf('>', i);
      if (j > 0) {
         var attributes = elementPiece.substring(i + tag.length + 1, j);
         populateAttributes(elementToAdd,attributes);
         i = j + 1;
      } else {
         i = i + elementTag.length;
      }
      
      j = elementPiece.indexOf(elementEndTag, i);
      if (j > 0) {
         // Add Text and other elements here.
         var elementPieceBody = elementPiece.substring(i, j);
         var k = 0;
         if (elementPieceBody.indexOf('<') >= 0) {
            while ((k = elementPieceBody.indexOf('<', k)) >= 0) {
               if (k > 0) {
                  var textPiece = elementPieceBody.substring(0, k-1);
                  if (textPiece.length > 0) {
                     var textElement = document.createTextNode(textPiece);
                     // Add Text component.
                     elementToAdd.appendChild(textElement);
                  }
               }
               var endTagIndex = elementPieceBody.indexOf(' ');
               if (endTagIndex < 0) {
                  endTagIndex = elementPieceBody.indexOf('>', k + 1);
               }
               var nestedTag = elementPieceBody.substring(k + 1, endTagIndex);
               var nestedElementEndTag = '</' + nestedTag;
               var m = 0;
               if (elementPieceBody.indexOf(nestedElementEndTag) > 0) {
                  m = elementPieceBody.indexOf(nestedElementEndTag) + nestedTag.length + 3;
               } else {
                  m = elementPieceBody.indexOf('/>') + 2;
               }

               var nestedElement = elementPieceBody.substring(k, m);
               // Recursively add the element.
               populateElement(nestedElement, nestedTag, elementToAdd);
               // Advance to the next text-element substring.
               elementPieceBody = elementPieceBody.substring(m, j);
            }
         } else {
            if (elementPieceBody.length > 0) {
               // Just add a text node.
               var textElement = document.createTextNode(elementPieceBody);
               elementToAdd.appendChild(textElement);
            }
         }
      } // end if (j > 0)
   } // end while ((i = elementPiece.indexOf...
   i = elementPiece.indexOf(elementEndTag) + elementEndTag.length + 1;
   if (i < elementPiece.length) {
      return elementPiece.substring(i, elementPiece.length);
   } else {
      // All done!
      return null;
   }
}

function populateAttributes(element, attributeStr) {
   var i = 0;
   var name = '';
   var value = '';
   var j = 0;
   var attriblen = attributeStr.length;
   // Skip leading ws.
   while (i < attributeStr.length && attributeStr.charAt(i) == ' ') {
      i = i + 1;
   }
   
   j = attributeStr.indexOf('=');
   while (i < attributeStr.length && (j > 0 && j < attributeStr.length)) {
      name = attributeStr.substring(i, j);
      var k = attributeStr.indexOf('\"', j + 1);
      var l = attributeStr.indexOf('\"', k + 1);
      if (k > 0 && l > 0) {
         value = attributeStr.substring(k + 1, l);
      } else {
         // Quoteless nvp?
         k = j + 1;
         l = attributeStr.indexOf(' ', k + 1);
         if (l == -1) {
            l = attributeStr.length;
         }
         value = attributeStr.substring(k, l);
         // Very strict on this.
         if (value.indexOf(' ') > 0) {
            value = null;
         }
      }
      
      if (name != null && name.length > 0 && value != null && value.length > 0) {
         if (name.indexOf('class') == 0) {
            // For I.E.
            element.setAttribute(name + 'Name', value);
         }
         element.setAttribute(name, value);
      }
      i = l + 1;
      while (i < attributeStr.length && attributeStr.charAt(i) == ' ') {
         i = i + 1;
      }
      j = attributeStr.indexOf('=', i); 
      name = ''; 
      value = '';
   }
   return i;
}
