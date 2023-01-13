import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useFieldArray, useForm } from 'react-hook-form';
// Handling errors: https://www.npmjs.com/package/@hookform/error-message
import { ErrorMessage } from '@hookform/error-message'; 
import statesUSA from '../../utils/states';
import fetchMultipleTrips, { fetchGasPrices } from '../../utils/fetchApi';
import { stateValidator, fuelTypeValidator, fuelValidator } from '../../utils/validators';

// 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, etc.
export const numberSyntax = (number) => {
  let answer = '';
  let mod = number % 10;

  if(mod === 0 || (mod > 3 && mod < 10) || (number > 10 && number < 14)) {
    answer = `${number}th`;
  } else if (mod === 1) {
    answer = `${number}st`;
  } else if (mod === 2) {
    answer = `${number}nd`;
  } else {
    answer = `${number}rd`;
  }
  return answer;
};

function Home({ setRoadtrip, setFetchedAPI, setEIAApi }) {
  // Variables
  // const [actualTrip, setActualTrip] = useState(1);
  /* ...register('name') includes the key 'name' and the value inserted on that input 
  to the object 'data' created after submitting a form */
  const { register, formState: { errors }, handleSubmit, control } = useForm({
    defaultValues:  {
      trips: [{}],
      fuelConsumption: ''
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "trips" })
  const navigation = useNavigate(); // Navigate to other page of my project
  const [error, setError] = useState([0]);

  // Functions
  // Render Remove button if it's not the first trip
  const renderRemoveButton = (idx, length) => {
    if(idx > 0 || length > 1) {
      return (
      <div className='col-1'>
        <button type="button" 
                      className="btn btn-primary btn-danger" 
                      onClick={() => {
                        remove(idx); 
                        setError(e => [...error.slice(0,idx), ...error.slice(idx+1)]);
                        console.log(error);  
                      }}>Remove trip</button>
      </div>
      );
    }
    return;
  };

  // Render error message when an inexistent address was submitted
  const renderAddressError = (idx) => {
    if(error[idx]) {
      return(
        <div className='err'>
          <label>This address doesn't exist! Try again with another address/state.</label>
        </div>
      );
    } 
  }

  const nextPageHandler = (bingRoutes, eiaRoutes) => {
    let badRequests = 0;
    let requestsArr = new Array(bingRoutes.length);
    for(let i = 0; i < bingRoutes.length; i++) {
      if(bingRoutes[i].statusCode !== 200) {
        badRequests++;
        requestsArr[i] = 1;
      } else {
        requestsArr[i] = 0;
      }
    }
    console.log('Here comes the error!')
    console.log(error);
    // Should be an alert on the problematic trip
    if(badRequests > 0) {
      console.log('Provide valid addresses')
      setError(requestsArr);
    } else {
      setFetchedAPI(bingRoutes);
      setEIAApi(eiaRoutes);
      navigation('/last-trip')
    }
  }

  // Specifies what happens after clicking the 'send' button
  const formSubmit = async (data) => {
    // console.log(data);
    //console.log(errors);
    setRoadtrip(data);
  
    // let apiResponse = await fetchTrip(data.trips[0].firstAddress, data.trips[0].firstState, data.trips[0].secondAddress, data.trips[0].secondState);
    //console.log(apiResponse);
    console.log('Here are the API responses');
    let bingApiResponse = await fetchMultipleTrips(data.trips);
    let eiaApiResponse = await fetchGasPrices();
    console.log(bingApiResponse)
    console.log(eiaApiResponse)

    nextPageHandler(bingApiResponse, eiaApiResponse)
  };

  // View
  return (
    <div className='container'>
      <div>
        <h1>How much money will you spend on your next US roadtrip?</h1>
        <h2>Figure it out!</h2>
      </div>
      <div className='mt-4'>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h2>Fuel Cost Calculator</h2>
          <h6>Disclaimer: Since we are in America, we will be using Gallons & Miles instead of Liters and Kilometers</h6>
          {console.log(new Date())}
          {fields.map(({id}, index) => {
            return( // Here
              <div key={id} className='mt-3'>
                <h4>{numberSyntax(index+1)} trip</h4>                
                <div className="form-row ml-2 mr-2">
                  <div className="col-7">
                    <input type="text" 
                          name="firstAddress"
                          className="form-control" 
                          placeholder="1st Address"
                          {...register(`trips.${index}.firstAddress`, {
                            required: true
                          })}></input>
                    <ErrorMessage errors={errors} 
                                  name={`trips.${index}.firstAddress`} 
                                  message="Address is required" 
                                  render={({ message }) => <p>{message}</p>}/>

                  </div>
                  <div className="col">
                    <select id="inputState"
                            name='firstState' 
                            className="form-control"
                            {...register(`trips.${index}.firstState`, {
                              validate: stateValidator
                            })}>
                      <option selected>State</option>
                      {statesUSA.map((elem) => {
                        return(
                          <option>{elem.name}, {elem.abbreviation}</option>
                        )
                      })}
                    </select>
                    <ErrorMessage errors={errors} 
                                  name={`trips.${index}.firstState`} 
                                  message="State is required" 
                                  render={({ message }) => <p>{message}</p>}/>
                  </div>
                </div>

                <div className="form-row m-2">
                  <div className="col-7">
                    <input type="text"
                          name='secondAddress' 
                          className="form-control" 
                          placeholder="2nd Address"
                          {...register(`trips.${index}.secondAddress`, {
                            required: true
                          })}></input>
                    <ErrorMessage errors={errors} 
                                  name={`trips.${index}.secondAddress`} 
                                  message="Address is required" 
                                  render={({ message }) => <p>{message}</p>}/>
                  </div>
                  <div className="col">
                    <select id="inputState"
                            name='secondState' 
                            className="form-control"
                            {...register(`trips.${index}.secondState`, {
                              validate: stateValidator
                            })}>
                      <option selected>State</option>
                      {statesUSA.map((elem) => {
                        return(
                          <option>{elem.name}, {elem.abbreviation}</option>
                        )
                      })}
                    </select>
                    <ErrorMessage errors={errors} 
                                  name={`trips.${index}.secondState`} 
                                  message="State is required" 
                                  render={({ message }) => <p>{message}</p>}/>
                  </div>
                </div>
                {renderAddressError(index)}
                {renderRemoveButton(index, fields.length)}
                
              </div>
          );
          })}
          
          <div className="form-row m-2 mt-3">
            <div className="col-7">
            <input type="number" 
                   className="form-control" 
                   placeholder='Fuel consumption G/100M (optional)'
                   {...register('fuelConsumption', {
                    validate: fuelValidator
                   })}
                   />
            {errors['fuelConsumption'] && <p>Come on, give me a real value (Hint: It's between 1 and 8)</p>}
            </div>

            <div className="col">
              <select id="inputState"
                      name='secondState' 
                      className="form-control"
                      {...register(`fuelType`, {
                        validate: fuelTypeValidator
                      })}>
                <option selected>Fuel Type</option>
                <option>Regular Gas</option>
                <option>Medium Gas</option>
                <option>Premium Gas</option>
                <option>Diesel</option>
              
              </select>
              {errors['fuelType'] && <p>Fuel type is required</p>}
            </div>


          </div>

          <div className="form-row m-2">
            <div className="col-0">
              <button type="button" 
                      className="btn btn-primary" 
                      onClick={() => {append({}); setError(error => [...error, 0]); console.log(error);}}>Add a trip</button>
            </div>
            <div className="col-1">
              <button type="submit" className="btn btn-primary">Send</button>
            </div>
            
          </div>
        </form>
      </div>
      <div className='col-2'>

      </div>
    </div>
  );
}

export default Home;