"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  games,
  serviceCategories,
  serviceRoles,
  services,
  type CategoryFilter,
  type CoachingService,
  type Game,
  type GameFilter,
} from "@/lib/services";

type PerformanceMetrics = {
  accuracy: number;
  reactionTime: number;
  recoilControl: number;
};

type TrainingModule = {
  id: string;
  title: string;
  game: Game | "Todos los juegos";
  level: string;
  duration: string;
  summary: string;
  drills: string[];
};

type SensitivitySettings = Record<Game, { dpi: string; sensitivity: string }>;

const performanceByGame: Record<Game, PerformanceMetrics> = {
  Valorant: { accuracy: 68, reactionTime: 224, recoilControl: 72 },
  "Counter-Strike 2": { accuracy: 64, reactionTime: 238, recoilControl: 78 },
  "Delta Force": { accuracy: 71, reactionTime: 216, recoilControl: 66 },
};

const trainingModules: TrainingModule[] = [
  {
    id: "flicks",
    title: "Flicks y microajustes",
    game: "Todos los juegos",
    level: "Fundamentos",
    duration: "12 min",
    summary:
      "Mejora la adquisición de objetivos y termina cada flick con un microajuste controlado.",
    drills: ["Adquisición de objetivos", "Flick y confirmación", "Precisión bajo presión"],
  },
  {
    id: "tracking",
    title: "Tracking y seguimiento",
    game: "Delta Force",
    level: "Intermedio",
    duration: "15 min",
    summary:
      "Mantén la mira sobre objetivos en movimiento y aprende a anticipar sus cambios de dirección.",
    drills: ["Seguimiento horizontal", "Cambios de velocidad", "Control de distancia"],
  },
  {
    id: "recoil",
    title: "Control de recoil",
    game: "Counter-Strike 2",
    level: "Intermedio",
    duration: "18 min",
    summary:
      "Practica el contramovimiento de la mira para sostener sprays y transferir entre objetivos.",
    drills: ["Patrones de spray", "Ráfagas controladas", "Transferencia de objetivo"],
  },
  {
    id: "crosshair",
    title: "Colocación de mira",
    game: "Valorant",
    level: "Táctico",
    duration: "10 min",
    summary:
      "Anticipa ángulos y mantén la mira a la altura adecuada mientras despejas espacios.",
    drills: ["Despeje de ángulos", "Altura de cabeza", "Pre-aim en movimiento"],
  },
];

const initialSensitivity: SensitivitySettings = {
  Valorant: { dpi: "800", sensitivity: "0.35" },
  "Counter-Strike 2": { dpi: "800", sensitivity: "1" },
  "Delta Force": { dpi: "800", sensitivity: "5" },
};

function ArrowIcon({ diagonal = false }: { diagonal?: boolean }) {
  return diagonal ? (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M5 15 15 5M6 5h9v9" />
    </svg>
  ) : (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3 10h13m-5-5 5 5-5 5" />
    </svg>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  );
}

