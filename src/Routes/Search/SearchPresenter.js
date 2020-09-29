import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "components/Loader";
import Section from "components/Section";
import Message from "components/Message";

const SearchPresenter = ({
  error,
  movieGenres,
  showGenres,
  loading,
  movieResults,
  staticTerm,
  tvResults,
}) => {
  return (
    <main>
      {loading ? (
        <Loader />
      ) : (
        <>
          {movieResults && movieResults.length > 0 && (
            <Section
              title="Movie Results"
              content={movieResults}
              genreList={movieGenres}
              id="movieResults"
            />
          )}
          {tvResults && tvResults.length > 0 && (
            <Section
              title="TV Show Results"
              content={tvResults}
              genreList={showGenres}
              id="tvShowResults"
            />
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
    </main>
  );
};

SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  tvResults: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  // searchTerm: PropTypes.string,
  // handleSubmit: PropTypes.func.isRequired,
  // updateTerm: PropTypes.func.isRequired,
  staticTerm: PropTypes.string,
};

export default SearchPresenter;
