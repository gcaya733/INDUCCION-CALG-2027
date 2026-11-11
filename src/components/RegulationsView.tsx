import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { ETHICAL_CASES } from '../data/inductionData';
import { anthemSynthPlayer } from '../utils/audioPlayer';
import { triggerSuccessConfetti } from '../utils/confetti';

interface RegulationsViewProps {
  onCaseCompleted?: (caseId: string) => void;
}

export const RegulationsView: React.FC<RegulationsViewProps> = ({ onCaseCompleted }) => {
  const [activeRegTab, setActiveRegTab] = useState<'derechos' | 'deberes' | 'prohibiciones' | 'faltas' | 'debido_proceso'>('derechos');
  const [activeCaseIndex, setActiveCaseIndex] = useState<number>(0);
  const [selectedCaseOption, setSelectedCaseOption] = useState<number | null>(null);
  const [hasSubmittedCase, setHasSubmittedCase] = useState<boolean>(false);
  const [resolvedCases, setResolvedCases] = useState<Record<string, number>>({});

  const currentCase = ETHICAL_CASES[activeCaseIndex];

  const handleSelectOption = (idx: number) => {
    if (hasSubmittedCase) return;
    setSelectedCaseOption(idx);
  };

  const handleEvaluateCase = () => {
    if (selectedCaseOption === null) return;
    setHasSubmittedCase(true);
    const isCorrect = currentCase.options[selectedCaseOption].isCorrect;

    if (isCorrect) {
      anthemSynthPlayer.playSuccess();
      // Disparar confeti en decisiones y respuestas correctas
      triggerSuccessConfetti();
      setResolvedCases((prev) => ({
        ...prev,
        [currentCase.id]: selectedCaseOption,
      }));
      if (onCaseCompleted) {
        onCaseCompleted(currentCase.id);
      }
    } else {
      anthemSynthPlayer.playFailure();
    }
  };

  const handleNextCase = () => {
    if (activeCaseIndex < ETHICAL_CASES.length - 1) {
      setActiveCaseIndex((prev) => prev + 1);
      setSelectedCaseOption(null);
      setHasSubmittedCase(false);
    }
  };

  const handlePrevCase = () => {
    if (activeCaseIndex > 0) {
      setActiveCaseIndex((prev) => prev - 1);
      setSelectedCaseOption(null);
      setHasSubmittedCase(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Title & Header */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5 space-y-3">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide">
          <span className="px-2.5 py-1 rounded-md bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 font-bold">
            Marco Normativo Oficial Vigente
          </span>
          <span aria-hidden="true" className="text-slate-400">·</span>
          <span className="text-emerald-700 dark:text-emerald-400 font-mono">
            Acuerdo 009 de 2024 & Ac. 002 de 2026 (Art. 48)
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
          Reglamento del Aprendiz SENA & Casos de Convivencia
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
          Versión oficial vigente adoptada por el Consejo Directivo Nacional del SENA mediante el <strong>Acuerdo 009 de 2024</strong> (derogando de manera expresa el Acuerdo 007 de 2012 y sus reformas previas), complementada por el <strong>Acuerdo 002 de 2026</strong> en su Artículo 48 para fortalecer los equipos del debido proceso, la doble instancia y la convivencia armónica presencial y virtual (ZAJUNA).
        </p>

        {/* Novedades Normativas Vigentes Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-emerald-100/40 dark:from-emerald-950/40 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-950 dark:text-emerald-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="space-y-1">
            <span className="font-extrabold flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              Novedades Centrales de la Actualización Vigente:
            </span>
            <p className="text-slate-600 dark:text-slate-300 leading-normal">
              • <strong>Derogación formal:</strong> Se sustituye el histórico Acuerdo 007 de 2012 por el Acuerdo 009 de 2024 (Diario Oficial 52.947).<br/>
              • <strong>Actualización 2026 (Ac. 002):</strong> Modificación del Art. 48 articulando al Equipo Ejecutor del Programa y al Comité de Evaluación del Centro.<br/>
              • <strong>Enfoque Digital y Diferencial:</strong> Inclusión formal de formación en ZAJUNA, derechos digitales y garantía de doble instancia (recursos de reposición y apelación).
            </p>
          </div>
          <div className="shrink-0 self-end md:self-center px-3 py-1.5 rounded-lg bg-emerald-700 text-white font-bold text-[11px] shadow-sm">
            Vigencia Activa
          </div>
        </div>
      </div>

      {/* Chapter Explorer Tabs */}
      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setActiveRegTab('derechos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeRegTab === 'derechos'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Capítulo II: Derechos
          </button>
          <button
            onClick={() => setActiveRegTab('deberes')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeRegTab === 'deberes'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Capítulo III: Deberes
          </button>
          <button
            onClick={() => setActiveRegTab('prohibiciones')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeRegTab === 'prohibiciones'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Capítulo IV: Prohibiciones
          </button>
          <button
            onClick={() => setActiveRegTab('faltas')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeRegTab === 'faltas'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Capítulo V: Faltas y Sanciones
          </button>
          <button
            onClick={() => setActiveRegTab('debido_proceso')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeRegTab === 'debido_proceso'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Debido Proceso (Art. 48 Ac. 002)
          </button>
        </div>

        {/* Content Pane for Regulation Chapters */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors duration-300">
          {activeRegTab === 'derechos' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Capítulo II: Derechos del Aprendiz SENA (Acuerdo 009 de 2024)
                </h2>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  Garantías Fundamentales
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                El derecho es la potestad que asiste a toda persona vinculada al SENA de gozar de formación de calidad, oportunidades y trato digno sin discriminación alguna:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">1. Formación Profesional de Excelencia</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Recibir formación integral acorde con el programa matriculado, mediante ambientes actualizados, mediaciones pedagógicas y acompañamiento idóneo.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">2. Ecosistema Digital & ZAJUNA</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Acceder a plataformas tecnológicas institucionales, bibliotecas digitales y recursos didácticos en entornos presenciales, híbridos y virtuales.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">3. Enfoque Diferencial & Trato Digno</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Ser tratado con respeto, igualdad y sin discriminación por razones de género, pertenencia étnica, discapacidad, religión o ideología.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">4. Ruta de Bienestar al Aprendiz</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Postularse a apoyos de sostenimiento (FIC, Regular), monitorías, programas de salud, orientación psicosocial, arte, cultura y deportes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">5. Representatividad Democrática</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Elegir y ser elegido como vocero de grupo o representante estudiantil ante el Comité del Centro de Formación mediante voto libre y transparente.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">6. Debido Proceso y Doble Instancia</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Garantía plena de ser escuchado, presentar descargos, controvertir pruebas y apelar decisiones ante la instancia superior (doble instancia).
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRegTab === 'deberes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Capítulo III: Deberes del Aprendiz SENA (Acuerdo 009 de 2024)
                </h2>
                <span className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-md">
                  Obligaciones Formativas
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                El deber es el compromiso ético, académico y cívico que asume el aprendiz desde su matrícula para asegurar una convivencia constructiva:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">1. Portar el Carné en Lugar Visible</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Identificarse con el carné físico o digital institucional al ingresar y permanecer en cualquier centro del SENA o empresa patrocinadora.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">2. Seguridad y Salud en el Trabajo (SST)</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Utilizar obligatoriamente los Elementos de Protección Personal (EPP) y acatar los protocolos de seguridad industrial en ambientes y talleres.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">3. Compromiso y Puntualidad</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Cumplir con los horarios pactados de formación presencial y virtual, justificando cualquier inasistencia dentro de los 3 días hábiles siguientes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">4. Probidad y Honestidad Académica</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Entregar evidencias de aprendizaje de autoría propia, respetando derechos de autor y evitando el plagio o uso fraudulento de herramientas de IA.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">5. Cuidado de Bienes e Instalaciones</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Conservar en óptimo estado la infraestructura física, maquinaria, equipos de cómputo, redes de datos y recursos bibliográficos.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">6. Actualización de Datos de Contacto</span>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Mantener al día la información de contacto, documento de identidad, correo electrónico y afiliación a EPS en las plataformas del SENA.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRegTab === 'prohibiciones' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Capítulo IV: Prohibiciones Expresas (Acuerdo 009 de 2024)
                </h2>
                <span className="text-xs text-rose-700 dark:text-rose-300 font-semibold bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-md">
                  Conductas Inadmisibles
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Se prohíbe de manera taxativa a los aprendices durante todo su ciclo formativo en etapas lectiva y productiva:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">1. Fraude o Plagio de Evidencias</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Copiar, comprar, suplantar o presentar proyectos ajenos como propios en plataformas digitales (ZAJUNA) o entregas presenciales.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">2. Sustancias Psicoactivas y Alcohol</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Ingresar, comercializar o consumir bebidas alcohólicas o sustancias psicoactivas dentro de sedes del SENA o presentarse bajo sus efectos.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">3. Porte de Armas u Objetos Peligrosos</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Ingresar o portar armas de fuego, elementos cortopunzantes o artefactos explosivos que pongan en peligro la seguridad de la comunidad.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">4. Acoso, Ciberacoso y Violencia</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Cometer actos de intimidación, matoneo físico o virtual (*cyberbullying*), agresiones verbales o cualquier forma de violencia de género.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">5. Suplantación y Alteración de Datos</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Suplantar identidades, firmas de asistencia, ceder credenciales de usuario o alterar calificaciones en los sistemas del SENA.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 space-y-1">
                  <span className="text-xs font-bold text-rose-900 dark:text-rose-300">6. Proselitismo o Cobros No Autorizados</span>
                  <p className="text-xs text-rose-800 dark:text-rose-400 leading-relaxed">
                    Realizar actividades comerciales privadas, proselitismo político o religioso, o exigir cobro de dineros a compañeros bajo ningún concepto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeRegTab === 'faltas' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Capítulo V: Régimen de Faltas, Medidas Formativas y Sanciones
                </h2>
                <span className="text-xs text-amber-700 dark:text-amber-300 font-semibold bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-md">
                  Tipificación & Graduación
                </span>
              </div>

              {/* Faltas Clasificación */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                <span className="font-extrabold text-slate-900 dark:text-slate-100 uppercase tracking-wide block">
                  Clasificación y Criterios de Calificación de las Faltas:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-emerald-700 dark:text-emerald-400 block mb-0.5">Faltas Leves</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-normal">
                      Afectaciones menores a los deberes que pueden ser superadas mediante medidas pedagógicas directas.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Faltas Graves</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-normal">
                      Vulneración de prohibiciones, fraude académico o reiteración que ameritan traslado al Comité de Evaluación.
                    </span>
                  </div>
                  <div className="p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <strong className="text-red-700 dark:text-red-400 block mb-0.5">Faltas Gravísimas</strong>
                    <span className="text-slate-600 dark:text-slate-300 leading-normal">
                      Actos que atentan contra la vida, porte de armas, agresiones violentas o delitos tipificados penalmente.
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 space-y-3">
                  <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide block">
                    Medidas Formativas (Pedagógicas Preventivas)
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Llamado de atención verbal reflexivo:</strong> Conversación pedagógica privada entre el instructor o Equipo Ejecutor y el aprendiz para orientar el cambio de actitud.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Plan de Mejoramiento Académico:</strong> Compromiso concertado con actividades complementarias para afianzar y recuperar Resultados de Aprendizaje no superados.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Plan de Mejoramiento Disciplinario:</strong> Acciones concertadas de convivencia ciudadana con acompañamiento psicosocial de Bienestar al Aprendiz.
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60 space-y-3">
                  <span className="text-xs font-bold text-rose-800 dark:text-rose-300 uppercase tracking-wide block">
                    Medidas Sancionatorias (Reguladas por Comité)
                  </span>
                  <ul className="space-y-2.5 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Llamado de atención escrito:</strong> Comunicación formal motivada con copia a la hoja de vida institucional del aprendiz en los sistemas del SENA.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Condicionamiento de Matrícula:</strong> Estado de alerta formativa vinculante con pérdida transitoria de ciertos estímulos y seguimiento estricto.
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600 dark:bg-rose-400 mt-1.5 shrink-0" />
                      <div>
                        <strong>Cancelación de Matrícula:</strong> Retiro definitivo del programa de formación e inhabilidad para reingresar al SENA (de 6 meses a 3 años según la gravedad).
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeRegTab === 'debido_proceso' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
                  <span>Actualización Acuerdo 002 de 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>Artículo 48 Modificado</span>
                </div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                  Ruta del Debido Proceso y Garantías Procesales
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Nadie puede ser sancionado en el SENA sin garantizarse las siguientes etapas procesales articuladas por los dos equipos institucionales (Equipo Ejecutor y Comité):
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 01</span>
                    <span>Equipo Ejecutor</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Informe y Documentación</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    El Equipo Ejecutor del Grupo del Programa de Formación revisa la presunta falta, recopila evidencias objetivas y remite el reporte debidamente motivado.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 02</span>
                    <span>Notificación</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Traslado de Cargos</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Se notifica formalmente al aprendiz con copia íntegra del informe y de las pruebas para que conozca los hechos imputados de forma transparente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 03</span>
                    <span>Descargos</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Derecho a la Defensa</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    El aprendiz tiene el derecho de ser escuchado, presentar descargos por escrito o en audiencia, aportar testimonios y controvertir las pruebas en su contra.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 04</span>
                    <span>Comité de Evaluación</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Deliberación Colegiada</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    El Comité (Coordinación, instructores, vocero del grupo y Bienestar) evalúa la proporcionalidad de la conducta y recomienda la medida al Subdirector.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 05</span>
                    <span>Subdirección</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Acto Administrativo Motivado</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    El Subdirector de Centro expide la resolución oficial motivada que define la absolución o la imposición de la medida correspondiente.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-emerald-800 dark:text-emerald-400">
                    <span>Etapa 06</span>
                    <span>Doble Instancia</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">Reposición y Apelación</h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    Dentro de los cinco (5) días hábiles siguientes a la notificación, el aprendiz puede interponer Recurso de Reposición y en subsidio Apelación ante la Dirección Regional.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Simulador Interactivo de Dilemas Éticos y Casos Reales */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
              <span>Laboratorio de Toma de Decisiones</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Casos Reales y Dilemas de Convivencia: ¿Qué Harías Tú?
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Aplica el Reglamento del Aprendiz en situaciones reales cotidianas de los centros de formación.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <span>Caso {activeCaseIndex + 1} de {ETHICAL_CASES.length}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {Object.keys(resolvedCases).length} resueltos con éxito
            </span>
          </div>
        </div>

        {/* Case Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm space-y-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                Categoría: {currentCase.category.toUpperCase()}
              </span>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">{currentCase.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Personajes: {currentCase.character}</p>
            </div>

            <div className="flex items-center gap-1.5 self-start sm:self-center">
              <button
                onClick={handlePrevCase}
                disabled={activeCaseIndex === 0}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Anterior
              </button>
              <button
                onClick={handleNextCase}
                disabled={activeCaseIndex === ETHICAL_CASES.length - 1}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          </div>

          {/* Situation Narrative */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wide mb-1">
              Situación Planteada:
            </h4>
            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {currentCase.situation}
            </p>
            <div className="mt-3 text-xs text-slate-500 dark:text-slate-400 font-mono">
              Sustento: {currentCase.normativeArticle}
            </div>
          </div>

          {/* Decision Options */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider block">
              Selecciona la conducta jurídicamente correcta según el Reglamento:
            </span>

            <div className="space-y-2.5">
              {currentCase.options.map((opt, idx) => {
                const isSelected = selectedCaseOption === idx;
                let optionStyle = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/70 hover:border-slate-300 dark:hover:border-slate-600 text-slate-800 dark:text-slate-200';

                if (isSelected && !hasSubmittedCase) {
                  optionStyle = 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/50 ring-2 ring-emerald-500 text-emerald-950 dark:text-emerald-200';
                } else if (hasSubmittedCase) {
                  if (opt.isCorrect) {
                    optionStyle = 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 ring-2 ring-emerald-500 text-emerald-950 dark:text-emerald-200';
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 ring-2 ring-rose-500 text-rose-950 dark:text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasSubmittedCase}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer ${optionStyle}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                        {String.fromCharCode(65 + idx)}
                      </div>
                      <div className="flex-1 text-sm leading-relaxed">
                        {opt.text}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action & Feedback Box */}
          <div className="pt-2">
            {!hasSubmittedCase ? (
              <button
                onClick={handleEvaluateCase}
                disabled={selectedCaseOption === null}
                className="px-5 py-2.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm rounded-lg"
              >
                Validar Decisión con el Reglamento
              </button>
            ) : (
              <div
                className={`p-6 rounded-2xl border-2 transition-all shadow-md ${
                  currentCase.options[selectedCaseOption!].isCorrect
                    ? 'border-emerald-500 bg-emerald-50/90 dark:bg-emerald-950/70 text-emerald-950 dark:text-emerald-100'
                    : 'border-red-500 bg-red-50 dark:bg-red-950/80 text-red-950 dark:text-red-100 shadow-red-500/10'
                }`}
              >
                {currentCase.options[selectedCaseOption!].isCorrect ? (
                  // CASO CORRECTO: CELEBRACIÓN CON CONFETI
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5 font-extrabold text-sm text-emerald-700 dark:text-emerald-400">
                      <div className="p-1 rounded-full bg-emerald-200 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <span className="text-base">¡Decisión Correcta! Excelente criterio ético SENA 🎉</span>
                    </div>

                    <p className="text-sm leading-relaxed text-emerald-950 dark:text-emerald-100 bg-white/70 dark:bg-emerald-900/30 p-3.5 rounded-xl border border-emerald-200/80 dark:border-emerald-800/60">
                      {currentCase.options[selectedCaseOption!].feedback}
                    </p>

                    <div className="text-xs bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-emerald-200/60 dark:border-emerald-800/50 text-slate-700 dark:text-slate-300">
                      <strong className="text-emerald-800 dark:text-emerald-300">Impacto Institucional:</strong> {currentCase.options[selectedCaseOption!].consequence}
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-3 pt-2">
                      {activeCaseIndex < ETHICAL_CASES.length - 1 && (
                        <button
                          onClick={handleNextCase}
                          className="px-4 py-2 text-xs font-bold rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white transition-colors cursor-pointer flex items-center gap-1.5 shadow-sm"
                        >
                          <span>Siguiente Caso</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ) : (
                  // CASO ERROR: ALERTA EN ROJO INTENSO CON REINTENTO
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-red-200 dark:border-red-900/60 pb-3">
                      <div className="flex items-center gap-2.5 font-black text-sm text-red-700 dark:text-red-400">
                        <div className="p-1.5 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                        <span className="text-base tracking-tight uppercase">⚠️ ¡ALERTA! Decisión No Conforme al Reglamento</span>
                      </div>
                      <button
                        onClick={() => {
                          setHasSubmittedCase(false);
                          setSelectedCaseOption(null);
                        }}
                        className="self-start sm:self-center px-3 py-1.5 text-xs font-bold text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-900/60 hover:bg-red-200 dark:hover:bg-red-800 border border-red-300 dark:border-red-700 rounded-lg transition-colors cursor-pointer"
                      >
                        Reintentar Caso
                      </button>
                    </div>

                    <div className="text-sm leading-relaxed text-red-950 dark:text-red-100 bg-white/80 dark:bg-red-900/40 p-3.5 rounded-xl border border-red-200 dark:border-red-800">
                      <strong className="block text-xs uppercase font-extrabold text-red-800 dark:text-red-300 mb-1">
                        Retroalimentación y Riesgo Disciplinario:
                      </strong>
                      {currentCase.options[selectedCaseOption!].feedback}
                    </div>

                    <div className="text-xs bg-white/80 dark:bg-red-950/40 p-3 rounded-xl border border-red-200 dark:border-red-800 text-red-900 dark:text-red-200">
                      <strong className="text-red-700 dark:text-red-400">Consecuencia Disciplinaria:</strong> {currentCase.options[selectedCaseOption!].consequence}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 pt-2">
                      <button
                        onClick={() => {
                          setHasSubmittedCase(false);
                          setSelectedCaseOption(null);
                        }}
                        className="px-3.5 py-2 text-xs font-bold rounded-xl bg-red-600 hover:bg-red-700 text-white transition-colors cursor-pointer shadow-sm"
                      >
                        Corregir mi Decisión
                      </button>

                      {activeCaseIndex < ETHICAL_CASES.length - 1 && (
                        <button
                          onClick={handleNextCase}
                          className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
                        >
                          <span>Continuar al Siguiente Caso</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
