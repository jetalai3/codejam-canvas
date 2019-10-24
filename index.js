const LINKS = {
    FIRST: 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json',
    SECOND: 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/32x32.json',
    THIRD: 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/image.png'
}

const FRAMES = {};

class Canvas {
    constructor(pixelCount, getColor, getActiveTool, getPixelCount) {
    
    }

    addCanvas() {
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    canvas.width = '512';
    canvas.height = '512';
    canvas.style.border = '1px solid black';
    document.querySelector('body').appendChild(canvas);
    }
}

class SizeSwitcher {
    constructor(pixelCount, getColor, getActiveTool, getPixelCount) {
    
    }

    addSizeSwitcher() {
    const sizeSwitcher = document.createElement('div');
    sizeSwitcher.id = 'sizeSwitcher';
    const first = document.createElement('button');
    const second = document.createElement('button');
    const third = document.createElement('button');
    first.id = 'first';
    second.id = 'second';
    third.id = 'third';
    first.innerText = '4x4';
    second.innerText = '32x32';
    third.innerText = 'image';
    sizeSwitcher.appendChild(first);
    sizeSwitcher.appendChild(second);
    sizeSwitcher.appendChild(third);
    sizeSwitcher.style.border = '1px solid black';
    sizeSwitcher.addEventListener('click', (event) => {
        draw(FRAMES[event.target.id.toUpperCase()]);
    });
    document.querySelector('body').appendChild(sizeSwitcher);
    }
}

function draw(frame) {
    if (Array.isArray(frame) === true) {
        drawFromArray(frame);
    } else if (frame.split('.')[frame.split('.').length - 1] === 'png') {
        drawFromImage(frame);
    };
}

function drawFromImage(url) {
    const canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        const context = document.getElementById('canvas').getContext('2d');
        const size = window.getComputedStyle(document.getElementById('canvas')).width;
        const scaleTo = size.substring(0, size.length - 2);
        let img = new Image;
        img.onload = function() {
            context.drawImage(img,0,0, scaleTo, scaleTo);
        };
        img.src = url;
    }
}

function drawFromArray(frame) {
    const canvas = document.getElementById('canvas');
    const pixelSize = calculatePixelSize(frame);
    const canvasDimension = frame.length;
    if (canvas.getContext) {
        const context = document.getElementById('canvas').getContext('2d');
        for (let i = 0; i < canvasDimension; i++) {
            for (let j = 0; j < canvasDimension; j++) {
                context.fillStyle = getFillStyle(frame[i][j]);
                const X = i * pixelSize;
                const Y = j * pixelSize;
                context.fillRect(X, Y, pixelSize, pixelSize);
            }
        }
    }
}

function calculatePixelSize(frame) {
    const size = window.getComputedStyle(document.getElementById('canvas')).width;
    return size.substring(0, size.length - 2) / frame.length;
}

function getFillStyle(cell) {
    switch (Array.isArray(cell)) {
        case true:
          return 'rgb(' + cell[0] + ',' + cell[1] + ',' + cell[2] +')';
        case false:
          return '#' + cell;
    }
}

function getFrames(links) {
    Object.keys(links).forEach(element => {
        if(links[element].split('.')[links[element].split('.').length - 1] === 'json') {
            fetch(LINKS[element])
                .then(res => res.json())
                .then(data => FRAMES[element] = data);
        } else {
            FRAMES[element] = links[element];
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const canvas = new Canvas();
    canvas.addCanvas();
    const sizeSwitcher = new SizeSwitcher();
    sizeSwitcher.addSizeSwitcher();
    getFrames(LINKS);
});


