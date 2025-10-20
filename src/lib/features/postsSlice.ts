import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { feedMockData } from "../data/feedMockData";
import { Post, Comment } from "@/types/types";

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
        author: { id: string; name: string; email: string; avatar?: string; createdAt: string };
        image?: string;
      }>
    ) => {
      const newPost: Post = {
        id: Date.now().toString(),
        author: action.payload.author,
        content: action.payload.content,
        image: action.payload.image,
        createdAt: new Date().toISOString(),
        likes: 0,
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
          author: {
            id: Date.now().toString(),
            name: action.payload.user.name,
            email: "",
            avatar: action.payload.user.avatar,
            createdAt: new Date().toISOString(),
          },
          content: action.payload.content,
          createdAt: new Date().toISOString(),
        };
        post.comments?.push(newComment);
        post.commentsCount = (post.comments?.length || 0) + 1;
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
