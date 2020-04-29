import React, { useState, useEffect } from 'react'
import { useParams, withRouter } from "react-router-dom";
import axios from 'axios'

const UpdateMovie = props => {
  const params = useParams();
  const [movie, setMovie] = useState({});
  
  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  const submit = event=> {
    event.preventDefault()
    console.log(movie)
    axios.put(`http://localhost:5000/api/movies/${params.id}`, movie)
    .then(() => {
      props.refresh() //this was slightly tricky
      props.history.push('/')
    })
  }

  return (
    <div className="update-form">
      <form onSubmit={submit}>
        <input placeholder={movie.title} onChange={event => setMovie({...movie, title: event.target.value})}/>
        <input placeholder={movie.director} onChange={event => setMovie({...movie, director: event.target.value})}/>
        <input placeholder={movie.metascore} onChange={event => setMovie({...movie, metascore: event.target.value})}/>
        <button>Submit</button>
      </form>
    </div>
  )
}

export default withRouter(UpdateMovie)