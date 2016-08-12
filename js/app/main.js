/*
global
	require, jQBrowser, $,window,document,define
*/
//配置页面加载模块参数
require.config({
	waitSeconds:0, /*加载等待时间*/
	//添加加载异步加载CSS的插件
	map:{
		'*':{
			'css':'../lib/css.min'
		}
	},
	//配置Javascript文件映射路径
	paths: {
		jquery:
		[
//			'//cdn.bootcss.com/jquery/1.12.0/jquery.min',
//			'//cdn.bootcss.com/jquery/2.2.0/jquery.min',
//			'//cdn.gbtags.com/jquery/2.1.1/jquery.min',
//			'../lib/jquery/1.12.0/jquery.min',
			'../lib/jquery/2.2.0/jquery.min'
		],
		jay :"jay"
	},
	shim: {
		/*模块依赖关系 demo*/
		'jay'  : {deps: ['jquery']}
	}
});

//Domready
document.onreadystatechange = function () {
	if (document.readyState == "interactive") {
	}
};


require(['jay_preloader'], function(preloader) {
	//console.log(fn);
	$('.debugclick').on('click', function() {
		window.location.reload(true);
	});
	var $jsdef = $.Deferred();
	var $cssdef = $.Deferred();
	var $imagedef = $.Deferred();
	var fn_statecheck = function(target, dataStates, state, isCallback) {
		if (!target.data(dataStates)) {
			target.on(state, function() {
				if (typeof isCallback == 'function') {isCallback();}
			});
		} else if (target.data(dataStates) == state ) {
			if (typeof isCallback == 'function') {isCallback();}
		}
	};
	window.fn_statecheck = fn_statecheck;
	require(['resources_css'], function(data) {
		$cssdef.resolve(data);
	});
	require(['resources_js'], function(data) {
		$jsdef.resolve(data);
	});
	require(['resources_images'], function(data) {
		$imagedef.resolve(data);
	});
	$.when($jsdef,  $cssdef, $imagedef).done(function(datajs,datacss,dataimg) {
		console.log('--- 🔴 资源加载列表 ---');
		console.log(datajs);
		console.log(datacss);
		console.log(dataimg);
		console.log('--- 🔵 资源加载列表 ---');
		preloader({
			js:datajs,
			css:datacss,
			images:dataimg
		});
	});
	require(['jay']);
});