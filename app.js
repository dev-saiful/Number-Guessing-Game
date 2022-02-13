// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;


// UI Elements

const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max

minNum.textContent = min;
maxNum.textContent = max;

// Play again even listener
game.addEventListener('mousedown',function(e)
{
    if(e.target.className === 'play-again')
    {
        window.location.reload();
    }
});

// Listen for guess

guessBtn.addEventListener('click', function(){
    let guess = parseInt(guessInput.value);

    // Validate
    if(isNaN(guess) || guess < min || guess > max)
    {
        setMessage(`Please enter a number between ${min} and ${max}`, 'red');
    }
    
    // check if win
    if(guess === winningNum)
    {
        // Game over - win
        gameOver(true,`${winningNum} is corrct, You WIN!`);
        
    }
    else
    {
        // Worng number
        guessesLeft -= 1;
        if(guessesLeft === 0)
        {
            // Game over - lost

            gameOver(false,`Game Over, You Lost!. Correct number was ${winningNum}`);
        }
        else
        {
            // Game continues - answer wrong

            // Change border color
            guessInput.style.borderColor = 'red';

            //Clear input
            guessInput.value = '';

            // Tell user its the worng number
            setMessage(`${guess} is not correct,${guessesLeft} guesses left`,'red');
        }
        
    }
});

// Game over

function gameOver(won, msg)
{
    let color;
    won === true ? color = 'green' : color = 'red';

    // Disable Input
    guessInput.disabled = true;
    // Change Boarder color
    guessInput.style.borderColor = color;
    // set text color
    message.style.color = color;
    // set message
    setMessage(msg);
    // Play again
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again';
}

// Get winning number
function getRandomNum(min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

// Set message

function setMessage(msg,color)
{
    message.style.color = color;
    message.textContent = msg;
}