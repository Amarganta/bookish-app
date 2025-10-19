import { useSelector, useDispatch } from "react-redux";
import { PostCard } from "@molecules/PostCard/PostCard";
import type { RootState } from "@lib/store";
import type { Post } from "@features/postsSlice";

interface PostsListProps {
  initialPosts: Post[];
}

export const PostsList = ({ initialPosts }: PostsListProps) => {
  const posts = useSelector((state: RootState) => state.posts.posts);

  // ✅ subir posto al "timeline en tiempo real"
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
