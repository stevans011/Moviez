import { useEffect, useState } from "react";
import StarColor from "../images/star-rate-color.png";
import StarEmpty from "../images/star-rate-empty.png";

export const Rating = ({ ratings }) => {
  const [rate, setRate] = useState(0);

  useEffect(() => {
    if (ratings) {
      let sum = 0;
      ratings.forEach((r) => {
        const tmp = Math.ceil(r);
        sum += tmp;
      });
      setRate(sum / ratings.length);
    }
  }, [ratings]);

  return (
    <div className="rating-wrapper">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h2>{rate.toFixed(1)}</h2>
        <div className="rate-star-wrapper">
          <div className="star-wrapper">
            <img src={StarEmpty} alt="star empty" />
          </div>
          <div className="star-wrapper" style={{ width: `${rate * 10}%` }}>
            <img src={StarColor} alt="star colored" />
          </div>
        </div>
        <p className="text-secondary text-center">{ratings.length} reviews</p>
      </div>
    </div>
  );
};
