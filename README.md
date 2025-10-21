# 📚 Bookish App - Red Social para Amantes de los Libros

Una red social moderna construida con Next.js, Redux Toolkit, TypeScript y Tailwind CSS, diseñada para que los amantes de los libros compartan sus lecturas y conecten con otros lectores.

## ✨ Características

- 🔐 **Autenticación dual**: Login manual + Google OAuth
- 📱 **Feed de publicaciones**: Crear, ver y comentar posts
- 🎨 **Diseño responsivo**: Mobile-first con Tailwind CSS 4
- 🏗️ **Arquitectura Atomic Design**: Componentes organizados y reutilizables
- 💾 **Persistencia de datos**: Redux Persist + localStorage fallback
- 🔄 **SSR/CSR optimizado**: Next.js con hidratación inteligente

## 🚀 Deployment en Vercel

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
```

#### 🐛 Solución de Problemas

**Error: "Module not found"**
```bash
# Limpia node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
```

**Error: "Port 3000 is in use"**
- El servidor automáticamente usará el siguiente puerto disponible (3001, 3002, etc.)
- **Actualiza `NEXTAUTH_URL` en `.env.local`** para que coincida con el puerto mostrado en la terminal
- Ejemplo: Si la terminal muestra `Local: http://localhost:3005`, cambia a `NEXTAUTH_URL=http://localhost:3005`

**Error: "Google OAuth not working"**
- Verifica que las credenciales estén correctas en `.env.local`
- Asegúrate de que la URL de callback esté configurada en Google Console

### 🔒 Mejores Prácticas de Seguridad

#### ✅ **Hacer:**
- Usar variables de entorno para todos los secretos
- Generar secretos únicos para cada entorno (desarrollo/producción)
- Mantener `.env.local` en `.gitignore`
- Usar credenciales OAuth separadas para desarrollo y producción

#### ❌ **No hacer:**
- Subir secretos reales al repositorio
- Usar los mismos secretos en desarrollo y producción
- Compartir credenciales en documentación pública
- Hardcodear secretos en el código

### 🏗️ Arquitectura del Proyecto

```
src/
├── app/                    # Next.js App Router
│   ├── api/auth/          # NextAuth.js API routes
│   ├── feed/              # Página del feed
│   └── login/             # Página de login
├── components/            # Atomic Design Components
│   ├── atoms/             # Componentes básicos
│   ├── molecules/          # Componentes compuestos
│   ├── organisms/          # Componentes complejos
│   └── templates/          # Layouts de página
├── lib/                   # Lógica de negocio
│   ├── features/          # Redux slices
│   ├── store.ts           # Configuración Redux
│   └── config.ts          # Configuración de entornos
├── hooks/                 # Custom hooks
├── providers/             # Context providers
└── types/                 # TypeScript definitions
```

### 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 15 con App Router
- **Estado**: Redux Toolkit + Redux Persist
- **Autenticación**: NextAuth.js con Google OAuth
- **Estilos**: Tailwind CSS 4
- **Tipado**: TypeScript
- **Deployment**: Vercel

### 🔍 Troubleshooting

#### Error: `redirect_uri_mismatch`
- Verifica que la URL en Google Console coincida exactamente con tu dominio de Vercel
- Asegúrate de que no hay espacios o caracteres extra

#### Error: `NEXTAUTH_URL` not set
- Verifica que la variable `NEXTAUTH_URL` esté configurada en Vercel
- Debe ser exactamente: `https://tu-dominio.vercel.app`

#### Login no redirige
- Verifica que `NEXTAUTH_URL` esté configurado correctamente
- Revisa los logs de Vercel para errores

### 📱 Funcionalidades

- ✅ **Registro y Login manual** con persistencia
- ✅ **Login con Google** OAuth
- ✅ **Feed de publicaciones** con imágenes
- ✅ **Sistema de comentarios**
- ✅ **Diseño responsivo** mobile-first
- ✅ **Múltiples usuarios** con datos persistentes
- ✅ **Redirección automática** después del login

### 🎯 Próximas Mejoras

- [ ] Sistema de notificaciones
- [ ] Búsqueda de usuarios y posts
- [ ] Sistema de seguimiento entre usuarios
- [ ] Categorización de libros
- [ ] Sistema de recomendaciones

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.