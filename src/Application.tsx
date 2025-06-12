import { type JSX } from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { useParams } from "react-router-dom";
import AboutYou from "./pages/AboutYou";
import Experiences from "./pages/Experiences";
import LongAnswer from "./pages/LongAnswer";
import Survey from "./pages/Survey";
import Review from "./pages/Review";
import grassSVG from "./assets/grass.svg";
import dirtSVG from "./assets/dirt.svg";
import PlayerSelect from "./pages/PlayerSelect";
import darkGrassSVG from "./assets/darkgrass.svg";

// Mapping of pages to their background SVGs
const pageBackgrounds: { [key: string]: string } = {
  player: grassSVG,
  about: grassSVG,
  experience: dirtSVG,
  "long-answer": darkGrassSVG,
  survey: darkGrassSVG,
  review: grassSVG,
};

function Application() {
  const { section } = useParams();

  const currentPageKey = section || "player";

  const pageComponents: { [key: string]: JSX.Element } = {
    player: <PlayerSelect />,
    about: <AboutYou />,
    experience: <Experiences />,
    "long-answer": <LongAnswer />,
    survey: <Survey />,
    review: <Review />,
  };

  const CurrentPage = pageComponents[currentPageKey] || <PlayerSelect />;
  const currentBackground = pageBackgrounds[currentPageKey] || grassSVG;

  return (
    <div className="w-full">
      <div className="overflow-hidden absolute bottom-0 left-0 w-full flex justify-between items-end">
        {Array.from({ length: 40 }).map((_, index) => (
          <img
            key={index}
            src={currentBackground}
            alt="Background"
            className="sm:h-[118px] sm:w-[78px] h-[46px] w-[30px]"
          />
        ))}
      </div>
      <Navbar />
      {CurrentPage}
      <Footer />
    </div>
  );
}

export default Application;
