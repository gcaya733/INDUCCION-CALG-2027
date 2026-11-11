import {
  ApprenticeProfile,
  InstructorProfile,
  InductionMilestone,
  QuizQuestion,
  FlashcardItem,
  EthicalCase,
  InstitutionalSymbol,
  ApprenticeRosterItem
} from '../types/induction';

export const INITIAL_APPRENTICE: ApprenticeProfile = {
  id: 'apr-001',
  name: 'Valentina Restrepo Morales',
  documentType: 'CC',
  documentNumber: '1037654921',
  email: 'vrestrepo@soy.sena.edu.co',
  phone: '312 849 2011',
  ficha: '2874912',
  program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
  center: 'Centro de Gestión Tecnológica de Servicios',
  regional: 'Regional Valle del Cauca',
  inductionStartDate: '2026-11-03',
};

export const INITIAL_MILESTONES: InductionMilestone[] = [
  {
    id: 'm1',
    title: 'Bienvenida Institucional e Inducción al Centro de Formación',
    category: 'institucional',
    description: 'Conocimiento del Centro de Formación, directivas, ambientes de aprendizaje, auditorios y biblioteca.',
    estimatedHours: 4,
    status: 'completed',
    completedAt: '2026-11-03',
    instructorApproval: true,
    requiredEvidence: 'Asistencia firmada y recorrido por ambientes'
  },
  {
    id: 'm2',
    title: 'Símbolos Institucionales, Misión, Visión e Historia SENA',
    category: 'institucional',
    description: 'Apropiación de la historia de fundación (1957), creador Rodolfo Martínez Tono, escudo, bandera, logosímbolo e himno.',
    estimatedHours: 6,
    status: 'completed',
    completedAt: '2026-11-04',
    instructorApproval: true,
    requiredEvidence: 'Cuestionario de símbolos institucionales superado'
  },
  {
    id: 'm3',
    title: 'Apropiación del Reglamento del Aprendiz (Acuerdo 009 de 2024 & Ac. 002 de 2026)',
    category: 'normativa',
    description: 'Estudio del nuevo marco normativo de derechos, deberes, prohibiciones, tipificación de faltas y el debido proceso actualizado con doble instancia (Art. 48).',
    estimatedHours: 8,
    status: 'in_progress',
    instructorApproval: false,
    requiredEvidence: 'Resolución de casos de dilemas éticos y evaluación'
  },
  {
    id: 'm4',
    title: 'Inducción al Ecosistema Digital (SOFIA Plus y Plataforma ZAJUNA)',
    category: 'plataformas',
    description: 'Manejo de la plataforma LMS ZAJUNA, consulta de calificaciones, foros, portafolio de evidencias y correo @soy.sena.edu.co.',
    estimatedHours: 6,
    status: 'in_progress',
    instructorApproval: false,
    requiredEvidence: 'Actualización de datos y primera evidencia enviada'
  },
  {
    id: 'm5',
    title: 'Ruta de Bienestar al Aprendiz y Liderazgo',
    category: 'bienestar',
    description: 'Convocatorias de apoyos de sostenimiento, monitorías, actividades culturales, deportivas, salud y orientación psicosocial.',
    estimatedHours: 4,
    status: 'pending',
    instructorApproval: false,
    requiredEvidence: 'Taller de habilidades blandas y proyecto de vida'
  },
  {
    id: 'm6',
    title: 'Formalización: Firma del Acta de Compromiso del Aprendiz',
    category: 'formalizacion',
    description: 'Suscripción formal del compromiso institucional para el desarrollo de la etapa lectiva y productiva.',
    estimatedHours: 2,
    status: 'pending',
    instructorApproval: false,
    requiredEvidence: 'Acta de compromiso firmada digitalmente'
  }
];

