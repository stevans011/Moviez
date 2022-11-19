import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'


export function LeftNav(props) {
    const [leftItems, setLeftItems] = useState([])

    useEffect(() => {
        setLeftItems(props.leftItems)
        
    }, [props.leftItems])
    
    if (leftItems.length > 0) {
        const LeftLinks = leftItems.map((item, itemKey) => {
            return (
                <NavLink className="nav-link text-warning fw-normal" to={item.path} key={itemKey}>{item.name}</NavLink>

            )

        })

        return (
            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                {LeftLinks}

            </div>

        )


    } else {
        return null

    }


}