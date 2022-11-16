import { useState, useEffect } from 'react'
export function Home(props) {
  const [pageData, setPageData] = useState([])

  useEffect(() => {
    setPageData(props.listData)
    console.log( props.listData )
  })

  if (pageData.length > 0) {
    const itemCollection = pageData.map(( item, key ) => {
      return (
        <div className="col-md-4" key={key}>
          <div className="card">
            <div className="card-body">
            <img src={item.ImageUrl} height="100px"/>
              <h5 className="card-title">{item.Title}</h5>
              {item.Description}
              
            </div>
          </div>
        </div>
      )
    })

    return (
      <div className="container my-4">
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