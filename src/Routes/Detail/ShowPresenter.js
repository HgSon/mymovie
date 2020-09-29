import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "components/Loader";
import Message from "components/Message";

const ShowPresenter = ({ result, loading, error }) => {
  if (loading) return <Loader />;
  else if (error) return <Message text={error} color="#e74c3c" />;
  const {
    backdrop_path,
    homepage,
    genres,
    overview,
    poster_path,
    production_companies,
    origin_country,
    first_air_date,
    last_air_date,
    episode_run_time,
    name,
    vote_average,
    videos,

    created_by,
    number_of_episodes,
    number_of_seasons,
    seasons,
  } = result;
  return null;
};

ShowPresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default ShowPresenter;
