import { CreatePostBox } from "@molecules/CreatePostBox/CreatePostBox";
import { PostsList } from "@molecules/PostsList/PostsList";
import { feedMockData } from "@/lib/data/feedMockData";

export const AppFeed = () => {
  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      <CreatePostBox />
      <PostsList initialPosts={feedMockData} />
    </div>
  );
};
