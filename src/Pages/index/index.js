(function () {
	require('vendorDir/reset.css');
	require('componentsDir/base.css');
	require('vendorDir/swiper.min.css');
	require('./index.css');
	var Mock = require('vendorDir/mock-min.js');
	var Swiper = require("vendorDir/swiper.min.js");
	require("vendorDir/jquery.js");
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

	var initObj = {
		initSiteNav: function () {
			Mock.mock(/siteNav.php/, {
				'jsondata|4': [{
					'title': '@cword(4)',
					'content|15-20': ['@cword(2,4)']
				}]
			});
			$.ajax({
				url: "/PHP/siteNav.php",
				type: "POST",
				dataType: "json",
				success: function (data) {
					var render = require('./Template/siteNavModel.ejs');
					var html = render(data);
					$(".siteNav div").append(html);
				},
				error: function (error) {
					$(".siteNav div").append(error.status + error.statusText);
				}
			})
		},
		initlunBo: function () {
			var mySwiper = new Swiper('#banner-swiper', {
				loop: true,
				autoplay: {
					delay: 1000
				},
				// 如果需要分页器
				pagination: {
					el: '.banner-page',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					},
				},
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.banner-next',
					prevEl: '.banner-prev',
				},
			})

		},
		initBanner: function () {
			Mock.mock(/bannerChannel.php/, {
				'jsondata|16': [{
					'specialChannel|2-8': ['@cword(2,4)'],
					'content|7-15': [{
						'title': '@cword(2,4)',
						'message|5-15': ['@cword(2,6)']
					}],
					'sImgs|8': ['@dataImage("83x35","small")'],
					'bImgs|2': ['@dataImage("168x134","large")']
				}]
			});
			$.ajax({
				url: "/PHP/bannerChannel.php",
				type: "GET",
				dataType: "json",
				success: function (data) {
					var render = require('./Template/bannerChannel.ejs');
					var html = render(data);
					$(".popDiv").append(html);
				},
				error: function (errormsg) {
					console.log(errormsg);
				}
			});
		},
		setSKillTimer: function () {
			var allSecond = 3 * 60 * 60;
			var hourLabel = $(".cd-hour");
			var minuteLabel = $(".cd-minute");
			var secondLabel = $(".cd-second");
			var timer = setInterval(function () {
				if (allSecond <= 0) {
					clearInterval(timer);
					alert("秒杀结束");
					return;
				}
				allSecond--;
				var hour = Math.floor(allSecond / 3600);
				var minute = Math.floor(allSecond % 3600 / 60);
				var sec = allSecond % 60;
				if (hour < 10) {
					hourLabel.text("0" + hour);
				} else {
					hourLabel.text(hour);
				}
				if (minute < 10) {
					minuteLabel.text("0" + minute);
				} else {
					minuteLabel.text(minute);
				}
				if (sec < 10) {
					secondLabel.text("0" + sec);
				} else {
					secondLabel.text(sec);
				}
			}, 1000);
		},
		initSecKillList: function () {
			var data = Mock.mock({
				'jsondata|4-20': [{
					"id|+1": 1,
					'img': '@dataImage("140x140","hello")',
					'title': '@cword(10,20)',
					'newPrice|10-5000.2': 100,
					'originPrice|10-5000.2': 100
				}]
			});
			var render = require('./Template/secKillModel.ejs');
			var html = render(data);
			$("#secKill-area .swiper-wrapper").append(html);
			var mySwiper = new Swiper('#secKill-area', {
				loop: true,
				slidesPerView: 4,
				slidesPerGroup: 4,
				autoplay: {
					delay: 5000
				},
				// 如果需要前进后退按钮
				navigation: {
					nextEl: '.sk-next',
					prevEl: '.sk-prev',
				},
			});
			var rightData = Mock.mock({
				'lists|2-8': [{
					'img': '@dataImage("180x260","test")',
				}]
			});

			for (var i = 0; i < rightData.lists.length; i++) {
				var jsonData = rightData.lists[i];
				var eleHtml = '<div class="swiper-slide"><a class="sk-right-slide"><img src="' + jsonData.img + '"/></a></div>';
				$("#secKill-right .swiper-wrapper").append(eleHtml);
			}
			var secKillRight = new Swiper('#secKill-right', {
				loop: true,
				autoplay: {
					delay: 3000
				},
				pagination: {
					el: '.sk-right-pagination',
					clickable: true,
				},
			})
		}
	}
	initObj.initlunBo();
	initObj.initSiteNav();
	initObj.initBanner();
	initObj.setSKillTimer();
	initObj.initSecKillList();
})();