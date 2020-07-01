import axios from 'axios'

const url = "https://covid19.mathdro.id/api"

const fetchData = async (country) => {

    let urlpath = url;
    if(country !== 'Global'){
        urlpath = url + `/countries/${country}`
    }
    try{
        const {data :{confirmed,recovered,deaths,lastUpdate}} = await axios.get(urlpath);
        //const { data } = await axios.get(url);
        //console.log(confirmed);
        return {confirmed,recovered,deaths,lastUpdate}
    }catch(error){
        
    }
}

const fetchDailyData = async () =>{
    try {
        const {data} = await axios.get(`${url}/daily`);
        //console.log(data);
        //const modifiedData = undefined;
        const modifiedData = data.map((entry) => ({
            confirmed : entry.confirmed.total,
            death : entry.deaths.total,
            date : entry.reportDate
        }))
        //console.log(modifiedData);
        return modifiedData
    } catch (error) {
        
    }
}


const fetchCountry = async () => {
    try {
        const {data : {countries}} = await axios.get(`${url}/countries`)
        let fetchedData = countries.map((country) => country.name)
        fetchedData = ['Global',...fetchedData]
        return fetchedData
    } catch (error) {
        console.log(error);
    }
}


const fetchCountryData = async (country) => {
    let fetchedCountry = undefined
    if(country !== 'Global'){
        fetchedCountry = url + `/countries/${country}/confirmed`
    }else{
        throw "Invalid country"
    }
    
    const {data} = await axios.get(fetchedCountry)
    const modifiedData = data.map((entry) => ({"state" : entry.provinceState,"confirmed" : entry.confirmed}))
    return modifiedData
}

export {fetchData,fetchDailyData,fetchCountry,fetchCountryData}