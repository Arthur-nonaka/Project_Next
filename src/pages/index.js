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
            title: json[key].title,
            location: json[key].location,
            description: json[key].description,
            date: json[key].date,
            image: json[key].image,
            isFeatured: json[key].isFeatured,
          });
        }
      }
      return transformedData;
    });

  return {
    props: {
      featuredEvents: data,
    },
  };
}

export default HomePage;
