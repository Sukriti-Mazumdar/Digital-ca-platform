import React from 'react';
import GSTForm from 'src/component/forms/GSTForm';
import PANForm from 'src/component/forms/PANForm';
import TDSForm from 'src/component/forms/TDSForm';
import 'src/component/forms/FormSection.css';

const FormSection = () => (
  <div className="form-section">
    <h2>Tax Forms</h2>
    <GSTForm />
    <PANForm />
    <TDSForm />
  </div>
);

export default FormSection;
