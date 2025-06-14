import { createContext, useState, useContext } from "react";
import type { ReactNode } from "react";

export interface FormData {
  // About You fields
  firstName: string;
  lastName: string;
  email: string;
  city: string;
  province: string;
  country: string;
  emergencyFirstName: string;
  emergencyLastName: string;
  emergencyPhone: string;
  emergencyRelationship: string;
  emailPermission: boolean;

  // Experience fields
  school?: string;
  year?: string;
  program?: string;
  hackathonCount?: string;
  resume?: File | null;
  github?: string;
  linkedin?: string;
  portfolio?: string;

  // Long Answer fields
  accomplish?: string;
  project?: string;
  funFact?: string;

  // Survey fields
  requestedWorkshops?: string[];
  tshirtSize?: string;
  dietaryRestrictions?: string;
  allergies?: string;
  gender?: string;
  ethnicity?: string;
  howDidYouHearAboutHT6?: string[];
  previousHT6Experience?: string[];
  permission1?: boolean;
  permission2?: boolean;

  // Player Select fields
  selectedSkin?: number;
  selectedItem?: number;
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
  undefined,
);

export const ApplicationContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [completedSection, setCompletedSection] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [selectedSkin, setSelectedSkin] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    province: "",
    country: "",
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyPhone: "",
    emergencyRelationship: "",
    emailPermission: false,
  });

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
        setFormData,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useApplicationContext = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationContextProvider",
    );
  }
  return context;
};
