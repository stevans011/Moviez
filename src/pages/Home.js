import { useState, useEffect } from "react";
import banner from "../images/banner.jpg";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { filteredAtom } from "../states/movies";

export function Home() {
  const [pageData, setPageData] = useState([]);
  const filtered = useRecoilValue(filteredAtom);

  useEffect(() => {
    if (filtered) setPageData(filtered);
  }, [filtered]);

  return (
    <div className="container my-4">
      {pageData.length > 0 ? (
        <>
          <div className="banner">
            <img src={banner} alt="movie reviews" />
          </div>
          <h1> Featured Movies </h1>
          <div className="row">
            {pageData.map((item, key) => (
              <div className="col-md-4" key={key}>
                <div>
                  <div className="card-body text-center shadow p-3 mb-5 bg-body rounded">
                    <img className="rounded" src={item.ImageUrl} height="250px" alt={item.Title} />
                    <h5 className="card-title">{item.Title}</h5>
                    <span className="text-secondary">
                      <Link to={"/movie/" + item.id}>Detail</Link>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
