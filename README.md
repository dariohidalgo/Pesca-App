# Pesca Córdoba - Guía de Pesca Deportiva 🎣

[![Website](https://img.shields.io/badge/Website-pescacordoba.com.ar-blue?style=flat&logo=google-chrome)](https://www.pescacordoba.com.ar/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6-purple?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?style=flat&logo=firebase)](https://firebase.google.com/)

**Pesca Córdoba** es la guía definitiva de pesca deportiva en la provincia de Córdoba, Argentina. Una aplicación web moderna diseñada para proporcionar a los pescadores toda la información necesaria para sus jornadas de pesca, desde el pronóstico del clima y calendarios solunares, hasta un mapa interactivo de lugares de pesca y alquiler de embarcaciones.

## ✨ Características Principales

- 🗺️ **Mapa Interactivo:** Ubicación de los principales pesqueros y diques de la provincia de Córdoba.
- 🚤 **Alquiler de Embarcaciones:** Directorio de contactos para alquiler de lanchas, botes y servicios de pesca.
- ⛅ **Pronóstico y Clima:** Información meteorológica en tiempo real y extendida, optimizada para la planificación de salidas de pesca.
- 🌔 **Calendario Solunar:** Cálculo de las mejores horas de actividad de los peces utilizando la librería `suncalc`.
- 🐟 **Guía de Especies:** Catálogo detallado de los principales peces presentes en la región.
- 🪢 **Nudos de Pesca:** Guía visual paso a paso para aprender a realizar los nudos más efectivos y utilizados.
- 📱 **Diseño Responsive:** Experiencia de usuario optimizada tanto para dispositivos móviles como para computadoras de escritorio.

## 🛠️ Tecnologías Utilizadas

El proyecto está construido utilizando tecnologías web modernas para asegurar un alto rendimiento y una excelente experiencia de usuario:

- **Frontend Core:** [React 19](https://react.dev/) y [Vite](https://vitejs.dev/)
- **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Rutas:** [React Router](https://reactrouter.com/)
- **Base de Datos & Backend:** [Firebase](https://firebase.google.com/) (Firestore)
- **Mapas:** [Leaflet](https://leafletjs.com/) y [React Leaflet](https://react-leaflet.js.org/)
- **Iconos:** [Lucide React](https://lucide.dev/)
- **Analíticas:** Umami Analytics

## 🚀 Requisitos Previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (Versión 18 o superior recomendada)
- Un gestor de paquetes como `npm`, `yarn` o `pnpm`.

## ⚙️ Instalación y Uso Local

Sigue estos pasos para correr el proyecto en tu entorno local:

1. **Clonar el repositorio** (si aplica)
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd pesca-app
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Variables de Entorno**
   Crea un archivo `.env` en la raíz del proyecto basándote en las variables necesarias para Firebase (API Keys, Auth Domain, Project ID, etc.).

4. **Ejecutar el servidor de desarrollo**
   ```bash
   npm run dev
   ```
   También puedes usar Vercel Dev si tienes configurado el entorno de Vercel:
   ```bash
   npm run dev:vercel
   ```

5. **Abrir en el navegador**
   El proyecto estará corriendo generalmente en `http://localhost:5173`.

## 📦 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar los siguientes comandos:

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run dev:vercel`: Inicia el servidor de desarrollo utilizando Vercel CLI, ideal para testear Vercel Edge Functions de manera local.
- `npm run build`: Compila la aplicación para producción en la carpeta `/dist`.
- `npm run lint`: Ejecuta ESLint para analizar el código en busca de problemas.
- `npm run preview`: Inicia un servidor local para previsualizar la build de producción.

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Si deseas mejorar la plataforma, por favor sigue estos pasos:

1. Haz un Fork del proyecto.
2. Crea tu rama de características (`git checkout -b feature/NuevaCaracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añade una nueva característica'`).
4. Haz push a la rama (`git push origin feature/NuevaCaracteristica`).
5. Abre un Pull Request.

## 📄 Licencia

Este proyecto es privado y todos los derechos están reservados.

---
*Desarrollado con ❤️ para la comunidad de pescadores de Córdoba, Argentina.*
