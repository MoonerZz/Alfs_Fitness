const audioCtx = (typeof window !== 'undefined') && (window.AudioContext || (window as any).webkitAudioContext) ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;
const synth = (typeof window !== 'undefined') ? window.speechSynthesis : null;

/**
 * Plays a simple beep sound using the Web Audio API.
 * @param {number} pitch - The frequency of the beep (e.g., 880).
 * @param {number} duration - The duration in milliseconds (e.g., 100).
 */
export function playBeep(pitch: number = 880, duration: number = 100) {
  if (!audioCtx) return;
  try {
    const oscillator = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    
    oscillator.connect(gain);
    gain.connect(audioCtx.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
    
    oscillator.start(audioCtx.currentTime);
    oscillator.stop(audioCtx.currentTime + (duration / 1000));
  } catch (error)
 {
    console.error("Audio error:", error);
  }
}

/**
 * Speaks a given text using the Web Speech API.
 * @param {string} text - The text to be spoken.
 */
export function speak(text: string) {
  if (synth && text) {
    try {
      // Cancel any previous speech to prevent overlap
      synth.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      synth.speak(utterance);
    } catch (error) {
      console.error("Speech error:", error);
    }
  }
}
