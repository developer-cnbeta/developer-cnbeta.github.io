/*
global
	require, jQBrowser, $,window,document,requirejs,define
*/
define(['jquery'], function() {
	var perloader = function(resources) {
		var _t = this;
		var depJSON = [];
		var percentStart = 0;
		_t.opt = $.extend({
			progressTarger:"",
			js:"",
			css:"",
			images:"",
			cssPatch:"../../css/",/* 相对于js/app目录 */
			imagesPatch:"images/" /* 相对于HTML目录 */
		}, resources);

		var $dom = $(document);
		var eachPercent;

		if (
			!_t.opt.js &&
			!_t.opt.css.pathsResources_css.length &&
			!_t.opt.images.pathsResources_img.length
		) {
			window.console && console.log("没有资源需要加载");
			$dom.trigger("requireNotLoad");
			window.console && console.log("dom trigger event: requireNotLoad");
			return;
		}

		//console.log(_t.opt.js);
		//console.log(_t.opt.css.pathsResources_css);
		//console.log(_t.opt.images.pathsResources_img);

		$.each(_t.opt.js, function(a,b) {
			depJSON.push(a);
		});

		require.config({
			paths: _t.opt.js
		});

		if (_t.opt.css.pathsResources_css.length) {
			$.each(_t.opt.css.pathsResources_css, function(i,d){
				if (_t.opt.cssPatch) {
					d = _t.opt.cssPatch + d;
				}
				depJSON.push( "css!" + d);
			});
		}


		if (_t.opt.images.pathsResources_img.length) {
			$.each(_t.opt.images.pathsResources_img, function (i, d) {
				if (_t.opt.imagesPatch) {
					d = _t.opt.imagesPatch + d;
				}
				depJSON.push("image!" + d);
			});
		}

		window.console && console.log(depJSON);

		eachPercent = (100 / depJSON.length);
		$dom.on('requireLoaded', function(e,d) {
			window.console && console.log( Math.floor(d.percentStart*1)/1 + "% " + ' is load ['+ d.d +'].' );
			if (_t.opt.progressTarger) {
				var $progressTarget = $("_t.opt.progressTarger");
				if (!$progressTarget.length) {
					$progressTarget.css({
						width: d.percentStart + "%"
					});
				}
			}/*进度条样式*/

			if (d.percentStart >= 99) {
				window.console && console.log('All loaded!');
				$dom.off('requireLoaded');
				$dom.trigger('requireDone');
				window.console && console.log("dom trigger event: requireDone ");
				$dom.data('states', 'requireDone');
			}
		});

		$.each(depJSON, function(i,d) {
			require([d],function() {
				percentStart = percentStart + eachPercent;
				var eventobj = {};
				if (percentStart >= 99) {
					percentStart = 100;
				}
				eventobj.percentStart = percentStart;
				eventobj.d = d;
				$dom.trigger("requireLoaded", eventobj);
				if (typeof arguments[0] == 'object') {
					console.log(arguments[0]);
				}
			});
		});
		window.console && console.log('--- 🔴 require资源列表 ---');
		window.console && console.log(requirejs.s.contexts._.config.paths);
		window.console && console.log('--- 🔵 require资源列表 ---');

	};
	return perloader;
});