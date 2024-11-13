    //Set Global Variables
    let diceWindow;
    var playerScore1 = 0;
    var playerScore2 = 0;
    var playerBet1 = 0;
    var playerBet2 = 0;
    var playerCash = 10000;

    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
    document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
    document.getElementById("bet-amount1").innerHTML = "BET: $" + playerBet1;
    document.getElementById("bet-amount2").innerHTML = "BET: $" + playerBet2;

//Player 1 Bet Add
function betPlayer1() {
    if (playerCash <= 0) {
        alert("Insufficient Cash Balance. Unable to place more bets!");
    }
    else {
    playerBet1 = playerBet1 + 1000;
    playerCash = playerCash - 1000;
    document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
    document.getElementById("bet-amount1").innerHTML = "BET: $" + playerBet1;
    document.getElementById("rollDice").style.visibility = 'visible';
    document.getElementById("betPlayer2").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer1").style.visibility = 'visible';
    }
}

//Player 1 Bet Remove
function betRemovePlayer1() {
    playerCash = playerCash + playerBet1;
    playerBet1 = 0;
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
    document.getElementById("betPlayer2").style.visibility = 'visible';
    document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
    document.getElementById("bet-amount1").innerHTML = "BET: $" + playerBet1;
}

//Player 2 Bet Add
function betPlayer2() {
    if (playerCash <= 0) {
        alert("Insufficient Cash Balance. Unable to place more bets!");
    }
    else {
    playerBet2 = playerBet2 + 1000;
    playerCash = playerCash - 1000;
    document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
    document.getElementById("bet-amount2").innerHTML = "BET: $" + playerBet2;
    document.getElementById("rollDice").style.visibility = 'visible';
    document.getElementById("betPlayer1").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'visible';
    }
}

//Player 1 Bet Remove
function betRemovePlayer2() {
    playerCash = playerCash + playerBet2;
    playerBet2 = 0;
    document.getElementById("rollDice").style.visibility = 'hidden';
    document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
    document.getElementById("betPlayer1").style.visibility = 'visible';
    document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
    document.getElementById("bet-amount2").innerHTML = "BET: $" + playerBet2;
}

//Dice Roll
function rollDice() {
    //Generate Random Number from 1-6
    var randomNumber1 = Math.floor(Math.random() * 6) + 1;
    var randomNumber2 = Math.floor(Math.random() * 6) + 1;


    //Set Dice Image based on the Randomized Number
    var randomDiceImage1 = "dice" + randomNumber1;
    var randomDiceImage2 = "dice" + randomNumber2;


    //Set a value for the Image Source Path of Dice 1 based on the Randomized Dice Image
    var randomDiceImageSource1 = "images/dice/" + randomDiceImage1 + ".png";
    var randomDiceImageSource2 = "images/dice/" + randomDiceImage2 + ".png";


    //Select the image selector of each Dice Image from the DOM
    var firstDice = document.querySelectorAll("img")[0];
    var secondDice = document.querySelectorAll("img")[1];

    //Change the value of the image src attribute
    firstDice.setAttribute("src", randomDiceImageSource1);
    secondDice.setAttribute("src", randomDiceImageSource2);


    //Evaluate who have won the Dice Roll and update the DOM and variables
    if (randomNumber1 === randomNumber2) {
        document.querySelector("#result").innerHTML = "It's a Draw!";
        }
    else if (randomNumber1 > randomNumber2) {
        playerScore1++;
        playerCash = playerCash + playerBet1 * 2;
        playerBet1 = 0;
        playerBet2 = 0;
        document.querySelector("#result").innerHTML = "Player 1 Wins";
        document.querySelector(".result1").innerHTML = playerScore1;
        document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
        document.getElementById("bet-amount1").innerHTML = "BET: $" + playerBet1;
        document.getElementById("bet-amount2").innerHTML = "BET: $" + playerBet2;
        document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
        document.getElementById("rollDice").style.visibility = 'hidden';
        document.getElementById("betPlayer2").style.visibility = 'visible';
        document.getElementById("betPlayer1").style.visibility = 'visible';
        }
    else {
        playerScore2++;
        playerCash = playerCash + playerBet2 * 2;
        playerBet2 = 0;
        playerBet1 = 0;
        document.querySelector("#result").innerHTML = "Player 2 Wins";
        document.querySelector(".result2").innerHTML = playerScore2;
        document.getElementById("cash-amount").innerHTML = "CASH: $" + playerCash;
        document.getElementById("bet-amount2").innerHTML = "BET: $" + playerBet2;
        document.getElementById("bet-amount1").innerHTML = "BET: $" + playerBet1;
        document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
        document.getElementById("rollDice").style.visibility = 'hidden';
        document.getElementById("betPlayer1").style.visibility = 'visible';
        document.getElementById("betPlayer2").style.visibility = 'visible';
    }

    checkCash();
}

//Check Cash Balance

function checkCash() {
    if (playerCash <= 0) {
        document.getElementById("rollDice").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer2").style.visibility = 'hidden';
        document.getElementById("betRemovePlayer1").style.visibility = 'hidden';
        document.getElementById("betPlayer1").style.visibility = 'hidden';
        document.getElementById("betPlayer2").style.visibility = 'hidden';
        alert("GAMEOVER! You have no more Cash!");
        diceWindow.close();
    }
}

