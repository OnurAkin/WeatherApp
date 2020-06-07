import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import "../scss/styles.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from '@fortawesome/fontawesome-free-solid'

export default class WeatherData extends Component {
  state = {
    weather: [],
    icon: [],
    temparature: null,
    humidity: null,


  };

  async componentDidMount() {
    const API_KEY = "9de243494c0b295cca9337e1e96b00e2";
    const url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      this.props.match.params.toponymName +
      "&units=metric&appid=" +
      API_KEY;
    const response = await fetch(url);

    const data = await response.json();
    this.setState({ weather: data.weather, icon: data.weather, temparature: data.main.temp, humidity: data.main.humidity });
    console.log(data.main);
  }

  render() {
    return (
      <Fragment>
        <div class="box">
          <h1 className="location"> {this.props.match.params.toponymName}</h1>
          <Link to={'/'}>
            <div className="close-container">
              <div className="closeAlign"> <FontAwesomeIcon icon={faWindowClose} /></div>
            </div>
          </Link>


          <div class="wave -one"></div>
          <div class="wave -two"></div>
          <div class="wave -three"></div>
          <div class="weathercon">
            {this.state.icon.map((data) => (
              <img
                src={
                  "http://openweathermap.org/img/wn/" + data.icon + "@2x.png"
                }
              />
            ))}
          </div>
          <div class="info">

            {this.state.weather.map((char) => (
              <h2 key={char.main} class="location">
                {char.main}
              </h2>
            ))}

            <p class="date">7/06/2020</p>

            <h1 class="temp">{this.state.temparature} &deg;C | {this.state.humidity} &deg;F</h1>
          </div>
        </div>
      </Fragment>
    );
  }
}
