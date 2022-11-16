import { Navigate, useNavigate } from "react-router-dom"
import { useEffect } from 'react'
export function Signout(props) {
    const navigate = useNavigate()

    useEffect( () => {
        if( props.auth ) {
            props.handler().then( (res) => navigate('/') )
        }
    }, [props.auth])

    return (
        <div className="container">
            <div className="row">
                <h3>Signing out</h3>
            </div>
        </div>
    )

}