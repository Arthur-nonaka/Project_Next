import { getFeaturedEvents } from "../../dummy-data";

import EventList from "@/components/events/EventList";

function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div className="main">
      <EventList items={featuredEvents} />
    </div>
  );
}

export default HomePage;
