# 10 - Políticas de Seguridad

## Manejo de Datos Sensibles
* **Contraseñas**: Encriptadas mediante algoritmos Hash seguros (BCrypt / Argon2) antes de almacenarse.
* **Tokens de Sesión**: Manejados mediante cookies `HTTPOnly` e `JWT` de corta duración.

## Variables de Entorno (`.env.local`)
Las siguientes credenciales **NUNCA** deben subirse al repositorio público de GitHub ni llegar al cliente:
* `DATABASE_URL`: Cadena de conexión a PostgreSQL.
* `PAYMENT_SECRET_KEY`: Clave secreta de la pasarela de pago.
* `JWT_SECRET`: Firma secreta para la autenticación.

## Validaciones y Protección
* Validación de entradas de usuario en servidor y cliente.
* Protección contra ataques XSS y CSRF.