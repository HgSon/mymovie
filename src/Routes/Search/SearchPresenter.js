import React from "react";
import styled from "styled-components";
import propTypes from "prop-types";

const SearchPresenter = ({
  movieResults,
  tvResults,
  loading,
  error,
  searchTerm,
  handleSubmit,
}) => null;

SearchPresenter.propTypes = {
  movieResults: propTypes.array,
  tvResults: propTypes.array,
  loading: propTypes.bool.isRequired,
  error: propTypes.string,
  searchTerm: propTypes.string,
  handleSubmit: propTypes.func.isRequired,
};

export default SearchPresenter;
