import { useTheme } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer } from "recharts";

interface DataItem {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

const data: DataItem[] = [
  {
    name: "A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "C",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "E",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const HeroGraph: React.FC = () => {
  const theme = useTheme();

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid opacity={0.6} strokeDasharray="3 3" />
        <Line
          type="monotone"
          dataKey="uv"
          stroke="#F98D67"
          fill="#F98D67"
          strokeWidth={3}
        />
        <Line
          type="natural"
          dataKey="pv"
          stroke="#0d3266"
          fill="#0d3266"
          strokeWidth={3}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HeroGraph;
