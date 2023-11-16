//MAKE THE MAGIC HAPPEN

//Butterfly functionality attributes:
//Butterfly functions are implemented by Kristian Dashnaw
let stopButterflyAnimation = false;
let butterflyPanicEscape = false;
let butterflyRotated = false;
setButterflyInitialPosition();
$("#butterfly").mouseenter(stop_ButterflyAnimation);

//Butterfly functions:

//The getRandomInt function is used for several randomization calls further down in the code. It adds a element of non-repetitiveness to the implementation.
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

//This method is used for setting the butterflies iniatial spawn position to outside the window.
//We perform a number of operations to ensure that the "vector of attack" for the butterfly is always changing. 
//This means that it will enter the screen at different points on every webpage load.
//This approach was decided since it is more "beautiful" to have the butterfly not simple spawn the same place in the viewable window.
function setButterflyInitialPosition() {
  //Get a random location outside of the window area. Limits are that the butterfly can not enter the screen from the ground.
  let windowHeight = $(window).height();
  let windowWidth = $(window).width();

  //Decide randomly if butterfly should come from the left of the screen or right. (or maybe above the screen, depending on the later set yPos)
  if (getRandomInt(10) % 2 === 0) {
    xPos = getRandomInt(windowWidth) + (getRandomInt(100));
  }
  else {
    xPos = 0 - (getRandomInt(100));
  }

  let yPos = getRandomInt(windowHeight) - 50;
  if (yPos < windowHeight && (xPos < windowWidth || xPos > 0)) {
    yPos = -400;
  }

  $("#butterfly").offset({ top: yPos, left: xPos });
  butterFlyEnterScreen(xPos, yPos);
}

//This function animates the butterfly movement from the offscreen position, and onto the viewable area.
function butterFlyEnterScreen(xPos, yPos) {
  $("#butterfly").animate({ top: yPos, left: xPos }, 2000);
  butterFlyRandomSlowMove();
}

