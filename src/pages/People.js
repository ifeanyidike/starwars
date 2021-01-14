import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/style.css"
import axios from 'axios'
import { getLastItem } from "../Util"
import FilmCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const People = ({ location }) => {
  const [person, setPerson] = useState([])

  const id = getLastItem(location.pathname, 1)

  useEffect(() => {
    const getPerson = async () => {
      const { data } = await axios.get(`https://swapi.dev/api/people/${id}`)
      setPerson(data)
    }
    getPerson()
  }, [id])



  return (
    <div className='container'>
      <h1>{person.name}</h1>

      <div className="content">
        <div className="cardPanel">
          <FilmCard item={person.films} title="Film" icon={<i className="fab fa-2x fa-youtube"></i>} />

          <FilmCard item={person.species} title="Specie" icon={<i className="fas fa-2x fa-user-tag"></i>} />

          <FilmCard item={person.vehicles} title="Vehicle" icon={<i class="fas fa-2x fa-car-alt"></i>} />

          <FilmCard item={person.starships} title="Starship" icon={<i className="fas fa-2x fa-ship"></i>} />

        </div>
        <div className="itemlist">
          <ListItem item={person.height} title="Height" />
          <ListItem item={person.mass} title="Mass" />
          <ListItem item={person.hair_color} title="Hair Color" />
          <ListItem item={person.skin_color} title="Skin Color" />
          <ListItem item={person.eye_color} title="Eye Color" />
          <ListItem item={person.birth_year} title="Birth Year" />
          <ListItem item={person.gender} title="Gender" />
          <ListItem item={new Date(person.created).toDateString()} title="Joined on" />
        </div>
      </div>


    </div>
  )
}

export default People
