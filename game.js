var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];
var userClickedPattern = [];
var started = false;
var level=0;
$(document).keydown(function() {
  if(started === false)
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
})
function nextSequence()
{
  level++;
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level "+level);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
$(".btn").click(function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  animatePress(userChosenColour);

  playSound(userChosenColour);
})
// $("body").click(function(){nextSequence()});
function playSound(name)
{
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function() {
    $("#"+currentColour).removeClass("pressed")
  }, 100);
}
function checkAnswer(currentLevel) {
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
  {
    if(currentLevel===(gamePattern.length-1))
    {
      setTimeout(function() {
        nextSequence();
      }, 1000);
      userClickedPattern=[];
    }
  }
  else
  {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver() {
  level=0;
  gamePattern=[];
  started=false;
  userClickedPattern=[];
}
