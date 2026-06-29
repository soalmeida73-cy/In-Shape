import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { INITIAL_WORKOUTS } from "./src/data/workouts";

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Body parser
app.use(express.json());

// Lazy-initialized Gemini client
let aiClient: GoogleGenAI | null = null;

function getGemini() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("A chave GEMINI_API_KEY não foi encontrada nas configurações do servidor. Por favor, adicione-a no painel Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// 1. API: Get all default workouts
app.get("/api/workouts", (req, res) => {
  try {
    res.json(INITIAL_WORKOUTS);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// 2. API: Generate custom inclusive workout based on user profile/state
app.post("/api/generate-workout", async (req, res) => {
  const { stateInput } = req.body;

  if (!stateInput || typeof stateInput !== "string" || stateInput.trim() === "") {
    return res.status(400).json({ error: "O estado físico/perfil do utilizador é obrigatório." });
  }

  try {
    const ai = getGemini();

    const systemInstruction = `És um Personal Trainer especializado em Fisioterapia, Acessibilidade, Inclusão de Seniores e Reabilitação Física.
O teu objetivo é gerar uma rotina de treino curta (3 a 4 exercícios) extremamente segura e adaptada ao perfil, dores ou limitações do utilizador.
Instrução Crítica de Segurança: Deves SEMPRE fornecer uma alternativa clara de segurança para cada exercício, especialmente para o caso do utilizador não conseguir dobrar totalmente os joelhos ou os quadris (ex: realizar flexão curta a 30-45 graus, usar cadeira para descarregar o peso, ou estender a perna sem carga).
Todos os campos textuais gerados devem estar em português correto e fluido (de Portugal).`;

    const prompt = `Gera um treino adaptado e inclusivo em formato JSON para um utilizador que indicou o seguinte estado físico/perfil: "${stateInput}".`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "O título do treino personalizado. Curto, inclusivo e motivador." },
            description: { type: Type.STRING, description: "Breve descrição explicando como esta rotina se adapta de forma segura às limitações informadas." },
            goal: { type: Type.STRING, enum: ["mobility", "strength"], description: "Foco principal do treino: 'mobility' (mobilidade/flexibilidade) ou 'strength' (força/tonificação)." },
            location: { type: Type.STRING, enum: ["home", "gym", "outdoor"], description: "Local ideal estimado baseado no perfil informado (padrão 'home' se não especificado)." },
            impactLevel: { type: Type.STRING, enum: ["low", "medium", "high"], description: "Nível de impacto estimado: 'low', 'medium' ou 'high'." },
            estimatedTime: { type: Type.INTEGER, description: "Tempo total estimado em minutos para realizar a rotina (ex: 15, 20)." },
            targetAudience: { type: Type.STRING, description: "Público-alvo ou perfil do utilizador (ex: 'Sénior com dor lombar', 'Jovem iniciante')." },
            safetyNotes: { type: Type.STRING, description: "Nota geral de segurança focada nas articulações, dores ou limitações especificadas pelo utilizador." },
            exercises: {
              type: Type.ARRAY,
              description: "Conjunto de 3 a 4 exercícios adaptados.",
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING, description: "Nome descritivo e simples do exercício em português." },
                  reps: { type: Type.STRING, description: "Número de repetições recomendado (opcional, pode ser omitido se tiver duração)." },
                  duration: { type: Type.STRING, description: "Duração recomendada em tempo (opcional, ex: '30 segundos')." },
                  description: { type: Type.STRING, description: "Instrução clara de execução passo-a-passo focada na postura correta." },
                  safetyAlternative: { type: Type.STRING, description: "Alternativa obrigatória de segurança caso o utilizador sinta dor ou não consiga dobrar o joelho ou articulações envolvidas." }
                },
                required: ["name", "description", "safetyAlternative"]
              }
            }
          },
          required: ["title", "description", "goal", "location", "impactLevel", "estimatedTime", "targetAudience", "safetyNotes", "exercises"]
        }
      }
    });

    const workoutText = response.text;
    if (!workoutText) {
      throw new Error("Não foi possível obter uma resposta válida do modelo de IA.");
    }

    // Parse output to check correctness
    const generatedWorkout = JSON.parse(workoutText.trim());
    // Assign a temporary unique ID
    generatedWorkout.id = "custom-" + Date.now();
    generatedWorkout.isCustom = true;

    res.json(generatedWorkout);
  } catch (error: any) {
    console.error("Erro na geração de treino:", error);
    res.status(500).json({ error: error.message || "Ocorreu um erro ao processar a geração de IA." });
  }
});

// Vite or Static Assets handling
async function initServer() {
  if (process.env.NODE_ENV !== "production") {
    // In development mode, dynamically load Vite
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production mode, serve built static assets
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`In Shape Server running at http://localhost:${PORT}`);
  });
}

initServer().catch((err) => {
  console.error("Failed to start server:", err);
});
