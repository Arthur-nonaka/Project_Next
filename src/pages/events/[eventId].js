import { Fragment } from "react";
import EventSummary from "@/components/eventDetail/event-summary";
import EventLogistics from "@/components/eventDetail/event-logistics";
import EventContent from "@/components/eventDetail/event-content";

function EventPage(props) {
  const { event } = props;
  if (!event || event.length === 0) {
    return <p>No Event Found ! 404 Error</p>;
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const { params } = context;
  const data = await fetch(
    "https://nextjs-course-2caa2-default-rtdb.firebaseio.com/events.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const filteredData = Object.keys(data)
        .filter((key) => key === params.eventId)
        .map((key) => data[key])[0];
      return filteredData;
    });
  const notFound = data ? false : true;
  return {
    props: {
      event: data,
    },
    revalidate: 30,
    notFound,
  };
}

export async function getStaticPaths(context) {
  const paths = await fetch(
    "https://nextjs-course-2caa2-default-rtdb.firebaseio.com/events.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const paths = [];
      for (const key in data) {
        paths.push({ params: { eventId: key } });
      }
      return paths;
    });

  return {
    paths: paths,
    fallback: true,
  };
}

export default EventPage;
