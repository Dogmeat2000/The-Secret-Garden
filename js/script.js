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

function updateColor2() 
{
  console.log("running5");

  let randomColor = getRandomInt(5);

  if(randomColor === 0)
  {
    //Cyan disco color:
    $("#net").css({"filter": "invert(52%) sepia(63%) saturate(1529%) hue-rotate(166deg) brightness(108%) contrast(98%)"});
  }
  else if(randomColor === 1)
  {
    $("#net").css({"filter": "invert(14%) sepia(95%) saturate(4059%) hue-rotate(276deg) brightness(83%) contrast(93%)"});
  }
  else if(randomColor === 2)
  {
    $("#net").css({"filter": "invert(100%) sepia(35%) saturate(3551%) hue-rotate(15deg) brightness(94%) contrast(114%)"})
  }
  else if(randomColor === 3)
  {
    $("#net").css({"filter": "invert(100%) sepia(78%) saturate(1677%) hue-rotate(20deg) brightness(107%) contrast(98%)"})
  }
  else if(randomColor === 4)
  {
    $("#net").css({"filter": "invert(16%) sepia(13%) saturate(2316%) hue-rotate(162deg) brightness(97%) contrast(90%)"})
  }
}

setInterval(updateColor2, 400); 





