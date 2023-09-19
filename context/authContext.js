import React, { useState } from "react";

export const AuthContext = React.createContext({
  userToken: null,
  setUserToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);

  return (
    <AuthContext.Provider value={{ userToken, setUserToken }}>
      {children}
    </AuthContext.Provider>
  );
};
