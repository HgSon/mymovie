import Header from "../../components/Header";
import TvContainer from "./TvContainer";
import React, { useState } from "react";

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
export default TV;
