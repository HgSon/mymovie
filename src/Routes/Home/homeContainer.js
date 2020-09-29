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
    sortBy: "default",
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
  shouldComponentUpdate(nextProps) {
    return nextProps.sortBy === this.state.sortBy ? false : true;
  }
  componentDidUpdate() {
    const { sortBy } = this.props;
    if (!sortBy) return;
    if (sortBy === "default") return this.setState({ sortBy });

    const { nowPlaying, upcoming, popular } = this.state;
    const copiedNowplaying = nowPlaying.slice();
    const copiedUpcoming = upcoming.slice();
    const copiedPopular = popular.slice();
    const sortLatest = (a, b) =>
      Date.parse(b["release_date"]) - Date.parse(a["release_date"]);
    const sortOldest = (a, b) =>
      Date.parse(a["release_date"]) - Date.parse(b["release_date"]);
    const sortHigh = (a, b) => b["vote_average"] - a["vote_average"];
    const sortLow = (a, b) => a["vote_average"] - b["vote_average"];
    const sortMorePopular = (a, b) => b["popularity"] - a["popularity"];
    const sortLessPopular = (a, b) => a["popularity"] - b["popularity"];
    let fn;
    switch (sortBy) {
      case "latest":
        fn = sortLatest;
        break;
      case "oldest":
        fn = sortOldest;
        break;
      case "highestRated":
        fn = sortHigh;
        break;
      case "lowestRated":
        fn = sortLow;
        break;
      case "morePopular":
        fn = sortMorePopular;
        break;
      case "lessPopular":
        fn = sortLessPopular;
        break;
      default:
        fn = () => false;
    }
    const sortedNowplaying = copiedNowplaying.sort(fn);
    const sortedUpcoming = copiedUpcoming.sort(fn);
    const sortedPopular = copiedPopular.sort(fn);
    this.setState({
      nowPlaying: sortedNowplaying,
      upcoming: sortedUpcoming,
      popular: sortedPopular,
      sortBy,
    });
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
