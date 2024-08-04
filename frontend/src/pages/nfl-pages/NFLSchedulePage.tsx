import { useEffect } from "react";

const NFLSchedulePage = () => {
  useEffect(() => {
    async function fetchAPIData() {
      const url =
        "https://m01y6p3v80.execute-api.us-east-2.amazonaws.com/api/schedule";

      try {
        const res = await fetch(url);
        const data = await res.json();
        console.log("DATA\n", data);
      } catch (err) {
        console.log(err.message);
      }
    }
    fetchAPIData();
  }, []);
  return <></>;
};

export default NFLSchedulePage;
