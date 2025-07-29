import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { chartData } from '../../data/dummyData';
import './src/components/chartsTaxRevenueChart.css';

const TaxRevenueChart = () => (
  <div className="chart">
    <h3>Tax Revenue</h3>
    <BarChart width={500} height={250} data={chartData}>
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="revenue" fill="#82ca9d" />
    </BarChart>
  </div>
);

export default TaxRevenueChart;
