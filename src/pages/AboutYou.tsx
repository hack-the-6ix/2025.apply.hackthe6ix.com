import Button from "../components/Button/Button";
import tree2SVG from "../assets/tree2.svg";
import shrub_flowerSVG from "../assets/bush_flower.svg";
import birdSVG from "../assets/bird.svg";

export default function AboutYou() {
  return (
    <div className="overflow-hidden bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full">
      <Button></Button>
      <Button variant="back"></Button>

      <img
        src={tree2SVG}
        alt="Tree"
        className="sm:block hidden absolute h-[300px] w-[300px] bottom-[80px] left-[25px]"
      />

      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[450px]"
      />

      <img
        src={birdSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[300px]"
      />

      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] right-[150px]"
      />
    </div>
  );
}
