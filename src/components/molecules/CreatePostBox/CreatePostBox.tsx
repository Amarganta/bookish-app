"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@atoms/Button/Button";
import { addPost } from "@features/postsSlice";
import { useAuth } from "@/hooks/useAuth";
import type { RootState } from "@lib/store";

export const CreatePostBox = () => {
  const [postText, setPostText] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const loading = useSelector((state: RootState) => state.posts.loading);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postText.trim() || !currentUser) return;

    // ✅ Despachar acción a Redux
    dispatch(
      addPost({
        content: postText.trim(),
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar || "https://i.pravatar.cc/150?img=5",
        },
      })
    );

    setPostText("");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex gap-3">
        <img
          src={currentUser?.avatar || "https://i.pravatar.cc/150?img=5"}
          alt={currentUser?.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />

        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`¿Qué estás leyendo, ${currentUser?.name}?`}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            rows={3}
            maxLength={280}
            disabled={loading}
          />

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-gray-500">
              {postText.length}/280 caracteres
            </span>

            <Button
              type="submit"
              disabled={!postText.trim() || loading}
              isLoading={loading}
              className="px-6 py-2 text-sm"
            >
              Publicar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
