import React, { useState, useRef, useLayoutEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Text from "../Text/Text";
import { IoMenu } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";

const NAV_LINKS = [
  { label: "Select Player", path: "/apply/player?page=1" },
  { label: "About You", path: "/apply/about?page=1" },
  { label: "Experiences", path: "/apply/experience?page=1" },
  { label: "Long-Answer", path: "/apply/long-answer?page=1" },
  { label: "Survey", path: "/apply/survey?page=1" },
  { label: "Review", path: "/apply/review?page=1" },
];

const LIGHT_MODE: string[] = ["player", "about", "review"];

const Navbar: React.FC = () => {
  const { section } = useParams();
  const [menuOpen, setMenuOpen] = useState(false);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [tShapeStyle, setTShapeStyle] = useState({});

  useLayoutEffect(() => {
    const activeIndex = NAV_LINKS.findIndex((link) =>
      link.path.includes(section ?? "null"),
    );

    if (activeIndex !== -1 && linkRefs.current[activeIndex]) {
      const activeLinkElement = linkRefs.current[activeIndex];
      if (activeLinkElement) {
        const parentContainer = activeLinkElement.parentElement;
        if (parentContainer) {
          const linkRect = activeLinkElement.getBoundingClientRect();
          const parentRect = parentContainer.getBoundingClientRect();

          const leftPosition =
            linkRect.left - parentRect.left + linkRect.width / 2;

          setTShapeStyle({
            left: `${leftPosition}px`,
            opacity: 1,
            transition: "left 0.3s ease-in-out, opacity 0.3s ease-in-out",
          });
        }
      }
    } else {
      setTShapeStyle({ opacity: 0, transition: "opacity 0.3s ease-in-out" });
    }
  }, [section]);

  return (
    <nav className="w-full flex items-center justify-between absolute z-[90] transition-all duration-300">
      <div className="lg:hidden absolute top-[30px] right-[30px]">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
          style={{
            color: LIGHT_MODE.includes(section ?? "null")
              ? "#023441"
              : "#FA8D1F",
          }}
        >
          {menuOpen ? <RxCross2 size={24} /> : <IoMenu size={24} />}
        </button>
      </div>

      <div className="hidden mx-8 lg:flex flex-row items-center justify-center gap-12 xl:gap-24 w-full mt-[75px] relative">
        <div
          className="absolute top-[-20px] -translate-x-1/2"
          style={tShapeStyle}
        >
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
        {NAV_LINKS.map(({ label, path }, index) => (
          <Link
            to={path}
            key={label}
            ref={(el) => {
              linkRefs.current[index] = el;
            }}
            className="relative flex items-center gap-1"
          >
            <Text
              textType="heading-sm"
              textWeight={path.includes(section ?? "null") ? "bold" : undefined}
              textColor={
                LIGHT_MODE.includes(section ?? "null") ? "primary" : "white"
              }
            >
              {label}
            </Text>
          </Link>
        ))}
      </div>

      {menuOpen && (
        <div
          className="absolute top-[65px] left-1/2 -translate-x-1/2 w-[calc(100%-50px)] rounded-xl flex flex-col items-start px-6 py-4 lg:hidden z-50"
          style={{
            backgroundColor: LIGHT_MODE.includes(section ?? "null")
              ? "#cfedfe"
              : "#21293C",
            border: LIGHT_MODE.includes(section ?? "null")
              ? "2px solid rgba(255, 255, 255, 0.7)"
              : "2px solid rgba(255, 255, 255, 0.4)",
          }}
        >
          {NAV_LINKS.map(({ label, path }) => (
            <Link
              to={path}
              key={label}
              onClick={() => setMenuOpen(false)}
              className="relative py-2 flex items-center gap-2"
            >
              <p
                className={`text-lg
                  ${
                    path.includes(section ?? "null")
                      ? "font-bold"
                      : "font-normal"
                  }
                  ${
                    path.includes(section ?? "null")
                      ? LIGHT_MODE.includes(section ?? "null")
                        ? "!text-[#023441]"
                        : "!text-[#FA8D1F]"
                      : LIGHT_MODE.includes(section ?? "null")
                        ? "!text-[#07566B]"
                        : "!text-[#FFF]"
                  }
                `}
              >
                {label}
              </p>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
