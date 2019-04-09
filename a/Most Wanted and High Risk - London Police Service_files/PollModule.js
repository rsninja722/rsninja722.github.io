$(document).ready(function () {
    $("div.currentPoll").each(function () {
        var PollID = $(this).attr("data-icrtpollmodule-poll");
        var ByID = false;
        if (typeof PollID === "undefined") {
            PollID = $(this).attr("id");
            ByID = true;
        }
        $.ajax({
            type: "GET",
            url: iCreateObject.corpRoot + "Modules/polling/GetCurrentPoll.aspx?pollid=" + PollID,
            dataType: "html",
            success: parseMessage,
            error: errorOccurred,
            cache: false
        });
       
        function parseMessage(html) {
            if (!ByID) {
                jQuery('div.currentPoll[data-icrtpollmodule-poll=' + PollID + ']').html(html);
            } else {
                jQuery('div.currentPoll[id=' + PollID + ']').html(html);
            }
        }
        function errorOccurred(xhr, ajaxOptions, thrownError) {
            alert("Unable to pull Poll data");
        }
    });
    
}); 