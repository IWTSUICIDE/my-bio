const textToType = "sh ./init_system.sh -all";
const typeWriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    } else {
        if (window.innerWidth <= 600) {
            closeWin('win-terminal');
            openWin('win-info');
            setTimeout(() => openWin('win-links'), 300);
        } else {
            openWin('win-info');
            setTimeout(() => openWin('win-links'), 500);
        }
    }
}

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
    
    if (window.innerWidth <= 600) {
        closeWin('win-terminal');
        openWin('win-info');
        openWin('win-links');
    } else {
        setTimeout(typeWriter, 800);
    }
};

let zIndexCounter = 100;

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = el.querySelector('.title-bar');

    const dragStart = (e) => {
        zIndexCounter++;
        el.style.zIndex = zIndexCounter;
        const event = e.type === 'touchstart' ? e.touches[0] : e;
        pos3 = event.clientX;
        pos4 = event.clientY;
        document.onmousemove = dragMove;
        document.ontouchmove = dragMove;
        document.onmouseup = dragEnd;
        document.ontouchend = dragEnd;
    };

    const dragMove = (e) => {
        if (e.type === 'touchmove') e.preventDefault();
        const event = e.type === 'touchmove' ? e.touches[0] : e;
        pos1 = pos3 - event.clientX;
        pos2 = pos4 - event.clientY;
        pos3 = event.clientX;
        pos4 = event.clientY;
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    };

    const dragEnd = () => {
        document.onmousemove = null;
        document.ontouchmove = null;
        document.onmouseup = null;
        document.ontouchend = null;
    };

    if (titleBar) {
        titleBar.onmousedown = dragStart;
        titleBar.ontouchstart = dragStart;
    }
}

document.querySelectorAll('.window').forEach(makeDraggable);

function openWin(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
    win.style.animation = 'bootUp 0.3s ease-out forwards';
}

function closeWin(id) {
    document.getElementById(id).style.display = 'none';
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) {
        clock.innerText = now.getHours().toString().padStart(2, '0') + ":" + 
                          now.getMinutes().toString().padStart(2, '0');
    }
}

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let drops = [];
const fontSize = 16;

function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const columns = canvas.width / fontSize;
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 170, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF00';
    ctx.font = fontSize + 'px monospace';
    for (let i = 0; i < drops.length; i++) {
        const text = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*".split('')[Math.floor(Math.random() * 40)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}

window.addEventListener('resize', initMatrix);
initMatrix();
setInterval(drawMatrix, 50);

document.oncontextmenu = () => false;
document.addEventListener('keydown', e => {
    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && ['I','C','J'].includes(e.key)) || (e.ctrlKey && e.key === 'U')) {
        e.preventDefault();
        return false;
    }
});
