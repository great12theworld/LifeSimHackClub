let playerName = null
let seed = null //for game mechanics later on

let inputStart = 0;

let gameStart = false; 

let commandCount = 3;

let playerInelligence = 0
let playerStrength = 0
let playerAgility = 0
let playerLuck = 0


// for Starting Select systems:
let stateStartingSelect = "unstarted";
let statPoints = 15;
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

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}


//changed from a DOM system to text content for better input/output handling.

async function typeText(text,speed = 20) {
    const line = document.createElement('div');
    terminal.appendChild(line);

    for (let i = 0; i < text.length; i++) {

        line.textContent += text[i];

        moveCursorToEnd();
        scrollToBottom();

        await new Promise(resolve =>
            setTimeout(resolve, 0)
        );
    }
}

function addLineBreak(text) {
    const line = document.createElement('div');
    line.textContent = text;
    terminal.appendChild(line);
    scrollToBottom();
}


terminal.addEventListener('beforeinput', async (event) => {
    if (event.inputType === "insertParagraph") {
        event.preventDefault();
        const fullText = terminal.innerText;
        const newText = fullText.substring(inputStart).trim();
        
        if (newText.toLowerCase() === "help") {
            // Handle help command
            if (commandCount === 3) {
                await typeText("Available commands: help, start, clear", 30);
            } else if (commandCount === 4) {
                await typeText("Available commands: help, clear, loadstats, checkstats ", 30);
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
            await typeText("...", 500);
            await typeText("Done!", 50);
            gameStart = false;
            commandCount ++;
        }
        
        if (newText.toLowerCase() === "loadstats" && stateStartingSelect === "unstarted" && commandCount == 4){
            startingSelect()
            stateStartingSelect = "running"
        }
        if (stateStartingSelect === "running" && newText.toLowerCase() === "1"){
            if (statPoints >= 1){
                statPoints = statPoints - 1;
                playerInelligence ++;                        
                await typeText("1 point added to Intelligence")
                await typeText("Points remaining: " + statPoints)
                await typeText("please select another number: (1), (2), (3), (4)")
                moveCursorToEnd()
            } 
        
        }else if (stateStartingSelect === "running" && newText.toLowerCase() === "2"){
            if (statPoints >= 1){
                statPoints = statPoints - 1;
                playerStrength ++;                        
                await typeText("1 point added to Strength")
                await typeText("Points remaining: " + statPoints)
                await typeText("please select another number: (1), (2), (3), (4)")
                moveCursorToEnd()
            }


        } else if (stateStartingSelect === "running" && newText.toLowerCase() === "3"){
            if (statPoints >= 1){
                statPoints = statPoints - 1;
                playerAgility ++;
                await typeText("1 point added to Agility")
                await typeText("Points remaining: " + statPoints)
                await typeText("please select another number: (1), (2), (3), (4)")
                moveCursorToEnd()
            }
            
        
        
        
        } else if (stateStartingSelect === "running" && newText.toLowerCase() === "4"){
            if (statPoints >= 1){
                statPoints = statPoints - 1;
                playerLuck ++;                        
                await typeText("1 point added to Luck")
                await typeText("Points remaining: " + statPoints)
                await typeText("please select another number: (1), (2), (3), (4)")
                moveCursorToEnd()
            }

        } 
        if (stateStartingSelect === "running" && statPoints < 1){
            await typeText ("You have now used all of your points")
            await typeText ("Your stats are the following:")
            await typeText ("Intelligence: " + playerInelligence)
            await typeText ("Strength: " + playerStrength)
            await typeText ("Agility: " + playerAgility)
            await typeText ("Luck: " + playerLuck)
            
            stateStartingSelect = "ended"

        }

        if (newText.toLowerCase() === "checkstats" && commandCount == 4){
            checkStats();
        }
            

        endWrite();



    } //end of enter listening
    
})

//spin up terminal
terminal.textContent = "> ";
inputStart = terminal.innerText.length;


//actual systems
async function startingSelect(){ //only printing text for system.
    await typeText("Welcome, you have been successfully loaded in", 50);
    await typeText("You are now ready to begin your setup.", 50);
    await typeText("Please choose how you want to split your 15 points:", 50);
    await typeText("1. Intelligence Cost: " + costIntelligence, 50);
    await typeText("2. Strength Cost: " + costStrength, 50);
    await typeText("3. Agility Cost: " + costAgility, 50);
    await typeText("4. Luck Cost: " + costLuck, 50);
    await typeText("Type a number: (1), (2), (3), (4)",50)

    addLineBreak(">");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();

}

async function checkStats() {
    await typeText ("Your stats are the following:")
    await typeText ("Intelligence: " + playerInelligence)
    await typeText ("Strength: " + playerStrength)
    await typeText ("Agility: " + playerAgility)
    await typeText ("Luck: " + playerLuck)

    addLineBreak(">");
    inputStart = terminal.innerText.length;        
    moveCursorToEnd();
}

async function endWrite() {
    addLineBreak(">");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
}