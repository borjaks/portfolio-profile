"use strict";

let maxNums = 10;
let levelScore = 10;
let defaultScore = 10;
let highScore = localStorage.getItem("guessNumberHighScore") || 0;
const current_value = 1;

console.log(`Selected Game Mode: ${current_value}`);
console.log(`Max Number: ${maxNums}`);

document.querySelector(".score").textContent = levelScore;
document.querySelector(".highscore").textContent = highScore;

document.querySelector(".check").style.display = "inline-block";

let secretNumber = Math.floor(Math.random() * maxNums) + 1;
console.log(`Secret Number is: ${secretNumber}`);

// Add fade-in animation to main elements
document.querySelector(".game-hero").style.animation = "fadeIn 0.8s ease";
document.querySelector(".number").style.animation =
  "float 4s ease-in-out infinite";
document.querySelector(".game-container").style.animation = "fadeIn 1s ease";

function updateHighScore() {
  localStorage.setItem("guessNumberHighScore", highScore);
  document.querySelector(".highscore").textContent = highScore;
}

function subtractScore() {
  levelScore--;
  document.querySelector(".score").textContent = levelScore;
}

function messageColor(color) {
  document.querySelector(".message").style.color = color;
}

function displayMessage(message) {
  document.querySelector(".message").textContent = message;
  // Add subtle animation when message changes
  document.querySelector(".message").classList.add("animate-message");
  setTimeout(() => {
    document.querySelector(".message").classList.remove("animate-message");
  }, 500);
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

    document.querySelector(".message").style.color = "var(--text-color)";

    displayMessage("Start Guessing");

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
  if (!guess) {
    displayMessage("Please Guess a Number!");
    document.querySelector(".message").style.color = "var(--danger-color)";
    document.querySelector(".guess").classList.add("shake");
    setTimeout(() => {
      document.querySelector(".guess").classList.remove("shake");
    }, 500);
  } else {
    guess = Number(document.querySelector(".guess").value);
    console.log(`Your Guess is: ${guess}.`);

    //   Check if Guess Attempts is available
    if (levelScore === 0) {
      document.querySelector(".check").style.display = "none";
      document.querySelector(".message").style.color = "var(--danger-color)";

      displayMessage("Game Over! Please restart the game.");
      document.querySelector("body").style.backgroundColor = "#880000";
      document.querySelector(".number").textContent = secretNumber;

      // Add shake animation to the number
      document.querySelector(".number").classList.add("shake");
    } else {
      // Check Guess Number
      //Correct Path
      if (guess === secretNumber) {
        document.querySelector("body").style.backgroundColor =
          "var(--secondary-color)";
        document.querySelector(".number").textContent = secretNumber;
        document.querySelector(".message").style.color = "gold";
        document.querySelector(".number").style.borderColor = "gold";
        document.querySelector(".number").style.boxShadow =
          "0 0 30px rgba(255, 215, 0, 0.5)";

        // Add winner class to body for logo animation
        document.body.classList.add("winner");

        displayMessage("Your guess is correct!");

        // Add celebration animation
        document.querySelector(".number").classList.add("celebrate");

        // Update highscore with local storage
        if (levelScore > highScore) {
          highScore = levelScore;
          updateHighScore();
        }

        levelScore = defaultScore;
        guess = "";
        document.querySelector(".score").textContent = levelScore;
        document.querySelector(".guess").value = "";

        setTimeout(() => {
          secretNumber = Math.floor(Math.random() * maxNums) + 1;
          console.log(`New secret Number is: ${secretNumber}`);
          document.querySelector(".number").textContent = "?";
          document.querySelector(".number").classList.remove("celebrate");
          document.querySelector("body").style.backgroundColor =
            "var(--primary-color)";
          document.querySelector(".message").style.color = "var(--text-color)";
          document.querySelector(".number").style.borderColor =
            "var(--secondary-color)";
          document.querySelector(".number").style.boxShadow =
            "0 10px 20px rgba(0, 0, 0, 0.3)";

          // Remove winner class
          document.body.classList.remove("winner");

          displayMessage("Start Guessing");
        }, 1800);

        // Wrong Path
      } else if (guess !== secretNumber) {
        subtractScore();
        messageColor("var(--danger-color)");

        const message =
          guess > secretNumber
            ? "Your guess is too high!"
            : "Your guess is too low!";

        displayMessage(message);

        // Add visual feedback for too high or too low
        if (guess > secretNumber) {
          document.querySelector(".guess").classList.add("too-high");
          setTimeout(() => {
            document.querySelector(".guess").classList.remove("too-high");
          }, 500);
        } else {
          document.querySelector(".guess").classList.add("too-low");
          setTimeout(() => {
            document.querySelector(".guess").classList.remove("too-low");
          }, 500);
        }
      }
    }
  }
});

