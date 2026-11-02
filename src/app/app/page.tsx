import HomePage from "./home-page-client";
import { getCachedNews } from "@/lib/news-feed";

export const runtime = "nodejs";

export default async function Page() {
  let initialNews = [];

  try {
    const data = await getCachedNews();

    initialNews = (data.stories ?? [])
      .filter((story) => story.image && story.link && story.title)
      .slice(0, 2);
  } catch (error) {
    console.error("Unable to load initial homepage news:", error);
  }

  return <HomePage initialNews={initialNews} />;
}