import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const TvPresenter = ({ topRated, airingToday, popular, loading, error }) =>
  null;

TvPresenter.propTypes = {
  topRated: propTypes.array,
  airingToday: propTypes.array,
  popular: propTypes.array,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
};

export default TvPresenter;
