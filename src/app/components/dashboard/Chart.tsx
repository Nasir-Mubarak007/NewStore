"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface chartProps {
  data: {
    date: string;
    revenue: number;
  }[];
}

const aggregateData = (data: object[]) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const aggregated = data.reduce((acc: any, curr: any) => {
    if (acc[curr.date]) {
      acc[curr.date] += curr.revenue;
    } else {
      acc[curr.date] = curr.revenue;
    }
    return acc;
  }, {});
  return Object.keys(aggregated).map((date) => ({
    date,
    revenue: aggregated[date],
  }));
};

export function Chart({ data }: chartProps) {
  const processedData = aggregateData(data);
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={processedData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          stroke="#3b82f7"
          activeDot={{ r: 8 }}
          dataKey="revenue"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
