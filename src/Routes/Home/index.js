import Header from "../../components/Header";
import HomeContainer from "./HomeContainer";
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
