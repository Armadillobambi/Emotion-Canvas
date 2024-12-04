const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const inputBar = document.getElementById('inputBar');

// Set canvas size
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;

// Keep track of the current canvas state
let colors = [];

inputBar.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
        const sentence = inputBar.value.trim();
        if (sentence === '') return;

        // Send the sentence to the backend
        const response = await fetch('http://127.0.0.1:5000/analyze', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ sentence }),
        });

        if (!response.ok) {
            console.error('Failed to fetch emotion data');
            return;
        }

        const data = await response.json();
        const { color } = data;

        // Update the canvas
        colors.push(color);
        drawCanvas(colors);

        // Clear the input bar
        inputBar.value = '';
    }
});

function drawCanvas(colors) {
    const width = canvas.width;
    const height = canvas.height;
    const colorHeight = height / colors.length;

    for (let i = 0; i < colors.length; i++) {
        ctx.fillStyle = colors[i];
        ctx.fillRect(0, i * colorHeight, width, colorHeight);
    }
}
