import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 130px;
  height: 200px;
`;
const ImageContainer = styled.div`
  width: 100%;
  height: 90%;
`;
const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
`;
const RatingContainer = styled.div`
  position: relative;
  width: 100%;
  top: -20px;
  display: flex;
  justify-content: center;
`;
const RatingStar = styled.ul`
  display: flex;
  justify-content: center;
  & > li {
    z-index: 9999;
    margin-top: 2px;
    background-image: url("http://miuu227.godohosting.com/images/icon/ico_review.png");
    background-size: 32px 15px;
    width: 15px;
    height: 15px;
    margin-right: 5px;
  }
`;
const Rating = styled.span``;
// const Title = styled.span`
//   float: left;
// `;
// const Year = styled.span`
//   float: right;
// `;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
  <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
    <Container>
      <ImageContainer>
        <Image
          bgUrl={
            imageUrl
              ? `https://image.tmdb.org/t/p/w300${imageUrl}`
              : require("../Assets/img/noImg.PNG")
          }
        />
        <RatingContainer>
          <RatingStar>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </RatingStar>
          <Rating>{rating}/10</Rating>
        </RatingContainer>
      </ImageContainer>
      {/* <Title>{title}</Title>
      <Year>{year}</Year> */}
    </Container>
  </Link>
);

Poster.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Poster;
