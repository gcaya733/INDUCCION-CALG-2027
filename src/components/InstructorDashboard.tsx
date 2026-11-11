import React, { useState } from 'react';
import {
  Search,
  FileSpreadsheet,
  Edit3,
  Check,
  Save,
  X
} from 'lucide-react';
import { INITIAL_ROSTER } from '../data/inductionData';
import { ApprenticeRosterItem } from '../types/induction';

export const InstructorDashboard: React.FC = () => {
  const [roster, setRoster] = useState<ApprenticeRosterItem[]>(INITIAL_ROSTER);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<'todos' | 'al_dia' | 'en_progreso' | 'en_riesgo'>('todos');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteDraft, setNoteDraft] = useState<string>('');

  const filteredRoster = roster.filter((apprentice) => {
    const matchesSearch =
      apprentice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apprentice.document.includes(searchQuery) ||
      apprentice.email.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === 'todos') return true;
    return apprentice.status === statusFilter;
  });

  const handleToggleAct = (id: string) => {
    setRoster((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextSigned = !item.commitmentActSigned;
          return {
            ...item,
            commitmentActSigned: nextSigned,
            progressPercent: nextSigned && item.progressPercent < 100 ? item.progressPercent + 10 : item.progressPercent,
            status: nextSigned && item.progressPercent >= 80 ? 'al_dia' : item.status,
          };
        }
        return item;
      })
    );
  };

  const handleStartEditNote = (item: ApprenticeRosterItem) => {
    setEditingNotesId(item.id);
    setNoteDraft(item.instructorNotes);
  };

  const handleSaveNote = (id: string) => {
    setRoster((prev) =>
      prev.map((item) => (item.id === id ? { ...item, instructorNotes: noteDraft } : item))
    );
    setEditingNotesId(null);
  };

  const handleExportCSV = () => {
    const headers = [
      'Documento',
      'Nombre Completo',
      'Correo Institucional',
      'Porcentaje Induccion',
      'Puntaje Evaluacion Normativa',
      'Casos Convivencia Resueltos',
      'Acta Compromiso',
      'Estado',
      'Observaciones Instructor'
    ];

    const rows = roster.map((item) => [
      `"${item.document}"`,
      `"${item.name}"`,
      `"${item.email}"`,
      `"${item.progressPercent}%"`,
      `"${item.quizScore}/100"`,
      `"${item.casesResolved}"`,
      `"${item.commitmentActSigned ? 'Firmada' : 'Pendiente'}"`,
      `"${item.status}"`,
      `"${item.instructorNotes.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'reporte_induccion_sena_ficha_2874912.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const total = roster.length;
  const completed = roster.filter((r) => r.progressPercent === 100 || r.status === 'al_dia').length;
  const inRisk = roster.filter((r) => r.status === 'en_riesgo').length;
  const avgScore = Math.round(roster.reduce((acc, r) => acc + r.quizScore, 0) / total);

  return (
    <div className="space-y-8">
      {/* Title & Top Export Action */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-1">
            <span>Coordinación Académica & Instructores</span>
            <span aria-hidden="true">·</span>
            <span>Ficha 2874912</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Seguimiento de la Inducción por Ficha
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Monitorea el progreso, apropiación de normativa y firma del acta de compromiso de la cohorte de aprendices.
          </p>
        </div>

        <button
          onClick={handleExportCSV}
          className="px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 transition-colors flex items-center gap-2 cursor-pointer shadow-sm shrink-0 rounded-lg"
        >
          <FileSpreadsheet className="w-4 h-4" />
          <span>Exportar Informe CSV</span>
        </button>
      </div>

      {/* Cohort Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors duration-300">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Aprendices Matriculados
          </span>
          <span className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-slate-100 block">
            {total}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Programa ADSO - Diurno</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors duration-300">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Inducción Culminada
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black font-mono tabular-nums text-emerald-700 dark:text-emerald-400 block">
              {completed}
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
              ({Math.round((completed / total) * 100)}%)
            </span>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Con actas validadas</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors duration-300">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Promedio Normativa
          </span>
          <span className="text-2xl font-black font-mono tabular-nums text-slate-900 dark:text-slate-100 block">
            {avgScore}/100
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Evaluación Acuerdo 009 (Vigente)</span>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs space-y-1 transition-colors duration-300">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
            Alertas / En Riesgo
          </span>
          <span className="text-2xl font-black font-mono tabular-nums text-amber-600 dark:text-amber-400 block">
            {inRisk}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">Requiere intervención docente</span>
        </div>
      </div>

      {/* Search and Status Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Buscar por aprendiz, cédula o correo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-800 dark:text-slate-100"
          />
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg w-full sm:w-auto">
          <button
            onClick={() => setStatusFilter('todos')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              statusFilter === 'todos'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Todos ({roster.length})
          </button>
          <button
            onClick={() => setStatusFilter('al_dia')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              statusFilter === 'al_dia'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            Al Día
          </button>
          <button
            onClick={() => setStatusFilter('en_progreso')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              statusFilter === 'en_progreso'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            En Progreso
          </button>
          <button
            onClick={() => setStatusFilter('en_riesgo')}
            className={`flex-1 sm:flex-none px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
              statusFilter === 'en_riesgo'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            En Riesgo
          </button>
        </div>
      </div>

      {/* Apprentice Cohort Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors duration-300">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-300 text-xs font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Aprendiz</th>
                <th className="py-3 px-4">Avance Inducción</th>
                <th className="py-3 px-4">Evaluación Normativa</th>
                <th className="py-3 px-4">Casos Resueltos</th>
                <th className="py-3 px-4">Acta de Compromiso</th>
                <th className="py-3 px-4">Observación Instructor</th>
                <th className="py-3 px-4 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-xs">
              {filteredRoster.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{item.name}</div>
                    <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                      CC {item.document} · {item.email}
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 overflow-hidden">
                        <div
                          className="bg-emerald-600 dark:bg-emerald-500 h-full rounded-full"
                          style={{ width: `${item.progressPercent}%` }}
                        />
                      </div>
                      <span className="font-mono font-bold tabular-nums text-slate-800 dark:text-slate-200">
                        {item.progressPercent}%
                      </span>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold tabular-nums text-slate-900 dark:text-slate-100">
                      {item.quizScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono tabular-nums text-slate-700 dark:text-slate-300">
                    {item.casesResolved} / 3 casos
                  </td>

                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleAct(item.id)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                        item.commitmentActSigned
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                      <span>{item.commitmentActSigned ? 'Firmada' : 'Pendiente'}</span>
                    </button>
                  </td>

                  <td className="py-3.5 px-4 max-w-xs">
                    {editingNotesId === item.id ? (
                      <div className="flex items-center gap-1.5">
                        <input
                          type="text"
                          value={noteDraft}
                          onChange={(e) => setNoteDraft(e.target.value)}
                          className="w-full px-2 py-1 border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 rounded text-xs focus:ring-1 focus:ring-emerald-500 outline-none text-slate-800 dark:text-slate-100"
                        />
                        <button
                          onClick={() => handleSaveNote(item.id)}
                          className="p-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setEditingNotesId(null)}
                          className="p-1 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onClick={() => handleStartEditNote(item)}
                        className="text-slate-600 dark:text-slate-400 truncate hover:text-slate-900 dark:hover:text-slate-200 cursor-pointer flex items-center gap-1 group"
                        title={item.instructorNotes || 'Haz clic para agregar nota'}
                      >
                        <span className="truncate">{item.instructorNotes || 'Sin notas'}</span>
                        <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 shrink-0" />
                      </div>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <span
                      className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        item.status === 'al_dia'
                          ? 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40'
                          : item.status === 'en_progreso'
                          ? 'text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40'
                          : 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/40'
                      }`}
                    >
                      {item.status === 'al_dia' ? 'Al Día' : item.status === 'en_progreso' ? 'En Progreso' : 'En Riesgo'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
