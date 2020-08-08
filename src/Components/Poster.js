//별점 참고 http://jsfiddle.net/CAVpz/
import React, { useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { movieApi } from "../api";
import Genres from "./Genres";

const Container = styled.div`
  width: 130px;
  height: 180px;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 0.3;
  }
  &:hover ~ div {
    opacity: 1;
  }
`;
const RatingContainer = styled.div`
  position: relative;
  width: 100%;
  top: -20px;
  display: flex;
  justify-content: space-around;
  opacity: 0;
`;
const Rating = styled.span``;
const StarRating = styled.span`
  background: url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=");
  width: ${(props) => 75 * props.rating}px;
  height: 15px;
  background-position: 0 0;
  background-size: 15px 15px;
`;

const TextContainer = styled.div``;

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  genreIds,
  isMovie = false,
}) => {
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../Assets/img/noImg.PNG")
          }
        />
        <RatingContainer>
          <StarRating rating={rating / 10} />
          <Rating>{rating}/10</Rating>
        </RatingContainer>
        <TextContainer>
          <h3>{title}</h3>
          <span>{year}</span>
        </TextContainer>
      </Container>
    </Link>
  );
};

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  genreIds: PropTypes.arrayOf(PropTypes.number),
  isMovie: PropTypes.bool,
};

export default Poster;
