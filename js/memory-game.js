
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;
var hints = 3;
var score = 0;
var topscore = 0;

//Disable and Make the Show Pattern Button Invisible on Initialization

$("#show-pattern").prop("disabled", true);
$("#show-pattern").css("opacity", "0");

//Call Changing Text Animation Function
welcome();

//Changing Text Animation Function
function welcome() {
  if (!started) {
    let isWelcomeText = true; // Toggle between texts
    setInterval(function () {
      if (!started) {
        // Animate text change with easing
        $("#level-title")
          .fadeOut(500, function () {
            $(this).text(isWelcomeText ? "[ Welcome to Memory Game ]" : "[ Press Any Key to Start ]");
          })
          .fadeIn(500);
        isWelcomeText = !isWelcomeText; // Switch text on each interval
      }
    }, 2000); // Delay between changes (1 second fade out + 1 second fade in)
  }
}


//Event Listeners

//Start Game Event Listener (Keypress or Touch)
$(document).on("keypress touchstart", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    $("#score").text("Score: " + score); // Display initial score
    nextSequence();
    started = true;
  }
});

//Show Pattern Button Click Event Listener
$("#show-pattern").click(function() {
  if (!started) {

  }
  else {
showPattern();
  }
});

//Game Button Click Event Listener
$(".btn").click(function() {
  if (!started) {
  }
  else {
  
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
  }

});




//New Game Level
function nextSequence() {
  $("#show-pattern").prop("disabled", false);
  $("#show-pattern").animate({ opacity: 1 }, 1200); 
  $("#hints").text("Hints Left: " + hints);

  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  playSound(randomChosenColor);
  animateGamePattern();

  $("#game-pattern").hide();

}

//Check and Compare User Pattern from Game Pattern
function checkAnswer(currentLevel) {

  //Success Path
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length){
      score += level * 10; // Increment score based on the level
      $("#score").text("Score: " + score); // Update score display
      $("#hints").text("Hints Left: " + hints);
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } 
  
  //Failed Path
  else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("[ Game Over! ]");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}


//Game Restart
function startOver() {
  if (score >= topscore){
    topscore = score;
    resetGame();
  }
  else {
    resetGame();
  }
}

function resetGame() {
  level = 0;
  score = 0; // Reset score
  hints = 3;
  $("#score").text("Score: " + score); // Reset score display
  $("#top-score").text("High Score: " + topscore); // Reset score display
  gamePattern = [];
  started = false;


  setTimeout(function () {
    $("#level-title").text("[ Press Any Key to Restart ]");
    $("#show-pattern").prop("disabled", true);
    $("#show-pattern").css("opacity", "0");
  }, 1000);
}
  
  




// Sequential Animation for the Game Pattern
function animateGamePattern() {
  let i = 0;

  function animateNext() {
    if (i < gamePattern.length) {
      const currentColor = gamePattern[i];
      $("#" + currentColor)
        .fadeOut(100)
        .fadeIn(100, function () {
          playSound(currentColor); // Play sound during fade-in
        });

      i++;
      setTimeout(animateNext, 500); // Delay before animating the next button
    }
  }

  animateNext();
}

//CSS Class for the brief visual animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


//Play Sound file
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function showPattern() {
  if (hints <= 0) {
    $("#game-pattern").text("Unable to Show Pattern! No More Hints Left!");
    $("#game-pattern").show();
  }
  else {
  const patternString = gamePattern.join(" + ");
  hints--;
  $("#hints").text("Hints Left: " + hints);
  $("#game-pattern").text(patternString);
  $("#game-pattern").show();
  $("#show-pattern").prop("disabled", true);
  }
}