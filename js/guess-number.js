"use strict";

let maxNums = 10;
let levelScore = 10;
let defaultScore = 10;
let highScore = 0;
const current_value = 1;

console.log(`Selected Game Mode: ${current_value}`);
console.log(`Max Number: ${maxNums}`);

document.querySelector(".score").textContent = levelScore;
document.querySelector(".highscore").textContent = highScore;

document.querySelector(".check").style.display = "inline-block";

let secretNumber = Math.floor(Math.random() * maxNums) + 1;
console.log(`Secret Number is: ${secretNumber}`);

function subtractScore() {
  levelScore--;
  document.querySelector(".score").textContent = levelScore;
}

function messageColor(color) {
  document.querySelector(".message").style.color = color;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
}

function checkDifficulty() {
  const dropdown = document.getElementById("leveldiff");

  // Ask for confirmation before changing the difficulty
  const confirmation = confirm(
    "Are you sure you want to change the difficulty and Reset the Game?"
  );

  if (confirmation) {
    const current_value = Number(
      dropdown.options[dropdown.selectedIndex].value
    );
    console.log(`Selected Game Mode: ${current_value}`);

    highScore = 0;
    document.querySelector(".highscore").textContent = highScore;
    document.querySelector(".guess").value = "";

    document.querySelector(".message").style.color = "#eee";

    displayMessage("Start guessing...");

    if (current_value === 1) {
      maxNums = 10;
      levelScore = 10;
      defaultScore = 10;
      document.querySelector(".score").textContent = levelScore;
      document.querySelector(
        ".between"
      ).textContent = `(Between 1 to ${maxNums})`;
      secretNumber = Math.floor(Math.random() * maxNums) + 1;
      console.log(`Secret Number is: ${secretNumber}`);
    } else if (current_value === 2) {
      maxNums = 15;
      levelScore = 15;
      defaultScore = 15;
      document.querySelector(".score").textContent = levelScore;
      document.querySelector(
        ".between"
      ).textContent = `(Between 1 to ${maxNums})`;
      secretNumber = Math.floor(Math.random() * maxNums) + 1;
      console.log(`Secret Number is: ${secretNumber}`);
    } else if (current_value === 3) {
      maxNums = 20;
      levelScore = 20;
      defaultScore = 20;
      document.querySelector(".score").textContent = levelScore;
      document.querySelector(
        ".between"
      ).textContent = `(Between 1 to ${maxNums})`;
      secretNumber = Math.floor(Math.random() * maxNums) + 1;
      console.log(`Secret Number is: ${secretNumber}`);
    } else if (current_value === 4) {
      maxNums = 25;
      levelScore = 25;
      defaultScore = 25;
      document.querySelector(".score").textContent = levelScore;
      document.querySelector(
        ".between"
      ).textContent = `(Between 1 to ${maxNums})`;
      secretNumber = Math.floor(Math.random() * maxNums) + 1;
      console.log(`Secret Number is: ${secretNumber}`);
    }

    console.log(`Max Number: ${maxNums}`);
  } else {
    // If the user cancels, reset the dropdown to its previous value
    dropdown.selectedIndex = dropdown.dataset.previousIndex || 0;
  }

  // Store the current selected index for future reference
  dropdown.dataset.previousIndex = dropdown.selectedIndex;
}

document.querySelector(".check").addEventListener("click", function () {
  let guess = Number(document.querySelector(".guess").value);

  //   Check if Number is Entered
  if (guess === 0) {
    displayMessage("Please Guess a Number!");
    document.querySelector(".message").style.color = "tomato";
  } else {
    guess = Number(document.querySelector(".guess").value);
    console.log(`Your Guess is: ${guess}.`);

    //   Check if Guess Attempts is available
    if (levelScore === 0) {
      document.querySelector(".check").style.display = "none";
      document.querySelector(".message").style.color = "tomato";

      displayMessage("Game Over! Please restart the game.");
    } else {
      // Check Guess Number
      //Correct Path
      if (guess === secretNumber) {
        document.querySelector("body").style.backgroundColor = "#60b347";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector(".message").style.color = "gold";

        displayMessage("Your guess is correct!");
        highScore += levelScore;
        levelScore = defaultScore;
        guess = "";
        document.querySelector(".score").textContent = levelScore;
        document.querySelector(".highscore").textContent = highScore;

        document.querySelector(".guess").value = "";

        setTimeout(() => {
          secretNumber = Math.floor(Math.random() * maxNums) + 1;
          console.log(`New secret Number is: ${secretNumber}`);
          document.querySelector(".number").textContent = "?";
          document.querySelector("body").style.backgroundColor = "#222";
          document.querySelector(".message").style.color = "#eee";
          displayMessage("Start guessing...");
        }, 1800);

        // Wrong Path
      } else if (guess !== secretNumber) {
        subtractScore();
        messageColor("tomato");
        displayMessage(
          guess > secretNumber
            ? "Your guess is too high!"
            : "Your guess is too low!"
        );
      }
    }
  }
});

// Restart Game
document.querySelector(".again").addEventListener("click", function () {
  if (confirm("Restart Game?") == true) {
    highScore = 0;
    levelScore = defaultScore;

    secretNumber = Math.floor(Math.random() * maxNums) + 1;

    console.log(`Selected Game Mode: ${current_value}`);
    console.log(`Max Number: ${maxNums}`);
    console.log(`Secret Number is: ${secretNumber}`);

    document.querySelector(".highscore").textContent = highScore;

    document.querySelector(".message").style.color = "#eee";

    displayMessage("Start guessing...");

    document.querySelector(".score").textContent = defaultScore;
    document.querySelector(".guess").value = "";
    document.querySelector(".check").style.display = "inline-block";
  }
});
