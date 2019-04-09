

/*


	Author:			Kevin Gray

	Date:			Sept. 22, 2014

	Description:	Provides methods for resizing text in the #printArea div for i:Create websites


/*

 /*=====================
      TEXT SIZER
    ======================*/

var fontSizeInitial = "";

$(function () {
    fontSizeInitial = parseInt($('#printArea').css("font-size"));

    $('.textIncrease').click(function (event) {
        event.preventDefault();
        if (iCreateObject.isSiteInICreateMode)
        {
            showNAMessage();
        }
        else
        {
            var fontSize = parseInt($('#printArea').css("font-size"));
            if (fontSize < 24) { // 24px is max base font size
                fontSize = fontSize + 1 + "px";
                $('#printArea').css({ 'font-size': fontSize });
            }
        }
    });

    $('.textDecrease').click(function (event) {
        event.preventDefault();
        if (iCreateObject.isSiteInICreateMode) {
            showNAMessage();
        }
        else {
            var fontSize = parseInt($('#printArea').css("font-size"));
            if (fontSize > 8) { // 8px is max base font size
                fontSize = fontSize - 1 + "px";
                $('#printArea').css({ 'font-size': fontSize });
            }
        }
    });

    $('.textDefault').click(function (event) {
        event.preventDefault();
        if (iCreateObject.isSiteInICreateMode) {
            showNAMessage();
        }
        else {
            $('#printArea').css({ 'font-size': fontSizeInitial });
        }
    });

});