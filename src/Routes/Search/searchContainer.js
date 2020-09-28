import SearchPresenter from "./SearchPresenter";
import React from "react";
import { movieApi, tvApi } from "api";
import SearchBar from "./searchBar";
import styled from "styled-components";
const Container = styled.div`
  padding: 0 10px;
`;
export default class extends React.Component {
  constructor(props){
    super(props);
    this.state = {
    movieResults: null,
    tvResults: null,
    searchTerm: "",
    staticTerm: "",
    loading: false,
    error: null,
    genresMovie: null,
    genresShow: null,
    advancedSearch: false,
    movieOrShow: "both"
  };
  this.handleMovieOrShow = this.handleMovieOrShow.bind(this);
  this.handleReleaseDate = this.handleReleaseDate.bind(this);
  }
  async componentDidMount(){
    const {
        data: { genres: genresMovie },
      } = await movieApi.movieGenres();
    const {
        data: { genres: genresShow },
      } = await tvApi.showGenres();
    this.setState({genresMovie, genresShow})
  }
  handleReleaseDate = (event) => {
    console.log(event.target.name)
  }
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
  this.setState(state=>({advancedSearch: !state.advancedSearch}))
}
handleMovieOrShow(event){
    this.setState({movieOrShow: event.target.value})
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
      advancedSearch
    } = this.state;
    return (
      <Container>
      <SearchBar/>
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
        genresShow={genresShow}
        genresMovie={genresMovie}
        advancedSearch={advancedSearch}
        changeSearchMode={this.changeSearchMode}
        handleMovieOrShow={this.handleMovieOrShow}
        handleReleaseDate={this.handleReleaseDate}
        
      />
      </Container>
    );
  }
}
