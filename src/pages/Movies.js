import { useState, useEffect } from 'react'

import {Link} from 'react-router-dom'


export function Movies(props) {
  const [pageData, setPageData] = useState([])

  useEffect(() => {
    setPageData(props.listData)
  })
   
  if (pageData.length > 0) {
    const itemCollection = pageData.map(( item, key ) => {
      return (
        <div className="col-md-4" key={key}>
          <div>
            <div className="card-body text-center shadow p-3 mb-5 bg-body rounded">
            <Link to={"/movie/" + item.id}><img className="rounded" src={item.ImageUrl} height="250px"/></Link> 
              <h5 className="card-title">{item.Title}</h5>
              <span className="text-secondary">
              <Link to={"/movie/" + item.id}>Detail</Link> 
              </span>
            </div>
          </div>
        </div>
      )
    })

    const genre = pageData.map(( item, key ) => {
      const mySet = new Set([
        item.genre
      ]);
      // item.genre.map(( i ) => {
      return (
        <div className="col-md-4" key={key}>
          {mySet}
        </div>
      )
    })

    return (
      <div className="container my-4">
       
        <h1> All Movies </h1>
        <div className="row">
          <div className='col-2 filter-section'>
            <h3>Filters</h3>
            {genre}
          </div> 
          <div className='col-8'>
          <div className="row">
                {itemCollection}
                </div>
          </div>
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