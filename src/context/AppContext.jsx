import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Dummy user for authentication (simulate logged-in state)
  const [user, setUser] = useState({ name: 'CA Admin', email: 'admin@digitalca.com' });

  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;