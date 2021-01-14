import React from 'react'
import { Link } from "react-router-dom"
import { getLastItem } from "../Util"

const CardItem = ({ item, title, icon }) => {
    return (
        <div className='itemContainer'>
            {item && item.length > 0 ?
                <>
                    <h3>{`${title}s `}</h3>
                    <div>
                        {
                            item &&
                            item.map(it =>
                                <div key={`${getLastItem(it, 1)}`}
                                    className="item">
                                    <Link to={`/${getLastItem(it, 2)}/${getLastItem(it, 1)}`}>
                                        {icon}
                                        <span>
                                            {title} {getLastItem(it, 1)}
                                        </span>
                                    </Link>
                                </div>
                            )
                        }
                    </div>
                </>
                :
                ""
            }
        </div>
    )
}

export default CardItem
