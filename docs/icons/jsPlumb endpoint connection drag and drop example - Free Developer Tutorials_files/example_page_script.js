jQuery(document).ready(function( $ ) {
    var str = jQuery('#sourceCode').val();
    editor = ace.edit("three");
    editor.setValue(str, -1);
    // editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/html");
    
    renderExampleCode(true);
});

renderExampleCode = function(isPageLoad) {
	var sourceCode = editor.getValue();
	var renderOutput = document.getElementById("renderOutput");
	if(isPageLoad === false) {
	    window.angular = undefined;
	    renderOutput.contentWindow.angular = undefined;
	    renderOutput.angular = undefined;
	    renderOutput.contentWindow.document.angular = undefined;
    }
	renderOutput.contentWindow.document.open('text/html','replace');
	renderOutput.contentWindow.document.write(sourceCode);
	renderOutput.contentWindow.document.close();
}

function w3showit() {
  var ifr = document.getElementById("iframeResult");
  ifr.contentWindow.document.open('text/html','replace');
  var text = document.getElementById("textareaCode").value;
  ifr.contentWindow.document.write(text);
  ifr.contentWindow.document.close();
}   

