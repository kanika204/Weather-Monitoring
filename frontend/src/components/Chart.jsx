import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

export default function ChartComponent({ data }) {

  // Safety check
  if (!data || !data.time || data.time.length === 0) {
    return <p>No data available</p>;
  }

  // Convert API → chart format
  const chartData = data.time.map((t, i) => ({
    time: t,
    temperature: data.temperature[i],
    humidity: data.humidity[i]
  }));

  return (
    <div>
      <h2>📊 Live Sensor Data</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" />
          <Tooltip />
          <Legend />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#3b82f6"
          />

          <Line
            type="monotone"
            dataKey="humidity"
            stroke="#22c55e"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
