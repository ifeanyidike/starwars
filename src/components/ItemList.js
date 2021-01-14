import React from 'react'
import { Link } from "react-router-dom"
import { getLastItem } from "../Util"

const ItemList = ({ item, caption, icon }) => {
    return (
        <>
            <div >
                {
                    item &&
                    <div
                        className="item">
                        <Link
                            to={`/${getLastItem(item.url && item.url, 2)}/${item.url && getLastItem(item.url, 1)}`}>
                            {icon}
                            <span>
                                {caption}
                            </span>
                        </Link>
                    </div>
                }
            </div>
        </>
    )
}

export default ItemList
