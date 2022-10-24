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
    maxNum = parseInt(url.searchParams.get("max") || "99");
    if (maxNum<1000) {
      $("#num4").parent().remove();
      $(".col-xs-4").css("width","33.33333333%");
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
  var getRandomNum = function (usedNum, minNum, maxNum, size) {
    var randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum-0.5);
    
    // while(Math.floor(randomNum/10)-randomNum%10 == 0)
    //   randomNum = Math.round(Math.random() * (maxNum - minNum + 1) + minNum-0.5);
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

  // Lottery
  var usedArr = [];
  var numArr = getRandomNum(usedArr, config[0], config[1], config[2]);
  var pressTimes = 0, preNum = 0;
  $('body').keydown(function (event) {
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
    }
  })
});
