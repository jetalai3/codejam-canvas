export default class Canvas {
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