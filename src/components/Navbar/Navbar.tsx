import React from "react";
import { Link } from "react-router-dom";
import Text from "../Text/Text";

interface NavbarProps {
  complete: boolean[];
}

const NAV_LINKS = [
  { label: "About You", path: "/" },
  { label: "Experiences", path: "/experiences" },
  { label: "Long-Answer", path: "/long-answer" },
  { label: "Survey", path: "/review" },
  { label: "Review", path: "/survey" },
];

const Navbar: React.FC<NavbarProps> = ({ complete }) => {
  return (
    <nav className="w-full flex flex-row items-center justify-center gap-[96px] absolute top-[55px]">
      {NAV_LINKS.map(({ label, path }, i) => (
        <Link to={path} key={label} className="relative flex items-center gap-1">
          <Text textType="heading-sm" textWeight="bold" textColor="primary">
            {label}
          </Text>
          {!complete[i] && (
            <span className="absolute top-[8px] right-[-14px] rounded-full w-[7px] h-[7px] bg-red-600"></span>
          )}
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;
