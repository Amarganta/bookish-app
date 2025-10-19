import type { Post } from "@features/postsSlice";

interface PostCardProps {
  post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="flex items-start gap-3">
        <img
          src={post.user.avatar}
          alt={post.user.name}
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />

        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{post.user.name}</h3>
          {post.createdAt && (
            <p className="text-sm text-gray-500 mb-2">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          )}
          <p className="text-gray-700 leading-relaxed">{post.content}</p>
        </div>
      </div>
    </div>
  );
};
