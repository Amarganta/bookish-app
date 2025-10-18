import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Comment {
  id: string;
  user: string;
  text: string;
}

export interface Post {
  id: string;
  user: string;
  content: string;
  comments: Comment[];
}

export interface FeedState {
  posts: Post[];
}

const initialState: FeedState = {
  posts: [],
};

const feedSlice = createSlice({
  name: "feed",
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    addPost: (state, action: PayloadAction<Post>) => {
      state.posts.unshift(action.payload);
    },
  },
});

export const { setPosts, addPost } = feedSlice.actions;
export default feedSlice.reducer;
