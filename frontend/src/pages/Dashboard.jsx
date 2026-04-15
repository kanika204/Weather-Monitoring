import { useEffect, useState } from "react";
import ChartComponent from "../components/Chart";

export default function Dashboard() {
  const [data, setData] = useState({
    time: [],
    temperature: [],
    humidity: [],
    co: []   
  });

  useEffect(() => {
    const fetchData = () => {
      fetch("http://10.206.39.205:5000/get-data") // 🔴 your PC2 IP
        .then(res => res.json())
        .then(d => {
          console.log("DATA:", d); // Debug
          setData(d);
        })
        .catch(err => console.log("Error:", err));
    };

    fetchData(); // first fetch
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  // Latest values
  const latestTemp = data.temperature[data.temperature.length - 1];
  const latestHumidity = data.humidity[data.humidity.length - 1];
  const latestCO = data.co[data.co.length - 1];   // ✅ changed

  return (
    <div style={{ padding: "20px" }}>
      <h1>🌍 Environmental Dashboard</h1>

      {/* Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <div>🌡 Temp: {latestTemp ? latestTemp + "°C" : "--"}</div>
        <div>💧 Humidity: {latestHumidity ? latestHumidity + "%" : "--"}</div>
        <div>🔥 CO: {latestCO ? latestCO + " ppm" : "--"}</div> {/* ✅ changed */}
      </div>

      {/* Chart */}
      {data.time.length === 0 ? (
        <p>Loading data...</p>
      ) : (
        <ChartComponent data={data} />
      )}
    </div>
  );
}