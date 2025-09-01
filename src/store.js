// store.js
import { createStore } from 'redux';             // imports createStore function to actually make a Redux store.

const initialState = {
  playerScore: 0,
  computerScore: 0,
  currentRound: 1,                                       // This is your default state (like React’s useState, but global).
  gameStatus: 'playing', // 'playing' or 'ended'                // Example: player starts with 0 score, round 1, etc.
  kickResult: null, // 'goal', 'miss', or null
  isComputerKicking: false
};

function gameReducer(state = initialState, action) {         // function that decides how the state changes based on actions.
  switch (action.type) {                                              // action.type is like a command: "PLAYER_KICK", "COMPUTER_KICK", etc.
    case 'PLAYER_KICK':
      const playerResult = Math.random() > 0.5 ? 'goal' : 'miss';              // Randomly decide if it’s goal or miss.
      const newPlayerScore = playerResult === 'goal' 
        ? state.playerScore + 1                                             // If goal → add 1 to playerScore.
        : state.playerScore;
      
      return {
        ...state,
        playerScore: newPlayerScore,
        kickResult: playerResult,                        // Update kickResult (to show GOAL/MISS).
        isComputerKicking: true                     // Set isComputerKicking: true so it’s computer’s turn next.
      };
      
    case 'COMPUTER_KICK':
      const computerResult = Math.random() > 0.5 ? 'goal' : 'miss';
      const newComputerScore = computerResult === 'goal' 
        ? state.computerScore + 1 
        : state.computerScore;
      
      const nextRound = state.currentRound + 1;
      const gameStatus = nextRound > 5 ? 'ended' : 'playing';
      
      return {
        ...state,
        computerScore: newComputerScore,
        currentRound: nextRound,
        gameStatus,
        kickResult: computerResult,
        isComputerKicking: false
      };
      
    case 'RESET_GAME':
      return initialState;
      
    default:
      return state;
  }
}

const store = createStore(gameReducer);
export default store;