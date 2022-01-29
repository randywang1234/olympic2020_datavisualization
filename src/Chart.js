import React,{useState,useEffect} from 'react'
import Medallist from './Medallist'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import "./chart.css"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart=({country,countrynode})=>{
    const [medal, setMedal] = useState([])
    const datalist = Medallist
    // console.log(country)
    //  const a = medal.map((d)=>{return d})
    // console.log(a)
    useEffect(()=>{
        for(let i=0; i < datalist.length; i++){
        const result = datalist[i]
        // console.log(result)
        // console.log(result.country)
        // console.log(result.children)
            if(country === result.country || countrynode === result.country){
                setMedal(result.children)
            }
        }
    },[country,countrynode])
    
        // console.log(medal)

    const data = {
        labels: ["1896", "1900", "1904", "1908", "1912", "1916", "1920", "1924", "1928", "1932", "1936", "1940", "1944", "1948", "1952", "1956", "1960", "1964", "1968", "1972", "1976", "1980", "1984", "1988", "1992", "1996", "2000", "2004", "2008", "2012", "2016", "2020"],
                datasets: [
                    {
                    label: "Total",
                    data: medal.map(item => item.Total),
                    fill: true,
                    backgroundColor: "black",
                    borderColor: "pink"
                    },
                    {
                    label: "Gold",
                    data: medal.map(item => item.Gold),
                    fill: true,
                    backgroundColor: "black",
                    borderColor: "#FFB800"
                    },
                    {
                    label: "Silver",
                    data: medal.map(item => item.Silver),
                    fill: true,
                    backgroundColor: "black",
                    borderColor: "#E0E0E0"
                    },
                    {
                    label: "Bronze",
                    data: medal.map(item => item.Bronze),
                    fill: true,
                    backgroundColor: "black",
                    borderColor: "#DC7F28"
                    }
                ]
    }
    
    const options = {
        maintainAspectRatio:false,
            scales:{
                    x: 
                        {
                            grid:{
                                color:"gray",
                            },
                            ticks:{
                                color:"white"
                            }
                        }
                    ,
                    y:
                        { 
                            beginAtZero:true,
                            grid:{
                                color:"gray",
                                opacity: .3,
                                lineWidth:1
                            },
                            ticks:{
                                color:"white"
                            }
                        }
                    
                },
                plugins:{
                    legend:{
                        labels:{
                            color:"white"
                        }
                        
                    }
                }
        }


    return (
        <div className='linechart'>
            <Line
            data={data}
            options={options}
            />
        </div>
    )
}

export default Chart
