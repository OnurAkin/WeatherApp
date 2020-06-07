import React, { useEffect, useState } from "react";
import axios from "axios";
import WeatherDetail from "./WeatherData";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckSquare, faSearch } from '@fortawesome/fontawesome-free-solid'
import "../scss/main.scss";

export default function Main() {
  const [cityName, setName] = useState([]);
  const [search, SetSearch] = useState('');

  useEffect(() => {
    axios
      .get(
        "http://api.geonames.org/searchJSON?username=ksuhiyp&country=tr&maxRows=7&style=SHORT"
      )
      .then((response) => setName(response.data.geonames));
  }, []);

  const filteredCity = cityName.filter(city => {
    return city.toponymName.toLowerCase().includes(search.toLowerCase())
  })

  return (
    <Router path="/">
      <div className="container">
        <Route path="/"
          exact
          render={renderProps => {
            return (
              <div className="wrap">
                <div class="search">
                  <input type="text" class="searchTerm" onChange={e => SetSearch(e.target.value)} placeholder="Weather in your city" />
                  <buton type="submit" class="searchButton"> <FontAwesomeIcon icon={faSearch} /></buton>
                </div>
              </div>
            );
          }
          }
        />


        <div className="weather-wrapper">
          <Route
            path="/"
            exact
            render={() =>
              filteredCity.map((wthr) => (
                <div className="weather-card madrid">
                  <div className="weather-icon sun"></div>
                  <h1>26º</h1>
                  <p key={wthr.geonameId}>
                    <Link to={"/weather/" + wthr.toponymName}>
                      {wthr.toponymName}
                    </Link>
                  </p>
                </div>
              ))
            }
          />
        </div>

        <Route
          path="/weather/:toponymName"

          render={(renderProps) => {
            const tpname = cityName.find(
              (tpname) =>
                tpname.toponymName === renderProps.match.params.toponymName
            );
            return <WeatherDetail {...renderProps} tpname={tpname} />;
          }}
        />
      </div>
    </Router>
  );
}
