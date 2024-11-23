const gameArea = document.getElementById("game-area");
const shooter = document.getElementById("shooter");
let targets = [];
function generateTarget() {
    const target = document.createElement("div");
    target.classList.add("target");
    target.style.right = Math.random() * (gameArea.offsetWidth - 50) + "px";
    gameArea.appendChild(target);
    targets.push(target);

    setTimeout(() => {
        target.remove();                  
        targets.splice(targets.indexOf(target), 1);
    }, 5000);
}


document.addEventListener("mousemove", (event) => {
    const gameAreaLeft = gameArea.offsetLeft; // Distance of the game area from the left edge of the viewport
    const gameAreaRight = gameAreaLeft + gameArea.offsetWidth; // Right boundary of the game area
    const mouseX = event.clientX; // Horizontal mouse position within the viewport

    // Ensure the mouse movement is within the game area
    if (mouseX > gameAreaLeft && mouseX < gameAreaRight) {
        const shooterLeft = mouseX - gameAreaLeft - 25; // Adjust to center the shooter on the mouse
        shooter.style.left = `${Math.max(0, Math.min(shooterLeft, gameArea.offsetWidth - 50))}px`;
    }
});

setInterval(generateTarget, 2000);