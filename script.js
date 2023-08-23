const initialPetStats = {
    name: "Waffles",
    hunger: 100,
    thirst: 100,
    play: 100, // Added play stat
    energy: 100,
};

let pet = { ...initialPetStats };

function showNotification(message) {
    const notification = document.querySelector(".notification");
    const notificationText = document.querySelector("#notificationText");
    notificationText.textContent = message;
    notification.style.display = "block";

    setTimeout(() => {
        notification.style.display = "none";
    }, 3000);
}

let extraPointsCount = 0;
function updateStatus() {
    const hungerSpan = document.querySelector("#hunger");
    const thirstSpan = document.querySelector("#thirst");
    const playSpan = document.querySelector("#play");
    const energySpan = document.querySelector("#energy");

    if (pet.hunger > 0 && pet.thirst > 0) {
        if ((pet.hunger <= 60 || pet.thirst <= 60) && extraPointsCount < 10) {
            const randomValue = Math.random();

            if (randomValue < 0.5) {
                pet.hunger = Math.min(100, pet.hunger + 20);
            } else {
                pet.thirst = Math.min(100, pet.thirst + 20);
            }

            pet.play = Math.min(100, pet.play + 20); // Increase Play points
            extraPointsCount++;
        }
    }

    hungerSpan.textContent = pet.hunger;
    thirstSpan.textContent = pet.thirst;
    playSpan.textContent = pet.play;
    energySpan.textContent = pet.energy;

    if (pet.hunger <= 70) {
        showNotification("Waffles is hungry! Feed her.");
    } else if (pet.thirst <= 70) {
        showNotification("Waffles is thirsty! Give her a drink.");
    }

    if (pet.play <= 70) {
        showNotification("Waffles wants to play!");
    }

    if (pet.energy <= 0) {
        gameOver();
    } else if (pet.energy >= 300) {
        winGame();
    } else if (pet.hunger <= 0 || pet.thirst <= 0 || pet.play <= 0) {
        gameOver();
    }
}

function winGame() {
    alert("YOU WIN, WAFFLES NEEDS HAVE ALL BEEN MET!");
    resetGame();
}

function resetGame() {
    pet = { ...initialPetStats };
    extraPointsCount = 0;
    updateStatus();
}

function eat() {
    if (pet.hunger >= 10) {
        pet.hunger -= 10;
        pet.energy += 10;

        if (pet.hunger <= 0 && pet.thirst >= 0) {
            pet.hunger = 0;
        }

        if (pet.hunger <= 50) {
            pet.energy -= 20;
        }

        resetExtraPointsCount();
    } else {
        pet.hunger = 0;
        gameOver();
    }
    updateStatus();
}

function drink() {
    if (pet.thirst >= 10) {
        pet.thirst -= 10;
        pet.energy += 10;

        if (pet.thirst <= 0 && pet.hunger >= 0) {
            pet.thirst = 0;
        }

        if (pet.thirst <= 50) {
            pet.energy -= 20;
        }

        resetExtraPointsCount();
    } else {
        pet.thirst = 0;
        gameOver();
    }
    updateStatus();
}

function play() {
    if (pet.play >= 10) {
        pet.play -= 10;
        pet.energy += 10;

        if (pet.play <= 50) {
            pet.energy -= 20;
        }

        resetExtraPointsCount();
    } else {
        pet.play = 0;
        gameOver();
    }
    updateStatus();
}

function resetExtraPointsCount() {
    extraPointsCount = 0;
}

function gameOver() {
    alert("Game Over! Waffles's hunger, thirst, play, or energy reached 0.");
    resetGame();
}

updateStatus();
