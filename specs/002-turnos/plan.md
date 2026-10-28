# Plan de Implementación: 002 - Turnos

1. **Modelo de Datos:** Tabla `bookings` con `id`, `user_id`, `coach_id`, `datetime`, `status`.
2. **Componentes UI:** `CalendarPicker.tsx`, `TimeSlotSelector.tsx`, `BookingSummary.tsx`.
3. **Lógica Backend:** Endpoint API en Next.js para procesar la reserva y validar colisiones de horario.