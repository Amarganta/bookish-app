import { Header } from "../molecules/Header";
import { AppFeed } from "../organisms/AppFeed";

export const FeedTemplate = () => {
  return (
    <div className="min-h-screen bg-bg-custom text-gray-800">
      <Header />
      <main className="pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <AppFeed />
        </div>
      </main>
    </div>
  );
};
