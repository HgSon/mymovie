import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  width: 90%;
  margin: 0 auto;
  :not(:last-child) {
    margin-bottom: 50px;
  }
`;
const Title = styled.span`
  font-size: 14px;
  font-weight: 600;
`;
const Grid = styled.div`
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 130px);
  grid-gap: 20px;
`;

const Section = ({ id, title, children }) => {
  children.sort((a, b) => b.props.rating - a.props.rating);
  return (
    <Container id={id}>
      <Title>{title}</Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
