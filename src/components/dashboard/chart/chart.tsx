import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart() {
  const data = [
    {
      name: "Sun",
      visit: 400,
      click: 240,
    },
    {
      name: "Mon",
      visit: 300,
      click: 139,
    },
    {
      name: "Tue",
      visit: 200,
      click: 380,
    },
    {
      name: "Wed",
      visit: 278,
      click: 390,
    },
    {
      name: "Thu",
      visit: 189,
      click: 480,
    },
    {
      name: "Fri",
      visit: 239,
      click: 380,
    },
    {
      name: "Sat",
      visit: 349,
      click: 430,
    },
  ];
  return (
    <div className="h-96 p-5 bg-gray-700 rounded-lg">
      <h2 className="font-extralight text-secondary mb-5">
        Εβδομαδιαία Ανακεφαλαίωση
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip contentStyle={{ border: "none" }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="visit"
            stroke="#8884d8"
            strokeDasharray="5 5"
          />
          <Line
            type="monotone"
            dataKey="click"
            stroke="#82ca9d"
            strokeDasharray="3 4 5 2"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
