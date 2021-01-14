import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { getLastItem } from "../Util"
import "../styles/style.css"
import PlanetCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const Planet = () => {
    const location = useLocation()
    const [planet, setPlanet] = useState([])
    const id = getLastItem(location.pathname, 1)

    useEffect(() => {
        const getPlanet = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/planets/${id}`)
            setPlanet(data)
        }
        getPlanet()
    }, [id])

    console.log(planet)
    return (
        <div className='container'>
            <h1>{planet.name}</h1>

            <div className="content">
                <div className="cardPanel">
                    <PlanetCard item={planet.films} title="Film" icon={<i className="fab fa-2x fa-youtube"></i>} />

                    <PlanetCard item={planet.residents} title="Resident" icon={<i className="fas fa-2x fa-user-tag"></i>} />



                </div>
                <div className="itemlist">
                    <ListItem item={planet.rotation_period} title="Rotation Period" />
                    <ListItem item={planet.orbital_period} title="Orbital Period" />
                    <ListItem item={planet.diameter} title="Diameter" />
                    <ListItem item={planet.climate} title="Climate" />
                    <ListItem item={planet.terrain} title="Terrain" />
                    <ListItem item={planet.surface_water} title="Surface Water" />
                    <ListItem item={planet.population} title="Population" />
                    <ListItem item={new Date(planet.created).toDateString()} title="Joined on" />
                </div>
            </div>


        </div>
    )
}

export default Planet
