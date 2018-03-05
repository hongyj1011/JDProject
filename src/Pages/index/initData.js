var Mock = require('vendorDir/mock-min.js');
var Swiper = require("vendorDir/swiper.min.js");
var initObj = {
    init: function () {
        this.initBanner();
        this.initlunBo();
        this.initSecKillList();
        this.initSiteNav();
        this.setSKillTimer();
        this.initColumn01();
    },
    // 初始化网站导航数据
    initSiteNav: function () {
        Mock.mock(/text.PHP/, {
            'jsondata': [{
                'title': '@cword(4)',
                'content|20': ['@cword(2,4)']
            },
            {
                'title': '@cword(4)',
                'content|12-15': ['@cword(2,4)']
            },
            {
                'title': '@cword(4)',
                'content|12-15': ['@cword(2,4)']
            },
            {
                'title': '@cword(4)',
                'content|13-15': ['@cword(2,4)']
            }
        ]
        });
        $.ajax({
            url: "text.PHP",
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
    // 初始化轮播图
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
    // 初始化左侧导航列表数据
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
    // 秒杀倒计时
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
    // 初始化秒杀模块数据
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
    },
    // 排行榜、会买专辑、领券中心
    initColumn01: function () {
        Mock.mock(/col1.PHP/, {
            'rankData|5': [{
                'title': '@cword(2,4)',
                'content|6': [{
                    'img': '@dataImage("80x80","palceholde")',
                    'num|+1': 1,
                    'msg': '@cparagraph()'
                }]
            }],
            'albumData|2-5': [{
                'title': '@csentence',
                'subTitle': '@cparagraph(2)',
                'bgImg': '@dataImage("350x360","bgImg")',
                'imgItem|3': [
                    '@dataImage("70x70","img")'
                ]
            }],
            'ticketData|6':[{
                "price|50-1000": 100,
                'icon':'@dataImage("70x70","icon")',
                'limit|400-2000': 500,
                'desc':'@cparagraph(1,2)',
                'type':'@cword(2,4)'
            }]
        });
        $.ajax({
            type: "POST",
            url: "col1.PHP",
            dataType: "json",
            success: function (response) {
                var render = require('./Template/colRankModel.ejs');
                var html = render(response);
                $(".col-rank .box-bd").append(html);

                var albumModel = require('./Template/albumModel.ejs');
                var albumHtml = albumModel(response);
                $(".col-album .box-bd").append(albumHtml);

                var ticketModel = require('./Template/ticketModel.ejs');
                var ticketHtml = ticketModel(response);
                $(".col-ticket .box-bd").append(ticketHtml);
                var swipers = [];
                for (var i = 0; i < response.rankData.length; i++) {
                    (function (num) {
                        var swiper = new Swiper('.swiper' + num, {
                            slidesPerView: 1,
                            slidesPerColumn: 3,
                            observer: true, //当改变swiper的样式（例如隐藏/显示）或者修改swiper的子元素时，自动初始化swiper
                            observeParents: true,
                            spaceBetween: 0,
                            pagination: {
                                el: '.tab-page',
                                renderBullet: function (index, className) {
                                    return '<span class="' + className + '"  data-index="' + num + '"></span>';
                                },
                            }
                        });
                        swipers.push(swiper);
                    })(i);
                }
                var albumSwiper = new Swiper('.albumSwiper', {
                    pagination: {
                        el: '.tab-page',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '"  data-index="' + swipers.length + '"></span>';
                        },
                    },
                    navigation: {
                        nextEl: '.alb-next',
                        prevEl: '.alb-prev',

                    },

                });
                swipers.push(albumSwiper);

                var tickeSwiper = new Swiper('.ticketSwiper', {
                    slidesPerView: 1,
                    slidesPerColumn: 3,
                    pagination: {
                        el: '.tab-page',
                        clickable: true,
                        renderBullet: function (index, className) {
                            return '<span class="' + className + '"  data-index="' + swipers.length + '"></span>';
                        },
                    },
                });
                swipers.push(tickeSwiper);
                $(".tab-page").on("mouseenter", "span", function () {
                    var swiper = swipers[$(this).attr("data-index")];
                    swiper.slideTo($(this).index());
                })
                $(".tab-hd").on("mouseenter", "a", function () {
                    $(this).addClass("tab-active").siblings().removeClass("tab-active");
                    $(".tab-bd").children().eq($(this).index()).addClass("tabItem-active").siblings().removeClass("tabItem-active");
                });
            }
        });

    }

}
module.exports = initObj;