export const INSTITUTIONAL_SYMBOLS: InstitutionalSymbol[] = [
  {
    id: 'escudo',
    title: 'El Escudo del SENA',
    meaning: 'Representa los tres sectores fundamentales de la economía colombiana donde el SENA imparte formación profesional integral.',
    history: 'Diseñado en los primeros años de la entidad para simbolizar la articulación entre el trabajo, el estudio y el desarrollo productivo del país.',
    details: [
      {
        element: 'El Piñón Dentado',
        description: 'Ubicado en la parte superior. Simboliza el sector de la Industria, la construcción, la maquinaria y la transformación tecnológica.'
      },
      {
        element: 'El Caduceo de Mercurio',
        description: 'Ubicado en el centro. Simboliza el sector Comercio y Servicios, la logística, la administración y la actividad mercantil.'
      },
      {
        element: 'La Rama de Café',
        description: 'Ubicada a los lados. Representa el sector Agropecuario, el campo colombiano, la caficultura y la soberanía alimentaria.'
      }
    ]
  },
  {
    id: 'bandera',
    title: 'La Bandera del SENA',
    meaning: 'Símbolo de tranquilidad, paz, transparencia y el compromiso del SENA con el porvenir de la juventud trabajadora.',
    history: 'Compuesta por un fondo completamente blanco y en su centro el escudo oficial en verde institucional (#39A900).',
    details: [
      {
        element: 'Fondo Blanco',
        description: 'Representa la paz, la serenidad, la honestidad institucional y el espacio abierto a todas las comunidades de Colombia.'
      },
      {
        element: 'Escudo Verde Centrado',
        description: 'El verde simboliza la esperanza constante, la naturaleza fecunda y la juventud en formación profesional.'
      }
    ]
  },
  {
    id: 'logosimbolo',
    title: 'El Logosímbolo SENA',
    meaning: 'Muestra a un aprendiz caminando hacia adelante sobre los senderos de su propio futuro, apoyado en el conocimiento técnico.',
    history: 'Creado para proyectar dinamismo, evolución humana y el avance de los aprendices hacia la transformación productiva.',
    details: [
      {
        element: 'La Figura Humana',
        description: 'Un aprendiz de pie, erguido y en marcha activa, representando el protagonismo del ser humano en la formación integral.'
      },
      {
        element: 'Los Senderos de Formación',
        description: 'Líneas que representan las múltiples rutas de aprendizaje, tecnologías y oportunidades laborales que abre el SENA.'
      }
    ]
  },
  {
    id: 'himno',
    title: 'El Himno del SENA',
    meaning: 'Canto patriótico y solemne que exalta el trabajo digno, la fuerza de la juventud, el amor a la patria y el valor de la capacitación.',
    history: 'Letra escrita por el maestro Luis Alfredo Osorio y música compuesta por el maestro Daniel Marlez.',
    details: [
      {
        element: 'Coro Principal',
        description: 'Estudiantes del SENA, ¡adelante! / Por Colombia luchad con amor / Con el ánimo noble y radiante / Transformemos el mundo en mejor.'
      },
      {
        element: 'Mensaje Central',
        description: 'Fomenta la disciplina en el estudio, el progreso colectivo sin distinción de clases y la construcción de un país productivo.'
      }
    ]
  }
];

export const SENA_ANTHEM_VERSES = [
  {
    title: 'Coro',
    text: `Estudiantes del SENA, ¡adelante!
Por Colombia luchad con amor,
Con el ánimo noble y radiante
Transformemos el mundo en mejor.`
  },
  {
    title: 'Estrofa I',
    text: `De la patria el futuro destino,
En las manos del joven está,
El trabajo es seguro camino,
Que la paz y el progreso nos da.`
  },
  {
    title: 'Estrofa II',
    text: `En la forja del SENA se templa,
Con tesón la pujanza y la fe,
Y la patria gozosa contempla,
Los obreros que el mundo no ve.`
  },
  {
    title: 'Estrofa III',
    text: `Hoy la patria nos llama al trabajo,
Con el brazo resuelto a vencer,
Y en los campos y talleres abajo,
Brilla libre la luz del saber.`
  }
];

