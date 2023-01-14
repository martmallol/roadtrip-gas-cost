import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './LastTrip.css'
import { numberSyntax } from '../Home/Home';
import statesUSA from '../../utils/states';



function LastTrip({ roadtrip, fetchedAPI, EIAApi }) {
  // This page variables
  const [selected, setSelected] = useState(false);
  const [costsArray, setCostsArray] = useState(new Array(roadtrip.trips.length));
  const toggle = () => {return (selected ? setSelected(false) : setSelected(true));}

  const getFuelType = () => {
    if(roadtrip.fuelType === "Regular Gas") {
      return "Conventional Regular Gasoline";
    } else if (roadtrip.fuelType === "Medium Gas") {
      return "Gasoline Conventional Midgrade";
    } else if (roadtrip.fuelType === "Premium Gas") {
      return "Conventional Premium Gasoline";
    } else {
      return "No 2 Diesel";
    }
  }

  // Get trip cost by fetching EIA's API
  const getTripsCost = async () => {
    
    // Variables
    let gasInfo = EIAApi.response.data;
    let fuelType = getFuelType();
    let pricesArray = new Array(roadtrip.trips.length);
    const consumption = 4 // G/100M

    // Calculate every Address' State Gas Price
    for (let i = 0; i < roadtrip.trips.length; i++) {
      let actualTrip = roadtrip.trips[i];
      let firstStateObject = statesUSA.find(elem => // Search by state abbreviation
          elem.abbreviation === (actualTrip.firstState).substring(actualTrip.firstState.length-2, actualTrip.firstState.length)); 

      let secondStateObject = statesUSA.find(elem => // Search by state abbreviation
        elem.abbreviation === (actualTrip.secondState).substring(actualTrip.secondState.length-2, actualTrip.secondState.length)); 

      let firstPriceObject = gasInfo.find((elem) => { // Search State Gas price on JSON API object
        return('code' in firstStateObject) ? (elem.duoarea === firstStateObject.code && elem['product-name'] === fuelType) : 
                                             (elem.duoarea === firstStateObject.petroleum && elem['product-name'] === fuelType);
      });
      // Check if undefined (then search for PADD)
      if(firstPriceObject === undefined) firstPriceObject = gasInfo.find((elem => (elem.duoarea === firstStateObject.petroleum && elem['product-name'] === fuelType)));
      console.log(firstPriceObject);

      let secondPriceObject = gasInfo.find((elem) => { // Search State Gas price on JSON API object
        return ('code' in secondStateObject) ? (elem.duoarea === secondStateObject.code && elem['product-name'] === fuelType) : 
                                               (elem.duoarea === secondStateObject.petroleum && elem['product-name'] === fuelType);
      });
      // Check undefined (then search for PADD)
      if(secondPriceObject === undefined) secondPriceObject = gasInfo.find((elem => (elem.duoarea === secondPriceObject.petroleum && elem['product-name'] === fuelType)));
      console.log(secondPriceObject);
      
      // Add to the prices array
      pricesArray[i] = {firstPrice: firstPriceObject.value, secondPrice: secondPriceObject.value};
    }

    // Calculate every trip gas cost based on state prices
    for (let i = 0; i < costsArray.length; i++) {
      const travelDistance = fetchedAPI[i].resourceSets[0].resources[0].travelDistance;
      console.log('TRAVEL DISTANCE:', travelDistance);
      const gasPrice = (pricesArray[i].firstPrice + pricesArray[i].secondPrice) / 2;
      costsArray[i] = gasPrice * travelDistance * consumption / 100;
      console.log('COSTS ARRAY: ', costsArray[i])
    }
    return;
  }

  const totalSpent = () => {
    let result = 0;
    for (let i = 0; i < costsArray.length; i++) {
      result += costsArray[i];
    }
    return result;
  }

  // Render page
  const renderCard = () => {
    // No roadtrip was submitted
    if (Object.keys(roadtrip.trips[0]).length === 0) {
      return (
        <div className="card-body">
          <h5 class="card-title">You haven't submitted a roadtrip yet.</h5>
          <Link className="card-link" to="/"><a>Submit your first roadtrip!</a></Link>
        </div>
      )
    } 
    // Last submitted roadtrip
    else {
      return (
        <div class="card-body">
          <h5 class="card-title">For your next roadtrip...</h5>
          <div class="accordion">

            <div className='item '>
              <div className='title p-1' onClick={() => toggle()}>
                <h6>You'll spend approximately ${totalSpent().toFixed(2)} on {roadtrip.fuelType}.</h6> 
                <span>{(!selected) ? '+' : '-'}</span>
              </div>

              <div  className={selected ? 'content-show' : 'content'}>
                {costsArray.map((elem, idx) => {
                  return( // Don't forget!
                    <p>{numberSyntax(idx+1)} trip gas cost (from {roadtrip.trips[idx].firstAddress} to {roadtrip.trips[idx].secondAddress}): ${costsArray[idx].toFixed(2)}</p>
                  )
                })}                  
              </div>
            </div>
          </div>
          <div className='mt-2'>
            <Link className="card-link" to="/"><a>Submit another roadtrip!</a></Link>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='m-2'>
      <div class="card" >
        {console.log(roadtrip)}
        {console.log('HERE WE GO, ROADTRIP COSTS AREEEEEE: ')}
        {console.log(getTripsCost())}
        {console.log(fetchedAPI)}
        {console.log('EIA API', EIAApi)}
        {renderCard()}
      </div>
    </div>
  )
}

export default LastTrip;