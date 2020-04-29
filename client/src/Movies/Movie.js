import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, withRouter } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(() => {
      props.refresh()
      props.history.push('/')
    })
  } 

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button>
        <Link to={`/update-movie/${params.id}`}>Update</Link>
      </button>
      <button onClick={deleteMovie}>DELETE</button>
      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
    </div>
  );
}

export default withRouter(Movie);
