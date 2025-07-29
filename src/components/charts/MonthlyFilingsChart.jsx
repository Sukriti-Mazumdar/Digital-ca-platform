import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { chartData } from '../../data/dummyData';
import './src/components/chartsMonthlyFilingsChart.css';

const MonthlyFilingsChart = () => (
  <div className="chart">
    <h3>Monthly Filings</h3>
    <LineChart width={500} height={250} data={chartData}>
      <Line type="monotone" dataKey="filings" stroke="#004aad" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
    </LineChart>
  </div>
);

export default MonthlyFilingsChart;
