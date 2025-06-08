import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export interface FormData {
  // About You fields
  fullName?: string;
  email?: string;
  city?: string;
  province?: string;
  country?: string;
  emergencyFirstName?: string;
  emergencyLastName?: string;
  emergencyPhone?: string;
  emergencyRelationship?: string;

  // Experience fields
  school?: string;
  year?: string;
  program?: string;
  hackathonCount?: string;
  resume?: File | null;
  emailPermission?: boolean;
  github?: string;
  linkedin?: string;
  portfolio?: string;

  // Long Answer fields
  accomplish?: string;
  project?: string;
  funFact?: string;

  // Survey fields
  selectedWorkshops?: string[];
  tshirtSize?: string;
  dietaryRestrictions?: string;
  allergies?: string;
  gender?: string;
  ethnicity?: string;
  permission1?: boolean;
  permission2?: boolean;
}

interface ApplicationContextType {
  completedSection: boolean[];
  setCompletedSection: (section: boolean[]) => void;
  selectedSkin: number;
  setSelectedSkin: (skin: number) => void;
  selectedItem: number;
  setSelectedItem: (item: number) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export const ApplicationContextProvider = ({
  children
}: {
  children: ReactNode;
}) => {
  const [completedSection, setCompletedSection] = useState([
    false,
    false,
    false,
    false,
    false
  ]);
  const [selectedSkin, setSelectedSkin] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [formData, setFormData] = useState<FormData>({});

  return (
    <ApplicationContext.Provider
      value={{
        completedSection,
        setCompletedSection,
        selectedItem,
        setSelectedItem,
        selectedSkin,
        setSelectedSkin,
        formData,
        setFormData
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationContextProvider"
    );
  }
  return context;
};
