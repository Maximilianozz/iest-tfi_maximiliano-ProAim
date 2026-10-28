# Especificación: 002 - Reserva de Turnos para Coaching

## 1. Contexto y Objetivos
Permitir a los alumnos seleccionar un coach, una fecha y una hora disponible para agendar una sesión de entrenamiento personalizada.

## 2. Historias de Usuario
- Como usuario, quiero seleccionar un día y horario en un calendario para reservar mi sesión de coaching sin solapar horarios.

## 3. Requisitos en Notación EARS
- **Ubiquitous:** El sistema siempre debe validar la disponibilidad del coach en tiempo real antes de confirmar la reserva.
- **Event-driven:** Cuando el usuario confirme la reserva, el sistema enviará una notificación con el enlace de la reunión.
- **State-driven:** Mientras el horario seleccionado esté ocupado, el botón de reserva permanecerá deshabilitado.

## 4. Criterios de Finalización (Definition of Done)
- [ ] Calendario interactivo integrado en el frontend.
- [ ] Validación de disponibilidad contra la base de datos.
- [ ] Tests unitarios en verde para el flujo de reserva.