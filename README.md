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
  
- [ ] **Deploy**
  - [ ] Aplicación desplegada en Vercel
  - [ ] URL pública funcional
  - [ ] Build optimizado para producción

- 🔐 **Autenticación dual**: Login manual + Google OAuth
- 📱 **Feed de publicaciones**: Crear, ver y comentar posts
- 🎨 **Diseño responsivo**: Mobile-first con Tailwind CSS 4
- 🏗️ **Arquitectura Atomic Design**: Componentes organizados y reutilizables
- 💾 **Persistencia de datos**: Redux Persist + localStorage fallback
- 🔄 **SSR/CSR optimizado**: Next.js con hidratación inteligente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/examples/with-redux&project-name=with-redux&repository-name=with-redux)
### 📦 Entregables

<<<<<<< HEAD
### 📋 Variables de Entorno Requeridas

En el dashboard de Vercel, ve a **Settings** → **Environment Variables** y agrega:

```bash
# NextAuth Configuration
NEXTAUTH_URL=https://tu-dominio.vercel.app
NEXTAUTH_SECRET=tu-secret-super-seguro-aqui

# Google OAuth Configuration
GOOGLE_CLIENT_ID=tu-google-client-id
GOOGLE_CLIENT_SECRET=tu-google-client-secret
```

⚠️ **IMPORTANTE - Seguridad**:
- **NUNCA** subas secretos reales al repositorio
- **Usa variables de entorno** en Vercel para los secretos
- **Genera un nuevo NEXTAUTH_SECRET** para producción
- **Crea credenciales OAuth separadas** para desarrollo y producción

### 🔐 Generación de Secretos Seguros

**Para NEXTAUTH_SECRET**:
```bash
# Genera un secret seguro (32 caracteres)
openssl rand -base64 32

# O usa Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Para Google OAuth**:
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un **nuevo proyecto** para producción
3. Habilita **Google+ API**
4. Crea **credenciales OAuth 2.0** separadas
5. Configura **URLs de redirección** para tu dominio de Vercel

### 🌐 Configuración de Google OAuth

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. **APIs & Services** → **Credentials**
3. Encuentra tu OAuth 2.0 Client ID
4. En **"Authorized redirect URIs"**, agrega:
   ```
   https://tu-dominio.vercel.app/api/auth/callback/google
   ```

### 🔧 Desarrollo Local

#### 📋 ¿Qué necesitas para levantar este proyecto?

**Para desarrollo local:**
- ✅ **Node.js 18+** (descarga desde [nodejs.org](https://nodejs.org/))
- ✅ **Git** (para clonar el repositorio)
- ✅ **Editor de código** (VS Code recomendado)
- ✅ **Navegador web** (Chrome, Firefox, Safari, etc.)

**Para funcionalidad completa (opcional):**
- ✅ **Cuenta de Google** (para OAuth - opcional)
- ✅ **Cuenta de Vercel** (para deployment - opcional)

**Tiempo estimado de setup:** 5-10 minutos

#### 💻 Requisitos del Sistema

**Mínimos:**
- **RAM**: 4GB (recomendado 8GB)
- **Espacio**: 500MB libres
- **OS**: Windows 10+, macOS 10.15+, Linux Ubuntu 18.04+
- **Navegador**: Chrome 90+, Firefox 88+, Safari 14+

**Recomendados:**
- **RAM**: 8GB+
- **CPU**: 4+ cores
- **Espacio**: 1GB+ libres
- **Node.js**: 18.17+ (LTS)

#### 🎯 ¿Qué puede hacer una persona SIN configuración adicional?

**✅ Funcionalidades que funcionan inmediatamente:**
- Ver la página de inicio
- Navegar por la interfaz
- Ver el diseño responsivo
- Explorar la estructura del código

**✅ Funcionalidades que funcionan con configuración mínima:**
- Registro de usuarios manuales
- Login con usuarios registrados
- Crear y ver posts
- Sistema de comentarios
- Persistencia de datos local

**🔧 Funcionalidades que requieren configuración adicional:**
- Login con Google (requiere Google OAuth)
- Deployment en Vercel (requiere cuenta de Vercel)

#### ⚡ Quick Start (2 minutos)

```bash
# 1. Clona y entra al proyecto
git clone <tu-repositorio>
cd bookish-app

