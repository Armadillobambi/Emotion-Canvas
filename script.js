// // Flow field parameters
// let scl = 10;
// let inc = 0.1;
// let zOffInc = 0.0003;
// let angMult = 25;
// let angTurn = 1;
// let cols, rows, zoff = 0;
// let particles = [];
// let flowfield;
// var hu = 0;
// var input = 0;

// // Particle display parameters
// let sat = 100, brt = 100, alph = 10, partStroke = 1;
// let emotionColor = { h: 0, s: 100, b: 100 }; // Default HSB color for the emotion
// let animationStarted = false;

// const inputBar = document.getElementById('inputBar');

// function setup() {
//     createCanvas(windowWidth - 20, windowHeight - 20);
//     colorMode(HSB, 359, 100, 100, 100);
//     canvas.style('z-index', '-1');  // Ensure canvas is below the UI
//     // canvas.position(0, 0); 

//     inputFunc();
//     cols = floor(width / scl);
//     rows = floor(height / scl);
//     flowfield = new Array(cols * rows);

//     for (let i = 0; i < 300; i++) { // Default particle count
//         particles [i] = new Particle();
//     }

//     background(0);
// }

// function draw() {
//     background(0,0,0,10)
//     if (input == 1) {
//         inputFunc();
//         input = 0;
//     }
//     // if (!animationStarted) {
//     //     background(emotionColor.h, emotionColor.s, emotionColor.b); // Static emotion background
//     // }

//     var yoff = 0;
//     for (var y = 0; y < rows; y++) {
//         var xoff = 0;
//         for (var x = 0; x < cols; x++) {
//             var index = x + y * cols;
//             var angle = noise(xoff, yoff, zoff)*angMult+angTurn;  
//             var v = p5.Vector.fromAngle(angle);
//             v.setMag(1);
//             flowfield[index] = v;
//             xoff += inc;
//         }
//         yoff += inc;

//         zoff += zOffInc;
//     }

//     // Update particles
//     for (var i = 0; i < particles.length; i++) {
//         particles[i].follow(flowfield);
//         particles[i].update();
//         particles[i].edges();
//         particles[i].show();
//       }

//     // hu = emotionColor;
// }


// // Utility function to convert HEX to HSB
// function hexToHsb(hex) {
//     let r = parseInt(hex.slice(1, 3), 16) / 255;
//     let g = parseInt(hex.slice(3, 5), 16) / 255;
//     let b = parseInt(hex.slice(5, 7), 16) / 255;
    
//     let max = Math.max(r, g, b), min = Math.min(r, g, b);
//     let delta = max - min;
//     let h = 0, s = 0, br = max * 100;
    
//     if (max !== min) {
//         if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
//         else if (max === g) h = (b - r) / delta + 2;
//         else h = (r - g) / delta + 4;
//         h *= 60;
//     }
//     if (max !== 0) s = (delta / max) * 100;

//     return { h, s, b: br };
// }

// function inputFunc() {
//     // Communication with server
//     inputBar.addEventListener('keypress', async (e) => {
//         if (e.key === 'Enter') {
//             console.log('console log works')
//             const sentence = inputBar.value.trim();
//             if (!sentence) return;

//             const response = await fetch(
//                 'http://127.0.0.1:5000/analyze', {
//                     method: 'POST',
//                     headers: { 'Content-Type': 'application/json' },
//                     body: JSON.stringify({ sentence }),
//                 }
//             );

//             if (!response.ok) {
//                 console.error('Failed to fetch emotion data');
//                 return;
//             }

//             const data = await response.json();

//             var color = hexToHsb(data.color); // Convert hex color to HSB

//             emotionColor.h = color.h;
//             emotionColor.s = color.s;
//             emotionColor.b = color.b;
//             animationStarted = true; // Start the flow field animation
//             hu = emotionColor.h

//             // console.log(emotionColor);
//             inputBar.value = ''; // Clear input
//             input = 1; // need new input thingie
//         }
//     });
// }

// Flow field parameters
let scl = 10;
let inc = 0.1;
let zOffInc = 0.0003;
let angMult = 25;
let angTurn = 1;
let cols, rows, zoff = 0;
let particles = [];
let flowfield;
var hu = 0;
var input = 0;

// Particle display parameters
let sat = 100, brt = 100, alph = 10, partStroke = 1;
let emotionColor = { h: 0, s: 100, b: 100 }; // Default HSB color for the emotion
let animationStarted = false;

let inputBar;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 359, 100, 100, 100);

    // Create and style the input bar dynamically
    inputBar = createInput();
    inputBar.position(windowWidth / 2 - 150, windowHeight / 2 - 15); // Center it
    inputBar.size(300);
    inputBar.style('font-size', '18px');
    inputBar.style('padding', '10px');
    inputBar.style('border', '2px solid #34495E');
    inputBar.style('border-radius', '10px');
    inputBar.style('outline', 'none');
    inputBar.style('text-align', 'center');
    inputBar.style('font-family', 'Poppins, sans-serif');

    // inputBar.input(() => {
    //     if (keyCode === ENTER) {
    //         handleInput(inputBar.value());
    //         inputBar.value(''); // Clear after submission
    //     }
    // });

    cols = floor(width / scl);
    rows = floor(height / scl);
    flowfield = new Array(cols * rows);

    for (let i = 0; i < 300; i++) {
        particles[i] = new Particle();
    }

    background(0);
}

function keyPressed() {
    if (keyCode === ENTER) {
        handleInput(inputBar.value());
        inputBar.value(''); // Clear after submission
    }
}

function draw() {
    if (animationStarted) {
        var yoff = 0;
        for (var y = 0; y < rows; y++) {
            var xoff = 0;
            for (var x = 0; x < cols; x++) {
                var index = x + y * cols;
                var angle = noise(xoff, yoff, zoff) * angMult + angTurn;  
                var v = p5.Vector.fromAngle(angle);
                v.setMag(1);
                flowfield[index] = v;
                xoff += inc;
            }
            yoff += inc;
            zoff += zOffInc;
        }

        // Update particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].follow(flowfield);
            particles[i].update();
            particles[i].edges();
            particles[i].show();
        }
    // hu = emotionColor.h; // Dynamic hue
    }
}

// Function to handle user input
function handleInput(sentence) {
    if (!sentence.trim()) return;

    fetch('http://127.0.0.1:5000/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sentence }),
    })
        .then(response => response.json())
        .then(data => {
            const color = hexToHsb(data.color);
            emotionColor = { h: color.h, s: color.s, b: color.b };
            hu = emotionColor.h
            animationStarted = true;
        })
        .catch(error => console.error('Failed to fetch emotion data', error));
}

// Utility function to convert HEX to HSB
function hexToHsb(hex) {
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;
    
    let max = Math.max(r, g, b), min = Math.min(r, g, b);
    let delta = max - min;
    let h = 0, s = 0, br = max * 100;
    
    if (max !== min) {
        if (max === r) h = (g - b) / delta + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / delta + 2;
        else h = (r - g) / delta + 4;
        h *= 60;
    }
    if (max !== 0) s = (delta / max) * 100;

    return { h, s, b: br };
}