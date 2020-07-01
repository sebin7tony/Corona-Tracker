import React,{useState, useEffect} from 'react'
import {fetchCountry} from '../../api'
import {FormControl,Select,MenuItem,InputLabel} from '@material-ui/core'
//import styles from './CountryPicker.module.css'
import {makeStyles} from '@material-ui/core/styles'

const useStyle = makeStyles((theme) => ({
    formControl : {
        margin : theme.spacing(1),
        marginLeft : '45%',
        marginBottom : '2%',
        minWidth : 200,
        justifyContent: 'center'
    },
    selectEmpty : {
        marginTOp : theme.spacing(2)
    }
}))


const CountryPicker = (props) => {
    const [countries,setCountries] = useState([]);
    const styles = useStyle();

    useEffect(() => {
        const fetchAPI = async () => {
            setCountries(await fetchCountry());
        }

        fetchAPI()
    },[])

    return(
        <div>
            <FormControl className={styles.formControl}>
                <InputLabel id="countryPicker-label">Select country</InputLabel>
                <Select
                    labelId="countryPicker-label"
                    id="form-id"
                    value={props.selectedCountry}
                    onChange={props.handleChange}
                >
                    {countries.map((country,i) => <MenuItem key={i} value={country}>{country}</MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}

export default CountryPicker