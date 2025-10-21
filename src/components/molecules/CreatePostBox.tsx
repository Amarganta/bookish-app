"use client";

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@atoms/Button";
import { addPost } from "@features/postsSlice";
import { useAuth } from "@/hooks/useAuth";
import type { RootState } from "@lib/store";
import { Avatar } from "@/components/atoms/Avatar";
import { Image } from "@atoms/Image";

export const CreatePostBox = () => {
  const [postText, setPostText] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const loading = useSelector((state: RootState) => state.posts.loading);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    }
  };

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
      setSelectedImage(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const hasContent = postText.trim().length > 0;
    const hasImage = selectedImage !== null;

    if ((!hasContent && !hasImage) || !currentUser) return;

    dispatch(
      addPost({
        content: postText.trim() || "",
        author: {
          id: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          avatar: currentUser.avatar,
          createdAt: currentUser.createdAt,
        },
        image: selectedImage || undefined,
      })
    );

    setPostText("");
    setSelectedImage(null);
  };

  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <p className="text-gray-500 text-center">
          Inicia sesión para crear posts
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex gap-3">
        <Avatar
          src={currentUser?.avatar || "https://i.pravatar.cc/150?img=5"}
          alt={currentUser?.name || "Usuario"}
          size="md"
          border={true}
        />

        <form onSubmit={handleSubmit} className="flex-1">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={`¿Qué estás leyendo, ${currentUser.name}? O comparte una foto 📸`}
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            maxLength={280}
            disabled={loading}
          />

          {/* Preview de imagen */}
          {selectedImage && (
            <div className="mt-3">
              <div className="relative inline-block">
                <Image
                  src={selectedImage}
                  alt="Preview de imagen"
                  aspectRatio="landscape"
                  rounded="lg"
                  border={true}
                  shadow="sm"
                  className="w-full max-w-xs"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {postText.length}/280
              </span>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
                disabled={loading || selectedImage !== null}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || selectedImage !== null}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title={
                  selectedImage
                    ? "Ya hay una imagen seleccionada"
                    : "Añadir imagen"
                }
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={!postText.trim() && !selectedImage}
              isLoading={loading}
            >
              Publicar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
