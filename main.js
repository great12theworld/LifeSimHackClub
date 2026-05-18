//let playerName = null
//let seed = null //for game mechanics later on

import {storyOpening} from "./story.js"

let spinUpRan = false

let inputStart = 0;

let gameStart = false; 

// let commandCount = 3;

let states = {
    anything: false
}

let unlockedCommands = [
    "help", 
    "clear",
    "start",
]


let whichStat = 0;
let currentStatSelect = null;

// let playerInelligence = 0
// let playerStrength = 0
// let playerAgility = 0
// let playerLuck = 0

let player = {
    stats:{
        inteligence: 0,
        strength: 0,
        agility: 0,
        luck: 0,
    },
    money: 0,

    state: "preStartup"

}

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

let workOptions = [

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


function addLineBreak(text) {
    const line = document.createElement('div'); 
    line.textContent = text;
    terminal.appendChild(line);
    scrollToBottom();
}


function checkCommands(){
    for (let i = 0; i<arguments.length; i++){
        let checktemp = unlockedCommands.includes(arguments[i])
        if (checktemp == false){
            return false;
        }
    }
    return true;
}

terminal.addEventListener('beforeinput', async (event) => {
    if (event.inputType === "insertParagraph") {
        event.preventDefault();
        const fullText = terminal.innerText;
        const newText = fullText.substring(inputStart).trim();
        
        if (newText.toLowerCase() === "help") {
            // Handle help command
                // if (checkCommands("help","clear","start")) { // command count no longer exsists.
                //     await typeText("Available commands: help, clear, start", 30);

                // } else if (checkCommands("help","clear","loadstats","checkstats")) {
                //     await typeText("Available commands: help, clear, loadstats, checkstats ", 30);

                // } else if (checkCommands("help","clear","checkstats","startstory")){
                //     await typeText("Available commands: help, clear, checkstats, startstory")

                // } else if (checkCommands("help","clear","work","callsomeone","checkmoney","checkstats","checkrelations")){
                //     await typeText("Available commands: help, clear, work, callsomeone, checkmoney, checkstats, checkrelations.")
                // }
                await typeText("Available Commands:")
                for (let i = 0; i < unlockedCommands.length; i ++) {
                    await typeText(unlockedCommands[i])
                }
        }
        


        if (newText.toLowerCase() === "start" &&  unlockedCommands.includes("start")) { //if the user types in start and the right game state is made available then it will run
            //this code is redundant and could be reduced, but I did not optimize this, I may go back in later and do that.
            gameStart = true;
            unlockedCommands
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
            // commandCount ++;
            unlockedCommands.push("loadstats")
            unlockedCommands.push("checkstats")
            unlockedCommands = unlockedCommands.filter(num => num !== "start")
        }
        
        if (newText.toLowerCase() === "loadstats" && stateStartingSelect === "unstarted" && unlockedCommands.includes("loadstats")){
            // await startingSelect()
            await typeText("You have 15 points to use for stats")
            await typeText("You can spend them in, Intelligence, Strength, Agility, Luck")
            stateStartingSelect = "running"
        }
        // if (stateStartingSelect === "running" && newText.toLowerCase() === "1"){
        //     if (statPoints >= 1){
        //         statPoints = statPoints - 1;
        //         playerInelligence ++;                        
        //         await typeText("1 point added to Intelligence")
        //         await typeText("Points remaining: " + statPoints)
        //         await typeText("please select another number: (1), (2), (3), (4)")
        //         moveCursorToEnd()
        //     } 
        
        // }else if (stateStartingSelect === "running" && newText.toLowerCase() === "2"){
        //     if (statPoints >= 1){
        //         statPoints = statPoints - 1;
        //         playerStrength ++;                        
        //         await typeText("1 point added to Strength")
        //         await typeText("Points remaining: " + statPoints)
        //         await typeText("please select another number: (1), (2), (3), (4)")
        //         moveCursorToEnd()
        //     }


        // } else if (stateStartingSelect === "running" && newText.toLowerCase() === "3"){
        //     if (statPoints >= 1){
        //         statPoints = statPoints - 1;
        //         playerAgility ++;
        //         await typeText("1 point added to Agility")
        //         await typeText("Points remaining: " + statPoints)
        //         await typeText("please select another number: (1), (2), (3), (4)")
        //         moveCursorToEnd()
        //     }
            
        
        
        
        // } else if (stateStartingSelect === "running" && newText.toLowerCase() === "4"){
        //     if (statPoints >= 1){
        //         statPoints = statPoints - 1;
        //         playerLuck ++;                        
        //         await typeText("1 point added to Luck")
        //         await typeText("Points remaining: " + statPoints)
        //         await typeText("please select another number: (1), (2), (3), (4)")
        //         moveCursorToEnd()
        //     }

        // } 
        if (stateStartingSelect === "running"){

            if (!(statPoints == 0)){  // PARTHHHHHHHHHHHH PARTHHHHHHHHHHHHHHHH ADD AN ADDITIONAL ELSE IF FOR THE BUG HERE!!!!! gn vro
                if (currentStatSelect == "Intelligence" && !isNaN(Number(newText.toLowerCase()))){
                    if (statPoints >= Number(newText.toLowerCase()) && (!(statPoints - Number(newText.toLowerCase()) < 0))){
                        statPoints = statPoints - Number(newText.toLowerCase())
                        player.stats.inteligence += Number(newText.toLowerCase())
                        await typeText("Points added to Intelligence")
                    } else if ((statPoints - Number(newText.toLowerCase())) < 0){
                        await typeText("That is too expensive, please try again.")
                        whichStat = 0
                    }
                } else if (currentStatSelect == "Strength" && !isNaN(Number(newText.toLowerCase()))){
                    if (statPoints >= Number(newText.toLowerCase()) && (!(statPoints - Number(newText.toLowerCase()) < 0))){
                        statPoints = statPoints - Number(newText.toLowerCase())
                        player.stats.strength += Number(newText.toLowerCase())
                        await typeText("Points added to Strength")
                    } else if ((statPoints - Number(newText.toLowerCase())) < 0){
                        await typeText("That is too expensive, please try again.")
                        whichStat = 1
                    }
                } else if (currentStatSelect == "Agility" && !isNaN(Number(newText.toLowerCase()))){
                    if (statPoints >= Number(newText.toLowerCase()) && (!(statPoints - Number(newText.toLowerCase()) < 0))){
                        statPoints = statPoints - Number(newText.toLowerCase())
                        player.stats.agility += Number(newText.toLowerCase())
                        await typeText("Points added to Agility")
                    } else if ((statPoints - Number(newText.toLowerCase())) < 0){
                        await typeText("That is too expensive, please try again.")
                        whichStat = 2
                    }
                } else if (currentStatSelect == "Luck" && !isNaN(Number(newText.toLowerCase()))){
                    if (statPoints >= Number(newText.toLowerCase()) && (!(statPoints - Number(newText.toLowerCase()) < 0))){
                        statPoints = statPoints - Number(newText.toLowerCase())
                        player.stats.luck += Number(newText.toLowerCase())
                        await typeText("Points added to Luck")
                    } else if ((statPoints - Number(newText.toLowerCase())) < 0){
                        await typeText("That is too expensive, please try again.")
                        whichStat = 3
                    }
                }

                if (whichStat == 0){
                    await typeText("How many points do you want in Intelligence")
                    currentStatSelect = "Intelligence"
                    whichStat = 1
                } else if (whichStat == 1){
                    await typeText("How many points do you want in Strength")
                    currentStatSelect = "Strength"
                    whichStat = 2
                } else if(whichStat == 2){
                    await typeText("How many points do you want in Agility")
                    currentStatSelect = "Agility"
                    whichStat = 3
                } else if(whichStat == 3){
                    await typeText("How many points do you want in Luck")
                    currentStatSelect = "Luck"
                    whichStat = "done"
                }
            } 
            if (statPoints <= 0) {
                await typeText ("You have now used all of your points")
                await typeText ("Your stats are the following:")
                await typeText ("Intelligence: " + player.stats.inteligence)
                await typeText ("Strength: " + player.stats.strength)
                await typeText ("Agility: " + player.stats.agility)
                await typeText ("Luck: " + player.stats.luck)
                unlockedCommands.push("startstory")
                stateStartingSelect = "ended"
                unlockedCommands = unlockedCommands.filter(num => num !== "loadstats")
            }
        }

        // if (stateStartingSelect === "running" && statPoints < 1){
        //     await typeText ("You have now used all of your points")
        //     await typeText ("Your stats are the following:")
        //     await typeText ("Intelligence: " + playerInelligence)
        //     await typeText ("Strength: " + playerStrength)
        //     await typeText ("Agility: " + playerAgility)
        //     await typeText ("Luck: " + playerLuck)
        //     unlockedCommands.push("startstory")
        //     stateStartingSelect = "ended"
        //     // commandCount = 5;
        // }

        if (openingStoryState === "unstarted" && unlockedCommands.includes("startstory") && newText.toLowerCase() === "startstory"){
            await storyOpening();
            // addLineBreak("> ");
            // inputStart = terminal.innerText.length;        
            // moveCursorToEnd();
            unlockedCommands.push("callsomeone (Not Available, too much story)") // adds the commands into the array.
            unlockedCommands.push("checkmoney")
            unlockedCommands.push("checkstats")
            unlockedCommands.push("checkrelations")
            unlockedCommands.push("work")
            // commandCount = 6;
        }
        if (newText.toLowerCase() === "checkmoney" && unlockedCommands.includes("checkmoney")){
            await CheckMoney();
        }
        if (newText.toLowerCase() === "checkstats" && unlockedCommands.includes("checkstats")){
            await checkStats();
        }

        //checkrelations\add more characters stuff
        if (newText.toLowerCase() ==="checkrelations" && unlockedCommands.includes("checkrelations")){
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


        if (newText.toLowerCase =="work" && unlockedCommands.includes("work")){
            await typeText("Please select an option:")
            await typeText("Apply for a job with the Goldberg Foundation (1)")
            await typeText("Apply for a job at the store TENCENTER (2)")
            await typeText("Apply ") // If strength and agility are over 4, or equal to 5
        }
        

        addLineBreak("> ");
        inputStart = terminal.innerText.length;
        moveCursorToEnd();
        



    } //end of enter listening
    
})

//spin up terminal
// if (!states.anything && !spinUpRan){
    addLineBreak("> ");
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
    spinUpRan = true
// }


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



}

async function checkStats() {
    await typeText ("Your stats are the following:")
    await typeText ("Intelligence: " + player.stats.inteligence)
    await typeText ("Strength: " + player.stats.strength)
    await typeText ("Agility: " + player.stats.agility)
    await typeText ("Luck: " + player.stats.luck)

}

// async function endWrite() {
//     addLineBreak("> ");
//     inputStart = terminal.innerText.length;
//     moveCursorToEnd();
// }

async function CheckMoney() {
    await typeText("Your current chip count is:")
    await typeText(CurrentMoney +" Chips")
}