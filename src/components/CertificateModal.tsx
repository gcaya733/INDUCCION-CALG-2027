import React, { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { X, Printer, Award, Download, CheckCircle2 } from 'lucide-react';
import { ApprenticeProfile } from '../types/induction';
import { SenaLogo } from './SenaLogo';
import { downloadCertificatePdf } from '../utils/certificatePdf';

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ApprenticeProfile;
  progressPercent: number;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  onClose,
  profile,
  progressPercent,
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
        });
      } catch {
        // ignore
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    try {
      setIsDownloading(true);
      downloadCertificatePdf({ profile, progressPercent });
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Error al generar el certificado PDF:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-8">
        {/* Top Control Bar (Hidden during print) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/80 print:hidden">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-700 dark:text-emerald-400" />
            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">
              Certificación Oficial de Inducción SENA
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Primary Action: Download PDF */}
            <button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center gap-2 shadow-sm cursor-pointer ${
                downloadSuccess
                  ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                  : 'bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white'
              }`}
              title="Descargar certificado oficial en archivo PDF con firma institucional y progreso"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-100" />
                  <span>¡Certificado Descargado!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generando PDF...' : 'Descargar PDF Oficial'}</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs rounded-lg"
              title="Imprimir directamente desde el navegador"
            >
              <Printer className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Imprimir</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer"
              title="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-14 bg-white relative text-center select-none text-slate-900"
          style={{ minHeight: '620px' }}
        >
          {/* Subtle Guilloché / Border Pattern */}
          <div className="absolute inset-4 sm:inset-6 border-4 border-double border-emerald-800 pointer-events-none rounded-xl" />
          <div className="absolute inset-6 sm:inset-8 border border-emerald-600/40 pointer-events-none rounded-lg" />

          {/* Institutional Header with Official SENA Logo */}
          <div className="space-y-2 mb-8 relative z-10">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-2 shadow-2xs">
                <SenaLogo className="w-full h-full" fill="#39a900" />
              </div>
            </div>
            <p className="text-xs font-bold tracking-widest text-slate-500 uppercase">
              República de Colombia · Servicio Nacional de Aprendizaje
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-emerald-900 tracking-tight">
              SENA
            </h1>
            <p className="text-xs font-semibold text-slate-600 tracking-wider uppercase">
              Dirección de Formación Profesional Integral
            </p>
          </div>

          {/* Statement */}
          <div className="space-y-4 my-8 relative z-10 max-w-2xl mx-auto">
            <p className="text-xs font-bold tracking-widest text-slate-400 uppercase">
              Certifica que:
            </p>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight border-b-2 border-emerald-600/30 pb-2 inline-block">
              {profile.name}
            </h2>

            <p className="text-xs text-slate-600 font-mono">
              Identificado(a) con Cédula de Ciudadanía No. {profile.documentNumber}
            </p>

            <p className="text-sm text-slate-700 leading-relaxed pt-2">
              Ha cursado, aprobado y formalizado con éxito el proceso de{' '}
              <strong>INDUCCIÓN INSTITUCIONAL Y APROPIACIÓN DEL REGLAMENTO DEL APRENDIZ</strong>{' '}
              (Acuerdo 009 de 2024 y su actualización Acuerdo 002 de 2026), comprometiéndose con los valores de honestidad, respeto, disciplina y convivencia ciudadana en el programa:
            </p>

            <p className="text-base font-bold text-emerald-950">
              {profile.program}
            </p>

            {/* Porcentaje de Progreso Obtenido */}
            <div className="py-2">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 shadow-2xs">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                  ✓
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold text-emerald-900 block leading-tight">
                    PROGRESO FORMATIVO OBTENIDO: <strong className="text-emerald-700 text-sm font-black">{progressPercent}%</strong>
                  </span>
                  <span className="text-[10px] text-emerald-700 font-medium block">
                    Estado: Aprobado y Competente · Ruta de Inducción Finalizada
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-slate-600 pt-2 font-mono">
              <span>Ficha: <strong>{profile.ficha}</strong></span>
              <span>·</span>
              <span>Intensidad: <strong>30 Horas</strong></span>
              <span>·</span>
              <span>Centro: <strong>{profile.center}</strong></span>
            </div>
          </div>

          {/* Signatures & Security Hash */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-10 mt-6 relative z-10 max-w-xl mx-auto border-t border-slate-200">
            <div className="space-y-1 text-center">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-lg text-slate-800">
                  Carlos A. Restrepo S.
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <p className="text-xs font-bold text-slate-900">Subdirector de Centro</p>
                <p className="text-[10px] text-slate-500">Centro de Gestión Tecnológica de Servicios</p>
              </div>
            </div>

            <div className="space-y-1 text-center">
              <div className="h-10 flex items-center justify-center">
                <span className="font-serif italic text-lg text-slate-800">
                  María Helena Salazar C.
                </span>
              </div>
              <div className="border-t border-slate-400 pt-1">
                <p className="text-xs font-bold text-slate-900">Coordinadora Académica</p>
                <p className="text-[10px] text-slate-500">Área de Teleinformática y Software</p>
              </div>
            </div>
          </div>

          {/* Verification Footprint */}
          <div className="mt-8 pt-4 text-[10px] text-slate-400 font-mono flex items-center justify-center gap-4">
            <span>Cód. Verificación: SENA-IND-2026-VAL-8492</span>
            <span>·</span>
            <span>Fecha de Emisión: 10 de Noviembre de 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
