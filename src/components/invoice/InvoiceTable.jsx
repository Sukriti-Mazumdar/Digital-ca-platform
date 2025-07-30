import React from 'react';
import 'src/component/invoice/InvoiceTable.css';

const InvoiceTable = () => (
  <table className="invoice-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Service A</td><td>₹5000</td></tr>
      <tr><td>Service B</td><td>₹3000</td></tr>
    </tbody>
  </table>
);

export default InvoiceTable;
