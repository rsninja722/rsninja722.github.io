// define double ctrl shortcut
jQuery(function($) {
	window.icrtDoubleCtrlShortcut = function (icrtDoubleCtrlShortcut_pageUrlForPreview) {
		$('body').keyup(function(e) {
			var t = this, keyCode;
			if(typeof(e.keyCode) == 'number') {
				keyCode = e.keyCode;
			} else if(typeof(e.which ) == 'number') {
				keyCode = e.which;
			} else if (typeof(e.charCode) == 'number') {
				keyCode = e.charCode;
			} else {
				var now = new Date();
				t._icrt_keyPressed_ = -1;
				return;
			}
			var now = new Date();
			if (keyCode == 17) {
				if (t._icrt_keyPressed_ >= 0) {
					var diff = now.getTime() - t._icrt_keyPressed_;
					if (diff > 0 && diff < 500) {
						try {
							var win = typeof(icrtDoubleCtrlShortcut_window) == 'undefined' ? window : icrtDoubleCtrlShortcut_window;
							win.location.href = icrtDoubleCtrlShortcut_pageUrlForPreview;
						} catch (ex) {
							// might failed because of choosing to stay with current page
						}
					}
				}
				t._icrt_keyPressed_ = now.getTime();
			} else {
				t._icrt_keyPressed_ = -1;
			}
		});
	}
});
