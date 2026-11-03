# ProAim Esports Academy

Landing page y catálogo inicial de entrenamiento competitivo para Valorant,
Counter-Strike 2 y Delta Force. La interfaz está construida con Next.js App
Router, React y Tailwind CSS, y aplica la identidad visual de ProAim.

## Alcance actual

- Landing page oscura y adaptable a móviles y escritorio.
- Catálogo de muestra con filtros combinables por juego, rol, tipo de servicio
  y texto de búsqueda.
- Panel de métricas de ejemplo, módulos de práctica táctica y comparador
  interactivo de sensibilidad y DPI.
- Estado vacío con opción para restablecer los filtros.
- Vista de detalles que informa que la disponibilidad y los valores requieren
  conectar el sistema de reservas.

Los servicios se definen en `src/lib/services.ts`; son datos de muestra, no se
consultan desde una base de datos. No están implementados el registro e inicio
de sesión, las reservas persistentes, los pagos, el panel de usuario ni las
reseñas. No se debe presentar la disponibilidad o los precios como confirmados.

## Requisitos

- Node.js compatible con Next.js 16.
- npm.

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Validación

```bash
npm run lint
npm run build
```

## Despliegue en Vercel

Importa el repositorio en Vercel y conserva la configuración detectada para
Next.js. El proyecto usa los comandos estándar `npm run build` y `npm run start`
y, para la interfaz actual, no requiere variables de entorno.

Antes de habilitar reservas, autenticación o pagos en producción, integra y
configura los proveedores correspondientes, valida los endpoints del lado del
servidor y guarda sus credenciales en las variables de entorno de Vercel.
