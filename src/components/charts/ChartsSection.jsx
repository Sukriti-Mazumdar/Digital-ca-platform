import React from 'react';
import MonthlyFilingsChart from'./src/components/charts/MonthlyFilingsChart';
import TaxRevenueChart from './src/components/chartsTaxRevenueChart';
import ClientGrowthChart from './src/components/chartsClientGrowthChart';
import './src/components/chartsChartsSection.css';

const ChartsSection = () => (
  <div className="charts-section">
    <h2>Analytics & Charts</h2>
    <MonthlyFilingsChart />
    <TaxRevenueChart />
    <ClientGrowthChart />
  </div>
);

export default ChartsSection;
