import { useRouter } from "next/router";

import EventList from "@/components/events/EventList";

function FilteredEventsPage(props) {
  const { filteredEvents } = props;

  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No Events Found ;-;</p>;
  }

  return (
    <div>
      <EventList items={filteredEvents} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(
      numMonth ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    )
  ) {
    return {
      notFound: true,
    };
  }

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

  const filteredEvents = data.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1
    );
  });

  return {
    props: {
      filteredEvents,
    },
  };
}

export default FilteredEventsPage;
