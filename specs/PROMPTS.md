# Registro de Prompts y Errores de IA - ProAim

## 1. Prompts Clave Utilizados
- **Prompt para Estructura Base:** "Generar la estructura de carpetas y arnés inicial para un proyecto Next.js enfocado en coaching de videojuegos bajo SDD."
- **Prompt para Especificaciones EARS:** "Redactar requerimientos funcionales utilizando notación EARS (Ubiquitous, Event-driven, State-driven, Optional) para el catálogo interactivo de ProAim."
- **Prompt para Planificación:** "Desglosar las tareas de implementación de la funcionalidad de turnos en subtareas menores a 30 minutos."

## 2. Registro de Errores de la IA (Debugging y Corrección)

### Error 1: Rutas de archivos y carpetas anidadas en Windows
- **Problema:** La IA sugirió comandos que creaban nombres de carpetas con barras invertidas literales (`specs\001-catalogo`) en lugar de directorios anidados independientes.
- **Detección:** Al visualizar el explorador de Visual Studio Code, los archivos no se desplegaban correctamente dentro de las carpetas.
- **Corrección Humana:** Se recreó la estructura de directorios de forma manual desde el Explorador de archivos de Windows y mediante comandos limpios de terminal (`mkdir`), asegurando la jerarquía correcta exigida por la cátedra.

### Error 2: Coherencia en los tokens de diseño (UI)
- **Problema:** En el plan inicial de componentes, la IA propuso usar colores hexadecimales fijos (`#ff0000`) en lugar de respetar la identidad visual de la marca.
- **Detección:** Se contrastó con los principios de la `CONSTITUCION.md` y `IDENTIDAD-MARCA.md`.
- **Corrección Humana:** Se ajustó el plan para exigir el uso exclusivo de variables CSS corporativas definidas en el sistema de diseño de ProAim.

### Error 3: Alcance excesivo en tareas unitarias
- **Problema:** La IA agrupó la creación de componentes y la lógica de base de datos en una sola tarea masiva de más de 2 horas.
- **Detección:** Violaba la regla de subtareas menores a 30 minutos del Desarrollo Guiado por Especificaciones.
- **Corrección Humana:** Se dividió la tarea en pasos atómicos (primero interfaz visual, luego pruebas unitarias en rojo, y por último integración).