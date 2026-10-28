# Plan de Implementación: 003 - Usuarios

1. **Base de Datos:** Tabla `users` con `id`, `email`, `password_hash`, `role` (alumno/coach).
2. **Componentes UI:** `LoginForm.tsx`, `RegisterForm.tsx`.
3. **Seguridad:** Integración de librería de hash de contraseñas y middleware de autenticación.