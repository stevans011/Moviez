import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

export function RightNav(props) {
    const [rightItems, setRightItems] = useState([])

    useEffect(() => {
        setRightItems(props.rightItems)
    }, [props.rightItems])
    if (rightItems.length > 0) {
        const RightLinks = rightItems.map((item, itemKey) => {
            return (
                <NavLink className="nav-link d-flex flex-column text-black-75" to={item.path} key={itemKey}><span className={item.icon}></span>
                <span className="d-none d-sm-inline px-1 mt-1 fw-light text-warning">{item.name}</span></NavLink>
            )

        })

        return (
            <div className="navbar-nav text-center">
                {RightLinks}
            </div>
        )
    }
    else {
        return null
    }
}