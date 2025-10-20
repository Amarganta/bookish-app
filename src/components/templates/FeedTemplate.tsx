import { Header } from "../molecules/Header";
import { AppFeed } from "../organisms/AppFeed/AppFeed";

export const FeedTemplate = () => {
  return (
    <div className="min-h-screen bg-bg-custom text-gray-800">
      <Header />
      <main className="pt-6 pb-12">
        <AppFeed />
      </main>
    </div>
  );
};
