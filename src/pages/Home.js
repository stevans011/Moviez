import { useState, useEffect } from 'react'
import banner  from '../images/banner.jpg'
import {Link} from 'react-router-dom'


export function Home(props) {
  const [pageData, setPageData] = useState([])

  useEffect(() => {
    setPageData(props.listData)
  })
   
  if (pageData.length > 0) {
    const itemCollection = pageData.map(( item, key ) => {
      return (
        <div className="col-md-4" key={key}>
          <div className="card">
            <div className="card-body">
            <img className="movie-image" src={item.ImageUrl} height="100px"/>
              <h5 className="card-title">{item.Title}</h5>
              <Link to={"/details/" + item.id}>Detail</Link> 

              
              
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container my-4">
        <div className="banner">
        <img src={banner} ></img>
        </div>
        <h1> Featured Movies </h1>
        <div className="row">
          {itemCollection}
        </div>
      </div>
    )
  }
  else {
    return (
      <div className="container"></div>
    )
  }
}