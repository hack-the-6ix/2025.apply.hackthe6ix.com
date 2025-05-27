import { type JSX } from "react";
import Navbar from "./components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import AboutYou from "./pages/AboutYou";
import Experiences from "./pages/Experiences";
import LongAnswer from "./pages/LongAnswer";
import Survey from "./pages/Survey";
import Review from "./pages/Review";
import grassSVG from "./assets/grass.svg";
import PlayerSelect from "./pages/PlayerSelect";

function Application() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

  const pageComponents: { [key: string]: JSX.Element } = {
    player: <PlayerSelect />,
    about: <AboutYou />,
    experience: <Experiences />,
    "long-answer": <LongAnswer />,
    survey: <Survey />,
    review: <Review />,
  };

  const CurrentPage = pageComponents[section || "about"] || <PlayerSelect />;

  return (
    <div className="w-full">
      <div className="overflow-hidden absolute bottom-0 left-0 w-full flex justify-between items-end">
        {Array.from({ length: 40 }).map((_, index) => (
          <img
            key={index}
            src={grassSVG}
            alt="Grass"
            className="sm:h-[118px] sm:w-[78px] h-[46px] w-[30px]"
          />
        ))}
      </div>
      <Navbar />
      {CurrentPage}
    </div>
  );
}

export default Application;
