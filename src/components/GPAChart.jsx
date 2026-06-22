import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GPAChart({
  semesterData,
  scale,
}) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow">
      <h2 className="text-xl font-bold mb-4">
        GPA Trend Across Semesters
      </h2>

      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={semesterData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, scale]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#6366f1"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GPAChart;