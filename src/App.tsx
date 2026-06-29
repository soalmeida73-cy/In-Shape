import React, { useState, useEffect } from 'react';
import { 
  Dumbbell, 
  Accessibility, 
  Sparkles, 
  Search, 
  Filter, 
  Clock, 
  ShieldAlert, 
  Play, 
  ChevronRight, 
  Database, 
  Download, 
  Flame, 
  MapPin, 
  Home, 
  Compass, 
  Plus, 
  Activity,
  X,
  Sparkle
} from 'lucide-react';
import { Workout, WorkoutFilters } from './types';
import { INITIAL_WORKOUTS } from './data/workouts';
import JSONViewer from './components/JSONViewer';
import WorkoutPlayer from './components/WorkoutPlayer';

export default function App() {
  // Application State
  const [workouts, setWorkouts] = useState<Workout[]>(INITIAL_WORKOUTS);
  const [loading, setLoading] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [activePlayer, setActivePlayer] = useState<Workout | null>(null);
  
  // Custom AI Generator State
  const [stateInput, setStateInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [genError, setGenError] = useState<string | null>(null);
  const [newlyGenerated, setNewlyGenerated] = useState<Workout | null>(null);

  // Filter State
  const [filters, setFilters] = useState<WorkoutFilters>({
    goal: 'all',
    location: 'all',
    impactLevel: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [showDbJson, setShowDbJson] = useState(false);

  // Fetch initial workouts from API (with fallback)
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/workouts');
        if (res.ok) {
          const data = await res.json();
          setWorkouts(data);
        }
      } catch (err) {
        console.warn('Utilizando workouts estáticos de reserva:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  // Filter logic
  const filteredWorkouts = workouts.filter(w => {
    const matchesGoal = filters.goal === 'all' || w.goal === filters.goal;
    const matchesLocation = filters.location === 'all' || w.location === filters.location;
    const matchesImpact = filters.impactLevel === 'all' || w.impactLevel === filters.impactLevel;
    
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      w.title.toLowerCase().includes(query) || 
      w.description.toLowerCase().includes(query) ||
      w.targetAudience.toLowerCase().includes(query) ||
      w.exercises.some(e => e.name.toLowerCase().includes(query) || e.description.toLowerCase().includes(query));

    return matchesGoal && matchesLocation && matchesImpact && matchesSearch;
  });

  // Handle AI Custom Generation
  const handleGenerateCustom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stateInput.trim()) return;

    setIsGenerating(true);
    setGenError(null);
    setNewlyGenerated(null);

    try {
      const res = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stateInput })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || 'Erro ao gerar o treino. Por favor, verifique a ligação ou a chave API.');
      }

      const customWorkout: Workout = await res.json();
      
      // Update state
      setWorkouts(prev => [customWorkout, ...prev]);
      setNewlyGenerated(customWorkout);
      setStateInput('');
      
      // Scroll to custom workout area
      setTimeout(() => {
        const el = document.getElementById('new-custom-workout-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err: any) {
      setGenError(err.message || 'Ocorreu um erro inesperado.');
    } finally {
      setIsGenerating(false);
    }
  };

  const resetFilters = () => {
    setFilters({
      goal: 'all',
      location: 'all',
      impactLevel: 'all'
    });
    setSearchQuery('');
  };

  // Helper strings
  const getGoalLabel = (goal: 'mobility' | 'strength') => {
    return goal === 'mobility' ? 'Mobilidade e Flexibilidade' : 'Força e Tonificação';
  };

  const getLocationLabel = (loc: 'home' | 'gym' | 'outdoor') => {
    switch (loc) {
      case 'home': return 'Em Casa';
      case 'gym': return 'No Ginásio';
      case 'outdoor': return 'Ao Ar Livre';
    }
  };

  const getImpactLabel = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'Baixo Impacto / Sénior';
      case 'medium': return 'Médio Impacto';
      case 'high': return 'Alto Impacto';
    }
  };

  return (
    <div className="min-h-screen pb-16 bg-[#0a0e1a] text-[#f1f5f9] font-sans antialiased relative overflow-x-hidden">
      
      {/* Background soft glowing elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-sky-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] rounded-full bg-violet-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[20%] w-[40%] h-[40%] rounded-full bg-cyan-500/5 blur-[100px] pointer-events-none" />

      {/* Header section with deep visual appeal */}
      <header className="relative py-12 px-4 sm:px-6 lg:px-8 border-b border-white/5 bg-slate-950/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-sky-400/10 border border-sky-400/30 flex items-center justify-center shadow-lg shadow-sky-500/10">
              <Dumbbell className="w-8 h-8 text-ice-blue" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-sky-200 to-indigo-200 tracking-tight">
                In Shape
              </h1>
              <p className="text-slate-400 text-sm mt-1 sm:text-base">
                Treinos inclusivos de mobilidade e força para qualquer idade, perfil ou limitação articular.
              </p>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowDbJson(!showDbJson)}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-all text-slate-300"
            >
              <Database className="w-4 h-4 text-ice-blue" />
              <span>{showDbJson ? 'Ocultar JSON da Base de Dados' : 'Exportar Base de Dados (JSON)'}</span>
            </button>
            
            <a
              href="#ai-trainer-section"
              className="flex items-center gap-2 text-xs font-bold px-4 py-2.5 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-300 hover:to-indigo-400 text-slate-950 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-sky-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Criar Treino com IA</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">

        {/* Database JSON Panel if open */}
        {showDbJson && (
          <div className="mb-8 animate-fade-in">
            <JSONViewer 
              data={workouts} 
              title="Base de Dados de Treinos Inclusivos (In Shape)" 
              fileName="in-shape-workouts-db.json" 
            />
          </div>
        )}

        {/* Active Training Session Panel if active */}
        {activePlayer && (
          <div className="mb-10 animate-scale-up">
            <WorkoutPlayer 
              workout={activePlayer} 
              onClose={() => setActivePlayer(null)} 
            />
          </div>
        )}

        {/* AI Custom Workout Generator Module (Fase 2 MVP / PRD) */}
        <section id="ai-trainer-section" className="mb-12">
          <div className="glass-panel-elevated p-6 sm:p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-[80px] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                <Sparkle className="w-5 h-5 text-purple-300 animate-pulse" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Gerador de Treinos Customizados com IA
                </h2>
                <p className="text-xs sm:text-sm text-slate-400">
                  Insira o seu estado de saúde e limitações para obter um plano seguro de mobilidade e fortalecimento em tempo real.
                </p>
              </div>
            </div>

            <form onSubmit={handleGenerateCustom} className="mt-6 flex flex-col md:flex-row gap-4">
              <div className="flex-grow">
                <input
                  type="text"
                  value={stateInput}
                  onChange={(e) => setStateInput(e.target.value)}
                  placeholder="Ex: 'Tenho 60 anos, dor na zona lombar e estou em casa' ou 'Sénior com limitação para dobrar o joelho'..."
                  className="w-full px-5 py-4 rounded-xl text-white placeholder-slate-500 glass-input text-sm sm:text-base"
                  disabled={isGenerating}
                />
              </div>
              <button
                type="submit"
                disabled={isGenerating || !stateInput.trim()}
                className="px-6 py-4 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-400 to-sky-400 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-purple-500/15 hover:opacity-90 active:scale-98 transition-all disabled:opacity-50 disabled:pointer-events-none"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>A Analisar & Gerar...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Personalizar Treino</span>
                  </>
                )}
              </button>
            </form>

            {/* Error Display */}
            {genError && (
              <div className="mt-4 p-4 rounded-xl border border-red-500/20 bg-red-500/10 text-red-200 text-xs sm:text-sm flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400 flex-shrink-0" />
                <span>{genError}</span>
              </div>
            )}

            {/* Live Loading Suggestions */}
            {isGenerating && (
              <div className="mt-4 p-4 rounded-xl border border-white/5 bg-slate-950/40 text-xs text-slate-400 animate-pulse">
                💡 <span className="font-semibold text-sky-200">Dica de Segurança:</span> A nossa IA está a estruturar exercícios biomecanicamente seguros, com alternativas focadas para articulações sensíveis e sem carga excessiva.
              </div>
            )}
          </div>
        </section>

        {/* Highlight Newly Generated Custom Workout */}
        {newlyGenerated && (
          <div id="new-custom-workout-section" className="mb-12 animate-scale-up">
            <div className="p-0.5 rounded-3xl bg-gradient-to-r from-purple-500 via-sky-400 to-indigo-500 shadow-xl shadow-sky-500/10">
              <div className="p-6 sm:p-8 rounded-[22px] bg-[#0c1224] text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Treino Personalizado por IA
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-800 text-slate-300 capitalize">
                      {getLocationLabel(newlyGenerated.location)}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-ice-blue" />
                    <span>Estimativa: {newlyGenerated.estimatedTime} min</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold font-heading text-white tracking-tight">
                  {newlyGenerated.title}
                </h3>
                <p className="text-slate-300 text-sm mt-2 leading-relaxed max-w-3xl">
                  {newlyGenerated.description}
                </p>

                {/* Safety Alert in Highlight card */}
                <div className="mt-4 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
                      Foco de Segurança Adaptado
                    </span>
                    <span className="text-xs text-amber-200/90 leading-relaxed block">
                      {newlyGenerated.safetyNotes}
                    </span>
                  </div>
                </div>

                {/* Exercise List */}
                <div className="mt-6 space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Exercícios Customizados
                  </h4>
                  {newlyGenerated.exercises.map((ex, i) => (
                    <div key={ex.id || i} className="glass-panel p-4 rounded-xl border border-white/5 bg-white/5">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h5 className="font-bold text-base text-white font-heading">
                            {i + 1}. {ex.name}
                          </h5>
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                            {ex.description}
                          </p>
                          <div className="mt-2.5 bg-amber-500/10 border border-amber-500/20 rounded-lg p-2.5">
                            <span className="text-[10px] font-bold text-amber-400 uppercase block mb-0.5">
                              Alternativa Articular (Joelhos/Ancas)
                            </span>
                            <span className="text-xs text-amber-200/90">
                              {ex.safetyAlternative}
                            </span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          {ex.duration && (
                            <span className="text-xs font-semibold bg-white/10 text-white px-2.5 py-1 rounded">
                              {ex.duration}
                            </span>
                          )}
                          {ex.reps && (
                            <span className="text-xs font-semibold bg-sky-500/20 text-sky-200 px-2.5 py-1 rounded">
                              {ex.reps}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    onClick={() => {
                      setActivePlayer(newlyGenerated);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-xl bg-ice-blue text-slate-950 hover:bg-sky-200 hover:scale-103 transition-all"
                  >
                    <Play className="w-4 h-4 fill-slate-950" />
                    <span>Iniciar Treino IA</span>
                  </button>
                  <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(newlyGenerated, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = `custom-workout-${newlyGenerated.id}.json`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exportar JSON de IA</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Workout Explorer Library */}
        <section className="mt-12">
          
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white flex items-center gap-2">
              <Compass className="w-6 h-6 text-ice-blue" />
              Explorar Rotinas Inclusivas
            </h2>
            <span className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
              {filteredWorkouts.length} {filteredWorkouts.length === 1 ? 'Rotina' : 'Rotinas'} Encontradas
            </span>
          </div>

          {/* Search and Filters panel */}
          <div className="glass-panel p-5 rounded-2xl mb-8 space-y-4">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Pesquisar rotina por nome, exercício ou objetivo..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 glass-input"
              />
            </div>

            {/* Custom filters grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Activity className="w-3.5 h-3.5 text-ice-blue" />
                  Foco do Treino
                </label>
                <select
                  value={filters.goal}
                  onChange={(e) => setFilters({ ...filters, goal: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-slate-300 bg-slate-900 border border-white/10 outline-none focus:border-ice-blue"
                >
                  <option value="all">Todos os Objetivos</option>
                  <option value="mobility">Mobilidade e Flexibilidade</option>
                  <option value="strength">Força e Tonificação</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-ice-blue" />
                  Localização
                </label>
                <select
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-slate-300 bg-slate-900 border border-white/10 outline-none focus:border-ice-blue"
                >
                  <option value="all">Qualquer Local</option>
                  <option value="home">Em Casa (Home)</option>
                  <option value="gym">No Ginásio (Gym)</option>
                  <option value="outdoor">Ao Ar Livre (Outdoor)</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-ice-blue" />
                  Impacto & Intensidade
                </label>
                <select
                  value={filters.impactLevel}
                  onChange={(e) => setFilters({ ...filters, impactLevel: e.target.value as any })}
                  className="w-full px-3 py-2.5 rounded-xl text-sm text-slate-300 bg-slate-900 border border-white/10 outline-none focus:border-ice-blue"
                >
                  <option value="all">Qualquer Impacto</option>
                  <option value="low">Baixo Impacto / Sénior</option>
                  <option value="medium">Médio Impacto</option>
                  <option value="high">Alto Impacto</option>
                </select>
              </div>

            </div>

            {/* Clear filters trigger if dirty */}
            {(filters.goal !== 'all' || filters.location !== 'all' || filters.impactLevel !== 'all' || searchQuery !== '') && (
              <div className="flex justify-end mt-2">
                <button
                  onClick={resetFilters}
                  className="text-xs text-sky-300 hover:text-white underline"
                >
                  Limpar todos os filtros
                </button>
              </div>
            )}
          </div>

          {/* Loader or Workout Cards Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-10 h-10 border-4 border-ice-blue border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-slate-400">A carregar biblioteca de rotinas inclusivas...</p>
            </div>
          ) : filteredWorkouts.length === 0 ? (
            <div className="glass-panel text-center p-12 rounded-3xl">
              <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto mb-4" />
              <h3 className="text-lg font-bold font-heading text-white">Nenhum treino encontrado</h3>
              <p className="text-slate-400 text-sm mt-1 max-w-md mx-auto">
                Não existem rotinas na combinação atual de filtros. Tente ajustar os seus filtros ou use o nosso Gerador com IA para criar um treino sob medida!
              </p>
              <button
                onClick={resetFilters}
                className="mt-4 px-4 py-2 text-xs font-bold rounded-lg glass-button-primary"
              >
                Ver Todas as Rotinas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map((w) => (
                <div
                  key={w.id}
                  className="glass-panel rounded-2xl overflow-hidden flex flex-col hover:translate-y-[-4px] hover:border-sky-300/30 transition-all duration-300"
                >
                  {/* Decorative badge bar */}
                  <div className="p-4 pb-2 flex flex-wrap gap-2 items-center">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      w.goal === 'mobility' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-sky-500/10 text-sky-400 border border-sky-500/20'
                    }`}>
                      {w.goal === 'mobility' ? 'Mobilidade' : 'Força'}
                    </span>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-white/5 uppercase tracking-wider">
                      {getLocationLabel(w.location)}
                    </span>
                    {w.isCustom && (
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" />
                        IA
                      </span>
                    )}
                  </div>

                  {/* Title and Short details */}
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold font-heading text-white tracking-tight hover:text-ice-blue transition-colors">
                        {w.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold font-mono">
                        Público: {w.targetAudience}
                      </p>
                      <p className="text-slate-300 text-sm mt-3 leading-relaxed line-clamp-3">
                        {w.description}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <Clock className="w-4 h-4 text-sky-300" />
                        <span>{w.estimatedTime} minutos</span>
                      </div>
                      <div className="text-xs font-medium text-slate-400 bg-slate-800/50 px-2.5 py-1 rounded-lg">
                        Impacto: <span className="text-ice-blue font-bold uppercase">{w.impactLevel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions footer */}
                  <div className="p-4 bg-white/5 border-t border-white/5 flex gap-2">
                    <button
                      onClick={() => setSelectedWorkout(w)}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-center border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
                    >
                      Ver Exercícios
                    </button>
                    <button
                      onClick={() => {
                        setActivePlayer(w);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 py-2 px-3 rounded-xl text-xs font-bold text-center bg-ice-blue text-slate-950 hover:bg-sky-200 hover:scale-103 active:scale-97 transition-all flex items-center justify-center gap-1"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Treinar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

      </main>

      {/* Workout Detail Modal */}
      {selectedWorkout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="glass-panel-elevated w-full max-w-2xl rounded-3xl overflow-hidden max-h-[90vh] flex flex-col animate-scale-up">
            
            {/* Header */}
            <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 uppercase">
                    {getGoalLabel(selectedWorkout.goal)}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 uppercase">
                    {getLocationLabel(selectedWorkout.location)}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-heading text-white mt-1.5">{selectedWorkout.title}</h3>
              </div>
              <button
                onClick={() => setSelectedWorkout(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* Summary details */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Duração</span>
                  <span className="text-sm font-bold text-white block mt-0.5">{selectedWorkout.estimatedTime} min</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Nível</span>
                  <span className="text-sm font-bold text-ice-blue uppercase block mt-0.5">{selectedWorkout.impactLevel}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Público-Alvo</span>
                  <span className="text-sm font-bold text-slate-300 block mt-0.5 truncate">{selectedWorkout.targetAudience}</span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sobre esta rotina</h4>
                <p className="text-sm text-slate-300 mt-1.5 leading-relaxed">{selectedWorkout.description}</p>
              </div>

              {/* Safety general notes - CRITICAL MANDATE */}
              <div className="p-4 rounded-2xl border border-amber-500/20 bg-amber-500/10">
                <div className="flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-amber-400 uppercase tracking-wider">Aviso e Foco de Acessibilidade</h5>
                    <p className="text-xs text-amber-200/90 leading-relaxed mt-1">{selectedWorkout.safetyNotes}</p>
                  </div>
                </div>
              </div>

              {/* Exercises List */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sequência de Exercícios ({selectedWorkout.exercises.length})</h4>
                <div className="space-y-3">
                  {selectedWorkout.exercises.map((ex, i) => (
                    <div key={ex.id || i} className="p-4 rounded-xl bg-slate-900/60 border border-white/5">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <span className="text-xs font-mono font-bold text-ice-blue">EXERCÍCIO {i + 1}</span>
                          <h5 className="text-base font-bold text-white font-heading mt-0.5">{ex.name}</h5>
                          <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{ex.description}</p>
                          
                          {/* Specific Safety Alternative */}
                          <div className="mt-3 p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-200/90 flex gap-2 items-start">
                            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold text-amber-400 block uppercase text-[9px] tracking-wide">Alternativa para Joelhos / Mobilidade Reduzida:</span>
                              <p className="mt-0.5">{ex.safetyAlternative}</p>
                            </div>
                          </div>

                        </div>
                        <div className="flex-shrink-0 text-right">
                          {ex.duration && (
                            <span className="text-xs font-semibold bg-white/10 text-white px-2.5 py-1 rounded inline-block">
                              {ex.duration}
                            </span>
                          )}
                          {ex.reps && (
                            <span className="text-xs font-semibold bg-sky-500/20 text-sky-200 px-2.5 py-1 rounded inline-block">
                              {ex.reps}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="p-5 border-t border-white/10 bg-white/5 flex flex-wrap gap-3">
              <button
                onClick={() => {
                  setActivePlayer(selectedWorkout);
                  setSelectedWorkout(null);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex-1 min-w-[150px] py-3 px-4 rounded-xl text-sm font-bold bg-ice-blue text-slate-950 hover:bg-sky-200 transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-slate-950" />
                <span>Iniciar Treino</span>
              </button>
              
              <button
                onClick={() => {
                  const blob = new Blob([JSON.stringify(selectedWorkout, null, 2)], { type: 'application/json' });
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement('a');
                  link.href = url;
                  link.download = `in-shape-workout-${selectedWorkout.id}.json`;
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                  URL.revokeObjectURL(url);
                }}
                className="py-3 px-4 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center gap-1.5"
                title="Descarregar este treino individual em formato JSON pronto para DB"
              >
                <Download className="w-4 h-4" />
                <span>Exportar JSON</span>
              </button>

              <button
                onClick={() => setSelectedWorkout(null)}
                className="py-3 px-4 rounded-xl text-sm font-semibold border border-white/10 text-slate-400 hover:text-white hover:bg-white/5 transition-all"
              >
                Fechar
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Humble credit line, compliant with Anti-AI-slop rule */}
      <footer className="mt-20 text-center text-xs text-slate-500 border-t border-white/5 pt-8">
        <p>© 2026 In Shape. Desenvolvido para acessibilidade universal e treino saudável.</p>
      </footer>

    </div>
  );
}
