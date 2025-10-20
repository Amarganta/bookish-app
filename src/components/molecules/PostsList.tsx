import { PostCard } from "@/components/organisms/PostCard";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";

export const PostsList = () => {
  const { list: posts } = useSelector((state: RootState) => state.posts);

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};
