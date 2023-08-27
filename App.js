import React, { useState, useEffect } from 'react';
import './App.css';

const words = ['hangman', 'apple', 'banana', 'computer', 'javascript', 'programming'];
const maxAttempts = 6;

const App = () => {
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState('');
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [remainingAttempts, setRemainingAttempts] = useState(maxAttempts);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setWord(randomWord);
    setDisplayWord('_'.repeat(randomWord.length));
    setGuessedLetters([]);
    setRemainingAttempts(maxAttempts);
    setGameOver(false);
    setMessage('');
  };

  const handleLetterClick = (letter) => {
    if (!gameOver && !guessedLetters.includes(letter)) {
      const newGuessedLetters = [...guessedLetters, letter];
      setGuessedLetters(newGuessedLetters);

      if (word.includes(letter)) {
        const newDisplayWord = word
          .split('')
          .map((char) => (newGuessedLetters.includes(char) ? char : '_'))
          .join('');
        setDisplayWord(newDisplayWord);

        if (newDisplayWord === word) {
          setGameOver(true);
          setMessage('Congratulations! You guessed the word.');
        }
      } else {
        setRemainingAttempts(remainingAttempts - 1);

        if (remainingAttempts - 1 === 0) {
          setGameOver(true);
          setMessage(`Game Over! The word was "${word}".`);
        }
      }
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Hangman Game</h1>
      </header>
      <main>
        <div className="hangman">
          <div className={`hangman__attempts hangman__attempts-${remainingAttempts}`} />
          <div className="hangman__display">{displayWord}</div>
          {gameOver && <button onClick={startNewGame}>Play Again</button>}
        </div>
        <div className="alphabet">
          {Array.from({ length: 26 }, (_, index) => String.fromCharCode(97 + index)).map((letter) => (
            <span
              key={letter}
              className={`alphabet__letter ${guessedLetters.includes(letter) ? 'guessed' : ''}`}
              onClick={() => handleLetterClick(letter)}
            >
              {letter}
            </span>
          ))}
        </div>
        <p>{message}</p>
      </main>
    </div>
  );
};

export default App;
