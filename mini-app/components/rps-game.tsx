'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const moves = ['Rock', 'Paper', 'Scissors'] as const;
type Move = typeof moves[number];

const moveMap = {
  R: 'Rock',
  P: 'Paper',
  S: 'Scissors',
};

export default function RpsGame() {
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [round, setRound] = useState(1);
  const [lastComputerMove, setLastComputerMove] = useState<Move | null>(null);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  const determineWinner = (player: Move, computer: Move) => {
    if (player === computer) return 'draw';
    if (
      (player === 'Rock' && computer === 'Scissors') ||
      (player === 'Paper' && computer === 'Rock') ||
      (player === 'Scissors' && computer === 'Paper')
    ) {
      return 'player';
    }
    return 'computer';
  };

  const playRound = (playerLetter: keyof typeof moveMap) => {
    if (gameOver) return;
    const playerMove = moveMap[playerLetter];
    let computerMove: Move;
    do {
      computerMove = moves[Math.floor(Math.random() * moves.length)];
    } while (computerMove === lastComputerMove);
    setLastComputerMove(computerMove);

    const winner = determineWinner(playerMove, computerMove);
    let roundMessage = `${playerMove} vs ${computerMove}. `;
    if (winner === 'draw') {
      roundMessage += "It's a tie!";
    } else if (winner === 'player') {
      roundMessage += `${playerMove} beats ${computerMove}!`;
      setPlayerScore((s) => s + 1);
    } else {
      roundMessage += `${computerMove} beats ${playerMove}!`;
      setComputerScore((s) => s + 1);
    }
    setMessage(roundMessage);

    if (playerScore + 1 === 3 || computerScore + 1 === 3) {
      setGameOver(true);
    } else {
      setRound((r) => r + 1);
    }
  };

  const restart = () => {
    setPlayerScore(0);
    setComputerScore(0);
    setRound(1);
    setLastComputerMove(null);
    setMessage('');
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 mt-6">
      <div className="text-xl font-semibold">
        Round {round} – {playerScore} : {computerScore}
      </div>
      <div className="flex gap-2">
        <Button onClick={() => playRound('R')}>Rock (R)</Button>
        <Button onClick={() => playRound('P')}>Paper (P)</Button>
        <Button onClick={() => playRound('S')}>Scissors (S)</Button>
      </div>
      {message && <p className="text-center">{message}</p>}
      {gameOver && (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            {playerScore === 3 ? 'You win!' : 'Computer wins!'}
          </p>
          <Button variant="outline" onClick={restart}>
            New Series
          </Button>
        </div>
      )}
    </div>
  );
}
