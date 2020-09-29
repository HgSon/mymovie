import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { movieApi, tvApi } from "../api";
import { Link } from "react-router-dom";
import Poster from "./Poster";
import Section from "./Section";
const SeriesContainer = styled.div``;
const GotoMovie = styled.div``;

const Series = ({ isMovie, collection }) => {
  const [genreList, setGenreList] = useState(null);

  useEffect(() => {
    const getGenres = async () => {
      let genres;
      if (isMovie) {
        ({
          data: { genres },
        } = await movieApi.movieGenres());
      } else {
        ({
          data: { genres },
        } = await tvApi.showGenres());
      }
      let genreObj = {};
      genres.forEach((v) => {
        genreObj[v.id] = v.name;
      });
      setGenreList(genreObj);
    };
    getGenres();
  }, [isMovie]);
  const [series, setSeries] = useState(null);
  useEffect(() => {
    const getCollection = async () => {
      let parts = null;
      if (collection && isMovie) {
        ({
          data: { parts },
        } = await movieApi.movieCollection(collection.id));
      }
      setSeries(parts);
    };
    getCollection();
  }, [collection, isMovie]);
  return (
    series &&
    series.length > 0 && (
      <Section title="Series" content={series} genreList={genreList} id="_" />
    )
  );
};
export default Series;

Series.propTypes = {
  isMovie: PropTypes.bool.isRequired,
  collection: PropTypes.object,
};
