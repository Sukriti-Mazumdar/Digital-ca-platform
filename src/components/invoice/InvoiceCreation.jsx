import React from 'react';
import InvoiceTable from './src/components/invoice/InvoiceTable';
import InvoiceTotals from './src/components/invoice/InvoiceTotals';
import './src/components/invoice/InvoiceCreation.css';

const InvoiceCreation = () => (
  <div className="invoice-creation">
    <h2>Invoice Creation</h2>
    <InvoiceTable />
    <InvoiceTotals />
  </div>
);

export default InvoiceCreation;
