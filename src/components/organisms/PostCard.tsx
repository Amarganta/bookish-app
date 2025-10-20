import { CommentSection } from "@/components/molecules/CommentSection";
import { Avatar } from "@atoms/Avatar";
import { Image } from "@atoms/Image";
import type { Post } from "@features/postsSlice";
import { HeartIcon, ChatBubbleOvalLeftIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useState } from "react";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200 p-4 sm:p-5 max-w-2xl mx-auto">
      {/* Header */}
      <header className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3">
          <Avatar
            src={post.user.avatar}
            alt={post.user.name}
            size="md"
            border
          />
          <div>
            <h3 className="font-semibold text-gray-900 leading-tight">
              {post.user.name}
            </h3>
            {post.createdAt && (
              <time className="text-xs text-gray-500" dateTime={post.createdAt}>
                {new Date(post.createdAt).toLocaleDateString("es-ES", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            )}
          </div>
        </div>
      </header>

      {/* Content */}
      {post.content && (
        <p className="text-gray-800 text-[15px] leading-relaxed mb-3 whitespace-pre-line">
          {post.content}
        </p>
      )}

      {/* Image */}
      {post.image && (
        <div className="mb-3 ">
          <Image
            src={post.image}
            alt="Post image"
            aspectRatio="landscape"
            rounded="lg"
            border
            shadow="sm"
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => window.open(post.image, "_blank")}
          />
        </div>
      )}

      {!post.content && post.image && (
        <p className="text-gray-500 text-sm italic mb-3">
          {post.user.name} compartió una imagen 📸
        </p>
      )}

      {/* Footer actions */}
      <div className="flex items-center justify-between text-gray-500 mt-2">
        <div className="flex items-center gap-5">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1 transition-colors ${
              liked ? "text-pink-500" : "hover:text-pink-500"
            }`}
            aria-label="Me gusta"
          >
            {liked ? (
              <HeartSolid className="w-5 h-5 transition-transform duration-200 scale-110" />
            ) : (
              <HeartIcon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      <CommentSection post={post} />
    </div>
  );
};
