import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_WEATHER_QUERY } from "../graphql/Queries";
import WeatherDetails from "./WeatherDetails";
import "./WeatherApp.css";

function Home() {
  const [citySearched, setCitySearched] = useState("");
  const [getWeather, { data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: { name: citySearched },
  });

  if (error) return <h1> Error found</h1>;

  if (data) {
    console.log(data);
  }

  return (
    <div className="home">
      <div className="container">
        <input
          className="weatherSearch input "
          onChange={(event) => {
            setCitySearched(event.target.value);
          }}
          type="text"
          placeholder="type a location"
        />
        <button onClick={() => getWeather()}> Search</button>
      </div>

      <div className="weather">
        {data && (
          <>
            <WeatherDetails data={data} />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
