import { React, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from './pages/Home/Home';
import StatePrices from './pages/StatePrices/StatePrices';
import LastTrip from './pages/LastTrip/LastTrip';


function App() {
  const [roadtrip, setRoadtrip] = useState({
    trips: [{}],
    fuelConsumption: 0 // cambiar
  });

  const [fetchedAPI, setFetchedAPI] = useState([]);
  const [EIAApi, setEIAApi] = useState([]);

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' exact element={ <Home  setRoadtrip={setRoadtrip} setFetchedAPI={setFetchedAPI} setEIAApi={setEIAApi}/> } />
          <Route path='/state-prices' element={ <StatePrices /> } />
          <Route path='/last-trip' element={ <LastTrip roadtrip={roadtrip} fetchedAPI={fetchedAPI} EIAApi={EIAApi} /> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
