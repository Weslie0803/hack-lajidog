var toggleExpand = function(){
    //TODO
    $("#bg0").parent().toggleClass("ring8card").toggleClass("ring8card2");
}
var toggleResult = function(num){
    //TODO
    $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
    $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
    $("#card0").parent().parent().css("transform", "translateY(-1000px)");
    $("#n1").attr("src", "抽奖软件UI/数字/"+num+".png")
    $("#result").css("display"," block");
    $("#result").css("transform"," translateZ(-1000px)");
    $("#result").css("transform"," translateZ(0)");
}
