'use strict';

// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

//Starting/iniitalizing conditions
let scores, currentScore, activePlayer, playing;
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true; // state variable

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}
init();

function switchPlayer() {
  //switch active player
  // but reset and  display currentScore of current active player to 0 before switching to next active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  // now,switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;

  //toggle background color of both player using a player--active class when switching
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// Rolling the dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    //   console.log(dice);

    // display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check condition if dice rolled is 1 or not
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;

      // current0El.textContent = currentScore;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// holding the currentScore functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    //add currentScore to active players total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // check if score of active player is >= 100 for now >=20
    // if (scores[activePlayer] >= 20) {
    if (scores[activePlayer] >= 100) {
      // finish the game
      playing = false;

      diceEl.classList.add('hidden');

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to the active player to next player, when hold btn is clicked
      switchPlayer();
    }
  }
});

// Reseting the whole game at any point/time ==> reseting in middle of game or after a player wins it
btnNew.addEventListener('click', init);
