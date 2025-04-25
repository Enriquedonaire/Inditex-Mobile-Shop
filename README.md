# Mobile Shop

![Mobile Shop Light Mode](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mobile%20Shop%20Inditex-zV1AGsU6bajVEYvyoQAnQPvcms16cU.png)
![Mobile Shop Dark Mode](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mobile%20Shop%20Inditex%20Dark-cHFaHpBKaGTzDFUyFvDG6UYN8twDao.png)

## Descripción del Proyecto

He desarrollado una aplicación web SPA (Single Page Application) para la compra de dispositivos móviles. La aplicación permite a los usuarios navegar por un catálogo de productos, filtrarlos por marca o modelo, ver detalles específicos de cada producto y añadirlos al carrito de compra.

## Características Implementadas

- **Listado de productos** con información básica (imagen, marca, modelo y precio)
- **Filtrado en tiempo real** por marca y modelo
- **Vista detallada de producto** con especificaciones técnicas completas
- **Selección de opciones** (color y almacenamiento) antes de añadir al carrito
- **Carrito lateral** con gestión completa de productos (añadir, eliminar, modificar cantidad)
- **Proceso de checkout** con validación de formularios
- **Persistencia de datos** mediante localStorage con expiración de caché (1 hora)
- **Diseño responsive** adaptado a diferentes tamaños de pantalla
- **Modo oscuro/claro** con cambio instantáneo entre temas
- **Notificaciones toast** para feedback al usuario

## Tecnologías Utilizadas

- **React** - Biblioteca principal para la construcción de la interfaz
- **React Router** - Manejo de rutas y navegación
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos vectoriales
- **Vite** - Herramienta de construcción y desarrollo

## Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
│   ├── Cart.jsx        # Componente del carrito lateral
│   ├── ErrorDisplay.jsx # Componente para mostrar errores
│   ├── Header.jsx      # Cabecera con navegación y carrito
│   ├── ProductActions.jsx # Acciones de producto (selección de opciones)
│   ├── ProductCard.jsx # Tarjeta de producto para el listado
│   ├── ProductDescription.jsx # Descripción detallada del producto
│   ├── ProductImage.jsx # Componente para mostrar la imagen del producto
│   ├── ProductList.jsx # Lista de productos con grid responsive
│   ├── SearchBar.jsx   # Barra de búsqueda para filtrar productos
│   ├── ThemeToggle.jsx # Botón para cambiar entre modo claro y oscuro
│   └── ui/             # Componentes de UI reutilizables
│       ├── toast.jsx   # Sistema de notificaciones toast
│       ├── toaster.jsx # Componente para mostrar notificaciones
│       └── use-toast.js # Hook para usar el sistema de notificaciones
├── context/
│   ├── CartContext.jsx # Contexto para gestión del carrito
│   └── ThemeContext.jsx # Contexto para gestión del tema
├── hooks/
│   └── useDebounce.js  # Hook personalizado para debounce en búsquedas
├── lib/
│   └── utils.js        # Funciones de utilidad
├── pages/
│   ├── CheckoutPage.jsx # Página de proceso de compra
│   ├── HomePage.jsx    # Página principal con listado de productos
│   ├── NotFoundPage.jsx # Página de error 404
│   ├── ProductDetailPage.jsx # Página de detalle de producto
│   └── ProductListPage.jsx # Componente para la lista de productos
├── services/
│   └── api.js          # Servicios para comunicación con la API
├── App.jsx             # Componente principal de la aplicación
├── index.css           # Estilos globales
├── main.jsx           # Punto de entrada de la aplicación
├── index.html          # Archivo HTML principal
├── vite.config.js      # Configuración de Vite
├── tailwind.config.js  # Configuración de Tailwind CSS
├── postcss.config.js   # Configuración de PostCSS
├── package.json        # Dependencias y scripts
└── README.md           # Documentación del proyecto
```

## API Utilizada

La aplicación se comunica con la API disponible en `https://itx-frontend-test.onrender.com/api` que proporciona:

- Listado de productos: `GET /api/product`
- Detalle de producto: `GET /api/product/:id`
- Añadir al carrito: `POST /api/cart`

## Características Adicionales

- **Sistema de caché**: Implementé un sistema de caché en el cliente utilizando localStorage para almacenar las respuestas de la API con una expiración de 1 hora, reduciendo así el número de peticiones al servidor.
- **Gestión de estado**: Utilicé Context API para manejar el estado global de la aplicación, especialmente para el carrito de compra y el tema visual.
- **Transición instantánea entre temas**: Implementé un cambio instantáneo entre modo claro y oscuro para evitar parpadeos o transiciones lentas.
- **Validación de formularios**: En el proceso de checkout, implementé validación de campos para asegurar que los datos introducidos son correctos.
- **Componentes accesibles**: Diseñé la interfaz teniendo en cuenta aspectos de accesibilidad como contraste, etiquetas ARIA y navegación por teclado.

## Instalación y Ejecución

1. Clona este repositorio:
```bash
git clone https://github.com/Enriquedonaire/Inditex-Mobile-Shop.git
cd mobile-shop

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre tu navegador en `http://localhost:5173`

## Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Compila la aplicación para producción
- `npm run lint` - Ejecuta el linter para verificar el código
- `npm run test` - Ejecuta los tests
- `npm run preview` - Previsualiza la versión de producción localmente

## Decisiones Técnicas

- **Vite vs Create React App**: Elegí Vite por su velocidad de desarrollo y tiempos de compilación más rápidos.
- **Tailwind CSS**: Opté por Tailwind para agilizar el desarrollo de la interfaz y mantener un diseño consistente.
- **Context API vs Redux**: Para una aplicación de este tamaño, Context API proporciona una solución más simple y directa para la gestión del estado.
- **React Router**: Implementé React Router para manejar la navegación entre vistas manteniendo el concepto de SPA.
- **Debounce en búsquedas**: Añadí un hook personalizado de debounce para optimizar las búsquedas en tiempo real y evitar renderizados innecesarios.

## Mejoras Futuras

- Implementación de tests unitarios y de integración
- Añadir animaciones más elaboradas para mejorar la experiencia de usuario
- Implementar un sistema de favoritos
- Añadir filtros adicionales (precio, características)
- Optimizar el rendimiento con lazy loading para componentes pesados
- Implementar PWA para uso offline

## Contacto

Si tienes alguna pregunta o sugerencia sobre este proyecto, no dudes en contactarme:

- Email: [donaire.q2@gmail.com](mailto:donaire.q2@gmail.com)
- LinkedIn: [Enrique Donaire](https://linkedin.com/in/enrique-donaire)