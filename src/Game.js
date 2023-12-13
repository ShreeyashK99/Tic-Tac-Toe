import React, { useState } from 'react';
import './Game.css';

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameActive, setGameActive] = useState(true);

  const handleClick = (index) => {
    if (!gameActive || board[index]) return;

    const newBoard = board.slice();
    newBoard[index] = currentPlayer;

    setBoard(newBoard);

    if (checkWin(currentPlayer, newBoard)) {
      setGameActive(false);
      alert(`Player ${currentPlayer} wins!`);
    } else if (newBoard.every(cell => cell !== null)) {
      setGameActive(false);
      alert('Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const checkWin = (playerSymbol, currentBoard) => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    return winPatterns.some(pattern => pattern.every(index => currentBoard[index] === playerSymbol));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameActive(true);
  };

  return (
    <div className="game-container">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        {board.map((cell, index) => (
          <button key={index} className="cell" onClick={() => handleClick(index)}>
            {cell}
          </button>
        ))}
      </div>
      {!gameActive && <button onClick={resetGame}>Restart Game</button>}
    </div>
  );
};

export default Game;
