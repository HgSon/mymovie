import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;
const Input = styled.input`
  all: unset;
  font-size: 18px;
  width: 100%;
`;
const SearchBar = ({
  advancedSearch,
  changeSearchMode,
  handleChecked,
  handleMovieOrShow,
  handleReleaseDate,
  handleSubmit,
  movieGenres,
  searchTerm,
  showGenres,
  updateTerm,
}) => {
  let movieGenresList = [];
  let showGenresList = [];
  if (movieGenres && showGenres) {
    for (let prop in movieGenres) {
      movieGenresList.push(
        <label key={prop}>
          {movieGenres[prop]}
          <input
            type="checkbox"
            name="movieGenres"
            value={prop}
            defaultChecked
            onChange={handleChecked}
          />
        </label>
      );
    }
    for (let prop in showGenres) {
      showGenresList.push(
        <label key={prop}>
          {showGenres[prop]}
          <input
            type="checkbox"
            name="showGenres"
            value={prop}
            defaultChecked
            onChange={handleChecked}
          />
        </label>
      );
    }
  }
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Search Movies or TV Shows..."
          value={searchTerm}
          onChange={updateTerm}
        />
        <input type="submit" value="search" />
      </Form>
      <button onClick={changeSearchMode}>
        {advancedSearch ? "Back to Basic" : "Advanced Search"}
      </button>
      {advancedSearch && (
        <div>
          <select onChange={handleMovieOrShow}>
            <option value="both" defaultChecked>
              Both
            </option>
            <option value="movie">Movie</option>
            <option value="tvshow">TV Show</option>
          </select>
          <label>
            Release Date :
            <input
              type="text"
              placeholder="from"
              name="from"
              onChange={handleReleaseDate}
            />
            ~
            <input
              type="text"
              placeholder="to"
              name="to"
              onChange={handleReleaseDate}
            />
          </label>
          <div>
            <h3>Movie</h3>
            {movieGenresList}
          </div>
          <div>
            <h3>TV Show</h3>
            {showGenresList}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
