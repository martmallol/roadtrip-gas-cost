import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useFieldArray, useForm } from 'react-hook-form';
// Handling errors: https://www.npmjs.com/package/@hookform/error-message
import { ErrorMessage } from '@hookform/error-message'; 

function Home({ setResponse }) {
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

  // Functions
  // 1st, 2nd, 3rd, 4th, 5th, 6th, 7th, 8th, 9th, 10th, etc.
  const numberSyntax = (number) => {
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

  // Checks if a state was selected or not
  const stateValidator = (state) => {
    return state !== 'State';
  }

  // Checks if the fuel consumption value is reasonable
  const fuelValidator = (fuel) => {
    return (fuel ? fuel > 0 && fuel < 50 : true );
  }

  // Render Remove button if it's not the first trip
  const renderRemoveButton = (idx) => {
    if(idx > 0) {
      return (
      <div className='col-1'>
        <button type="button" 
                      className="btn btn-primary btn-danger" 
                      onClick={() => remove(idx)}>Remove trip</button>
      </div>
      );
    }
    return;
  };

  // Specifies what happens after clicking the 'send' button
  const formSubmit = (data) => {
    console.log(data);
    console.log(errors);
    setResponse(data);
    navigation('/last-trip')
  };

  // View
  return (
    <div className='container'>
      <div>
        <h1>How much money will you spend on your next US roadtrip?</h1>
        <h2>Figure it out!</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit(formSubmit)}>
          <h2>Fuel Cost Calculator</h2>
          
          {fields.map(({id}, index) => {
            return( // ACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
              <div key={id}>
                <label>{numberSyntax(index+1)} trip</label>                
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
                      <option>...</option>
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
                      <option>...</option>
                    </select>
                    <ErrorMessage errors={errors} 
                                  name={`trips.${index}.secondState`} 
                                  message="State is required" 
                                  render={({ message }) => <p>{message}</p>}/>
                  </div>
                </div>

                {renderRemoveButton(index)}
              </div>
          );
          })}
          
          <div className="form-row m-2 mt-3">
            <div className="col">
            <input type="number" 
                   className="form-control" 
                   placeholder='Fuel consumption L/100KM (optional)'
                   {...register('fuelConsumption', {
                    validate: fuelValidator
                   })}
                   />
            {errors['fuelConsumption'] && <p>Come on, give me a real value (Hint: It's not even close to 50)</p>}
            </div>
          </div>

          <div className="form-row m-2">
            <div className="col-0">
              <button type="button" 
                      className="btn btn-primary" 
                      onClick={() => append({})}>Add a trip</button>
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