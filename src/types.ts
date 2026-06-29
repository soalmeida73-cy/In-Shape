export interface Exercise {
  id: string;
  name: string;
  reps?: string;       // e.g. "10-12 repetições"
  duration?: string;   // e.g. "45 segundos"
  description: string; // Brief instruction
  safetyAlternative: string; // Specific alternative, especially for knee or joint pain
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  goal: 'mobility' | 'strength'; // mobility = Mobilidade e Flexibilidade, strength = Força e Tonificação
  location: 'home' | 'gym' | 'outdoor'; // home = Em Casa, gym = No Ginásio, outdoor = Ao Ar Livre
  impactLevel: 'low' | 'medium' | 'high'; // Baixo, Médio, Alto
  estimatedTime: number; // in minutes
  targetAudience: string; // e.g. "Seniores", "Adultos", "Geral"
  safetyNotes: string; // General safety guidelines
  exercises: Exercise[];
  isCustom?: boolean; // True if generated via AI
}

export interface WorkoutFilters {
  goal: 'all' | 'mobility' | 'strength';
  location: 'all' | 'home' | 'gym' | 'outdoor';
  impactLevel: 'all' | 'low' | 'medium' | 'high';
}

export interface AICustomRequest {
  stateInput: string; // e.g. "Tenho 60 anos, dor lombar e estou em casa"
}
