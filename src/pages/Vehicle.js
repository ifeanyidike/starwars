import React from 'react'
import { useState, useEffect } from 'react'
import "../styles/style.css"
import axios from 'axios'
import { getLastItem } from "../Util"
import VehicleCard from "../components/CardItem"
import ListItem from "../components/ListItem"

const Vehicle = ({ location }) => {
    const [vehicle, setVehicle] = useState([])

    const id = getLastItem(location.pathname, 1)

    useEffect(() => {
        const getVehicle = async () => {
            const { data } = await axios.get(`https://swapi.dev/api/vehicles/${id}`)
            setVehicle(data)
        }
        getVehicle()
    }, [id])



    return (
        <div className='container'>
            <h1>{vehicle.name}</h1>

            <div className="content">
                <div className="cardPanel">
                    <VehicleCard item={vehicle.films} title="Film" icon={<i className="fab fa-2x fa-youtube"></i>} />

                    <VehicleCard item={vehicle.pilots} title="Pilot" icon={<i className="fas fa-2x fa-user-tag"></i>} />

                </div>
                <div className="itemlist">
                    <ListItem item={vehicle.model} title="Model" />
                    <ListItem item={vehicle.manufacturer} title="Manufacturer" />
                    <ListItem item={vehicle.cost_in_credits} title="Cost in Credits" />
                    <ListItem item={vehicle.length} title="Length" />
                    <ListItem item={vehicle.max_atmosphering_speed} title="Max atmosphering speed" />
                    <ListItem item={vehicle.passengers} title="No. of passengers" />
                    <ListItem item={vehicle.cargo_capacity} title="Cargo Capacity" />
                    <ListItem item={vehicle.consumables} title="Consumables" />
                    <ListItem item={vehicle.vehicle_class} title="vehicle_class" />
                    <ListItem item={new Date(vehicle.created).toDateString()} title="Joined on" />
                </div>
            </div>

        </div>
    )
}

export default Vehicle
