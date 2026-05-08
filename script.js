let playerName = null
let seed = null //for game mechanics later on

let inputStart = 0;

let gameStart = false; 

let commandCount = 3;

// for Starting Select systems:
let stateStartingSelect = 0;
let points = 10;
let costIntelligence = 1;
let costStrength = 1;
let costAgility = 1;
let costLuck = 1;


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
//changed from a DOM system to text content for better input/output handling.

async function typeText(text,speed = 20) {
    const line = document.createElement('div');
    terminal.appendChild(line);

    for (let i = 0; i < text.length; i++) {

        line.textContent += text[i];

        moveCursorToEnd();

        await new Promise(resolve =>
            setTimeout(resolve, speed)
        );
    }
}

function addLineBreak(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminal.appendChild(line);
}


terminal.addEventListener('beforeinput', async (event) => {
    if (event.inputType === "insertParagraph") {
        event.preventDefault();
        const fullText = terminal.innerText;
        const newText = fullText.substring(inputStart).trim();
        console.log(newText);
        
        if (newText.toLowerCase() === "help") {
            // Handle help command
            if (commandCount === 3) {
                await typeText("Available commands: help, start, clear", 30);
            } else if (commandCount === 4) {
                await typeText("Available commands: help, clear ", 30);
            }
        }
        if (newText.toLowerCase() === "start" && commandCount === 3) {
            gameStart = true;
        }
        
        if (gameStart){
            await typeText("Welcome to SimLifeX!", 50);
            await typeText("This is a simple life simulation.",50)
            await typeText("Systems are under development but will evolve over time.",50)
            await typeText("If you ever get stuck, type 'help' for a list of commands.",50)
            await typeText("I'm gonna patch you in now.",50);
            await typeText("Good luck!",50);
            await typeText("Loading",50);
            await typeText("...",500);
            await typeText("Done!",50);
            await startingSelect();
            gameStart = false;
            commandCount ++;
        }

        addLineBreak(">");
        inputStart = terminal.innerText.length;
        moveCursorToEnd();

    }
    
})

//spin up terminal
terminal.textContent = "> ";
inputStart = terminal.innerText.length;


//actual systems
async function startingSelect(){
    await typeText("Welcome, you have been successfully loaded in", 50);
    await typeText("You are now ready to begin your setup.", 50);
    await typeText("Please choose how you want to split your points:", 50);
    await typeText("1. Intelligence" + costIntelligence, 50);
    await typeText("2. Strength" + costStrength, 50);
    await typeText("3. Agility" + costAgility, 50);
    await typeText("4. Luck Cost:" + costLuck, 50);
}
