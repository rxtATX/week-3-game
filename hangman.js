//Declare variables
var wordBank = ["Leaving Las Vegas", "National Treasure", 
        			"Tresspass", "The Sorcerer's Apprentice", 
       					"Bangkok Dangerous", "Ghost Rider", "Face-Off", 
        					"The Family Man", "Guarding Tess", "Ben Sanderson", 
        						"Johnny Blaze", "Benjamin Gates"];
var guessesLeft = 12;
var wordBlank = "";
var usedLetters = "";
var currentWord = "";
var game = false;
var wins = 0;
//start game
document.addEventListener("keyup", function (e) {
	if (game === false) {
		gameStart();
		game = true;
		return;
	}
//convert anything that is typed to lower case and guarentee it is a letter
	var guess = e.key.toLowerCase();
	if ((guess <= "z") || (guess >= "a")) {
		userGuessHandler(guess);
	}
});	
//at game start, guesses are established and a random word is chosen
function gameStart() {	
	guessesLeft = 12;
	document.getElementById("guessesLeft").innerHTML = "Guesses left: " + guessesLeft;
	currentWord = wordBank[Math.floor(Math.random() * wordBank.length)].toLowerCase();
	setWordBlank("newGame");
}
//verifies if input letter exists in word
function userGuessHandler(guessLetter) {
	if (usedLetters.toLowerCase().indexOf(guessLetter) >= 0) {	
		//replace blanks with letter
		return;
	}
//displays guessed letters
	usedLetters = usedLetters + guessLetter;
	document.getElementById("usedLetterBank").innerHTML = "Letters used: " + usedLetters;
//if it does not exist in word, guess total lowered and potential game loss
	if (currentWord.toLowerCase().indexOf(guessLetter) < 0) {
		guessesLeft --;
		document.getElementById("guessesLeft").innerHTML = "Guesses left: " + guessesLeft;
		if (guessesLeft === 0) {
			gameEndHandler("lose");
		}
//if the word is filled out completely, win
	} else {
		setWordBlank(guessLetter);
		if (currentWord == wordBlank) {
			gameEndHandler("win");
		}
	}

}
//changes letters in random word to blanks and spaces
function setWordBlank(letter) {
	if (letter == "newGame") {
		wordBlank = "";
		for (i = 0; i < currentWord.length; i++) {
			if (currentWord[i] == " ") {
				wordBlank = wordBlank + " ";
			} else {
				wordBlank = wordBlank + "_";
			}
		}
	} else {
        for (i=0; i < currentWord.length; i++) {
            if (currentWord[i] == letter) {  
                wordBlank += letter;
            }else if(currentWord[i] == " "){
                wordBlank += " ";
            }else{
                wordBlank += "_"
            }
        }
	}
//displays blanks in place of word on html page
	document.getElementById("headerText").innerHTML = wordBlank;
}
//game over/ win rules
function gameEndHandler(gameResult) {
	usedLetters = "";
	if (gameResult == "win") {
		wins++;
		document.getElementById("winTotals").innerHTML = "Wins: " + wins;
	}
	game = false;
	document.getElementById("headerText").innerHTML = "Press any key to get started.";
}
//Goals to accomplish:
//When a user selects a key

	//display the key pressed in used letters bank
	//verify that the key is in the word 
	//verify that the key is not a repeat
		/*IF it is,
			input key into blank where it is present in the chosen word
			verify if all the letters in the word are found
				IF it is, 
					display win alert
					wins++
				ELSE
					wait for key input
		ELSE
			wait for key input
			number of guesses left --
				IF number of guess = 0,
					display game over */
//When the game is over, play may select the reset key.