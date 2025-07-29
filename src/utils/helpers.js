// Format currency (Indian Rupee format)
export const formatCurrency = (amount) => {
  if (!amount) return '₹ 0';
  return `₹ ${amount.toLocaleString('en-IN')}`;
};

// Format date to readable format (DD/MM/YYYY)
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-IN');
};

// Validate email (simple regex)
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// Validate PAN (basic pattern: 5 letters, 4 digits, 1 letter)
export const validatePAN = (pan) => {
  const regex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return regex.test(pan.toUpperCase());
};

// Validate GST (15 characters alphanumeric)
export const validateGST = (gst) => {
  const regex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  return regex.test(gst.toUpperCase());
};

// Generate unique ID (for dummy data or temporary objects)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
