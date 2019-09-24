import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateMovie = ({ match, history }) => {
    const [movie, setMovie] = useState({});
    useEffect(() => {
        let id = match.params.id;
        fetchMovie(id);
    }, [match.params.id]);
    const fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err));
    };
    const changeHandler = e => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    };
    const submitMovie = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
            .then(res => {
                console.log(res);
                history.push('/');
              })
            .catch(err => console.log(err));
    };
    return (
        <>
            <form onSubmit={submitMovie}>
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={movie.title}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="director"
                    placeholder="Director"
                    value={movie.director}
                    onChange={changeHandler}
                />
                <input
                    type="text"
                    name="metascore"
                    placeholder="Metascore"
                    value={movie.metascore}
                    onChange={changeHandler}
                />
                <input
                    type="submit"
                />
            </form>
        </>
    )
}

export default UpdateMovie;