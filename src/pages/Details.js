import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { Rating } from "../components/Rating";
import { favoritesAtom } from "../states/movies";

export function Details(props) {
  const [movieData, setmovieData] = useState();
  const [updating, setUpdating] = useState(false);
  const [isFav, setIsFav] = useState(false);
  const [ratings, setRatings] = useState([]);
  const favorites = useRecoilValue(favoritesAtom);

  let { movieId } = useParams();

  useEffect(() => {
    if (!movieData) {
      props
        .getter("movies", movieId)

        .then((data) => {
          setmovieData(data);
          const list = data.reviews?.map((r) => Number(r.Ratings));
          setRatings(list);
        });
    }
  }, [movieId]);

  useEffect(() => {
    if (!props?.auth) return;
    if (favorites.length === 0) {
      setIsFav(false);
    } else {
      const idx = favorites.findIndex((f) => f.movieId === movieId);
      if (idx > -1) {
        setIsFav(true);
      } else {
        setIsFav(false);
      }
    }
  }, [movieId, props?.auth, favorites]);

  const handleFavorite = () => {
    if (updating) return;
    // check if movie is already in favorite

    setUpdating(true);
    props
      .onFavorite(props.auth, movieId)
      .then(() => {})
      .catch((err) => {})
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div className="container my-4">
      {movieData ? (
        <div className="row">
          <div className="col-4">
            <img className="movie-image" src={movieData.ImageUrl} alt={movieData.title} width="420px" />
            <br />
            <br />
            {props?.auth && !isFav ? (
              <button className="btn btn-info btn-movie-detail-action" onClick={() => handleFavorite()}>
                {updating ? "Updating" : "Add to Favorites"}
              </button>
            ) : null}

            <a href="#addreview">
              <button className="btn btn-info btn-movie-detail-action">Review this movie</button>
            </a>
            <br />
            <br />
            <h4>Buy/Rent movies</h4>
            {movieData.links?.map((item, key) => (
              <div className="col-md-4 links-container" key={`links-${key}`}>
                <a href={item.url} target="_blank" className="links-item" rel="noreferrer">
                  {item.title}
                </a>
              </div>
            ))}
          </div>

          <div className="col-8 movie-details-container">
            <h2>{movieData.Title}</h2>
            <div className="genre-container">
              {movieData.genre?.map((item, key) => (
                <span className="col-md-4 genre-item" key={`genre-${key}`}>
                  {" "}
                  {item}
                </span>
              ))}
            </div>
            <br />

            <div className="row">
              <div className="col-6">
                <h4>Director: {movieData.Director}</h4>
                <h4>Stars: {movieData.Stars}</h4>

                <h4>Year: {movieData.Year}</h4>
              </div>
              <div className="col-6">
                <Rating ratings={ratings} />
              </div>
            </div>
            <h4>Description</h4>
            {movieData.Description}
            <hr />

            <h4>Reviews</h4>
            {movieData.reviews?.map((item, key) => (
              <div className="col-md-4 review-container" key={`review-${key}`}>
                <div>Ratings: {item.Ratings}/10</div>
                <div>{item.Description}</div>
                <div className="review-item-user">{item.User}</div>
              </div>
            ))}

            <div className="review-form" id="addreview">
              <h3>Write your review </h3>
              <form>
                Ratings: <input type="text" name="input-ratings"></input> <br /> <br />
                Description: <input type="text" name="input-description"></input> <br /> <br />
                User: <input type="text" name="input-user"></input> <br />
                <br />
                <button className="btn btn-info btn-movie-detail-action">Add Review </button>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
