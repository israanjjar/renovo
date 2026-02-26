import { useState, useEffect, useRef, useCallback } from 'react';
import type { SpeechRecognitionState } from '../types';

interface SpeechRecognitionEvent {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionInstance;
    webkitSpeechRecognition?: new () => SpeechRecognitionInstance;
  }
}

function getSpeechRecognition(): (new () => SpeechRecognitionInstance) | null {
  return window.SpeechRecognition ?? window.webkitSpeechRecognition ?? null;
}

export function useSpeechRecognition(onTranscript: (text: string) => void) {
  const [state, setState] = useState<SpeechRecognitionState>({
    isSupported: typeof window !== 'undefined' && getSpeechRecognition() !== null,
    isListening: false,
    transcript: '',
    interimTranscript: '',
    error: null,
  });

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const shouldListenRef = useRef(false);
  const onTranscriptRef = useRef(onTranscript);
  onTranscriptRef.current = onTranscript;

  const startListening = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) return;

    shouldListenRef.current = true;

    if (recognitionRef.current) {
      recognitionRef.current.abort();
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          final += result[0].transcript + ' ';
        } else {
          interim += result[0].transcript;
        }
      }

      if (final) {
        setState((prev) => ({
          ...prev,
          transcript: prev.transcript + final,
          interimTranscript: interim,
        }));
        onTranscriptRef.current(final);
      } else {
        setState((prev) => ({ ...prev, interimTranscript: interim }));
      }
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      if (event.error === 'aborted') return;
      setState((prev) => ({ ...prev, error: event.error }));
    };

    recognition.onend = () => {
      if (shouldListenRef.current) {
        try {
          recognition.start();
        } catch {
          // Already started, ignore
        }
      } else {
        setState((prev) => ({ ...prev, isListening: false }));
      }
    };

    try {
      recognition.start();
      recognitionRef.current = recognition;
      setState((prev) => ({ ...prev, isListening: true, error: null }));
    } catch {
      setState((prev) => ({ ...prev, error: 'Failed to start speech recognition' }));
    }
  }, []);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false;
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      recognitionRef.current = null;
    }
    setState((prev) => ({ ...prev, isListening: false }));
  }, []);

  const resetTranscript = useCallback(() => {
    setState((prev) => ({ ...prev, transcript: '', interimTranscript: '' }));
  }, []);

  useEffect(() => {
    return () => {
      shouldListenRef.current = false;
      recognitionRef.current?.abort();
    };
  }, []);

  return { ...state, startListening, stopListening, resetTranscript };
}
