import React from "react";
import styled from "styled-components";

const SubList = styled.ul`
  width: 240px;
  height: 40px;
  display: flex;
  position: absolute;
  top: -99999999px;
  left: 10px;
`;
const SubItem = styled.li`
  width: 80px;
  height: 100%;
  line-height: 22px;
  text-align: center;
`;
// console.log(document.getElementById("movieNowplaying"));
export default (props) => {
  // console.log(props.items[0]);
  const target = document.getElementById(props.items[0]);
  // console.log(target);
  return (
    <SubList>
      <SubItem></SubItem>
      <SubItem>Upcoming</SubItem>
      <SubItem>Popular</SubItem>
    </SubList>
  );
};
