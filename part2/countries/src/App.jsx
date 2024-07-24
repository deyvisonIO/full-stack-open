import { useState, useEffect } from "react";


const apikey = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [search, setSearch] = useState("");


  useEffect(() => {
    const apiUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
    if(countries.length > 0 && !search) return;
    if (search) {
      const getfilteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCountries(getfilteredCountries);
      return;
    }

    const countrySearchResponse = fetch(apiUrl + "all");

    const countryDataPromise = countrySearchResponse.then((response) =>
      response.json(),
    );

    countryDataPromise.then((data) => setCountries(data));
  }, [search, countries]);

  return (
    <>
      <label>find countries</label>
      <input
        type="search"
        onChange={(event) => setSearch(event.target.value)}
      />
      <div>
        {filteredCountries.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filteredCountries.length > 1 &&
          filteredCountries.length <= 10 &&
          filteredCountries.map((country) => (
            <p key={country.name.common}>
              {country.name.common}{" "}
              <button onClick={() => setSearch(country.name.common)}>
                show
              </button>
            </p>
          ))}
          {filteredCountries.length === 1 && <Country country={filteredCountries[0]} />}
      </div>
    </>
  );
}

function Country({ country }) {
  const [weather, setWeather] = useState(null);


  useEffect(() => {
    const controller = new AbortController();
    console.log(controller)
    console.log(controller.signal)
    console.log(controller.abort)
    const weatherPromise = fetch(
      `https://api.openweathermap.org/data/2.5/weather?appid=${apikey}&q=${country.name.common}&units=metric`,
      {
        signal: controller.signal
      }
    );
    const weatherData = weatherPromise.then((response) => response.json());
    weatherData.then((weatherData) => setWeather(weatherData));
    weatherData.then((weatherData) => console.log(weatherData));
    return () => {
      controller.abort("Component Re-rendering while request was being made.")
    }

  }, [country])



  return (
  <>
    <h1>{country.name.common}</h1>
    <p>capital {country.capital[0]}</p>
    <p>area {country.area}</p>
    <h3>languages:</h3>
    <ul>
      {Object.values(country.languages).map((language) => (
        <li key={language}>{language}</li>
      ))}
    </ul>
    <img
      src={country.flags.png}
      alt={`${country.name.common}'s flag`}
    />
    {weather && (
      <>
        <h3>Weather in {country.name.common}</h3>
        <p>temperature {weather.main.temp} Celsius</p>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
          alt={weather.description}
        />
        <p>wind {weather.wind.speed} m/s</p>
      </>
    )}
  </>
  )
}

export default App;
