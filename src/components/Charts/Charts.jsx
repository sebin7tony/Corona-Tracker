import React from 'react'
import {useState,useEffect} from 'react'
import {fetchDailyData,fetchCountryData} from '../../api'

import {Line} from 'react-chartjs-2'
import styles from './Charts.module.css'

import {BarChart,XAxis,YAxis,Tooltip,Legend,Bar,ResponsiveContainer,CartesianGrid} from 'recharts'


const Charts = ({ country }) => {
    const [dailyData,setDailyData]  = useState([]);
    const [countryData,setCountryData] = useState([]);

    useEffect(() => {
        const fetchedDailyData = async () => {
            const fetchedData = await fetchDailyData()
            setDailyData(fetchedData);
        }
        fetchedDailyData()
    },[])

    useEffect(() => {
        if(country !== 'Global'){
            const fetchedCountryData = async () => {
                const fetchedCountryData = await fetchCountryData(country)
                setCountryData(fetchedCountryData)
            }
            fetchedCountryData();
        }
    },[country])



    const lineChart = (
            dailyData.length ? (
                <Line
                    data={{
                        labels: dailyData.map(({date}) => date),
                        datasets:[{
                            data : dailyData.map(({death}) => death),
                            label : "Deaths",
                            fill: true,
                            backgroundColor : 'rgba(255, 0, 0, 0.7)'
                        },{
                            data : dailyData.map(({confirmed}) => confirmed),
                            label : "Confirmed",
                            fill: true,
                            backgroundColor : 'rgba(0, 0, 255, 0.3)'
                        }]
                    }}
                />
            ) : ""
    )
    
    const barChart = (
            <ResponsiveContainer width="95%" height={600}>
                <BarChart 
                    data = {countryData}
                    layout="vertical"
                    barSize = {50}
                    margin = {{
                        top : 15,right :30 , left : 150,bottom : 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="state"/>
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="confirmed" fill="#8884d8" minPointSize={10} />
                </BarChart>
            </ResponsiveContainer>

    )
    
    return(
        <div className={styles.container}>
            {country === 'Global' ? lineChart : barChart}
        </div>
    )
}

export default Charts