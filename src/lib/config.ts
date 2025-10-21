// Configuración para diferentes entornos
export const config = {
  // URLs base según el entorno
  baseUrl: process.env.NODE_ENV === 'production' 
    ? process.env.NEXTAUTH_URL || 'https://tu-dominio.vercel.app'
    : 'http://localhost:3000',
  
  // Configuración de NextAuth
  nextAuth: {
    url: process.env.NEXTAUTH_URL || (process.env.NODE_ENV === 'production' 
      ? 'https://tu-dominio.vercel.app' 
      : 'http://localhost:3000'),
    secret: process.env.NEXTAUTH_SECRET,
  },
  
  // Configuración de Google OAuth
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  }
};

// Función para obtener la URL de callback
export const getCallbackUrl = (path: string = '/feed') => {
  return `${config.baseUrl}${path}`;
};
