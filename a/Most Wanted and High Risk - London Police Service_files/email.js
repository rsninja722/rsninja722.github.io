function displayDisabledMessage(lang) {
    if (lang == "en")//TODO: LANGO: FEATURE: add support for other languages
        alert("Sorry, email is disabled within iCalendar or iBlog generated pages");
    else if (lang == "fr")
        alert("Sorry, email is disabled within iCalendar or iBlog generated pages");//TODO: LANGC: Need French Translation
}

function emailDialog(id, lang) {
    if (iCreateObject.isSiteInICreateMode) {
        showNAMessage();
    }
    else {
        var myURL = new String(window.location);
        if (myURL.indexOf("Module.aspx") == -1 && myURL.indexOf("icalendar.esolutionsgroup.ca") == -1) {
            window.open(iCreateObject.corpHome + "/Modules/email/emailattachment.aspx?id=" + id + "&ref=" + document.location.href + "&lang=" + lang, "_blank", "width=625px, height=742px, edge=Raised, center=Yes, help=No, resizable=no, status=No, scrollbars=Yes");
        }
        else {
            displayDisabledMessage(lang);
        }
    }
}


function emailContact(contactId, lang) {
    if (iCreateObject.isSiteInICreateMode) {
        showNAMessage();
    }
    else {
        var myURL = new String(window.location);
        if (myURL.indexOf("Module.aspx") == -1 && myURL.indexOf("icalendar.esolutionsgroup.ca") == -1) {
            window.open(iCreateObject.corpHome + "/Modules/email/emailattachment.aspx?contactId=" + contactId + "&ref=" + document.location.href + "&lang=" + lang, "_blank", "width=625px, height=742px, edge=Raised, center=Yes, help=No, resizable=no, status=No, scrollbars=Yes");
        }
        else {
            displayDisabledMessage(lang);
        }
    }
}

function emailContactV2(contactId) {
    if (iCreateObject.isSiteInICreateMode) {
        showNAMessage();
    }
    else {
        var str = document.location.href;
        var lang = "en";//TODO: LANGO: FEATURE: add support for other languages

        if (str.indexOf("/fr/") >= 0)
            lang = "fr";

        var myURL = new String(window.location);
        if (myURL.indexOf("Module.aspx") == -1 && myURL.indexOf("icalendar.esolutionsgroup.ca") == -1) {
            window.open(iCreateObject.corpHome + "/Modules/email/emailattachment.aspx?CV2=" + contactId + "&ref=" + document.location.href + "&lang=" + lang, "_blank", "width=625px, height=825px, edge=Raised, center=Yes, help=No, resizable=no, status=No, scrollbars=Yes");
        }
        else {
            displayDisabledMessage(lang);
        }
    }
}

function mailTo(event) {
    event.preventDefault();
    if (iCreateObject.isSiteInICreateMode) {
        showNAMessage();
    }
    else {
        var str = document.location.href;
        var lang = "/en/";//TODO: LANGO: FEATURE: add support for other languages

        if (str.indexOf("/fr/") >= 0)
            lang = "/fr/";

        if (document.getElementById != null) {
            var obj = document.getElementById('printAreaContent');
            if (obj != null) {
                var content = "";
                if (document.getElementsByTagName != null) {
                    var obj_head = document.getElementsByTagName('head');
                    if (obj_head != null) {
                        content += obj_head[0].innerHTML;
                    }
                }
                content += "\n<body style='background-color: #fff;'><div id='searchResults'><table cellpadding='8' cellspacing='0' border='0' width='100%'><tr><td>" + obj.innerHTML + "</td></tr></table></div></body>";
                $("input#hdnContent").val(content);
                $("input#hdnPage").val(str);
                var currentURL = window.location.href;
                var currentCorpHome = iCreateObject.corpHome;
                // if current url contains www.                and current url is a live url                       and url in config does not contains www. already
                if ((currentURL.indexOf("http://www.") != -1) && (currentURL.indexOf(".esolutionsgroup.ca") == -1) && (currentCorpHome.indexOf("http://www.") == -1)) {
                    currentCorpHome = currentCorpHome.replace("http://", "http://www.");
                }
                else if ((currentURL.indexOf("http://www.") == -1) && (currentURL.indexOf(".esolutionsgroup.ca") == -1) && (currentCorpHome.indexOf("http://www.") != -1)) {
                    // if current url does not contain www.        and current url is a live url                        and url in config contains www.
                    currentCorpHome = currentCorpHome.replace("http://www.", "http://");
                }
                var newWin = window.open(currentCorpHome + 'Modules/email/mailto.aspx', "MailTo", "width=625,height=692,status=yes,menubar=no,location=no,resizable=yes, scrollbars=Yes");
            }

        }
        else {
            if (lang == "en")   //TODO: LANGO: FEATURE: add support for other languages
                alert("Your browser is not capable of performing this operation!");
            else if (lang == "fr")
                alert("Your browser is not capable of performing this operation!"); //TODO: LANGC: Need French Translation
        }
    }
    return false;
}