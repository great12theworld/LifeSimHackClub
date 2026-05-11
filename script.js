//let playerName = null
//let seed = null //for game mechanics later on


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

async function typeText(text,speed = 20) {
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
        if (newText.toLowerCase() === "checkmoney" && commandCount === 6){
            CheckMoney();
        }
        if (newText.toLowerCase() === "checkstats" && commandCount == 4){
            checkStats();
        }
        if (newText.toLowerCase() ==="checkrelations" && commandCount === 6){
            checkingRelations = true;
            if (RelationshipCount === 2){
                await typeText("Please select a person")
                await typeText(relationships[0].name + " (1)")
                await typeText(relationships[1].name + " (2)")
            }
        }
        if (checkingRelations == true && newText.toLowerCase() == "1"){
            
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



async function storyOpening(){
    await typeText("'What is wrong with you today!' - Your mom is yelling at you.  ", 30)
    await typeText("You dont know what to say.", 30)
    await typeText("'Why are you doing this to me!' - She said this with tears brimming collapse against her...", 60)
    await typeText("frail,", 75)
    await typeText("heavy eyelids.", 75)
    await typeText("You wake up.", 50)
    await typeText("-----", 40)
    await typeText("-----", 40)
    await typeText("-----", 40)
    await typeText("That fragrant morning smell assimilates into the insides of your nose. You cut open your last apple.")
    await typeText("It smells wonderful. It smells like the memory of flowers blossoming and freshly cut grass.")
    await typeText("Everything feels so, nice. Like no matter what you did, it would be okay.")
    await typeText("'Hi mom!' - You say, seeing her in the hallway of your apartment on the 42nd floor of the biggest apartment rental in the district")
    await typeText("'Everything alright?' - She says, stopping by while carrying two huge boxes.")
    await typeText("The white hue of the boxes reminds you of your sister for some reason.")
    await typeText("-----")
    await typeText("'Yeah, no I just had a bad dream is all.' - You notice labeling on the boxes for a-")
    await typeText(" 'THE GOLDBERG FOUNDATION??' - You yell out.", 40)
    await typeText("-----")
    await typeText("'I dont see what's so wrong about that?' - The Goldberg Foundation is one of the largest corporations to claim all resources from the government.")
    await typeText("After the government started giving out what little resources remained, split evenly across all people of course, large groups of people banded together.")
    await typeText("The Goldburg Foundation was the largest of all. They had managed to amass over 2.4 Million chips worth of food, clothing, water and more. Nothing was left.")
    await typeText("They operated by getting desperate people without families to give everything they had for a chance to earn more.")
    await typeText("Those who performed well, recived chips in the form of food and clothing.")
    await typeText("Those who did otherwise...", 50)
    await typeText("-----")
    await typeText(" -- You dont respond.")
    await typeText("Your mom continues walking down the hall. You hear the thud of the boxes against the kitchen countertop.")
    await typeText("You look out your window which stares downward into the streets below and upwards to the airy clouds.")
    await typeText("-----")
    await typeText("At the train station:   ")
    await typeText("'Bye sweetie!! I'll see you next time you visit alright!!' -- You smile from inside the train as you make your way home.")
    await typeText("You have some things to do if you intend to survive.")
    await typeText("-----",70)
    await typeText("SYSTEM MSG: You will officially begin your story in the city of Lurilin.")
    await typeText("Your story will be shaped by the decisions you make.")
    await typeText("You can do things from calling people, meeting new ones, working. Even climbing the ranks of the Goldburg Foundation if you wish.")
    await typeText("You can make your story all about money, love, revenge, or power.")
    await typeText("Each one will be determined by numerous built in factors, each one having different levels of difficulty.")
    await typeText("Each ending carving itself in its own way.")
    await typeText("As of now only one ending can be achieved at one point")
    await typeText("More help options have been unlocked, use them")
    await typeText("As you proceed through the game certain commands will lock themselves, or SHOULD lock themselves")
    await typeText("Ensuring that only one path out of the four can be attained.")
    await typeText("--END MSG--");
    addLineBreak("> ");
    inputStart = terminal.innerText.length;        
    moveCursorToEnd();
    commandCount = 6
}

async function CheckMoney() {
    await typeText("Your current chip count is:")
    await typeText(CurrentMoney +" Chips")
    addLineBreak("> ")
    inputStart = terminal.innerText.length;
    moveCursorToEnd();
}