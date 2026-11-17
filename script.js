const player = document.getElementById("player");
const game = document.getElementById("game");

const squeak = new Audio("squeak.mp3");

let x = 100;
let y = 100;

let gameWidth = game.clientWidth;
let gameHeight = game.clientHeight;

window.addEventListener("resize", () => {
    gameWidth = game.clientWidth;
    gameHeight = game.clientHeight;
});

const speed = 6;

const keys = {};

window.addEventListener("keydown", (e) => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", (e) => {
    keys[e.key.toLowerCase()] = false;
});

function gameLoop() {
    const gamepads = navigator.getGamepads();

    const controller = [...gamepads].find(
        gamepad => gamepad !== null && gamepad.connected
    );

    if (controller) {
        const deadzone = 0.15;

        let horizontal = controller.axes[0];
        let vertical = controller.axes[1];

        if (Math.abs(horizontal) < deadzone) horizontal = 0;
        if (Math.abs(vertical) < deadzone) vertical = 0;

        x += horizontal * speed;
        y += vertical * speed;

        //play squeak sound when the A button on controller is pressed
        if (controller.buttons[0].pressed) {
            squeak.currentTime = 0;
            squeak.play();
        }
    }

    if (keys["w"] || keys["arrowup"]) y -= speed;
    if (keys["a"] || keys["arrowleft"]) x -= speed;
    if (keys["s"] || keys["arrowdown"]) y += speed;
    if (keys["d"] || keys["arrowright"]) x += speed;

    //play squeak sound when spacebar is pressed
    if (keys[" "]) {
        squeak.currentTime = 0;
        squeak.play();
    }

    x = Math.max(0, Math.min(gameWidth - 50, x));
    y = Math.max(0, Math.min(gameHeight - 50, y));

    player.style.transform = `translate(${x}px, ${y}px)`;

    requestAnimationFrame(gameLoop);
}

gameLoop();