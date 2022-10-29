var toggleThirdPrize = function () {
    $(".row").css("transform", "translateY(2500px)");
    $("#result").parent().css("transform", "translateY(2500px)");
    // $("#result").css("display", "none");
    $("#bg0").parent().parent().css("transform", "translateY(0px) translateZ(-250px)");
    $("#bond0").parent().parent().css("transform", "translateY(0px) translateZ(-250px) rotateZ(45deg)");
    $("#card0").parent().parent().css("transform", "translateY(0px) translateZ(-380px)");
}
var toggleExpand = function(){
    //TODO
    $("#bg0").parent().toggleClass("ring8card").toggleClass("ring8card2");
    $("#bond0").parent().toggleClass("ring8").toggleClass("ring82");
    $("#card0").parent().toggleClass("ringNum").toggleClass("cube");
}
var toggleResult = function(num){
    //TODO
    $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
    $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
    $("#card0").parent().parent().css("transform", "translateY(-1000px)");
    $("#n1").attr("src", "抽奖软件UI/数字/"+num+".png")
    $("#result").css("display"," block");
    $("#result").parent().css("transform"," translateY(0)");
}

var toggleSecondPrize = function() {
    $(".NumRolling").children("img").css("display", "none");
    $(".NumRolling").children(".backnum").css("display", "none");
    $(".NumRolling").children("ul").css("display", "inherit");
    $(".row").css("transform", "translateY(2500px)");
    $("#result1").parent().css("transform", "translateY(2500px)");
    // $("#result").css("display", "none");
    $("#bg0").parent().parent().css("transform", "translateY(0px) translateZ(-250px)");
    $("#bond0").parent().parent().css("transform", "translateY(0px) translateZ(-250px) rotateZ(45deg)");
    $("#card0").parent().parent().css("transform", "translateY(0px) translateZ(-380px)");
}

var toggleFirstPrize = function() {
    $(".NumRolling").children("img").css("display", "none");
    $(".NumRolling").children("ul").css("display", "inherit");
    $(".row").css("transform", "translateY(2500px)");
    $("#result1").parent().css("transform", "translateY(2500px)");
    // $("#result").css("display", "none");
    $("#bg0").parent().parent().css("transform", "translateY(0px) translateZ(-250px)");
    $("#bond0").parent().parent().css("transform", "translateY(0px) translateZ(-250px) rotateZ(45deg)");
    $("#card0").parent().parent().css("transform", "translateY(0px) translateZ(-380px)");
    $("#result11").parent().css("transform", "translateY(2250px)");
    $("#result0").parent().css("transform", "translateY(2250px)");
    $("#num1").children("ul").css("display", "inherit");
    $("#num1").children("img").css("display", "none");
    // 清空row
    $("#num1").children("ul").children("li").children("img").attr("src", "");
    $("#num2").css("background-image","");
    $("#num3").children("img").attr("src","");
}
var toggleSpecialPrize = function() {
    $(".NumRolling").children("img").css("display", "none");
    $(".NumRolling").children("ul").css("display", "inherit");
    $(".row").css("transform", "translateY(2500px)");
    $("#result1").parent().css("transform", "translateY(2500px)");
    // $("#result").css("display", "none");
    $("#bg0").parent().parent().css("transform", "translateY(0px) translateZ(-250px)");
    $("#bond0").parent().parent().css("transform", "translateY(0px) translateZ(-250px) rotateZ(45deg)");
    $("#card0").parent().parent().css("transform", "translateY(0px) translateZ(-380px)");
    $("#result11").parent().css("transform", "translateY(2250px)");
    $("#result0").parent().css("transform", "translateY(2250px)");
    $("#num1").children("img").css("display", "inherit");
    $("#num1").children("ul").css("display", "none");
    // 清空row
    $("#num1").children("img").attr("src", "");
    $("#num2").css("background-image","");
    $("#num3").children("img").attr("src","");
}