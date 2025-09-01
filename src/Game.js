// Game.js
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { playerKick, computerKick, resetGame } from './actions';

const Game = () => {
  const { 
    playerScore, 
    computerScore, 
    currentRound, 
    gameStatus, 
    kickResult,
    isComputerKicking 
  } = useSelector(state => state);
  
  const dispatch = useDispatch();
  const [missDirection, setMissDirection] = useState(null); // 'left' or 'right'
  const [isAnimating, setIsAnimating] = useState(false);

  const handleKick = () => {
    if (gameStatus === 'playing' && !isComputerKicking && !isAnimating) {
      setIsAnimating(true);
      
      // Randomly determine miss direction
      const direction = Math.random() > 0.5 ? 'left' : 'right';
      setMissDirection(direction);
      
      dispatch(playerKick());
    }
  };

  useEffect(() => {
    if (isComputerKicking) {
      const timer = setTimeout(() => {
        dispatch(computerKick());
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isComputerKicking, dispatch]);

  useEffect(() => {
    // Reset ball position after animation completes
    if (kickResult && isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setMissDirection(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [kickResult, isAnimating]);

  const getWinner = () => {
    if (playerScore > computerScore) return "Player Wins!";
    if (computerScore > playerScore) return "Computer Wins!";
    return "It's a Tie!";
  };

  return (
    <div className="game-container">
      <div className="game-header">
        <h1 className="game-title">PENALTY SHOOTOUT CHALLENGE</h1>
        <div className="stadium"></div>
      </div>
      
      <div className="scoreboard">
        <div className="score-card player">
          <div className="score-label">PLAYER</div>
          <div className="score-value">{playerScore}</div>
        </div>
        
        <div className="round-indicator">
          <div className="round-text">
            {gameStatus === 'playing' ? 'ROUND' : 'FINAL'}
          </div>
          <div className="round-number">
            {gameStatus === 'playing' ? `${currentRound}/5` : 'GAME OVER'}
          </div>
        </div>
        
        <div className="score-card computer">
          <div className="score-label">COMPUTER</div>
          <div className="score-value">{computerScore}</div>
        </div>
      </div>

      <div className="game-field">
        <div className="stadium-background"></div>
        
        <div className="goal-area">
          <div className="goal-net"></div>
          <div className="goal-post left"></div>
          <div className="goal-post right"></div>
          <div className="goal-crossbar"></div>
          
          <div className={`goalkeeper ${isComputerKicking ? 'active' : ''}`}>
            <div className="goalkeeper-body"></div>
            <div className="goalkeeper-glove left"></div>
            <div className="goalkeeper-glove right"></div>
          </div>
        </div>
        
        <div className={`ball 
          ${kickResult === 'goal' ? 'kick-goal' : ''} 
          ${kickResult === 'miss' && missDirection ? `kick-miss-${missDirection}` : ''}`}>
        </div>
        
        <div className="field">
          <div className="penalty-spot"></div>
          <div className="field-lines"></div>
        </div>
        
        {kickResult && (
          <div className={`result-overlay ${kickResult}`}>
            <div className="result-text">
              {kickResult === 'goal' ? 'GOAL!' : 'MISSED!'}
            </div>
            <div className="result-icon">
              {kickResult === 'goal' ? '⚽' : '❌'}
            </div>
          </div>
        )}
      </div>

      <div className="game-controls">
        {gameStatus === 'playing' ? (
          <button 
            className={`kick-button ${isComputerKicking || isAnimating ? 'disabled' : ''}`}
            onClick={handleKick}
            disabled={isComputerKicking || isAnimating}
          >
            <span className="kick-text">
              {isComputerKicking ? 'COMPUTER KICKING...' : 
               isAnimating ? 'BALL IN MOTION...' : 'KICK!'}
            </span>
            <div className="button-shine"></div>
          </button>
        ) : (
          <div className="game-over">
            <h2 className="winner-text">{getWinner()}</h2>
            <div className="final-score">
              <span>Final Score: </span>
              <span className="player-score">{playerScore}</span>
              <span> - </span>
              <span className="computer-score">{computerScore}</span>
            </div>
            <button className="reset-button" onClick={() => dispatch(resetGame())}>
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;















































// // Game.js
// import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { playerKick, computerKick, resetGame } from './actions';

// const Game = () => {
//   const { 
//     playerScore, 
//     computerScore, 
//     currentRound, 
//     gameStatus, 
//     kickResult,
//     isComputerKicking 
//   } = useSelector(state => state);
  
//   const dispatch = useDispatch();
//   const [missDirection, setMissDirection] = useState(null); // 'left' or 'right'
//   const [isAnimating, setIsAnimating] = useState(false);

//   const handleKick = () => {
//     if (gameStatus === 'playing' && !isComputerKicking && !isAnimating) {
//       setIsAnimating(true);
      
//       // Randomly determine miss direction
//       const direction = Math.random() > 0.5 ? 'left' : 'right';
//       setMissDirection(direction);
      
//       dispatch(playerKick());
//     }
//   };

//   useEffect(() => {
//     if (isComputerKicking) {
//       const timer = setTimeout(() => {
//         dispatch(computerKick());
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [isComputerKicking, dispatch]);

//   useEffect(() => {
//     // Reset ball position after animation completes
//     if (kickResult && isAnimating) {
//       const timer = setTimeout(() => {
//         setIsAnimating(false);
//         setMissDirection(null);
//       }, 1500);
//       return () => clearTimeout(timer);
//     }
//   }, [kickResult, isAnimating]);

//   const getWinner = () => {
//     if (playerScore > computerScore) return "Player Wins!";
//     if (computerScore > playerScore) return "Computer Wins!";
//     return "It's a Tie!";
//   };

//   return (
//     <div className="game-container">
//       <div className="game-header">
//         <h1 className="game-title">PENALTY SHOOTOUT CHALLENGE</h1>
//         <div className="stadium"></div>
//       </div>
      
//       <div className="scoreboard">
//         <div className="score-card player">
//           <div className="score-label">PLAYER</div>
//           <div className="score-value">{playerScore}</div>
//         </div>
        
//         <div className="round-indicator">
//           <div className="round-text">ROUND</div>
//           <div className="round-number">{currentRound}<span className="total-rounds">/5</span></div>
//         </div>
        
//         <div className="score-card computer">
//           <div className="score-label">COMPUTER</div>
//           <div className="score-value">{computerScore}</div>
//         </div>
//       </div>

//       <div className="game-field">
//         <div className="stadium-background"></div>
        
//         <div className="goal-area">
//           <div className="goal-net"></div>
//           <div className="goal-post left"></div>
//           <div className="goal-post right"></div>
//           <div className="goal-crossbar"></div>
          
//           <div className={`goalkeeper ${isComputerKicking ? 'active' : ''}`}>
//             <div className="goalkeeper-body"></div>
//             <div className="goalkeeper-glove left"></div>
//             <div className="goalkeeper-glove right"></div>
//           </div>
//         </div>
        
//         <div className={`ball 
//           ${kickResult === 'goal' ? 'kick-goal' : ''} 
//           ${kickResult === 'miss' && missDirection ? `kick-miss-${missDirection}` : ''}`}>
//         </div>
        
//         <div className="field">
//           <div className="penalty-spot"></div>
//           <div className="field-lines"></div>
//         </div>
        
//         {kickResult && (
//           <div className={`result-overlay ${kickResult}`}>
//             <div className="result-text">
//               {kickResult === 'goal' ? 'GOAL!' : 'MISSED!'}
//             </div>
//             <div className="result-icon">
//               {kickResult === 'goal' ? '⚽' : '❌'}
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="game-controls">
//         {gameStatus === 'playing' ? (
//           <button 
//             className={`kick-button ${isComputerKicking || isAnimating ? 'disabled' : ''}`}
//             onClick={handleKick}
//             disabled={isComputerKicking || isAnimating}
//           >
//             <span className="kick-text">
//               {isComputerKicking ? 'COMPUTER KICKING...' : 
//                isAnimating ? 'BALL IN MOTION...' : 'KICK!'}
//             </span>
//             <div className="button-shine"></div>
//           </button>
//         ) : (
//           <div className="game-over">
//             <h2 className="winner-text">{getWinner()}</h2>
//             <button className="reset-button" onClick={() => dispatch(resetGame())}>
//               PLAY AGAIN
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Game;







































// // // Game.js
// // import React, { useEffect } from 'react';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { playerKick, computerKick, resetGame } from './actions';

// // const Game = () => {
// //   const { 
// //     playerScore, 
// //     computerScore, 
// //     currentRound, 
// //     gameStatus, 
// //     kickResult,
// //     isComputerKicking 
// //   } = useSelector(state => state);
  
// //   const dispatch = useDispatch();

// //   const handleKick = () => {
// //     if (gameStatus === 'playing' && !isComputerKicking) {
// //       dispatch(playerKick());
// //     }
// //   };

// //   useEffect(() => {
// //     if (isComputerKicking) {
// //       const timer = setTimeout(() => {
// //         dispatch(computerKick());
// //       }, 1500);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [isComputerKicking, dispatch]);

// //   const getWinner = () => {
// //     if (playerScore > computerScore) return "Player Wins!";
// //     if (computerScore > playerScore) return "Computer Wins!";
// //     return "It's a Tie!";
// //   };

// //   return (
// //     <div className="game-container">
// //       <div className="game-header">
// //         <h1 className="game-title">PENALTY SHOOTOUT CHALLENGE</h1>
// //         <div className="stadium"></div>
// //       </div>
      
// //       <div className="scoreboard">
// //         <div className="score-card player">
// //           <div className="score-label">PLAYER</div>
// //           <div className="score-value">{playerScore}</div>
// //         </div>
        
// //         <div className="round-indicator">
// //           <div className="round-text">ROUND</div>
// //           <div className="round-number">{currentRound}<span className="total-rounds">/5</span></div>
// //         </div>
        
// //         <div className="score-card computer">
// //           <div className="score-label">COMPUTER</div>
// //           <div className="score-value">{computerScore}</div>
// //         </div>
// //       </div>

// //       <div className="game-field">
// //         <div className="stadium-background"></div>
        
// //         <div className="goal-area">
// //           <div className="goal-net"></div>
// //           <div className="goal-post left"></div>
// //           <div className="goal-post right"></div>
// //           <div className="goal-crossbar"></div>
          
// //           <div className={`goalkeeper ${isComputerKicking ? 'active' : ''}`}>
// //             <div className="goalkeeper-body"></div>
// //             <div className="goalkeeper-glove left"></div>
// //             <div className="goalkeeper-glove right"></div>
// //           </div>
// //         </div>
        
// //         <div className={`ball ${kickResult ? `kick-${kickResult}` : ''}`}></div>
        
// //         <div className="field">
// //           <div className="penalty-spot"></div>
// //           <div className="field-lines"></div>
// //         </div>
        
// //         {kickResult && (
// //           <div className={`result-overlay ${kickResult}`}>
// //             <div className="result-text">
// //               {kickResult === 'goal' ? 'GOAL!' : 'MISSED!'}
// //             </div>
// //             <div className="result-icon">
// //               {kickResult === 'goal' ? '⚽' : '❌'}
// //             </div>
// //           </div>
// //         )}
// //       </div>

// //       <div className="game-controls">
// //         {gameStatus === 'playing' ? (
// //           <button 
// //             className={`kick-button ${isComputerKicking ? 'disabled' : ''}`}
// //             onClick={handleKick}
// //             disabled={isComputerKicking}
// //           >
// //             <span className="kick-text">{isComputerKicking ? 'COMPUTER KICKING...' : 'KICK!'}</span>
// //             <div className="button-shine"></div>
// //           </button>
// //         ) : (
// //           <div className="game-over">
// //             <h2 className="winner-text">{getWinner()}</h2>
// //             <button className="reset-button" onClick={() => dispatch(resetGame())}>
// //               PLAY AGAIN
// //             </button>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Game;






























// // // // Game.js with enhanced UI elements
// // // import React, { useEffect } from 'react';
// // // import { useSelector, useDispatch } from 'react-redux';
// // // import { playerKick, computerKick, resetGame } from './actions';

// // // const Game = () => {
// // //   const { 
// // //     playerScore, 
// // //     computerScore, 
// // //     currentRound, 
// // //     gameStatus, 
// // //     kickResult,
// // //     isComputerKicking 
// // //   } = useSelector(state => state);
  
// // //   const dispatch = useDispatch();

// // //   const handleKick = () => {
// // //     if (gameStatus === 'playing' && !isComputerKicking) {
// // //       dispatch(playerKick());
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (isComputerKicking) {
// // //       const timer = setTimeout(() => {
// // //         dispatch(computerKick());
// // //       }, 2000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [isComputerKicking, dispatch]);

// // //   const getWinner = () => {
// // //     if (playerScore > computerScore) return "Player Wins!";
// // //     if (computerScore > playerScore) return "Computer Wins!";
// // //     return "It's a Tie!";
// // //   };

// // //   const getWinnerClass = () => {
// // //     if (playerScore > computerScore) return "player-win";
// // //     if (computerScore > playerScore) return "computer-win";
// // //     return "tie-game";
// // //   };

// // //   return (
// // //     <div className="game-container">
// // //       <div className="scoreboard">
// // //         <div className="score player">
// // //           <h2>Player</h2>
// // //           <div className="score-value">{playerScore}</div>
// // //         </div>
// // //         <div className="round-info">
// // //           <div>Round</div>
// // //           <div className="round-number">{currentRound}/5</div>
// // //         </div>
// // //         <div className="score computer">
// // //           <h2>Computer</h2>
// // //           <div className="score-value">{computerScore}</div>
// // //         </div>
// // //       </div>

// // //       <div className="game-field">
// // //         <div className="goal">
// // //           <div className="goal-post left"></div>
// // //           <div className="goal-net"></div>
// // //           <div className="goal-post right"></div>
// // //         </div>
        
// // //         <div className={`goalkeeper ${isComputerKicking ? 'goalkeeper-animation' : ''}`}></div>
        
// // //         <div className={`ball ${kickResult ? `kick-${kickResult}` : ''}`}></div>
        
// // //         <div className="ground">
// // //           <div className="grass"></div>
// // //           <div className="penalty-spot"></div>
// // //         </div>
// // //       </div>

// // //       <div className="controls">
// // //         {gameStatus === 'playing' ? (
// // //           <button 
// // //             className={`kick-button ${isComputerKicking ? 'disabled' : ''}`}
// // //             onClick={handleKick}
// // //             disabled={isComputerKicking}
// // //           >
// // //             {isComputerKicking ? 'Computer Kicking...' : 'KICK!'}
// // //           </button>
// // //         ) : (
// // //           <div className="game-over">
// // //             <h2 className={getWinnerClass()}>{getWinner()}</h2>
// // //             <button className="reset-button" onClick={() => dispatch(resetGame())}>
// // //               Play Again
// // //             </button>
// // //           </div>
// // //         )}
// // //       </div>
      
// // //       <div className="result-message">
// // //         {kickResult && !isComputerKicking && (
// // //           <div className={`message ${kickResult}`}>
// // //             {kickResult === 'goal' ? 'GOAL! ⚽' : 'MISSED! 😢'}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Game;





























































// // // // // Game.js
// // // // import React, { useEffect } from 'react';
// // // // import { useSelector, useDispatch } from 'react-redux';
// // // // import { playerKick, computerKick, resetGame } from './actions';

// // // // const Game = () => {
// // // //   const { 
// // // //     playerScore, 
// // // //     computerScore, 
// // // //     currentRound, 
// // // //     gameStatus, 
// // // //     kickResult,
// // // //     isComputerKicking 
// // // //   } = useSelector(state => state);
  
// // // //   const dispatch = useDispatch();

// // // //   const handleKick = () => {
// // // //     if (gameStatus === 'playing' && !isComputerKicking) {
// // // //       dispatch(playerKick());
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     if (isComputerKicking) {
// // // //       const timer = setTimeout(() => {
// // // //         dispatch(computerKick());
// // // //       }, 1500);
// // // //       return () => clearTimeout(timer);
// // // //     }
// // // //   }, [isComputerKicking, dispatch]);

// // // //   const getWinner = () => {
// // // //     if (playerScore > computerScore) return "Player Wins!";
// // // //     if (computerScore > playerScore) return "Computer Wins!";
// // // //     return "It's a Tie!";
// // // //   };

// // // //   return (
// // // //     <div className="game-container">
// // // //       <div className="scoreboard">
// // // //         <div className="score player">
// // // //           <h2>Player</h2>
// // // //           <div className="score-value">{playerScore}</div>
// // // //         </div>
// // // //         <div className="round-info">
// // // //           <div>Round: {currentRound}/5</div>
// // // //         </div>
// // // //         <div className="score computer">
// // // //           <h2>Computer</h2>
// // // //           <div className="score-value">{computerScore}</div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="game-field">
// // // //         <div className="goal">
// // // //           <div className="goal-post left"></div>
// // // //           <div className="goal-net"></div>
// // // //           <div className="goal-post right"></div>
// // // //         </div>
        
// // // //         <div className={`ball ${kickResult ? `kick-${kickResult}` : ''}`}></div>
        
// // // //         <div className="ground">
// // // //           <div className="grass"></div>
// // // //           <div className="penalty-spot"></div>
// // // //         </div>
// // // //       </div>

// // // //       <div className="controls">
// // // //         {gameStatus === 'playing' ? (
// // // //           <button 
// // // //             className={`kick-button ${isComputerKicking ? 'disabled' : ''}`}
// // // //             onClick={handleKick}
// // // //             disabled={isComputerKicking}
// // // //           >
// // // //             {isComputerKicking ? 'Computer Kicking...' : 'KICK!'}
// // // //           </button>
// // // //         ) : (
// // // //           <div className="game-over">
// // // //             <h2>{getWinner()}</h2>
// // // //             <button className="reset-button" onClick={() => dispatch(resetGame())}>
// // // //               Play Again
// // // //             </button>
// // // //           </div>
// // // //         )}
// // // //       </div>
      
// // // //       <div className="result-message">
// // // //         {kickResult && !isComputerKicking && (
// // // //           <div className={`message ${kickResult}`}>
// // // //             {kickResult === 'goal' ? 'GOAL! 🎉' : 'MISSED! 😢'}
// // // //           </div>
// // // //         )}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default Game;