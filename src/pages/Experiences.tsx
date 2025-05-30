import blobSVG from "../assets/blob.svg";
import centipedeSVG from "../assets/centi.svg";
import rock1SVG from "../assets/rock1.svg";
import rock2SVG from "../assets/rock2.svg";
import rock3SVG from "../assets/rock3.svg";
import mushroomSVG from "../assets/mushroom.svg";
import appleSVG from "../assets/apple.svg";
import p12 from "../assets/players/12.png";
import bat from "../assets/bat.svg";
import corner_rocks from "../assets/corner_rocks.svg";
import corner_rocks2 from "../assets/corner_rocks2.svg";

import { useState } from 'react';
import Input from '../components/Input/Input';
import Text from '../components/Text/Text';
import Dropdown from '../components/Dropdown/Dropdown';
import Button from '../components/Button/Button';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import FileUpload from '../components/FileUpload/FileUpload';
import Checkbox from '../components/Checkbox/Checkbox';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../components/ContextProvider';

// Placeholder data for dropdowns
const SCHOOLS = [
  { label: "University of Toronto", value: "uoft" },
  { label: "University of Waterloo", value: "uwaterloo" },
  { label: "University of British Columbia", value: "ubc" },
  { label: "McGill University", value: "mcgill" },
  { label: "Other", value: "other" },
];

const YEARS = [
  { label: "First Year", value: "1" },
  { label: "Second Year", value: "2" },
  { label: "Third Year", value: "3" },
  { label: "Fourth Year", value: "4" },
  { label: "Fifth Year+", value: "5+" },
];

const PROGRAMS = [
  { label: "Computer Science", value: "cs" },
  { label: "Computer Engineering", value: "ce" },
  { label: "Software Engineering", value: "se" },
  { label: "Electrical Engineering", value: "ee" },
  { label: "Other", value: "other" },
];

const HACKATHON_EXPERIENCE = [
  { label: "0", value: "0" },
  { label: "1-2", value: "1-2" },
  { label: "3-5", value: "3-5" },
  { label: "5+", value: "5+" },
];

