"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PostCard } from "@molecules/PostCard/PostCard";
import { setPosts } from "@features/postsSlice";
import type { RootState } from "@lib/store";
import type { Post } from "@features/postsSlice";

interface PostsListProps {
  initialPosts: Post[];
}

export const PostsList = ({ initialPosts }: PostsListProps) => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);

  // ✅ Inicializar con posts mock si Redux está vacío
  useEffect(() => {
    if (posts.length === 0 && initialPosts.length > 0) {
      dispatch(setPosts(initialPosts));
    }
  }, [dispatch, initialPosts, posts.length]);

  // ✅ Combinar posts del usuario con posts iniciales
  const allPosts = [
    ...posts,
    ...initialPosts.filter(
      (mockPost) => !posts.find((userPost) => userPost.id === mockPost.id)
    ),
  ];

  return (
    <div className="space-y-4">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
