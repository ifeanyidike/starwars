import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/style.css"
import axios from 'axios'
import { getLastItem } from "../Util"
import FilmCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const Specie = ({ location }) => {
    const [specie, setSpecie] = useState([])

    const id = getLastItem(location.pathname, 1)

    useEffect(() => {
        const getSpecie = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/species/${id}`)
            setSpecie(data)
        }
        getSpecie()
    }, [id])



    return (
        <div className='container'>
            <h1>{specie.name}</h1>

            <div className="content">
                <div className="cardPanel">
                    <FilmCard item={specie.films} title="Film" icon={<i className="fab fa-2x fa-youtube"></i>} />

                    <FilmCard item={specie.people} title="Person" icon={<i className="fas fa-2x fa-user-tag"></i>} />

                    <FilmCard item={specie.vehicles} title="Vehicle" icon={<i class="fas fa-2x fa-car-alt"></i>} />

                    <FilmCard item={specie.starships} title="Starship" icon={<i className="fas fa-2x fa-ship"></i>} />

                </div>
                <div className="itemlist">
                    <ListItem item={specie.classification} title="Classification" />
                    <ListItem item={specie.designation} title="Designation" />
                    <ListItem item={specie.average_height} title="Average Height" />
                    <ListItem item={specie.skin_colors} title="Skin Color" />
                    <ListItem item={specie.eye_colors} title="Eye Color" />
                    <ListItem item={specie.hair_colors} title="Hair Color" />
                    <ListItem item={specie.average_lifespan} title="Average Lifespan" />
                    <ListItem item={specie.language} title="Language" />
                    <ListItem item={new Date(specie.created).toDateString()} title="Joined on" />
                </div>
            </div>


        </div>
    )
}

export default Specie
