
if (iCreateObject.isSiteInICreateMode) {

    var toggleHtmlStructure = "<div class=\"toggleContent cf\">";
    if ($("#subNavContainer").length > 0) {
        toggleHtmlStructure += "<label for=\"chkHideLeftContent\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideLeftContent\" type=\"checkbox\" name=\"chkHideLeftContent\" />Hide Left Content</label>";
    }
    if ($("#intBanner").length > 0) {
        toggleHtmlStructure += "<label for=\"chkHideBannerImage\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideBannerImage\" type=\"checkbox\" name=\"chkHideBannerImage\" />Hide Banner Image</label>";
    }
    if ($("#intFloatRight").length > 0 && $("#intQuicklinks, #RightImage, #intFloatRight #contactMainContainer, #intFloatRight #pageSubscription").length >= 2) {
        toggleHtmlStructure += "<label for=\"chkHideRightContent\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideRightContent\" type=\"checkbox\" name=\"chkHideRightContent\" />Hide Right Content</label>";
    }
    if ($("#intQuicklinks").length > 0) {
        toggleHtmlStructure += "<label for=\"chkHideQuickLinks\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideQuickLinks\" type=\"checkbox\" name=\"chkHideQuickLinks\" />Hide Quick Links</label>";
    }
    if ($("#RightImage").length > 0) {
        toggleHtmlStructure += "<label for=\"chkHideRightImage\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideRightImage\" type=\"checkbox\" name=\"chkHideRightImage\" />Hide Right Image</label>";
    }
    if ($("#intFloatRight #contactMainContainer").length > 0) {
        toggleHtmlStructure += "<label for=\"chkHideRightContact\" class=\"ic-checkbox-inline\">";
        toggleHtmlStructure += "<input id=\"chkHideRightContact\" type=\"checkbox\" name=\"chkHideRightContact\" />Hide Right Contact</label>";
    }

    toggleHtmlStructure += "</div>";

    $("#intBanner").before(toggleHtmlStructure);
}

if ($("#TKInteriorHideAreasToggle #frmToggleContent").length <= 0) {
    var myForm = $("<form>");
    myForm.attr({ "id": "frmToggleContent", "action": "#" });
    if ($("#subNavContainer").length > 0) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideLeftContent", "value": $("#uber").hasClass("wide") ? "wide" : "" }))
    }
    if ($("#intFloatRight").length > 0 && $("#intQuicklinks, #RightImage, #intFloatRight #contactMainContainer, #intFloatRight #pageSubscription").length >= 2) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideRightContent", "value": $("#intFloatRight").hasClass("hide") ? "hide" : "" }))
    }
    if ($("#intBanner").length > 0) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideBannerImage", "value": $("#intBanner").hasClass("hide") ? "hide" : "" }))
    }
    if ($("#RightImage").length > 0) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideRightImage", "value": $("#RightImage").hasClass("hide") ? "hide" : "" }))
    }
    if ($("#intFloatRight #contactMainContainer").length > 0) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideRightContact", "value": $("#intFloatRight #contactMainContainer").hasClass("hide") ? "hide" : "" }))
    }
    if ($("#intQuicklinks").length > 0) {
        myForm.append($("<input>").attr({ "type": "hidden", "id": "hdnHideQuickLinks", "value": $("#intQuicklinks").hasClass("hide") ? "hide" : "" }))
    }
    myForm.append($("<input>").attr({ "type": "submit", "id": "btnToggleContent", "name": "btnToggleContent" }).addClass("hideButton"))

    $("#TKInteriorHideAreasToggle").empty().append(myForm);
}

// bind checkbox with hidden fields
if ($("#subNavContainer").length > 0 && ($("#hdnHideLeftContent").length > 0) && ($("#hdnHideLeftContent").val() == "wide")) {
    if ($("#chkHideLeftContent").length > 0) {
        $("#chkHideLeftContent").attr("checked", "checked");
    }
    $("#uber").toggleClass("wide", true);
    $("#subNavContainer").toggleClass("wide", true);
}
else if ($("#subNavContainer").length > 0 && ($("#hdnHideLeftContent").length > 0) && ($("#hdnHideLeftContent").val() == "")) {
    $("#uber").toggleClass("wide", false);
    $("#subNavContainer").toggleClass("wide", false);
}
//Right content
if ($("#intFloatRight").length > 0 && ($("#hdnHideRightContent").length > 0) && ($("#hdnHideRightContent").val() == "hide")) {
    if ($("#chkHideRightContent").length > 0) {
        $("#chkHideRightContent").attr("checked", "checked");
    }
    $("#intFloatRight").toggleClass("hide", true);
    $("#uber").toggleClass("hideRight", true);
}
else if ($("#intFloatRight").length > 0 && ($("#hdnHideRightContent").length > 0) && ($("#hdnHideRightContent").val() == "")) {
    $("#intFloatRight").toggleClass("hide", false);
    $("#uber").toggleClass("hideRight", false);
}
//Interior banner
if ($("#intBanner").length > 0 && ($("#hdnHideBannerImage").length > 0) && ($("#hdnHideBannerImage").val() == "hide")) {
    if ($("#chkHideBannerImage").length > 0) {
        $("#chkHideBannerImage").attr("checked", "checked");
    }
    $("#intBanner").toggleClass("hide", true);
}
else if ($("#intBanner").length > 0 && ($("#hdnHideBannerImage").length > 0) && ($("#hdnHideBannerImage").val() == "")) {
    $("#intBanner").toggleClass("hide", false);
}
//Right image
if (($("#hdnHideRightImage").length > 0) && ($("#hdnHideRightImage").val() == "hide")) {
    if ($("#chkHideRightImage").length > 0) {
        $("#chkHideRightImage").attr("checked", "checked");
    }
    $("#RightImage").toggleClass("hide", true);
}
else if (($("#hdnHideRightImage").length > 0) && ($("#hdnHideRightImage").val() == "")) {
    $("#RightImage").toggleClass("hide", false);
}

