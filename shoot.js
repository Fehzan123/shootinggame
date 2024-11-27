// script.js
const gameArea = document.getElementById("game-area");
const shooter = document.getElementById("shooter");

let bullets = [];
let targets = [];
let score = 0;

// Move shooter left and right
document.addEventListener("keydown", (event) => {
    const shooterLeft = shooter.offsetLeft;
    if (event.key === "ArrowLeft" && shooterLeft > 0) {
        shooter.style.left = shooterLeft - 20 + "px";
    }
    if (event.key === "ArrowRight" && shooterLeft < gameArea.offsetWidth - 50) {
        shooter.style.left = shooterLeft + 20 + "px";
    }
});

// Fire bullets
document.addEventListener("keydown", (event) => {
    if (event.key === " ") {
        fireBullet();
    }
});

function fireBullet() {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = shooter.offsetLeft + 22 + "px";
    bullet.style.bottom = "30px";
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Move bullets
function moveBullets() {
    bullets.forEach((bullet, index) => {
        const bulletBottom = parseInt(bullet.style.bottom.replace("px", ""));
        if (bulletBottom > 400) {
            bullet.remove();
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = bulletBottom + 10 + "px";
        }
    });
}

// Generate targets
function generateTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px";
    gameArea.appendChild(target);
    targets.push(target);

    setTimeout(() => {
        target.remove();                  
        targets.splice(targets.indexOf(target), 1);
    }, 5000);
}

// Check for collisions
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

                score += 10;
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

// Start the game
setInterval(generateTarget, 2000);
gameLoop();
