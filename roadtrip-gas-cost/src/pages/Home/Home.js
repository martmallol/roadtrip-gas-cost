import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { useForm } from 'react-hook-form';

function Home({ setResponse }) {
  // Variables
  const [actualTrip, setActualTrip] = useState(1);
  /* ...register('name') includes the key 'name' and the value inserted on that input 
  to the object 'data' created after submitting a form */
  const { register, formState: { errors }, handleSubmit } = useForm();
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

  // Specifies what happens after clicking the 'send' button
  const formSubmit = (data) => {
    console.log(data);
    setResponse(data);
    navigation('/last-trip')
  };

  // {/Expandable form: quirksmode.org_dom_domform.html/}


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
          
          <label>{numberSyntax(actualTrip)} trip</label>
          <div class="form-row m-2">
            <div class="col-7">
              <input type="text" 
                     class="form-control" 
                     placeholder="1st Address"
                     {...register("1st Address", {
                       required: true
                     })}></input>
              {errors['1st Address']?.type === 'required' && <p>1st Address is required</p>}
            </div>
            <div class="col">
              <select id="inputState" 
                      class="form-control"
                      {...register('1st State', {
                        validate: stateValidator
                      })}>
                <option selected>State</option>
                <option>...</option>
              </select>
              {errors['1st State'] && <p>State is required</p>}
            </div>
          </div>
          <div class="form-row m-2">
            <div class="col-7">
              <input type="text" 
                     class="form-control" 
                     placeholder="2nd Address"
                     {...register('2nd Address', {
                       required: true
                     })}></input>
              {errors['2nd Address']?.type === 'required' && <p>2nd Address is required</p>}
            </div>
            <div class="col">
            <select id="inputState" 
                    class="form-control"
                    {...register('2nd State', {
                      validate: stateValidator
                    })}>
              <option selected>State</option>
              <option>...</option>
            </select>
            {errors['2nd State'] && <p>State is required</p>}
            </div>
          </div>
          
          <div class="form-row m-2">
            <div class="col">
            <input type="number" 
                   class="form-control" 
                   placeholder='Fuel consumption L/100KM (optional)'
                   {...register('Fuel consumption L/100KM', {
                    validate: fuelValidator
                   })}
                   />
            {errors['Fuel consumption L/100KM'] && <p>Come on, give me a real value (Hint: It's not even close to 50)</p>}
            </div>
          </div>

          <div class="form-row m-2">
            <div class="col-0">
              <button type="submit" class="btn btn-primary" title='Add an address!'>+</button>
            </div>
            <div class="col-1">
              <button type="submit" class="btn btn-primary" title='Add an address!'>Send</button>
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