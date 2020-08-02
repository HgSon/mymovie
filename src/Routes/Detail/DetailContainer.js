import DetailPresenter from "./DetailPresenter";
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
    // const parsedId = parseInt(id) ?
    if (isNaN(id)) {
      return push("/");
    }
    try {
      let result;
      const { isMovie } = this.state;
      ({ data: result } = isMovie
        ? await movieApi.movieDetail(id)
        : await tvApi.showDetail(id));
      console.log(result);
    } catch {
      this.setState({ error: "can't find anything" });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { result, loading, error } = this.state;
    return <DetailPresenter result={result} loading={loading} error={error} />;
  }
}

export default DetailContainer;
