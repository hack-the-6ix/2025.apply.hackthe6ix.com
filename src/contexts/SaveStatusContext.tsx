import { createContext, useContext, useState, type ReactNode } from "react";

interface SaveStatusContextType {
  saveStatus: "Saving" | "Saved" | "Error";
  setSaving: () => void;
  setSaved: () => void;
  setError: () => void;
}

const SaveStatusContext = createContext<SaveStatusContextType | undefined>(
  undefined
);

export const SaveStatusProvider = ({ children }: { children: ReactNode }) => {
  const [saveStatus, setSaveStatus] = useState<"Saving" | "Saved" | "Error">(
    "Saved"
  );

  const setSaving = () => setSaveStatus("Saving");
  const setSaved = () => setSaveStatus("Saved");
  const setError = () => setSaveStatus("Error");

  return (
    <SaveStatusContext.Provider
      value={{ saveStatus, setSaving, setSaved, setError }}
    >
      {children}
    </SaveStatusContext.Provider>
  );
};

export const useSaveStatus = () => {
  const context = useContext(SaveStatusContext);
  if (context === undefined) {
    throw new Error("useSaveStatus must be used within a SaveStatusProvider");
  }
  return context;
};
