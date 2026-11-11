/**
 * Tipos de datos para la plataforma de seguimiento e inducción SENA
 */

export interface ApprenticeProfile {
  id: string;
  name: string;
  documentType: 'CC' | 'TI' | 'CE' | 'PEP';
  documentNumber: string;
  email: string;
  phone: string;
  ficha: string;
  program: string;
  center: string;
  regional: string;
  avatarUrl?: string;
  inductionStartDate: string;
}

export interface InstructorProfile {
  id: string;
  name: string;
  role: string;
  document: string;
  email: string;
  phone: string;
  center: string;
  regional: string;
  assignedFicha: string;
  assignedProgram: string;
}

export type MilestoneStatus = 'pending' | 'in_progress' | 'completed';

export interface InductionMilestone {
  id: string;
  title: string;
  category: 'institucional' | 'normativa' | 'plataformas' | 'bienestar' | 'formalizacion';
  description: string;
  estimatedHours: number;
  status: MilestoneStatus;
  completedAt?: string;
  instructorApproval?: boolean;
  notes?: string;
  requiredEvidence?: string;
}

export interface QuizQuestion {
  id: string;
  moduleId: 'simbolos' | 'reglamento' | 'debido_proceso' | 'bienestar';
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  articleRef?: string;
}

export interface FlashcardItem {
  id: string;
  term: string;
  category: string;
  acronymFor?: string;
  definition: string;
  keyTakeaway: string;
  example: string;
}

export interface EthicalCase {
  id: string;
  title: string;
  category: 'academica' | 'disciplinaria' | 'sst' | 'convivencia';
  situation: string;
  character: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
    consequence: string;
  }[];
  normativeArticle: string;
}

export interface InstitutionalSymbol {
  id: 'escudo' | 'bandera' | 'logosimbolo' | 'himno';
  title: string;
  meaning: string;
  history: string;
  details: {
    element: string;
    description: string;
  }[];
}

export interface ApprenticeRosterItem {
  id: string;
  name: string;
  document: string;
  email: string;
  progressPercent: number;
  quizScore: number;
  casesResolved: number;
  commitmentActSigned: boolean;
  status: 'al_dia' | 'en_progreso' | 'en_riesgo';
  lastActivity: string;
  instructorNotes: string;
}
