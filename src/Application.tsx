import Navbar from "./components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import AboutYou from "./pages/AboutYou";
import Experiences from "./pages/Experiences";
import grassSVG from "./assets/grass.svg";

function Application() {
  const [searchParams] = useSearchParams();
  const section = searchParams.get("section");

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

      <Navbar complete={[false, false, false, false, true]} />
      {section === "about" ? <AboutYou /> : section === "experience" ? <Experiences /> : <div></div>} 
    </div>
  );
}

export default Application;
