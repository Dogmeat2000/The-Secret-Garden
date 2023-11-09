//MAKE THE MAGIC HAPPEN

//Butterfly functionality:
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
        xPos = getRandomInt(windowWidth)+(getRandomInt(windowWidth)/10);
    }
    else
    {
        xPos = getRandomInt(windowWidth)-(getRandomInt(windowWidth)/10);
    }

    let yPos = getRandomInt(windowHeight)-50;
    if(yPos < windowHeight && (xPos < windowWidth || xPos > 0))
    {
        yPos = yPos-windowHeight;
    }

    $("#butterfly").offset({top: yPos, left: xPos});
    butterFlyEnterScreen();
}

function butterFlyEnterScreen(xPos, yPos)
{
    $("#butterfly").animate({top: yPos, left: xPos}, 15000);
    butterFlyRandomSlowMove()
}


function butterFlyRandomSlowMove()
{
    //Define the area of the screen, where the butterfly can fly around in.
    let windowHeight = 100+$(window).height()-200;
    let windowWidth = 100+$(window).width()-200;

    let xPos = getRandomInt(windowWidth);
    let yPos = getRandomInt(windowHeight);

    $("#butterfly").animate({top: yPos, left: xPos}, 3500);
    butterFlyRandomSlowMove()
}

setButterflyInitialPosition()

