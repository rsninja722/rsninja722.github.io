var pauseSocial = false;
function toggleSocialPause(event) {
    event.preventDefault();

    pauseSocial = !pauseSocial;

    if (pauseSocial) {
        $("div#socialPause").addClass("selected");
        $("div#socialPause a").prop('title', 'Play').html("Play");  //TODO: LANGC: get french translation and make dynamic
    }
    else {
        $("div#socialPause").removeClass("selected");
        $("div#socialPause a").prop('title', 'Pause').html("Pause");
    }
}



var pauseNews = false;
function toggleNewsPause(event) {
    event.preventDefault();

    pauseNews = !pauseNews;

    if (pauseNews) {
        $("div#newsPause").addClass("selected");
        $("div#newsPause a").prop('title', 'Play').html("Play");  //TODO: LANGC: get french translation and make dynamic
    }
    else {
        $("div#newsPause").removeClass("selected");
        $("div#newsPause a").prop('title', 'Pause').html("Pause");
    }
}

var pauseEvents = false;
function toggleEventsPause(event) {
    event.preventDefault();

    pauseEvents = !pauseEvents;

    if (pauseEvents) {
        $("div#eventPause").addClass("selected");
        $("div#eventPause a").prop('title', 'Play').html("Play");  //TODO: LANGC: get french translation and make dynamic
    }
    else {
        $("div#eventPause").removeClass("selected");
        $("div#eventPause a").prop('title', 'Pause').html("Pause");
    }
}



$(document).ready(function () {
    
    $.fn.rotating_social = function (p) {
        var p = p || {};
        var _timerLength = p && (p.timerLength != null) ? p.timerLength : 5000,
            _transitionLength = p && (p.transitionLength != null) ? p.transitionLength : 1000;
        var _container = $(this),
            _itemsToRotate = _container.children("ul").children("li"),
            _index = 0;

        ChangeSocial();

        function ChangeSocial() {
            if (!pauseSocial) {
                _itemsToRotate.hide();
                _itemsToRotate.eq(_index).show();
                _index++;
                if (_index >= _itemsToRotate.length) {
                    _index = 0;
                }
            }
            setTimeout(ChangeSocial, _timerLength);
        }
    };


    $.fn.rotating_news = function (p) {
        var p = p || {};
        var _timerLength = p && (p.timerLength != null) ? p.timerLength : 5000,
            _transitionLength = p && (p.transitionLength != null) ? p.transitionLength : 1000;
        var _container = $(this),
            _itemsToRotate = _container.children("ul").children("li"),
            _index = 0;

        ChangeNews();

        function ChangeNews() {
            if (!pauseNews) {
                _itemsToRotate.hide();
                _itemsToRotate.eq(_index).show();
                _index++;
                if (_index >= _itemsToRotate.length) {
                    _index = 0;
                }
            }
            setTimeout(ChangeNews, _timerLength);
        }
    };


    $.fn.rotating_events = function (p) {
        var p = p || {};
        var _timerLength = p && (p.timerLength != null) ? p.timerLength : 5000,
            _transitionLength = p && (p.transitionLength != null) ? p.transitionLength : 1000;
        var _container = $(this),
            _itemsToRotate = _container.children("ul").children("li"),
            _index = 0;

        ChangeEvents();

        function ChangeEvents() {
            if (!pauseEvents) {
                _itemsToRotate.hide();
                _itemsToRotate.eq(_index).show();
                _index++;
                if (_index >= _itemsToRotate.length) {
                    _index = 0;
                }
            }
            setTimeout(ChangeEvents, _timerLength);
        }
    };
           
});