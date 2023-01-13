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
      <head>
        <link rel="stylesheet" href="http://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
        
        <link rel="stylesheet" href="http://use.fontawesome.com/releases/v5.5.0/css/all.css" integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU" crossorigin="anonymous"></link>
        <link rel="preconnect" href="http://fonts.googleapis.com"></link><link rel="preconnect" href="http://fonts.gstatic.com" crossorigin></link>
        <link href="http://fonts.googleapis.com/css2?family=Sora:wght@500&display=swap" rel="stylesheet"></link>
      </head>
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
