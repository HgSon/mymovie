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
const SubList = styled.ul`
  width: 240px;
  height: 40px;
  display: flex;
  position: absolute;
  top: -99999999px;
  left: 10px;
`;
const Item = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
  background: ${(props) => (props.current ? "#c0392b" : "transparent")};
  transition: background 0.4s ease-in-out;
  &:hover ${SubList} {
    top: ${(props) => (props.current ? "50px" : "-99999999px")};
  }
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SubItem = styled.li`
  width: 80px;
  height: 100%;
  line-height: 22px;
  text-align: center;
`;

const HeaderC = ({ location: { pathname } }) => {
  return (
    <Header>
      <List>
        <Item current={pathname === "/"}>
          <SLink to="/">Movie</SLink>
          <SubList>
            <SubItem>
              <Link to="#movieNowplaying">Now Playing</Link>
            </SubItem>
            <SubItem>
              <Link to="#movieUpcoming">Upcoming</Link>
            </SubItem>
            <SubItem>
              <Link to="#">Popular</Link>
            </SubItem>
          </SubList>
        </Item>
        <Item current={pathname === "/tv"}>
          <SLink to="/tv">TV</SLink>
          <SubList>
            <SubItem>
              <Link to="#">Top Rated</Link>
            </SubItem>
            <SubItem>
              <Link to="#">Popular</Link>
            </SubItem>
            <SubItem>
              <Link to="#">Airing Today</Link>
            </SubItem>
          </SubList>
        </Item>
        <Item current={pathname === "/search"}>
          <SLink to="/search">Search</SLink>
        </Item>
      </List>
    </Header>
  );
};

export default withRouter(HeaderC);
