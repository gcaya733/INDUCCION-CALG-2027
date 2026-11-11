/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LandingPage } from './components/LandingPage';
import { InstitutionalView } from './components/InstitutionalView';
import { RegulationsView } from './components/RegulationsView';
import { InteractiveQuizView } from './components/InteractiveQuizView';
import { TrackingView } from './components/TrackingView';
import { InstructorDashboard } from './components/InstructorDashboard';
import { CertificateModal } from './components/CertificateModal';
import { VideoManualModal } from './components/VideoManualModal';
import { INITIAL_APPRENTICE, INITIAL_MILESTONES, COHORT_APPRENTICES, OFFICIAL_INSTRUCTOR } from './data/inductionData';
import { ApprenticeProfile, InductionMilestone } from './types/induction';
import { ExternalLink, Phone, Mail, CheckCircle } from 'lucide-react';
import { SenaLogo } from './components/SenaLogo';

export default function App() {
  const [isLandingPage, setIsLandingPage] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'ruta' | 'identidad' | 'normativa' | 'evaluaciones' | 'instructor'>('ruta');
  const [isInstructorMode, setIsInstructorMode] = useState<boolean>(false);
  const [profile, setProfile] = useState<ApprenticeProfile>(() => {
    const saved = localStorage.getItem('sena_apprentice_profile');
    return saved ? JSON.parse(saved) : INITIAL_APPRENTICE;
  });
  const [milestones, setMilestones] = useState<InductionMilestone[]>(() => {
    const saved = localStorage.getItem('sena_induction_milestones');
    return saved ? JSON.parse(saved) : INITIAL_MILESTONES;
  });
  const [isCertificateOpen, setIsCertificateOpen] = useState<boolean>(false);
  const [isVideoManualOpen, setIsVideoManualOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dark Mode & Screen Blur Transition state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('sena_dark_mode');
    if (saved !== null) {
      return saved === 'true';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isBlurTransitioning, setIsBlurTransitioning] = useState<boolean>(false);

  // Initialize and synchronize dark class on <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sena_dark_mode', String(darkMode));
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('sena_apprentice_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem('sena_induction_milestones', JSON.stringify(milestones));
  }, [milestones]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  /**
   * Toggle Dark Mode with blurry screen animation
   */
  const handleToggleDarkMode = () => {
    setIsBlurTransitioning(true);

    setTimeout(() => {
      setDarkMode((prev) => !prev);
    }, 180);

    setTimeout(() => {
      setIsBlurTransitioning(false);
      showToast(!darkMode ? 'Modo oscuro activado' : 'Modo claro activado');
    }, 450);
  };

  const handleSelectApprentice = (apprentice: ApprenticeProfile) => {
    setProfile(apprentice);
    setIsInstructorMode(false);
    setActiveTab('ruta');
    setIsLandingPage(false);
    showToast(`Bienvenido(a), ${apprentice.name}`);
  };

  const handleSelectInstructor = () => {
    setIsInstructorMode(true);
    setActiveTab('instructor');
    setIsLandingPage(false);
    showToast(`Sesión iniciada como Instructor Líder: ${OFFICIAL_INSTRUCTOR.name}`);
  };

  const handleReturnToLanding = () => {
    setIsLandingPage(true);
  };

  const handleToggleMilestone = (id: string) => {
    setMilestones((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const nextStatus = m.status === 'completed' ? 'in_progress' : 'completed';
          const isDone = nextStatus === 'completed';
          showToast(isDone ? `¡Hito completado: "${m.title}"!` : `Hito marcado como pendiente`);
          return {
            ...m,
            status: nextStatus,
            completedAt: isDone ? new Date().toISOString().split('T')[0] : undefined,
          };
        }
        return m;
      })
    );
  };

  const handleCaseCompleted = (caseId: string) => {
    showToast('¡Caso de convivencia resuelto exitosamente! Tu conocimiento del reglamento suma a tu progreso.');
  };

  const handleQuizScoreUpdated = (score: number) => {
    showToast(`Evaluación de inducción finalizada con ${score}%. ¡Excelente trabajo!`);
  };

  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);

  // If in Landing Page mode, show role selection screen
  if (isLandingPage) {
    return (
      <div
        className={`min-h-screen theme-transition-wrapper ${
          isBlurTransitioning ? 'theme-transition-active' : ''
        }`}
      >
        <LandingPage
          onSelectApprentice={handleSelectApprentice}
          onSelectInstructor={handleSelectInstructor}
          onOpenVideoManual={() => setIsVideoManualOpen(true)}
          currentApprenticeId={profile.id}
          darkMode={darkMode}
          onToggleDarkMode={handleToggleDarkMode}
        />
        {/* Floating Video Manual Modal for Landing Page */}
        <VideoManualModal
          isOpen={isVideoManualOpen}
          onClose={() => setIsVideoManualOpen(false)}
        />
      </div>
    );
  }

  // Inside induction platform
  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-emerald-600 selection:text-white theme-transition-wrapper ${
        isBlurTransitioning ? 'theme-transition-active' : ''
      }`}
    >
      {/* Visual Blur Veil overlay during transition */}
      {isBlurTransitioning && (
        <div
          className="fixed inset-0 z-50 pointer-events-none backdrop-blur-2xl bg-white/20 dark:bg-black/30 transition-opacity duration-300 animate-pulse flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="bg-white/90 dark:bg-slate-900/90 px-4 py-2 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
            {darkMode ? 'Cambiando a Modo Claro...' : 'Cambiando a Modo Oscuro...'}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-900 text-white rounded-xl shadow-lg border border-emerald-700 text-xs font-medium">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Navigation Header with Dark Mode Toggle and Role Switcher */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        progressPercent={progressPercent}
        isInstructorMode={isInstructorMode}
        setIsInstructorMode={setIsInstructorMode}
        onOpenCertificate={() => setIsCertificateOpen(true)}
        onOpenVideoManual={() => setIsVideoManualOpen(true)}
        darkMode={darkMode}
        onToggleDarkMode={handleToggleDarkMode}
        onReturnToLanding={handleReturnToLanding}
        currentApprenticeName={profile.name}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        {activeTab === 'ruta' && (
          <TrackingView
            profile={profile}
            milestones={milestones}
            onToggleMilestone={handleToggleMilestone}
            onOpenCertificate={() => setIsCertificateOpen(true)}
          />
        )}

        {activeTab === 'identidad' && <InstitutionalView />}

        {activeTab === 'normativa' && (
          <RegulationsView onCaseCompleted={handleCaseCompleted} />
        )}

        {activeTab === 'evaluaciones' && (
          <InteractiveQuizView onQuizScoreUpdated={handleQuizScoreUpdated} />
        )}

        {activeTab === 'instructor' && <InstructorDashboard />}
      </main>

      {/* Official Certificate Modal */}
      <CertificateModal
        isOpen={isCertificateOpen}
        onClose={() => setIsCertificateOpen(false)}
        profile={profile}
        progressPercent={progressPercent}
      />

      {/* Floating Video Manual Modal */}
      <VideoManualModal
        isOpen={isVideoManualOpen}
        onClose={() => setIsVideoManualOpen(false)}
      />

      {/* Institutional Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-xs text-slate-600 dark:text-slate-400">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-1.5 shadow-2xs">
                  <SenaLogo className="w-full h-full text-emerald-600 dark:text-emerald-400" fill="currentColor" />
                </div>
                <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">SENA Colombia</span>
              </div>
              <p className="leading-relaxed text-slate-500 dark:text-slate-400">
                Servicio Nacional de Aprendizaje. Entidad pública de formación gratuita para el trabajo y el desarrollo humano.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider text-[11px]">
                Portales Institucionales
              </span>
              <ul className="space-y-1.5">
                <li>
                  <a href="https://www.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>Portal Oficial SENA</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://senasofiaplus.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>SOFIA Plus</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://zajuna.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>LMS ZAJUNA</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
                <li>
                  <a href="https://agenciapublicadeempleo.sena.edu.co" target="_blank" rel="noreferrer" className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>Agencia Pública de Empleo</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider text-[11px]">
                Normativa Vigente
              </span>
              <ul className="space-y-1.5 text-slate-500 dark:text-slate-400">
                <li>Acuerdo 009 de 2024 & Ac. 002 de 2026 (Reglamento del Aprendiz Vigente)</li>
                <li>Decreto Ley 118 de 1957 (Creación del SENA)</li>
                <li>Ley 789 de 2002 (Contrato de Aprendizaje)</li>
                <li>Plan Nacional de Bienestar al Aprendiz</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 dark:text-slate-100 block uppercase tracking-wider text-[11px]">
                Atención al Ciudadano
              </span>
              <div className="space-y-1 text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Bogotá: (601) 343 0111</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>Línea Gratuita: 01 8000 910 270</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>gpservicioalcliente@sena.edu.co</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div>
              © 2026 Servicio Nacional de Aprendizaje SENA · Prototipo de Inducción y Seguimiento Formativo
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleReturnToLanding}
                className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              >
                Cambiar Rol o Aprendiz
              </button>
              <span>·</span>
              <span>Ficha 2874912</span>
              <span>·</span>
              <span>Centro de Gestión Tecnológica de Servicios</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
