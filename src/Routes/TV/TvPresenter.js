import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Section from "Components/Section";
import Loader from "Components/Loader";

const Container = styled.div`
  padding: 0 10px;
`;

const TvPresenter = ({ topRated, airingToday, popular, loading, error }) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section title="Top Rated">
          {topRated.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular">
          {popular.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map((show) => (
            <span key={show.id}>{show.name}</span>
          ))}
        </Section>
      )}
    </Container>
  );

TvPresenter.propTypes = {
  topRated: propTypes.array,
  airingToday: propTypes.array,
  popular: propTypes.array,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
};

export default TvPresenter;
