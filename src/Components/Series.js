import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { movieApi } from "../api";
import { Link } from "react-router-dom";

const SeriesContainer = styled.div``;
const Poster = styled.div``;

const Series = ({ isMovie, collection }) => {
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
  }, []);
  console.log(series);
  return (
    series && (
      <SeriesContainer>
        {series.map((video) => (
          <Link
            key={Math.random()}
            to={isMovie ? `/movie/${video.id}` : `/show/${video.id}`}
          >
            <Poster
              bgUrl={`https://image.tmdb.org/t/p/w300${video.poster_path}`}
            >
              <h3>{isMovie ? video.title : video.name}</h3>
            </Poster>
          </Link>
        ))}
      </SeriesContainer>
    )
  );
};
export default Series;

Series.propTypes = {
  isMovie: PropTypes.bool.isRequired,
  collection: PropTypes.object,
};
