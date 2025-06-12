import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { ApplicationEnums } from "../auth/middleware";

interface EnumsContextType {
  enums: ApplicationEnums | null;
  setEnums: (enums: ApplicationEnums | null) => void;
}

const EnumsContext = createContext<EnumsContextType | undefined>(undefined);

export const EnumsProvider = ({ children }: { children: ReactNode }) => {
  const [enums, setEnums] = useState<ApplicationEnums | null>(null);

  return (
    <EnumsContext.Provider value={{ enums, setEnums }}>
      {children}
    </EnumsContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useEnums = () => {
  const context = useContext(EnumsContext);
  if (context === undefined) {
    throw new Error("useEnums must be used within an EnumsProvider");
  }
  return context;
};
