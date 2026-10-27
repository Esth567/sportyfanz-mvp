
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Eye, MessageCircle } from "lucide-react";

const featuredStories = [
  {
    category: "SPORTYFANZ NOW",
    title: "Real Madrid edge closer to LaLiga title after thrilling comeback win",
    summary:
      "Vinícius Jr. scores late as Real Madrid turn the game around in a 3–2 victory over Barcelona at the Bernabéu.",
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1400&q=85",
  },
  {
    category: "TRANSFER NEWS",
    title: "Mbappé on fire as Real Madrid cruise to another win",
    summary:
      "A standout performance keeps Madrid moving as the season reaches a decisive stage.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1400&q=85",
  },
  {
    category: "MATCH REPORT",
    title: "Guardiola hints at summer rebuild for Man City",
    summary:
      "The manager reflects on the season and the changes that could shape the club's next campaign.",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1400&q=85",
  },
  {
    category: "SPORTS UPDATE",
    title: "Rashford open to Barcelona move in the summer",
    summary:
      "Fresh transfer speculation puts the forward's future back in the spotlight.",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=85",
  },
  {
    category: "FOOTBALL",
    title: "Osimhen's future takes new twist amid Saudi interest",
    summary:
      "Clubs are monitoring the striker as discussions about his next move continue.",
    image:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=1400&q=85",
  },
];

const trendingStories = [
  {
    title: "Mbappé on fire as Real Madrid cruise to another win",
    category: "Football",
    time: "2h ago",
    views: "3.4K",
    comments: 142,
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Guardiola hints at summer rebuild for Man City",
    category: "Premier League",
    time: "4h ago",
    views: "2.1K",
    comments: 96,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Rashford open to Barcelona move in the summer",
    category: "Transfers",
    time: "5h ago",
    views: "1.8K",
    comments: 78,
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Osimhen's future takes new twist amid Saudi interest",
    category: "Transfers",
    time: "6h ago",
    views: "1.5K",
    comments: 64,
    image:
      "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Champions League race heats up after dramatic weekend",
    category: "European Football",
    time: "7h ago",
    views: "1.4K",
    comments: 53,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Young stars making their mark across Europe",
    category: "Football",
    time: "8h ago",
    views: "1.2K",
    comments: 48,
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "The biggest talking points from the weekend fixtures",
    category: "Match Analysis",
    time: "9h ago",
    views: "980",
    comments: 37,
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Managers face key decisions ahead of the next round",
    category: "Football",
    time: "10h ago",
    views: "870",
    comments: 31,
    image:
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "Supporters react to a dramatic late winner",
    category: "Fan Reactions",
    time: "11h ago",
    views: "760",
    comments: 26,
    image:
      "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=240&q=75",
  },
  {
    title: "What to watch for in this week's biggest matchups",
    category: "Preview",
    time: "12h ago",
    views: "650",
    comments: 19,
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=240&q=75",
  },
];

export default function NewsPage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const featured = featuredStories[activeSlide];

  function moveSlide(direction: number) {
    setActiveSlide(
      (current) =>
        (current + direction + featuredStories.length) %
        featuredStories.length
    );
  }

  return (
    <main className="news-page">
      <div className="news-heading">
        <span className="news-eyebrow">THE LATEST FROM THE WORLD OF SPORT</span>
        <h1>Sports News</h1>
        <p>Breaking stories, match updates and conversations fans care about.</p>
      </div>

      <section className="news-hero" aria-label="Featured sports story">
        <Image
          src={featured.image}
          alt=""
          fill
          priority
          unoptimized
          sizes="(max-width: 900px) 100vw, 1200px"
          className="news-hero-image"
        />
        <div className="news-hero-shade" />

        <div className="news-hero-content">
          <span className="news-hero-brand">
            <span className="news-brand-mark">S</span>
            {featured.category}
          </span>

          <h2>{featured.title}</h2>
          <p>{featured.summary}</p>

          <Link href="/app/news" className="news-read-button">
            Read Full Story <span>→</span>
          </Link>
        </div>

        <div className="news-hero-controls">
          <div className="news-dots">
            {featuredStories.map((story, index) => (
              <button
                key={story.title}
                type="button"
                aria-label={`Show featured story ${index + 1}`}
                aria-current={activeSlide === index}
                className={activeSlide === index ? "active" : ""}
                onClick={() => setActiveSlide(index)}
              />
            ))}
          </div>

          <span className="news-slide-count">
            {activeSlide + 1}/{featuredStories.length}
          </span>

          <button
            type="button"
            aria-label="Previous featured story"
            onClick={() => moveSlide(-1)}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            aria-label="Next featured story"
            onClick={() => moveSlide(1)}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </section>

      <section className="trending-stories">
        <div className="trending-heading">
          <h2>
            <span className="trending-icon">◈</span>
            Trending Stories
          </h2>

          <Link href="/app/news?view=all">
            View All <ChevronRight size={14} />
          </Link>
        </div>

        <div className="trending-list">
          {trendingStories.map((story, index) => (
            <article className="trending-story" key={story.title}>
              <Image
                src={story.image}
                alt=""
                width={64}
                height={54}
                unoptimized
                className="trending-thumbnail"
              />

              <div className="trending-story-content">
                <span className="trending-category">{story.category}</span>
                <h3>{story.title}</h3>

                <div className="trending-meta">
                  <span>{story.views} views</span>
                  <span>· {story.time}</span>
                  <span className="trending-comments">
                    <MessageCircle size={12} />
                    {story.comments}
                  </span>
                </div>
              </div>

              <span className="trending-row-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