export const SENA_HISTORY_TIMELINE = [
  {
    year: '1957',
    title: 'Nacimiento del SENA',
    description: 'El 21 de junio de 1957, mediante el Decreto Ley 118, el economista cartagenero Rodolfo Martínez Tono funda el Servicio Nacional de Aprendizaje durante el gobierno de la Junta Militar.'
  },
  {
    year: '1960',
    title: 'Expansión en las Regiones',
    description: 'Se establecen los primeros centros fijos y móviles de formación agropecuaria e industrial en Bogotá, Medellín, Cali, Barranquilla y Bucaramanga.'
  },
  {
    year: '1970 - 1980',
    title: 'Formación Profesional Integral',
    description: 'Se consolida el modelo pedagógico de Formación Profesional Integral (FPI), combinando el desarrollo técnico con valores cívicos y éticos.'
  },
  {
    year: '2002',
    title: 'Fondo Emprender y TecnoParques',
    description: 'Nace el Fondo Emprender (Ley 789 de 2002) y la Red TecnoParque para impulsar la innovación aplicada, la creación de empresas y patentes colombianas.'
  },
  {
    year: '2012 - 2023',
    title: 'Régimen Previo de Aprendices',
    description: 'Etapa regida por el anterior Acuerdo 007 de 2012 y sus resoluciones reglamentarias en los centros de formación profesional del país.'
  },
  {
    year: '2024 - 2026',
    title: 'Nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024 & Ac. 002 de 2026)',
    description: 'El Consejo Directivo Nacional adopta el nuevo Reglamento del Aprendiz (Acuerdo 009 de 2024, derogando el Acuerdo 007), fortaleciendo el enfoque diferencial, formación virtual (ZAJUNA), tipificación de faltas y doble instancia, con la actualización en 2026 (Acuerdo 002) al Artículo 48 sobre debido proceso.'
  }
];

export const INSTITUTIONAL_VALUES = [
  {
    name: 'Honestidad',
    definition: 'Actuar siempre con rectitud, transparencia y veracidad en los talleres, evaluaciones y proyectos.'
  },
  {
    name: 'Respeto',
    definition: 'Reconocer el valor inherente de cada compañero, instructor y colaborador del centro, valorando la diversidad.'
  },
  {
    name: 'Compromiso',
    definition: 'Asumir con entusiasmo y disciplina la culminación exitosa de la etapa lectiva y la etapa productiva.'
  },
  {
    name: 'Diligencia',
    definition: 'Cumplir a cabalidad con los deberes formativos, entrega oportuna de evidencias y cuidado del entorno.'
  },
  {
    name: 'Justicia',
    definition: 'Actuar con equidad e imparcialidad, garantizando siempre el debido proceso en el comité de evaluación.'
  }
];

