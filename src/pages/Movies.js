import { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { filteredAtom, genresAtom } from "../states/movies";

export function Movies() {
  const [pageData, setPageData] = useState([]);
  const [searchParams] = useSearchParams();

  const genres = useRecoilValue(genresAtom);
  const filtered = useRecoilValue(filteredAtom);

  useEffect(() => {
    setPageData(filter(filtered));
    // need to use proper hook to avoid max depth searching
  }, [searchParams, filtered, genres]);

  function filter(data) {
    let filteredData = [];
    const query = searchParams.get("genre");
    if (!query) {
      return data;
    }
    data.forEach((item) => {
      if (item.genre) {
        item.genre.forEach((g) => {
          // console.log(g);
          if (g === query) {
            filteredData.push(item);
          }
        });
      }
    });
    return filteredData;
  }

  return (
    <div className="container my-4">
      <h1> All Movies </h1>
      <div className="row">
        <div className="col-2 filter-section">
          <h3>Filter</h3>
          <h5>
            Genre{" "}
            <Link to="/movies" className="filter-link-clear">
              Clear All
            </Link>
          </h5>
          <ul className="filter-section-list">
            {genres.map((item, key) => (
              <div key={key}>
                <li className={item === searchParams.get("genre") ? "filter-selected-item" : ""}>
                  {" "}
                  <Link to={"?genre=" + item} className="filter-link">
                    {item}
                  </Link>
                </li>
              </div>
            ))}
          </ul>
        </div>
        <div className="col-8">
          <div className="row">
            {pageData.map((item, key) => (
              <div className="col-md-4" key={key}>
                <div>
                  <div className="card-body text-center shadow p-3 mb-5 bg-body rounded">
                    <Link to={"/movie/" + item.id}>
                      <img className="rounded" src={item.ImageUrl} height="250px" alt={item.Title} />
                    </Link>
                    <h5 className="card-title">{item.Title}</h5>
                    <span className="text-secondary">
                      <Link to={"/movie/" + item.id}>Detail</Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // if (pageData.length > 0) {
  //   const itemCollection = pageData.map((item, key) => {
  //     return (
  //       <div className="col-md-4" key={key}>
  //         <div>
  //           <div className="card-body text-center shadow p-3 mb-5 bg-body rounded">
  //             <Link to={"/movie/" + item.id}>
  //               <img className="rounded" src={item.ImageUrl} height="250px" />
  //             </Link>
  //             <h5 className="card-title">{item.Title}</h5>
  //             <span className="text-secondary">
  //               <Link to={"/movie/" + item.id}>Detail</Link>
  //             </span>
  //           </div>
  //         </div>
  //       </div>
  //     );
  //   });

  //   const genre = filterData.map((item, key) => {
  //     return (
  //       <div key={key}>
  //         <li className={item == searchParams.get("genre") ? "filter-selected-item" : ""}>
  //           {" "}
  //           <Link to={"?genre=" + item} className="filter-link">
  //             {item}
  //           </Link>
  //         </li>
  //       </div>
  //     );
  //   });

  //   return (
  //     <div className="container my-4">
  //       <h1> All Movies </h1>
  //       <div className="row">
  //         <div className="col-2 filter-section">
  //           <h3>Filter</h3>

  //           <h5>
  //             Genre{" "}
  //             <Link to="/movies" className="filter-link-clear">
  //               Clear All
  //             </Link>
  //           </h5>
  //           <ul className="filter-section-list">{genre}</ul>
  //         </div>
  //         <div className="col-8">
  //           <div className="row">{itemCollection}</div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // } else {
  //   return <div className="container"></div>;
  // }
}
