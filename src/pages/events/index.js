import { useRouter } from "next/router";

// import { getAllEvents } from "../../../dummy-data";
import EventList from "@/components/events/EventList";
import EventsSearch from "@/components/events/events-search";

function AllEventsPage(props) {
  const { events } = props;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  };

  return (
    <div>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await fetch(
    "https://nextjs-course-2caa2-default-rtdb.firebaseio.com/events.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const array = [];
      for (const key in data) {
        array.push({
          id: key,
          ...data[key],
        });
      }
      return array;
    });

  return {
    props: {
      events: data,
    },
    revalidate: 1800
  };
}

export default AllEventsPage;
