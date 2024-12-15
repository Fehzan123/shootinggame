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
document.getElementById("button-left").addEventListener("mousedown", moveLeft);
document.getElementById("button-right").addEventListener("mousedown", moveRight);


let fireInterval;

document.getElementById("button-fire").addEventListener("mouseover", function() {
    // Start firing bullets every 500ms when hovering over the button
    fireInterval = setInterval(fireBullet, 100);
});

document.getElementById("button-fire").addEventListener("mouseleave", function() {
    // Stop firing bullets when the mouse leaves the button
    clearInterval(fireInterval);
});


// Generate targets periodically
setInterval(generateTarget, 2000);

// Start the game loop
gameLoop();
