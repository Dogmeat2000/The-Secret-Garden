//MAKE THE MAGIC HAPPEN

//Butterfly functionality:
let stopButterflyAnimation = false;
let butterflyPanicEscape = false;
let butterflyRotated = false;
setButterflyInitialPosition();
$("#butterfly").mouseenter(stop_ButterflyAnimation);

//Butterfly functions:
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function setButterflyInitialPosition()
{
    //Get a random location outside of the window area. Limits are that the butterfly can not enter the screen from the ground.
    let windowHeight = $(window).height();
    let windowWidth = $(window).width();
    
    //Decide randomly if butterfly should come from the left of the screen or right. (or maybe above the screen, depending on the later set yPos)
    if(getRandomInt(10) % 2 === 0)
    {
        xPos = getRandomInt(windowWidth)+(getRandomInt(100));
    }
    else
    {
        xPos = 0-(getRandomInt(100));
    }

    let yPos = getRandomInt(windowHeight)-50;
    if(yPos < windowHeight && (xPos < windowWidth || xPos > 0))
    {
        yPos = -400;
    }

    $("#butterfly").offset({top: yPos, left: xPos});
    butterFlyEnterScreen(xPos, yPos);
}

function butterFlyEnterScreen(xPos, yPos)
{
    $("#butterfly").animate({top: yPos, left: xPos}, 2000);
    butterFlyRandomSlowMove();
}


