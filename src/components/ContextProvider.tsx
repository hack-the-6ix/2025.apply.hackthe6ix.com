import { createContext, useState } from "react";

export const Context = createContext<{
  completedSection: boolean[];
  setCompletedSection: (section: boolean[]) => void;
  selectedSkin: number;
  setSelectedSkin: (skin: number) => void;
  selectedItem: number;
  setSelectedItem: (item: number) => void;
}>({
  completedSection: [false, false, false, false, false],
  setCompletedSection: () => {},
  selectedItem: 0,
  setSelectedItem: () => {},
  selectedSkin: 0,
  setSelectedSkin: () => {},
});

export default function ContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [completedSection, setCompletedSection] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const [selectedSkin, setSelectedSkin] = useState(0);
  const [selectedItem, setSelectedItem] = useState(0);

  return (
    <Context.Provider value={{ completedSection, setCompletedSection, selectedItem, setSelectedItem, selectedSkin, setSelectedSkin}}>
      {children}
    </Context.Provider>
  );
}
