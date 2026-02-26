import { LandingPage } from './components/LandingPage';
import { CategorySelect } from './components/CategorySelect';
import { GameBoard } from './components/GameBoard';
import { WinScreen } from './components/WinScreen';
import { useGame } from './hooks/useGame';

export default function App() {
  const {
    state,
    startSetup,
    selectCategory,
    toggleSquare,
    processTranscript,
    setListening,
    newGame,
    newCard,
  } = useGame();

  if (state.status === 'idle') {
    return <LandingPage onStart={startSetup} />;
  }

  if (state.status === 'setup') {
    return <CategorySelect onSelect={selectCategory} onBack={newGame} />;
  }

  if (state.status === 'won' && state.card && state.category && state.winningLine) {
    return (
      <WinScreen
        card={state.card}
        category={state.category}
        winningLine={state.winningLine}
        winningWord={state.winningWord}
        startedAt={state.startedAt}
        completedAt={state.completedAt}
        filledCount={state.filledCount}
        onPlayAgain={newCard}
        onNewGame={newGame}
      />
    );
  }

  if (state.status === 'playing' && state.card && state.category) {
    return (
      <GameBoard
        card={state.card}
        category={state.category}
        winningLine={state.winningLine}
        filledCount={state.filledCount}
        onSquareClick={toggleSquare}
        onNewCard={newCard}
        onQuit={newGame}
        onTranscript={processTranscript}
        onListeningChange={setListening}
      />
    );
  }

  return null;
}
