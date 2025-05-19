import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";
import { useContext } from "react";
import { Context } from "../ContextProvider";


const NAV_LINKS = [
  { label: "About You", path: "/apply?section=player" },
  { label: "Experiences", path: "/apply?section=experience" },
  { label: "Long-Answer", path: "/apply?section=long-answer" },
  { label: "Survey", path: "/apply?section=survey" },
  { label: "Review", path: "/apply?section=review" },
];

const Navbar: React.FC = () => {
  const {completedSection} = useContext(Context);
  return (
    <nav className="w-full flex flex-row items-center justify-center gap-[96px] absolute top-[55px]">
      {NAV_LINKS.map(({ label, path }, i) => (
        <Link to={path} key={label} className="relative flex items-center gap-1">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            {label}
          </Text>
          {!completedSection[i] && (
            <span className="absolute top-[8px] right-[-14px] rounded-full w-[7px] h-[7px] bg-red-600"></span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
