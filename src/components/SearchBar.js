import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { filteredAtom, moviesAtom } from "../states/movies";

export function SearchBar() {
  const [key, setKey] = useState("");
  const movies = useRecoilValue(moviesAtom);
  const setFiltered = useSetRecoilState(filteredAtom);
  const handleSearch = () => {
    if (movies.length === 0) return;
    if (key === "") {
      setFiltered(movies);
    } else {
      // filter movies
      const items = movies.filter((m) => m.Title.toLowerCase().includes(key.toLowerCase()));
      setFiltered(items);
    }
  };
  return (
    <div className="d-flex input-group w-auto">
      <input
        type="search"
        className="form-control"
        placeholder="search"
        aria-label="Search"
        value={key}
        onChange={(e) => setKey(e.target.value)}
      />
      <button className="btn btn-outline-warning" type="button" onClick={() => handleSearch()}>
        Search
      </button>
    </div>
  );
}
