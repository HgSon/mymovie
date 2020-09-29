import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Loader from "components/Loader";
import Message from "components/Message";
import Series from "components/Series";

const Container = styled.div``;
const Image = styled.div``;
const InfoContainer = styled.div``;
const TextBox = styled.div``;
const Title = styled.h1``;
const Release = styled.span``;
const Rating = styled.span``;
const StarRating = styled.span`
  display: inline-block;
  background: url("data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjBweCIgaGVpZ2h0PSIyMHB4IiB2aWV3Qm94PSIwIDAgMjAgMjAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDIwIDIwIiB4bWw6c3BhY2U9InByZXNlcnZlIj48cG9seWdvbiBmaWxsPSIjRkZERjg4IiBwb2ludHM9IjEwLDAgMTMuMDksNi41ODMgMjAsNy42MzkgMTUsMTIuNzY0IDE2LjE4LDIwIDEwLDE2LjU4MyAzLjgyLDIwIDUsMTIuNzY0IDAsNy42MzkgNi45MSw2LjU4MyAiLz48L3N2Zz4=");
  width: ${(props) => 75 * props.rating}px;
  height: 15px;
  background-position: 0 0;
  background-size: 15px 15px;
`;
const RunTime = styled.span``;
const Countries = styled.ul``;
const Genres = styled.ul``;
const Overview = styled.p``;
const LinkBox = styled.div``;
const TagLine = styled.h3``;

const MoviePresenter = ({ result, loading, error }) => {
  if (loading) return <Loader />;
  else if (error) return <Message text={error} color="#e74c3c" />;
  else {
    const {
      backdrop_path,
      homepage,
      genres,
      overview,
      poster_path,
      production_companies,
      production_countries,
      release_date,
      runtime,
      title,
      vote_average,
      videos: { results: videos },
      tagline,
      belongs_to_collection: collection,
    } = result;
    let playArray = [];
    let playList = "";
    if (videos && videos.length > 0) {
      const videosList = Array.from(videos);
      videosList.shift();
      videosList.forEach((video) => playArray.push(video.key));
      playList = playArray.length ? `&playlist=${playArray.toString()}` : "";
    }
    return (
      <Container bgUrl={`https://image.tmdb.org/t/p/original${backdrop_path}`}>
        <Image bgUrl={poster_path}></Image>
        {videos && videos.length > 0 && (
          <iframe
            title={title}
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${videos[0].key}?controls=1&autoplay=0${playList}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
        <InfoContainer>
          <TextBox>
            <Title>{title}title</Title>
            <TagLine>{tagline}</TagLine>
            <StarRating rating={vote_average / 10} />
            <Rating>{vote_average}</Rating>
            <Release>{release_date}</Release>
            <RunTime>{runtime}</RunTime>
            <Countries>
              {production_countries &&
                production_countries.length > 0 &&
                production_countries.map((country) => (
                  <li key={country.name}>{country.name}</li>
                ))}
            </Countries>
            <Genres>
              {genres &&
                genres.length > 0 &&
                genres.map((genre) => <li key={genre.name}>{genre.name}</li>)}
            </Genres>
            <Overview>{overview}</Overview>
          </TextBox>
          <LinkBox>
            <Series isMovie={true} collection={collection} />
          </LinkBox>
        </InfoContainer>
      </Container>
    );
  }
};

MoviePresenter.propTypes = {
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default MoviePresenter;
