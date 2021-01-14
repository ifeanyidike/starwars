import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/style.css"
import axios from 'axios'
import { getLastItem } from "../Util"
import StarshipCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const Starship = ({ location }) => {
    const [starship, setStarship] = useState([])

    const id = getLastItem(location.pathname, 1)

    useEffect(() => {
        const getStarship = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/starships/${id}`)
            setStarship(data)
        }
        getStarship()
    }, [id])



    return (
        <div className='container'>
            <h1>{starship.name}</h1>

            <div className="content">
                <div className="cardPanel">
                    <StarshipCard item={starship.films} title="Film" icon={<i className="fab fa-2x fa-youtube"></i>} />

                    <StarshipCard item={starship.pilots} title="Pilot" icon={<i className="fas fa-2x fa-ship"></i>} />

                </div>
                <div className="itemlist">
                    <ListItem item={starship.model} title="model" />
                    <ListItem item={starship.manufacturer} title="Manufacturer" />
                    <ListItem item={starship.cost_in_credits} title="Cost in Credit" />
                    <ListItem item={starship.length} title="Length" />
                    <ListItem item={starship.max_atmosphering_speed} title="Max Atmoshering Speed" />
                    <ListItem item={starship.crew} title="crew" />
                    <ListItem item={starship.passenger} title="Passenger" />
                    <ListItem item={starship.cargo_capacity} title="Cargo Capacity" />
                    <ListItem item={starship.consumables} title="Consumables" />
                    <ListItem item={starship.hyperdrive_rating} title="Hyperdrive Rating" />
                    <ListItem item={starship.MGLT} title="MGLT" />
                    <ListItem item={starship.starship_class} title="Starship Class" />
                    <ListItem item={starship.MGLT} title="MGLT" />

                    <ListItem item={new Date(starship.created).toDateString()} title="Joined on" />
                </div>
            </div>

        </div>
    )
}

export default Starship
