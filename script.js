let zIndexCounter = 100;

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    if (clock) {
        clock.innerText = now.getHours().toString().padStart(2, '0') + ":" + 
                          now.getMinutes().toString().padStart(2, '0');
    }
}

function toggleWin(id) {
    const win = document.getElementById(id);
    if (win.style.display === 'flex' && !win.classList.contains('closing')) {
        closeWin(id);
    } else {
        openWin(id);
    }
}

function openWin(id) {
    const win = document.getElementById(id);
    win.style.display = 'flex';
    win.classList.remove('closing');
    win.classList.add('opening');
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
}

function closeWin(id) {
    const win = document.getElementById(id);
    win.classList.remove('opening');
    win.classList.add('closing');
    setTimeout(() => {
        win.style.display = 'none';
        win.classList.remove('closing');
    }, 200);
}

const textToType = "sh ./init_system.sh -all";
let charIndex = 0;
function typeWriter() {
    const el = document.getElementById('typewriter');
    if (charIndex < textToType.length) {
        el.innerHTML += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 80);
    } else {
        setTimeout(() => {
            if (window.innerWidth <= 600) closeWin('win-terminal');
            openWin('win-info');
            setTimeout(() => openWin('win-links'), 300);
        }, 600);
    }
}

window.onload = () => {
    updateClock();
    setInterval(updateClock, 1000);
    if (window.innerWidth <= 600) {
        openWin('win-info');
        openWin('win-links');
    } else {
        openWin('win-terminal');
        setTimeout(typeWriter, 800);
    }
};

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = el.querySelector('.title-bar');
    if (!titleBar) return;

    titleBar.onmousedown = (e) => {
        if (window.innerWidth <= 600) return;
        zIndexCounter++;
        el.style.zIndex = zIndexCounter;
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmousemove = (ev) => {
            pos1 = pos3 - ev.clientX;
            pos2 = pos4 - ev.clientY;
            pos3 = ev.clientX;
            pos4 = ev.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        };
        document.onmouseup = () => { document.onmousemove = null; };
    };
}

document.querySelectorAll('.window').forEach(makeDraggable);

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');
let drops = [];
function initMatrix() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    for (let x = 0; x < canvas.width / 16; x++) drops[x] = 1;
}
function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 170, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00FF00';
    ctx.font = '16px monospace';
    for (let i = 0; i < drops.length; i++) {
        ctx.fillText("01"[Math.floor(Math.random()*2)], i*16, drops[i]*16);
        if (drops[i]*16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
}
initMatrix();
setInterval(drawMatrix, 50);
window.onresize = initMatrix;

document.oncontextmenu = () => false;
document.onkeydown = e => {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && [73, 67, 74].includes(e.keyCode)) || (e.ctrlKey && e.keyCode == 85)) return false;
};
