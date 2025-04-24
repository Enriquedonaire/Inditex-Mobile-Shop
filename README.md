# Mobile Shop React

Este es un proyecto de tienda de dispositivos móviles desarrollado con React y Vite. La aplicación permite a los usuarios navegar por una lista de productos, ver detalles de productos específicos, añadir productos al carrito y simular un proceso de pago.

## Características

- Listado de productos con búsqueda en tiempo real
- Página de detalles de producto
- Carrito lateral con gestión de productos
- Proceso de checkout con validación de formularios
- Simulación de pago
- Diseño responsive
- Caché de datos en localStorage

## Tecnologías utilizadas

- React 18
- Vite
- React Router
- Tailwind CSS
- Lucide React (iconos)
- Radix UI (componentes accesibles)

## Instalación

1. Clona este repositorio:
\`\`\`bash
git clone https://github.com/tu-usuario/mobile-shop-react.git
cd mobile-shop-react
\`\`\`

2. Instala las dependencias:
\`\`\`bash
npm install
\`\`\`

3. Inicia el servidor de desarrollo:
\`\`\`bash
npm run dev
\`\`\`

4. Abre tu navegador en `http://localhost:5173`

## Estructura del proyecto

- `src/components`: Componentes reutilizables
- `src/context`: Contextos de React, incluido el contexto del carrito
- `src/hooks`: Hooks personalizados
- `src/pages`: Componentes de página
- `src/services`: Servicios para comunicación con API
- `src/lib`: Utilidades y funciones auxiliares

## API

La aplicación se comunica con la API de prueba en `https://itx-frontend-test.onrender.com/api` que proporciona:

- Lista de productos
- Detalles de productos
- Simulación de añadir al carrito

## Construcción para producción

Para construir la aplicación para producción:

\`\`\`bash
npm run build
\`\`\`

Los archivos generados estarán en la carpeta `dist`.

## Licencia

MIT
