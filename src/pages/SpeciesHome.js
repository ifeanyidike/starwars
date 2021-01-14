import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Cell, PieChart, LineChart, Line, XAxis, ResponsiveContainer, Legend, Pie, Area } from 'recharts';
import "../styles/style.css"
import SpeciesCard from "../components/ItemList"
import Loader from "../components/Loader"

const SpeciesHome = () => {
    const [species, setSpecies] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getSpecies = async () => {
            const max = 37
            const maxarr = [...Array(max).keys()].slice(1)
            setLoading(true)
            const speciesArr = []
            for (let i of maxarr) {

                const { data } = await axios.get(`https://swapi.dev/api/species/${i}`)
                console.log(i, data)
                speciesArr.push(data)
            }

            setSpecies(speciesArr)
            setLoading(false)
        }
        getSpecies()
    }, [])


    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({
        cx, cy, midAngle, innerRadius, outerRadius, percent, index,
    }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    const usableData = {};
    species &&
        species && species.forEach(d => {
            const x = d["name"];
            const y = parseInt(d["average_height"]);
            let entry = usableData["name"];
            if (!entry) entry = {};
            Object.assign(entry, { "name": x, "average_height": y });
            usableData[x] = entry;
        })

    const firstTwenty = species ?
        Object.values(usableData).splice(1, 10) : []

    return (
        <div className="container">
            {
                loading ? <Loader />

                    :
                    <>

                        <div className="visualize">
                            <div>
                                <div className='centralheader'>
                                    <h3>Species's name against average height</h3>
                                </div>
                                <ResponsiveContainer height={300} width="100%">
                                    <LineChart
                                        width={500}
                                        height={300}
                                        data={Object.values(usableData)}
                                        margin={{
                                            top: 120, right: 30, left: 20, bottom: 5,
                                        }}
                                    >

                                        <XAxis dataKey="name" />
                                        <Legend />
                                        <Line type="monotone" dataKey="average_height" stroke="#8884d8" activeDot={{ r: 8 }} />

                                    </LineChart>

                                </ResponsiveContainer>
                            </div>


                            <div>
                                <div className='centralheader'>
                                    <h3>First ten starwars species vs average height</h3>
                                </div>

                                <PieChart width={400} height={400}>
                                    <Pie
                                        data={firstTwenty}
                                        cx={200}
                                        cy={200}
                                        labelLine={false}
                                        label={renderCustomizedLabel}
                                        outerRadius={90}
                                        fill="#8884d8"
                                        dataKey="average_height"
                                    >
                                        {
                                            firstTwenty.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                                        }
                                    </Pie>
                                </PieChart>
                            </div>
                        </div>

                        <div className="content">
                            <div className="cardPanelParent">
                                <div className='centralheader'>
                                    <h2>Species in Starwars</h2>
                                </div>

                                <div className='parentItemContainer'>
                                    {species &&
                                        species.map((specie, index) => (
                                            <SpeciesCard key={index}
                                                item={specie}
                                                caption={specie.name}
                                                icon={<i className="fas fa-2x fa-user-tag"></i>} />
                                        ))
                                    }
                                </div>
                            </div>
                        </div>

                    </>
            }
        </div>
    )
}

export default SpeciesHome

