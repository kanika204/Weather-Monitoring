import { useState, useEffect } from "react";
import { Thermometer, Droplets, Sun, Leaf } from "lucide-react";
import ChartComponent from "./components/Chart";

export default function App() {
  const [page, setPage] = useState("dashboard");

  // 🔥 DATA STATE
  const [data, setData] = useState({
    time: [],
    temperature: [],
    humidity: [],
    co: []   
  });

  // 🔥 FETCH DATA FROM FLASK
  useEffect(() => {
    const fetchData = () => {
      fetch("http://10.206.39.205:5000/get-data")
        .then(res => res.json())
        .then(d => {
          console.log("DATA:", d);
          setData(d);
        })
        .catch(err => console.log("ERROR:", err));
    };

    fetchData();
    const interval = setInterval(fetchData, 2000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 Latest values
  const latestTemp = data.temperature[data.temperature.length - 1];
  const latestHumidity = data.humidity[data.humidity.length - 1];
  const latestCO = data.co[data.co.length - 1]; 

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-xl p-6">
        <h2 className="text-xl font-bold mb-6 text-blue-600">
          AeroLens IoT
        </h2>

        <div className="space-y-4">
          <p onClick={() => setPage("dashboard")} className="cursor-pointer text-blue-600 font-semibold">Dashboard</p>
          <p onClick={() => setPage("analytics")} className="cursor-pointer">Analytics</p>
          <p onClick={() => setPage("devices")} className="cursor-pointer">Devices</p>
          <p onClick={() => setPage("alerts")} className="cursor-pointer">Alerts</p>
          <p onClick={() => setPage("settings")} className="cursor-pointer">Settings</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 p-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            🌍 Environmental Overview
          </h1>

          <input
            className="px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Search..."
          />
        </div>

        {/* DASHBOARD */}
        {page === "dashboard" && (
          <>
            {/* Cards */}
            <div className="grid grid-cols-4 gap-6">

              <div className="bg-gradient-to-r from-orange-100 to-orange-50 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between">
                  <p>Temperature</p>
                  <Thermometer className="text-orange-500" />
                </div>
                <h2 className="text-3xl font-bold">
                  {latestTemp ? latestTemp + "°C" : "--"}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-blue-100 to-blue-50 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between">
                  <p>Humidity</p>
                  <Droplets className="text-blue-500" />
                </div>
                <h2 className="text-3xl font-bold">
                  {latestHumidity ? latestHumidity + "%" : "--"}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between">
                  <p>CO Level</p> {}
                  <Sun className="text-yellow-500" />
                </div>
                <h2 className="text-3xl font-bold">
                  {latestCO ? latestCO + " ppm" : "--"} {}
                </h2>
              </div>

              <div className="bg-gradient-to-r from-green-100 to-green-50 p-5 rounded-2xl shadow-lg">
                <div className="flex justify-between">
                  <p>Status</p>
                  <Leaf className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold">Live</h2>
              </div>

            </div>

            {/* Chart */}
            <div className="bg-white p-6 rounded-2xl shadow-lg mt-6">
              {data.time.length === 0 ? (
                <p>Loading data...</p>
              ) : (
                <ChartComponent data={data} />
              )}
            </div>
          </>
        )}

        {/* Other Pages */}
        {page === "analytics" && (
          <div className="text-xl font-semibold">
            📊 Analytics Page Coming Soon...
          </div>
        )}

        {page === "devices" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Devices</h2>
            <div className="space-y-3">
              <div className="bg-white p-4 rounded-xl shadow">Sensor_01 - 🟢 Active</div>
              <div className="bg-white p-4 rounded-xl shadow">Weather_Tower - 🟢 Active</div>
              <div className="bg-white p-4 rounded-xl shadow">Soil_Probe - 🔴 Offline</div>
            </div>
          </div>
        )}

        {page === "alerts" && (
          <div className="bg-red-100 p-4 rounded-xl">
            ⚠️ High temperature alert!
          </div>
        )}

        {page === "settings" && (
          <div className="text-gray-600">
            ⚙️ Settings panel
          </div>
        )}

      </div>
    </div>
  );
}