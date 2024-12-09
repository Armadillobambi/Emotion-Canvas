const prompts = [
    "How are you feeling right now?",
    "What emotion best describes your current mood?",
    "Can you describe how you're feeling in one word?",
    "Write a sentence that expresses your current emotional state.",
    "What's on your mind at this moment?",
    "How does your heart feel right now?"
];

function getRandomPrompt() {
    const randomIndex = Math.floor(Math.random() * prompts.length);
    return prompts[randomIndex];
}

// Display the random prompt when the page loads
const promptElement = document.getElementById('prompt');
promptElement.textContent = getRandomPrompt();

const inputBar = document.getElementById('inputBar');

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

        // Update the background color based on emotion
        document.body.style.backgroundColor = color;

        // Clear the input bar
        inputBar.value = '';
    }
});

