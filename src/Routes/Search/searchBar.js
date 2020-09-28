import React from "react";
import styled, {css} from "styled-components";
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
    genresMovie,
    genresShow,
    handleSubmit,
    searchTerm,
    updateTerm,
    advancedSearch,
    handleMovieOrShow,
    handleReleaseDate,
    changeSearchMode
}) => {
    let movieGenresList = [];
    let showGenresList = [];
    if(genresMovie && genresShow){
genresMovie.forEach((movie) => {
  movieGenresList.push(<label key={movie["id"]}>{movie["name"]}<input type="checkbox" name="movieGenres" value={movie["id"]} defaultChecked /></label>)
});
genresShow.forEach((show) => {
  showGenresList.push(<label key={show["id"]}>{show["name"]}<input type="checkbox" name="showGenres" value={show["id"]} defaultChecked /></label>)
})
  }
  return (
      <div>
      <Form onSubmit={handleSubmit}>
      <Input
        placeholder="Search Movies or TV Shows..."
        value={searchTerm}
        onChange={updateTerm}
      />
      {advancedSearch&& 
      <select onChange={handleMovieOrShow}>
        <option value="both" defaultChecked>Both</option>
        <option value="movie">Movie</option>
        <option value="tvshow">TV Show</option>
      </select>
      <label>Release Date : 
        <input type="text" placeholder="from" name="from" onChange={handleReleaseDate}/>
       ~
        <input type="text" placeholder="to" name="to" onChange={handleReleaseDate}/>
      </label>
      <h3>Movie</h3>
      {movieGenresList}    
      <h3>TV Show</h3>
      {showGenresList}
    }
    </Form>
    <button onClick={changeSearchMode}>{advancedSearch? "Advanced Search": "Back to Basic"}</button>
  </div>
  )
}

export default SearchBar