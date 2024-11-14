// Set Global Variables
let playerScore1 = 0;
let playerScore2 = 0;
let playerBet1 = 0;
let playerBet2 = 0;
let playerCash = 10000;

document.addEventListener("DOMContentLoaded", () => {
    // Initialize display values
    updateDisplay();

    // Hide initial elements
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
});

// Update display function
function updateDisplay() {
    document.getElementById("cash-amount").textContent = "CASH: $" + playerCash;
    document.getElementById("bet-amount1").textContent = "BET: $" + playerBet1;
    document.getElementById("bet-amount2").textContent = "BET: $" + playerBet2;
}

// Player 1 Bet Add
function betPlayer1() {
    if (playerCash <= 0) {
        alert("Insufficient Cash Balance. Unable to place more bets!");
    } else {
        playerBet1 += 1000;
        playerCash -= 1000;
        updateDisplay();
        document.getElementById("rollDice").style.visibility = 'visible';
        document.getElementById("betPlayer2").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer1").style.visibility = 'visible';
    }
}

// Player 1 Bet Remove
function betRemovePlayer1() {
    playerCash += playerBet1;
    playerBet1 = 0;
    updateDisplay();
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
    document.getElementById("betPlayer2").style.visibility = 'visible';
}

// Player 2 Bet Add
function betPlayer2() {
    if (playerCash <= 0) {
        alert("Insufficient Cash Balance. Unable to place more bets!");
    } else {
        playerBet2 += 1000;
        playerCash -= 1000;
        updateDisplay();
        document.getElementById("rollDice").style.visibility = 'visible';
        document.getElementById("betPlayer1").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer2").style.visibility = 'visible';
    }
}

// Player 2 Bet Remove
function betRemovePlayer2() {
    playerCash += playerBet2;
    playerBet2 = 0;
    updateDisplay();
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
    document.getElementById("betPlayer1").style.visibility = 'visible';
}

// Dice Roll
function rollDice() {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    // Start animation
    dice1.classList.add('rolling');
    dice2.classList.add('rolling');

    // Stop animation and show the result after 0.8 seconds
    setTimeout(() => {
        dice1.classList.remove('rolling');
        dice2.classList.remove('rolling');

        // Generate Random Number from 1-6
        const randomNumber1 = Math.floor(Math.random() * 6) + 1;
        const randomNumber2 = Math.floor(Math.random() * 6) + 1;

        // Set Dice Image based on the Randomized Number
        dice1.src = `images/dice/dice${randomNumber1}.png`;
        dice2.src = `images/dice/dice${randomNumber2}.png`;

        // Determine the winner
        if (randomNumber1 === randomNumber2) {
            document.getElementById("result").textContent = "It's a Draw!";
        } else if (randomNumber1 > randomNumber2) {
            playerScore1++;
            playerCash += playerBet1 * 2;
            playerBet1 = 0;
            playerBet2 = 0;
            document.getElementById("result").textContent = "Player 1 Wins";
            document.querySelector(".result1").textContent = playerScore1;

            // Update display and reset buttons after roll
            resetAfterRoll();

            // Delay GAME OVER alert until after roll result is shown
            if (playerCash <= 0) {
            setTimeout(() => {
            alert("GAME OVER! You have no more Cash!");
            }, 1000); // 1-second delay to show the roll result first
            }

        } else {
            playerScore2++;
            playerCash += playerBet2 * 2;
            playerBet2 = 0;
            playerBet1 = 0;
            document.getElementById("result").textContent = "Player 2 Wins";
            document.querySelector(".result2").textContent = playerScore2;
            
            // Update display and reset buttons after roll
            resetAfterRoll();

            // Delay GAME OVER alert until after roll result is shown
            if (playerCash <= 0) {
            setTimeout(() => {
            alert("GAME OVER! You have no more Cash!");
            }, 1000); // 1-second delay to show the roll result first
            }
        }

        
    }, 800);
}

// Reset after a roll
function resetAfterRoll() {
    updateDisplay();
    document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betPlayer1").style.visibility = 'visible';
    document.getElementById("betPlayer2").style.visibility = 'visible';
}

