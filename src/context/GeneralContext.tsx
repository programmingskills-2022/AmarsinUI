import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface GeneralContextProps {
  isMenuOpened: boolean;
  setIsMenuOpened: (value: boolean) => void;
  treeNodeTitle: string;
  setTreeNodeTitle: (value: string) => void;
  yearId: number;
  setYearId: (value: number) => void;
  systemId: number;
  setSystemId: (value: number) => void;
  chartId: number;
  setChartId: (value: number) => void;
}

const GeneralContext = createContext<GeneralContextProps | undefined>(undefined);

const getInitial = <T,>(key: string, defaultValue: T): T => {
  const saved = localStorage.getItem(key);
  return saved !== null ? JSON.parse(saved) : defaultValue;
};

export const GeneralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(() => getInitial("isMenuOpened", true));
  const [treeNodeTitle, setTreeNodeTitle] = useState<string>(() => getInitial("treeNodeTitle", ""));
  const [yearId, setYearId] = useState<number>(() => getInitial("yearId", 0));
  const [systemId, setSystemId] = useState<number>(() => getInitial("systemId", 0));
  const [chartId, setChartId] = useState<number>(() => getInitial("chartId", 0));

  useEffect(() => { localStorage.setItem("isMenuOpened", JSON.stringify(isMenuOpened)); }, [isMenuOpened]);
  useEffect(() => { localStorage.setItem("treeNodeTitle", JSON.stringify(treeNodeTitle)); }, [treeNodeTitle]);
  useEffect(() => { localStorage.setItem("yearId", JSON.stringify(yearId)); }, [yearId]);
  useEffect(() => { localStorage.setItem("systemId", JSON.stringify(systemId)); }, [systemId]);
  useEffect(() => { localStorage.setItem("chartId", JSON.stringify(chartId)); }, [chartId]);

  return (
    <GeneralContext.Provider
      value={{
        isMenuOpened,
        setIsMenuOpened,
        treeNodeTitle,
        setTreeNodeTitle,
        yearId,
        setYearId,
        systemId,
        setSystemId,
        chartId,
        setChartId,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneralContext must be used within a GeneralProvider");
  }
  return context;
};