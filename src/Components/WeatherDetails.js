import "./WeatherDetails.css";
import moment from "moment";
import { TiLocationOutline } from "react-icons/ti";

export default function WeatherDetails({ data }) {
  return (
    <section className="weather-container">
      <div className="container-top">
        <div>
          <p className="paragraph">
            {moment(data.getCityByName.weather.timestamp).format("h:mm a")}
          </p>
        </div>
        <p className="paragraph">
          {moment(data.getCityByName.weather.timestamp).format("MMM Do YYYY")}
        </p>
      </div>
      <div className="container-mid">
        <span className="weather-temp-main">
          {data?.getCityByName.weather.temperature.actual}{" "}
          <span className="weather-tepm">°F</span>
        </span>
      </div>
      <div className="container-bot">
        <TiLocationOutline className="weather-icon-location" />
        <p className="paragraph">
          {data?.getCityByName.name}, {data?.getCityByName.country}
        </p>
      </div>
      <div className="container-bot">
        <p className="paragraph">
          Summary : {data?.getCityByName.weather.summary.description},{" "}
        </p>
      </div>
    </section>
  );
}
