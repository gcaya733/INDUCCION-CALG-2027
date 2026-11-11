import React, { useState } from 'react';
import {
  HelpCircle,
  RotateCw,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Layers,
  ArrowRight,
  Search,
  Award,
  Sparkles
} from 'lucide-react';
import { QUIZ_QUESTIONS, FLASHCARD_ITEMS } from '../data/inductionData';
import { anthemSynthPlayer } from '../utils/audioPlayer';
import { triggerSuccessConfetti, triggerGrandCelebrationConfetti } from '../utils/confetti';

interface InteractiveQuizViewProps {
  onQuizScoreUpdated?: (score: number) => void;
}

export const InteractiveQuizView: React.FC<InteractiveQuizViewProps> = ({ onQuizScoreUpdated }) => {
  const [activeSubView, setActiveSubView] = useState<'quiz' | 'flashcards'>('quiz');

  // Quiz state
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [submittedQuestions, setSubmittedQuestions] = useState<Record<string, boolean>>({});
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);

  // Flashcards state
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  const [flashcardFilter, setFlashcardFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (optIdx: number) => {
    if (submittedQuestions[currentQ.id]) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optIdx,
    }));
  };

  const handleCheckAnswer = () => {
    const selected = selectedAnswers[currentQ.id];
    if (selected === undefined) return;

    setSubmittedQuestions((prev) => ({
      ...prev,
      [currentQ.id]: true,
    }));

    const isCorrect = selected === currentQ.correctAnswer;

    if (isCorrect) {
      anthemSynthPlayer.playSuccess();
      // Disparar confeti inmediatamente en respuestas correctas
      triggerSuccessConfetti();
    } else {
      anthemSynthPlayer.playFailure();
    }

    const totalAnswered = Object.keys(submittedQuestions).length + 1;
    if (totalAnswered === QUIZ_QUESTIONS.length) {
      let correctCount = 0;
      QUIZ_QUESTIONS.forEach((q) => {
        const ans = q.id === currentQ.id ? selected : selectedAnswers[q.id];
        if (ans === q.correctAnswer) correctCount++;
      });

      const finalPercent = Math.round((correctCount / QUIZ_QUESTIONS.length) * 100);
      setQuizCompleted(true);
      if (onQuizScoreUpdated) {
        onQuizScoreUpdated(finalPercent);
      }

      if (finalPercent >= 70) {
        triggerGrandCelebrationConfetti();
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx((prev) => prev - 1);
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmittedQuestions({});
    setCurrentQuestionIdx(0);
    setQuizCompleted(false);
  };

  const toggleFlipCard = (id: string) => {
    setFlippedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  let totalCorrect = 0;
  Object.keys(submittedQuestions).forEach((qid) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === qid);
    if (q && selectedAnswers[qid] === q.correctAnswer) {
      totalCorrect++;
    }
  });

  const filteredCards = FLASHCARD_ITEMS.filter((card) => {
    const matchesSearch =
      card.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.category.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (flashcardFilter === 'all') return true;
    if (flashcardFilter === 'mastered') return masteredCards[card.id];
    if (flashcardFilter === 'learning') return !masteredCards[card.id];
    return true;
  });

  return (
    <div className="space-y-12">
      {/* Title & View Selector */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
            <span>Evaluación y Afianzamiento</span>
            <span aria-hidden="true">·</span>
            <span>Ecosistema Pedagógico SENA</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Cuestionarios Interactivos & Fichas de Aprendizaje
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Mide tus conocimientos sobre la imagen institucional, el reglamento del aprendiz y los términos técnicos con retroalimentación inmediata.
          </p>
        </div>

        {/* View Switch Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl shrink-0">
          <button
            onClick={() => setActiveSubView('quiz')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubView === 'quiz'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Cuestionario Evaluativo</span>
          </button>
          <button
            onClick={() => setActiveSubView('flashcards')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeSubView === 'flashcards'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Flashcards 3D (Términos Clave)</span>
          </button>
        </div>
      </div>

      {/* SUBVIEW 1: CUESTIONARIO EVALUATIVO */}
      {activeSubView === 'quiz' && (
        <div className="space-y-8">
          {/* Quiz Stats & Progress Bar */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 transition-colors duration-300">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Pregunta {currentQuestionIdx + 1} de {QUIZ_QUESTIONS.length}
              </span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Aciertos: <strong className="text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">{totalCorrect}</strong></span>
              <span aria-hidden="true" className="text-slate-400 dark:text-slate-600">·</span>
              <span>Respondidas: <strong className="font-mono tabular-nums text-slate-800 dark:text-slate-200">{Object.keys(submittedQuestions).length}</strong> / {QUIZ_QUESTIONS.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetQuiz}
                className="px-3 py-1.5 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <RotateCw className="w-3 h-3" />
                <span>Reiniciar Cuestionario</span>
              </button>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6 transition-colors duration-300">
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                {currentQ.context}
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options list */}
            <div className="space-y-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentQ.id] === idx;
                const isSubmitted = submittedQuestions[currentQ.id];
                const isCorrect = idx === currentQ.correctAnswer;

                let optionClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 text-slate-800 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600';
                if (isSelected && !isSubmitted) {
                  optionClass = 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/50 ring-2 ring-emerald-500 text-emerald-950 dark:text-emerald-200';
                } else if (isSubmitted) {
                  if (isCorrect) {
                    optionClass = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500 text-emerald-950 dark:text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    optionClass = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 ring-2 ring-rose-500 text-rose-950 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${optionClass}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <span className="text-sm font-medium leading-relaxed">{opt}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Alert Box */}
            {submittedQuestions[currentQ.id] && (
              <>
                {selectedAnswers[currentQ.id] === currentQ.correctAnswer ? (
                  // CASO CORRECTO: CONFETI & BANNER VERDE FESTIVO
                  <div className="p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100 shadow-md space-y-2.5 transition-all">
                    <div className="flex items-center gap-2.5 font-extrabold text-sm text-emerald-700 dark:text-emerald-400">
                      <div className="p-1 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-base">¡Excelente! Respuesta Correcta 🎉</span>
                    </div>
                    <p className="text-sm leading-relaxed text-emerald-900 dark:text-emerald-200 bg-white/70 dark:bg-emerald-900/30 p-3 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
                      {currentQ.explanation}
                    </p>
                    {currentQ.articleRef && (
                      <div className="text-xs text-emerald-800 dark:text-emerald-300 font-mono font-medium">
                        Fundamento Institucional: {currentQ.articleRef}
                      </div>
                    )}
                  </div>
                ) : (
                  // CASO ERROR: ALERTA EN ROJO INTENSO CON REINTENTO
                  <div className="p-5 rounded-2xl border-2 border-red-500 bg-red-50 dark:bg-red-950/80 text-red-950 dark:text-red-100 shadow-lg space-y-3 transition-all animate-pulse-once">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200 dark:border-red-900/60 pb-3">
                      <div className="flex items-center gap-2.5 font-black text-sm text-red-700 dark:text-red-400">
                        <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <span className="text-base tracking-tight uppercase">⚠️ ¡ALERTA! Respuesta Incorrecta</span>
                      </div>
                      <button
                        onClick={() => {
                          setSubmittedQuestions((prev) => {
                            const next = { ...prev };
                            delete next[currentQ.id];
                            return next;
                          });
                        }}
                        className="self-start sm:self-center px-3 py-1 text-xs font-bold text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-800 border border-red-300 dark:border-red-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Reintentar Pregunta
                      </button>
                    </div>

                    <div className="text-xs text-red-800 dark:text-red-300">
                      Tu selección fue la opción <strong>{String.fromCharCode(65 + selectedAnswers[currentQ.id])}</strong>: &ldquo;{currentQ.options[selectedAnswers[currentQ.id]]}&rdquo;
                    </div>

                    <div className="text-sm leading-relaxed text-red-900 dark:text-red-100 bg-white/80 dark:bg-red-900/40 p-3.5 rounded-xl border border-red-200 dark:border-red-800">
                      <strong className="block text-xs uppercase font-extrabold text-red-800 dark:text-red-300 mb-1">
                        Explicación y Corrección Normativa:
                      </strong>
                      {currentQ.explanation}
                    </div>

                    {currentQ.articleRef && (
                      <div className="text-xs text-red-700 dark:text-red-400 font-mono font-semibold">
                        Referencia Normativa: {currentQ.articleRef}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}

            {/* Bottom Controls */}
            <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuestionIdx === 0}
                className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Anterior
              </button>

              {!submittedQuestions[currentQ.id] ? (
                <button
                  onClick={handleCheckAnswer}
                  disabled={selectedAnswers[currentQ.id] === undefined}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm rounded-lg"
                >
                  Confirmar Respuesta
                </button>
              ) : currentQuestionIdx < QUIZ_QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm rounded-lg"
                >
                  <span>Siguiente Pregunta</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setQuizCompleted(true)}
                  className="px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm rounded-lg"
                >
                  Ver Resultados Finales
                </button>
              )}
            </div>
          </div>

          {/* Quiz Completion Banner */}
          {quizCompleted && (
            <div className="p-6 md:p-8 rounded-2xl bg-emerald-900 dark:bg-emerald-950 text-white shadow-md space-y-4 border border-emerald-800">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase tracking-wider">
                <Award className="w-5 h-5 text-emerald-400" />
                <span>Evaluación Finalizada</span>
              </div>
              <h3 className="text-2xl font-bold">
                Puntaje Obtenido: {Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100)}%
              </h3>
              <p className="text-sm text-emerald-100 max-w-xl leading-relaxed">
                {Math.round((totalCorrect / QUIZ_QUESTIONS.length) * 100) >= 70
                  ? '¡Felicitaciones! Has demostrado una sólida apropiación del Reglamento del Aprendiz y la Identidad Institucional del SENA. Tu resultado queda registrado en tu ruta de inducción.'
                  : 'Has completado el cuestionario, pero no alcanzaste el umbral del 70%. Te recomendamos repasar los capítulos de deberes, derechos y el debido proceso antes de reintentar.'}
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="px-4 py-2 text-xs font-bold bg-white text-emerald-950 rounded-lg hover:bg-emerald-50 transition-colors cursor-pointer shadow-sm"
                >
                  Presentar Nuevamente
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* SUBVIEW 2: FLASHCARDS 3D */}
      {activeSubView === 'flashcards' && (
        <div className="space-y-6">
          {/* Controls: Search and Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar término o sigla..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
              />
            </div>

            <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full sm:w-auto">
              <button
                onClick={() => setFlashcardFilter('all')}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  flashcardFilter === 'all'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Todas ({FLASHCARD_ITEMS.length})
              </button>
              <button
                onClick={() => setFlashcardFilter('learning')}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  flashcardFilter === 'learning'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Por Aprender ({FLASHCARD_ITEMS.length - Object.values(masteredCards).filter(Boolean).length})
              </button>
              <button
                onClick={() => setFlashcardFilter('mastered')}
                className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  flashcardFilter === 'mastered'
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                Aprendidas ({Object.values(masteredCards).filter(Boolean).length})
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Haz clic en cualquier tarjeta para voltearla en 3D y consultar su significado y aplicación real.
          </div>

          {/* Flashcards Grid with 3D Flip */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredCards.map((card) => {
              const isFlipped = flippedCards[card.id];
              const isMastered = masteredCards[card.id];

              return (
                <div
                  key={card.id}
                  onClick={() => toggleFlipCard(card.id)}
                  className="h-80 perspective-1000 cursor-pointer group"
                >
                  <div
                    className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${
                      isFlipped ? 'rotate-y-180' : ''
                    }`}
                  >
                    {/* Front Side */}
                    <div className="absolute inset-0 backface-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-shadow">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                            {card.category}
                          </span>
                          <button
                            onClick={(e) => toggleMastered(card.id, e)}
                            className={`p-1.5 rounded-full border transition-colors ${
                              isMastered
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-700 text-slate-400 hover:text-emerald-600'
                            }`}
                            title={isMastered ? 'Aprendida' : 'Marcar como aprendida'}
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{card.term}</h3>
                        {card.acronymFor && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">
                            "{card.acronymFor}"
                          </p>
                        )}
                        <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {card.definition}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                        <span>Girar tarjeta</span>
                        <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                      </div>
                    </div>

                    {/* Back Side */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 bg-slate-900 dark:bg-slate-950 text-white border border-slate-800 dark:border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-md">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
                            {card.term} · Detalle
                          </span>
                          <span className="text-xs text-slate-400 font-mono">Volver</span>
                        </div>
                        <div className="space-y-1">
                          <span className="text-xs font-semibold text-slate-300">Punto Clave:</span>
                          <p className="text-xs text-slate-100 leading-relaxed font-medium">
                            {card.keyTakeaway}
                          </p>
                        </div>
                        <div className="space-y-1 bg-white/10 dark:bg-white/5 p-2.5 rounded-xl border border-white/5">
                          <span className="text-xs font-semibold text-emerald-300">Ejemplo Real:</span>
                          <p className="text-xs text-slate-200 leading-relaxed">
                            {card.example}
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
                        <span>Haz clic para voltear</span>
                        <RotateCw className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
