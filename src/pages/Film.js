import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { getLastItem } from "../Util"
import "../styles/style.css"
import FilmCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const Film = () => {
    const location = useLocation()
    const [film, setFilm] = useState([])
    const id = getLastItem(location.pathname, 1)

    useEffect(() => {
        const getFilm = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/films/${id}`)
            setFilm(data)
        }
        getFilm()
    }, [id])

    console.log(film)
    return (
        <div className='container'>
            <h1>{film.title}</h1>

            <p className="opening_crawl">{film.opening_crawl}</p>

            <div className="content">
                <div className="cardPanel">
                    <FilmCard item={film.characters} title="Character" icon={<i className="fas fa-2x fa-user-tag"></i>} />

                    <FilmCard item={film.planets} title="Planet" icon={<i className="fas fa-2x fa-globe-europe"></i>} />

                    <FilmCard item={film.starships} title="Starship" icon={<i className="fas fa-2x fa-ship"></i>} />

                    <FilmCard item={film.vehicles} title="Vehicle" icon={<i className="fas fa-2x fa-car-alt"></i>} />

                    <FilmCard item={film.species} title="Specie" icon={<i className="fas fa-2x fa-user-tag"></i>} />



                </div>
                <div className="itemlist">
                    <ListItem item={film.episode_id} title="Episode Number" />
                    <ListItem item={film.director} title="Director" />
                    <ListItem item={film.producer} title="Producer" />
                    <ListItem item={film.release_date} title="Release Date" />
                    <ListItem item={new Date(film.created).toDateString()} title="Joined on" />
                </div>
            </div>


        </div>
    )
}

export default Film
