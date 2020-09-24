import React from "react";
import Poster from "./Poster";
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

const Section = ({ title, content, genreList, id }) => (
  <SectionBox title={title} id={id}>
    {content.map((movie) => {
      console.log(content);
      const {
        id,
        poster_path,
        title,
        vote_average,
        release_date,
        genre_ids,
      } = movie;
      return (
        <Poster
          key={id}
          id={id}
          imageUrl={poster_path}
          title={title}
          rating={vote_average}
          year={release_date && release_date.substring(0, 4)}
          isMovie={true}
          genreIds={genre_ids}
          genreList={genreList}
        />
      );
    })}
  </SectionBox>
);

const SectionBox = ({ id, title, children }) => (
  <Container id={id}>
    <Title>{title}</Title>
    <Grid>{children}</Grid>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired,
  genreList: PropTypes.array,
};

SectionBox.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Section;