export default function Experiences() {
  const navigate = useNavigate();
  const { setCompletedSection, completedSection } = useContext(Context);
  const [page, setPage] = useState(1);
  const [school, setSchool] = useState("");
  const [year, setYear] = useState("");
  const [program, setProgram] = useState("");
  const [hackathonCount, setHackathonCount] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [emailPermission, setEmailPermission] = useState(false);
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [portfolio, setPortfolio] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setResume(event.target.files[0]);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Your School (Most Recently Attended)*
            </Text>
            <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
              School Name*
            </Text>
            <Dropdown
              options={SCHOOLS}
              onChange={setSchool}
              placeholder="Select your school"
              backgroundColor="#475D7B"
              textColor='white'
              menuBackgroundColor='#475D7B'
              menuTextColor='white'
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Year of Study & Program*
            </Text>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
                  Year of Study*
                </Text>
                <Dropdown
                  options={YEARS}
                  onChange={setYear}
                  placeholder="Select year of study"
                  backgroundColor="#475D7B"
                  textColor='white'
                  menuBackgroundColor='#475D7B'
                  menuTextColor='white'
                />
              </div>
              <div className="w-1/2">
                <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
                  Program*
                </Text>
                <Dropdown
                  options={PROGRAMS}
                  onChange={setProgram}
                  placeholder="Select your program"
                  backgroundColor="#475D7B"
                  textColor='white'
                  menuBackgroundColor='#475D7B'
                  menuTextColor='white'
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-8">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Number of Previous Hackathons*
            </Text>
            <Dropdown
              options={HACKATHON_EXPERIENCE}
              onChange={setHackathonCount}
              placeholder="Select number of hackathons"
              backgroundColor="#475D7B"
              textColor='white'
              menuBackgroundColor='#475D7B'
              menuTextColor='white'
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Upload Your Resume*
            </Text>
            <FileUpload
              value={resume}
              onChange={setResume}
              accept=".pdf"
              backgroundColor="#475D7B"
              textColor="white"
            />
            <div className="mt-4">
              <Checkbox
                checked={emailPermission}
                onChange={setEmailPermission}
                label="I give permission to Hack the 6ix for sending me emails containing information from the event sponsors."
                backgroundColor="#475D7B"
                textColor="white"
              />
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Link Your Socials
            </Text>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
                  GitHub
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="GitHub URL"
                  textColor="white"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
                  LinkedIn
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="LinkedIn URL"
                  textColor="white"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Text textType="paragraph-sm" textFont="rubik" textColor="white" className="ml-[10px]">
                  Portfolio
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="Portfolio URL"
                  textColor="white"
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#2C4374] to-[#062938] h-[100vh] w-full flex flex-col justify-center items-start">
      <div className="w-full h-full flex items-center justify-start px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-12 w-full max-w-[1200px] sm:ml-[158px] -mt-[100px]">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">
              {renderPage()}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-end w-full gap-3">
                {page > 1 && (
                  <Button variant="back" onClick={() => setPage(page - 1)} darkMode={true}/>
                )}
                <Button
                darkMode={true}
                  onClick={() => {
                    if (page < 5) {
                      setPage(page + 1);
                    } else {
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 1 ? true : val
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply?section=long-answer");
                    }
                  }}
                />
              </div>
              <div className="flex justify-end w-full">
                <ProgressBar darkMode={true} numSteps={5} currPage={page} />
              </div>
            </div>
          </div>
        </div>
      </div>


      <img
        src={blobSVG}
        alt="blob"
        className="sm:block hidden absolute h-[80px] w-[80px] bottom-[120px] left-[25px] z-[1]"
      />
      <img
        src={rock1SVG}
        alt="rock1"
        className="sm:block hidden absolute h-[80px] w-[80px] bottom-[90px] left-[85px]"
      />
      <img
        src={rock2SVG}
        alt="rock2"
        className="sm:block hidden absolute h-[80px] w-[80px] bottom-[70px] left-[25px]"
      />
      <img
        src={rock3SVG}
        alt="rock3"
        className="sm:block hidden absolute h-[80px] w-[80px] bottom-[70px] left-[150px]"
      />
      <img 
        src={centipedeSVG}
        alt="centipede"
        className="sm:block hidden absolute h-[100px] w-[100px] bottom-[50px] left-[170px]"
      />
      <img
        src={mushroomSVG}
        alt="mushroom"
        className="sm:block hidden absolute h-[30] w-[30] bottom-[100px] right-[300px]"
      />
      <img
        src={p12}
        alt="p12"
        className="sm:block hidden absolute h-[140px] w-[140px] bottom-[100px] right-[185px]"
      />
      <img
        src={appleSVG}
        alt="apple"
        className="sm:block hidden absolute h-[70px] w-[70px] bottom-[100px] right-[150px]"
      />
      <img
        src={rock3SVG}
        alt="rock3"
        className="sm:block hidden absolute h-[30] w-[30] bottom-[80px] right-[60px]"
      />
      <img
        src={mushroomSVG}
        alt="mushroom"
        className="sm:block hidden absolute h-[30] w-[30] bottom-[130px] right-[80px] z-[1]"
      />
      <img
        src={mushroomSVG}
        alt="mushroom"
        className="sm:block hidden absolute h-[30] w-[30] bottom-[130px] right-[80px] z-[1]"
      />
      <img
        src={bat}
        alt="bat"
        className="sm:block hidden absolute h-[30] w-[30] top-[180px] right-[180px] z-[1]"
      />
      <img
        src={corner_rocks}
        alt="corner_rocks"
        className="sm:block hidden absolute h-[30] w-[30] top-[0px] right-[0px]"
      />
      <img
        src={corner_rocks2}
        alt="corner_rocks"
        className="sm:block hidden absolute h-[30] w-[30] top-[0px] left-[0px]"
      />
    </div>
  );
}
  