function butterFlyRandomSlowMove()
{
    console.log("Running loop 'Butterfly Random Slow movement'");
    if(!stopButterflyAnimation)
    {
        //Define the area of the screen, where the butterfly can fly around in.
        let windowHeight = 100+$(window).height()-200;
        let windowWidth = 100+$(window).width()-200;

        let xPos = getRandomInt(windowWidth);
        let yPos = getRandomInt(windowHeight);

        let randomHeight = "" + (10+(getRandomInt(10))) + "%";
        let randomRotation = 100-(getRandomInt(200));

        $("#butterfly").animate({top: yPos, left: xPos}, 4000);
        $("#butterfly").animate({height: randomHeight}, {queue: false,duration: 4000});
        if(butterflyRotated)
        {
            $("#butterfly").animate(
                { deg: randomRotation },
                {
                  queue: false,
                  duration: 5000,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
              );

              butterflyRotated = true;
        }
        else
        {
            $("#butterfly").animate(
                { deg: randomRotation },
                {
                  queue: false,
                  duration: 5000,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
              );
            butterflyRotated = false;
        }
        resetButterflyColors();
    }

    setTimeout(butterFlyRandomSlowMove, 4000);
}

function butterFlyFastEscape() 
{
    if(butterflyPanicEscape)
    {
        console.log("Butterfly is in panic!!!!");
        let mouseXpos = event.pageX;
        let mouseYpos = event.pageY;
        let windowHeight = $(window).height()-400;
        let windowWidth = $(window).width()-400;
        let xPos = 0;
        let yPos = getRandomInt(windowHeight);

        if(mouseXpos > windowWidth/2)
        {
            xPos = getRandomInt(windowWidth/2);
        }
        else
        {
            xPos = (windowWidth/2 + getRandomInt(windowWidth/2));
        }

        let randomRotation = 100-(getRandomInt(200));
        let randomHeight = "" + (5+(getRandomInt(15))) + "%";
        
        $("#butterfly").animate({top: yPos, left: xPos}, 300);
        $("#butterfly").animate({height: randomHeight}, {queue: false,duration: 200});

        let invertString = "invert(" + (50+getRandomInt(50)) + "%) ";
        let sepiaString = "sepia(" + (20+getRandomInt(15)) + "%) ";
        let saturateString = "saturate(" + (500+getRandomInt(250)) + "%) ";
        let huerotateString = "hue-rotate(" + (250+getRandomInt(90)) + "deg) ";
        let contrastString = "contrast(" + (75+getRandomInt(75)) + "%) ";

        $("#butterfly").css({"filter": invertString + sepiaString + saturateString + huerotateString + contrastString});

        if(butterflyRotated)
        {
            $("#butterfly").animate(
                { deg: randomRotation },
                {
                  queue: false,
                  duration: 200,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
              );

              butterflyRotated = true;
        }
        else
        {
            $("#butterfly").animate(
                { deg: randomRotation },
                {
                  queue: false,
                  duration: 200,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
              );
            butterflyRotated = false;
        }
    }
}

function stop_ButterflyAnimation()
{
    console.log("Stopping all butterfly animations, and executing panic mode!");
    $("#butterfly").stop(true);
    stopButterflyAnimation = true;
    butterflyPanicEscape = true;
    $.when(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape());
    setTimeout(butterflyPanicEscape = false, 2000);
    setTimeout(stopButterflyAnimation = false, 2000);
}

function resetButterflyColors()
{
    $("#butterfly").css({"filter": "invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)"});
}


//Butterfly functionality ends here!


//<Apple functions begin here
let treeWidth = $("#tree").width();
let treeHeight = $("#tree").height();
let bodyWidth = $("#body").width();
let bodyHeight = $("#body").height();
// a function which finds a random position for the apples.
function getRandomPosition() {
  let randomX = 0.5 * bodyWidth + Math.floor(Math.random() * (treeWidth - 100)); // +50% to make it begin on the trees leafes. Adjust 100 so that it stays on the tree
  let randomY = 0.35 * treeHeight + Math.floor(Math.random() * (treeHeight - 280)); // +35% to make it begin on the trees leafes. Adjust 280 so that it stays on the tree

  return { left: randomX, bottom: randomY };
}

function moveToBasket(element, leftPosition, bottomPosition) {
  element.animate({
    left: leftPosition,
    bottom: topPosition
  }, 1000)
}

  let randomPosition1 = getRandomPosition();
  let randomPosition2 = getRandomPosition();
  let randomPosition3 = getRandomPosition();
  $("#apple1").css(randomPosition1);
  $("#apple2").css(randomPosition2);
  $("#apple3").css(randomPosition3); 

  $("#apple1").hover(
    function()
    {
      $("#apple1").animate({
        height: 0.07 * bodyHeight
      }, 500);
    },
    function()
    {
      $("#apple1").animate({
        height: 0.06 * bodyHeight
      }, 500);
    }
  )

  $("#apple1").click(function()
  {
    $("#apple1").animate({
      left: 0.55 * bodyWidth,
      bottom: 0.05 * bodyHeight
    }, 1000)
  });

  $("#apple2").hover(
    function()
    {
      $("#apple2").animate({
        height: 0.07 * bodyHeight
      }, 500);
    },
    function()
    {
      $("#apple2").animate({
        height: 0.06 * bodyHeight
      }, 500);
    }
  )

  $("#apple2").click(function()
  {
    $("#apple2").animate({
      left: 0.55 * bodyWidth,
      bottom: 0.05 * bodyHeight
    }, 1000)
  });

  $("#apple3").hover(
    function()
    {
      $("#apple3").animate({
        height: 0.07 * bodyHeight
      }, 500);
    },
    function()
    {
      $("#apple3").animate({
        height: 0.06 * bodyHeight
      }, 500);
    }
  )

  $("#apple3").click(function()
  {
    $("#apple3").animate({
      left: 0.55 * bodyWidth,
      bottom: 0.05 * bodyHeight
    }, 1000)
  });

  //Apple functions ends here!!


  
  // Making the net follow the curser - Zakaria:

$(document).mousemove(function (e) {

  var mouseX = e.pageX;

  var windowWidth = $(window).width();

  $('#net').offset({
      left: e.pageX,
      top: e.pageY 
  });

});

// Extra feature Zakaria (adding background coulour to the net)

$(document).ready(function () {
  function getRandomColor() {
      var red = Math.floor(Math.random() * 256);
      var green = Math.floor(Math.random() * 256);
      var blue = Math.floor(Math.random() * 256);
      return 'rgb(' + red + ',' + green + ',' + blue + ')';
  }

  function updateColor() {
      $('#net').css({
          backgroundColor: getRandomColor(),
      });
  }

  setInterval(updateColor, 400);
});





 

