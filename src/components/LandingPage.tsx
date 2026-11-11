import React, { useState } from 'react';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Building,
  MapPin,
  Sparkles,
  Sun,
  Moon,
  Save,
  FileText,
  Mail,
  Phone,
  CreditCard,
  Calendar,
  Info,
  Lightbulb,
  RotateCcw,
  Lock,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  Video,
  Play
} from 'lucide-react';
import { SenaLogo } from './SenaLogo';
import { ApprenticeProfile } from '../types/induction';

interface LandingPageProps {
  onSelectApprentice: (apprentice: ApprenticeProfile) => void;
  onSelectInstructor: () => void;
  onOpenVideoManual: () => void;
  currentApprenticeId: string;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onSelectApprentice,
  onSelectInstructor,
  onOpenVideoManual,
  darkMode,
  onToggleDarkMode,
}) => {
  // Clean initial form state with empty fields as requested
  const [formData, setFormData] = useState<ApprenticeProfile>({
    id: `apr-${Date.now().toString().slice(-4)}`,
    name: '',
    documentType: 'CC',
    documentNumber: '',
    email: '',
    phone: '',
    ficha: '',
    program: '',
    center: '',
    regional: '',
    inductionStartDate: new Date().toISOString().split('T')[0],
  });

  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Instructor generic authentication state
  const [instructorUsername, setInstructorUsername] = useState<string>('');
  const [instructorPassword, setInstructorPassword] = useState<string>('');
  const [showInstructorPassword, setShowInstructorPassword] = useState<boolean>(false);
  const [instructorError, setInstructorError] = useState<string | null>(null);
  const [isInstructorVerified, setIsInstructorVerified] = useState<boolean>(false);

  // Field change handler for apprentice
  const handleInputChange = (
    field: keyof ApprenticeProfile,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
    setIsSaved(false);
  };

  // Quick helper to fill sample data for fast testing if needed
  const handleFillSample = () => {
    setFormData({
      id: 'apr-001',
      name: 'Valentina Restrepo Morales',
      documentType: 'CC',
      documentNumber: '1037654921',
      email: 'vrestrepo@soy.sena.edu.co',
      phone: '312 849 2011',
      ficha: '2874912',
      program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      center: 'Centro de Gestión Tecnológica de Servicios (CGTS)',
      regional: 'Regional Valle del Cauca',
      inductionStartDate: '2026-11-03',
    });
    setFormErrors({});
  };

  // Reset form to clean empty fields
  const handleClearForm = () => {
    setFormData({
      id: `apr-${Date.now().toString().slice(-4)}`,
      name: '',
      documentType: 'CC',
      documentNumber: '',
      email: '',
      phone: '',
      ficha: '',
      program: '',
      center: '',
      regional: '',
      inductionStartDate: new Date().toISOString().split('T')[0],
    });
    setFormErrors({});
  };

  // Instructor login submission & verification
  const handleInstructorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanUser = instructorUsername.trim().toLowerCase();
    const cleanPass = instructorPassword.trim();

    if (!cleanUser) {
      setInstructorError('Por favor ingresa el usuario o correo institucional.');
      return;
    }
    if (!cleanPass) {
      setInstructorError('Por favor ingresa la contraseña de acceso.');
      return;
    }

    const isValidUser =
      cleanUser === 'instructor.sena' ||
      cleanUser === 'rmendez@sena.edu.co' ||
      cleanUser === '79842105' ||
      cleanUser === 'instructor';

    const isValidPass =
      cleanPass === 'Sena2026*' ||
      cleanPass === 'sena2026' ||
      cleanPass === 'SENA2026' ||
      cleanPass === 'Instructor2026';

    if (isValidUser && isValidPass) {
      setInstructorError(null);
      setIsInstructorVerified(true);
      setTimeout(() => {
        onSelectInstructor();
      }, 400);
    } else {
      setInstructorError(
        'Credenciales incorrectas. Verifique su usuario institucional y contraseña.'
      );
    }
  };

  // Form validation & submission for apprentice
  const handleSaveAndProceed = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = 'El nombre completo del aprendiz es obligatorio (ej. Valentina Restrepo Morales)';
    }
    if (!formData.documentNumber.trim()) {
      errors.documentNumber = 'El número de documento es obligatorio (ej. 1037654921)';
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errors.email = 'Ingrese un correo electrónico válido (ej. aprendiz@soy.sena.edu.co)';
    }
    if (!formData.ficha.trim()) {
      errors.ficha = 'El número de ficha de caracterización es obligatorio (ej. 2874912)';
    }
    if (!formData.program.trim()) {
      errors.program = 'El programa de formación es obligatorio (ej. ADSO)';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSaved(true);

    const finalProfile: ApprenticeProfile = {
      ...formData,
      center: formData.center.trim() || 'Centro de Gestión Tecnológica de Servicios (CGTS)',
      regional: formData.regional.trim() || 'Regional Valle del Cauca',
      phone: formData.phone.trim() || '312 849 2011',
    };

    // Save profile and proceed to induction prototype
    setTimeout(() => {
      onSelectApprentice(finalProfile);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
      {/* Top Navbar */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center p-1.5 shadow-2xs">
              <SenaLogo className="w-full h-full text-emerald-600 dark:text-emerald-400" fill="currentColor" />
            </div>
            <div>
              <span className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white block">
                SENA · Inducción
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block -mt-0.5">
                Portal de Acceso y Selección de Rol
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 font-mono">
              <span>Ficha: <strong>2874912</strong></span>
              <span>·</span>
              <span>ADSO</span>
            </div>

            {/* Video Manual Button */}
            <button
              onClick={onOpenVideoManual}
              className="px-3 py-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/70 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700/60 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
              title="Ver video manual explicativo de la plataforma"
            >
              <Video className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Video Manual</span>
            </button>

            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-amber-400 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
              title={darkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
              aria-label={darkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Proceso de Inducción Formativa 2026</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            Bienvenido al Sistema de Inducción SENA
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Selecciona tu rol para ingresar. Los <strong>aprendices</strong> registran sus datos de identificación y proceso formativo para iniciar su inducción, mientras que el <strong>instructor líder</strong> supervisa y evalúa a toda la cohorte con credenciales asignadas.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-600 dark:text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Centro de Gestión Tecnológica de Servicios (CGTS)</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Regional Valle del Cauca</span>
            </span>
          </div>

          {/* CTA: Ver Video Manual */}
          <div className="pt-2">
            <button
              onClick={onOpenVideoManual}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              <span>Ver Video Manual de la Plataforma</span>
            </button>
          </div>
        </div>

        {/* Dual Role Selector Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* CARD 1: ROL APRENDIZ (CAMPOS LIMPIOS Y PISTAS DE LLENADO) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/50 dark:border-emerald-500/40 p-6 sm:p-8 shadow-md space-y-6 relative overflow-hidden transition-all duration-300">
            {/* Top Badge */}
            <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-xs flex items-center gap-1.5">
              <GraduationCap className="w-3 h-3" />
              <span>Rol de Aprendiz · Acceso al Portal</span>
            </div>

            {/* Header info */}
            <div className="flex items-start gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0 border border-emerald-200 dark:border-emerald-800 shadow-2xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Identificación y Datos del Proceso del Aprendiz
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Completa los campos con tu información. Sigue las <strong>pistas de ayuda</strong> de cada casilla para ingresar el formato correcto y continuar al prototipo de inducción.
                </p>
              </div>
            </div>

            {/* Step Workflow Guide */}
            <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">1</span>
                <span>Rol Aprendiz</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-400">
                <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[9px]">2</span>
                <span>Llenar Datos</span>
              </div>
              <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                <span className="w-4 h-4 rounded-full bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 flex items-center justify-center text-[9px]">3</span>
                <span>Guardar y Acceder</span>
              </div>
            </div>

            {/* Instructions & Quick Action Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-xs">
              <div className="flex items-center gap-2 text-emerald-900 dark:text-emerald-200">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-[11px]">
                  Todos los campos inician limpios. Revisa la <strong>Pista</strong> debajo de cada uno.
                </span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleFillSample}
                  className="px-2.5 py-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-900/60 hover:bg-emerald-200 dark:hover:bg-emerald-800 rounded-lg transition-colors cursor-pointer"
                  title="Cargar datos de ejemplo para prueba rápida"
                >
                  Cargar Ejemplo
                </button>
                <button
                  type="button"
                  onClick={handleClearForm}
                  className="p-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 rounded-md transition-colors cursor-pointer"
                  title="Limpiar todos los campos"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Interactive Form for Apprentice Profile & Process Data */}
            <form onSubmit={handleSaveAndProceed} className="space-y-5">
              {/* SECTION A: DATOS PERSONALES Y DE IDENTIFICACIÓN */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>1. Datos de Identificación del Aprendiz</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Tipo de Documento */}
                  <div className="sm:col-span-4 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Tipo Documento *
                    </label>
                    <select
                      value={formData.documentType}
                      onChange={(e) =>
                        handleInputChange('documentType', e.target.value as ApprenticeProfile['documentType'])
                      }
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium"
                    >
                      <option value="CC">Cédula de Ciudadanía (CC)</option>
                      <option value="TI">Tarjeta de Identidad (TI)</option>
                      <option value="CE">Cédula de Extranjería (CE)</option>
                      <option value="PEP">Permiso Especial (PEP)</option>
                    </select>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Tipo registrado en SOFIA Plus</span>
                    </p>
                  </div>

                  {/* Número de Documento */}
                  <div className="sm:col-span-8 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Número de Identificación *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 1037654921 (solo números)"
                      value={formData.documentNumber}
                      onChange={(e) => handleInputChange('documentNumber', e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono ${
                        formErrors.documentNumber
                          ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Digita solo números continuos, sin puntos ni comas</span>
                    </p>
                    {formErrors.documentNumber && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">
                        {formErrors.documentNumber}
                      </span>
                    )}
                  </div>

                  {/* Nombre Completo */}
                  <div className="sm:col-span-12 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Nombres y Apellidos Completos *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Valentina Restrepo Morales"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                        formErrors.name
                          ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Escribe tu nombre y dos apellidos exactamente como en tu documento</span>
                    </p>
                    {formErrors.name && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">
                        {formErrors.name}
                      </span>
                    )}
                  </div>

                  {/* Correo Electrónico */}
                  <div className="sm:col-span-7 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>Correo Electrónico *</span>
                    </label>
                    <input
                      type="email"
                      placeholder="Ej. vrestrepo@soy.sena.edu.co o personal@gmail.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                        formErrors.email
                          ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Correo institucional @soy.sena o personal donde recibes información</span>
                    </p>
                    {formErrors.email && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">
                        {formErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Teléfono Celular */}
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>Teléfono / Celular</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 312 849 2011"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Número de 10 dígitos para llamados o contacto</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* SECTION B: DATOS DEL PROCESO FORMATIVO */}
              <div className="space-y-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-750">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
                  <FileText className="w-3.5 h-3.5" />
                  <span>2. Datos del Proceso Formativo SENA</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
                  {/* Ficha de Caracterización */}
                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Ficha de Caracterización *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. 2874912"
                      value={formData.ficha}
                      onChange={(e) => handleInputChange('ficha', e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold ${
                        formErrors.ficha
                          ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Código de 7 u 8 dígitos de tu grupo (ej. 2874912)</span>
                    </p>
                    {formErrors.ficha && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">
                        {formErrors.ficha}
                      </span>
                    )}
                  </div>

                  {/* Fecha de Inicio */}
                  <div className="sm:col-span-7 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>Fecha Inicio de Inducción</span>
                    </label>
                    <input
                      type="date"
                      value={formData.inductionStartDate}
                      onChange={(e) => handleInputChange('inductionStartDate', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Fecha del primer día de tu semana de inducción</span>
                    </p>
                  </div>

                  {/* Programa de Formación */}
                  <div className="sm:col-span-12 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Programa de Formación Titulada *
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Tecnólogo en Análisis y Desarrollo de Software (ADSO)"
                      value={formData.program}
                      onChange={(e) => handleInputChange('program', e.target.value)}
                      className={`w-full px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-medium ${
                        formErrors.program
                          ? 'border-red-400 dark:border-red-500 ring-1 ring-red-400'
                          : 'border-slate-200 dark:border-slate-700'
                      }`}
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Denominación exacta del programa técnico o tecnológico matriculado</span>
                    </p>
                    {formErrors.program && (
                      <span className="text-[10px] text-red-600 dark:text-red-400 block font-medium">
                        {formErrors.program}
                      </span>
                    )}
                  </div>

                  {/* Centro y Regional */}
                  <div className="sm:col-span-7 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Centro de Formación
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Centro de Gestión Tecnológica de Servicios (CGTS)"
                      value={formData.center}
                      onChange={(e) => handleInputChange('center', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Sede o centro SENA de tu programa</span>
                    </p>
                  </div>

                  <div className="sm:col-span-5 space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                      Regional
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Regional Valle del Cauca"
                      value={formData.regional}
                      onChange={(e) => handleInputChange('regional', e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 pt-0.5">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">💡 Pista:</span>
                      <span>Departamento o regional correspondiente</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Success Notification Banner */}
              {isSaved && (
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 flex items-center gap-2 text-xs font-semibold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>¡Perfil guardado exitosamente! Ingresando al prototipo de inducción...</span>
                </div>
              )}

              {/* Action Buttons: Guardar Perfil y Continuar */}
              <div className="pt-1 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  disabled={isSaved}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                >
                  <Save className="w-4 h-4" />
                  <span>
                    Guardar Perfil y Continuar a la Inducción
                  </span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>
                  Los datos registrados se utilizarán en tu Acta de Compromiso, Ficha de Seguimiento y Certificado Oficial de Inducción.
                </span>
              </div>
            </form>
          </div>

          {/* CARD 2: ROL INSTRUCTOR (CON USUARIO Y CONTRASEÑA GENÉRICA) */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border-2 border-slate-300 dark:border-slate-700 p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden transition-all duration-300">
            <div className="absolute top-0 right-0 bg-slate-800 dark:bg-slate-700 text-white text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl shadow-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Instructor Único Asignado</span>
            </div>

            <div className="flex items-start gap-4 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-300 dark:border-slate-700 shadow-2xs">
                <Lock className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  Portal del Instructor Líder
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Ingresa con tus credenciales genéricas para acceder al panel de supervisión y evaluación de la cohorte.
                </p>
              </div>
            </div>

            {/* Instructor Login Form */}
            <form onSubmit={handleInstructorLogin} className="space-y-4">
              {/* Usuario */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <User className="w-3 h-3 text-slate-400" />
                  <span>Usuario o Correo Institucional *</span>
                </label>
                <input
                  type="text"
                  placeholder="instructor.sena o rmendez@sena.edu.co"
                  value={instructorUsername}
                  onChange={(e) => {
                    setInstructorUsername(e.target.value);
                    setInstructorError(null);
                  }}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                />
              </div>

              {/* Contraseña */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-slate-400" />
                  <span>Contraseña Genérica *</span>
                </label>
                <div className="relative">
                  <input
                    type={showInstructorPassword ? 'text' : 'password'}
                    placeholder="Sena2026*"
                    value={instructorPassword}
                    onChange={(e) => {
                      setInstructorPassword(e.target.value);
                      setInstructorError(null);
                    }}
                    className="w-full pl-3 pr-9 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowInstructorPassword(!showInstructorPassword)}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
                    title={showInstructorPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                  >
                    {showInstructorPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {instructorError && (
                <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-xs flex items-start gap-1.5 font-medium">
                  <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                  <span>{instructorError}</span>
                </div>
              )}

              {/* Success Notification Banner */}
              {isInstructorVerified && (
                <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 flex items-center gap-2 text-xs font-semibold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>¡Autenticación exitosa! Abriendo el panel del instructor líder...</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isInstructorVerified}
                className="w-full py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
              >
                <Lock className="w-4 h-4 text-emerald-400" />
                <span>Ingresar al Panel de Evaluación</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Responsibilities Checklist */}
            <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Supervisar los 32 aprendices matriculados</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Validar el cumplimiento de los 6 hitos de inducción</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Aprobar actas de compromiso y exportar reportes en CSV</span>
              </div>
            </div>
          </div>
        </div>

        {/* Cohort Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
              Cohorte Ficha
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
              32 Aprendices
            </span>
            <p className="text-[11px] text-slate-500">ADSO - Modalidad Presencial</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
              Equipo Docente
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
              1 Instructor
            </span>
            <p className="text-[11px] text-slate-500">Único evaluador líder asignado</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
              Ruta Formativa
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-slate-900 dark:text-white">
              6 Hitos Clave
            </span>
            <p className="text-[11px] text-slate-500">30 Horas de inducción integral</p>
          </div>

          <div className="space-y-1">
            <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wide block">
              Normativa Vigente
            </span>
            <span className="text-xl sm:text-2xl font-black font-mono text-emerald-700 dark:text-emerald-400">
              Acuerdo 009
            </span>
            <p className="text-[11px] text-slate-500">Reglamento Vigente (Ac. 002/2026)</p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <SenaLogo className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="currentColor" />
            <span>Servicio Nacional de Aprendizaje SENA · Portal Oficial de Inducción</span>
          </div>
          <div>
            Centro de Gestión Tecnológica de Servicios · Regional Valle del Cauca
          </div>
        </div>
      </footer>
    </div>
  );
};

