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
let treeWidth = $("#tree").width();
let treeHeight = $("#tree").height();
let bodyWidth = $(window).width();
let bodyHeight = $(window).height();
let apple1Clicked = false;
let apple2Clicked = false;
let apple3Clicked = false;
// a function which finds a random position for the apples.
let randomXnum1 = Math.floor(Math.random() * (treeWidth - 100)); //Adjust 100 so that it stays on the tree
let randomYnum1 = 150 + Math.floor(Math.random() * (250)); //Adjust 250 so that it stays on the tree
let randomXnum2 = Math.floor(Math.random() * (treeWidth - 100)); //Adjust 100 so that it stays on the tree
let randomYnum2 = 150 + Math.floor(Math.random() * (250)); //Adjust 250 so that it stays on the tree
let randomXnum3 = Math.floor(Math.random() * (treeWidth - 100)); //Adjust 100 so that it stays on the tree
let randomYnum3 = 150 + Math.floor(Math.random() * (250)); //Adjust 250 so that it stays on the tree


function getRandomPosition1() {
  let randomX1 = 0.5 * bodyWidth + randomXnum1; // +50% to make it begin on the trees leafes. Adjust 100 so that it stays on the tree
  let randomY1 = 0.35 * treeHeight + randomYnum1; // +35% to make it begin on the trees leafes. Adjust 280 so that it stays on the tree

  return { left: randomX1, bottom: randomY1 };
}

function getRandomPosition2() {
  let randomX2 = 0.5 * bodyWidth + randomXnum2; // +50% to make it begin on the trees leafes. Adjust 100 so that it stays on the tree
  let randomY2 = 0.35 * treeHeight + randomYnum2; // +35% to make it begin on the trees leafes. Adjust 280 so that it stays on the tree

  return { left: randomX2, bottom: randomY2 };
}