//Right contact
if (($("#hdnHideRightContact").length > 0) && ($("#hdnHideRightContact").val() == "hide")) {
    if ($("#chkHideRightContact").length > 0) {
        $("#chkHideRightContact").attr("checked", "checked");
    }
    $("#intFloatRight #contactMainContainer").toggleClass("hide", true);
    $("#uber").toggleClass("hideRight", true);
    $("#intFloatRight").toggleClass("hide", true);
}
else if (($("#hdnHideRightContact").length > 0) && ($("#hdnHideRightContact").val() == "")) {
    $("#intFloatRight #contactMainContainer").toggleClass("hide", false);
    $("#uber").toggleClass("hideRight", false);
    $("#intFloatRight").toggleClass("hide", false);
}

//Quick links
if (($("#hdnHideQuickLinks").length > 0) && ($("#hdnHideQuickLinks").val() == "hide")) {
    if ($("#chkHideQuickLinks").length > 0) {
        $("#chkHideQuickLinks").attr("checked", "checked");
    }
    $("#intQuicklinks").toggleClass("hide", true);
}
else if (($("#hdnHideQuickLinks").length > 0) && ($("#hdnHideQuickLinks").val() == "")) {
    $("#intQuicklinks").toggleClass("hide", false);
}

// bind checkbox change event
if ($("#subNavContainer").length > 0 && $("#chkHideLeftContent").length > 0) {
    $("#chkHideLeftContent").change(function () {
        $("#uber").toggleClass("wide", $(this).is(":checked"));
        $("#subNavContainer").toggleClass("wide", $(this).is(":checked"));
        $("#hdnHideLeftContent").val($("#subNavContainer").hasClass("wide") ? "wide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();
    });
}

if ($("#intFloatRight").length > 0 && $("#chkHideRightContent").length > 0) {
    $("#chkHideRightContent").change(function () {
        $("#intFloatRight").toggleClass("hide", $(this).is(":checked"));
        $("#uber").toggleClass("hideRight", $(this).is(":checked"));
        $("#hdnHideRightContent").val($("#intFloatRight").hasClass("hide") ? "hide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();
    });
}
if ($("#intBanner").length > 0 && $("#chkHideBannerImage").length > 0) {
    $("#chkHideBannerImage").change(function () {
        $("#intBanner").toggleClass("hide", $(this).is(":checked"));
        $("#hdnHideBannerImage").val($("#intBanner").hasClass("hide") ? "hide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();
    });
}
if ($("#chkHideRightImage").length > 0) {
    $("#chkHideRightImage").change(function () {
        $("#RightImage").toggleClass("hide", $(this).is(":checked"));
        $("#hdnHideRightImage").val($("#RightImage").hasClass("hide") ? "hide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();
    });
}

if ($("#chkHideRightContact").length > 0) {
    $("#chkHideRightContact").change(function () {
        $("#intFloatRight #contactMainContainer").toggleClass("hide", $(this).is(":checked"));
        $("#uber").toggleClass("hideRight", $(this).is(":checked"));
        $("#hdnHideRightContact").val($("#intFloatRight #contactMainContainer").hasClass("hide") ? "hide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();

        checkFloatRight();
    });
}

if ($("#chkHideQuickLinks").length > 0) {
    $("#chkHideQuickLinks").change(function () {
        $("#intQuicklinks").toggleClass("hide", $(this).is(":checked"));
        $("#hdnHideQuickLinks").val($("#intQuicklinks").hasClass("hide") ? "hide" : "");
        if (iCreateObject.isSiteInICreateMode) $("#TKInteriorHideAreasToggle").save();
        checkFloatRight();
    });
}

function checkFloatRight() {
    if ($("#chkHideRightContact").is(":checked") && $("#chkHideQuickLinks").is(":checked")) {
        $("#intFloatRight").hide();
    }else{
        $("#intFloatRight").show();
    }
}