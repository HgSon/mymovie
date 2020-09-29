import SearchPresenter from "./SearchPresenter";
import React from "react";
import { movieApi, tvApi } from "api";
import SearchBar from "./SearchBar";
import styled from "styled-components";
const Container = styled.div`
  padding: 0 10px;
`;
export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieResults: null,
      tvResults: null,
      searchTerm: "",
      staticTerm: "",
      loading: false,
      error: null,
      advancedSearch: false,
      movieGenres: {},
      movieOrShow: "both",
      dateFrom: "",
      dateTo: "",
      showGenres: {},
    };
    this.handleMovieOrShow = this.handleMovieOrShow.bind(this);
    this.handleReleaseDate = this.handleReleaseDate.bind(this);
  }
  async componentDidMount() {
    const {
      data: { genres: genresMovie },
    } = await movieApi.movieGenres();
    const {
      data: { genres: genresShow },
    } = await tvApi.showGenres();
    let movieGenres = {};
    let showGenres = {};
    genresMovie.forEach((movie) => {
      movieGenres[movie["id"]] = movie["name"];
    });
    genresShow.forEach((show) => {
      showGenres[show["id"]] = show["name"];
    });
    this.setState({
      movieGenres,
      showGenres,
      selectedMvGenres: Object.assign({}, movieGenres),
      selectedTVGenres: Object.assign({}, showGenres),
    });
  }
  handleChecked = (event) => {
    const { checked, value, name } = event.target;
    let selectedMvGenres, selectedTVGenres;
    ({ selectedMvGenres, selectedTVGenres } = this.state);
    if (name === "movieGenres") {
      checked
        ? (selectedMvGenres[value] = event.target.parentNode.innerText)
        : delete selectedMvGenres[value];
    }
    if (name === "showGenres") {
      checked
        ? (selectedTVGenres[value] = event.target.parentNode.innerText)
        : delete selectedTVGenres[value];
    }
    this.setState({ selectedMvGenres, selectedTVGenres });
  };
  handleReleaseDate = (event) => {
    const {
      target: { name, value },
    } = event;
    name === "from"
      ? this.setState({ dateFrom: value })
      : this.setState({ dateTo: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { searchTerm } = this.state;
    if (searchTerm !== "") this.searchByTerm();
  };
  searchByTerm = async () => {
    const {
      searchTerm,
      advancedSearch,
      movieOrShow,
      dateFrom,
      dateTo,
      selectedMvGenres,
      selectedTVGenres,
    } = this.state;
    this.setState({ loading: true });
    this.setState({ staticTerm: searchTerm });
    let tvResults;
    let movieResults;
    try {
      ({
        data: { results: movieResults },
      } = await movieApi.search(searchTerm));
      ({
        data: { results: tvResults },
      } = await tvApi.search(searchTerm));
      if (advancedSearch) {
        if (movieOrShow === "movie") {
          tvResults = [];
        } else if (movieOrShow === "tvshow") {
          movieResults = [];
        }
        if (movieResults.length) {
          if (dateTo) {
            movieResults = movieResults.filter(
              (movie) =>
                movie["release_date"] &&
                parseInt(movie["release_date"].substring(0, 4)) <= dateTo
            );
          }
          if (dateFrom) {
            movieResults = movieResults.filter(
              (movie) =>
                movie["release_date"] &&
                parseInt(movie["release_date"].substring(0, 4)) >= dateFrom
            );
          }
          if (selectedMvGenres) {
            let selectedList = [];
            let leftList = movieResults.slice();
            for (const prop in selectedMvGenres) {
              let genreList = leftList.filter(
                (movie) =>
                  movie["genre_ids"] &&
                  movie["genre_ids"].includes(Number(prop))
              );
              leftList = leftList.filter(
                (movie) =>
                  !movie["genre_ids"] ||
                  !movie["genre_ids"].includes(Number(prop))
              );
              selectedList = [...selectedList, ...genreList];
              console.log(selectedList, leftList);
            }
            movieResults = selectedList;
          }
        }
        if (tvResults.length) {
          if (dateTo) {
            tvResults = tvResults.filter(
              (show) =>
                show["first_air_date"] &&
                parseInt(show["first_air_date"].substring(0, 4)) <= dateTo
            );
          }
          if (dateFrom) {
            tvResults = tvResults.filter(
              (show) =>
                show["first_air_date"] &&
                parseInt(show["first_air_date"].substring(0, 4)) >= dateFrom
            );
          }
          if (selectedTVGenres) {
            let selectedList = [];
            let leftList = tvResults.slice();
            for (const prop in selectedTVGenres) {
              let genreList = leftList.filter(
                (show) =>
                  show["genre_ids"] && show["genre_ids"].includes(Number(prop))
              );
              leftList = leftList.filter(
                (show) =>
                  !show["genre_ids"] ||
                  !show["genre_ids"].includes(Number(prop))
              );
              selectedList = [...selectedList, ...genreList];
            }
            tvResults = selectedList;
          }
        }
      }
      this.setState({
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
  changeSearchMode = () => {
    this.setState((state) => ({ advancedSearch: !state.advancedSearch }));
  };
  handleMovieOrShow(event) {
    this.setState({ movieOrShow: event.target.value });
  }
  render() {
    const {
      movieResults,
      tvResults,
      loading,
      error,
      searchTerm,
      staticTerm,
      advancedSearch,
      showGenres,
      movieGenres,
    } = this.state;
    return (
      <Container>
        <SearchBar
          advancedSearch={advancedSearch}
          changeSearchMode={this.changeSearchMode}
          handleChecked={this.handleChecked}
          handleMovieOrShow={this.handleMovieOrShow}
          handleReleaseDate={this.handleReleaseDate}
          handleSubmit={this.handleSubmit}
          searchTerm={searchTerm}
          updateTerm={this.updateTerm}
          movieGenres={movieGenres}
          showGenres={showGenres}
        />
        <SearchPresenter
          error={error}
          movieGenres={movieGenres}
          showGenres={showGenres}
          loading={loading}
          movieResults={movieResults}
          staticTerm={staticTerm}
          tvResults={tvResults}
        />
      </Container>
    );
  }
}
