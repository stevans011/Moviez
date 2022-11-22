import { LeftNav } from "./LeftNav"
import { SearchBar } from "./SearchBar"
import { RightNav } from "./RightNav"
import { Link } from 'react-router-dom'
import logo from '../images/logo.png'

export function Header(props) {
    return (
        <header className="navbar navbar-expand-lg navbar-light bg-danger">
            <div className="container-fluid">
                {/* Navbar brand */}
                <Link className="navbar-brand" to="/"><img src={logo} width="130"></img></Link>

                {/* Toggle button */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {/* Left nav */}
                    <LeftNav leftItems={props.leftnav} />

                    <SearchBar />

                    {/* right nav */}
                    <RightNav rightItems={props.rightnav} />

                </div>
            </div >
        </header >

    )
}