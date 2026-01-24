# MALPE Curtidos - Sitio Web

Sitio web corporativo para **MALPE Curtidos**, una tenería ubicada en León, Guanajuato, México. El sitio presenta los productos de la empresa y ofrece herramientas interactivas para cotización y visualización de productos.

## 🎯 Características Principales

### 📊 Cotizador de Pieles
- Catálogo completo de productos con variantes, grosores y tamaños
- Carrito de cotización interactivo con persistencia en sesión
- Formulario de solicitud de cotización personalizada
- Selección de especificaciones técnicas (grosor, tamaño, cantidad)
- Solicitud de muestras por producto

### 🏛️ Showroom Interactivo
- Galería visual de productos premium
- Filtros avanzados por categoría y características
- Vista detallada de cada producto con imágenes y especificaciones
- Modal de contacto directo desde el showroom

## 🛠️ Tecnologías

- **React Router v7** - Framework de enrutamiento y SSR
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Vite** - Build tool y dev server

## 🚀 Inicio Rápido

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:5173`

### Construcción para Producción

```bash
npm run build
```

### Ejecutar en Producción

```bash
npm start
```

## 📁 Estructura del Proyecto

```
app/
├── components/      # Componentes reutilizables
│   ├── productos/  # Componentes del cotizador
│   ├── showroom/   # Componentes del showroom
│   └── ...
├── routes/         # Rutas de la aplicación
├── data/           # Datos de productos y showroom
├── contexts/       # Contextos de React (QuotationContext)
└── ui/             # Componentes UI base
```

## 🐳 Docker

El proyecto incluye configuración Docker para despliegue:

```bash
docker build -t malpe-curtidos .
docker run -p 3000:3000 malpe-curtidos
```

---

Desarrollado para MALPE Curtidos - León, GTO, México
