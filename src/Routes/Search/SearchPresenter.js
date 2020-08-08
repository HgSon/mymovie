import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "Components/Loader";
import Section from "Components/Section";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0 10px;
`;
const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
  all: unset;
  font-size: 18px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  error,
  searchTerm,
  handleSubmit,
  updateTerm,
  staticTerm,
  movieGenresList,
  showGenresList,
}) => (
  <Container>
    <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies or TV Shows..."
        value={searchTerm}
        onChange={updateTerm}
      />
    </Form>
    {loading ? (
      <Loader />
    ) : (
      <>
        {movieResults && movieResults.length > 0 && (
          <Section title="Movie Results">
            {movieResults.map((movie) => {
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
                  genreList={movieGenresList}
                />
              );
            })}
          </Section>
        )}
        {tvResults && tvResults.length > 0 && (
          <Section title="TV Show Results">
            {tvResults.map((show) => {
              const {
                id,
                poster_path,
                name,
                vote_average,
                first_air_date,
                genre_ids,
              } = show;
              return (
                <Poster
                  key={id}
                  id={id}
                  imageUrl={poster_path}
                  title={name}
                  rating={vote_average}
                  year={first_air_date && first_air_date.substring(0, 4)}
                  genreIds={genre_ids}
                  genreList={showGenresList}
                />
              );
            })}
          </Section>
        )}
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message
              text={`Nothing Found for "${staticTerm}"`}
              color="#7f8c8d"
            />
          )}
        {error && <Message text={error} color="#e74c3c" />}
      </>
    )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  searchTerm: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  updateTerm: PropTypes.func.isRequired,
  staticTerm: PropTypes.string,
  movieGenresList: PropTypes.object,
  showGenresList: PropTypes.object,
};

export default SearchPresenter;
