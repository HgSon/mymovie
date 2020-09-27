import SearchPresenter from "./SearchPresenter";
import React from "react";
import { movieApi, tvApi } from "api";

export default class extends React.Component {
  state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    staticTerm: "",
    loading: false,
    error: null,
    movieGenresList: null,
    showGenresList: null,
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") this.searchByTerm();
  };
  searchByTerm = async () => {
    const { searchTerm } = this.state;
    this.setState({ loading: true });
    this.setState({ staticTerm: searchTerm });
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
      const {
        data: { genres: genresMovie },
      } = await movieApi.movieGenres();
      const {
        data: { genres: genresShow },
      } = await tvApi.showGenres();
      let movieGenresList = {};
      let showGenresList = {};
      console.log(movieResults, tvResults, genresMovie, genresShow);
      genresMovie.forEach((v) => (movieGenresList[v.id] = v.name));
      genresShow.forEach((v) => (showGenresList[v.id] = v.name));
      this.setState({
        movieGenresList,
        showGenresList,
        movieResults,
        tvResults,
      });
    } catch (error) {
      this.setState({ error: `${error}` });
    } finally {
      this.setState({ loading: false });
    }
  };
  updateTerm = (event) => {
    const {
      target: { value },
    } = event;
    this.setState({ searchTerm: value });
  };
  render() {
    const {
      movieResults,
      tvResults,
      loading,
      error,
      searchTerm,
      staticTerm,
      showGenresList,
      movieGenresList,
    } = this.state;
    return (
      <SearchPresenter
        movieResults={movieResults}
        tvResults={tvResults}
        loading={loading}
        error={error}
        searchTerm={searchTerm}
        handleSubmit={this.handleSubmit}
        searchByTerm={this.searchByTerm}
        updateTerm={this.updateTerm}
        staticTerm={staticTerm}
        showGenresList={showGenresList}
        movieGenresList={movieGenresList}
      />
    );
  }
}
