import axios from "axios";
import React, { useState } from "react";
function App() {
  const [location , setlocation] = useState('')
  const [data,setdata] = useState('')
  const [errorMessage, setErrorMessage] = useState('');


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=b2ac1974549ca48910a0c4baab9e3299`
  const searchloaction = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setdata(response.data);
        setErrorMessage('');
      }).catch((error) => {
        setdata('');
        setErrorMessage("Please enter a valid location.");
        console.log(error);
      });
      setlocation('');
    }
  };
  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(1);
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setlocation(event.target.value)}
          onKeyUp={searchloaction}
          placeholder='Enter Location'
          type="text" />
      </div>
      <div className="container">
      {errorMessage && (
          <div className="error-message">
            <p>{errorMessage}</p>
          </div>
        )}
        {data.name && (
          
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{kelvinToCelsius(data.main.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
 )}

        {data.name !== undefined &&
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }


       
      </div>
    </div>
  );
}

export default App;
