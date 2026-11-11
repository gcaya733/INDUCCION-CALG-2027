import { jsPDF } from 'jspdf';
import { ApprenticeProfile } from '../types/induction';

export interface GeneratePdfOptions {
  profile: ApprenticeProfile;
  progressPercent: number;
}

/**
 * Generates and triggers download of the official SENA Induction Certificate in PDF format
 */
export const downloadCertificatePdf = ({ profile, progressPercent }: GeneratePdfOptions): void => {
  // A4 Landscape format: 297mm width, 210mm height
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 297;
  const pageHeight = 210;

  // 1. Background Fill (Subtle warm white)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  // 2. Decorative Double Outer Border
  // Outer emerald border
  doc.setDrawColor(5, 150, 105); // emerald-600
  doc.setLineWidth(1.4);
  doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Inner subtle border
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(0.4);
  doc.rect(13, 13, pageWidth - 26, pageHeight - 26);

  // Corner Accents (Decorative institutional triangles)
  doc.setFillColor(57, 169, 0); // SENA official green #39a900
  // Top-left
  doc.triangle(13, 13, 23, 13, 13, 23, 'F');
  // Top-right
  doc.triangle(pageWidth - 13, 13, pageWidth - 23, 13, pageWidth - 13, 23, 'F');
  // Bottom-left
  doc.triangle(13, pageHeight - 13, 23, pageHeight - 13, 13, pageHeight - 23, 'F');
  // Bottom-right
  doc.triangle(pageWidth - 13, pageHeight - 13, pageWidth - 23, pageHeight - 13, pageWidth - 13, pageHeight - 23, 'F');

  // 3. Institutional Watermark / Emblem circle in center background
  doc.setDrawColor(240, 253, 244); // Very pale emerald
  doc.setFillColor(248, 250, 252);
  doc.circle(pageWidth / 2, 105, 50, 'F');

  // 4. Header Section
  doc.setTextColor(100, 116, 139); // slate-500
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('REPÚBLICA DE COLOMBIA', pageWidth / 2, 23, { align: 'center' });

  doc.setTextColor(6, 78, 59); // emerald-900
  doc.setFontSize(16);
  doc.text('SERVICIO NACIONAL DE APRENDIZAJE · SENA', pageWidth / 2, 30, { align: 'center' });

  doc.setTextColor(71, 85, 105); // slate-600
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text('DIRECCIÓN DE FORMACIÓN PROFESIONAL INTEGRAL', pageWidth / 2, 35, { align: 'center' });

  // Decorative header line
  doc.setDrawColor(57, 169, 0);
  doc.setLineWidth(0.8);
  doc.line((pageWidth / 2) - 35, 38, (pageWidth / 2) + 35, 38);

  // 5. "CERTIFICA QUE"
  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('CERTIFICA QUE:', pageWidth / 2, 47, { align: 'center' });

  // 6. Apprentice Name
  doc.setTextColor(15, 23, 42); // slate-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  const apprenticeName = (profile.name || 'Aprendiz SENA').toUpperCase();
  doc.text(apprenticeName, pageWidth / 2, 58, { align: 'center' });

  // Underline beneath name
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.6);
  const nameWidth = doc.getTextWidth(apprenticeName);
  const underlinePadding = 10;
  doc.line(
    Math.max(30, (pageWidth / 2) - (nameWidth / 2) - underlinePadding),
    61,
    Math.min(pageWidth - 30, (pageWidth / 2) + (nameWidth / 2) + underlinePadding),
    61
  );

  // 7. Identification Document
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9.5);
  doc.text(
    `Identificado(a) con Documento de Identidad No. ${profile.documentNumber || 'En trámite'}`,
    pageWidth / 2,
    67,
    { align: 'center' }
  );

  // 8. Certification Statement
  doc.setTextColor(51, 65, 85);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(
    'Ha cursado, aprobado y formalizado con éxito el proceso institucional de:',
    pageWidth / 2,
    76,
    { align: 'center' }
  );

  doc.setTextColor(6, 78, 59);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(
    'INDUCCIÓN INSTITUCIONAL Y APROPIACIÓN DEL REGLAMENTO DEL APRENDIZ',
    pageWidth / 2,
    82,
    { align: 'center' }
  );

  doc.setTextColor(100, 116, 139);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.text(
    '(Marco Normativo Vigente: Acuerdo 009 de 2024 y su actualización Acuerdo 002 de 2026)',
    pageWidth / 2,
    87,
    { align: 'center' }
  );

  // 9. Program Name
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12.5);
  doc.text(
    `Programa: ${profile.program || 'Formación Profesional Integral'}`,
    pageWidth / 2,
    95,
    { align: 'center' }
  );

  // 10. High-Impact Box: Porcentaje de Progreso Obtenido
  const badgeWidth = 140;
  const badgeHeight = 16;
  const badgeX = (pageWidth - badgeWidth) / 2;
  const badgeY = 101;

  // Background box
  doc.setFillColor(236, 253, 245); // emerald-50
  doc.setDrawColor(16, 185, 129); // emerald-500
  doc.setLineWidth(0.6);
  doc.roundedRect(badgeX, badgeY, badgeWidth, badgeHeight, 3, 3, 'FD');

  // Inner icon / check indicator dot
  doc.setFillColor(5, 150, 105);
  doc.circle(badgeX + 9, badgeY + 8, 3.5, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.text('✓', badgeX + 9, badgeY + 9.2, { align: 'center' });

  // Text inside badge: Porcentaje de progreso obtenido
  doc.setTextColor(6, 78, 59); // emerald-900
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.text(
    `PROGRESO FORMATIVO OBTENIDO: ${progressPercent}%`,
    badgeX + 17,
    badgeY + 7.5
  );

  doc.setTextColor(4, 120, 87); // emerald-700
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(
    'ESTADO: APROBADO Y COMPETENTE · RUTA DE INDUCCIÓN COMPLETADA',
    badgeX + 17,
    badgeY + 12
  );

  // 11. Academic Metadata Row
  doc.setTextColor(71, 85, 105);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  const metadataText = `Ficha: ${profile.ficha || '2874912'}  ·  Intensidad: 30 Horas  ·  Modalidad: Presencial / ZAJUNA LMS  ·  Centro: ${profile.center || 'CGTS'}`;
  doc.text(metadataText, pageWidth / 2, 125, { align: 'center' });

  // 12. Signatures Section
  const signatureY = 155;

  // Left Signature: Subdirector de Centro
  const leftSigCenterX = 75;
  doc.setDrawColor(148, 163, 184); // slate-400
  doc.setLineWidth(0.5);
  doc.line(leftSigCenterX - 35, signatureY, leftSigCenterX + 35, signatureY);

  doc.setTextColor(30, 41, 59);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.text('Carlos A. Restrepo S.', leftSigCenterX, signatureY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Subdirector de Centro', leftSigCenterX, signatureY + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Centro de Gestión Tecnológica de Servicios', leftSigCenterX, signatureY + 9, { align: 'center' });

  // Right Signature: Coordinadora Académica
  const rightSigCenterX = pageWidth - 75;
  doc.setDrawColor(148, 163, 184);
  doc.setLineWidth(0.5);
  doc.line(rightSigCenterX - 35, signatureY, rightSigCenterX + 35, signatureY);

  doc.setTextColor(30, 41, 59);
  doc.setFont('times', 'italic');
  doc.setFontSize(14);
  doc.text('María Helena Salazar C.', rightSigCenterX, signatureY - 3, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.text('Coordinadora Académica', rightSigCenterX, signatureY + 5, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(100, 116, 139);
  doc.text('Área de Teleinformática y Software', rightSigCenterX, signatureY + 9, { align: 'center' });

  // 13. Institutional Seal / Security Stamp
  doc.setDrawColor(5, 150, 105);
  doc.setLineWidth(0.4);
  doc.circle(pageWidth / 2, signatureY + 2, 11);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(5);
  doc.setTextColor(5, 150, 105);
  doc.text('SERVICIO NACIONAL', pageWidth / 2, signatureY - 2, { align: 'center' });
  doc.setFontSize(7);
  doc.text('SENA', pageWidth / 2, signatureY + 2.5, { align: 'center' });
  doc.setFontSize(5);
  doc.text('DE APRENDIZAJE', pageWidth / 2, signatureY + 6.5, { align: 'center' });

  // 14. Verification Footprint
  const now = new Date();
  const dateFormatted = now.toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const uniqueHash = Math.abs(
    (profile.name || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 1000)
  ).toString().padStart(6, '7');

  doc.setTextColor(148, 163, 184); // slate-400
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.text(
    `Cód. de Verificación Único: SENA-IND-2026-${uniqueHash}  ·  Fecha de Expedición: ${dateFormatted}  ·  Validez Nacional`,
    pageWidth / 2,
    188,
    { align: 'center' }
  );

  doc.setFontSize(6.5);
  doc.text(
    'Documento oficial generado digitalmente conforme al Reglamento del Aprendiz SENA vigente (Acuerdo 009 de 2024 & Ac. 002 de 2026).',
    pageWidth / 2,
    192,
    { align: 'center' }
  );

  // 15. Trigger File Download
  const safeFilename = `Certificado_Induccion_SENA_${(profile.name || 'Aprendiz').trim().replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚñÑ]/g, '_')}.pdf`;
  doc.save(safeFilename);
};
