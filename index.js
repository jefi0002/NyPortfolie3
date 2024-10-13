console.log("It works");

// Selecting the input field, button, score, and high score elements
const buttonCheck = document.querySelector(".check");
const inputElement = document.querySelector(".guess");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");
const buttonAgain = document.querySelector(".again");

// Function to generate a random number between 1 and 20
function generateRandomNumber() {
    return Math.floor(Math.random() * 20 + 1);
}

let randomNumber = generateRandomNumber(); // Generate the initial random number
console.log("Random number to guess:", randomNumber);

// Event listener for buttonCheck
buttonCheck.addEventListener("click", () => {
    const valueInputted = Number(inputElement.value);  // Convert the input to a number
    console.log("Value Inputted:", valueInputted);

    // Check if the input is the number and between 1 and 20
    if (valueInputted < 1 || valueInputted > 20 || isNaN(valueInputted) || !Number.isInteger(valueInputted)) { //This ensures that only whole numbers between 1 and 20 are accepted.
        addSomeText();  // Call the addSomeText function
        scoreElement.textContent = '-1'; //Resets score if wrong number or symbol is typed (It's minus 1 bcs it plus 1 else)
    }
    if (!isNaN(valueInputted) && valueInputted >= 1 && valueInputted <= 20) {
        addNumberToHistory(valueInputted);  // Tilføj den indtastede værdi til historikken
        history.textContent = '20';
    }
    if (!isNaN(valueInputted) && valueInputted >= 1 && valueInputted <= 20 && valueInputted != randomNumber){
        confetti({
            particleCount: 143,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Check if the guess matches the random number
    if (valueInputted === randomNumber) {
        inputElement.value = ""; // Clear the input field
        scoreElement.textContent = '0'; // Reset score to 0
        console.log('FAIL - You matched the number!', randomNumber);
        randomNumber = generateRandomNumber(); // Generate a new random number
        console.log("New random number to guess:", randomNumber);
        return gameOverAnimation();

    } else {
        inputElement.value = "";// Clear the input field if the guess is wrong
        let currentScore = Number(scoreElement.textContent); // Get the current score
        currentScore += 1; // Increment the current score
        scoreElement.textContent = currentScore; // Update the score display

        let highScore = Number(highScoreElement.textContent); // Get the current high score

        // Check if the current score is higher than the high score
        if (currentScore > highScore) {
            highScore = currentScore; // Update the high score
            highScoreElement.textContent = highScore; // Update the high score display
        }

        console.log('SUCCESS - You didnt match the number!');
        randomNumber = generateRandomNumber(); // Generate a new random number for the next round
        console.log("New random number to guess:", randomNumber);
    }
});

function gameOverAnimation() {
    const gameOverText = document.createElement('div');
    gameOverText.innerText = "Game Over";
    gameOverText.style.position = 'fixed';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.fontSize = '200px';
    gameOverText.style.color = 'red';
    gameOverText.style.opacity = '0';  // Start with transparent text
    gameOverText.style.transition = 'opacity 2s';  // Smooth fade-in transition
    document.body.appendChild(gameOverText);

    // Trigger the fade-in after appending
    setTimeout(() => {
        gameOverText.style.opacity = '1';  // Fade in the text
    }, 100);
}

// Function to add text below the button when inputted value is 20
function addSomeText() {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "FAIL - HAS TO BE NUMBER BETWEEN 1-20";
    buttonCheck.after(newParagraph); // Insert the new paragraph after the button
}

// Function that shows number history
function addNumberToHistory(valueInputted) {
    const newNumber = document.createElement("p");  // Opret et nyt paragraf-element
    newNumber.textContent = valueInputted;  // Sæt paragrafens tekst til at være valueInputted
    const history = document.querySelector(".history");  // Vælg den container, hvor historikken vises
    history.appendChild(newNumber);  // Tilføj det nye paragraf-element til historikken
}

// Reset by pressing the button again
buttonAgain.addEventListener("click", () => {
    location.reload(); // Reload the entire page
});
