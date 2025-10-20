import { CreatePostBox } from "@molecules/CreatePostBox/CreatePostBox";
import { PostsList } from "@molecules/PostsList/PostsList";

export const AppFeed = () => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <CreatePostBox />
      <PostsList />
    </div>
  );
};
