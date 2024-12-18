const gameArea = document.getElementById("game-area");
const shooter = document.getElementById("shooter");
let targets = [];
let bullets = [];
let score = 0; // Initialize score

// Function to generate a target
function generateTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px"; // Random horizontal position
    target.style.top = "0px"; // Start from the top
    gameArea.appendChild(target);
    targets.push(target);

    // Remove the target after 5 seconds
    setTimeout(() => {
        if (targets.includes(target)) {
            target.remove();
            targets.splice(targets.indexOf(target), 1);
        }
    }, 5000);
}

// Move bullets upward
function moveBullets() {
    bullets.forEach((bullet, index) => {
        const bulletBottom = parseInt(bullet.style.bottom.replace("px", ""));
        if (bulletBottom > gameArea.offsetHeight) {
            bullet.remove(); // Remove bullet if it goes out of bounds
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = bulletBottom + 10 + "px"; // Move bullet upward
        }
    });
}

// Fire a bullet
function fireBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = shooter.offsetLeft + 2 + "px"; // Center bullet on the shooter
    bullet.style.bottom = "70px"; // Start bullet above the shooter
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Move shooter left
function moveLeft() {
    const shooterLeft = shooter.offsetLeft;
    if (shooterLeft > 0) {
        shooter.style.left = shooterLeft - 20 + "px";
    }
}

// Move shooter right
function moveRight() {
    const shooterLeft = shooter.offsetLeft;
    if (shooterLeft < gameArea.offsetWidth - 50) {
        shooter.style.left = shooterLeft + 20 + "px";
    }
}

// Check for collisions between bullets and targets
function checkCollisions() {
    bullets.forEach((bullet, bIndex) => {
        targets.forEach((target, tIndex) => {
            const bulletRect = bullet.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            if (
                bulletRect.left < targetRect.right &&
                bulletRect.right > targetRect.left &&
                bulletRect.top < targetRect.bottom &&
                bulletRect.bottom > targetRect.top
            ) {
                bullet.remove();
                bullets.splice(bIndex, 1);

                target.remove();
                targets.splice(tIndex, 1);

                score += 10; // Increment score
                console.log("Score:", score);
            }
        });
    });
}

// Game loop
function gameLoop() {
    moveBullets();
    checkCollisions();
    requestAnimationFrame(gameLoop);
}
function generateTarget() {
    const target = document.createElement("div");
    target.classList.add("target");

    // Random position on the game area
    target.style.left = Math.random() * (gameArea.offsetWidth - 100) + "px";
    target.style.top = "0px";

    // Randomly select an enemy from the sprite sheet
    const totalEnemies = 5; // Adjust based on the number of enemies in your sprite sheet
    const randomEnemy = Math.floor(Math.random() * totalEnemies);
    const enemyWidth = 100; // Width of each enemy frame in pixels

    // Set the background position to the selected enemy
    target.style.backgroundPosition = `-${randomEnemy * enemyWidth}px 0px`;

    gameArea.appendChild(target);
    targets.push(target);

    // Remove target after a set duration
    setTimeout(() => {
        if (targets.includes(target)) {
            target.remove();
            targets.splice(targets.indexOf(target), 1);
        }
    }, 5000);
}
// Initialize game


const left = document.getElementById("button-left");
const right = document.getElementById("button-right");

let leftInterval;
let rightInterval;

left.addEventListener("touchstart", function(event) {
    event.preventDefault(); // Prevent default touch behavior (like scrolling)
    leftInterval = setInterval(moveLeft, 100);
});
left.addEventListener("touchend", function(event) {
    clearInterval(leftInterval);
});

// Optional: Also handle touch cancel (e.g., if touch is interrupted)
left.addEventListener("touchcancel", function(event) {
    clearInterval(leftInterval);
});
right.addEventListener("touchstart", function(event) {
    event.preventDefault(); // Prevent default touch behavior (like scrolling)
    rightInterval = setInterval(moveRight, 100);
});
right.addEventListener("touchend", function(event) {
    clearInterval(rightInterval);
});

// Optional: Also handle touch cancel (e.g., if touch is interrupted)
right.addEventListener("touchcancel", function(event) {
    clearInterval(rightInterval);
});
// Declare fireInterval in the global scope
let fireInterval;

// Select the fire button
const fireButton = document.getElementById("button-fire");

// Start firing bullets when the button is touched
fireButton.addEventListener("touchstart", function(event) {
    // Prevent default touch behavior (like scrolling)
    event.preventDefault();

    // Start firing bullets if not already firing
    if (!fireInterval) {
        fireInterval = setInterval(fireBullet, 300);
    }
});

// Stop firing bullets when the touch ends
fireButton.addEventListener("touchend", function(event) {
    // Clear the firing interval
    clearInterval(fireInterval);
    fireInterval = null; // Reset the interval variable
});

// Handle touch cancel (e.g., if touch is interrupted)
fireButton.addEventListener("touchcancel", function(event) {
    clearInterval(fireInterval);
    fireInterval = null; // Reset the interval variable
});

// Function to simulate firing bullets




// Generate targets periodically
setInterval(generateTarget, 2000);

// Start the game loop
gameLoop();
