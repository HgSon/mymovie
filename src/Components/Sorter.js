import React, { useState } from "react";
import styled, { css } from "styled-components";

function Sorter({ changeSortby }) {
  const [sort, setSort] = useState(false);
  const onChange = (event) => changeSortby(event.target.value);
  return (
    <>
      <button onClick={() => setSort(!sort)}>Sort</button>
      {sort && (
        <form>
          <label>
            Sort by :
            <select name="sortBy" onChange={onChange}>
              <option value="default">Select option</option>
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="highestRated">Highest Rated</option>
              <option value="lowestRated">Lowest Rated</option>
              <option value="morePopular">More Popular</option>
              <option value="lessPopular">Less Popular</option>
            </select>
          </label>
        </form>
      )}
    </>
  );
}
//각각에 대해서
export default Sorter;
