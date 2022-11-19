export function SearchBar(props) {
    return (
        <form className="d-flex input-group w-auto">
            <input type="search" className="form-control" placeholder="search" aria-label="Search" />
            <button className="btn btn-outline-warning" type="submit">Search</button>
        </form>

    )
}