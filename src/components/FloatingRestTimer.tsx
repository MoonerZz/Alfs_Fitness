import React, { useState, useEffect, useCallback } from 'react';
import { Timer, ChevronDown } from './Icons';
import { playBeep, speak } from '../utils/audio';

const FloatingRestTimer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [seconds, setSeconds] = useState(90);
  const [isRunning, setIsRunning] = useState(false);
  const [timerId, setTimerId] = useState<number | null>(null);
  const [showCountdown, setShowCountdown] = useState<number | null>(null);

  const startTimer = useCallback((duration: number) => {
    if (timerId) clearInterval(timerId);
    setSeconds(duration);
    setIsRunning(true);
    
    const id = setInterval(() => {
      setSeconds((prev) => {
        const nextSecond = prev - 1;

        if (nextSecond === 3) {
          setShowCountdown(3);
          playBeep(880, 100);
        } else if (nextSecond === 2) {
          setShowCountdown(2);
          playBeep(880, 100);
        } else if (nextSecond === 1) {
          setShowCountdown(1);
          playBeep(880, 100);
        } else if (nextSecond === 0) {
          clearInterval(id);
          setIsRunning(false);
          setTimerId(null);
          setShowCountdown(null);
          speak("Your rest is up - Get after it Alfie");
          playBeep(1200, 200);
          setIsOpen(false);
          return 90;
        } else if (nextSecond > 3) {
          setShowCountdown(null);
        }
        
        if (nextSecond < 0) {
          clearInterval(id);
          setIsRunning(false);
          setTimerId(null);
          return 90;
        }

        return nextSecond;
      });
    }, 1000);
    setTimerId(id);
  }, [timerId]);

  const stopTimer = useCallback(() => {
    if (timerId) clearInterval(timerId);
    setIsRunning(false);
    setTimerId(null);
    setShowCountdown(null);
  }, [timerId]);
  
  const resetTimer = (duration: number) => {
    stopTimer();
    setSeconds(duration);
  };
  
  useEffect(() => {
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [timerId]);

  const formatTime = () => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 bg-blue-500 hover:bg-blue-600 text-white rounded-full p-4 shadow-lg z-40 transition-transform active:scale-95"
        aria-label="Open Rest Timer"
      >
        <Timer size={28} />
      </button>
    );
  }

  if (showCountdown) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 pointer-events-none">
        <h1 key={showCountdown} className="text-[20rem] font-bold text-white"
            style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) forwards' }}>
          {showCountdown}
        </h1>
      </div>
    );
  }
  
  return (
    <div className="fixed bottom-24 right-6 bg-slate-800 p-6 rounded-2xl shadow-2xl w-80 text-center space-y-4 z-40">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white">Rest Timer</h2>
        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white" aria-label="Minimize Timer">
          <ChevronDown size={24} />
        </button>
      </div>
      
      <div className="text-7xl font-bold text-blue-400 my-4">
        {formatTime()}
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => resetTimer(60)} className="bg-slate-700 text-white p-2 rounded-lg">60s</button>
        <button onClick={() => resetTimer(90)} className="bg-slate-700 text-white p-2 rounded-lg">90s</button>
        <button onClick={() => resetTimer(120)} className="bg-slate-700 text-white p-2 rounded-lg">120s</button>
      </div>
      
      {isRunning ? (
        <button
          onClick={stopTimer}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg"
        >
          Stop
        </button>
      ) : (
        <button
          onClick={() => startTimer(seconds)}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg"
        >
          Start
        </button>
      )}
    </div>
  );
}

export default FloatingRestTimer;
