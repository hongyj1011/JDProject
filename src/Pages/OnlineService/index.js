require('vendorDir/reset.css');
require('vendorDir/swiper.min.css');
require('./index.css');
require('componentsDir/base.css');
var Mock = require('vendorDir/mock-min.js');
// var Swiper = require("vendorDir/swiper.min.js");
// require("vendorDir/jquery.js");

(function () {
    $(".serviceFoot a").on("click",function  () {
        if ($(".serviceFoot input").val()) {
            Mock.mock(/CusService.php/, {
				respond:'@csentence'
			});
            $.ajax({
                url:"CusService.php",
                type:"POST",
                dataType: "json",
                data:{"content":$(".serviceFoot input").val()},
                success:function (respondData){
                    var render = require('./Template/responseModel.art');
                    var innerHTML = render(respondData);
                    $(".serviceBody").append(innerHTML);
                },
                error:function (error) {
                    var offline = $('<div class="offline">'+'<span>'+error.status+" "+error.statusText+'</span>'+'</div>');
                    offline.appendTo($(".serviceBody"));
                },complete:function  () {
                    $(".serviceBody").scrollTop($(".serviceBody")[0].scrollHeight);
                }
            });
            var userData = {userBody:$(".serviceFoot input").val()};
            var render = require('./Template/userModel.art');
            var userHtml = render(userData);
            $(".serviceBody").append(userHtml);
           
            $(".serviceBody").scrollTop($(".serviceBody")[0].scrollHeight);
            $(".serviceFoot input").val("");
            
        }
    })
    $(".serviceFoot input").keydown(function  (e) {
        if (e.keyCode == 13) {
            $(".serviceFoot a").triggerHandler("click");
        }
        
    });
})();