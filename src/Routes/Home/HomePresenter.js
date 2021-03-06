import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Section from "components/Section";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const Container = styled.div`
  padding: 0px 10px;
`;

const HomePresenter = ({
  genreList,
  nowPlaying,
  upcoming,
  popular,
  loading,
  error,
}) => {
  return loading ? (
    <Loader />
  ) : (
    <Container>
      {nowPlaying && nowPlaying.length > 0 && (
        <Section
          title="Now Playing"
          id="movieNowplaying"
          content={nowPlaying}
          genreList={genreList}
        />
      )}
      {upcoming && upcoming.length > 0 && (
        <Section
          title="Upcoming"
          id="movieUpcoming"
          content={upcoming}
          genreList={genreList}
        />
      )}
      {popular && popular.length > 0 && (
        <Section
          title="Popular"
          id="moviePopular"
          genreList={genreList}
          content={popular}
        />
      )}
      {error && <Message text={error} color="#e74c3c" />}
    </Container>
  );
};

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  upcoming: PropTypes.array,
  popular: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  genreList: PropTypes.object,
};

export default HomePresenter;
