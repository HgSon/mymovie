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
