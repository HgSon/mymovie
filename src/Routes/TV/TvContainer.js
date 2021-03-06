import TvPresenter from "./TvPresenter";
import React from "react";
import { tvApi } from "api";

class TvContainer extends React.Component {
  state = {
    topRated: null,
    airingToday: null,
    popular: null,
    loading: true,
    error: null,
    genreList: null,
    sortBy: "default",
  };
  async componentDidMount() {
    try {
      const {
        data: { results: topRated },
      } = await tvApi.topRated();
      const {
        data: { results: airingToday },
      } = await tvApi.airingToday();
      const {
        data: { results: popular },
      } = await tvApi.popular();
      const {
        data: { genres },
      } = await tvApi.showGenres();
      let genreList = {};
      genres.forEach((v) => (genreList[v.id] = v.name));
      this.setState({ genreList, topRated, airingToday, popular });
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

    const { topRated, airingToday, popular } = this.state;
    const copiedTopRated = topRated.slice();
    const copiedAiringToday = airingToday.slice();
    const copiedPopular = popular.slice();
    const sortLatest = (a, b) =>
      Date.parse(b["first_air_date"]) - Date.parse(a["first_air_date"]);
    const sortOldest = (a, b) =>
      Date.parse(a["first_air_date"]) - Date.parse(b["first_air_date"]);
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
    const sortedTopRated = copiedTopRated.sort(fn);
    const sortedAiringToday = copiedAiringToday.sort(fn);
    const sortedPopular = copiedPopular.sort(fn);
    this.setState({
      topRated: sortedTopRated,
      airingToday: sortedAiringToday,
      popular: sortedPopular,
      sortBy,
    });
  }
  render() {
    const {
      genreList,
      topRated,
      airingToday,
      popular,
      loading,
      error,
    } = this.state;
    return (
      <TvPresenter
        genreList={genreList}
        topRated={topRated}
        airingToday={airingToday}
        popular={popular}
        loading={loading}
        error={error}
      />
    );
  }
}

export default TvContainer;
