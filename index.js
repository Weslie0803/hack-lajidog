/*
	原网址: https://camuskit-bonustime.netlify.com/
	感谢作者把代码写得如此清晰而通用. 所有写出整洁代码的人都值得尊敬. 
	BearDic, 2018-10-29. 
*/

$(document).ready(function () {
	console.log('%c原网址: https://camuskit-bonustime.netlify.com/', 'color:blue;font-size:1.5em');
	console.log('%c感谢原作者把代码写得如此清晰而通用. 所有写出整洁代码的人都值得尊敬.', 'color:blue;font-size:1.5em');
	console.log('%cBearDic, 2018-10-29. ', 'color:black;font-size:1.2em');
  var getConfig = function () {
    const url = new URL(window.location.href);
    var minNum = 1, maxNum = 999, size = 4, hasBackground = false, cardBackground = false, showMode = 0;

    minNum = parseInt(url.searchParams.get("min") || "0");
    maxNum = parseInt(url.searchParams.get("max") || "779");
    if (maxNum<1000) {
      $("#num4").parent().remove();
      $(".col-xs-4").css("width","33.333333333%");
      size=3;
      if (maxNum < 100) {
        $("#num3").parent().remove();
        $(".col-xs-4").css("width", "50%");
        size=2;
        if (maxNum<10) {
          $("#num2").parent().remove();
          $(".col-xs-4").css("width", "100%");
          $(".container").css("max-width", "400px");
          size=1;
        }
      }
    }
    else size = 4;
    const customBackground = url.searchParams.get("bg_url");
    cardBackground = false;
    showMode = 1;
    return [minNum, maxNum, size, customBackground, cardBackground, showMode];
  };

  // Add special background
  var addBackground = function (bgUrl) {
    $('body').css('background-image', `url(${bgUrl})`);
  };
  var addCardBackground = function () {
    for (var i = 0; i < 10; i++) {
      $('#card' + i).css('background', 'url(\'images/' + i + '.jpg\') no-repeat center 200px').text('');
    }
  };

  // Get a random number, and return as a string array
  // 三等奖：抽一个数0~9
  // 二等奖：先抽取4大家族之一（0~3）（老师线下手抽，手动切换背景），再抽一个数
  // 一等奖：抽取键合奇偶（0~1），抽颜色（0~7），抽数
  // 特等奖：抽键合（0~7），抽颜色（0~7），抽数（0~9），三步
  // 因此，仍然抽一个三位数，自高位到低位分别是键合、颜色、数
  var getRandomNum = function (usedNum, minNum, maxNum, size) {
    //0~779，且十位不能大于7
    var randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum-0.5);
    
    while(randomNum%100 > 79)
      randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum-0.5);
    
      usedNum.push(randomNum);
    var str = randomNum.toString();
    while (str.length < size) str = '0' + str;
    //str = str.substr(0,1) + '&' + str.substr(1,1);
    //str = '??' + str;
    return str.split('');
  };

  // Toggle between Cube and Ring
  var toggleShape = function () {
    $('#shape').toggleClass('ring').toggleClass('cube');
  };

  // Open ring and show num, or inversely
  var toggleBetweenNumAndCube = function (ringNum, cubeNum) {
    var $shape = $('#shape');
    $shape.toggleClass('ringShow_' + ringNum).toggleClass('cubeShow_' + cubeNum);
    $shape.css('-webkit-transform', 'rotateY(' + (-36 * ringNum) + 'deg)');
  };

  // Let card jump
  var toggleCardJump = function (num) {
    $('#card' + num).toggleClass('jump' + num);
  };

  // Write the number into num block
  var displayNum = function (cardNum, showNum) {
    $('#num' + cardNum).text(showNum);
  };

  // Let the number jump
  var toggleNumJump = function (num) {
    $('#num' + num).toggleClass('jumpDown');
  };

  // The whole lottery process with one num
  var showNumByTurn = function (times, targetNum, originNum) {
    toggleShape();
    toggleBetweenNumAndCube(targetNum, originNum);
    setTimeout(function () {
      toggleCardJump(numArr[times]);
      setTimeout(function () {
        displayNum(times + 1, numArr[times]);
        toggleNumJump(times + 1);
        toggleShape();
        toggleBetweenNumAndCube(targetNum, targetNum);
        toggleCardJump(numArr[times]);
      }, 1100);
    }, 3300);
  };

  // Show all num once
  var showNumOnce = function (numArr) {
    for (var i = 0; i < numArr.length; i++) {
      displayNum(i + 1, numArr[i]);
      toggleNumJump(i + 1);
    }
  };

  // clear numbers
  var clearNum = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      toggleNumJump(i + 1);
      $('#num' + (i + 1)).text('');
    }
  };

  // 0: minNum, 1: maxNum, 2: numLength, 3: hasBackground.
  var config = getConfig();

  // Add background
  if (config[3])
    addBackground(config[3]);
  if (config[4])
    addCardBackground();

  var toggleSingleFrame = function () {
    $("#num3").parent().remove();
    $("#num2").css("display", "none");
    $(".col-xs-4").css("width", "100%");
    $(".container").css("max-width", "380px");
    $(".showNum").toggleClass("numUndicided");
  }
  var toggleDoubleFrame = function(){
    $("#num3").parent().remove();
    $("#num2").css("display", "inherit");
    $(".container").css("max-width", "730px");
    $(".col-xs-4").css("width", "50%");
  }
    // Lottery
  var usedArr = [];
  var numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
  var pressTimes = 0, preNum = 0;
  var prize = 3;
  $('body').keydown(function (event) {
    if (event.which === 51) {// press key 3
      prize = 3;
      toggleThirdPrize();
      pressTimes = 0;
    } else if(event.which === 50) {// press key 2
      prize = 2;
      toggleSecondPrize();
      pressTimes = 0;
    } else if(event.which === 49) {// press key 1
      prize = 1;
      toggleFirstPrize();
      pressTimes = 0;
    } else if(event.which === 48) {// press key 0
      prize = 0;
      toggleSpecialPrize();
      pressTimes = 0;
    }
    if (config[5] === 0) {
      if (event.which === 32) {
        if (pressTimes < numArr.length) {
          showNumByTurn(pressTimes, numArr[pressTimes], preNum);
          preNum = numArr[pressTimes];
          pressTimes++;
        } else {
          pressTimes = 0;
          clearNum(numArr);
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
        }
      }
    } else if (config[5] === 1) {
      if (prize === -1){
        if (event.which === 32 && pressTimes === 0) {
          toggleShape();
          pressTimes++;
        } else if (event.which === 32 && pressTimes === 1) {
          toggleShape();
          showNumOnce(numArr);
          pressTimes++;
        } else if (event.which === 32 && pressTimes === 2) {
          clearNum(numArr);
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
          pressTimes = 0;
        }
      } else if(prize === 3){
        if(event.which === 32 && pressTimes === 0){
          // 旋转变形
          toggleExpand();
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 1){
          // 抽出数字
          toggleResult(numArr[2])
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 2){
          // 重置
          toggleExpand();
          toggleThirdPrize();
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
          pressTimes = 0;
        }
      } else if(prize === 2){
        if(pressTimes === 0){
          // 抽出家族
          if(event.which === 80){ // press P :高分子
            $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
            $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
            $("#card0").parent().parent().css("transform", "translateY(-1000px)");
            $("#result1").parent().css("transform", "translateY(0px)");
            $("#2p1").css("background-image", "url(抽奖软件UI/底色/高分子/高分子1.png)");
            $("#2p2").css("background-image", "url(抽奖软件UI/底色/高分子/高分子2.png)");
            // $(".NumRolling").children("ul").children("li").children("img").css("filter", "drop-shadow(50px, 50px, #9d7a11)");
            // $(".bondbg2").css("filter", "dropshadow(50px, 50px ,#9d7a11)");
            pressTimes ++;
          } else if(event.which === 77) { // press M: 金属
            $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
            $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
            $("#card0").parent().parent().css("transform", "translateY(-1000px)");
            $("#result1").parent().css("transform", "translateY(0px)");
            $("#2p1").css("background-image", "url(抽奖软件UI/底色/金属/金属1.png)");
            $("#2p2").css("background-image", "url(抽奖软件UI/底色/金属/金属2.png)");
            pressTimes ++;
          } else if(event.which === 78) { // press N: 非金
            $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
            $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
            $("#card0").parent().parent().css("transform", "translateY(-1000px)");
            $("#result1").parent().css("transform", "translateY(0px)");
            $("#2p1").css("background-image", "url(抽奖软件UI/底色/非金/非金1.png)");
            $("#2p2").css("background-image", "url(抽奖软件UI/底色/非金/非金2.png)");
            pressTimes ++;
          } else if(event.which === 67) { // press C: 复合
            $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
            $("#bond0").parent().parent().css("transform", "translateY(-1000px)");
            $("#card0").parent().parent().css("transform", "translateY(-1000px)");
            $("#result1").parent().css("transform", "translateY(0px)");
            $("#2p1").css("background-image", "url(抽奖软件UI/底色/复合/复合1.png)");
            $("#2p2").css("background-image", "url(抽奖软件UI/底色/复合/复合2.png)");
            pressTimes ++;
          }
        } else if(event.which === 32 && pressTimes === 1) {
          // 抽出数字
          $("#result1").toggleClass("jumpDown");
          $("#result2").toggleClass("jumpDown");
          $(".NumRolling").children("ul").css("display", "none");
          $(".NumRolling").children("img").css("display", "inherit");
          $(".NumRolling").children("img").attr("src", "抽奖软件UI/数字/"+numArr[2]+".png");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 2) {
          // 重置
          $("#result1").toggleClass("jumpDown");
          $("#result2").toggleClass("jumpDown");
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
          toggleSecondPrize();
          pressTimes = 0;
        }
      } else if(prize === 1){
        if(event.which === 32 && pressTimes === 0){
          // 扩张，出现卡池
          toggleExpand();
          $(".row").css("transform", "translateY(0px)");
          $("#bg0").parent().parent().css("transform", "translateY(-100px) translateZ(-500px)");
          $("#bond0").parent().parent().css("transform", "translateY(-100px) translateZ(-500px) rotateZ(45deg)");
          $("#card0").parent().parent().css("transform", "translateY(-100px) translateZ(-760px)");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 1) {
          // 抽键合奇偶
          if(numArr[0] % 2 === 0){// 偶数
            $("#br1").attr("src", "抽奖软件UI/键和方式/2-水.png");
            $("#b11l").attr("src", "抽奖软件UI/键和方式/2-水.png");
            $("#b11r").attr("src", "抽奖软件UI/键和方式/2-水.png");
            $("#br2").attr("src", "抽奖软件UI/键和方式/4-正四面体.png");
            $("#b12l").attr("src", "抽奖软件UI/键和方式/4-正四面体.png");
            $("#b12r").attr("src", "抽奖软件UI/键和方式/4-正四面体.png");
            $("#br3").attr("src", "抽奖软件UI/键和方式/6-丙炔.png");
            $("#b13l").attr("src", "抽奖软件UI/键和方式/6-丙炔.png");
            $("#b13r").attr("src", "抽奖软件UI/键和方式/6-丙炔.png");
            $("#br4").attr("src", "抽奖软件UI/键和方式/8-BCC.png");
            $("#b14l").attr("src", "抽奖软件UI/键和方式/8-BCC.png");
            $("#b14r").attr("src", "抽奖软件UI/键和方式/8-BCC.png");
          } else {
            $("#br1").attr("src", "抽奖软件UI/键和方式/1-H2.png");
            $("#b11l").attr("src", "抽奖软件UI/键和方式/1-H2.png");
            $("#b11r").attr("src", "抽奖软件UI/键和方式/1-H2.png");
            $("#br2").attr("src", "抽奖软件UI/键和方式/3-乙炔.png");
            $("#b12l").attr("src", "抽奖软件UI/键和方式/3-乙炔.png");
            $("#b12r").attr("src", "抽奖软件UI/键和方式/3-乙炔.png");
            $("#br3").attr("src", "抽奖软件UI/键和方式/5-石墨.png");
            $("#b13l").attr("src", "抽奖软件UI/键和方式/5-石墨.png");
            $("#b13r").attr("src", "抽奖软件UI/键和方式/5-石墨.png");
            $("#br4").attr("src", "抽奖软件UI/键和方式/7-简单立方.png");
            $("#b14l").attr("src", "抽奖软件UI/键和方式/7-简单立方.png");
            $("#b14r").attr("src", "抽奖软件UI/键和方式/7-简单立方.png");
          }
          $("#num1").toggleClass("jumpDown");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 2) {
          // 抽底色
          if(numArr[1] === '0'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/金属/金属1.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/金属/金属1.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '1'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/金属/金属2.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/金属/金属2.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '2'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/复合/复合1.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/复合/复合1.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '3'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/复合/复合2.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/复合/复合2.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '4'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/非金/非金1.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/非金/非金1.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '5'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/非金/非金2.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/非金/非金2.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '6'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/高分子/高分子1.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/高分子/高分子1.png)");
            // $("#num2").css("background-size", "contain");
          } else if(numArr[1] === '7'){
            $("#num2").css("background-image", "url(抽奖软件UI/底色/高分子/高分子2.png)");
            $("#result11").parent().children().children(".showNum").css("background-image", "url(抽奖软件UI/底色/高分子/高分子2.png)");
            // $("#num2").css("background-size", "contain");
          }
          $("#num2").toggleClass("jumpDown");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 3) {
          // 抽数字
          $("#num3").children("img").attr("src", "抽奖软件UI/数字/"+numArr[2]+".png");
          $(".prize1").attr("src", "抽奖软件UI/数字/"+numArr[2]+".png");
          $("#num3").toggleClass("jumpDown");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 4) {
          // 生成最终卡片
          $("#result11").parent().css("transform", "translateY(0px)");
          $(".row").css("transform", "translateY(2500px)");
          $("#bg0").parent().parent().css("transform", "translateY(-1000px)");
          $("#bond0").parent().parent().css("transform", "translateY(-1000px) rotateZ(45deg)");
          $("#card0").parent().parent().css("transform", "translateY(-1000px) ");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 5) {
          // 清空，重置
          $("#num1").toggleClass("jumpDown");
          $("#num2").toggleClass("jumpDown");
          $("#num3").toggleClass("jumpDown");
          numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
          toggleExpand()
          toggleFirstPrize();
          pressTimes = 0;
        }
      } else if(prize === 0){
        if(event.which === 32 && pressTimes === 0){
          // 扩张，出现卡池
          toggleExpand();
          $(".row").css("transform", "translateY(0px)");
          $("#bg0").parent().parent().css("transform", "translateY(-100px) translateZ(-500px)");
          $("#bond0").parent().parent().css("transform", "translateY(-100px) translateZ(-500px) rotateZ(45deg)");
          $("#card0").parent().parent().css("transform", "translateY(-100px) translateZ(-760px)");
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 1){
          // 抽键合
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 2){
          // 抽背底
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 3){
          // 抽数字
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 4){
          // 最终卡片
          pressTimes++;
        } else if(event.which === 32 && pressTimes === 5){
          // 清空，重置
          toggleSpecialPrize();
          pressTimes = 0;
        }
      }
    }
  })
});
