import React from 'react';
import {
  CheckCircle2,
  Clock,
  Award,
  FileText,
  Building,
  MapPin,
  Calendar,
  Check
} from 'lucide-react';
import { ApprenticeProfile, InductionMilestone } from '../types/induction';

interface TrackingViewProps {
  profile: ApprenticeProfile;
  milestones: InductionMilestone[];
  onToggleMilestone: (id: string) => void;
  onOpenCertificate: () => void;
}

export const TrackingView: React.FC<TrackingViewProps> = ({
  profile,
  milestones,
  onToggleMilestone,
  onOpenCertificate,
}) => {
  const completedCount = milestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedCount / milestones.length) * 100);
  const totalHours = milestones.reduce((acc, m) => acc + m.estimatedHours, 0);
  const completedHours = milestones
    .filter((m) => m.status === 'completed')
    .reduce((acc, m) => acc + m.estimatedHours, 0);

  return (
    <div className="space-y-12">
      {/* Profile & Cohort Summary Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors duration-300">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              <span>Ficha Oficial de Matrícula</span>
              <span aria-hidden="true">·</span>
              <span className="font-mono">{profile.ficha}</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {profile.name}
              </h1>
              <p className="text-sm font-medium text-emerald-800 dark:text-emerald-300 mt-1">
                {profile.program}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <Building className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div className="truncate">
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Centro</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 truncate block">{profile.center}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Regional</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 block">{profile.regional}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <div>
                  <span className="text-slate-400 dark:text-slate-500 block text-[10px]">Inicio Inducción</span>
                  <span className="font-medium text-slate-800 dark:text-slate-200 block">{profile.inductionStartDate}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Radial / Progress Visual */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-emerald-50/50 dark:bg-emerald-950/30 rounded-2xl border border-emerald-100 dark:border-emerald-800/60 text-center">
            <div className="relative flex items-center justify-center mb-3">
              <div className="w-28 h-28 rounded-full border-8 border-slate-200 dark:border-slate-800 flex items-center justify-center relative">
                <div
                  className="absolute inset-0 rounded-full border-8 border-emerald-600 dark:border-emerald-500 border-t-transparent transition-all duration-700"
                  style={{
                    transform: `rotate(${(progressPercent / 100) * 360}deg)`,
                  }}
                />
                <span className="text-2xl font-black font-mono tabular-nums text-emerald-900 dark:text-emerald-300">
                  {progressPercent}%
                </span>
              </div>
            </div>

            <span className="text-xs font-bold text-emerald-950 dark:text-emerald-200 block">
              {progressPercent === 100 ? 'Inducción Culminada con Éxito' : 'Inducción en Desarrollo'}
            </span>
            <span className="text-xs text-emerald-700 dark:text-emerald-400 mt-0.5">
              {completedHours} de {totalHours} horas formativas certificadas
            </span>

            {progressPercent >= 80 && (
              <button
                onClick={onOpenCertificate}
                className="mt-4 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-4 h-4" />
                <span>Generar Certificado</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Workshop Visual Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center rounded-2xl bg-slate-900 text-white overflow-hidden border border-slate-800 shadow-sm">
        <div className="md:col-span-7 p-6 sm:p-8 space-y-3">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
            Comunidad SENA en Acción
          </span>
          <h2 className="text-2xl font-bold">
            Formación Práctica en Ambientes de Aprendizaje
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            Durante la inducción conocerás los talleres, laboratorios de software y ambientes especializados donde aplicarás el modelo por competencias laborales para el sector productivo.
          </p>
        </div>
        <div className="md:col-span-5 h-56 md:h-full relative min-h-[220px]">
          <img
            src="/src/assets/images/sena_learning_workshop_1794325219881.jpg"
            alt="Aprendices SENA colaborando en taller de formación"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-900 via-transparent to-transparent" />
        </div>
      </div>

      {/* Interactive Milestones Checklist */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              Hitos Obligatorios de la Inducción SENA
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Marca las actividades presenciales y virtuales concertadas con tu equipo de instructores.
            </p>
          </div>

          <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold font-mono tabular-nums">{completedCount}</span> de{' '}
            <span className="font-mono tabular-nums">{milestones.length}</span> actividades validadas
          </div>
        </div>

        <div className="space-y-3">
          {milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'completed';

            return (
              <div
                key={milestone.id}
                className={`p-5 rounded-2xl border transition-all ${
                  isCompleted
                    ? 'border-emerald-200 dark:border-emerald-800/80 bg-white dark:bg-slate-900 shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700 shadow-2xs'
                }`}
              >
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => onToggleMilestone(milestone.id)}
                    className={`mt-1 w-6 h-6 rounded-lg flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
                      isCompleted
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'border-2 border-slate-300 dark:border-slate-600 text-transparent hover:border-emerald-500'
                    }`}
                    title={isCompleted ? 'Desmarcar' : 'Marcar como completado'}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </button>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400 dark:text-slate-500">
                          0{idx + 1}.
                        </span>
                        <h3 className={`text-base font-bold ${isCompleted ? 'text-slate-800 dark:text-slate-200' : 'text-slate-900 dark:text-slate-100'}`}>
                          {milestone.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          <span>{milestone.estimatedHours}h presenciales</span>
                        </span>
                        <span aria-hidden="true">·</span>
                        {milestone.instructorApproval ? (
                          <span className="text-emerald-700 dark:text-emerald-400 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Validado por Instructor</span>
                          </span>
                        ) : (
                          <span className="text-amber-700 dark:text-amber-400 font-medium">
                            Pendiente firma
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {milestone.description}
                    </p>

                    {milestone.requiredEvidence && (
                      <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                        <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span><strong>Evidencia Requerida:</strong> {milestone.requiredEvidence}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
