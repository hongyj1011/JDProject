(function() {
	$(".headBanner i").on("click", function() {
		$(this).parent().hide();
	});
	
	
	var citysArr = ["北京", "上海", "天津", "重庆", "河北", "山西", "河南", "辽宁", "吉林", "黑龙江", "内蒙古", "江苏", "山东", "安徽", "浙江", "福建", "湖北", "湖南", "广东", "广西", "江西", "四川", "海南", "贵州", "云南", "西藏", "陕西", "甘肃", "青海", "宁夏", "新疆", "港澳", "台湾", "钓鱼岛", "海外"];
	for(var i = 0; i < citysArr.length; i++) {
		$(".location ul").append($("<li><a href='javascript:void(0)'>" + citysArr[i] + "</a></li>"));
	}
	$(".location a").eq(0).addClass("currentCity");
	$(".location a").on("click", function() {
		$(this).addClass("currentCity").parent().siblings().children("a").removeClass("currentCity");
		$(".location-Place span").text($(this).text());
	});
	
	
	var line = $(".pubNotice-line");
	var pubBody = $(".pubBody");
	$(".pubNotice-01").mouseover(function  () {
		line.css("left","15px");
		pubBody.children().eq(0).show().siblings().hide();
	});
	$(".pubNotice-02").mouseover(function  () {
		line.css("left","75px");
		pubBody.children().eq(1).show().siblings().hide();
	});
	
	$(".bConten1 ul").on("mouseenter mouseleave","li",function () {
		$(".popDiv").children().eq($(this).index()).toggle();
	})
})();
var initObj = {
	initSiteNav: function() {
		$.ajax({
			url: "PHP/siteNav.php",
			type: "POST",
			dataType: "json",
			success: function(data) {
				var jsonArr = {
					jsondata: data
				};
				var html = template('siteNavModel', jsonArr);
				$(".siteNav div").append(html);
			},
			error: function(error) {
				$(".siteNav div").append(error.status + error.statusText);
			}
		})
	},
	initlunBo: function() {
		jQuery(document).ready(function($) {

			var jssor_1_SlideshowTransitions = [{
				$Duration: 800,
				$Opacity: 2
			}];

			var jssor_1_options = {
				$AutoPlay: 1,
				$Cols: 1,
				$Align: 0,
				$SlideshowOptions: {
					$Class: $JssorSlideshowRunner$,
					$Transitions: jssor_1_SlideshowTransitions,
					$TransitionsOrder: 1
				},
				$ArrowNavigatorOptions: {
					$Class: $JssorArrowNavigator$
				},
				$BulletNavigatorOptions: {
					$Class: $JssorBulletNavigator$
				}
			};

			var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
		});
	},
	initBanner : function () {
		$.ajax({
			url : "PHP/bannerChannel.php",
			type: "POST",
			dataType: "json",
			success : function  (data) {
				var jsonArr = {
					jsondata: data
				};
				var html = template('bannerChannel', jsonArr);
				$(".popDiv").append(html);
			},
			error : function (errormsg) {
				console.log(errormsg);
			}
		});
	}
}
initObj.initlunBo();
initObj.initSiteNav();
initObj.initBanner();