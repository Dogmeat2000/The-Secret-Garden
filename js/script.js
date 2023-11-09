//MAKE THE MAGIC HAPPEN

//Butterfly functionality:
let stopButterflyAnimation = false;
let butterflyPanicEscape = false;
setButterflyInitialPosition();
//$("body").on("mousemove", butterFlyRandomSlowMove);
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

    $("#butterfly").animate({top: yPos, left: xPos}, 4000);
    }

    setTimeout(butterFlyRandomSlowMove, 4000);
}

function butterFlyFastEscape() 
{
    if(butterflyPanicEscape)
    {
        console.log("Butterfly is in panic!!!!");
        let windowHeight = $(window).height()-800;
        let windowWidth = $(window).width()-800;
    
        let xPos = getRandomInt(windowWidth);
        let yPos = getRandomInt(windowHeight);
        
        $("#butterfly").animate({top: yPos, left: xPos}, 200);
    }
}

function stop_ButterflyAnimation()
{
    console.log("Stopping all butterfly animations, and executing panic mode!");
    $("#butterfly").stop(true);
    stopButterflyAnimation = true;
    butterflyPanicEscape = true;
    butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape().butterFlyFastEscape();
    /*butterFlyFastEscape().;
    setTimeout(butterFlyFastEscape, 400);
    setTimeout(butterFlyFastEscape, 600);
    setTimeout(butterFlyFastEscape, 800);
    setTimeout(butterFlyFastEscape, 1000);
    setTimeout(butterFlyFastEscape, 1200);
    setTimeout(butterFlyFastEscape, 1400);
    setTimeout(butterFlyFastEscape, 1600);
    setTimeout(butterFlyFastEscape, 1800);
    setTimeout(butterFlyFastEscape, 2000);*/
    stopButterflyAnimation = false;
    butterflyPanicEscape = false;
}

/*function start_ButterflyAnimation()
{
    stopButterflyAnimation = false;
    butterFlyRandomSlowMove();
}*/

