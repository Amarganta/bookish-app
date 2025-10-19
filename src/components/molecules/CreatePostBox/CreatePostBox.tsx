"use client";

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@atoms/Button/Button";
import { addPost } from "@features/postsSlice";
import { useAuth } from "@/hooks/useAuth";
import type { RootState } from "@lib/store";

export const CreatePostBox = () => {
  const [postText, setPostText] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const loading = useSelector((state: RootState) => state.posts.loading);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convertir archivos a URLs para preview
    const imageUrls: string[] = [];

    Array.from(files).forEach((file) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        imageUrls.push(url);
      }
    });

    setSelectedImages((prev) => [...prev, ...imageUrls].slice(0, 4)); // Máximo 4 imágenes
  };

  const removeImage = (indexToRemove: number) => {
    setSelectedImages((prev) => {
      const newImages = prev.filter((_, index) => index !== indexToRemove);
      // Liberar memoria del URL.createObjectURL
      URL.revokeObjectURL(prev[indexToRemove]);
      return newImages;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasContent = postText.trim().length > 0;
    const hasImages = selectedImages.length > 0;

    if ((!hasContent && !hasImages) || !currentUser) return;

    // ✅ agregrar pos con redux
    dispatch(
      addPost({
        content: postText.trim() || "",
        user: {
          name: currentUser.name,
          avatar: currentUser.avatar || "https://i.pravatar.cc/150?img=5",
        },
        images: selectedImages.length > 0 ? selectedImages : undefined,
      })
    );

    setSelectedImages([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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
            className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={3}
            maxLength={280}
            disabled={loading}
          />

          {/* Preview de imagenes seleccionadas */}
          {selectedImages.length > 0 && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">
                {postText.length}/280
              </span>

              {/* Boton para seleccionar imágenes */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                className="hidden"
                disabled={loading || selectedImages.length >= 4}
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading || selectedImages.length >= 4}
                className="p-2 text-gray-500 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                title="Añadir imágenes"
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

              {selectedImages.length > 0 && (
                <span className="text-xs text-gray-400">
                  {selectedImages.length}/4 imágenes
                </span>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="medium"
              disabled={!postText.trim() && !selectedImages.length}
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
