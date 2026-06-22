// import { createContext, useContext, useState } from "react";

// const AppContext = createContext();

// export const AppProvider = ({ children }) => {
//   const [activePage, setActivePage] = useState("dashboard");

//   return (
//     <AppContext.Provider value={{ activePage, setActivePage }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export const useApp = () => useContext(AppContext);