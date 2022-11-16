import { Navigation } from "./Navigation"
import { Link } from "react-router-dom"

export function Header(props) {
    return (
        <header className="navbar bg-light navbar-expand-lg">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{ props.title }</Link>
                <div className="collapse navbar-collapse">
                    <Navigation items={ props.headernav } />
                </div>
            </div>
        </header>
    )
}