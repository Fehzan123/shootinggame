const gameArea = document.getElementById("game-area");
const shooter = document.getElementById("shooter");
let targets = [];
let bullets = []; // Array to store bullets

// Function to generate a target
function generateTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.style.left = Math.random() * (gameArea.offsetWidth - 50) + "px"; // Random horizontal position
    target.style.top = "0px"; // Start from the top
    gameArea.appendChild(target);
    targets.push(target);

    setTimeout(() => {
        target.remove();
        targets.splice(targets.indexOf(target), 1);
    }, 5000);
}

// Move bullets upward
function moveBullets() {
    bullets.forEach((bullet, index) => {
        const bulletBottom = parseInt(bullet.style.bottom.replace("px", ""));
        if (bulletBottom > 400) {
            bullet.remove(); // Remove bullet if it goes out of bounds
            bullets.splice(index, 1);
        } else {
            bullet.style.bottom = bulletBottom + 10 + "px"; // Move bullet upward
        }
    });
}

// Fire a bullet
function fireBullet() {
    console.log("Fire");
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = shooter.offsetLeft + 22 + "px"; // Position bullet at the shooter's position
    bullet.style.bottom = "30px"; // Start bullet from above the shooter
    gameArea.appendChild(bullet);
    bullets.push(bullet);
}

// Shooter moves left
const left = document.getElementById("button-left");
const right = document.getElementById("button-right");
left.addEventListener("mousedown", moveLeft);
right.addEventListener("mousedown", moveright);
function moveLeft() {
    const shooterLeft = shooter.offsetLeft;
    if (shooterLeft > 0) {
        shooter.style.left = shooterLeft - 20 + "px";
    }
  
}
function moveright() {
    const shooterLeft = shooter.offsetLeft;
    if (shooterLeft <gameArea.offsetWidth - 50) {
        shooter.style.left = shooterLeft + 20 + "px";
    }
  
}


// Move bullets periodically
setInterval(moveBullets, 50); // Update bullets every 50ms

// Generate targets periodically
setInterval(generateTarget, 2000); // Generate a new target every 2 seconds

// Bind shoot button
const shoot = document.getElementById("button-fire");
shoot.addEventListener("click", fireBullet);
console.log("1");

