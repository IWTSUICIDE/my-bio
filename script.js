const textToType = "sh ./init_system.sh -all";
const typeWriterElement = document.getElementById('typewriter');
let i = 0;

function typeWriter() {
    if (i < textToType.length) {
        typeWriterElement.innerHTML += textToType.charAt(i);
        i++;
        setTimeout(typeWriter, 80);
    } else {
        setTimeout(() => {
            openWin('win-info');
        }, 500);
        setTimeout(() => {
            openWin('win-links');
        }, 1000);
    }
}

if(window.innerWidth > 600) {
    setTimeout(typeWriter, 800);
} else {
    document.getElementById('win-info').style.display = 'flex';
    document.getElementById('win-links').style.display = 'flex';
}

let zIndexCounter = 100;

function makeDraggable(el) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    const titleBar = el.querySelector('.title-bar');
    
    if (titleBar) {
        titleBar.onmousedown = dragMouseDown;
        titleBar.ontouchstart = dragMouseDown;
    }

    el.onmousedown = function() {
        zIndexCounter++;
        el.style.zIndex = zIndexCounter;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        if(e.type === 'touchstart') {
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
        } else {
            pos3 = e.clientX;
            pos4 = e.clientY;
        }
        
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
        document.ontouchend = closeDragElement;
        document.ontouchmove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        let clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
        let clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;

        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;
        
        el.style.top = (el.offsetTop - pos2) + "px";
        el.style.left = (el.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
        document.ontouchend = null;
        document.ontouchmove = null;
    }
}

document.querySelectorAll('.window').forEach(win => {
    makeDraggable(win);
});

function openWin(id) {
    const win = document.getElementById(id);
    if(win.style.display === 'flex') {
        zIndexCounter++;
        win.style.zIndex = zIndexCounter;
        return;
    }
    win.style.display = 'flex';
    zIndexCounter++;
    win.style.zIndex = zIndexCounter;
    
    win.style.animation = 'none';
    win.offsetHeight; 
    win.style.animation = 'bootUp 0.3s ease-out forwards';
}

function closeWin(id) {
    document.getElementById(id).style.display = 'none';
}

function minimize(id) {
    closeWin(id);
}

function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('clock');
    if (clockElement) {
        clockElement.innerText = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
}
setInterval(updateClock, 1000);
updateClock();

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%^&*';
const characters = chars.split('');
const fontSize = 16;
let columns = canvas.width/fontSize;
let drops = [];

function initMatrix() {
    columns = canvas.width/fontSize;
    drops = [];
    for(let x = 0; x < columns; x++) drops[x] = Math.random() * canvas.height;
}
initMatrix();

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 170, 0.1)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00FF00'; 
    ctx.font = fontSize + 'px monospace';

    for(let i = 0; i < drops.length; i++) {
        const text = characters[Math.floor(Math.random()*characters.length)];
        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975)
            drops[i] = 0;
        drops[i]++;
    }
}
setInterval(drawMatrix, 50);

document.addEventListener('contextmenu', e => e.preventDefault());
document.onkeydown = function(e) {
    if (e.keyCode == 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 67 || e.keyCode == 74)) || 
        (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};
