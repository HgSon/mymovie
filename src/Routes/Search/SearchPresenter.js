import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";
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
        {tvResults &&
          movieResults &&
          tvResults.length === 0 &&
          movieResults.length === 0 && (
            <Message
              text={`Nothing Found for "${staticTerm}"`}
              color="#83D6DE"
            />
          )}
        {error && <Message text={error} color="#e74c3c" />}
      </>
    )}
  </Container>
);

SearchPresenter.propTypes = {
  movieResults: propTypes.array,
  tvResults: propTypes.array,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  searchTerm: propTypes.string,
  handleSubmit: propTypes.func.isRequired,
  updateTerm: propTypes.func.isRequired,
  staticTerm: propTypes.string,
};

export default SearchPresenter;