// Restart Game
document.querySelector(".again").addEventListener("click", function () {
  if (confirm("Restart Game?") == true) {
    levelScore = defaultScore;
    secretNumber = Math.floor(Math.random() * maxNums) + 1;

    console.log(`Selected Game Mode: ${current_value}`);
    console.log(`Max Number: ${maxNums}`);
    console.log(`Secret Number is: ${secretNumber}`);

    document.querySelector(".message").style.color = "var(--text-color)";
    document.querySelector("body").style.backgroundColor =
      "var(--primary-color)";
    document.querySelector(".number").style.borderColor =
      "var(--secondary-color)";
    document.querySelector(".number").style.boxShadow =
      "0 10px 20px rgba(0, 0, 0, 0.3)";
    document.querySelector(".number").classList.remove("shake");
    document.querySelector(".number").classList.remove("celebrate");

    displayMessage("Start Guessing");

    document.querySelector(".score").textContent = defaultScore;
    document.querySelector(".guess").value = "";
    document.querySelector(".check").style.display = "inline-block";
    document.querySelector(".number").textContent = "?";

    document.querySelector(".game-container").style.animation =
      "fadeIn 0.5s ease";

    document.body.classList.remove("winner");
  }
});

// Add CSS animation classes
const style = document.createElement("style");
style.textContent = `
  .animate-message {
    animation: pulse 0.5s ease;
  }
  
  .shake {
    animation: shake 0.5s ease;
  }
  
  .celebrate {
    animation: celebrate 1s ease infinite;
  }
  
  .too-high {
    animation: slideDown 0.5s ease;
  }
  
  .too-low {
    animation: slideUp 0.5s ease;
  }
  
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
  }
  
  @keyframes celebrate {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  @keyframes slideDown {
    0% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  }
  
  @keyframes slideUp {
    0% { transform: translateY(5px); }
    100% { transform: translateY(0); }
  }
`;
document.head.appendChild(style);

// Add collapsible controls functionality
document.addEventListener("DOMContentLoaded", function () {
  const controlsWrapper = document.querySelector(".game-controls-wrapper");
  const toggleButton = document.querySelector(".toggle-controls");
  const toggleText = document.querySelector(".game-controls-toggle-text");

  // Check if there's a saved state in localStorage
  const isCollapsed = localStorage.getItem("gameControlsCollapsed") === "true";
  if (isCollapsed) {
    controlsWrapper.classList.add("collapsed");
    toggleText.textContent = "Show Controls";
  } else {
    toggleText.textContent = "Hide Controls";
  }

  toggleButton.addEventListener("click", function () {
    controlsWrapper.classList.toggle("collapsed");
    // Save state to localStorage
    const isNowCollapsed = controlsWrapper.classList.contains("collapsed");
    localStorage.setItem("gameControlsCollapsed", isNowCollapsed);

    // Update toggle text
    toggleText.textContent = isNowCollapsed ? "Show Controls" : "Hide Controls";

    // Add a subtle animation to the toggle button
    this.style.transform = "scale(0.95)";
    setTimeout(() => {
      this.style.transform = "scale(1)";
    }, 100);
  });

  // Add keyboard accessibility
  toggleButton.addEventListener("keydown", function (e) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      this.click();
    }
  });
});
