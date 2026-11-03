export const games = [
  "Valorant",
  "Counter-Strike 2",
  "Delta Force",
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
  "Entry fragger",
  "Iniciador",
  "Controlador",
  "Centinela",
  "Rifler",
  "Sniper",
  "Soporte",
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
    id: "cs2-replay",
    title: "Análisis de demo",
    game: "Counter-Strike 2",
    role: "Rifler",
    category: "Análisis de replay",
    summary:
      "Revisa tus duelos, uso de utilidad y decisiones ronda a ronda.",
    duration: "Revisión diferida",
    format: "Análisis personalizado",
    code: "PA-003",
  },
  {
    id: "delta-force-coaching",
    title: "Coaching de combate",
    game: "Delta Force",
    role: "Sniper",
    category: "Coaching 1 a 1",
    summary:
      "Entrena puntería, posicionamiento y control del retroceso en combate.",
    duration: "60 minutos",
    format: "Sesión en vivo",
    code: "PA-004",
  },
  {
    id: "cs2-training",
    title: "Entrenamiento de precisión",
    game: "Counter-Strike 2",
    role: "Entry fragger",
    category: "Plan mensual",
    summary:
      "Una rutina para mejorar microajustes, primer disparo y consistencia.",
    duration: "Plan mensual",
    format: "Entrenamiento guiado",
    code: "PA-005",
  },
  {
    id: "delta-force-replay",
    title: "Análisis de combate",
    game: "Delta Force",
    role: "Soporte",
    category: "Análisis de replay",
    summary:
      "Identifica oportunidades para mejorar tu seguimiento de objetivos y juego en equipo.",
    duration: "Revisión diferida",
    format: "Análisis personalizado",
    code: "PA-006",
  },
  {
    id: "team-bootcamp",
    title: "Bootcamp táctico",
    game: "Valorant",
    role: "Equipo",
    category: "Bootcamp de equipo",
    summary:
      "Alinea estrategias, comunicación y roles para competir mejor como equipo.",
    duration: "A medida",
    format: "Entrenamiento grupal",
    code: "PA-007",
  },
  {
    id: "cs2-recoil",
    title: "Control de recoil",
    game: "Counter-Strike 2",
    role: "Rifler",
    category: "Coaching 1 a 1",
    summary: "Practica patrones de spray y transferencia entre objetivos.",
    duration: "60 minutos",
    format: "Sesión en vivo",
    code: "PA-008",
  },
];
