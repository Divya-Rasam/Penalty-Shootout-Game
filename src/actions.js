// actions.js
export const PLAYER_KICK = 'PLAYER_KICK';
export const COMPUTER_KICK = 'COMPUTER_KICK';
export const RESET_GAME = 'RESET_GAME';

export const playerKick = () => ({
  type: PLAYER_KICK
});

export const computerKick = () => ({
  type: COMPUTER_KICK
});

export const resetGame = () => ({
  type: RESET_GAME
});