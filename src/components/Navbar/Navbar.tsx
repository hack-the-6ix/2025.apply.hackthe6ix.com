import React, { useState } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import Text from "../Text/Text";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const NAV_LINKS = [
  { label: "About You", path: "/apply?section=player" },
  { label: "Experiences", path: "/apply?section=experience" },
  { label: "Long-Answer", path: "/apply?section=long-answer" },
  { label: "Survey", path: "/apply?section=survey" },
  { label: "Review", path: "/apply?section=review" }
];

const LIGHT_MODE: string[] = ["player", "about", "review"];

const Navbar: React.FC = () => {
  const { completedSection } = useApplicationContext();
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="w-full flex items-center justify-between absolute z-50">
      <div className="sm:hidden absolute top-[30px] right-[30px]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{
            color: LIGHT_MODE.includes(section ?? "null")
              ? "#023441"
              : "#FA8D1F"
          }}
        >
          {menuOpen ? <RxCross2 size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      <div className="hidden sm:flex flex-row items-center justify-center gap-16 lg:gap-32 w-full mt-[75px] ">
        {NAV_LINKS.map(({ label, path }, i) => (
          <Link
            to={path}
            key={label}
            className="relative flex items-center gap-1"
          >
            {location.search.includes(path.split("?")[1]) && (
              <div className="absolute top-[-20px] left-[50%] -translate-x-1/2">
                <div className="flex flex-row items-center justify-center">
                  <div
                    className={`w-[7px] h-[7px] ${
                      LIGHT_MODE.includes(section ?? "null")
                        ? "bg-[#023441]"
                        : "bg-[#FA8D1F]"
                    }`}
                  ></div>
                  <div
                    className={`w-[7px] h-[7px] ${
                      LIGHT_MODE.includes(section ?? "null")
                        ? "bg-[#023441]"
                        : "bg-[#FA8D1F]"
                    }`}
                  ></div>
                  <div
                    className={`w-[7px] h-[7px] ${
                      LIGHT_MODE.includes(section ?? "null")
                        ? "bg-[#023441]"
                        : "bg-[#FA8D1F]"
                    }`}
                  ></div>
                </div>
                <div className="flex flex-row items-center justify-center">
                  <div className="w-[7px] h-[7px] bg-transparent"></div>
                  <div
                    className={`w-[7px] h-[7px] ${
                      LIGHT_MODE.includes(section ?? "null")
                        ? "bg-[#023441]"
                        : "bg-[#FA8D1F]"
                    }`}
                  ></div>
                  <div className="w-[7px] h-[7px] bg-transparent"></div>
                </div>
              </div>
            )}
            <Text
              textType="heading-sm"
              textWeight="bold"
              className={`${
                location.search.includes(path.split("?")[1])
                  ? LIGHT_MODE.includes(section ?? "null")
                    ? "!text-[#023441]"
                    : "!text-[#FA8D1F]"
                  : LIGHT_MODE.includes(section ?? "null")
                  ? "!text-[#07566B]"
                  : "!text-[#FFF]"
              }`}
            >
              {label}
            </Text>
            {!completedSection[i] && (
              <span className="absolute top-[8px] right-[-14px] rounded-full w-[7px] h-[7px] bg-red-600"></span>
            )}
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div
          className="absolute top-[65px] left-1/2 -translate-x-1/2 w-[calc(100%-50px)] rounded-xl flex flex-col items-start px-6 py-4 sm:hidden"
          style={{
            backgroundColor: LIGHT_MODE.includes(section ?? "null")
              ? "#cfedfe"
              : "#21293C",
            border: LIGHT_MODE.includes(section ?? "null")
              ? "2px solid rgba(255, 255, 255, 0.7)"
              : "2px solid rgba(255, 255, 255, 0.4)"
          }}
        >
          {NAV_LINKS.map(({ label, path }, i) => (
            <Link
              to={path}
              key={label}
              onClick={() => setMenuOpen(false)}
              className="relative py-2 flex items-center gap-2"
            >
              <Text
                textType="heading-sm"
                textWeight="bold"
                textColor={
                  section == "player" ||
                  section == "about" ||
                  section == "review" ||
                  section == "player"
                    ? "primary"
                    : "white"
                }
              >
                {label}
              </Text>
              {!completedSection[i] && (
                <span className="ml-1 rounded-full w-[7px] h-[7px] bg-red-600"></span>
              )}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