# 2. Instala dependencias
npm install

# 3. Crea archivo de configuración básica
cp env.example .env.local
# Edita .env.local con tus valores (para desarrollo, los valores por defecto funcionan)

# 4. Ejecuta el proyecto
npm run dev

# 5. Abre http://localhost:3000 en tu navegador
```

**¡Listo!** Ya puedes usar la app con registro manual de usuarios.

#### 🚀 Instalación Paso a Paso (Detallada)

1. **Clona el repositorio**:
   ```bash
   git clone <tu-repositorio>
   cd bookish-app
   ```

2. **Instala dependencias**:
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura variables de entorno**:
   
   **Opción 1 - Usando el archivo de ejemplo:**
   ```bash
   cp env.example .env.local
   ```
   
   **Opción 2 - Crear manualmente:**
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```bash
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=tu-secret-super-seguro-aqui
   
   # Google OAuth Configuration (opcional para desarrollo)
   GOOGLE_CLIENT_ID=tu-google-client-id
   GOOGLE_CLIENT_SECRET=tu-google-client-secret
   ```
   
   📝 **Nota**: El archivo `env.example` contiene ejemplos y documentación completa. Para desarrollo local, puedes usar cualquier string como NEXTAUTH_SECRET.
   
   ⚠️ **IMPORTANTE**: Si el servidor se ejecuta en un puerto diferente (ej: 3001, 3005), actualiza la URL:
   ```bash
   # Si la terminal muestra: "Local: http://localhost:3001"
   NEXTAUTH_URL=http://localhost:3001
   
   # Si la terminal muestra: "Local: http://localhost:3005"  
   NEXTAUTH_URL=http://localhost:3005
   ```

4. **Configura Google OAuth (opcional)**:
   
   Si quieres probar el login con Google:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un proyecto o selecciona uno existente
   - Habilita la Google+ API
   - Crea credenciales OAuth 2.0
   - Agrega `http://localhost:3000/api/auth/callback/google` a las URLs autorizadas

5. **Ejecuta en desarrollo**:
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

6. **Verifica el puerto en la terminal**:
   
   Después de ejecutar `npm run dev`, la terminal mostrará algo como:
   ```
   ▲ Next.js 15.5.6
   - Local:        http://localhost:3000
   ```
   
   **Si el puerto es diferente** (ej: 3001, 3005), actualiza tu `.env.local`:
   ```bash
   # Cambia la URL para que coincida con la terminal
   NEXTAUTH_URL=http://localhost:3001  # o el puerto que muestre la terminal
   ```

7. **Abre tu navegador**:
   ```
   http://localhost:3000  # o el puerto que muestre la terminal
   ```

#### ✅ Verificación de Instalación

Después de seguir estos pasos, deberías poder:

- [ ] Ver la página de inicio en `http://localhost:3000`
- [ ] Acceder al login en `http://localhost:3000/login`
- [ ] Registrar un usuario manualmente
- [ ] Hacer login con el usuario registrado
- [ ] Ver el feed después del login
- [ ] (Opcional) Hacer login con Google

#### 🔧 Scripts Disponibles

```bash
npm run dev          # Ejecuta en modo desarrollo
npm run build        # Construye para producción
npm run start        # Ejecuta en modo producción
npm run lint         # Ejecuta ESLint
=======
- [x] **Repositorio**
  - [x] Proyecto en repositorio público de GitHub
  - [x] README.md con instrucciones claras
  - [x] Código limpio y documentado
  
- [ ] **Detalles del Despliegue**
  - [ ] URL pública incluida
  - [ ] Configuración de despliegue documentada
        
### Cómo funciona la interfaz
- Desde el landing page haz click en "Empieza Ya"
- Registrate como Usuario
  - Inicia sesión
ó 
- Inicia sesón con Google
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
>>>>>>> 92742892b776f8607c740161893f17232ad3ee1d
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



**Desarrollado con ❤️ usando Next.js, TypeScript y Tailwind CSS**
