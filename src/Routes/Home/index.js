import Header from "../../Components/Header";
import HomeContainer from "./homeContainer";
import React, { useRef, useState, useEffect } from "react";

function Home() {
  const [sortBy, setSortby] = useState(null);
  const changeSortby = (sortby) => {
    setSortby(sortby);
  };
  return (
    <>
      <Header changeSortby={changeSortby} />
      <HomeContainer sortBy={sortBy} />
    </>
  );
}

export default Home;
