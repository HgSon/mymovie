import MoviePresenter from "./MoviePresenter";
import ShowPresenter from "./ShowPresenter";
import React from "react";
import { movieApi, tvApi } from "api";

class DetailContainer extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      loading: true,
      error: null,
      isMovie: pathname.includes("/movie/"),
    };
  }

  async componentDidMount() {
    const {
      history: { push },
      match: {
        params: { id },
      },
    } = this.props;
    if (isNaN(id)) {
      return push("/");
    }
    try {
      let result;
      const { isMovie } = this.state;
      ({ data: result } = isMovie
        ? await movieApi.movieDetail(id)
        : await tvApi.showDetail(id));
      this.setState({ result });
    } catch {
      this.setState({ error: "can't find anything" });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { result, loading, error, isMovie } = this.state;
    return isMovie ? (
      <MoviePresenter result={result} loading={loading} error={error} />
    ) : (
      <ShowPresenter result={result} loading={loading} error={error} />
    );
  }
}

export default DetailContainer;
