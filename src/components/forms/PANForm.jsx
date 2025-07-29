import React, { useState } from 'react';
import { validatePAN } from './src/utils/helpers';
import './src/components/forms/PANForm.css';

const PANForm = () => {
  const [pan, setPan] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePAN(pan)) {
      setError('Invalid PAN format! (ABCDE1234F)');
      return;
    }
    alert('PAN submitted successfully!');
    setError('');
    setPan('');
  };

  return (
    <form className="pan-form" onSubmit={handleSubmit}>
      <h4>PAN Form</h4>
      <input
        type="text"
        value={pan}
        onChange={(e) => setPan(e.target.value)}
        placeholder="Enter PAN Number"
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default PANForm;
