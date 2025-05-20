import React, { createContext, useContext, useState, ReactNode } from "react";

interface GeneralContextProps {
  isMenuOpened: boolean;
  setIsMenuOpened: (value: boolean) => void;
  treeNodeTitle: string;
  setTreeNodeTitle: (value:string) => void;
  yearId:number
  setYearId:(value:number) => void;
  systemId:number
  setSystemId:(value:number) => void;
  chartId:number
  setChartId:(value:number) => void;
}

const GeneralContext = createContext<GeneralContextProps | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(true); 
  const [yearId, setYearId] = useState<number>(0); 
  const [systemId, setSystemId] = useState<number>(0); 
  const [chartId, setChartId] = useState<number>(0); 
  const [treeNodeTitle, setTreeNodeTitle] = useState<string>(''); 

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
        setChartId
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