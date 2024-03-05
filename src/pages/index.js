import EventList from "@/components/events/EventList";

function HomePage(props) {
  const featuredEvents = props.featuredEvents;

  if (!featuredEvents) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <EventList items={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const data = await fetch(
    "https://nextjs-course-2caa2-default-rtdb.firebaseio.com/events.json"
  )
    .then((data) => data.json())
    .then((json) => {
      const transformedData = [];
      for (const key in json) {
        if (json[key].isFeatured) {
          transformedData.push({
            id: key,
            ...json[key]
          });
        }
      }
      return transformedData;
    });

  return {
    props: {
      featuredEvents: data,
    },
    revalidate: 1800
  };
}

export default HomePage;
