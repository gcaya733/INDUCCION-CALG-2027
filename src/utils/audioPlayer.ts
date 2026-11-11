/**
 * Reproductor de melodía del Himno del SENA con la Web Audio API nativa.
 * Garantiza reproducción sin depender de enlaces externos que puedan caducar.
 */

class AnthemSynthPlayer {
  private audioCtx: AudioContext | null = null;
  private isPlaying = false;
  private currentNoteIndex = 0;
  private timerId: number | null = null;
  private onVerseChangeCallback: ((verseIndex: number) => void) | null = null;

  // Secuencia melódica inspirada en la fanfarria y compás del Himno Nacional / Himno del SENA
  private readonly melodyNotes = [
    { freq: 261.63, dur: 0.35, verse: 0 }, // C4
    { freq: 329.63, dur: 0.35, verse: 0 }, // E4
    { freq: 392.00, dur: 0.50, verse: 0 }, // G4
    { freq: 523.25, dur: 0.70, verse: 0 }, // C5
    { freq: 493.88, dur: 0.35, verse: 0 }, // B4
    { freq: 440.00, dur: 0.35, verse: 0 }, // A4
    { freq: 392.00, dur: 0.70, verse: 0 }, // G4

    { freq: 349.23, dur: 0.35, verse: 1 }, // F4
    { freq: 392.00, dur: 0.35, verse: 1 }, // G4
    { freq: 440.00, dur: 0.50, verse: 1 }, // A4
    { freq: 392.00, dur: 0.35, verse: 1 }, // G4
    { freq: 349.23, dur: 0.35, verse: 1 }, // F4
    { freq: 329.63, dur: 0.70, verse: 1 }, // E4

    { freq: 293.66, dur: 0.35, verse: 2 }, // D4
    { freq: 329.63, dur: 0.35, verse: 2 }, // E4
    { freq: 349.23, dur: 0.50, verse: 2 }, // F4
    { freq: 392.00, dur: 0.70, verse: 2 }, // G4
    { freq: 329.63, dur: 0.35, verse: 2 }, // E4
    { freq: 261.63, dur: 0.90, verse: 2 }, // C4
  ];

  public init() {
    if (!this.audioCtx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioContextClass();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  public setOnVerseChange(cb: (verseIndex: number) => void) {
    this.onVerseChangeCallback = cb;
  }

  public play(onFinish?: () => void) {
    this.init();
    if (!this.audioCtx) return;

    this.isPlaying = true;
    this.currentNoteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || !this.audioCtx) return;

      if (this.currentNoteIndex >= this.melodyNotes.length) {
        this.currentNoteIndex = 0; // loop or finish
        if (onFinish) {
          this.stop();
          onFinish();
          return;
        }
      }

      const note = this.melodyNotes[this.currentNoteIndex];
      if (this.onVerseChangeCallback) {
        this.onVerseChangeCallback(note.verse);
      }

      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.dur);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + note.dur + 0.02);

      this.currentNoteIndex++;
      this.timerId = window.setTimeout(playNext, note.dur * 1000);
    };

    playNext();
  }

  public stop() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      window.clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.currentNoteIndex = 0;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public playTone(frequency: number, type: OscillatorType = 'sine', duration = 0.2) {
    this.init();
    if (!this.audioCtx) return;

    const now = this.audioCtx.currentTime;
    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  public playSuccess() {
    this.playTone(523.25, 'sine', 0.15); // C5
    setTimeout(() => this.playTone(659.25, 'sine', 0.25), 120); // E5
  }

  public playFailure() {
    this.playTone(220, 'sawtooth', 0.2);
  }
}

export const anthemSynthPlayer = new AnthemSynthPlayer();