export const ETHICAL_CASES: EthicalCase[] = [
  {
    id: 'case-1',
    title: 'Omisión de Elementos de Protección Personal (EPP) en Taller',
    category: 'sst',
    character: 'Camilo, aprendiz de Mantenimiento Mecatrónico',
    situation: 'Durante una práctica con tornos y fresadoras de alta velocidad, Camilo decide no usar las gafas de seguridad ni las botas dieléctricas porque "le causan calor y solo va a hacer un ajuste rápido de cinco minutos". El instructor le llama la atención, pero Camilo insiste en que no pasa nada.',
    normativeArticle: 'Acuerdo 009 de 2024, Cap. III (Deberes de SST) y Cap. V (Régimen de Faltas Disciplinarias).',
    options: [
      {
        text: 'Suspender inmediatamente la práctica, explicar el riesgo inminente y concertar la medida formativa preventiva de plan de mejoramiento sobre SST.',
        isCorrect: true,
        feedback: '¡Correcto! El uso de EPP es un deber inexcusable bajo el Acuerdo 009 de 2024. Atentar contra la integridad física propia o ajena califica como falta disciplinaria grave.',
        consequence: 'Se previene un accidente laboral y el aprendiz asume la responsabilidad del autocuidado preventivo.'
      },
      {
        text: 'Permitirle terminar porque faltan pocos minutos y nadie se enterará.',
        isCorrect: false,
        feedback: 'Incorrecto. La omisión de normas de seguridad industrial en ambientes técnicos es causal directa de riesgos laborales y vulnera el deber de autocuidado.',
        consequence: 'Pone en peligro su integridad física y la del grupo, constituyendo una falta de supervisión.'
      },
      {
        text: 'Expulsarlo definitivamente del SENA en ese mismo instante sin realizar ningún informe previo.',
        isCorrect: false,
        feedback: 'Incorrecto. El Artículo 48 del reglamento (modificado por el Acuerdo 002 de 2026) exige respetar el Debido Proceso; ninguna sanción puede aplicarse de facto sin intervención del Equipo Ejecutor, traslado de informe y descargos.',
        consequence: 'Se vulneraría el debido proceso garantizado en la Constitución y el Reglamento del Aprendiz.'
      }
    ]
  },
  {
    id: 'case-2',
    title: 'Plagio y Suplantación en la Evidencia de Código Software',
    category: 'academica',
    character: 'Laura y Andrés, aprendices del programa ADSO',
    situation: 'Laura no tuvo tiempo de desarrollar el algoritmo de base de datos para la entrega del Resultado de Aprendizaje. Le pide a Andrés su proyecto completo, le cambia el nombre del autor en el encabezado y lo sube a la plataforma ZAJUNA como si fuera de su propia autoría.',
    normativeArticle: 'Acuerdo 009 de 2024, Cap. IV (Prohibiciones de Fraude y Plagio Digital) y Cap. V (Faltas Académicas Graves).',
    options: [
      {
        text: 'El Equipo Ejecutor del grupo documenta la evidencia y remite el informe al Comité de Evaluación y Seguimiento, notificando a Laura para que presente sus descargos formales.',
        isCorrect: true,
        feedback: '¡Exacto! El fraude o copia de evidencias académicas en entornos presenciales o virtuales constituye una falta grave que afecta la honestidad institucional y amerita citación a Comité con garantía de defensa.',
        consequence: 'El comité evalúa el caso con objetividad, garantiza el derecho a la defensa y recomienda una medida formativa o sanción motivada con opción de apelación (doble instancia).'
      },
      {
        text: 'Colocarle una nota de 100% para no perjudicar las estadísticas de deserción del grupo.',
        isCorrect: false,
        feedback: 'Incorrecto. La formación profesional integral exige honestidad y competencia real demostrada. Certificar a alguien sin competencias engaña al sector productivo.',
        consequence: 'Deteriora la calidad técnica del aprendiz y viola el principio ético institucional.'
      },
      {
        text: 'Cobrarle una multa económica a Laura para comprar insumos para el ambiente de aprendizaje.',
        isCorrect: false,
        feedback: 'Incorrecto. En el SENA está expresamente prohibido cobrar multas o dinero a los aprendices por motivos disciplinarios o académicos.',
        consequence: 'Constituye una infracción legal y abuso por parte de quien intente cobrarla.'
      }
    ]
  },
  {
    id: 'case-3',
    title: 'Inasistencia Injustificada Reiterada (3 Días Consecutivos)',
    category: 'disciplinaria',
    character: 'Mateo, aprendiz en Etapa Lectiva presencial',
    situation: 'Mateo deja de asistir a su centro de formación durante 4 días seguidos sin enviar incapacidad médica de su EPS ni comunicación a su instructor o vocero de ficha.',
    normativeArticle: 'Acuerdo 009 de 2024, Cap. VII (Proceso de Formación, Incumplimiento y Deserción) y Art. 48 actualizado.',
    options: [
      {
        text: 'El instructor notifica la novedad a la Coordinación Académica para que se envíe comunicación formal a Mateo solicitando justificación en el término de 5 días hábiles.',
        isCorrect: true,
        feedback: '¡Correcto! El trámite de deserción exige requerir al aprendiz por medio escrito otorgándole 5 días hábiles para allegar los soportes que justifiquen su ausencia.',
        consequence: 'Si Mateo justifica válidamente (ej. hospitalización o calamidad demostrada), se acuerda un plan de nivelación; si no responde, opera la deserción.'
      },
      {
        text: 'Borrar inmediatamente a Mateo del sistema SOFIA Plus sin darle oportunidad de comunicarse.',
        isCorrect: false,
        feedback: 'Incorrecto. No se puede declarar deserción automática sin agotar el término legal de 5 días hábiles de notificación previa.',
        consequence: 'Se vulnera el derecho a la defensa y a la educación garantizados en el SENA.'
      },
      {
        text: 'Pedirle a otro compañero que firme la lista de asistencia por él para que no figure la falta.',
        isCorrect: false,
        feedback: 'Incorrecto. La suplantación de firmas en el control de asistencia es una falta disciplinaria gravísima para quien suplanta y quien lo solicita.',
        consequence: 'Ambos aprendices incurren en faltas graves con posible cancelación de matrícula.'
      }
    ]
  }
];