function ServiceCard({
  service,
  onSelect,
}: {
  service: CoachingService;
  onSelect: (service: CoachingService) => void;
}) {
  return (
    <article
      className={`service-card service-card--${service.game === "Valorant" ? "valorant" : service.game === "Counter-Strike 2" ? "cs2" : "delta-force"}`}
    >
      <div className="service-art">
        <div className="service-art__top">
          <span className="game-tag">{service.game}</span>
          <span className="service-code">{service.code}</span>
        </div>
        <div className="art-shape" aria-hidden="true">
          <span className="art-shape__ring" />
          <span className="art-shape__core" />
          <span className="art-shape__line" />
        </div>
        <span className="service-art__bottom">{service.format}</span>
      </div>
      <div className="service-card__body">
        <div className="service-card__meta">
          <span>{service.category}</span>
          <span>{service.role}</span>
        </div>
        <h3>{service.title}</h3>
        <p>{service.summary}</p>
        <div className="service-card__footer">
          <span>{service.duration}</span>
          <button
            type="button"
            className="text-link"
            onClick={() => onSelect(service)}
            aria-label={`Ver detalles de ${service.title} para ${service.game}`}
          >
            Ver detalles <ArrowIcon diagonal />
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProAimHome() {
  const [selectedGame, setSelectedGame] = useState<GameFilter>("Todos");
  const [selectedRole, setSelectedRole] = useState("Todos");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Todos");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedService, setSelectedService] =
    useState<CoachingService | null>(null);
  const [performanceGame, setPerformanceGame] = useState<Game>("Valorant");
  const [activeModuleId, setActiveModuleId] = useState(trainingModules[0].id);
  const [sensitivity, setSensitivity] =
    useState<SensitivitySettings>(initialSensitivity);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedService && dialog && !dialog.open) {
      dialog.showModal();
    }
  }, [selectedService]);

  const filteredServices = useMemo(() => {
    const query = search.trim().toLowerCase();

    return services.filter((service) => {
      const matchesGame =
        selectedGame === "Todos" || service.game === selectedGame;
      const matchesRole =
        selectedRole === "Todos" || service.role === selectedRole;
      const matchesCategory =
        selectedCategory === "Todos" ||
        service.category === selectedCategory;
      const matchesSearch =
        !query ||
        `${service.title} ${service.game} ${service.role} ${service.summary}`
          .toLowerCase()
          .includes(query);

      return matchesGame && matchesRole && matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory, selectedGame, selectedRole]);

  const activeModule =
    trainingModules.find((module) => module.id === activeModuleId) ??
    trainingModules[0];
  const activeMetrics = performanceByGame[performanceGame];

  function updateSensitivity(
    game: Game,
    field: "dpi" | "sensitivity",
    value: string,
  ) {
    setSensitivity((current) => ({
      ...current,
      [game]: { ...current[game], [field]: value },
    }));
  }

  function resetFilters() {
    setSelectedGame("Todos");
    setSelectedRole("Todos");
    setSelectedCategory("Todos");
    setSearch("");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <main>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#inicio" onClick={closeMenu} aria-label="ProAim, ir al inicio">
            <BrandMark />
            <span className="brand-copy">
              <strong>PRO<span>AIM</span></strong>
              <small>ESPORTS ACADEMY</small>
            </span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>

          <nav className={`main-nav${menuOpen ? " main-nav--open" : ""}`} aria-label="Navegación principal">
            <a href="#metricas" onClick={closeMenu}>Métricas</a>
            <a href="#modulos" onClick={closeMenu}>Entrenamiento</a>
            <a href="#sensibilidad" onClick={closeMenu}>Sensibilidad</a>
            <a href="#servicios" onClick={closeMenu}>Servicios</a>
            <a className="nav-cta" href="#servicios" onClick={closeMenu}>
              Empieza a entrenar <ArrowIcon diagonal />
            </a>
          </nav>
        </div>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> ACADEMIA DE ALTO RENDIMIENTO</p>
            <h1>
              Tu siguiente
              <br />
              <span className="text-gradient">rango empieza</span>
              <br />
              acá<span className="hero-period">.</span>
            </h1>
            <p className="hero-description">
              Entrena con estrategia. Analiza cada partida. Convierte tu
              potencial en resultados dentro del juego.
            </p>
            <div className="hero-actions">
              <a className="button button--primary" href="#servicios">
                Explorar servicios <ArrowIcon />
              </a>
              <a className="button button--quiet" href="#metodo">
                Conoce el método
              </a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true">
                <span>P</span><span>A</span><span>+</span>
              </div>
              <p><strong>Entrenamiento con propósito</strong><br />Para jugadores que quieren avanzar.</p>
            </div>
          </div>

          <div
            className="hero-visual"
            role="img"
            aria-label="Ilustración abstracta de una mira de precisión"
          >
            <div className="visual-orbit visual-orbit--outer" />
            <div className="visual-orbit visual-orbit--inner" />
            <div className="visual-crosshair">
              <span className="crosshair-line crosshair-line--top" />
              <span className="crosshair-line crosshair-line--right" />
              <span className="crosshair-line crosshair-line--bottom" />
              <span className="crosshair-line crosshair-line--left" />
              <span className="crosshair-core" />
            </div>
            <span className="visual-label visual-label--top">AIM / 001</span>
            <span className="visual-label visual-label--bottom">FOCUS ON THE NEXT</span>
            <span className="visual-coordinates">-34.6037°<br />-58.3816°</span>
            <span className="visual-spark visual-spark--one" />
            <span className="visual-spark visual-spark--two" />
          </div>
        </div>
        <a className="scroll-cue" href="#servicios">
          <span /> DESLIZA PARA DESCUBRIR
        </a>
      </section>

      <section className="game-strip" aria-label="Juegos disponibles">
        <p>ENTRENA EN TU JUEGO</p>
        <div className="game-strip__items">
          {games.map((game, index) => (
            <span key={game}><i>0{index + 1}</i>{game}</span>
          ))}
        </div>
      </section>

      <section className="performance-section section-shell" id="metricas">
        <div className="section-heading">
          <div>
            <p className="eyebrow">MIDE. AJUSTA. REPITE. <span className="eyebrow-line" /></p>
            <h2>Tu rendimiento, <span className="text-gradient">en foco.</span></h2>
          </div>
          <p className="section-intro">
            Sigue indicadores clave de puntería y explora cómo cambian según el juego.
          </p>
        </div>
        <div className="performance-panel">
          <div className="performance-panel__header">
            <div>
              <span className="panel-kicker">RESUMEN DE RENDIMIENTO</span>
              <p>Selecciona un juego para ver sus métricas de ejemplo.</p>
            </div>
            <div className="game-switcher" role="group" aria-label="Juego para las métricas">
              {games.map((game) => (
                <button
                  type="button"
                  key={game}
                  className={performanceGame === game ? "game-switcher__active" : ""}
                  aria-pressed={performanceGame === game}
                  onClick={() => setPerformanceGame(game)}
                >
                  {game}
                </button>
              ))}
            </div>
          </div>
          <div className="metric-grid" aria-live="polite">
            <article className="metric-card">
              <div className="metric-card__top"><span>Precisión</span><span className="metric-indicator">01 / AIM</span></div>
              <strong>{activeMetrics.accuracy}<small>%</small></strong>
              <div className="metric-track" role="progressbar" aria-label={`Precisión en ${performanceGame}`} aria-valuenow={activeMetrics.accuracy} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${activeMetrics.accuracy}%` }} />
              </div>
              <p>Impactos acertados en el ejercicio</p>
            </article>
            <article className="metric-card">
              <div className="metric-card__top"><span>Tiempo de reacción</span><span className="metric-indicator">02 / REACT</span></div>
              <strong>{activeMetrics.reactionTime}<small> ms</small></strong>
              <div className="metric-track metric-track--reaction" role="img" aria-label={`Tiempo de reacción de ejemplo: ${activeMetrics.reactionTime} milisegundos`}>
                <span style={{ width: `${Math.min(100, (activeMetrics.reactionTime / 350) * 100)}%` }} />
              </div>
              <p>Promedio de respuesta al objetivo</p>
            </article>
            <article className="metric-card">
              <div className="metric-card__top"><span>Control de recoil</span><span className="metric-indicator">03 / CONTROL</span></div>
              <strong>{activeMetrics.recoilControl}<small>%</small></strong>
              <div className="metric-track" role="progressbar" aria-label={`Control de recoil en ${performanceGame}`} aria-valuenow={activeMetrics.recoilControl} aria-valuemin={0} aria-valuemax={100}>
                <span style={{ width: `${activeMetrics.recoilControl}%` }} />
              </div>
              <p>Estabilidad durante el patrón de disparo</p>
            </article>
          </div>
          <p className="demo-disclaimer">DATOS DE EJEMPLO · Se reemplazarán por métricas reales al conectar el sistema de entrenamiento.</p>
        </div>
      </section>

      <section className="catalog section-shell" id="servicios">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ENTRENAMIENTO A TU MEDIDA <span className="eyebrow-line" /></p>
            <h2>Elige tu próxima <span className="text-gradient">ventaja.</span></h2>
          </div>
          <p className="section-intro">
            Cada jugador es distinto. Encuentra el formato que mejor se adapta
            a tu objetivo.
          </p>
        </div>

        <div className="catalog-controls">
          <div className="game-filters" role="group" aria-label="Filtrar por videojuego">
            {(["Todos", ...games] as GameFilter[]).map((game) => (
              <button
                type="button"
                key={game}
                className={`filter-chip${selectedGame === game ? " filter-chip--active" : ""}`}
                aria-pressed={selectedGame === game}
                onClick={() => setSelectedGame(game)}
              >
                {game === "Todos" ? "Todos los juegos" : game}
              </button>
            ))}
          </div>
          <div className="filter-fields">
            <label className="search-field">
              <span className="visually-hidden">Buscar servicio</span>
              <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="m13 13 4 4" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar servicio..."
              />
            </label>
            <label className="select-field">
              <span className="visually-hidden">Filtrar por rol</span>
              <select
                value={selectedRole}
                onChange={(event) => setSelectedRole(event.target.value)}
              >
                {serviceRoles.map((role) => (
                  <option value={role} key={role}>
                    {role === "Todos" ? "Todos los roles" : role}
                  </option>
                ))}
              </select>
              <span aria-hidden="true">⌄</span>
            </label>
          </div>
        </div>

        <div className="category-filters" role="group" aria-label="Filtrar por tipo de servicio">
          {serviceCategories.map((category) => (
            <button
              type="button"
              key={category}
              className={`category-chip${selectedCategory === category ? " category-chip--active" : ""}`}
              aria-pressed={selectedCategory === category}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="results-caption" aria-live="polite">
          <span>{filteredServices.length} {filteredServices.length === 1 ? "servicio" : "servicios"}</span>
          {(selectedGame !== "Todos" ||
            selectedRole !== "Todos" ||
            selectedCategory !== "Todos" ||
            search) && (
            <button className="clear-filters" type="button" onClick={resetFilters}>
              Limpiar filtros
            </button>
          )}
        </div>

        {filteredServices.length > 0 ? (
          <div className="service-grid">
            {filteredServices.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={setSelectedService}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <span className="empty-state__mark"><BrandMark /></span>
            <h3>No encontramos ese entrenamiento.</h3>
            <p>Prueba con otros filtros para descubrir más opciones.</p>
            <button className="button button--secondary" type="button" onClick={resetFilters}>
              Ver todos los servicios
            </button>
          </div>
        )}
      </section>

      <section className="training-section" id="modulos">
        <div className="section-shell">
          <div className="section-heading">
            <div>
              <p className="eyebrow">ENTRENA CON INTENCIÓN <span className="eyebrow-line" /></p>
              <h2>Módulos para jugar <span className="text-gradient">mejor.</span></h2>
            </div>
            <p className="section-intro">
              Rutinas tácticas para desarrollar precisión, control y lectura del combate.
            </p>
          </div>
          <div className="training-layout">
            <div className="module-list" role="group" aria-label="Módulos de entrenamiento">
              {trainingModules.map((module, index) => (
                <button
                  type="button"
                  aria-pressed={activeModuleId === module.id}
                  className={`module-option${activeModuleId === module.id ? " module-option--active" : ""}`}
                  key={module.id}
                  onClick={() => setActiveModuleId(module.id)}
                >
                  <span className="module-option__number">0{index + 1}</span>
                  <span className="module-option__title">{module.title}</span>
                  <ArrowIcon diagonal />
                </button>
              ))}
            </div>
            <article
              className="module-detail"
              aria-live="polite"
            >
              <div className="module-detail__top">
                <span className="game-tag">{activeModule.game}</span>
                <span className="module-duration">{activeModule.duration}</span>
              </div>
              <p className="eyebrow">{activeModule.level} <span className="eyebrow-line" /></p>
              <h3>{activeModule.title}</h3>
              <p className="module-detail__summary">{activeModule.summary}</p>
              <h4>EN ESTA RUTINA</h4>
              <ul>
                {activeModule.drills.map((drill, index) => (
                  <li key={drill}><span>0{index + 1}</span>{drill}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="sensitivity-section section-shell" id="sensibilidad">
        <div className="section-heading">
          <div>
            <p className="eyebrow">ENCUENTRA TU CONFIGURACIÓN <span className="eyebrow-line" /></p>
            <h2>Una referencia. <span className="text-gradient">Tres juegos.</span></h2>
          </div>
          <p className="section-intro">
            Compara tus ajustes y calcula el eDPI de cada juego desde un mismo panel.
          </p>
        </div>
        <div className="sensitivity-panel">
          <div className="sensitivity-panel__intro">
            <div>
              <span className="panel-kicker">COMPARADOR DE SENSIBILIDAD</span>
              <p>Valores de ejemplo editables: ingresa tu DPI y sensibilidad en cada juego.</p>
            </div>
            <span className="sensitivity-badge"><span className="status-dot" /> CALCULADORA INTERACTIVA</span>
          </div>
          <div className="sensitivity-grid">
            {games.map((game) => {
              const dpi = Number(sensitivity[game].dpi);
              const gameSensitivity = Number(sensitivity[game].sensitivity);
              const effectiveDpi =
                Number.isFinite(dpi) &&
                Number.isFinite(gameSensitivity) &&
                dpi > 0 &&
                dpi <= 32000 &&
                gameSensitivity >= 0.01 &&
                gameSensitivity <= 20
                  ? Math.round(dpi * gameSensitivity * 100) / 100
                  : null;

              return (
                <article className="sensitivity-card" key={game}>
                  <div className="sensitivity-card__header">
                    <span className="game-tag">{game}</span>
                    <span className="service-code">CONFIG / {games.indexOf(game) + 1}</span>
                  </div>
                  <div className="sensitivity-inputs">
                    <label>
                      <span>DPI</span>
                      <input
                        type="number"
                        min="100"
                        max="32000"
                        step="100"
                        inputMode="numeric"
                        value={sensitivity[game].dpi}
                        onChange={(event) => updateSensitivity(game, "dpi", event.target.value)}
                        aria-label={`DPI para ${game}`}
                      />
                    </label>
                    <label>
                      <span>Sensibilidad</span>
                      <input
                        type="number"
                        min="0.01"
                        max="20"
                        step="0.01"
                        value={sensitivity[game].sensitivity}
                        onChange={(event) => updateSensitivity(game, "sensitivity", event.target.value)}
                        aria-label={`Sensibilidad en ${game}`}
                      />
                    </label>
                  </div>
                  <div className="edpi-result">
                    <span>eDPI <span aria-hidden="true">= DPI × sens.</span></span>
                    <strong aria-live="polite">{effectiveDpi === null ? "—" : String(effectiveDpi)}</strong>
                  </div>
                </article>
              );
            })}
          </div>
          <p className="sensitivity-note">
            El eDPI es una referencia de comparación dentro de cada juego. No
            representa una equivalencia exacta entre títulos, ya que cada uno
            interpreta la sensibilidad de forma distinta.
          </p>
        </div>
      </section>

      <section className="method-section" id="metodo">
        <div className="section-shell method-layout">
          <div className="method-copy">
            <p className="eyebrow">MENOS IMPROVISACIÓN. MÁS PROGRESO. <span className="eyebrow-line" /></p>
            <h2>La diferencia está en <span className="text-gradient">cómo entrenas.</span></h2>
            <p>
              Subir de rango no es cuestión de jugar más horas. Es entender qué
              mejorar y practicar con intención.
            </p>
            <a className="text-link method-link" href="#servicios">
              Encuentra tu entrenamiento <ArrowIcon />
            </a>
          </div>
          <ol className="method-steps">
            <li>
              <span className="step-number">01</span>
              <div><h3>Detecta tu objetivo</h3><p>Elige el rol, habilidad o aspecto del juego que quieres trabajar.</p></div>
              <span className="step-arrow"><ArrowIcon diagonal /></span>
            </li>
            <li>
              <span className="step-number">02</span>
              <div><h3>Entrena con estrategia</h3><p>Aplica una metodología pensada para tu nivel y tu forma de jugar.</p></div>
              <span className="step-arrow"><ArrowIcon diagonal /></span>
            </li>
            <li>
              <span className="step-number">03</span>
              <div><h3>Revisa tu progreso</h3><p>Transforma cada partida en información útil para tu siguiente paso.</p></div>
              <span className="step-arrow"><ArrowIcon diagonal /></span>
            </li>
          </ol>
        </div>
      </section>

      <section className="academy-section section-shell" id="academia">
        <div className="academy-card">
          <div className="academy-card__glow" aria-hidden="true" />
          <div className="academy-card__content">
            <p className="eyebrow">PROAIM ESPORTS ACADEMY</p>
            <h2>Del nivel amateur al <span className="text-gradient">rendimiento profesional.</span></h2>
            <p>
              Una academia para quienes se toman en serio su evolución
              competitiva.
            </p>
            <a className="button button--primary" href="#servicios">
              Encuentra tu entrenamiento <ArrowIcon />
            </a>
          </div>
          <div className="academy-card__mark" aria-hidden="true">
            <BrandMark />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-inner">
          <a className="brand" href="#inicio" aria-label="ProAim, volver al inicio">
            <BrandMark />
            <span className="brand-copy">
              <strong>PRO<span>AIM</span></strong>
              <small>ESPORTS ACADEMY</small>
            </span>
          </a>
          <p>Del nivel amateur al rendimiento profesional.</p>
          <span className="footer-copyright">© 2026 PROAIM ACADEMY</span>
        </div>
      </footer>

      {selectedService && (
        <dialog
          ref={dialogRef}
          className="dialog-backdrop"
          aria-labelledby="dialog-title"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
          onClose={() => setSelectedService(null)}
        >
          <section className="service-dialog">
            <button
              type="button"
              className="dialog-close"
              onClick={() => dialogRef.current?.close()}
              aria-label="Cerrar detalles"
            >
              ×
            </button>
            <p className="eyebrow">{selectedService.game} <span className="eyebrow-line" /></p>
            <h2 id="dialog-title">{selectedService.title}</h2>
            <p>{selectedService.summary}</p>
            <dl className="dialog-details">
              <div><dt>Formato</dt><dd>{selectedService.format}</dd></div>
              <div><dt>Especialidad</dt><dd>{selectedService.role}</dd></div>
              <div><dt>Duración</dt><dd>{selectedService.duration}</dd></div>
            </dl>
            <p className="dialog-notice">
              La disponibilidad y los valores se habilitarán al conectar el
              sistema de reservas.
            </p>
            <button
              type="button"
              className="button button--secondary dialog-action"
              onClick={() => dialogRef.current?.close()}
            >
              Volver al catálogo
            </button>
          </section>
        </dialog>
      )}
    </main>
  );
}
