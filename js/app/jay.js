/*
global
	require, jQBrowser, $,window,document
*/
$(function() {
	var $dom = $(document);
	var jsonURL = 'http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
	var jsonParm = {
		tags: "mount rainier",
		tagmode: "any",
		format: "json"
	};
//	$.getJSON(jsonURL, jsonParm,function(data) {
//		console.log(data);
//	});
	function showjson() {
		if (!arguments.length) {return;}
		window.console && console.log(arguments[0][0]);
	}
	function showConsole() {
		if (!arguments.length) {return;}
		window.console && console.log(arguments[0]);
	}
	var jsonURL2 = 'js/app/test_json_list.json';
//	$.getJSON(jsonURL2)
//		.success(function() {showjson(arguments); })
//		.error(function() {showConsole(arguments);})
//		.complete(function() {showConsole(arguments);});
	var  a1 = $.getJSON(jsonURL, jsonParm);
	var  a2 = $.getJSON(jsonURL2);
//	a1.error(function() {
//		alert("图片资源加载失败");
//	});
//	a2.error(function() {
//		alert("列表资源加载失败");
//	});
	
	function getlistData() {
		console.log('getlistData');
		$.when(a1,a2).then(function(a,b) {
//			console.log(a[0].items);
//			console.log(b[0].newslist);
			$.each(b[0].newslist, function(i,d) {
				//console.log(i);
				//console.log(d);
				d.thumbURL = a[0].items[i].media.m;
			});
			console.log(b[0].newslist);
//			var template = $("#template").html();
//			var compiledTemplate = Template7.compile(template);
//			var htmldata =  compiledTemplate(b[0]);
//			console.log(htmldata);
//			$("#INDEX_LIST_CONTENT").html(htmldata);
		});	
	}
	
	
	var f7options = {
		init:false
	}
	
	function initWebapp() {
		var thisWebapp = new Framework7(f7options);
		window.thisWebapp = thisWebapp;
		$dom.trigger('f7ready', thisWebapp);
		var mainView = thisWebapp.addView('.view-main', {
			dynamicNavbar:true
		}); /*建立显示区域*/
		mainView.main = true; /*把它设置为主显示区域*/
		thisWebapp.init(); /*初始化Framwork7框架*/
		getlistData();
	}
	fn_statecheck($dom, 'states', 'requireDone', initWebapp);
});