import { CreatePostBox } from "@molecules/CreatePostBox/CreatePostBox";
import { PostsList } from "@molecules/PostsList/PostsList";

export const AppFeed = () => {
  return (
    <div className="space-y-6">
      <CreatePostBox />
      <PostsList />
    </div>
  );
};
