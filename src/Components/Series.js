import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { movieApi } from "../api";

const Series = (isMovie, collection) => {
  const [series, setSeries] = useState(null);
  useEffect(() => {
    const getCollection = async () => {
      let data = null;
      if (collection && isMovie) {
        data = await movieApi.movieCollection(collection.id);
      }
      setSeries(data);
    };
    getCollection();
  }, []);
  console.log(collection);
  return <h1>{series}</h1>;
};
export default Series;

Series.propTypes = {
  isMovie: PropTypes.bool.isRequired,
  collection: PropTypes.object,
};
