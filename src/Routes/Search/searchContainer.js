import SearchPresenter from "./SearchPresenter";
import React from "react";
import { movieApi, tvApi } from "api";
import SearchBar from "./searchBar";
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
    this.setState({ movieGenres, showGenres });
  }
  handleChecked = (event) => {
    console.log(!event.target.checked);
    const { movieGenres, showGenres } = this.state;
    const { checked, value, name } = event.target;
    let selectedMGenres = Object.assign({}, movieGenres);
    let selectedTVGenres = Object.assign({}, showGenres);
    if (name === "movieGenres") {
      checked
        ? (selectedMGenres[value] = event.target.innerHTML)
        : delete selectedMGenres[value];
    }
    if (name === "showGenres") {
      checked
        ? (selectedTVGenres[value] = event.target.innerHTML)
        : delete selectedTVGenres[value];
    }
    this.setState({
      movieGenres: selectedMGenres,
      showGenres: selectedTVGenres,
    });
    //여기 켰다껐다할때마다 연산너무안늦은지 확인
    //어차피 submit해야 화면변하니까 상관없나?
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
    const { searchTerm, advancedSearch } = this.state;
    this.setState({ loading: true });
    this.setState({ staticTerm: searchTerm });
    try {
      const {
        data: { results: movieResults },
      } = await movieApi.search(searchTerm);
      const {
        data: { results: tvResults },
      } = await tvApi.search(searchTerm);
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
      genresShow,
      genresMovie,
      advancedSearch,
      showGenres,
      movieGenres,
    } = this.state;
    return (
      <Container>
        <SearchBar
          advancedSearch={advancedSearch}
          changeSearchMode={this.changeSearchMode}
          movieGenres={movieGenres}
          showGenres={showGenres}
          handleChecked={this.handleChecked}
          handleMovieOrShow={this.handleMovieOrShow}
          handleReleaseDate={this.handleReleaseDate}
          handleSubmit={this.handleSubmit}
          searchTerm={searchTerm}
          updateTerm={this.updateTerm}
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
