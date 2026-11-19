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
- `src/services/publicacionesService.js` — convocatorias, eventos y comunicados.

## Panel de administración

En `/admin` (enlace «Administración del sitio» en el pie) se publican
convocatorias, próximos eventos y comunicados. Usuario de pruebas:
`admin` / `ccjnl2026`.

- Lo que tiene fecha de hoy en adelante aparece en el inicio como «Próximas
  actividades y convocatorias»; al pasar la fecha se mueve al archivo.
- Los comunicados se muestran solo dentro del portal de afiliadas.

## Pendiente: base de datos

`afiliadasService.js` y `publicacionesService.js` guardan los registros en el
navegador (localStorage) solo para poder probar el flujo: lo publicado desde
el panel se ve únicamente en ese navegador, y el usuario de pruebas vive en
el código. Al conectar el backend, reemplaza el cuerpo
de sus funciones por llamadas a la API; el resto del sitio no cambia.
