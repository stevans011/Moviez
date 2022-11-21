import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'

export function Details ( props ) {
    const[ movieData, setmovieData ] = useState()

    let { movieId } = useParams()

    useEffect( () => {
        if(!movieData) {
            props.getter("movies", movieId)
           
            .then( (data) => {
                setmovieData(data)
            } )
        }
    })
   
   
    if( movieData ) {
        const reviewCollection = movieData.reviews?.map(( item, key ) => {
            return (
              <div className="col-md-4 review-container" key={key}>
                
                <div>Ratings: {item.Ratings}/10</div>
                <div>{item.Description}</div>
                <div className="review-item-user">{item.User}</div> 
                
            </div>
            )
          })
    return(
        <div className="container my-4">
            <div className="row">
                <div className="col-4">
                <img className="movie-image" src={movieData.ImageUrl} height="500px"/>   
                </div>

                <div className="col-8 movie-details-container">
                    <h2>{ movieData.Title }</h2>
                    <h4>Year: {movieData.Year}</h4>
                    <h4>Description</h4>
                    {movieData.Description}
                    <hr></hr>
                    <button className="btn btn-info btn-movie-detail-action">Add to Favouries</button>

                    <a href="#addreview">
                    <button className="btn btn-info btn-movie-detail-action">Review this movie</button></a>
                    <br/><br/>
                    <h4>Reviews</h4>
                    {reviewCollection}

                    <div className="review-form" id="addreview"> 
                    
                    <h3>Write your review </h3>
                    <form>
        
                        Ratings: <input type= "text" name="input-ratings"></input> <br/> <br/> 
                        Description: <input type= "text" name="input-description"></input> <br/> <br/> 
                        User: <input type= "text" name="input-user"></input> <br/><br/>  
                        <button className="btn btn-info btn-movie-detail-action">Add Review </button>




                    </form>
                    
                    </div>
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

