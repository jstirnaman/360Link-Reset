var htmlReq = false;

function sendCrossRefRequest() {
   htmlReq = false;
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
      htmlReq.onreadystatechange = crossRefResponseCallback;
      var finalmetadataToDOIQuery = metadataToDOIQuery + "&ds="+new Date().getTime();
      
      // metadataToDOIQuery is set in the alResults.xsl
      htmlReq.open("POST", finalmetadataToDOIQuery, true);
      htmlReq.setRequestHeader('Cache-Control', 'no-cache');
      htmlReq.setRequestHeader('If-Modified-Since', 'Thu, 1 Jan 1970 00:00:00 GMT');
      htmlReq.setRequestHeader("Method", "POST "+ finalmetadataToDOIQuery + " HTTP/1.1");

      htmlReq.send("");
   }
}


/**
   The returned XML will have the following format:

<crossRefResponse>
   <doiLink>
      http://doi.crossref.org ...
   </doiLink>
   <message>
      HTML table or text to insert as the response message
   </message>
</crossRefResponse>

   One or both of the children can be missing and the doiLink should already have the proxy
   value appended, if appropriate.
 */
function crossRefResponseCallback() {
  if (htmlReq != null && htmlReq.readyState == 4) {
     if (htmlReq.status == 200) {
        element = document.getElementById('crossRefMessage');
        if (element != null && typeof(element) != "undefined") {
           messageElement = htmlReq.responseXML.getElementsByTagName("message")[0];
           if (messageElement != null) {
              if (messageElement.firstChild == null) {
                 element.innerHTML = noCrossRefResultsMessage;
              } else {
	         element.innerHTML = messageElement.firstChild.nodeValue;
              }
           } else {
              // noCrossRefResultsMessage is declared in alResults.xsl at the top of the page
              element.innerHTML = noCrossRefResultsMessage;
           }
           doiElement = htmlReq.responseXML.getElementsByTagName("DOI")[0];
           if (doiElement != null)  {
              window.open(doiElement.firstChild.nodeValue);
              changeClass('crossRefMessage', 'crossRefResponseMessage');
           }
        } else {
	   element.innerHTML = noCrossRefResultsMessage;
        }
     } else { 
        // noCrossRefResultsMessage is declared in alResults.xsl at the top of the page
	element.innerHTML = noCrossRefResultsMessage;
     }
  }
}

function checkCrossRef() {
  removeText('crossRefLinkWrapper');
  removeText('crossRefPublisher');
  showHide('crossRefMessage');
  // metadataToDOIQuery is declared in the alResults.xsl at the to of the page
  if (metadataToDOIQuery != '')
     sendCrossRefRequest();
}
