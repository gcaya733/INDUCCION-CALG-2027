import React, { useState, useEffect } from 'react';
import { Play, Square, Info, Video, ExternalLink } from 'lucide-react';
import {
  INSTITUTIONAL_SYMBOLS,
  SENA_ANTHEM_VERSES,
  SENA_HISTORY_TIMELINE,
  INSTITUTIONAL_VALUES,
} from '../data/inductionData';
import { anthemSynthPlayer } from '../utils/audioPlayer';
import { SenaLogo } from './SenaLogo';

export const InstitutionalView: React.FC = () => {
  const [selectedSymbolId, setSelectedSymbolId] = useState<'escudo' | 'bandera' | 'logosimbolo' | 'himno'>('escudo');
  const [selectedSectorIndex, setSelectedSectorIndex] = useState<number>(0);
  const [isPlayingAnthem, setIsPlayingAnthem] = useState<boolean>(false);
  const [activeVerseIndex, setActiveVerseIndex] = useState<number>(0);

  const selectedSymbol = INSTITUTIONAL_SYMBOLS.find((s) => s.id === selectedSymbolId)!;

  useEffect(() => {
    anthemSynthPlayer.setOnVerseChange((verseIdx) => {
      setActiveVerseIndex(verseIdx);
    });

    return () => {
      anthemSynthPlayer.stop();
    };
  }, []);

  const handleToggleAnthem = () => {
    if (isPlayingAnthem) {
      anthemSynthPlayer.stop();
      setIsPlayingAnthem(false);
    } else {
      setIsPlayingAnthem(true);
      anthemSynthPlayer.play(() => {
        setIsPlayingAnthem(false);
      });
    }
  };

  const handleStopAnthem = () => {
    anthemSynthPlayer.stop();
    setIsPlayingAnthem(false);
  };

  return (
    <div className="space-y-12">
      {/* Hero Visual Section */}
      <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 text-white shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wide uppercase mb-3">
              <span>Identidad Institucional</span>
              <span aria-hidden="true">·</span>
              <span>Servicio Nacional de Aprendizaje</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight mb-4" style={{ textWrap: 'balance' }}>
              Mística, Valores y Símbolos del SENA
            </h1>
            <p className="text-base text-slate-300 max-w-xl leading-relaxed mb-6">
              El SENA es el establecimiento público más querido por los colombianos. Desde 1957 ha transformado millones de vidas mediante la Formación Profesional Integral, el trabajo digno y la innovación tecnológica.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <span className="font-semibold text-emerald-400">Fundado:</span>
                <span>21 de junio de 1957</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <span className="font-semibold text-emerald-400">Presencia:</span>
                <span>33 Regionales en Colombia</span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1.5 rounded-lg backdrop-blur-sm">
                <span className="font-semibold text-emerald-400">Modelo:</span>
                <span>Formación Gratuita e Integral</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[260px] lg:min-h-full">
            <img
              src="/src/assets/images/sena_induction_campus_1794325217437.jpg"
              alt="Centro de formación técnica SENA con aprendices colombianos"
              className="absolute inset-0 w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* Símbolos Institucionales Interactivos */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              01. Símbolos Patrios e Institucionales
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
              Explora cada uno de los cuatro símbolos oficiales que definen la misión de nuestra institución.
            </p>
          </div>

          {/* Segmented control for symbols */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-lg shrink-0">
            {INSTITUTIONAL_SYMBOLS.map((sym) => (
              <button
                key={sym.id}
                onClick={() => setSelectedSymbolId(sym.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSymbolId === sym.id
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {sym.id === 'escudo' && 'El Escudo'}
                {sym.id === 'bandera' && 'La Bandera'}
                {sym.id === 'logosimbolo' && 'El Logosímbolo'}
                {sym.id === 'himno' && 'El Himno'}
              </button>
            ))}
          </div>
        </div>

        {/* Detailed Symbol Interactive Canvas */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 shadow-sm transition-colors duration-300">
          {selectedSymbolId === 'escudo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-56 h-56 relative rounded-2xl overflow-hidden p-2 bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                  <img
                    src="https://www.sena.edu.co/assets/escudo-CKAC4aSg.png"
                    alt="Escudo oficial del SENA"
                    className="w-full h-full object-contain p-1"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/src/assets/images/sena_insignia_symbol_1794325217513.jpg";
                    }}
                  />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  Los Tres Sectores de la Economía Colombiana
                </span>
              </div>

              <div className="lg:col-span-7 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedSymbol.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {selectedSymbol.meaning}
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    Haz clic en un componente del escudo para conocer su significado:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    {selectedSymbol.details.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSectorIndex(idx)}
                        className={`p-3 rounded-xl text-left border transition-all cursor-pointer ${
                          selectedSectorIndex === idx
                            ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/50 shadow-sm ring-1 ring-emerald-600 text-emerald-950 dark:text-emerald-200'
                            : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/70 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                        }`}
                      >
                        <span className="block text-xs font-bold">{item.element}</span>
                      </button>
                    ))}
                  </div>

                  {/* Dynamic Sector Callout */}
                  <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/70">
                    <h4 className="text-sm font-bold text-emerald-900 dark:text-emerald-300">
                      {selectedSymbol.details[selectedSectorIndex].element}
                    </h4>
                    <p className="text-sm text-emerald-800 dark:text-emerald-200 mt-1 leading-relaxed">
                      {selectedSymbol.details[selectedSectorIndex].description}
                    </p>
                  </div>
                </div>

                <div className="text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>
                    El escudo representa la articulación del SENA con el aparato productivo nacional para generar empleo digno y formal.
                  </span>
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'bandera' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-full max-w-sm aspect-[3/2] bg-white rounded-lg shadow-md border-2 border-slate-300 flex items-center justify-center relative p-4 overflow-hidden">
                  <div className="w-24 h-24 rounded-full border-2 border-emerald-600/40 flex items-center justify-center bg-white p-3 shadow-2xs">
                    <SenaLogo className="w-full h-full" fill="#39a900" />
                  </div>
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  Proporción reglamentaria: Fondo Blanco con Escudo Central Verde
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedSymbol.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedSymbol.meaning}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {selectedSymbol.details.map((detail, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{detail.element}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 leading-relaxed">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'logosimbolo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800">
                <div className="w-56 h-56 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-6">
                  <SenaLogo className="w-40 h-40" fill="#39a900" />
                </div>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-3 font-medium">
                  Logosímbolo Oficial SENA: El Aprendiz en Marcha hacia el Futuro
                </span>
              </div>

              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{selectedSymbol.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {selectedSymbol.meaning}
                </p>
                <div className="space-y-3 pt-2">
                  {selectedSymbol.details.map((detail, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100 block">{detail.element}</span>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">{detail.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {selectedSymbolId === 'himno' && (
            <div className="space-y-6">
              {/* Official YouTube Video Embed */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-900 shadow-sm">
                <div className="p-4 bg-slate-950 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 border border-red-500/30 flex items-center justify-center">
                      <Video className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">Video Oficial del Himno del SENA</h4>
                      <p className="text-[11px] text-slate-400">Canal Oficial SENA Comunica · Letra y Música Original</p>
                    </div>
                  </div>
                  <a
                    href="https://www.youtube.com/watch?v=KD5wULG4PcY&t=24s"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
                  >
                    <span>Ver en YouTube</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="relative w-full aspect-video bg-black">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src="https://www.youtube-nocookie.com/embed/KD5wULG4PcY?start=24&rel=0"
                    title="Video Oficial del Himno del SENA"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Synthesizer Melody & Lyrics Interactive Controller */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                <div>
                  <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
                    Letra Oficial y Melodía Interactiva
                  </h3>
                  <p className="text-xs text-emerald-800 dark:text-emerald-400 mt-0.5">
                    Letra: Luis Alfredo Osorio · Música: Daniel Marlez
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={handleToggleAnthem}
                    className="px-4 py-2 text-xs font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    {isPlayingAnthem ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" />
                        <span>Pausar Melodía</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Reproducir Melodía</span>
                      </>
                    )}
                  </button>

                  {isPlayingAnthem && (
                    <button
                      onClick={handleStopAnthem}
                      className="px-3 py-2 text-xs font-medium rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      Detener
                    </button>
                  )}
                </div>
              </div>

              {/* Verses Grid with active verse highlight */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SENA_ANTHEM_VERSES.map((verse, idx) => (
                  <div
                    key={idx}
                    className={`p-5 rounded-xl border transition-all ${
                      isPlayingAnthem && activeVerseIndex === idx
                        ? 'border-emerald-600 bg-emerald-50/60 dark:bg-emerald-950/60 shadow-md ring-2 ring-emerald-500'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wide">
                        {verse.title}
                      </span>
                      {isPlayingAnthem && activeVerseIndex === idx && (
                        <span className="text-xs text-emerald-700 dark:text-emerald-300 font-medium animate-pulse">
                          ● En reproducción
                        </span>
                      )}
                    </div>
                    <pre className="font-sans text-sm text-slate-700 dark:text-slate-300 whitespace-pre-line leading-relaxed italic">
                      {verse.text}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Misión, Visión y Principios Éticos */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            02. Marco Estratégico & Valores Institucionales
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Los cimientos éticos que guían el actuar de directivos, instructores y aprendices en todo el territorio nacional.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors duration-300">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              Misión Institucional
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Formación Profesional Integral para el Desarrollo
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              El SENA está encargado de cumplir la función que le corresponde al Estado de invertir en el desarrollo social y técnico de los trabajadores colombianos, ofreciendo y ejecutando la formación profesional integral, para la incorporación y el desarrollo de las personas en actividades productivas que contribuyan al desarrollo social, económico y tecnológico del país.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 transition-colors duration-300">
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">
              Visión Institucional
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              Liderazgo Tecnológico e Inserción Global
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Ser una entidad de clase mundial en formación técnica y tecnológica, reconocida por la pertinencia de sus programas, la calidad de sus egresados, la innovación aplicada mediante SENNOVA y TecnoParques, y su capacidad de generar oportunidades de emprendimiento y empleo formal en un mundo digital.
            </p>
          </div>
        </div>

        {/* 5 Valores Institucionales */}
        <div className="bg-slate-50 dark:bg-slate-850 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
            Los Cinco Valores Fundamentales del Aprendiz SENA
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {INSTITUTIONAL_VALUES.map((val, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-2xs">
                <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 block">
                  {val.name}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {val.definition}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Línea de Tiempo Histórica */}
      <section className="space-y-6">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            03. Reseña Histórica: De 1957 al Ecosistema Digital
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Una trayectoria de más de seis décadas formando la fuerza trabajadora de Colombia.
          </p>
        </div>

        <div className="relative pl-6 sm:pl-8 border-l-2 border-emerald-500/40 space-y-8 my-4">
          {SENA_HISTORY_TIMELINE.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-white dark:bg-slate-900 border-2 border-emerald-600 group-hover:bg-emerald-600 transition-colors" />

              <div className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2 text-xs font-mono tabular-nums text-emerald-700 dark:text-emerald-400 font-bold mb-1">
                  <span>{item.year}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
