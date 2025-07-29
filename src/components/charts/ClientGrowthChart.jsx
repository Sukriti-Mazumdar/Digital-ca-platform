import React from 'react';
import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import './src/components/chartsClientGrowthChart.css';

const data = [
  { name: "New Clients", value: 20 },
  { name: "Returning Clients", value: 10 },
];

const COLORS = ["#004aad", "#82ca9d"];

const ClientGrowthChart = () => (
  <div className="chart">
    <h3>Client Growth</h3>
    <PieChart width={400} height={250}>
      <Pie
        data={data}
        cx={200}
        cy={100}
        labelLine={false}
        outerRadius={80}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  </div>
);

export default ClientGrowthChart;
