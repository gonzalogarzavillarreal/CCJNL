# Colegio de Ciencias Jurídicas en Nuevo León, A.C.

Sitio en React (Vite) con espacio de afiliadas.

## Uso

    npm install
    npm run dev

## Estructura

- `src/styles/tokens.css` — paleta y tipografía tomadas del logo.
- `src/data/colegio.js` — textos, actividades y datos de contacto.
- `src/pages/` — inicio, ingreso, registro y espacio de afiliadas.
- `src/services/afiliadasService.js` — acceso a datos de afiliadas.

## Pendiente: base de datos

`afiliadasService.js` guarda los registros en el navegador (localStorage)
solo para poder probar el flujo. Al conectar el backend, reemplaza el cuerpo
de sus funciones por llamadas a la API; el resto del sitio no cambia.
