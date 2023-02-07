// Bing Maps API
const bingAPIKey = process.env.MY_BING_KEY;

const fetchBingFormat = (x) => {
    // Replace spaces for %20
    return x.replaceAll(' ', '%20');
}

// https://medium.com/nerd-for-tech/fetch-api-async-await-in-a-few-bites-6b4f19f7db9e
const fetchTrip = async (firstAddress, firstState, secondAddress, secondState) => {
    const formatedFirstAddr = fetchBingFormat(firstAddress);
    const formatedFirstState = fetchBingFormat(firstState); 
    const formatedSecondAddr = fetchBingFormat(secondAddress); 
    const formatedSecondState = fetchBingFormat(secondState);

    let response = await fetch(`/.netlify/functions/fetchBing?formatedFirstAddr=${formatedFirstAddr}&formatedFirstState=${formatedFirstState}&formatedSecondAddr=${formatedSecondAddr}&formatedSecondState=${formatedSecondState}`);
    // Error fetching (Prevents me to keep executing the form's submission code and its error handling)
    /* if (response.status !== 200) {
        throw new Error("Cannot fetch data, wrong addresses!");
    } */
    let data = await response.json();
    // console.log(data)
    return data;
}

// Parameter: trips array
const fetchMultipleTrips = async (arr) => {
    const result = new Array(arr.length);
    for(let i = 0; i < arr.length; i++) {
        result[i] = await fetchTrip(arr[i].firstAddress, arr[i].firstState, arr[i].secondAddress, arr[i].secondState);
    }
    return result;
}

// Bing Maps API DOCS: https://learn.microsoft.com/en-us/bingmaps/rest-services/routes/calculate-a-route?redirectedfrom=MSDN

// EIA (US Energy Information Administration) API 
const EIAAPIKey = process.env.MY_EIA_KEY;


// This lets you fetch only the gas prices of the last 1 or 2 weeks. 
const getLastTenDaysDate = () => { // https://bobbyhadz.com/blog/javascript-get-last-week-date
    const today = new Date();
    const previous = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 10);
    // The 'toLocaleString' I'm using, formats integer numbers so they always have two digits
    return (previous.getFullYear() + '-' + 
            (previous.getMonth()+1).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}) + '-' + 
            (previous.getDate()).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})
           );
}

// Parameter: Roadtrip object
export const fetchGasPrices = async () => {
    const startDate = getLastTenDaysDate();
    console.log(startDate);
    let response = await fetch(`/.netlify/functions/fetchEIA?startDate=${startDate}`);
    if (response.ok) {
        let data = await response.json();
        console.log(data);
        return data;
    } else {
        throw response;
    }    
}

// EIA API DOCS: https://www.eia.gov/opendata/documentation.php

export default fetchMultipleTrips;