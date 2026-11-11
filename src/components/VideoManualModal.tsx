import React, { useEffect, useRef } from 'react';
import { X, Video, Play, BookOpen, ShieldCheck, Award, Sparkles } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface VideoManualModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VideoManualModal: React.FC<VideoManualModalProps> = ({ isOpen, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause video and listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 transition-all animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="relative bg-slate-900 border border-slate-700/80 rounded-3xl max-w-5xl w-full shadow-2xl overflow-hidden my-4 text-slate-100 ring-1 ring-white/10">
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-5 sm:px-7 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center p-1.5 shadow-sm text-emerald-400">
              <Video className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Video Manual de la Plataforma
                </h3>
                <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/60">
                  <Sparkles className="w-3 h-3" />
                  Oficial SENA
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manual de Usuario y Funcionamiento del Entorno Digital Gamificado
              </p>
            </div>
          </div>

          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
            title="Cerrar ventana (Esc)"
            aria-label="Cerrar video manual"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Section */}
        <div className="p-4 sm:p-6 bg-black/60">
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
            <video
              ref={videoRef}
              src="/assets/aistudio/2026__17_17_e5b734a5.mp4"
              controls
              autoPlay
              playsInline
              preload="metadata"
              className="w-full h-full object-contain"
            >
              Tu navegador no soporta la reproducción de video HTML5.
            </video>
          </div>
        </div>

        {/* Informative Footer & Quick Chapters */}
        <div className="px-5 sm:px-7 py-4 bg-slate-900/95 border-t border-slate-800 text-xs text-slate-400 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2 text-slate-300">
            <div className="flex items-center gap-2 font-semibold text-emerald-400">
              <SenaLogo className="w-4 h-4" fill="currentColor" />
              <span>Contenido del Video Manual:</span>
            </div>
            <span className="text-[11px] text-slate-500">
              Resolución HD · Duración completa · Controles interactivos
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1 text-[11px]">
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-0.5">
              <span className="font-bold text-slate-200 block">1. Ecosistema Dual</span>
              <p className="text-slate-400 text-[10px] leading-snug">
                Acceso de Aprendices (caracterización) e Instructor (supervisión unificada).
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-0.5">
              <span className="font-bold text-slate-200 block">2. Acuerdos 009 & 002</span>
              <p className="text-slate-400 text-[10px] leading-snug">
                Derechos, deberes, prohibiciones, tipificación de faltas y debido proceso (Art. 48).
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-0.5">
              <span className="font-bold text-slate-200 block">3. Gamificación</span>
              <p className="text-slate-400 text-[10px] leading-snug">
                Simulador de dilemas éticos, confeti en aciertos y alertas rojas con reintento.
              </p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/50 space-y-0.5">
              <span className="font-bold text-slate-200 block">4. Certificado PDF</span>
              <p className="text-slate-400 text-[10px] leading-snug">
                Generación local con jsPDF, porcentaje de progreso obtenido y firmas de centro.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
