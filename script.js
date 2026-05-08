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

function moveCursorToEnd() {
    terminal.focus();

    const range = document.createRange();
    range.selectNodeContents(terminal);
    range.collapse(false);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

}
async function typeText(text,speed = 20) {
    for (let i = 0; i < text.length; i++){
        terminal.innerText += text[i];
        moveCursorToEnd();
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}