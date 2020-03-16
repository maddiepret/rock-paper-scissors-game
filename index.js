//create rps function - onclick function
function rpsGame(yourChoice) {
    console.log(yourChoice);

    //2 choices
    let humanchoice, botChoice;
    humanchoice = yourChoice.id; //rock, paper or scissor
    botChoice = numberToChoice(randToRpsInt()) //computer choice
    console.log(`Computer choice: ${botChoice}`);
    //get results and see who wins
    results = decideWinner(humanchoice, botChoice); //[1,0], [0.5, 0.5] or [0,1]
    console.log(results);
    //message for you win, loose or draw
    message = finalMessage(results); //{'message': 'you won!', 'color': 'green'}
    console.log(message);
    //final function to front end - remove one image
    rpsFrontEnd(yourChoice.id, botChoice, message);
};

//function for the bot to choose randomly - computer choose a number between 0-2
function randToRpsInt() {
    return Math.floor(Math.random() * 3);
};

function numberToChoice(number) {
    return ['rock', 'paper', 'scissors'][number];
};

//decide the winner
function decideWinner(yourChoice, computerChoice) {
    //create 'database' for all posibilities
    let rpsDataBase = {
        'rock': {
            'scissors': 1,
            'rock': 0.5,
            'paper': 0
        },
        'paper': {
            'scissors': 0,
            'rock': 1,
            'paper': 0.5
        },
        'scissors': {
            'scissors': 0.5,
            'rock': 0,
            'paper': 1
        },

    }
    let yourScore = rpsDataBase[yourChoice][computerChoice];
    let computerScore = rpsDataBase[computerChoice][yourChoice];

    return [yourScore, computerScore];
}

//message for win/los/draw
function finalMessage([yourScore, computerScore]) {
    //only 3 options
    if (yourScore === 0) {
        return { 'message': 'You lost!', 'color': 'red' }
    } else if (yourScore === 0.5) {
        return { 'message': 'You tied!', 'color': 'yellow' }
    } else {
        return { 'message': 'You won!!', 'color': 'green' }
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    //create database of images - JSON object
    //easy to access the image I need.

    let imagesDatabase = {
            'rock': document.getElementById('rock').src,
            'paper': document.getElementById('paper').src,
            'scissors': document.getElementById('scissors').src,
        }
        //remove all images when click
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();
    //display image you chose and bot choice

    // create a few div - one for my choice, bots choice and the message
    let humanDiv = document.createElement('div');
    let botDiv = document.createElement('div');
    let messageDiv = document.createElement('div');

    //write innerHTML 
    humanDiv.innerHTML = "<img src=' " + imagesDatabase[humanImageChoice] + "' height=250 width=250 style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1)';>";
    messageDiv.innerHTML = "<h1 style='color: " + finalMessage['color'] + "; font-size: 60px; padding: 30px;'>" + finalMessage['message'] + "</h1>";
    botDiv.innerHTML = "<img src=' " + imagesDatabase[botImageChoice] + "' height=250 width=250 style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1)';>";

    //append the innerHTML to the div inside the HTML file
    document.getElementById('flex-box-rps-div').appendChild(humanDiv);
    document.getElementById('flex-box-rps-div').appendChild(messageDiv);
    document.getElementById('flex-box-rps-div').appendChild(botDiv);
}