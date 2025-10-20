"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@/components/atoms/Avatar";
import { Button } from "@/components/atoms/Button";
import { addComment } from "@/lib/features/postsSlice";
import { useAuth } from "@/hooks/useAuth";
import type { Post } from "@/types/types";
import type { RootState } from "@/lib/store";
import { Input } from "@/components/atoms/Input";

interface CommentSectionProps {
  post: Post;
}

export const CommentSection = ({ post: initialPost }: CommentSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();

  // ✅ Obtener el post actualizado desde Redux
  const reduxPosts = useSelector((state: RootState) => state.posts.list);
  const updatedPost =
    reduxPosts.find((p) => p.id === initialPost.id) || initialPost;

  const toggleComments = () => {
    setIsExpanded(!isExpanded);
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newComment.trim() || !currentUser || isSubmitting) return;

    setIsSubmitting(true);

    try {
      dispatch(
        addComment({
          postId: initialPost.id,
          content: newComment.trim(),
          user: {
            name: currentUser.name,
            avatar: currentUser.avatar || "https://i.pravatar.cc/150?img=5",
          },
        })
      );

      setNewComment("");
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const CommentItem = ({ comment }: { comment: any }) => (
    <div className="flex gap-3 group">
      <Avatar
        src={comment.author?.avatar || ""}
        alt={comment.author?.name || "Usuario"}
        size="sm"
        border={true}
        className="flex-shrink-0"
      />

      <div className="flex-1 min-w-0">
        <div className="bg-gray-50 hover:bg-gray-100 transition-colors rounded-2xl px-3 sm:px-4 py-3">
          <p className="font-medium text-sm text-gray-900 mb-1 truncate">
            {comment.author?.name || "Usuario"}
          </p>
          <p className="text-sm text-gray-700 break-words leading-relaxed">
            {comment.content}
          </p>
        </div>

        <div className="flex items-center gap-4 mt-2 ml-3 sm:ml-4">
          <p className="text-xs text-gray-500">
            {new Date(comment.createdAt).toLocaleDateString("es-ES", {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="border-t border-gray-100 pt-4 mt-4">
      {/* Header de comentarios */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <Button
          variant="ghost"
          size="small"
          onClick={toggleComments}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors -ml-2 px-2 sm:px-3 py-2"
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>

          <span className="text-xs sm:text-sm font-medium">
            {/* ✅ Usar updatedPost en lugar de post inicial */}
            {updatedPost.commentsCount > 0
              ? `${updatedPost.commentsCount} ${
                  updatedPost.commentsCount === 1 ? "comentario" : "comentarios"
                }`
              : "Comentar"}
          </span>

          <svg
            className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </Button>
      </div>

      {/* Lista de comentarios */}
      {isExpanded && (
        <div className="space-y-3 sm:space-y-4 mb-3 sm:mb-4">
          {/* ✅ Usar updatedPost.comments */}
          {updatedPost.comments && updatedPost.comments.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {updatedPost.comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment} />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 sm:py-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <p className="text-gray-500 text-xs sm:text-sm">
                Aún no hay comentarios
              </p>
              <p className="text-gray-400 text-xs mt-1">
                ¡Sé el primero en comentar!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Formulario para agregar comentario */}
      {isExpanded && currentUser && (
        <form onSubmit={handleSubmitComment} className="mt-3 sm:mt-4">
          <div className="flex gap-2 sm:gap-3">
            <Avatar
              src={currentUser.avatar || "https://i.pravatar.cc/150?img=5"}
              alt={currentUser.name}
              size="sm"
              border={true}
              className="flex-shrink-0"
            />

            <div className="flex-1 space-y-2">
              <div className="flex flex-col sm:flex-row gap-2">
                <Input
                  name="fullName"
                  type="text"
                  className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl sm:rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  placeholder="Agrega un comentario..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  maxLength={500}
                />
                <Button
                  type="submit"
                  variant="primary"
                  size="small"
                  disabled={!newComment.trim() || isSubmitting}
                  isLoading={isSubmitting}
                  className="rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2.5 sm:py-3 min-w-[80px] w-full sm:w-auto"
                >
                  Enviar
                </Button>
              </div>

              <div className="flex justify-between items-center text-xs text-gray-500 px-2">
                <span>{newComment.length}/500 caracteres</span>
                {newComment.length > 450 && (
                  <span className="text-orange-500 font-medium">
                    {500 - newComment.length} restantes
                  </span>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