//This function applies the "all-ways running" butterfly movement functionality.
//Basically we here ensure that the butterfly is always moving in a slow peaceful speed, while not being chased by the mouse/net.
function butterFlyRandomSlowMove() {
  console.log("Running loop 'Butterfly Random Slow movement'");

  //We insert a stop, to ensure that this function call does not conflict with the later implemented "panic movement mode".
  if (!stopButterflyAnimation) {
    //Define the area of the screen, where the butterfly can fly around in.
    let windowHeight = 100 + $(window).height() - 200;
    let windowWidth = 100 + $(window).width() - 200;

    let xPos = getRandomInt(windowWidth);
    let yPos = getRandomInt(windowHeight);

    let randomHeight = "" + (10 + (getRandomInt(10))) + "%";
    let randomRotation = 100 - (getRandomInt(200));

    //Animate the butterfly movement to the new position:
    $("#butterfly").animate({ top: yPos, left: xPos }, 4000);

    //Make the butterfly larger/smaller on each call, to imitate a 3D perspective (butterfly getting closer, og further away):
    $("#butterfly").animate({ height: randomHeight }, { queue: false, duration: 4000 });

    //Make the butterfly sway from side to side, imitating a butterfly that is not just a static image (although it is):
    if (butterflyRotated) {
      $("#butterfly").animate(
        { deg: randomRotation },
        {
          queue: false,
          duration: 5000,
          step: function (now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );

      butterflyRotated = true;
    }
    else {
      $("#butterfly").animate(
        { deg: randomRotation },
        {
          queue: false,
          duration: 5000,
          step: function (now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );
      butterflyRotated = false;
    }
    resetButterflyColors();
  }

  //This timeout is critical for proper system operation. 
  //If it was not included, this script would run continously forever as fast as possible, which is not performance friendly.
  setTimeout(butterFlyRandomSlowMove, 4000);
}


//This function animates the "panic movement mode" for the butterfly. 
//Basically it speeds up the butterfly, and ensures that it moves to a part of the screen, where the mouse is not.
function butterFlyFastEscape() {
  if (butterflyPanicEscape) {
    console.log("Butterfly is in panic!!!!");
    let mouseXpos = event.pageX;
    let mouseYpos = event.pageY;
    let windowHeight = $(window).height() - 400;
    let windowWidth = $(window).width() - 400;
    let xPos = 0;
    let yPos = getRandomInt(windowHeight);

    //Check which half of the screen, the mouse is inside. Ensure that the butterfly moves to the opposite side.
    if (mouseXpos > windowWidth / 2) {
      xPos = getRandomInt(windowWidth / 2);
    }
    else {
      xPos = (windowWidth / 2 + getRandomInt(windowWidth / 2));
    }

    //Animate the butterfly movement to the new position:
    $("#butterfly").animate({ top: yPos, left: xPos }, 300);

    //Make the butterfly larger/smaller on each call, to imitate a 3D perspective (butterfly getting closer, og further away):
    let randomHeight = "" + (5 + (getRandomInt(15))) + "%";

    $("#butterfly").animate({ height: randomHeight }, { queue: false, duration: 200 });


    //Make the butterfly change colors to something random, to visualize this state of panic!:
    let invertString = "invert(" + (50 + getRandomInt(50)) + "%) ";
    let sepiaString = "sepia(" + (20 + getRandomInt(15)) + "%) ";
    let saturateString = "saturate(" + (500 + getRandomInt(250)) + "%) ";
    let huerotateString = "hue-rotate(" + (250 + getRandomInt(90)) + "deg) ";
    let contrastString = "contrast(" + (75 + getRandomInt(75)) + "%) ";

    $("#butterfly").css({ "filter": invertString + sepiaString + saturateString + huerotateString + contrastString });

    let randomRotation = 100 - (getRandomInt(200));

    //Make the butterfly sway from side to side, imitating a butterfly that is not just a static image (although it is):
    if (butterflyRotated) {
      $("#butterfly").animate(
        { deg: randomRotation },
        {
          queue: false,
          duration: 200,
          step: function (now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );

      butterflyRotated = true;
    }
    else {
      $("#butterfly").animate(
        { deg: randomRotation },
        {
          queue: false,
          duration: 200,
          step: function (now) {
            $(this).css({ transform: 'rotate(' + now + 'deg)' });
          }
        }
      );
      butterflyRotated = false;
    }
  }
}

//This function ensures that all active animations on the butterfly are stopped, once called.
//It then calls the animations relating to the panic mode for at few iterations, and cancels this again once the butterfly has escaped.
function stop_ButterflyAnimation() {
  console.log("Stopping all butterfly animations, and executing panic mode!");
  $("#butterfly").stop(true);
  stopButterflyAnimation = true;
  butterflyPanicEscape = true;

  //Here we perform a method chaining, to ensure that the fast panic movements are called AFTER each other, and not on top of each other.
  $.when(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape()).then(butterFlyFastEscape());

  //Cancels panic mode after 2 seconds.
  setTimeout(butterflyPanicEscape = false, 2000);
  setTimeout(stopButterflyAnimation = false, 2000);
}

//This function is used to reset the butterfly to its original colors after Panic Mode has been executed.
function resetButterflyColors() {
  $("#butterfly").css({ "filter": "invert(0%) sepia(0%) saturate(100%) hue-rotate(0deg) brightness(100%) contrast(100%)" });
}
//Kristian's implementation ends here.
//Butterfly functionality ends here!


//<Apple functions begin here


//Apple functions ends here!!*/



// Making the net follow the curser - Zakaria:
$(document).mousemove(function (e) {

  var mouseX = e.pageX;

  var windowWidth = $(window).width();

  if (netPointingRight) {
    $('#net').offset({
      left: (e.pageX - 150),
      top: e.pageY
    });
  }
  else {
    $('#net').offset({
      left: e.pageX,
      top: e.pageY
    });
  }


});


let globalMousePosX_0 = 0;
let netPointingRight = false;

$(document).on("mousemove", function (event) {

  let currentMousePosX = event.pageX;

  if (currentMousePosX > globalMousePosX_0 && (currentMousePosX - globalMousePosX_0 > 100)) {
    //mouse moved towards the right.
    $("#net").css({ "transition": "transform 0.5s", "transform-style": "preserve-3d", "transform": "rotateY(180deg)" });
    netPointingRight = true;

    //update global values for next:
    globalMousePosX_0 = currentMousePosX;
  }
  else if (globalMousePosX_0 > currentMousePosX && (globalMousePosX_0 - currentMousePosX > 100)) {
    //mouse moved towards the left.
    $("#net").css({ "transition": "transform 0.5s", "transform-style": "preserve-3d", "transform": "rotateY(0deg)" });
    netPointingRight = false;

    //update global values for next:
    globalMousePosX_0 = currentMousePosX;
  }
});


//Adding colour to the net
function updateColor2() {
  console.log("running5");

  let randomColor = getRandomInt(5);

  if (randomColor === 0) {
    //Cyan disco color:
    $("#net").css({ "filter": "invert(52%) sepia(63%) saturate(1529%) hue-rotate(166deg) brightness(108%) contrast(98%)" });
  }
  else if (randomColor === 1) {
    $("#net").css({ "filter": "invert(14%) sepia(95%) saturate(4059%) hue-rotate(276deg) brightness(83%) contrast(93%)" });
  }
  else if (randomColor === 2) {
    $("#net").css({ "filter": "invert(100%) sepia(35%) saturate(3551%) hue-rotate(15deg) brightness(94%) contrast(114%)" })
  }
  else if (randomColor === 3) {
    $("#net").css({ "filter": "invert(100%) sepia(78%) saturate(1677%) hue-rotate(20deg) brightness(107%) contrast(98%)" })
  }
  else if (randomColor === 4) {
    $("#net").css({ "filter": "invert(16%) sepia(13%) saturate(2316%) hue-rotate(162deg) brightness(97%) contrast(90%)" })
  }
}

setInterval(updateColor2, 400);

//Here the NET related implementation ENDS.



//Here the watercan and waterdrop implemention BEGINS:


//Here the watercan and waterdrop implemention ENDS