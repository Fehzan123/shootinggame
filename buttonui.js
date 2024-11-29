const box = document.querySelector('.box');
const upbox = document.querySelector('.upbox');
const shooter = document.getElementById("shooter");
let isDragging = false;
let offsetX, offsetY;

box.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.offsetX - box.offsetWidth / 2; // Offset relative to center
    offsetY = e.offsetY - box.offsetHeight / 2; // Offset relative to center
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        const rect = upbox.getBoundingClientRect();
        const upboxRadius = rect.width / 2;
        const boxRadius = box.offsetWidth / 2;

        const centerX = rect.left + upboxRadius; // Parent's center X
        const centerY = rect.top + upboxRadius; // Parent's center Y

        let mouseX = e.clientX - centerX; // Mouse position relative to parent center
        let mouseY = e.clientY - centerY;

        // Constrain the box's center within the parent's circular boundary
        const distance = Math.sqrt(mouseX ** 2 + mouseY ** 2);
        if (distance > upboxRadius - boxRadius) {
            const angle = Math.atan2(mouseY, mouseX);
            mouseX = (upboxRadius - boxRadius) * Math.cos(angle);
            mouseY = (upboxRadius - boxRadius) * Math.sin(angle);
        }

        // Position the box
        box.style.left = `${mouseX + upboxRadius - boxRadius}px`;
        box.style.top = `${mouseY + upboxRadius - boxRadius}px`;
    }
});

document.addEventListener('mouseup', (e) => {
    if (isDragging) {
        isDragging = false;
            const shooterLeft = shooter.offsetLeft;
        const rect = upbox.getBoundingClientRect();
        const upboxRadius = rect.width / 2;

        const centerX = rect.left + upboxRadius; // Parent's center X
        const mouseX = e.clientX - centerX; // Mouse position relative to parent center

        // Log "left" or "right" based on the box's horizontal position
       
       
        if (mouseX < 0) {
            shooter.style.left = shooterLeft + 20 + "px";
        } else {
            
            console.log('right');
        }

        // Re-center the box
        const boxRadius = box.offsetWidth / 2;
        const centerLeft = upboxRadius - boxRadius;
        const centerTop = upboxRadius - boxRadius;

        box.style.left = `${centerLeft}px`;
        box.style.top = `${centerTop}px`;
    }
});
