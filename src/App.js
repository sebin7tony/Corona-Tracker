import React from "react";
// import Cards from "./components/Cards/Cards"
// import Charts from "./components/Charts/Charts"
// import CountryPicker from "./components/CountryPicker/CountryPicker"

import {Cards, Charts, CountryPicker} from './components'
import styles from './App.module.css' 
import {fetchData} from './api'

class App extends React.Component{

    state = {
        data : {},
        country : 'Global'
    }

    async componentDidMount(){
        const fetchedData = await fetchData(this.state.country);
        //console.log(fetchedData);
        this.setState({data : fetchedData});
    }

    handleChange = async (event) => {
        console.log(event.target.value)
        const fetchedData = await fetchData(event.target.value);
        this.setState({data : fetchedData,country : event.target.value});
    }

    render(){
        return(
            <div className={styles.container}>
                <h1>Corona Tracker App</h1>
                <Cards data={this.state.data} />
                <CountryPicker handleChange={this.handleChange} selectedCountry={this.state.country}/>
                <Charts country={this.state.country}/>
            </div>
        )
    }
}

export default App