import { createContext, useEffect, useState } from "react";
import axios from 'axios'
export const AppContext=createContext(null)

const Contextprovider=(props)=>{
 
   const url = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
   
   const [token,setToken]=useState('')
   const[reports,setReports]=useState([])


   const fetchReport=async ()=>{
     const fetch= await axios.post(url+'/show')
   }
  
    const value={
            url,
           
    }
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default Contextprovider
