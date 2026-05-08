let playerName = null
let seed = null //for game mechanics later on

let inputStart = 0;



const terminal = document.getElementById('terminal')

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
        terminal.textContent += text[i];
        moveCursorToEnd();
        await new Promise(resolve => setTimeout(resolve, speed));
    }
}


terminal.addEventListener('beforeinput', async (event) => {
    if (event.inputType === "insertParagraph") {
        event.preventDefault();
        const fullText = terminal.innerText;
        const newText = fullText.substring(inputStart).trim();
        console.log(newText);
        


        
        if (newText.toLowerCase() === "help") {
            // Handle help command
            await typeText(" Available commands: help, start, clear\n", 30);
        }
        
        terminal.textContent += "\n> ";
        inputStart = terminal.innerText.length;
        moveCursorToEnd();
    }
    
})

//spin up terminal
terminal.textContent = "> ";
inputStart = terminal.innerText.length;


