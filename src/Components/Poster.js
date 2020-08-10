//별점 참고 http://jsfiddle.net/CAVpz/
import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 130px;
  height: 180px;
`;
const Image = styled.div`
  position: relative;
  top: -180px;
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  &:hover {
    opacity: 0.2;
  }
  &:hover ~ div {
    opacity: 1;
  }
`;
const RatingContainer = styled.div`
  position: relative;
  top: -200px;
  width: 100%;
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
const TextContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 10px;
  & > h3 {
  }
  & > span {
    float: right;
  }
  & > ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    & > li {
      margin-right: 5px;
      margin-bottom: 3px;
    }
  }
`;
const H3 = styled.h3`
  font-weight: bold;
  text-align: center;
  margin-bottom: 15px;
  font-size: ${(props) => props.size}px;
`;

const Poster = ({
  id,
  imageUrl,
  title,
  rating,
  year,
  genreIds,
  genreList,
  isMovie = false,
}) => {
  const genres = genreIds ? genreIds.map((v) => genreList[v]) : null;
  return (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
      <Container>
        <TextContainer>
          <H3 size={title.length < 12 ? 18 : title.length < 30 ? 16 : 14}>
            {title}
          </H3>
          <span>{year}</span>
          {genres && (
            <ul>
              {genres.map((genre) => (
                <li key={`${Math.random()}`}>{genre}</li>
              ))}
            </ul>
          )}
        </TextContainer>
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
