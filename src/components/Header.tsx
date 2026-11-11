import React from 'react';
import { Award, UserCheck, Users, Sun, Moon, ArrowLeftRight, LogOut, Video } from 'lucide-react';
import { SenaLogo } from './SenaLogo';

interface HeaderProps {
  activeTab: 'ruta' | 'identidad' | 'normativa' | 'evaluaciones' | 'instructor';
  setActiveTab: (tab: 'ruta' | 'identidad' | 'normativa' | 'evaluaciones' | 'instructor') => void;
  progressPercent: number;
  isInstructorMode: boolean;
  setIsInstructorMode: (val: boolean) => void;
  onOpenCertificate: () => void;
  onOpenVideoManual: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onReturnToLanding: () => void;
  currentApprenticeName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  progressPercent,
  isInstructorMode,
  setIsInstructorMode,
  onOpenCertificate,
  onOpenVideoManual,
  darkMode,
  onToggleDarkMode,
  onReturnToLanding,
  currentApprenticeName,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Top Bar Contract: 3 zones separated by gap-8 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark with official SENA logo */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onReturnToLanding}
              className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-1.5 shadow-2xs hover:scale-105 transition-transform cursor-pointer"
              title="Volver a la selección de rol"
            >
              <SenaLogo className="w-full h-full text-emerald-600 dark:text-emerald-400" fill="currentColor" />
            </button>
            <div className="flex flex-col">
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault();
                  if (isInstructorMode) setActiveTab('instructor');
                  else setActiveTab('ruta');
                }}
                className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap shrink-0 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors"
              >
                SENA · Inducción
              </a>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 hidden sm:block">
                {isInstructorMode ? 'Portal del Instructor Líder' : 'Portal del Aprendiz'}
              </span>
            </div>
          </div>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300">
            {!isInstructorMode ? (
              <>
                <button
                  onClick={() => setActiveTab('ruta')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'ruta'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Ruta Formativa
                </button>
                <button
                  onClick={() => setActiveTab('identidad')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'identidad'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Identidad & Símbolos
                </button>
                <button
                  onClick={() => setActiveTab('normativa')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'normativa'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Reglamento & Casos
                </button>
                <button
                  onClick={() => setActiveTab('evaluaciones')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'evaluaciones'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Evaluaciones & Flashcards
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setActiveTab('instructor')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'instructor'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Cohorte & Seguimiento Ficha
                </button>
                <button
                  onClick={() => setActiveTab('normativa')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'normativa'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Reglamento del Aprendiz
                </button>
                <button
                  onClick={() => setActiveTab('identidad')}
                  className={`hover:text-slate-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 pb-1 cursor-pointer ${
                    activeTab === 'identidad'
                      ? 'text-emerald-700 dark:text-emerald-400 font-semibold border-b-2 border-emerald-600 dark:border-emerald-400'
                      : ''
                  }`}
                >
                  Símbolos & Misión
                </button>
              </>
            )}
          </nav>

          {/* Zone 3: Primary Action + Role Change + Dark Mode */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Video Manual Button */}
            <button
              onClick={onOpenVideoManual}
              className="px-3 py-2 text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700/60 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-2xs flex items-center gap-1.5 cursor-pointer"
              title="Ver video manual explicativo de la plataforma"
            >
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden sm:inline">Video Manual</span>
            </button>

            {!isInstructorMode && (
              <button
                onClick={onOpenCertificate}
                className="px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span className="hidden sm:inline">Certificado Oficial</span>
              </button>
            )}

            {/* Change Role / Return to Landing button */}
            <button
              onClick={onReturnToLanding}
              className="px-2.5 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Cambiar de rol o seleccionar otro aprendiz"
            >
              <ArrowLeftRight className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="hidden md:inline">Cambiar Rol</span>
            </button>

            {/* Dark Mode Toggle Button */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors cursor-pointer shrink-0 shadow-2xs"
              title={darkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Sub-bar contextual: Active user details & progress */}
      <div className="bg-slate-100/90 dark:bg-slate-800/90 border-t border-slate-200/80 dark:border-slate-700/80 px-4 sm:px-6 lg:px-8 py-2 transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              {isInstructorMode ? 'Instructor Líder: Ing. Ricardo Méndez C.' : `Aprendiz: ${currentApprenticeName}`}
            </span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">·</span>
            <span className="font-mono tabular-nums text-slate-600 dark:text-slate-400">Ficha 2874912</span>
            <span aria-hidden="true" className="text-slate-400 dark:text-slate-500">·</span>
            <span className="text-slate-600 dark:text-slate-400">Regional Valle / CGTS</span>
          </div>

          <div className="flex items-center gap-4">
            {!isInstructorMode && (
              <div className="flex items-center gap-2">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Avance Inducción:</span>
                <div className="w-28 bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="font-mono tabular-nums font-bold text-emerald-800 dark:text-emerald-400">{progressPercent}%</span>
              </div>
            )}

            <button
              onClick={() => {
                const nextMode = !isInstructorMode;
                setIsInstructorMode(nextMode);
                if (nextMode) setActiveTab('instructor');
                else setActiveTab('ruta');
              }}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 transition-colors cursor-pointer flex items-center gap-1"
            >
              {isInstructorMode ? (
                <>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Ver como Aprendiz</span>
                </>
              ) : (
                <>
                  <Users className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                  <span>Ver como Instructor Líder</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
