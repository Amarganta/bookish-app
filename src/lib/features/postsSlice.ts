import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  images?: string[];
  createdAt?: string;
}

interface PostsState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  posts: [],
  loading: false,
  error: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (
      state,
      action: PayloadAction<{
        content: string;
        user: { name: string; avatar: string };
        images?: string[]; // ✅ Incluir contenido multimedia
      }>
    ) => {
      const newPost: Post = {
        id: Date.now().toString(),
        user: action.payload.user,
        content: action.payload.content,
        images: action.payload.images,
        createdAt: new Date().toISOString(),
      };
      state.posts.unshift(newPost); // Agregar al inicio
    },
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addPost, setPosts, setLoading, setError } = postsSlice.actions;
export default postsSlice.reducer;
