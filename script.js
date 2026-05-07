let playerName = null
let seed = null //for game mechanics later on

let inputStart = 0;

const terminal = document.getElementById('terminal')

terminal.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();
        const fullText = terminal.innerText;
        const newText = fullText.substring(inputStart).trim();
        inputStart = fullText.length;
        console.log("input" + newText);
    }
    
})