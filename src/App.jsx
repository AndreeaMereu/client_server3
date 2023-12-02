import { useState, useEffect } from "react";
import "./App.css";

const URL =
  "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,snowfall,wind_speed_10m&daily=temperature_2m_min,apparent_temperature_max,sunrise";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [meteoData, setMeteoData] = useState(undefined);

  useEffect(() => {
    setIsLoading(true);

    fetch(URL, { method: "GET" })
      .then(
        (response) =>
          new Promise((resolve) =>
            setTimeout(() => {
              resolve(response.json());
            }, 3000)
          )
      )
      .then((data) => {
        setIsLoading(false);
        const { temperature_2m, snowfall, relative_humidity_2m, time } = data.hourly;

        setMeteoData({
          temperature: temperature_2m,
          snowfall: snowfall,
          humidity: relative_humidity_2m,
          time: time,
        });
      });
  }, []);

  if (isLoading) {
    return (
      <div className="lds-roller">
        <div></div>
        <div></div>
      </div>
    );
  }

  return (
    <div>
      <h1>Fetch</h1>
      {meteoData && (
        <table>
          <thead>
            <tr>
              <th>temperature</th>
              <th>snowfall</th>
              <th>humidity</th>
              <th>time</th>
            </tr>
          </thead>
          <tbody>
            {meteoData.temperature.map((_, i) => (
              <tr key={i}>
                <td>{meteoData.temperature[i]}</td>
                <td>{meteoData.snowfall[i]}</td>
                <td>{meteoData.humidity[i]}</td>
                <td>{meteoData.time[i]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;