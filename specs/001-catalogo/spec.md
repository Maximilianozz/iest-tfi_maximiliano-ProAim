# Especificación: 001 - Catálogo Interactivo de Servicios

## 1. Contexto y Objetivos
Permitir a los usuarios visualizar, buscar y filtrar los servicios de coaching disponibles en ProAim según videojuego y rol, cumpliendo con un diseño responsivo y accesible.

## 2. Historias de Usuario
- Como usuario aspirante a pro-player, quiero filtrar los servicios de coaching por videojuego y rol para encontrar rápidamente el entrenamiento que necesito.

## 3. Requisitos en Notación EARS
- **Ubicuous:** El sistema siempre debe mostrar la lista de servicios actualizados desde la base de datos.
- **Event-driven:** Cuando el usuario seleccione un filtro de videojuego o rol, el sistema deberá actualizar la vista del catálogo instantáneamente sin recargar la página.
- **State-driven:** Mientras la consulta esté en proceso, el sistema mostrará un indicador de carga (skeleton loader).
- **Optional:** Si no se encuentran resultados para los filtros seleccionados, el sistema mostrará un mensaje claro sugiriendo restablecer los filtros.

## 4. Criterios de Finalización (Definition of Done)
- [ ] Componente de catálogo renderizado en Next.js con Tailwind CSS.
- [ ] Filtros funcionales por videojuego y rol.
- [ ] Tests unitarios en verde (`npm test`).
- [ ] Sin colores incrustados (uso exclusivo de variables CSS de la marca).