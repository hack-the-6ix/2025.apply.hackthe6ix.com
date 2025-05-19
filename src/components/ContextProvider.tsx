import { createContext, useState } from "react";

export const Context = createContext<{
  completedSection: boolean[];
  setCompletedSection: (section: boolean[]) => void;
}>({
  completedSection: [false, false, false, false, false],
  setCompletedSection: () => {},
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

  return (
    <Context.Provider value={{ completedSection, setCompletedSection }}>
      {children}
    </Context.Provider>
  );
}
