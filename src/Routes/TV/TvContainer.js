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
      this.setState({ topRated, airingToday, popular });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { topRated, airingToday, popular, loading, error } = this.state;
    return (
      <TvPresenter
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
