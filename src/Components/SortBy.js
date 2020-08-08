import React, { useState } from "react";
import styled from "styled-components";

const Sort = styled.div`
  width: 80px;
  position: fixed;
  top: 14px;
  left: 85%;
  text-align: center;
  z-index: 99999999;
  & > span {
    width: 80px;
    height: 25px;
    display: block;
    line-height: 25px;
  }
`;
const Option = styled.li`
  height: 25px;
  line-height: 25px;
  cursor: pointer;
`;

export default () => {
  const [sort, setSort] = useState("");
  const handleSortby = (event) => {
    const { target } = event;
    const sortText = target.innerText.toLowerCase();
    setSort(sortText);
  };
  return (
    <Sort>
      <span>Sort by</span>
      <ul>
        <Option onClick={handleSortby}>Rating</Option>
        <Option onClick={handleSortby}>Year</Option>
      </ul>
    </Sort>
  );
};
