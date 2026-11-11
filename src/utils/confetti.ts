import confetti from 'canvas-confetti';

/**
 * Dispara confeti con la paleta de colores institucional del SENA
 * para celebrar respuestas correctas.
 */
export const triggerSuccessConfetti = () => {
  try {
    // Ráfaga central
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#39a900', '#22c55e', '#16a34a', '#eab308', '#ffffff'],
      ticks: 200,
      gravity: 1.2,
      scalar: 1.1,
    });

    // Pequeño eco lateral festivo
    setTimeout(() => {
      confetti({
        particleCount: 30,
        angle: 60,
        spread: 50,
        origin: { x: 0.1, y: 0.7 },
        colors: ['#39a900', '#22c55e', '#eab308'],
      });
      confetti({
        particleCount: 30,
        angle: 120,
        spread: 50,
        origin: { x: 0.9, y: 0.7 },
        colors: ['#39a900', '#22c55e', '#eab308'],
      });
    }, 120);
  } catch (err) {
    console.warn('No se pudo ejecutar confetti en este entorno:', err);
  }
};

/**
 * Gran celebración de confeti para finalización de cuestionario o entrega de certificado
 */
export const triggerGrandCelebrationConfetti = () => {
  try {
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#39a900', '#22c55e', '#eab308', '#ffffff'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#39a900', '#22c55e', '#eab308', '#ffffff'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  } catch (err) {
    console.warn('No se pudo ejecutar grand celebration confetti:', err);
  }
};