function getRandomPosition3() {
  let randomX3 = 0.5 * bodyWidth + randomXnum3; // +50% to make it begin on the trees leafes. Adjust 100 so that it stays on the tree
  let randomY3 = 0.35 * treeHeight + randomYnum3; // +35% to make it begin on the trees leafes. Adjust 280 so that it stays on the tree

  return { left: randomX3, bottom: randomY3 };
}

  $("#apple1").css(getRandomPosition1());
  $("#apple2").css(getRandomPosition2());
  $("#apple3").css(getRandomPosition3()); 

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
    apple1Clicked = true;
    $("#apple1").animate({
      left: 0.55 * bodyWidth,
      bottom: 0.08 * bodyHeight
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
    apple2Clicked = true;
    $("#apple2").animate({
      left: 0.53 * bodyWidth,
      bottom: 0.08 * bodyHeight
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
    apple3Clicked = true;
    $("#apple3").animate({
      left: 0.51 * bodyWidth,
      bottom: 0.08 * bodyHeight
    }, 1000)
  });

  $(window).resize(function() {
    treeWidth = $("#tree").width();
    treeHeight = $("#tree").height();
    bodyWidth = $(window).width();
    bodyHeight = $(window).height();
    if (apple1Clicked == true) {
      $("#apple1").css({left: 0.55 * bodyWidth,
        bottom: 0.08 * bodyHeight, height: 0.06 * bodyHeight})
    } else {
      $("#apple1").css(getRandomPosition1(), {height: 0.06 * bodyHeight});
      };
    
    if (apple2Clicked == true) {
      $("#apple2").css({left: 0.53 * bodyWidth,
        bottom: 0.08 * bodyHeight, height: 0.06 * bodyHeight})
    } else {
      $("#apple2").css(getRandomPosition2(), {height: 0.06 * bodyHeight});
    }
    if (apple3Clicked == true) {
      $("#apple3").css({left: 0.51 * bodyWidth,
        bottom: 0.08 * bodyHeight, height: 0.06 * bodyHeight})
    } else {
      $("#apple3").css(getRandomPosition3(), {height: 0.06 * bodyHeight});
    }
  });

  //Apple functions ends here!!




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
// Function to animate water drops falling from the watering can in a straight line
function movewaterdrop() {
  const initialTop = parseFloat($('#wateringcan').css('top')) + parseFloat($('#wateringcan').css('height'));
  const initialLeft = parseFloat($('#wateringcan').css('left'));

  const finalTop = $(window).height();

  // Set initial positions of water drops
  $("#waterDrop1").css({ top: initialTop + 'px', left: (initialLeft+50) + 'px' });
  $("#waterDrop2").css({ top: initialTop + 'px', left: (initialLeft+40) + 'px' });
  $("#waterDrop3").css({ top: initialTop + 'px', left: (initialLeft+50) + 'px' });

  // Animate water drops to fall straight down
  $("#waterDrop1").animate({ top: finalTop + 'px' }, 980, movewaterdrop);
  $("#waterDrop2").animate({ top: finalTop + 'px' }, 960, movewaterdrop);
  $("#waterDrop3").animate({ top: finalTop + 'px' }, 940, movewaterdrop);
}

// Main document ready function
$(document).ready(function () {
  // Selecting elements
  const wateringCan = $('#wateringcan');
  const waterDrop1 = $('#waterDrop1');
  const waterDrop2 = $('#waterDrop2');
  const waterDrop3 = $('#waterDrop3');

  // Initial water drop animation
  setInterval(movewaterdrop(), 250);

  // Variables for watering can tilt
  let isTilted = false;
  let tiltAngle = -90;

  // Initial update of watering can
  updateWateringCan();

  // Event listener for tilting the watering can on mousedown
  wateringCan.mousedown(function (event) {
      isTilted = !isTilted;
      updateWateringCan();
  });

  // Function to update watering can tilt and show/hide water drops
  function updateWateringCan() {
      if (isTilted) {
          wateringCan.css('transform', 'rotate(' + tiltAngle + 'deg)');
          showWaterDrops();
      } else {
          wateringCan.css('transform', 'rotate(0deg)');
          hideWaterDrops();
      }
  }

  // Function to show water drops and initiate their animation
  function showWaterDrops() {
      waterDrop1.show();
      waterDrop2.show();
      waterDrop3.show();
      animateWaterDrops();
  }

  // Function to hide water drops
  function hideWaterDrops() {
      waterDrop1.hide();
      waterDrop2.hide();
      waterDrop3.hide();
  }

  // Function to set initial positions of water drops and initiate their animation
  function animateWaterDrops() {
          const waterDrop1 = $(this);
          const waterDrop2 = $(this);
          const waterDrop3 = $(this);
          const initialTop = parseFloat(wateringCan.css('top')) + wateringCan.height();
          const initialLeft = parseFloat(wateringCan.css('left'));

          waterDrop1.css({
              top: initialTop + 'px',
              left: initialLeft + 'px',
          });

          waterDrop2.css({
              top: initialTop + 'px',
              left: initialLeft + 'px',
          });

          waterDrop3.css({
              top: initialTop + 'px',
              left: initialLeft + 'px',
          });

      
  }

   // Extra funtionality: Movement of watering can
   let isDragging = false;

   //Change mouse to a pointer when hovering over the can:
   $("#wateringcan").mouseenter(function(){
     $("#wateringcan").css({ cursor: 'grab'});
   });

   // Event listener for starting dragging on mousedown
   $("#wateringcan").dblclick(function(){
     if(isDragging === true)
     {
       isDragging = false;
     }
     else
     {
       isDragging = true;
     };
   });

   // Event listener for updating watering can position during dragging
   $(document).mousemove(function (event) {
       if (isDragging) {
           const mouseX = event.clientX;
           const mouseY = event.clientY;

           const canRect = $("#wateringcan")[0].getBoundingClientRect();

           const newLeft = mouseX - canRect.width / 8;
           const newTop = mouseY - canRect.height / 8;

           $("#wateringcan").css({
               left: newLeft + 'px',
               top: newTop + 'px',
           });

           setInterval(updateWateringCan(),250);
       }
   });

})
  
//Here the watercan and waterdrop implemention ENDS