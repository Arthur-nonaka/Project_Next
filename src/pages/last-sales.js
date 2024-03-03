import { useEffect, useState } from "react";

function LastSalePage() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nextjs-course-2caa2-default-rtdb.firebaseio.com/sales.json")
      .then((res) => res.json())
      .then((data) => {
        const transformedData = [];
        for (const key in data) {
            transformedData.push({id: key, username: data[key].username, volume: data[key].volume});
        }
        setData(transformedData);
        setIsLoading(false);
      });
  }, []);

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(!data) {
    return <p>No Data yet</p>
  }

  return <ul>{data.map(x => <li key={x.id}>{x.username} : {x.volume}</li>)}</ul>;
}

export default LastSalePage;