export const FLASHCARD_ITEMS: FlashcardItem[] = [
  {
    id: 'fc-1',
    term: 'SOFIA Plus',
    category: 'Plataformas Institucionales',
    acronymFor: 'Sistema Optimizado para la Formación Integral del Aprendizaje Activo',
    definition: 'El portal maestro del SENA donde se gestiona la inscripción, matrícula, certificación, estado de ficha y novedades administrativas de los aprendices.',
    keyTakeaway: 'Conserva siempre actualizados tus datos personales (cédula, correo, teléfono y EPS).',
    example: 'Para solicitar un certificado de notas o constancia de estudio debes ingresar a www.senasofiaplus.edu.co'
  },
  {
    id: 'fc-2',
    term: 'Plataforma ZAJUNA',
    category: 'Ecosistema LMS',
    acronymFor: 'Entorno Virtual de Aprendizaje SENA',
    definition: 'Es el Learning Management System oficial donde encuentras las guías de aprendizaje, material de estudio interactivo, foros técnicos y envías tus evidencias.',
    keyTakeaway: 'El portafolio del aprendiz en ZAJUNA es tu evidencia legal de cumplimiento de la etapa lectiva.',
    example: 'Tu instructor sube las rúbricas y actividades en ZAJUNA para calificar Aprobado (A) o No Aprobado (D).'
  },
  {
    id: 'fc-3',
    term: 'RAP',
    category: 'Modelo Pedagógico',
    acronymFor: 'Resultado de Aprendizaje',
    definition: 'Indicadores de logro que definen con precisión lo que el aprendiz sabe, comprende y es capaz de hacer al culminar una fase del proyecto formativo.',
    keyTakeaway: 'Para pasar a la etapa productiva debes tener el 100% de los RAP de la etapa lectiva aprobados.',
    example: 'Ejemplo RAP: "Diseñar la arquitectura del software de acuerdo con los requisitos del cliente".'
  },
  {
    id: 'fc-4',
    term: 'Ficha de Caracterización',
    category: 'Organización Académica',
    definition: 'Número único e intransferible de 7 dígitos que identifica a tu grupo de formación en todo el país (ejemplo: Ficha 2874912).',
    keyTakeaway: 'Indica siempre tu número de ficha en cualquier solicitud, correo o trámite ante instructores y coordinación.',
    example: 'Permite diferenciar al grupo de ADSO diurno del nocturno en el mismo centro de formación.'
  },
  {
    id: 'fc-5',
    term: 'Contrato de Aprendizaje',
    category: 'Etapa Productiva',
    definition: 'Forma especial de vinculación laboral patrocinada por una empresa, donde el aprendiz recibe apoyo de sostenimiento y afiliación a EPS y ARL mientras aplica sus conocimientos.',
    keyTakeaway: 'Es la modalidad más solicitada para culminar la formación profesional y lograr inserción laboral formal.',
    example: 'Durante la etapa productiva la empresa patrocinadora aporta el 100% de un SMLV y cobertura total en riesgos laborales.'
  },
  {
    id: 'fc-6',
    term: 'Bienestar al Aprendiz',
    category: 'Servicios de Apoyo',
    definition: 'Estrategia integral del SENA que brinda acompañamiento biopsicosocial, apoyos de sostenimiento FIC, monitorías, salud, cultura, arte y deportes.',
    keyTakeaway: 'No estás solo en tu formación: el equipo de bienestar te respalda ante dificultades socioeconómicas.',
    example: 'Puedes postularte a monitores de ambiente de aprendizaje o a las selecciones deportivas del centro.'
  },
  {
    id: 'fc-7',
    term: 'Comité de Evaluación y Seguimiento',
    category: 'Normativa & Convivencia (Acuerdo 009 & Ac. 002)',
    definition: 'Órgano consultor y asesor del Subdirector de Centro que garantiza el debido proceso. Analiza informes documentados por el Equipo Ejecutor, practica pruebas, recibe descargos y recomienda medidas formativas o sancionatorias proporcionales.',
    keyTakeaway: 'Garantiza de forma inviolable la presunción de inocencia, el derecho a la defensa y la doble instancia procesal.',
    example: 'Integrado por la Coordinación Académica, instructores del programa, el vocero del grupo y el profesional de Bienestar al Aprendiz.'
  },
  {
    id: 'fc-8',
    term: 'Plan de Mejoramiento',
    category: 'Medidas Formativas Pedagógicas',
    definition: 'Medida formativa concertada entre el instructor (o Equipo Ejecutor) y el aprendiz para superar debilidades de desempeño o convivencia en un plazo perentorio, con carácter pedagógico previo a cualquier sanción disciplinaria.',
    keyTakeaway: 'No es punitivo: busca afianzar competencias técnicas y comportamentales para garantizar la permanencia.',
    example: 'El instructor y el aprendiz conciertan un plazo de hasta 15 días con nuevas evidencias para recuperar un RAP pendiente.'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    moduleId: 'simbolos',
    question: '¿Qué simboliza el Piñón Dentado en la parte superior del escudo del SENA?',
    context: 'Símbolos Institucionales - Escudo Nacional del SENA',
    options: [
      'El sector industrial, la construcción, la maquinaria y la evolución técnica',
      'El sector bancario, financiero y las bolsas de valores internacionales',
      'Las telecomunicaciones satelitales y la fibra óptica',
      'La agricultura ecológica y los cultivos hidropónicos'
    ],
    correctAnswer: 0,
    explanation: 'El piñón dentado representa el sector de la industria y la construcción, uno de los tres pilares económicos que sustentan la labor formativa del SENA.',
    articleRef: 'Identidad Corporativa e Imagen Institucional SENA'
  },
  {
    id: 'q2',
    moduleId: 'simbolos',
    question: '¿Quién fue el fundador visionario del SENA en 1957 mediante el Decreto 118?',
    context: 'Reseña Histórica del SENA',
    options: [
      'Alfonso López Michelsen',
      'Rodolfo Martínez Tono',
      'Gabriel García Márquez',
      'Jorge Eliécer Gaitán'
    ],
    correctAnswer: 1,
    explanation: 'El cartagenero Rodolfo Martínez Tono concibió la idea en su tesis de grado y la convirtió en realidad el 21 de junio de 1957 al fundar el SENA.',
    articleRef: 'Historia Institucional SENA - Decreto Ley 118 de 1957'
  },
  {
    id: 'q3',
    moduleId: 'reglamento',
    question: '¿Cuál es la norma vigente que rige el Reglamento del Aprendiz SENA, derogando el antiguo Acuerdo 007 de 2012?',
    context: 'Marco Normativo Vigente - Acuerdo 009 de 2024 & Ac. 002 de 2026',
    options: [
      'El Acuerdo 009 de 2024 (actualizado en su Artículo 48 por el Acuerdo 002 de 2026)',
      'El Decreto Ley 118 de 1957',
      'El Acuerdo 007 de 2012',
      'La Ley 789 de 2002'
    ],
    correctAnswer: 0,
    explanation: 'El Consejo Directivo Nacional del SENA expidió el Acuerdo 009 de 2024 como nuevo Reglamento del Aprendiz, derogando formalmente el Acuerdo 007 de 2012. Posteriormente, el Acuerdo 002 de 2026 actualizó su Artículo 48 para fortalecer los equipos y garantías del debido proceso.',
    articleRef: 'Acuerdo 009 de 2024 & Acuerdo 002 de 2026, Consejo Directivo Nacional SENA'
  },
  {
    id: 'q4',
    moduleId: 'debido_proceso',
    question: 'Bajo el debido proceso vigente (Acuerdo 009 de 2024 y Ac. 002 de 2026), ¿cuáles dos equipos intervienen para analizar y documentar presuntas faltas antes de cualquier sanción?',
    context: 'Debido Proceso y Garantías Procesales (Art. 48 Modificado)',
    options: [
      'El Equipo Ejecutor del Grupo del Programa de Formación y el Comité de Evaluación y Seguimiento',
      'Únicamente el personal de vigilancia privada del centro',
      'El Ministerio del Trabajo y la Policía Nacional',
      'El representante de la empresa patrocinadora de forma unilateral'
    ],
    correctAnswer: 0,
    explanation: 'El Artículo 48 (modificado por el Acuerdo 002 de 2026) dispone que para garantizar el debido proceso intervienen dos equipos: el Equipo Ejecutor del Grupo del Programa de Formación (que revisa y documenta la novedad) y el Comité de Evaluación y Seguimiento del Centro.',
    articleRef: 'Acuerdo 009 de 2024, Artículo 48 modificado por Acuerdo 002 de 2026'
  },
  {
    id: 'q5',
    moduleId: 'bienestar',
    question: '¿Cuál es la función principal de la Ruta de Bienestar al Aprendiz en el SENA?',
    context: 'Bienestar al Aprendiz y Desarrollo Humano',
    options: [
      'Imponer sanciones monetarias a quienes lleguen tarde',
      'Brindar acompañamiento integral en salud, deporte, cultura, orientación y apoyos socioeconómicos',
      'Vender uniformes y repuestos para maquinaria pesada',
      'Reemplazar la etapa lectiva por trabajo comunitario no calificado'
    ],
    correctAnswer: 1,
    explanation: 'Bienestar al Aprendiz vela por la calidad de vida, la permanencia estudiantil y el desarrollo armónico de las dimensiones física, psicológica, social y cultural.',
    articleRef: 'Plan Nacional Integral de Bienestar al Aprendiz SENA'
  }
];

