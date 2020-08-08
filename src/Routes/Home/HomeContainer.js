import HomePresenter from "./HomePresenter";
import React from "react";
import { movieApi } from "api";

class HomeContainer extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    loading: true,
    error: null,
    genreList: null,
  };
  async componentDidMount() {
    try {
      const {
        data: { results: nowPlaying },
      } = await movieApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await movieApi.upcoming();
      const {
        data: { results: popular },
      } = await movieApi.popular();
      const {
        data: { genres },
      } = await movieApi.movieGenres();
      let genreList = {};
      genres.forEach((v) => {
        genreList[v.id] = v.name;
      });
      this.setState({ nowPlaying, upcoming, popular, genreList });
    } catch (error) {
      this.setState({ error: `${error}` });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const {
      nowPlaying,
      upcoming,
      popular,
      loading,
      error,
      genreList,
    } = this.state;
    return (
      <HomePresenter
        genreList={genreList}
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        loading={loading}
        error={error}
      />
    );
  }
}

export default HomeContainer;
