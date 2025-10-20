# 📚 Bookish App - Red Social de Libros

Una red social moderna construida con Next.js, TypeScript, Redux y Tailwind CSS, enfocada en compartir contenido sobre libros y literatura.

## 📋 Resumen del Proyecto

Esta aplicación fue desarrollada como una red social completa que permite a los usuarios:
- Autenticarse con Google usando NextAuth
- Publicar contenido multimedia sobre libros
- Comentar en publicaciones
- Interactuar con el contenido de otros usuarios
- Disfrutar de una experiencia completamente responsiva

### 🏗️ Arquitectura Implementada

- **Frontend**: Next.js 15 con App Router
- **Autenticación**: NextAuth con Google Provider
- **Estado Global**: Redux Toolkit con TypeScript
- **Estilos**: Tailwind CSS 4
- **Arquitectura**: Atomic Design Pattern
- **Tipado**: TypeScript con interfaces centralizadas

## ✅ Checklist de Requisitos

### 🎯 Requisitos Principales

#### 📱 Vistas
- [x] **Login**
  - [x] Formulario con email y contraseña (validaciones básicas)
  - [x] NextAuth implementado para manejo de sesión
  - [x] Autenticación con Google (RRSS requerida)
  - [x] Redux-persist para simulación de usuario logueado
  - [x] Redirección al Feed tras autenticación exitosa
  
- [x] **Feed**
  - [x] Lista de publicaciones con comentarios (datos mockeados)
  - [x] Sistema de comentarios en tiempo real
  - [x] Creación de nuevo contenido multimedia
  - [x] Botón de logout con redirección al login

#### 🔧 Funcionalidades Requeridas
- [x] **SSR y CSR**
  - [x] Pages implementadas con SSR
  - [x] CSR minimizado a componentes interactivos específicos
  
- [x] **Estado Global**
  - [x] Redux para autenticación de usuario
  - [x] Redux para lista de publicaciones
  - [x] Redux para sistema de comentarios
  
- [x] **Diseño**
  - [x] Tailwind CSS 4 implementado
  - [x] Diseño completamente responsivo
  - [x] Mejores prácticas de UX/UI
  
- [x] **TypeScript**
  - [x] Interfaces centralizadas en `/src/types`
  - [x] Tipado completo en todos los componentes
  - [x] Tipos estrictos para Redux y NextAuth
  
- [x] **Arquitectura**
  - [x] Atomic Design implementado
  - [x] Componentes organizados en atoms/molecules/organisms
  - [x] Separación clara de responsabilidades


### Pendientes 

- [ ] Conección entre NextAuth y Redux Toolkit
- [ ] El Custom Hook (useAuth) no obtiene los datos de NextAuth
- [ ] Actualizazr el authSlice para que sea Redux quien maneje el SessionProvider
- [ ] Configuración de Storybook para documentación


### 🌟 Requisitos Extra (Opcionales)

- [ ] **Storybook**
  - [ ] Configuración de Storybook
  - [ ] Documentación de componente Login
  - [ ] Documentación de componente PostCard
  
- [x] **Interacciones**
  - [x] Botón de "Me gusta" en publicaciones
  - [x] Sistema de comentarios interactivo
  - [x] Contador de interacciones en tiempo real
  - [x] Estados de carga y feedback visual
  
- [x] **Deploy**
  - [ ] Aplicación desplegada en Vercel
  - [ ] URL pública funcional
  - [ ] Build optimizado para producción

## Deploy Your Own

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-redux&project-name=with-redux&repository-name=with-redux)
### 📦 Entregables

- [x] **Repositorio**
  - [x] Proyecto en repositorio público de GitHub
  - [x] README.md con instrucciones claras
  - [x] Código limpio y documentado
  
- [ ] **Detalles del Despliegue**
  - [ ] URL pública incluida
  - [ ] Configuración de despliegue documentada
        
### Cómo funciona la interfaz
- Desde el landing page haz click en "Empieza Ya"
- Regiistrate como Usuario
  - Inicia sesión
ó 
- Interactua con la pagina feed y sus componentes
## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto:

```env
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret
NEXTAUTH_SECRET=tu_nextauth_secret_random
NEXTAUTH_URL=http://localhost:3000
```

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/bookish-app.git

# Navegar al directorio
cd bookish-app

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:3000`

### Scripts Disponibles

```bash
npm run dev        # Servidor de desarrollo
npm run build      # Build de producción
npm run start      # Servidor de producción
npm run lint       # Linting con ESLint
npm run type-check # Verificación de tipos TypeScript
```

## 🏗️ Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── (auth)/            # Grupo de rutas de autenticación
│   ├── api/               # API Routes
│   └── page.tsx           # Página principal
├── components/            # Componentes con Atomic Design
│   ├── atoms/            # Componentes básicos (Button, Input, Avatar)
│   ├── molecules/        # Combinación de atoms (PostCard, CommentSection)
│   └── organisms/        # Estructuras complejas (AppFeed, LandingLayout)
├── features/             # Redux slices
├── hooks/                # Custom hooks
├── lib/                  # Utilidades y configuraciones
├── providers/            # Context providers
└── types/                # Interfaces TypeScript centralizadas
```

## 🎨 Componentes Implementados

### Atoms
- `Button` - Botón reutilizable con variantes
- `Input` - Campo de entrada con validaciones
- `Avatar` - Imagen de perfil con fallback
- `Card` - Contenedor base con estilos

### Molecules
- `PostCard` - Tarjeta de publicación con interacciones
- `CommentSection` - Sistema completo de comentarios
- `CreatePostBox` - Formulario para crear publicaciones
- `PostsList` - Lista optimizada de publicaciones

### Organisms
- `AppFeed` - Feed principal de la aplicación
- `LandingLayout` - Página de inicio con CTA
- `AuthButton` - Componente de autenticación completo

## 🔧 Configuración de Despliegue

### Vercel (Recomendado)

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno en el dashboard
3. El deploy se ejecuta automáticamente en cada push

### Variables de Entorno en Producción
```env
GOOGLE_CLIENT_ID=tu_google_client_id_prod
GOOGLE_CLIENT_SECRET=tu_google_client_secret_prod
NEXTAUTH_SECRET=tu_nextauth_secret_prod
NEXTAUTH_URL=https://tu-dominio.vercel.app
```


## 📝 Notas del Desarrollador


## 📄 Licencia


**Desarrollado con ❤️ usando Next.js, TypeScript y Tailwind CSS**
