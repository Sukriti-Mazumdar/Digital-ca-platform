import React from 'react';
import { formatCurrency } from './utils/helpers';
import './components/invoice/InvoiceTotals.css';

const InvoiceTotals = ({ total }) => {
  return (
    <div className="invoice-totals">
      <p>Total Amount: {formatCurrency(total)}</p>
    </div>
  );
};

export default InvoiceTotals;
