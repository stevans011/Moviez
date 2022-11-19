import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

export function Details ( props ) {
    const[ movieData, setmovieData ] = useState()

    let { movieId } = useParams()

    useEffect( () => {
        if(!movieData) {
            props.getter("movies", movieId)
           
            .then( (data) => {
                console.log(movieId);
                setmovieData(data)
            } )
        }
    })
   
   
    if( movieData ) {
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col">
                <img className="movie-image" src={movieData.ImageUrl} height="100px"/>
                    <h2>{ movieData.Title }</h2>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h2>{movieId}</h2>
                    <h3>movie cover image</h3>
                </div>
                <div className="col">
                    <h3>Year</h3>
                    {movieData.Year}
                    <h3>Description</h3>
                    {movieData.Description}
                    <button className="btn btn-info">Add to Favouries</button>
                    <button className="btn btn-info">Review this book</button>
                   
                </div>
            </div>
        </div>
    )
    }
    else {
        return(
            <div className="container my-4"></div>
        )
    }
    
}