export const INITIAL_ROSTER: ApprenticeRosterItem[] = [
  {
    id: 'apr-001',
    name: 'Valentina Restrepo Morales',
    document: '1037654921',
    email: 'vrestrepo@soy.sena.edu.co',
    progressPercent: 75,
    quizScore: 92,
    casesResolved: 3,
    commitmentActSigned: false,
    status: 'en_progreso',
    lastActivity: 'Hoy, 09:14 am',
    instructorNotes: 'Participación activa en el debate del debido proceso. Pendiente firma de acta.'
  },
  {
    id: 'apr-002',
    name: 'Carlos Andrés Montoya Gómez',
    document: '1017849302',
    email: 'cmontoya@soy.sena.edu.co',
    progressPercent: 100,
    quizScore: 100,
    casesResolved: 3,
    commitmentActSigned: true,
    status: 'al_dia',
    lastActivity: 'Ayer, 04:30 pm',
    instructorNotes: 'Inducción completada satisfactoriamente. Certificado generado con éxito.'
  },
  {
    id: 'apr-003',
    name: 'María José Benítez Ospina',
    document: '1143892014',
    email: 'mbenitez@soy.sena.edu.co',
    progressPercent: 90,
    quizScore: 88,
    casesResolved: 3,
    commitmentActSigned: true,
    status: 'al_dia',
    lastActivity: 'Hoy, 08:02 am',
    instructorNotes: 'Completó todos los hitos de plataforma ZAJUNA y bienestar.'
  },
  {
    id: 'apr-004',
    name: 'Sebastián Caicedo Rentería',
    document: '1005829103',
    email: 'scaicedo@soy.sena.edu.co',
    progressPercent: 30,
    quizScore: 60,
    casesResolved: 1,
    commitmentActSigned: false,
    status: 'en_riesgo',
    lastActivity: 'Hace 4 días',
    instructorNotes: 'Sin actividad en plataforma ZAJUNA. Contactar a acudiente o aprendiz para seguimiento.'
  },
  {
    id: 'apr-005',
    name: 'Daniela Sofía Vargas Peña',
    document: '1020491820',
    email: 'dvargas@soy.sena.edu.co',
    progressPercent: 85,
    quizScore: 95,
    casesResolved: 2,
    commitmentActSigned: true,
    status: 'al_dia',
    lastActivity: 'Hoy, 10:20 am',
    instructorNotes: 'Elegida como postulante a vocera de ficha por su excelente liderazgo.'
  }
];

