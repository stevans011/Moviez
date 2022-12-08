import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { favoritesAtom, moviesAtom } from "../states/movies";

export function Profile(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [updating, setUpdating] = useState(false);
  const [pageData, setPageData] = useState([]);
  const [error, setError] = useState("");
  const movies = useRecoilValue(moviesAtom);
  const favorites = useRecoilValue(favoritesAtom);

  useEffect(() => {
    const items = favorites.map((f) => {
      const m = movies.find((m) => m.id === f.movieId);
      return {
        ...m,
        favId: f.id,
      };
    });
    setPageData(items);
  }, [movies, favorites]);

  const handleEmail = () => {
    if (updating) return;
    if (email) {
      // update email
      setUpdating(true);
      props
        .updateEmail(props.auth, email)
        .then(() => {})
        .catch((err) => {
          // console.log(err)
          setError("Logout and login again to perform this action!");
        })
        .finally(() => {
          setUpdating(false);
        });
    }
  };

  const handlePassword = () => {
    if (updating) return;
    if (password !== confirm || password === "") {
      setError("Password and confirm password is not matched!");
      return;
    }
    setUpdating(true);
    props
      .updatePassword(props.auth, password)
      .then(() => {})
      .catch(() => {
        setError("Logout and login again to perform this action!");
      })
      .finally(() => {
        setUpdating(false);
      });
  };

  const handleRemoveFavorite = (id) => {
    if (updating) return;
    setUpdating(true);
    props
      .removeFavorite(id)
      .then(() => {})
      .catch((err) => {})
      .finally(() => {
        setUpdating(false);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4 offset-md-4">
          <h2 className="text-center mt-4">Update your profile</h2>
          {error ? <p className="text-center mt-3 text-white bg-danger rounded py-1">{error}</p> : null}
          <div className="mb-3">
            <label htmlFor="email">Current Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@domain.com"
              className="form-control"
              defaultValue={props?.auth?.email || ""}
              value={props?.auth?.email || ""}
              disabled
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">New Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@domain.com"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline-danger" onClick={handleEmail}>
              {updating ? "Updating" : "Update email"}
            </button>
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="********"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirm">Password</label>
            <input
              type="password"
              id="confirm"
              name="confirm"
              placeholder="********"
              className="form-control"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button type="button" className="btn btn-outline-danger" onClick={handlePassword}>
              {updating ? "Updating" : "Update password"}
            </button>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <h2 className="text-center mt-2">Favorite movies</h2>
        <div className="row mt-4">
          {pageData.map((item, key) => (
            <div className="col-md-4" key={key}>
              <div className="card-body text-center shadow p-3 mb-5 bg-body rounded">
                <img className="rounded" src={item.ImageUrl} height="250px" alt={item.Title} />
                <h5 className="card-title mt-2">{item.Title}</h5>
                <span className="text-secondary">
                  <Link to={"/movie/" + item.id}>Detail</Link>
                </span>
                <div className="mt-2">
                  <button className="btn btn-warning" onClick={() => handleRemoveFavorite(item.favId)}>
                    {updating ? "Updating" : "Remove favorite"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
