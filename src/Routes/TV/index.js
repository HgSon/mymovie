import Header from "../../Components/Header";
import TvContainer from "./TvContainer";
import React, { useState } from "react";
export default TV;

function TV() {
  const [sortBy, setSortby] = useState(null);
  const changeSortby = (sortby) => {
    setSortby(sortby);
  };
  return (
    <>
      <Header changeSortby={changeSortby} />
      <TvContainer sortBy={sortBy} />
    </>
  );
}
