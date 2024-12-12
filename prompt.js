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

