export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt?: string;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  author: User;
  createdAt: string;
  likes: number;
  comments?: Comment[];
  commentsCount: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

// Tipos para autenticación
export interface AuthUser extends User {
  createdAt: string;
}

// Tipos para Google Auth
export interface GoogleUser {
  name: string;
  email: string;
  image: string;
  id?: string;
}
