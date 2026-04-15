export default function Devices() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Devices</h1>

      <div className="mt-4 space-y-4">
        <div className="bg-white p-4 rounded-xl shadow">
          Sensor_Node_01 - 🟢 Active
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          Weather_Tower - 🟢 Active
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          Soil_Probe - 🔴 Offline
        </div>
      </div>
    </div>
  );
}