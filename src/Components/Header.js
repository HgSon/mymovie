import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";

const Header = styled.header`
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  z-index: 10;
  background-color: rgba(20, 20, 20, 0.8);
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 4px solid
    ${(props) => (props.current ? "#2c82c9" : "transparent")};
  transition: border-bottom 0.4s ease-in-out;
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SubList = styled.ul``;
const SubItem = styled.li``;

const HeaderC = ({ location: { pathname } }) => (
  <Header>
    <List>
      <Item current={pathname === "/"}>
        <SLink to="/">Movie</SLink>
        <SubList>
          <SubItem>
            <Link to="#">Now Playing</Link>
          </SubItem>
          <SubItem>
            <Link to="#">Now Playing</Link>
          </SubItem>
          <SubItem>
            <Link to="#">Now Playing</Link>
          </SubItem>
        </SubList>
      </Item>
      <Item current={pathname === "/tv"}>
        <SLink to="/tv">TV</SLink>
      </Item>
      <Item cunrrent={pathname === "/search"}>
        <SLink to="/search">Search</SLink>
      </Item>
    </List>
  </Header>
);

export default withRouter(HeaderC);
