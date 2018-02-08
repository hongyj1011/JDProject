(function () {
	require('vendorDir/reset.css');
	require('componentsDir/base.css');
	require('vendorDir/swiper.min.css');
	require('./index.css');
	var Mock = require('vendorDir/mock-min.js');
	var Swiper = require("vendorDir/swiper.min.js");
	require("vendorDir/jquery.js");
	var initObj = require('./initData.js');

	$(".headBanner i").on("click", function () {
		$(this).parent().hide();
	});

	var citysArr = ["北京", "上海", "天津", "重庆", "河北", "山西", "河南", "辽宁", "吉林", "黑龙江", "内蒙古", "江苏", "山东", "安徽", "浙江", "福建", "湖北", "湖南", "广东", "广西", "江西", "四川", "海南", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "港澳", "台湾", "钓鱼岛", "海外"];
	for (var i = 0; i < citysArr.length; i++) {
		$(".location ul").append($("<li><a href='javascript:void(0)'>" + citysArr[i] + "</a></li>"));
	}
	$(".location a").eq(0).addClass("currentCity");
	$(".location a").on("click", function () {
		$(this).addClass("currentCity").parent().siblings().children("a").removeClass("currentCity");
		$(".location-Place span").text($(this).text());

	});

	var line = $(".pubNotice-line");
	var pubBody = $(".pubBody");
	$(".pubNotice-01").mouseover(function () {
		line.css("left", "15px");
		pubBody.children().eq(0).show().siblings().hide();
	});

	$(".pubNotice-02").mouseover(function () {
		line.css("left", "75px");
		pubBody.children().eq(1).show().siblings().hide();
	});

	$(".bConten1").on("mouseenter", "li", function () {
		$(this).addClass('hover').siblings().removeClass('hover');
		$(".popDiv").show().children().eq($(this).index()).show().siblings().hide();
	}).on("mouseleave", function () {
		$(this).find(".hover").removeClass("hover");
		$(".popDiv").hide();
	});
	if (!IS_PRODUCTION) {
		console.log('如果你看到这个Log，实际上是开发版本');
	}
	// 初始化数据
	initObj.init();
	
	
})();