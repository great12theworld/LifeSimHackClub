//let playerName = null
//let seed = null //for game mechanics later on

import {storyOpening} from "../Story Files/story.js"

let inputStart = 0;

let gameStart = false; 

let commandCount = 3;

let playerInelligence = 0
let playerStrength = 0
let playerAgility = 0
let playerLuck = 0


let openingStoryState = "unstarted"

// for Starting Select systems:
let stateStartingSelect = "unstarted";
let statPoints = 15;
let costIntelligence = 1;
let costStrength = 1;
let costAgility = 1;
let costLuck = 1;



// for money system;
let CurrentMoney = 500;

//for relationship systems;
let RelationshipCount = 2;

let checkingRelations = false;

let relationships = [
    {
        name: "Diane",
        relationship: "Mother",
        connection: 93,
        value: "Infinite"
    },   //DONT FORGET COMMAS!!!
    {
        name: "Ellie",
        relationship: "Sister",
        connection: 82,
        value: "Infinite"
    }
]


const terminal = document.getElementById('terminal')

function moveCursorToEnd() {
    terminal.focus();

    const lastLine =terminal.lastChild;

    const range = document.createRange();
    range.selectNodeContents(lastLine);
    range.collapse(false);
    
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

}

function scrollToBottom() {
    terminal.scrollTop = terminal.scrollHeight;
}


//changed from a DOM system to text content for better input/output handling.

export async function typeText(text,speed = 20) {
    const line = document.createElement('div');
    terminal.appendChild(line);

    for (let i = 0; i < text.length; i++) {

        line.textContent += text[i];

        moveCursorToEnd();
        scrollToBottom();

        await new Promise(resolve =>
            setTimeout(resolve, speed)
        );
    }
}

export {typeText}

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
            if (commandCount === 3) { //command count will be used over and over again as a type of 'gamestate'
                await typeText("Available commands: help, clear, start", 30);
            } else if (commandCount === 4) {
                await typeText("Available commands: help, clear, loadstats, checkstats ", 30);
            } else if (commandCount === 5){
                await typeText("Available commands: help, clear, checkstats, startstory")
            } else if (commandCount === 6){
                await typeText("Available commands: help, clear, work, callsomeone, checkmoney, checkstats, checkrelations.")
            }
        }
        


        if (newText.toLowerCase() === "start" && commandCount === 3) { //if the user types in start and the right game state is made available then it will run
            //this code is redundant and could be reduced, but I did not optimize this, I may go back in later and do that.
            gameStart = true;
        }
        


        if (gameStart){ // introduction text
            await typeText("Welcome to SimLifeX!");
            await typeText("This is a simple life simulation.")
            await typeText("Systems are under development but will evolve over time.")
            await typeText("If you ever get stuck, type 'help' for a list of commands.")
            await typeText("TW: Heavy topics including death, violence, despair, or loss.")
            await typeText("If there are bugs/gramatical mistakes hunt down the repository for this and lmk over there, or if you know me in person you can tell me that way!")
            await typeText("Also Im not the greatest author so it might not be the best writing ever :sob:")
            await typeText("I'm gonna patch you in now.");
            await typeText("Good luck!");
            await typeText("Loading");
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
            commandCount = 5;
        }

        if (openingStoryState === "unstarted" && commandCount === 5 && newText.toLowerCase() === "startstory"){
            storyOpening();
            commandCount = 6;
        }
        if (newText.toLowerCase() === "checkmoney" && commandCount >= 6){
            CheckMoney();
        }
        if (newText.toLowerCase() === "checkstats" && commandCount >= 4){
            checkStats();
        }

        //checkrelations\add more characters stuff
        if (newText.toLowerCase() ==="checkrelations" && commandCount >= 6){
            checkingRelations = true;
            if (RelationshipCount === 2){
                await typeText("Please select a person")
                for (let i = 0; i < relationships.length; i++){
                    await typeText(relationships[i].name + " (" + (i+1) + ")"); //this is the coolest line
                }
            } // insert more characters/relations here, may automate this section. 
            
            else {
                await typeText("Error, something is wrong with the relationship systems!!")
            }
        }
        if (checkingRelations == true && !isNaN(Number(newText.toLowerCase()))){
            
            await typeText("Name: " + relationships[(Number(newText.toLowerCase()) - 1)].name)
            await typeText("Relatioship: " + relationships[(Number(newText.toLowerCase()) - 1)].relationship)
            await typeText("Connection: " + relationships[(Number(newText.toLowerCase()) - 1)].connection)
            await typeText("Value: " + relationships[(Number(newText.toLowerCase()) - 1)].value)
            checkingRelations = false;
        }
        

        addLineBreak("> ");
        inputStart = terminal.innerText.length;
        moveCursorToEnd();
        



    } //end of enter listening
    
})

//spin up terminal
terminal.textContent = "> ";
inputStart = terminal.innerText.length;


//actual systems
async function startingSelect(){ //only printing text for system.
    await typeText("Welcome, you have been successfully loaded in.");
    await typeText("You are now ready to begin your setup.");
    await typeText("Please choose how you want to split your 15 points:");
    await typeText("1. Intelligence Cost: " + costIntelligence);
    await typeText("2. Strength Cost: " + costStrength);
    await typeText("3. Agility Cost: " + costAgility);
    await typeText("4. Luck Cost: " + costLuck);
    await typeText("Type a number: (1), (2), (3), (4)")

    addLineBreak("> ");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();

}

async function checkStats() {
    await typeText ("Your stats are the following:")
    await typeText ("Intelligence: " + playerInelligence)
    await typeText ("Strength: " + playerStrength)
    await typeText ("Agility: " + playerAgility)
    await typeText ("Luck: " + playerLuck)

    addLineBreak("> ");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
}

async function endWrite() {
    addLineBreak("> ");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
}


async function CheckMoney() {
    await typeText("Your current chip count is:")
    await typeText(CurrentMoney +" Chips")
    addLineBreak("> ")
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
}