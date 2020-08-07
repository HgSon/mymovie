import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

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
          {topRated.map((show) => {
            const {
              id,
              poster_path,
              name,
              vote_average,
              first_air_date,
            } = show;
            return (
              <Poster
                key={id}
                id={id}
                imageUrl={poster_path}
                title={name}
                rating={vote_average}
                year={first_air_date && first_air_date.substring(0, 4)}
              />
            );
          })}
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular">
          {popular.map((show) => {
            const {
              id,
              poster_path,
              name,
              vote_average,
              first_air_date,
            } = show;
            return (
              <Poster
                key={id}
                id={id}
                imageUrl={poster_path}
                title={name}
                rating={vote_average}
                year={first_air_date && first_air_date.substring(0, 4)}
              />
            );
          })}
        </Section>
      )}
      {airingToday && airingToday.length > 0 && (
        <Section title="Airing Today">
          {airingToday.map((show) => {
            const {
              id,
              poster_path,
              name,
              vote_average,
              first_air_date,
            } = show;
            return (
              <Poster
                key={id}
                id={id}
                imageUrl={poster_path}
                title={name}
                rating={vote_average}
                year={first_air_date && first_air_date.substring(0, 4)}
              />
            );
          })}
        </Section>
      )}
      {error && <Message text={error} color="#e74c3c" />}
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
