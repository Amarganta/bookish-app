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

          {post.content && (
            <p className="text-gray-700 leading-relaxed mb-3">{post.content}</p>
          )}

          {/* Galería de imágenes */}
          {post.images && post.images.length > 0 && (
            <div
              className={`grid gap-2 ${
                post.images.length === 1
                  ? "grid-cols-1"
                  : post.images.length === 2
                  ? "grid-cols-2"
                  : post.images.length === 3
                  ? "grid-cols-2"
                  : "grid-cols-2"
              }`}
            >
              {post.images.map((image, index) => (
                <div
                  key={index}
                  className={`relative ${
                    post.images!.length === 3 && index === 0 ? "col-span-2" : ""
                  }`}
                >
                  <img
                    src={image}
                    alt={`Post image ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => {
                      // Aquí podrías abrir un modal para ver la imagen en grande
                      window.open(image, "_blank");
                    }}
                  />
                </div>
              ))}
            </div>
          )}
          {!post.content && post.images && post.images.length > 0 && (
            <p className="text-gray-500 text-sm italic">
              {post.user.name} compartió {post.images.length} imagen
              {post.images.length > 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
