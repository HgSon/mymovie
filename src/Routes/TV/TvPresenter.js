import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Section from "Components/Section";
import Loader from "Components/Loader";
import Message from "Components/Message";
import Poster from "Components/Poster";

const Container = styled.div`
  padding: 0 10px;
`;

const TvPresenter = ({
  genreList,
  topRated,
  airingToday,
  popular,
  loading,
  error,
}) =>
  loading ? (
    <Loader />
  ) : (
    <Container>
      {topRated && topRated.length > 0 && (
        <Section
          title="Top Rated"
          id="showTopRated"
          content={topRated}
          genreList={genreList}
        />
      )}
      {popular && popular.length > 0 && (
        <Section
          title="Popular"
          id="showPopular"
          content={popular}
          genreList={genreList}
        />
      )}
      {airingToday && airingToday.length > 0 && (
        <Section
          title="Airing Today"
          id="showAiringToday"
          content={airingToday}
          genreList={genreList}
        />
      )}
      {error && <Message text={error} color="#e74c3c" />}
    </Container>
  );

TvPresenter.propTypes = {
  topRated: PropTypes.array,
  airingToday: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  genreList: PropTypes.object,
};

export default TvPresenter;
