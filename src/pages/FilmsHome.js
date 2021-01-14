import React, { useState, useEffect } from 'react'
import axios from "axios"
import { Cell, PieChart, LineChart, Line, XAxis, ResponsiveContainer, Legend, Pie } from 'recharts';
import "../styles/style.css"
import FilmsCard from "../components/ItemList"
import Loader from "../components/Loader"

const FilmsHome = () => {
    const [films, setFilms] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getFilms = async () => {
            const max = 7
            const maxarr = [...Array(max).keys()].slice(1)
            setLoading(true)
            const filmsArr = []
            for (let i of maxarr) {

                const { data } = await axios.get(`https://swapi.dev/api/films/${i}`)

                filmsArr.push(data)
            }

            setFilms(filmsArr)
            setLoading(false)
        }
        getFilms()
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
    films &&
        films && films.forEach(d => {
            const x = d["title"];
            const y = parseInt(d["episode_id"]);
            let entry = usableData["title"];
            if (!entry) entry = {};
            Object.assign(entry, { "title": x, "episode_id": y });
            usableData[x] = entry;
        })

    const firstTwenty = films ?
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
                                    <h3>Films's name against height</h3>
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

                                        <XAxis dataKey="title" />
                                        <Legend />
                                        <Line type="monotone" dataKey="episode_id" stroke="#8884d8" activeDot={{ r: 8 }} />

                                    </LineChart>

                                </ResponsiveContainer>
                            </div>


                            <div>
                                <div className='centralheader'>
                                    <h3>First ten starwars films vs height</h3>
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
                                        dataKey="episode_id"
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
                                    <h2>Films in Starwars</h2>
                                </div>

                                <div className='parentItemContainer'>
                                    {films &&
                                        films.map((film, index) => (
                                            <FilmsCard key={index}
                                                item={film}
                                                caption={film.title}
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

export default FilmsHome

