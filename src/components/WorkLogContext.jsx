import { createContext, useState, useContext, useEffect } from 'react';

const WorkLogContext = createContext();

export const useWorkLogs = () => useContext(WorkLogContext);

export const WorkLogProvider = ({ children }) => {
  const [workLogs, setWorkLogs] = useState(() => {
    const logs = localStorage.getItem("workLogs");
    return logs ? JSON.parse(logs) : [];
  });

  useEffect(() => {
    localStorage.setItem("workLogs", JSON.stringify(workLogs));
  }, [workLogs]);

  return (
    <WorkLogContext.Provider value={{ workLogs, setWorkLogs }}>
      {children}
    </WorkLogContext.Provider>
  );
};

