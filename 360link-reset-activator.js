/*
*    Activator for 360Link-Reset
*    Invokes the redesign when a link is clicked.
*/

window.$j = jQuery.noConflict();

var sm_survey = '<span class="new_look_activator notice">Please <a target="_blank" href="https://www.surveymonkey.com/s/B86ZFB8" >answer a super-short survey</a> to help us improve FindIt!</a><script src="https://www.surveymonkey.com/jsPop.aspx?sm=kZRAhmGZgnuLQ9rOR5X1KA_3d_3d"> </script></span>'

$j(document).ready(function() { // Wait until the original page loads
                   activateNewLook($j)
                   });

function activateNewLook(myjq) {
    var $j = myjq
//    var activator_span = '<span class="new_look_activator notice">We want to make your research easier. <a href="#activate">Try our new look</a> and tell us what you think!</span>'
//    $j(".center-content").prepend(activator_span)
//    $j(".new_look_activator a").click(function(){
                                      threeSixtyLinkReset($j);
//                                      $j(".new_look_activator").fadeOut();
//                                      $j(".new_look_activator").replaceWith(sm_survey).fadeIn(400);
//                                      })
}