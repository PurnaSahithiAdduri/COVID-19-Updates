import React,{useState,useEffect} from 'react';
import { fetchDailyData } from '../../api';
import {Line, Bar} from 'react-chartjs-2';
import { rgbToHex } from '@material-ui/core';

import styles from './Chart.module.css'

 const Chart=({ data: { confirmed, recovered, deaths }, country })=>{
     console.log("This are the values passed to chart component: ",country);
     console.log(confirmed);
     const [dailyData,setDailyData] = useState({});

     useEffect(()=>{
         const fetchAPI = async()=>{
             setDailyData(await fetchDailyData());
         };
         fetchAPI();
     },[]);

     const lineChart=(
        
        (dailyData.length>0)?(<Line 
         data={{
             labels:dailyData.map(({date})=>date),
             datasets: [{
                data: dailyData.map(({confirmed})=>confirmed),
                label:'Infected',
                borderColor:'#3333ff',
                fill:true
             },{
                data: dailyData.map(({deaths})=>deaths),
                label:'Deaths',
                borderColor:'red',
                backgroundColor:'rgb(255,0,0,0.5)',
                fill:true
             }],
         }}
         />):null
     );


     const barChart=(
    
        confirmed?(<Bar 
         data={{
           labels:['Infected','Recovered', 'Deaths'],
           datasets:[{
                label: 'People',
                backgroundColor:['rgb(0,0,225,0.5)','rgb(0,225,0,0.5)','rgb(225,0,0,0.5)'],
                data:[confirmed.value, recovered.value, deaths.value],
         },
        ],
        }}
         options={{
            legend:{ display:false },
            title : {display:true, text:`Current state in ${country}`}
         }}
         />):null
     );

        return (
            <div className={styles.container}>
               {country ? barChart : lineChart}
            </div>
        )
}

export default Chart;
