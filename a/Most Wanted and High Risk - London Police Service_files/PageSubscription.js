var channelId;
var html;
var confirm;
$(document).ready(function () {
    if (iCreateObject.corpHome.indexOf(document.location.hostname) >= 0) {
        //On load check to see if the page has subscriptions enabled.
        var url = "/Modules/PageSubscription/services/getPageSubscriptionDetails.ashx?currentURL=" + document.location.pathname+"&lang="+iCreateObject.lang;
        jQuery.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            success: response,
            error: errorOccurred,
            cache: false
        });
    }
});
    
function response(data) {
    if (data.status) {
        channelId = data.channelId;
        confirm = data.confirmation;
        html = data.form;
        showButton();
        $("#pageSubscription").on("click", pageSubscriptionClick);
    } else {
        hideButton();
    }
}
function hideButton() {
    $("#pageSubscription").hide();
}
function showButton() {
    $("#pageSubscription").show();
}
function errorOccurred(xhr, ajaxOptions, thrownError) {
    $("#pageSubscription").hide();
}

function pageSubscriptionClick(e) {
    var options = {
        resizable: false,
        modal: false,
        height: "auto",
        width: 640
    }
    showDialog(options);
	if(e.preventDefault){e.preventDefault();}else{return false;}
}
function subscribeToPage() {
    var formvalid = true;
    //Validate the form.
    var firstName = $("#pageSubscriptionFormDialog #txtFirstName").val();
    var lastName = $("#pageSubscriptionFormDialog #txtLastName").val();
    var email = $("#pageSubscriptionFormDialog #txtEmail").val();
    var captcha = $("#pageSubscriptionFormDialog #g-recaptcha-response").val();
    //Clear out old error messages
    $("#pageSubscriptionFormDialog .psErrorMessage").hide();

    //validate firstname
    if (typeof firstName === 'undefined' || firstName == "") {
        $("#pageSubscriptionFormDialog #psFNError").show();
        formvalid = false;
    }

    //validate last name
    if (typeof lastName === 'undefined' || lastName == "") {
        $("#pageSubscriptionFormDialog #psLNError").show();
        formvalid = false;
    }

    //validate email 
    if (typeof email === 'undefined' || email == "") {
        $("#pageSubscriptionFormDialog #psEmailError").show();
        formvalid = false;
    }else if (!validateEmail(email)) {
        $("#pageSubscriptionFormDialog #psEmailInvalid").show();
        formvalid = false;
    }

    //validate captcha is checked (not if valid)
    if (typeof captcha === 'undefined' || captcha == "") {
        $("#pageSubscriptionFormDialog #psCaptchaError").show();
        formvalid = false;
    }
    if (formvalid) {

        var dataString = {
            'txtFirstName':firstName, 
            'txtLastName':lastName,
            'txtEmail':email,
            'g-recaptcha-response':captcha,
            'channelId':channelId
        };

        //Hide the dialog
        $("#pageSubscriptionFormDialog").dialog("close");

        //Show loading message
        showLoadingDialog();

        //Subscribe the user
        jQuery.ajax({
            type: "POST",
            url: "/Modules/PageSubscription/services/processPageSubscription.ashx",
            data: dataString,
            dataType: "json",
            success: function (json) {
                //Close loading dialog
                hideLoadingDialog();
                //Hide any old messages
                $("#pageSubscriptionConfirmDialog .psErrorMessage").hide();
                if (!json.status){
                    $("#pageSubscriptionConfirmDialog #psConfirmError").show();
                    
                } else {
                    $("#pageSubscriptionConfirmDialog #psConfirmSuccess").show();
                }
                showConfirmationDialog();
            },
            error: function () {
                //Close loading dialog
                hideLoadingDialog();
                $("#pageSubscriptionConfirmDialog #psConfirmError").show();
                showConfirmationDialog();
            },
            cache: false
        });
    }
}
function closeDialog() {
    $("#pageSubscriptionFormDialog").dialog("close");
}
function closeConfirmDialog() {
    $("#pageSubscriptionConfirmDialog").dialog("close");

    //Clean up.
    $("#pageSubscriptionFormDialog").remove();
    $("#pageSubscriptionConfirmDialog").remove();
}
function showConfirmationDialog() {
    $("#pageSubscriptionConfirmDialog").dialog({
        resizable: false,
        modal: false,
		width: 400
    });
    $("div.ui-dialog-titlebar").hide();
}
function showLoadingDialog() {
    if (!$("#loadingDialog").length) {
        $("body").append("<div id=\"loadingDialog\"><img src='/Common/images/indicator.gif' style=\"width:16px;height:auto;\"/></div>");
    }
    $("#loadingDialog").dialog({
        resizable: false,
        modal: false,
        width: 100,
        dialogClass: "no-close"
    });
    $("div.ui-dialog-titlebar").hide();
}
function hideLoadingDialog() {
    $("#loadingDialog").dialog("close");
}
function showDialog(options) {
    if (!$("#pageSubscriptionFormDialog").length) {
        
        //Inject dialog div.
        $("body").append("<div id='pageSubscriptionFormDialog' class='ui-corner-all' style='display:none;' ></div>");

        //Inject HTML for the form.
        $("#pageSubscriptionFormDialog").html(html);
        $("#formTitle").append($("#pageHeading h1").text());

        //Inject Confirmation dialog
        $("body").append("<div id='pageSubscriptionConfirmDialog' class='ui-corner-all' style='display:none;'></div>");
        $("#pageSubscriptionConfirmDialog").append("<div class='button-group'><div class='psFeedbackClose'>Close</div></div>");

        //Inject confirmation HTML
        $("#pageSubscriptionConfirmDialog").html(confirm);

        //Add event handlers
        $("#pageSubscriptionFormDialog .ui-dialog-titlebar-close").on("click", closeDialog);
        $("#pageSubscriptionFormDialog div.psFeedbackClose").on("click", closeDialog);
        $("#pageSubscriptionFormDialog #subscribe").on("click", subscribeToPage);

        $("#pageSubscriptionConfirmDialog .ui-dialog-titlebar-close").on("click", closeConfirmDialog);
        $("#pageSubscriptionConfirmDialog #close").on("click", closeConfirmDialog);

    }
    $("#pageSubscriptionFormDialog").dialog({
        resizable: options.resizable,
        modal: options.modal,
        width: options.width,
        height: options.height,
		position: {
			my: "center top",
			at: "center top",
			of: window
		}
    });

    //Hide the title bar
    $("div.ui-dialog-titlebar").hide();
}

function validateEmail(email) {
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        return pattern.test(email);
}