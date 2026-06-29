import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, X, CheckCircle, ShieldAlert, Clock } from 'lucide-react';
import { Workout, Exercise } from '../types';

interface WorkoutPlayerProps {
  workout: Workout;
  onClose: () => void;
}

export default function WorkoutPlayer({ workout, onClose }: WorkoutPlayerProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentExercise = workout.exercises[currentIdx];
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Parse time for the current exercise
  const getExerciseDuration = (ex: Exercise) => {
    if (ex.duration) {
      const match = ex.duration.match(/\d+/);
      if (match) {
        const value = parseInt(match[0]);
        if (ex.duration.toLowerCase().includes('minuto')) {
          return value * 60;
        }
        return value;
      }
    }
    return 30; // default time for rep-based exercises
  };

  // Reset timer on exercise switch
  useEffect(() => {
    if (currentExercise) {
      setTimeLeft(getExerciseDuration(currentExercise));
      setIsPlaying(false);
    }
  }, [currentIdx, currentExercise]);

  // Handle timer countdown
  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isPlaying) {
      handleNext();
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isPlaying, timeLeft]);

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleRestart = () => {
    setTimeLeft(getExerciseDuration(currentExercise));
    setIsPlaying(false);
  };

  const handleNext = () => {
    if (currentIdx < workout.exercises.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setIsPlaying(false);
      setIsCompleted(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
    }
  };

  // Percent calculation
  const totalDuration = getExerciseDuration(currentExercise);
  const progressPercent = ((totalDuration - timeLeft) / totalDuration) * 100;
  const overallProgress = ((currentIdx) / workout.exercises.length) * 100;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (isCompleted) {
    return (
      <div className="glass-panel-elevated p-8 rounded-3xl text-center max-w-md mx-auto my-8 animate-fade-in">
        <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h3 className="text-2xl font-bold font-heading text-white mb-2">Treino Concluído!</h3>
        <p className="text-slate-300 text-sm mb-6">
          Parabéns por cuidar da sua saúde e manter-se em movimento. O seu corpo agradece!
        </p>
        <div className="glass-panel p-4 rounded-2xl mb-6 text-left">
          <div className="text-xs text-slate-400 uppercase tracking-wide">Treino Realizado</div>
          <div className="text-white font-semibold font-heading text-lg">{workout.title}</div>
          <div className="text-xs text-ice-blue mt-1">Duração Estimada: {workout.estimatedTime} minutos</div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => {
              setCurrentIdx(0);
              setIsCompleted(false);
              setIsPlaying(false);
            }}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm glass-button-primary"
          >
            Repetir Treino
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-ice-blue text-slate-950 hover:bg-sky-200 transition-colors"
          >
            Fechar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel-elevated rounded-3xl overflow-hidden max-w-2xl mx-auto my-6">
      {/* Header bar */}
      <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-ice-blue bg-ice-blue/10 px-2.5 py-1 rounded-md">
            Em Progresso
          </span>
          <h4 className="text-sm font-semibold text-white inline-block ml-3 truncate max-w-[200px] sm:max-w-[300px]">
            {workout.title}
          </h4>
        </div>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Main player area */}
      <div className="p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center">
        {/* Animated Circle Timer */}
        <div className="relative w-48 h-48 flex-shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-white/5 fill-transparent"
              strokeWidth="10"
            />
            <circle
              cx="96"
              cy="96"
              r="80"
              className="stroke-ice-blue fill-transparent transition-all duration-1000 ease-linear"
              strokeWidth="10"
              strokeDasharray={2 * Math.PI * 80}
              strokeDashoffset={2 * Math.PI * 80 * (1 - progressPercent / 100)}
            />
          </svg>
          <div className="absolute text-center flex flex-col items-center">
            <span className="text-4xl font-extrabold text-white font-mono tracking-tight">
              {formatTime(timeLeft)}
            </span>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mt-1 flex items-center gap-1">
              <Clock className="w-3 h-3 text-ice-blue" />
              {currentExercise.duration ? 'Tempo Ativo' : 'Repetições'}
            </span>
            {currentExercise.reps && (
              <span className="text-xs font-semibold text-ice-blue mt-1 bg-ice-blue/10 px-2 py-0.5 rounded">
                {currentExercise.reps}
              </span>
            )}
          </div>
          {/* Pulsing indicator when active */}
          {isPlaying && (
            <div className="absolute inset-0 border border-ice-blue/20 rounded-full animate-ping pointer-events-none scale-95" />
          )}
        </div>

        {/* Exercise Info & Instructions */}
        <div className="flex-grow text-left w-full">
          <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">
            Exercício {currentIdx + 1} de {workout.exercises.length}
          </div>
          <h3 className="text-xl font-bold font-heading text-white mb-3">
            {currentExercise.name}
          </h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            {currentExercise.description}
          </p>

          {/* Safety Alternative highlight - IMPORTANT CRITERIA */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mt-2">
            <div className="flex items-start gap-2.5">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                  Alternativa de Segurança / Limitação Articular
                </span>
                <span className="text-xs text-amber-200/90 leading-relaxed block">
                  {currentExercise.safetyAlternative}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar & Controls */}
      <div className="p-6 border-t border-white/10 bg-white/5">
        {/* Progress tracks */}
        <div className="flex items-center gap-4 mb-4">
          <div className="flex-grow h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-ice-blue transition-all duration-300"
              style={{ width: `${overallProgress + (100 / workout.exercises.length) * (1 - timeLeft / totalDuration)}%` }}
            />
          </div>
          <span className="text-xs font-mono font-semibold text-slate-400">
            {currentIdx + 1}/{workout.exercises.length}
          </span>
        </div>

        {/* Button Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <button
              onClick={handleRestart}
              className="p-3 rounded-xl border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
              title="Reiniciar exercício"
            >
              <RotateCcw className="w-5 h-5" />
            </button>

            <button
              onClick={handleTogglePlay}
              className="p-4 rounded-full bg-ice-blue text-slate-950 hover:bg-sky-200 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-ice-blue/20"
            >
              {isPlaying ? <Pause className="w-6 h-6 fill-slate-950" /> : <Play className="w-6 h-6 fill-slate-950" />}
            </button>
          </div>

          <button
            onClick={handleNext}
            className="p-2.5 rounded-xl text-slate-400 hover:text-white transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
