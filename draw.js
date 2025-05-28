const colorPicker = document.getElementById('colorPicker');
const canvasColor = document.getElementById('canvasColor');
const canvas = document.getElementById('myCanvas');
const undoButton = document.getElementById('undoButton');
const clearButton = document.getElementById('clearButton');
const saveButton = document.getElementById('saveButton');
const fontSizePicker = document.getElementById('fontSizePicker');


const ctx = canvas.getContext('2d');
var isDrawing = false;
 
colorPicker.addEventListener('change', (event) => {
ctx.fillStyle = event.target.value;
ctx.strokeStyle = event.target.value;
});

canvasColor.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, 800, 500);
});

// start drawing using mouse
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    event.preventDefault();
    if (isDrawing) {
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        
        lastX = event.offsetX;
        lastY = event.offsetY;
    }
});

// start drawing using touch
canvas.addEventListener('touchstart', (event) => {
    isDrawing = true;
    lastX = event.touches[0].clientX;
    lastY = event.touches[0].clientY;
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    if (isDrawing) {
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(lastX - canvas.getBoundingClientRect().left, lastY - canvas.getBoundingClientRect().top);
        ctx.lineTo(event.touches[0].clientX - canvas.getBoundingClientRect().left, event.touches[0].clientY - canvas.getBoundingClientRect().top);
        ctx.stroke();

        lastX = event.touches[0].clientX;
        lastY = event.touches[0].clientY;
    }
});

canvas.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

fontSizePicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

// Clear the canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

// Add event listener for the save button
saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    // Create a new <a> element
    let link = document.createElement('a');

    // Set the download attribute and the href attribute of the <a> element
    link.download = 'my-canvas.png';
    link.href = canvas.toDataURL();

    // Dispatch a click event on the <a> element
    link.click();
});

// Add event listener for the retrieve button
retrieveButton.addEventListener('click', () => {
    // Retrieve the saved canvas contents from local storage
    let savedCanvas = localStorage.getItem('canvasContents');

    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        ctx.drawImage(img, 0, 0);
    }
});