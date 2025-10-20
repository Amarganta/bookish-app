export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
}

export interface Post {
  id: string;
  content: string;
  image?: string;
  author: User;
  createdAt: string;
  likes: number;
  comments?: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}
