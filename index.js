console.log("It works");

const buttonCheck = document.querySelector(".check");
const inputElement = document.querySelector(".guess");
const scoreElement = document.querySelector(".score");
const highScoreElement = document.querySelector(".highscore");
const buttonAgain = document.querySelector(".again");

// Function der generer nummer mellem 1 og 20
function generateRandomNumber() {
    return Math.floor(Math.random() * 20 + 1);
}

let randomNumber = generateRandomNumber(); // Generer det random nummer
console.log("Random number to guess:", randomNumber);

// Event listener for buttonCheck
buttonCheck.addEventListener("click", () => {
    const valueInputted = Number(inputElement.value);  // vi konvertere "valueinputted" til et nummer
    console.log("Value Inputted:", valueInputted);

    // Checker om impunt er mellem 1 og 20
    if (valueInputted < 1 || valueInputted > 20 || isNaN(valueInputted) || !Number.isInteger(valueInputted)) { // Vi sørger for at det faktisk er et tal og der er mellem 1 og 20
        return addSomeText();  // vi returner
        scoreElement.textContent = '-1'; // Reset scorer
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

    // Checker om input matcher random tal
    if (valueInputted === randomNumber) {
        inputElement.value = ""; // Cleare imput felt
        scoreElement.textContent = '0'; // Reset score til 0
        console.log('FAIL - You matched the number!', randomNumber);
        randomNumber = generateRandomNumber(); // Laver et nyt random tal
        console.log("New random number to guess:", randomNumber);
        return gameOverAnimation();

    } else {
        inputElement.value = "";// Hvis imput er forkert så clear scpre
        let currentScore = Number(scoreElement.textContent);
        currentScore += 1; //
        scoreElement.textContent = currentScore; // Opdatere score discplay

        let highScore = Number(highScoreElement.textContent); // highscore

        // Check if the current score is higher than the high score
        if (currentScore > highScore) {
            highScore = currentScore; // Update the high score
            highScoreElement.textContent = highScore; // Update the high score display
        }

        console.log('SUCCESS - You didnt match the number!');
        randomNumber = generateRandomNumber(); // generer nyt random nummer
        console.log("New random number to guess:", randomNumber);
    }
});
// Game over animation
function gameOverAnimation() {
    const gameOverText = document.createElement('div');
    gameOverText.innerText = "Game Over";
    gameOverText.style.position = 'fixed';
    gameOverText.style.top = '50%';
    gameOverText.style.left = '50%';
    gameOverText.style.transform = 'translate(-50%, -50%)';
    gameOverText.style.fontSize = '200px';
    gameOverText.style.color = 'red';
    gameOverText.style.opacity = '0';  //
    gameOverText.style.transition = 'opacity 2s';  // Smooth fade-in transition
    document.body.appendChild(gameOverText);

    // Trigger the fade-in after appending
    setTimeout(() => {
        gameOverText.style.opacity = '1';  // Fade in the text
    }, 100);
}

// Funktion der adder tekst hvis der ikke intastet valid nummer
function addSomeText() {
    const newParagraph = document.createElement("p");
    newParagraph.textContent = "FAIL - HAS TO BE NUMBER BETWEEN 1-20";
    buttonCheck.after(newParagraph); // indæstter paragraf
}

// Viser numre der indtastes
function addNumberToHistory(valueInputted) {
    const newNumber = document.createElement("p");  // Opret et nyt paragraf-element
    newNumber.textContent = valueInputted;  // Sæt paragrafens tekst til at være valueInputted
    const history = document.querySelector(".history");  // Vælg den container, hvor historikken vises
    history.appendChild(newNumber);  // Tilføj det nye paragraf-element til historikken
}

// Reloader siden via again
buttonAgain.addEventListener("click", () => {
    location.reload();
});
