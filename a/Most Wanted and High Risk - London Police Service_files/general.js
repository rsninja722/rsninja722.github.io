/*

	Author:			Jay Dobson
	Date:			Jan 28, 2008
	Description:	Provides general helper methods
    __________________
    Updated:        V1.0.1 - Larry Stuart - Dec 5 - added iCreate alert

*/

// Variables
var url = document.location.href;

// Returns trimmed version of a given string
String.prototype.trim = function () { return this.replace(/^\s+|\s+$/, ''); };

// Shows not available message (used when disabling functions for i:Create side)
function showNAMessage() {
    //if (url.indexOf("/en/") >= 0) {
    alert("This function is not available in i:Create.");
    //}
    //else {
    //    alert("Cette fonction n'est pas disponible i:Create.");
    //}
}

// Replaces single quote and returns resulting string
function repSingleQuote(str) {
    return str.replace("'", "\'");
}

// Switches the language of the page by changing the URL
function switchLanguage() {

    var str = document.location.href;

    if (str.indexOf("edit_") > -1) {
        //if (str.indexOf("/en/") >= 0) {
        alert("This function is not available in edit mode.");
        //}
        //else {
        //    alert("Cette fonction n'est pas disponible dans le mode d'édition.");
        //}
    }
    else {

        if (str.indexOf("/en/") >= 0) {
            url = url.replace("/en/", "/fr/");
            document.location = url;
        }

        else if (str.indexOf("lang=en") >= 0) {
            url = url.replace("lang=en", "lang=fr");
            document.location = url;
        }

        else if (str.indexOf("/fr/") >= 0) {
            url = url.replace("/fr/", "/en/");
            document.location = url;
        }

        else if (str.indexOf("lang=fr") >= 0) {
            url = url.replace("lang=fr", "lang=en");
            document.location = url;
        }
    }
}


function GotoSearch(src, obj) {
    var strSearch;
    if ($(obj).is(".mobileSearchContainer #FormSearch")) {
        strSearch = src + "?strSearch=" + escape($(".mobileSearchContainer #FormSearch .searchField").val().replace(/</g, ""));
    } else {
        strSearch = src + "?strSearch=" + escape($(".searchContainer #FormSearch .searchField").val().replace(/</g, ""));
    }
    if (document.location.href.indexOf("/fr/") >= 0 || document.location.href.indexOf("lang=fr") >= 0) {
        strSearch += "&lang=fr";
    }
    window.location.href = strSearch;
    return false;
}


// Handles autoTab functionality for fields
// pcID = Previous Control ID, ccID = Current Control ID, ncID = Next Control ID
function autoTab(event, pcID, ccID, ncID) {

    var isBack = (event.keyCode == 8);

    var pc = document.getElementById(pcID);
    var cc = document.getElementById(ccID);
    var nc = document.getElementById(ncID);

    if (isBack && cc.value.length == 0 && pc != null) {
        pc.focus();
        pc.select();
    }

    if (cc.value.length >= cc.getAttribute("maxlength") && nc != null) {
        nc.focus();
        nc.select();
    }

}

// Takes in a textbox reference, a label ID and the max # of characters that can go into the textbox
// When the input reaches the maxChars limit any further typing is 'cut-off' and the 
// label (displaying the number of characters left) turns red
function Counter(textbox, label, maxChars) {

    lbl = document.getElementById(label);

    if (textbox.value.length >= maxChars) {
        lbl.style.color = 'red';
        textbox.value = (textbox.value).substring(0, maxChars);
        textbox.scrollTop = textbox.scrollHeight;
    }

    else {
        lbl.style.color = 'black';
    }

    lbl.innerHTML = maxChars - (textbox.value.length);

}

function createGUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
		.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
		});
}

function icAlert(title, htmlContent) {
	var _myAlertId = createGUID();
	$("body").prepend("<div id='"+_myAlertId+"' title='"+title+"'>"+htmlContent+"</div>");
	$("#" + _myAlertId + "").dialog({
        modal: true
    });
}

// Match height elements
// $(window).load(function() {
//     var contentInt = $('#contentInt'),
//     footer = $('.footerInner'),
//     tweets = $('.tweet');

//     if (contentInt.length > 0) {
//         var subHeight = $('#subNavWrapper').outerHeight();
//         if (contentInt.outerHeight() < subHeight) {
//             contentInt.css('height', subHeight);
//         }
//     }

//     if (footer.length > 0) {
//         $('.footerInner').find('ul ul').matchHeight();
//     }

//     if (tweets.length > 0) {
//         $('.tweet').find('p:first').matchHeight();
//         $('.tweet').find('small:first').matchHeight();
//     }
// });