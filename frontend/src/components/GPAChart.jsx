import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
} from "recharts";

function GPAChart({ semesterData, scale }) {
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 640;

  return (
    <div className="rounded-2xl bg-white border border-gray-100 shadow-sm p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          GPA Trend
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Track your academic performance across semesters
        </p>
      </div>

      <div className="h-[360px] sm:h-[420px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={semesterData}
            margin={{
              top: 20,
              right: 20,
              left: -10,
              bottom: 10,
            }}
          >
            <defs>
              <linearGradient
                id="gpaFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#4F46E5"
                  stopOpacity={0.35}
                />
                <stop
                  offset="95%"
                  stopColor="#4F46E5"
                  stopOpacity={0.03}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              stroke="#F1F5F9"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              minTickGap={20}
              tick={({ x, y, payload, index }) => {
                if (isMobile && index % 2 !== 0) return null;

                return (
                  <text
                    x={x}
                    y={y + 18}
                    textAnchor="middle"
                    fill="#64748B"
                    fontSize={12}
                  >
                    {payload.value}
                  </text>
                );
              }}
            />

            <YAxis
              domain={[0, scale]}
              axisLine={false}
              tickLine={false}
              width={35}
              tick={{
                fill: "#64748B",
                fontSize: 12,
              }}
            />

            <Tooltip
              cursor={{
                stroke: "#6366F1",
                strokeDasharray: "4 4",
              }}
              contentStyle={{
                borderRadius: 14,
                border: "none",
                boxShadow:
                  "0 10px 25px rgba(0,0,0,.12)",
                padding: "10px 14px",
              }}
              formatter={(value) => [
                Number(value).toFixed(2),
                "GPA",
              ]}
            />

            {/* Optional target GPA */}
            <ReferenceLine
              y={3.5}
              stroke="#22C55E"
              strokeDasharray="5 5"
              ifOverflow="extendDomain"
            />

            <Area
              type="monotone"
              dataKey="gpa"
              stroke="none"
              fill="url(#gpaFill)"
            />

            <Line
              type="monotone"
              dataKey="gpa"
              stroke="#4F46E5"
              strokeWidth={4}
              dot={{
                r: 4,
                fill: "#4F46E5",
                stroke: "#fff",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "#4338CA",
                stroke: "#fff",
                strokeWidth: 3,
              }}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default GPAChart;