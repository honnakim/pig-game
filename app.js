/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevRoll, inputNum, numGoal;

init();

document.querySelector('.dice').style.display = 'none'; 
document.querySelector('.dice-2').style.display = 'none'; 

document.querySelector('.btn-roll').addEventListener('click', function() {
    if(gamePlaying) {
        var dice = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        var rollDice = document.querySelector('.dice');
        var rollDice2 = document.querySelector('.dice-2');

        rollDice.style.display = 'block';
        rollDice.src = 'dice-' + dice + '.png';       

        rollDice2.style.display = 'block';
        rollDice2.src = 'dice-' + dice2 + '.png';

        //IF 6 IS ROLLED TWIC IN A ROW
        if(dice === 6 && dice2 === 6) {
            nextPlayer();
        }
        //UPDATE ROUNDSCORE IF IT IS NOT 1
        else if(dice !== 1 && dice2 !== 1) {
            roundScore += dice + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }

        //CAPTURE DICE ROLL VALUE
        prevRoll = dice;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if(gamePlaying) {
        //GET SCORE FOR THE ACTIVE PLAYER FROM THE ROUND SCORE
        scores[activePlayer] += roundScore;

        //UPDATED THE UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        //CHECK IF PLAYER WON THE GAME
        if(scores[activePlayer] >= numGoal) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';  
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';  
            document.querySelector('.dice-2').style.display = 'none';  
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}

document.querySelector('.btn-new').addEventListener('click', init);

function getNum () {
    inputNum = document.querySelector('.winning-input-field');

    numGoal = inputNum.value;
    document.querySelector('.winning-input').style.display = 'none';
 }

document.querySelector('.set-goal-btn').addEventListener('click', getNum);

function init() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';  
    document.getElementById('name-1').textContent = 'Player 2';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.winning-input-field').value = '';
    document.querySelector('.winning-input').style.display = 'block';

    document.querySelector('.player-0-panel').classList.add('active');

}
