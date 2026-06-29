import { Workout } from '../types';

export const INITIAL_WORKOUTS: Workout[] = [
  {
    id: "wk-01",
    title: "Articulações Livres",
    description: "Rotina suave focada na mobilidade da coluna, ombros e ancas. Ideal para seniores, pessoas em reabilitação ou pausas no teletrabalho.",
    goal: "mobility",
    location: "home",
    impactLevel: "low",
    estimatedTime: 15,
    targetAudience: "Seniores e Iniciantes",
    safetyNotes: "Mantenha a respiração fluida. Se sentir qualquer dor aguda, reduza a amplitude do movimento imediatamente.",
    exercises: [
      {
        id: "ex-01-01",
        name: "Rotação de Ombros Sentado",
        duration: "1 minuto",
        description: "Sentado com postura direita, rode os ombros para trás em círculos lentos e amplos.",
        safetyAlternative: "Se sentir dor nos ombros, faça círculos mais pequenos ou coloque as mãos nas ancas enquanto move os ombros."
      },
      {
        id: "ex-01-02",
        name: "Mobilidade de Anca Sentado (Abdução)",
        reps: "10 de cada lado",
        description: "Sentado na ponta de uma cadeira estável, abra uma perna para o lado deslizando o pé, mantendo o outro parado.",
        safetyAlternative: "Se tiver limitação grave na anca ou se doer o joelho ao abrir, faça apenas o levantamento suave do joelho (marcha estática sentado)."
      },
      {
        id: "ex-01-03",
        name: "Gato-Camelo Sentado",
        reps: "8 repetições",
        description: "Coloque as mãos nos joelhos. Arredonde as costas (gato) e depois expire abrindo o peito e arqueando suavemente as costas (camelo).",
        safetyAlternative: "Se tiver osteoporose avançada ou dor lombar, evite flexionar as costas excessivamente; mantenha o movimento na zona alta do peito."
      }
    ]
  },
  {
    id: "wk-02",
    title: "Força Residencial com Cadeira",
    description: "Exercícios simples de fortalecimento muscular utilizando uma cadeira doméstica como suporte de segurança. Excelente para ganhar estabilidade e autonomia.",
    goal: "strength",
    location: "home",
    impactLevel: "low",
    estimatedTime: 20,
    targetAudience: "Seniores / Mobilidade Reduzida",
    safetyNotes: "Certifique-se de que a cadeira está encostada a uma parede para não deslizar durante os exercícios.",
    exercises: [
      {
        id: "ex-02-01",
        name: "Sentar e Levantar da Cadeira",
        reps: "10-12 repetições",
        description: "Partindo da posição sentada, incline o tronco ligeiramente à frente e levante-se usando a força das pernas. Volte a sentar-se de forma controlada.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho ou sentir dor ao subir: coloque almofadas na cadeira para subir o assento, diminuindo o ângulo de flexão do joelho, ou faça apenas a extensão de pernas sentado, esticando um joelho de cada vez sem carga."
      },
      {
        id: "ex-02-02",
        name: "Flexões na Parede",
        reps: "10 repetições",
        description: "Coloque as mãos na parede à largura dos ombros. Afaste os pés e dobre os braços levando o peito em direção à parede, mantendo o corpo alinhado.",
        safetyAlternative: "Se sentir dor nos pulsos, faça o exercício apoiando os antebraços na parede ou reduza a inclinação dando um passo em direção à parede."
      },
      {
        id: "ex-02-03",
        name: "Elevação de Calcanhares (Gémeos)",
        reps: "15 repetições",
        description: "Apoie as mãos no encosto da cadeira para equilíbrio. Suba até ficar na ponta dos pés e desça lentamente.",
        safetyAlternative: "Se tiver falta de equilíbrio grave, faça o movimento sentado, pressionando as pontas dos pés contra o chão levantando os calcanhares."
      }
    ]
  },
  {
    id: "wk-03",
    title: "Pilates Clínico para Coluna",
    description: "Foco na ativação do transverso do abdómen, estabilização pélvica e alongamento suave da cadeia posterior para alívio de tensões diárias.",
    goal: "mobility",
    location: "home",
    impactLevel: "low",
    estimatedTime: 25,
    targetAudience: "Adultos / Alívio de Dor Lombar",
    safetyNotes: "Faça os movimentos de forma lenta, sincronizando com a respiração. Não prenda o ar (apneia).",
    exercises: [
      {
        id: "ex-03-01",
        name: "Ponte de Glúteos Suave",
        reps: "10 repetições",
        description: "Deitado de costas com joelhos dobrados e pés no chão, suba a bacia vértebra por vértebra até alinhar as ancas com os ombros.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho para apoiar os pés perto do corpo: afaste mais os pés debaixo do quadril (maior ângulo do joelho). Se a dor persistir, faça apenas a báscula pélvica, pressionando a zona lombar contra o colchão sem elevar o quadril."
      },
      {
        id: "ex-03-02",
        name: "Alongamento Abraço de Joelhos",
        duration: "1 minuto",
        description: "Deitado de costas, traga os joelhos em direção ao peito e segure com as mãos por baixo dos joelhos para relaxar a zona lombar.",
        safetyAlternative: "Se tiver dor nos joelhos ou dificuldade em dobrar: segure atrás das coxas (na zona dos isquiotibiais) em vez de puxar pelas tíbias, mantendo o joelho num ângulo confortável e aberto."
      }
    ]
  },
  {
    id: "wk-04",
    title: "Tonificação Funcional em Casa",
    description: "Exercícios dinâmicos sem cargas externas adicionais, focados na melhoria do tónus muscular geral e no controlo postural.",
    goal: "strength",
    location: "home",
    impactLevel: "medium",
    estimatedTime: 20,
    targetAudience: "Geral / Adultos",
    safetyNotes: "Mantenha o abdómen contraído para proteger a lombar em todos os exercícios.",
    exercises: [
      {
        id: "ex-04-01",
        name: "Agachamento Isométrico na Parede",
        duration: "30 segundos",
        description: "Encoste as costas à parede e deslize até os joelhos estarem dobrados. Mantenha a posição firme.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho ou sentir pressão na patela: posicione o quadril bem mais alto, mantendo os joelhos dobrados a apenas 30 ou 45 graus, ou use uma cadeira comum para se sentar e esticar as pernas alternadamente."
      },
      {
        id: "ex-04-02",
        name: "Super-Homem (Superman) no Chão",
        reps: "12 repetições",
        description: "Deitado de barriga para baixo, levante ligeiramente o peito e os braços do chão, contraindo as costas e glúteos.",
        safetyAlternative: "Se tiver dor lombar ativa ou desconforto deitado de barriga para baixo, faça o exercício de 'quatro apoios' (Pássaro-Cão / Bird-Dog), esticando um braço e a perna oposta alternadamente."
      }
    ]
  },
  {
    id: "wk-05",
    title: "Desafio de Pernas Inclusivo",
    description: "Rotina de fortalecimento de pernas desenhada com forte ênfase na acessibilidade articular e joelhos sensíveis.",
    goal: "strength",
    location: "home",
    impactLevel: "low",
    estimatedTime: 15,
    targetAudience: "Reabilitação e Seniores",
    safetyNotes: "Nunca force uma articulação que apresente dor aguda ou estalidos persistentes.",
    exercises: [
      {
        id: "ex-05-01",
        name: "Extensão de Joelho Sentado com Isometria",
        reps: "12 de cada lado",
        description: "Sentado direito, estique uma perna à frente, contraia a coxa durante 3 segundos e desça lentamente.",
        safetyAlternative: "Se não conseguir dobrar o joelho para a posição inicial de 90 graus: comece com a perna ligeiramente mais esticada debaixo da cadeira e faça apenas uma amplitude curta de movimento confortável."
      },
      {
        id: "ex-05-02",
        name: "Abdução de Anca de Pé",
        reps: "15 de cada lado",
        description: "De pé, apoiado a uma mesa ou cadeira, afaste a perna lateralmente mantendo o corpo direito e contraindo o glúteo médio.",
        safetyAlternative: "Se tiver dificuldade em manter-se de pé, deite-se de lado numa superfície firme com a perna de baixo ligeiramente dobrada e levante a perna de cima."
      }
    ]
  },
  {
    id: "wk-06",
    title: "Iniciação às Máquinas de Força",
    description: "Circuito ideal de ginásio para quem está a começar a treinar com pesos guiados. As máquinas oferecem estabilidade e vetor seguro de movimento.",
    goal: "strength",
    location: "gym",
    impactLevel: "medium",
    estimatedTime: 40,
    targetAudience: "Iniciantes de Ginásio",
    safetyNotes: "Regule a máquina para as suas dimensões antes de colocar carga. Comece sempre com pesos leves.",
    exercises: [
      {
        id: "ex-06-01",
        name: "Prensa de Pernas Horizontal (Leg Press)",
        reps: "10-12 repetições",
        description: "Apoie as costas no encosto, coloque os pés na plataforma e empurre controlando a descida.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho para iniciar o movimento de prensa tradicional: ajuste o batente ou o banco da máquina para trás de modo a iniciar com as pernas mais estendidas (ângulo aberto de 120 graus em vez de 90) reduzindo a compressão patelar."
      },
      {
        id: "ex-06-02",
        name: "Puxada Alta ao Peito (Lat Pulldown)",
        reps: "12 repetições",
        description: "Sentado na máquina de puxada alta, agarre a barra à largura dos ombros e puxe em direção à parte superior do peito.",
        safetyAlternative: "Se tiver dor de ombro ou limitação de mobilidade superior, substitua pela máquina de Remo Sentado (Low Row) que trabalha as costas sem exigir elevação total dos braços."
      }
    ]
  },
  {
    id: "wk-07",
    title: "Mobilidade Funcional no Ginásio",
    description: "Aproveite os acessórios do ginásio (como rolos de espuma e elásticos) para libertar tensão muscular acumulada e expandir amplitudes articulares.",
    goal: "mobility",
    location: "gym",
    impactLevel: "low",
    estimatedTime: 20,
    targetAudience: "Geral",
    safetyNotes: "A libertação miofascial com rolo pode causar ligeiro desconforto, mas nunca deve causar dor insuportável.",
    exercises: [
      {
        id: "ex-07-01",
        name: "Auto-Massagem de Quadríceps com Foam Roller",
        duration: "2 minutos",
        description: "Deitado de barriga para baixo com as coxas sobre o rolo de espuma, deslize o corpo para a frente e para trás lentamente.",
        safetyAlternative: "Se tiver dificuldades em apoiar-se no chão para usar o rolo: faça uma auto-massagem sentado deslizando um rolo manual (ou uma garrafa de água rígida) diretamente sobre a coxa sem carregar o peso do corpo."
      },
      {
        id: "ex-07-02",
        name: "Abertura Torácica com Elástico (Pull-Apart)",
        reps: "15 repetições",
        description: "De pé, segure um elástico fino à frente com os braços esticados. Abra os braços puxando o elástico até tocar no peito.",
        safetyAlternative: "Se não conseguir elevar os ombros, faça o exercício com o elástico ancorado numa barra à altura da cintura, puxando os cotovelos junto às costelas."
      }
    ]
  },
  {
    id: "wk-08",
    title: "Circuito de Força e Densidade Óssea",
    description: "Exercícios multiarticulares focados no estímulo de osteogénese (fortalecimento ósseo) através de cargas axiais seguras e adaptáveis.",
    goal: "strength",
    location: "gym",
    impactLevel: "high",
    estimatedTime: 45,
    targetAudience: "Adultos / Prevenção de Osteopenia",
    safetyNotes: "Mantenha a coluna neutra e use uma cinta de treino se carregar pesos mais elevados.",
    exercises: [
      {
        id: "ex-08-01",
        name: "Peso Morto com Halteres (Deadlift)",
        reps: "8-10 repetições",
        description: "Com halteres nas mãos, dobre a bacia empurrando os glúteos para trás e descendo os halteres ao longo das coxas com costas direitas.",
        safetyAlternative: "Se tiver dor lombar crónica ou hérnia discal ativa, substitua pelo exercício de Ponte de Glúteos no chão com um halter leve sobre a bacia, que isola a musculatura sem comprimir a coluna."
      },
      {
        id: "ex-08-02",
        name: "Agachamento Caixa com Halteres (Box Squat)",
        reps: "10 repetições",
        description: "Com halteres ao lado do corpo, faça o agachamento até tocar levemente com os glúteos num banco de ginásio estável, subindo de seguida.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho ou sentir dor patelar intensa: ajuste a altura da caixa colocando discos de peso ou steps sobre o banco para subir o ponto de contacto. Isto reduz a amplitude mantendo o treino seguro e confortável."
      }
    ]
  },
  {
    id: "wk-09",
    title: "Alongamento com Cabos e Elásticos",
    description: "Aproveite a resistência contínua e suave das polias de cabos do ginásio para alongamentos e descompressão ativa de ombros e costas.",
    goal: "mobility",
    location: "gym",
    impactLevel: "low",
    estimatedTime: 20,
    targetAudience: "Geral",
    safetyNotes: "A tensão do cabo deve apoiar o movimento, nunca forçar uma posição desconfortável.",
    exercises: [
      {
        id: "ex-09-01",
        name: "Alongamento de Latíssimo na Polia Alta",
        duration: "1 minuto por braço",
        description: "Agarre o manípulo da polia alta com um braço, dê um passo atrás e incline o tronco para a frente, sentindo alongar toda a lateral do tronco.",
        safetyAlternative: "Se tiver limitação para levantar o braço acima da cabeça: ajuste a polia para a altura do peito, afaste-se e sinta o alongamento puxando o quadril para trás mantendo os braços horizontais."
      },
      {
        id: "ex-09-02",
        name: "Rotação Externa de Ombro com Elástico",
        reps: "12 de cada lado",
        description: "Com o cotovelo junto ao corpo dobrado a 90º, puxe o elástico para fora rodando o ombro de forma controlada.",
        safetyAlternative: "Se houver dor articular, faça o mesmo movimento de rotação livre sem elástico (sem resistência) focado apenas na lubrificação da articulação."
      }
    ]
  },
  {
    id: "wk-10",
    title: "Membros Superiores Guiados",
    description: "Fortalecimento completo de peito, costas e braços utilizando polias e aparelhos com guias físicas estabilizadoras.",
    goal: "strength",
    location: "gym",
    impactLevel: "medium",
    estimatedTime: 35,
    targetAudience: "Adultos / Seniores ativos",
    safetyNotes: "Evite esticar completamente os cotovelos (bloqueio articular) sob tensão pesada.",
    exercises: [
      {
        id: "ex-10-01",
        name: "Supino na Máquina Sentado (Chest Press)",
        reps: "12 repetições",
        description: "Sentado com costas bem apoiadas, empurre as pegas para a frente esticando os braços de forma controlada.",
        safetyAlternative: "Se o movimento à frente causar dor nos ombros, diminua a amplitude ajustando a cadeira mais à frente, ou utilize elásticos leves de resistência suave."
      },
      {
        id: "ex-10-02",
        name: "Abdução Horizontal na Polia (Crucifixo Inverso)",
        reps: "15 repetições",
        description: "Com polias médias cruzadas à frente, puxe os braços para os lados exercitando a musculatura postural das costas.",
        safetyAlternative: "Se tiver limitações de força bilateral, use um cabo de cada vez ou faça o mesmo movimento deitada de barriga para baixo num banco inclinado com halteres levíssimos."
      }
    ]
  },
  {
    id: "wk-11",
    title: "Despertar no Parque",
    description: "Comece o dia com movimentos fluidos de rotação articular, respiração profunda e ativação cardiovascular leve ao ar livre.",
    goal: "mobility",
    location: "outdoor",
    impactLevel: "low",
    estimatedTime: 15,
    targetAudience: "Seniores / Atividades de Grupo",
    safetyNotes: "Procure uma zona plana e com piso seco (relva curta ou pavimento liso) para evitar desequilíbrios.",
    exercises: [
      {
        id: "ex-11-01",
        name: "Rotação Circular de Quadril de Pé",
        duration: "1 minuto",
        description: "Com as mãos nas ancas e pés afastados, faça movimentos circulares lentos com a bacia nos dois sentidos.",
        safetyAlternative: "Se tiver prótese de anca recente ou dor severa no quadril: evite rotações amplas; faça pequenas básculas (inclinações) pélvicas para a frente e para trás, com apoio das mãos num banco ou corrimão."
      },
      {
        id: "ex-11-02",
        name: "Alongamento do Peito com Apoio no Banco",
        duration: "1 minuto",
        description: "Apoie uma mão no encosto de um banco de jardim e rode o tronco ligeiramente para o lado oposto para alongar o peitoral.",
        safetyAlternative: "Se os seus ombros forem muito rígidos, faça o movimento posicionando o braço ligeiramente mais abaixo do nível do peito."
      }
    ]
  },
  {
    id: "wk-12",
    title: "Calistenia de Rua Iniciante",
    description: "Use barras paralelas, corrimãos e o peso do próprio corpo para construir força real, promovendo um físico ágil em contacto com a natureza.",
    goal: "strength",
    location: "outdoor",
    impactLevel: "medium",
    estimatedTime: 30,
    targetAudience: "Jovens e Adultos",
    safetyNotes: "Experimente a firmeza das barras públicas antes de colocar o seu peso corporal total nelas.",
    exercises: [
      {
        id: "ex-12-01",
        name: "Australianas na Barra Baixa (Inverted Rows)",
        reps: "8-10 repetições",
        description: "Debaixo de uma barra à altura da cintura, deite-se olhando para cima, segure a barra e puxe o peito até ela mantendo o corpo reto.",
        safetyAlternative: "Se não houver barra baixa adequada ou for demasiado difícil, faça puxadas inclinadas segurando-se num corrimão vertical de jardim, inclinando o corpo para trás e puxando-se com os braços."
      },
      {
        id: "ex-12-02",
        name: "Subida de Steps no Banco de Jardim",
        reps: "10 de cada lado",
        description: "Coloque um pé firmemente num banco estável e suba, esticando a perna de apoio. Desça com segurança.",
        safetyAlternative: "Se não conseguir dobrar o joelho no ângulo alto necessário para subir o banco (ou se doer o joelho): faça a subida de degraus simples num degrau baixo de passeio (amplitude curta), ou realize agachamentos parciais (semi-agachamento a 30º) mantendo-se no chão plano com apoio das mãos."
      }
    ]
  },
  {
    id: "wk-13",
    title: "Corrida-Caminhada Intervalada",
    description: "Excelente treino híbrido para desenvolver a capacidade cardiorrespiratória e lubrificação articular dinâmica no parque.",
    goal: "strength",
    location: "outdoor",
    impactLevel: "medium",
    estimatedTime: 25,
    targetAudience: "Geral",
    safetyNotes: "Use calçado desportivo com bom amortecimento para proteger as articulações do impacto com o asfalto.",
    exercises: [
      {
        id: "ex-13-01",
        name: "Caminhada Activa Intervalada com Trote",
        duration: "20 minutos",
        description: "Intercale 2 minutos de caminhada rápida com 1 minuto de trote leve/corrida suave contínua.",
        safetyAlternative: "Se tiver desgaste nos joelhos (artrose) ou contraindicação médica para impacto: mantenha apenas a caminhada rápida (sem trote) e incline ligeiramente os braços ao andar para que o treino seja de baixo impacto cardíaco."
      },
      {
        id: "ex-13-02",
        name: "Lunge Parcial Dinâmico Estático",
        reps: "8 de cada lado",
        description: "Dê um passo em frente e flexione ligeiramente as pernas, mantendo o tronco vertical.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho ou perder o equilíbrio: posicione-se ao lado de um corrimão estável, faça um passo curto e incline-se muito suavemente (semi-lunge a 30 graus de flexão) ou substitua por pontapés suaves para trás contraindo o glúteo."
      }
    ]
  },
  {
    id: "wk-14",
    title: "Treino Funcional de Parque com Banco",
    description: "Uma sessão criativa utilizando os bancos públicos como ferramentas multiusos para treino de força e flexibilidade.",
    goal: "strength",
    location: "outdoor",
    impactLevel: "medium",
    estimatedTime: 20,
    targetAudience: "Adultos ativos",
    safetyNotes: "Garanta que o banco está seco e livre de folhas ou areias que possam escorregar.",
    exercises: [
      {
        id: "ex-14-01",
        name: "Dips de Tríceps no Assento",
        reps: "10-12 repetições",
        description: "Apoie as mãos na borda do banco de costas para ele, estique as pernas à frente e dobre os cotovelos descendo o quadril.",
        safetyAlternative: "Se tiver dor nos ombros ou pulsos frágeis, apoie-se de frente para o banco e faça flexões inclinadas no assento, que causam menos pressão na articulação do ombro."
      },
      {
        id: "ex-14-02",
        name: "Agachamento Isométrico Assistido",
        duration: "40 segundos",
        description: "Posicione-se em frente ao banco de jardim, dobre os joelhos imitando o agachamento até quase tocar no assento e segure a posição.",
        safetyAlternative: "Se não conseguir dobrar totalmente o joelho ou sentir desconforto patelar: mantenha o quadril bem acima do nível do banco, reduzindo o agachamento para um ângulo confortável de no máximo 45º, ou segure firme com as mãos nas laterais do banco para retirar o peso corporal das pernas."
      }
    ]
  },
  {
    id: "wk-15",
    title: "Flow de Yoga Suave na Relva",
    description: "Sessão restauradora de alongamentos estáticos e dinâmicos para equilibrar corpo e mente ao ar livre.",
    goal: "mobility",
    location: "outdoor",
    impactLevel: "low",
    estimatedTime: 20,
    targetAudience: "Geral / Seniores",
    safetyNotes: "Pode usar um tapete de yoga ou uma toalha grossa para maior conforto sobre a relva.",
    exercises: [
      {
        id: "ex-15-01",
        name: "Postura da Árvore Adaptada (Vrikshasana)",
        duration: "30 segundos por lado",
        description: "De pé, coloque a planta do pé esquerdo no interior do tornozelo direito, mantendo o equilíbrio.",
        safetyAlternative: "Se perder o equilíbrio facilmente, mantenha a ponta do dedo grande do pé esquerdo em contacto constante com o chão para estabilizar ou apoie uma mão suavemente num tronco de árvore ou banco."
      },
      {
        id: "ex-15-02",
        name: "Alongamento Guerreiro II Amplo",
        duration: "1 minuto",
        description: "Afaste as pernas, rode o pé direito a 90º e dobre ligeiramente o joelho direito, esticando os braços na horizontal.",
        safetyAlternative: "Se doer o joelho ao fletir ou se não conseguir dobrá-lo: mantenha ambas as pernas praticamente esticadas, abrindo menos a passada, focado apenas no alongamento dos adutores e na respiração torácica."
      }
    ]
  }
];
