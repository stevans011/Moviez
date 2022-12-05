import { useState, useEffect } from 'react'

import {Link} from 'react-router-dom'
import { useSearchParams } from 'react-router-dom'


export function Movies(props) {
  const [pageData, setPageData] = useState([])
  const [filterData, setFilterData] = useState([])
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    setPageData(filter(props.listData))
    setFilterData(props.filterData)
  })

  function filter(data) {
    let filteredData = [];
    const query = searchParams.get('genre');
    if(!query) {
      return data;
    }
    data.forEach(item => {
      if(item.genre){
        item.genre.forEach(g => {
          console.log(g);
          if(g === query){
            filteredData.push(item);
          }
        });
      }
    });
    return filteredData;
  }

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

    const genre = filterData.map((item, key) => {
      return (
        <div className="col-md-4" key={key}>
          <Link to={"?genre=" + item} className="filter-link">{item}</Link>
        </div>
      )
    })

    return (
      <div className="container my-4">
        <h1> All Movies </h1>
        <div className="row">
          <div className='col-2 filter-section'>
            <h3>Filter</h3>
            
            <h5>Genre <Link to="/movies" className="filter-link-clear">Clear All</Link></h5>
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