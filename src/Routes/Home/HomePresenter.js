import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import SortBy from "Components/SortBy";

const Container = styled.div`
  padding: 0px 10px;
`;

const HomePresenter = ({
  genreList,
  nowPlaying,
  upcoming,
  popular,
  loading,
  error,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      <SortBy />
      {nowPlaying && nowPlaying.length > 0 && (
        <Section title="Now Playing" id="MovieNowplaying">
          {nowPlaying.map((movie) => {
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
        </Section>
      )}
      {upcoming && upcoming.length > 0 && (
        <Section title="Upcoming" id="MovieUpcoming">
          {upcoming.map((movie) => {
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
        </Section>
      )}
      {popular && popular.length > 0 && (
        <Section title="Popular" id="moviePopular">
          {popular.map((movie) => {
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
        </Section>
      )}
      {error && <Message text={error} color="#e74c3c" />}
    </Container>
  );

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  genreList: PropTypes.object,
};

export default HomePresenter;
