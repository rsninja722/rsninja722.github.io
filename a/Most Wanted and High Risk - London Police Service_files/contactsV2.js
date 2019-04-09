$(document).ready(function () {
    if (iCreateObject.corpHome.indexOf(document.location.hostname) >= 0) {
        if (!iCreateObject.isSiteInICreateMode || $(".contactBody .iCreateToken").length == 0) {
            if ($(".contactBodyContactInfoContactModuleV2").length > 0) {
                $(".contactBodyContactInfoContactModuleV2").each(function () {
                    var id = $(this).attr('id').toString().split('_')[1].toString();
                    var _this = $(this);

                    $.ajax({
                        dataType: 'jsonp',
                        type: 'GET',
                        url: iCreateObject.corpHome + '/Modules/Contact/services/GetContactHTML.ashx?isMobile=' + iCreateObject.isMobile + '&param=' + id + "&lang=" + iCreateObject.lang,
                        success: function (data) {
                            $(_this).html($("<div>").html(data).text()).append('<br/>');
                        }
                    })
                });
            }
            else {
                $.ajax({
                    dataType: 'jsonp',
                    type: 'GET',
                    url: iCreateObject.corpHome + '/Modules/Contact/services/GetContactHTML.ashx?isMobile=' + iCreateObject.isMobile + "&lang=" + iCreateObject.lang,
                    success: function (data) {
                        $(".contactBody").html($("<div>").html(data).text());
                    }
                })
            }
        }
    }
});
