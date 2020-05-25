import React,{useState, useEffect} from 'react';
import {NativeSelect, FormControl,FormHelperText} from '@material-ui/core';

import styles from './CountryPicker.module.css'
import { fetchCountries } from '../../api';

 const CountryPicker=({handleCountryChange})=>{
     const [countries, setFetchedCountries] = useState([]);

     useEffect(()=>{
         const fetchAPI = async()=>{
            setFetchedCountries(await fetchCountries());
         }

         fetchAPI();
     },[setFetchedCountries]);

        return (
            <FormControl className={styles.formControl}>
                <NativeSelect defaultValue="" onChange={(e)=>handleCountryChange(e.target.value)}>
                    <option value="">Global</option>
                    {countries.map((country,i) => <option key={i} value={country}>{country}</option>)}
                </NativeSelect>
                <FormHelperText className="text-muted">
      Please select a country here..
    </FormHelperText>
            </FormControl>
        )
}

export default CountryPicker;

