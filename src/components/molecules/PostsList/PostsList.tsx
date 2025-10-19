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

  if (allPosts.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-gray-200">
        <p className="text-gray-500 mb-2">
          No hay posts aún. ¡Sé el primero en compartir algo! 📚
        </p>
        <p className="text-sm text-gray-400">
          Comparte tus lecturas favoritas con la comunidad
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {allPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
