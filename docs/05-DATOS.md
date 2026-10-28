#### 7. Archivo: `docs/05-DATOS.md`
```markdown
# 05 - Modelo de Datos

## Entidades Principales

### 1. Entidad: Usuario (`User`)
* `id` (UUID, Clave Primaria)
* `nombre` (VARCHAR)
* `email` (VARCHAR, Único)
* `rol` (ENUM: 'Alumno', 'Coach', 'Admin')
* `fecha_registro` (TIMESTAMP)

### 2. Entidad: Servicio (`Service`)
* `id` (UUID, Clave Primaria)
* `titulo` (VARCHAR)
* `juego` (VARCHAR)
* `precio` (DECIMAL, Valor: 0)
* `duracion_minutos` (INTEGER)

### 3. Entidad: Reserva (`Booking`)
* `id` (UUID, Clave Primaria)
* `usuario_id` (UUID, Clave Foránea -> User)
* `servicio_id` (UUID, Clave Foránea -> Service)
* `fecha_hora` (TIMESTAMP)
* `estado` (ENUM: 'Pendiente', 'Confirmado', 'Completado')

## Ejemplo de Datos (JSON)
```json
{
  "user": {
    "id": "usr_101",
    "nombre": "Maximiliano Gamer",
    "email": "maxi@proaim.com",
    "rol": "Alumno"
  },
  "service": {
    "id": "srv_201",
    "titulo": "Análisis de Replay Valorant",
    "juego": "Valorant",
    "precio": 0
  }
}