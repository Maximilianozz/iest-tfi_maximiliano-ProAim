export const games = [
  "Valorant",
  "League of Legends",
  "Counter-Strike 2",
] as const;

export type Game = (typeof games)[number];
export type GameFilter = Game | "Todos";
export type ServiceCategory =
  | "Coaching 1 a 1"
  | "Análisis de replay"
  | "Plan mensual"
  | "Bootcamp de equipo";
export type CategoryFilter = ServiceCategory | "Todos";

export interface CoachingService {
  id: string;
  title: string;
  game: Game;
  role: string;
  category: ServiceCategory;
  summary: string;
  duration: string;
  format: string;
  code: string;
}

export const serviceCategories: CategoryFilter[] = [
  "Todos",
  "Coaching 1 a 1",
  "Análisis de replay",
  "Plan mensual",
  "Bootcamp de equipo",
];

export const serviceRoles = [
  "Todos",
  "Duelista",
  "Iniciador",
  "Mid laner",
  "Jungla",
  "Rifler",
  "Equipo",
] as const;

export const services: CoachingService[] = [
  {
    id: "valorant-coaching",
    title: "Coaching 1 a 1",
    game: "Valorant",
    role: "Duelista",
    category: "Coaching 1 a 1",
    summary:
      "Trabaja tu aim, posicionamiento y toma de decisiones en una sesión individual.",
    duration: "60 minutos",
    format: "Sesión en vivo",
    code: "PA-001",
  },
  {
    id: "valorant-replay",
    title: "Análisis de replay",
    game: "Valorant",
    role: "Iniciador",
    category: "Análisis de replay",
    summary:
      "Detecta oportunidades de mejora ronda a ronda con una revisión guiada de tu partida.",
    duration: "Revisión diferida",
    format: "Análisis personalizado",
    code: "PA-002",
  },
  {
    id: "league-replay",
    title: "Review de partida",
    game: "League of Legends",
    role: "Mid laner",
    category: "Análisis de replay",
    summary:
      "Analiza tus decisiones, control de oleadas y presencia en el mapa.",
    duration: "Revisión diferida",
    format: "Análisis personalizado",
    code: "PA-003",
  },
  {
    id: "league-coaching",
    title: "Coaching de rol",
    game: "League of Legends",
    role: "Jungla",
    category: "Coaching 1 a 1",
    summary:
      "Ordena tus rutas y mejora la lectura de objetivos con entrenamiento focalizado.",
    duration: "60 minutos",
    format: "Sesión en vivo",
    code: "PA-004",
  },
  {
    id: "cs2-training",
    title: "Plan de entrenamiento",
    game: "Counter-Strike 2",
    role: "Rifler",
    category: "Plan mensual",
    summary:
      "Una rutina estructurada para trabajar mecánicas, consistencia y toma de espacio.",
    duration: "Plan mensual",
    format: "Entrenamiento guiado",
    code: "PA-005",
  },
  {
    id: "team-bootcamp",
    title: "Bootcamp para equipos",
    game: "Valorant",
    role: "Equipo",
    category: "Bootcamp de equipo",
    summary:
      "Alinea estrategias, comunicación y roles para competir mejor como equipo.",
    duration: "A medida",
    format: "Entrenamiento grupal",
    code: "PA-006",
  },
];
