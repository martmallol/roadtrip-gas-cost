import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './LastTrip.css'

const totalSpent = () => {
  return 0;
}

function LastTrip({ response, fetchedAPI }) {
  const [selected, setSelected] = useState(false);
  
  const toggle = () => {
    return (selected ? setSelected(false) : setSelected(true));
  }

  const tripsCost = [
    {
      id: 1,
      answer: 'hi'
    }
  ]

  const renderCard = () => {
    // No roadtrip was submitted
    if (Object.keys(response.trips[0]).length === 0) {
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
                <h6>You'll spend approximately ${totalSpent} on gas.</h6> 
                <span>{(!selected) ? '+' : '-'}</span>
              </div>

                <div  className={selected ? 'content-show' : 'content'}>
                  {tripsCost.map((elem) => {
                    return( // Don't forget!
                      <p>Soy el content {elem.answer}</p>
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
        {renderCard()}
        {console.log(fetchedAPI)}
      </div>
    </div>
  )
}

export default LastTrip;