import { CreatePostBox } from "@molecules/CreatePostBox";
import { PostsList } from "@molecules/PostsList";

export const AppFeed = () => {
  return (
    <div className="space-y-6">
      <CreatePostBox />
      <PostsList />
    </div>
  );
};
