import React, { useState } from 'react';
import { validateGST } from './src/utils/helpers';
import './src/components/forms/GSTForm.css';

const GSTForm = () => {
  const [gst, setGst] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateGST(gst)) {
      setError('Invalid GST Number format!');
      return;
    }
    alert('GST submitted successfully!');
    setError('');
    setGst('');
  };

  return (
    <form className="gst-form" onSubmit={handleSubmit}>
      <h4>GST Form</h4>
      <input
        type="text"
        value={gst}
        onChange={(e) => setGst(e.target.value)}
        placeholder="Enter GST Number"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default GSTForm;
