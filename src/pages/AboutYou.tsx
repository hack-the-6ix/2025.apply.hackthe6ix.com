import Button from "../components/Button/Button";
import tree2SVG from "../assets/tree2.svg";

export default function AboutYou() {
  return (
    <div className="overflow-hidden bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full">
      <Button></Button>
      <Button variant="back"></Button>

      <img
        src={tree2SVG}
        alt="Tree"
        className="absolute h-[300px] w-[300px] bottom-[80px] left-[25px]"
      />
    </div>
  );
}
