import React from 'react';
import './src/components/forms/TDSForm.css';

const TDSForm = () => (
  <form className="tds-form">
    <h4>TDS Form</h4>
    <input placeholder="TDS Amount" />
    <button type="submit">Submit</button>
  </form>
);

export default TDSForm;
