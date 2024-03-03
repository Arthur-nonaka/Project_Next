import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalePage() {
  const [sales, setSales] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const fetcher = (url) =>
    fetch(url)
      .then((res) => res.json());
  const {data, isLoading, error} = useSWR(
    "https://nextjs-course-2caa2-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );
  
  useEffect(() => {
    if (data) {
      const transformedData = [];
      for (const key in data) {
        transformedData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedData);
    }
  }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch("https://nextjs-course-2caa2-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedData = [];
  //       for (const key in data) {
  //           transformedData.push({id: key, username: data[key].username, volume: data[key].volume});
  //       }
  //       setSales(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (error) {
    return <p>Error</p>;
  }

  if (!data) {
    return <p>Loading...</p>;
  }

  if (!sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((x) => (
        <li key={x.id}>
          {x.username} : {x.volume}
        </li>
      ))}
    </ul>
  );
}

export default LastSalePage;
