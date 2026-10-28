# Plan de Implementación: 001 - Catálogo

1. **Diseño de Datos:** Crear la estructura de mock/tabla `services` con campos: `id`, `title`, `game`, `role`, `price`, `image`.
2. **Componentes UI:**
   - `FilterBar.tsx`: Selectores de videojuego y rol con estilos de marca.
   - `ServiceCard.tsx`: Tarjeta responsiva para mostrar cada servicio.
   - `CatalogGrid.tsx`: Grilla contenedora con estados de carga y lista vacía.
3. **Pruebas:** Redactar tests unitarios para verificar el filtrado correcto en `Catalog.test.tsx`.