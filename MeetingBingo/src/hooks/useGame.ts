import { useState, useCallback } from 'react';
import type { GameState, CategoryId, BingoCard } from '../types';
import { generateCard } from '../lib/cardGenerator';
import { getCategoryById } from '../data/categories';
import { checkForBingo, countFilled } from '../lib/bingoChecker';
import { detectWords } from '../lib/wordDetector';

const initialState: GameState = {
  status: 'idle',
  category: null,
  card: null,
  isListening: false,
  startedAt: null,
  completedAt: null,
  winningLine: null,
  winningWord: null,
  filledCount: 1, // free space
};

export function useGame() {
  const [state, setState] = useState<GameState>(initialState);

  const startSetup = useCallback(() => {
    setState((prev) => ({ ...prev, status: 'setup' }));
  }, []);

  const selectCategory = useCallback((categoryId: CategoryId) => {
    const category = getCategoryById(categoryId);
    if (!category) return;

    const card = generateCard(category.words);
    setState({
      status: 'playing',
      category: categoryId,
      card,
      isListening: false,
      startedAt: Date.now(),
      completedAt: null,
      winningLine: null,
      winningWord: null,
      filledCount: countFilled(card),
    });
  }, []);

  const toggleSquare = useCallback((row: number, col: number) => {
    setState((prev) => {
      if (!prev.card || prev.status !== 'playing') return prev;
      const square = prev.card.squares[row][col];
      if (square.isFreeSpace) return prev;

      const newSquares = prev.card.squares.map((r) => r.map((s) => ({ ...s })));
      const target = newSquares[row][col];
      target.isFilled = !target.isFilled;
      target.isAutoFilled = false;
      target.filledAt = target.isFilled ? Date.now() : null;

      const newCard: BingoCard = { ...prev.card, squares: newSquares };
      const winningLine = checkForBingo(newCard);

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
        winningLine,
        status: winningLine ? 'won' : prev.status,
        completedAt: winningLine ? Date.now() : null,
        winningWord: winningLine ? target.word : null,
      };
    });
  }, []);

  const processTranscript = useCallback((text: string) => {
    setState((prev) => {
      if (!prev.card || prev.status !== 'playing') return prev;

      const allWords = prev.card.squares.flat().map((s) => s.word);
      const detected = detectWords(text, allWords);
      if (detected.length === 0) return prev;

      const newSquares = prev.card.squares.map((r) => r.map((s) => ({ ...s })));
      let changed = false;

      for (const word of detected) {
        for (const row of newSquares) {
          for (const square of row) {
            if (square.word === word && !square.isFilled) {
              square.isFilled = true;
              square.isAutoFilled = true;
              square.filledAt = Date.now();
              changed = true;
            }
          }
        }
      }

      if (!changed) return prev;

      const newCard: BingoCard = { ...prev.card, squares: newSquares };
      const winningLine = checkForBingo(newCard);

      return {
        ...prev,
        card: newCard,
        filledCount: countFilled(newCard),
        winningLine,
        status: winningLine ? 'won' : prev.status,
        completedAt: winningLine ? Date.now() : null,
        winningWord: winningLine ? detected[detected.length - 1] : null,
      };
    });
  }, []);

  const setListening = useCallback((listening: boolean) => {
    setState((prev) => ({ ...prev, isListening: listening }));
  }, []);

  const newGame = useCallback(() => {
    setState(initialState);
  }, []);

  const newCard = useCallback(() => {
    setState((prev) => {
      if (!prev.category) return prev;
      const category = getCategoryById(prev.category);
      if (!category) return prev;
      const card = generateCard(category.words);
      return {
        ...prev,
        card,
        winningLine: null,
        winningWord: null,
        completedAt: null,
        status: 'playing',
        filledCount: countFilled(card),
        startedAt: Date.now(),
      };
    });
  }, []);

  return {
    state,
    startSetup,
    selectCategory,
    toggleSquare,
    processTranscript,
    setListening,
    newGame,
    newCard,
  };
}
