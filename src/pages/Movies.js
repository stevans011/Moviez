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
            <img className="rounded" src={item.ImageUrl} height="250px"/>
              <h5 className="card-title">{item.Title}</h5>
              <span className="text-secondary">
              <Link to={"/movie/" + item.id}>Detail</Link> 
              </span>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container my-4">
       
        <h1> All Movies </h1>
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