export const OFFICIAL_INSTRUCTOR: InstructorProfile = {
  id: 'inst-001',
  name: 'Ing. Ricardo Méndez Cardona',
  role: 'Instructor Líder y Evaluador Único de Ficha',
  document: '79842105',
  email: 'rmendez@sena.edu.co',
  phone: '315 780 4422',
  center: 'Centro de Gestión Tecnológica de Servicios (CGTS)',
  regional: 'Regional Valle del Cauca',
  assignedFicha: '2874912',
  assignedProgram: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
};

export const COHORT_APPRENTICES: ApprenticeProfile[] = [
  {
    id: 'apr-001',
    name: 'Valentina Restrepo Morales',
    documentType: 'CC',
    documentNumber: '1037654921',
    email: 'vrestrepo@soy.sena.edu.co',
    phone: '312 849 2011',
    ficha: '2874912',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Gestión Tecnológica de Servicios',
    regional: 'Regional Valle del Cauca',
    inductionStartDate: '2026-11-03',
  },
  {
    id: 'apr-002',
    name: 'Carlos Andrés Montoya Gómez',
    documentType: 'CC',
    documentNumber: '1017849302',
    email: 'cmontoya@soy.sena.edu.co',
    phone: '314 620 9944',
    ficha: '2874912',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Gestión Tecnológica de Servicios',
    regional: 'Regional Valle del Cauca',
    inductionStartDate: '2026-11-03',
  },
  {
    id: 'apr-003',
    name: 'María José Benítez Ospina',
    documentType: 'CC',
    documentNumber: '1143892014',
    email: 'mbenitez@soy.sena.edu.co',
    phone: '318 433 1188',
    ficha: '2874912',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Gestión Tecnológica de Servicios',
    regional: 'Regional Valle del Cauca',
    inductionStartDate: '2026-11-03',
  },
  {
    id: 'apr-004',
    name: 'Sebastián Caicedo Rentería',
    documentType: 'CC',
    documentNumber: '1005829103',
    email: 'scaicedo@soy.sena.edu.co',
    phone: '320 915 7700',
    ficha: '2874912',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Gestión Tecnológica de Servicios',
    regional: 'Regional Valle del Cauca',
    inductionStartDate: '2026-11-03',
  },
  {
    id: 'apr-005',
    name: 'Daniela Sofía Vargas Peña',
    documentType: 'CC',
    documentNumber: '1020491820',
    email: 'dvargas@soy.sena.edu.co',
    phone: '311 204 8833',
    ficha: '2874912',
    program: 'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
    center: 'Centro de Gestión Tecnológica de Servicios',
    regional: 'Regional Valle del Cauca',
    inductionStartDate: '2026-11-03',
  }
];
