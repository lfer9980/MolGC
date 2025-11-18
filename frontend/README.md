# MolGC Web App
> Develop faster, now.

## Primeros pasos

## 🛠 Tecnologías

- [Next.js](https://nextjs.org/)
- [React.js](https://reactjs.org/)
- JavaScript (ES6+)
- SASS

## 🚀 Requisitos Previos

- Node.js v20+
- npm o yarn

## ⚙️ Instalación

1. Clona el repositorio e instala dependencias

```bash
	git clone https://github.com/EoniaBiomedicalSoftware/molgc.git
    cd molgc
    npm install
    npm run dev
```

## 📦 Estructura

```javascript
molgc/
├── .base/		#Contiene los archivos base para desarrollar nuevos componentes.
├── public/		 # Archivos estáticos (imágenes, favicon, etc.)
│   ├── icons/
│   ├── images/
├── scripts/		#generan paleta de color y actualizar el progreso durante el build
├── src/
│   ├── __demo__/		 #aloja aqui informacion temporal, util cuando no se cuenta con un backend.
│   ├── __test__/		 #aloja los test de tus componentes
│   ├── app/
│   │	├── developers/  #seccion exclusiva para la documentacion del framework
│   ├── components/  # Componentes React reutilizables
│   │	├── __common__/
│   │	├── __layouts__/
│   │	├── atoms/
│   │	├── molecules/
│   │	├── organisms/
│   │	├── templates/
│   ├── context/
│   │	├── __core__/   # Contextos precreados y listos para usarse
│   ├── hooks/
│   │	├── __core__/   # hooks precreados y listos para usarse
│   ├── lib/
│   │	├── data/
│   │	│   ├── __models__/ # store your data models here
│   ├── services/
│   ├── static/		#aloja fonts incialmente
│   ├── store/
│   ├── styles/      # Archivos de estilos
├── .gitignore
├── next.config.js   # Configuración de Next.js
├── package.json
└── README.md
```

## 🏃‍♂️ Scripts

```bash
npm run dev
```

Inicia el servidor en modo desarrollo (http://localhost:3000)

```bash
npm run build
```

Genera la aplicación optimizada para producción en .next/

```bash
npm run start
```

Inicia la versión de producción (requiere haber corrido build)

```bash
npm run lint
```

Corre ESLint para análisis de código (si lo tienes configurado)

```bash
npm run generate:colors
```

Genera archivos de paleta de color en scss.

```bash
npm run progress
```

Genera un JSON de progreso de la aplicacion (Estado general de las pantallas)

you should need to create .env files, add to: src/.env & src/.env.development

```bash
cd src
cat .env
cat .env.development
```
