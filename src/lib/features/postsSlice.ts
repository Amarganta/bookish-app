import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { feedMockData } from "../data/feedMockData";

export interface Comment {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  createdAt: string;
}

export interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  image?: string;
  createdAt?: string;
  comments: Comment[];
  commentsCount: number;
}

interface PostsState {
  list: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostsState = {
  list: feedMockData,
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
        image?: string;
      }>
    ) => {
      const newPost: Post = {
        id: Date.now().toString(),
        user: action.payload.user,
        content: action.payload.content,
        image: action.payload.image,
        createdAt: new Date().toISOString(),
        comments: [],
        commentsCount: 0,
      };
      state.list.unshift(newPost);
    },

    addComment: (
      state,
      action: PayloadAction<{
        postId: string;
        content: string;
        user: { name: string; avatar: string };
      }>
    ) => {
      const post = state.list.find((p) => p.id === action.payload.postId);
      if (post) {
        const newComment: Comment = {
          id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          user: action.payload.user,
          content: action.payload.content,
          createdAt: new Date().toISOString(),
        };
        post.comments.push(newComment);
        post.commentsCount = post.comments.length;
      }
    },

    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.list = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { addPost, addComment, setPosts, setLoading, setError } =
  postsSlice.actions;
export default postsSlice.reducer;
