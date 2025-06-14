import blobSVG from "../assets/blob.svg";
import centipedeSVG from "../assets/centi.svg";
import rock1SVG from "../assets/rock1.svg";
import rock2SVG from "../assets/rock2.svg";
import rock3SVG from "../assets/rock3.svg";
import mushroomSVG from "../assets/mushroom.svg";
import appleSVG from "../assets/apple.svg";
import bat from "../assets/bat.svg";
import corner_rocks from "../assets/corner_rocks.svg";
import corner_rocks2 from "../assets/corner_rocks2.svg";
import { PLAYER_IMAGES } from "../constants/images";
import { useState, useEffect, useRef } from "react";
import Input from "../components/Input/Input";
import Text from "../components/Text/Text";
import Dropdown from "../components/Dropdown/Dropdown";
import Button from "../components/Button/Button";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import FileUpload from "../components/FileUpload/FileUpload";
import { useNavigate } from "react-router-dom";
import {
  useApplicationContext,
  type FormData,
} from "../contexts/ApplicationContext";
import { useSearchParams } from "react-router-dom";
import { useEnums } from "../contexts/EnumsContext";

export default function Experiences() {
  const navigate = useNavigate();
  const { enums } = useEnums();
  const {
    setCompletedSection,
    completedSection,
    selectedItem,
    selectedSkin,
    formData,
    setFormData,
  } = useApplicationContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // Initialize state from context
  const [school, setSchool] = useState(formData?.school || "");
  const [year, setYear] = useState(formData?.year || "");
  const [program, setProgram] = useState(formData?.program || "");
  const [hackathonCount, setHackathonCount] = useState(
    formData?.hackathonCount || "",
  );
  const [resume, setResume] = useState<File | null>(formData?.resume || null);
  const [github, setGithub] = useState(formData?.github || "");
  const [linkedin, setLinkedin] = useState(formData?.linkedin || "");
  const [portfolio, setPortfolio] = useState(formData?.portfolio || "");

  const [githubError, setGithubError] = useState(false);
  const [linkedinError, setLinkedinError] = useState(false);
  const [portfolioError, setPortfolioError] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const formDataRef = useRef<FormData>(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    const currentFormData = formDataRef.current;
    setFormData({
      ...currentFormData,
      school,
    });
  }, [school, setFormData]);

  useEffect(() => {
    const currentFormData = formDataRef.current;
    setFormData({
      ...currentFormData,
      year,
    });
  }, [year, setFormData]);

  useEffect(() => {
    const currentFormData = formDataRef.current;
    setFormData({
      ...currentFormData,
      program,
    });
  }, [program, setFormData]);

  useEffect(() => {
    const currentFormData = formDataRef.current;
    setFormData({
      ...currentFormData,
      hackathonCount,
    });
  }, [hackathonCount, setFormData]);

  const handleFileChange = async (file: File | null) => {
    if (file) {
      setResume(file);

      try {
        const formData = new FormData();
        formData.append("resume", file);

        const token = localStorage.getItem("token");
        const headers: Record<string, string> = {
          "X-Access-Token": token || "",
        };

        const baseUrl =
          import.meta.env.VITE_API_URL || "https://api.hackthe6ix.com";
        const response = await fetch(`${baseUrl}/api/action/updateresume`, {
          method: "PUT",
          headers,
          body: formData,
        });

        if (!response.ok) {
          throw await response.json();
        }
      } catch (error) {
        console.error("Error uploading resume:", error);
      }
    } else {
      setResume(null);
    }
  };

  const updateFormData = () => {
    setFormData({
      ...formData,
      school,
      year,
      program,
      hackathonCount,
      resume,
      github,
      linkedin,
      portfolio,
    });
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col">
            <div className="mb-4">
              <Text textType="heading-lg" textFont="rubik" textColor="white">
                Your School (as of September 2025)*
              </Text>
            </div>
            <Text
              textType="paragraph-sm"
              textFont="rubik"
              textColor="white"
              className="ml-[10px]"
            >
              School Name*
            </Text>
            <div className="w-2/3">
              <Dropdown
                options={enums?.school || []}
                value={school}
                onChange={setSchool}
                placeholder="Select your school"
                theme="dark"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Year of Study & Program (as of September 2025)*
            </Text>
            <div className="flex gap-4">
              <div className="w-1/2">
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="white"
                  className="ml-[10px]"
                >
                  Year of Study*
                </Text>
                <Dropdown
                  options={enums?.levelOfStudy || []}
                  value={year}
                  onChange={setYear}
                  placeholder="Select year of study"
                  theme="dark"
                />
              </div>
              <div className="w-1/2">
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="white"
                  className="ml-[10px]"
                >
                  Program*
                </Text>
                <Dropdown
                  options={enums?.programOfStudy || []}
                  value={program}
                  onChange={setProgram}
                  placeholder="Select your program"
                  theme="dark"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col">
            <div className="mb-4">
              <Text textType="heading-lg" textFont="rubik" textColor="white">
                Number of Previous Hackathons*
              </Text>
            </div>
            <Text
              textType="paragraph-sm"
              textFont="rubik"
              textColor="white"
              className="ml-[10px]"
            >
              Number of hackathons*
            </Text>
            <Dropdown
              options={enums?.hackathonsAttended || []}
              value={hackathonCount}
              onChange={setHackathonCount}
              placeholder="Select number of hackathons"
              theme="dark"
            />
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4 w-full">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Upload Your Resume*
            </Text>
            <Text
              textType="paragraph-sm"
              textFont="rubik"
              textColor="white"
              className="ml-[10px]"
            >
              Your resume will be sent to sponsors for job opportunities!
            </Text>
            <FileUpload
              value={resume}
              onChange={handleFileChange}
              accept=".pdf"
              backgroundColor="#475D7B"
              textColor="white"
            />
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Link Your Socials
            </Text>
            <div className="flex flex-col gap-6 w-2/3">
              <div className="flex flex-col gap-1">
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="white"
                  className="ml-[10px]"
                >
                  GitHub
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="GitHub URL"
                  textColor="white"
                  value={github}
                  onChange={(e) => {
                    setGithub(e.target.value);
                    setGithubError(
                      e.target.value.length > 0 && !isValidUrl(e.target.value),
                    );
                  }}
                />
                {githubError && (
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="accent"
                    className="ml-[10px]"
                  >
                    Please enter a valid URL.
                  </Text>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="white"
                  className="ml-[10px]"
                >
                  LinkedIn
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="LinkedIn URL"
                  textColor="white"
                  value={linkedin}
                  onChange={(e) => {
                    setLinkedin(e.target.value);
                    setLinkedinError(
                      e.target.value.length > 0 && !isValidUrl(e.target.value),
                    );
                  }}
                />
                {linkedinError && (
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="accent"
                    className="ml-[10px]"
                  >
                    Please enter a valid URL.
                  </Text>
                )}
              </div>
              <div className="flex flex-col gap-1">
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="white"
                  className="ml-[10px]"
                >
                  Portfolio
                </Text>
                <Input
                  backgroundColor="#475D7B"
                  placeholder="Portfolio URL"
                  textColor="white"
                  value={portfolio}
                  onChange={(e) => {
                    setPortfolio(e.target.value);
                    setPortfolioError(
                      e.target.value.length > 0 && !isValidUrl(e.target.value),
                    );
                  }}
                />
                {portfolioError && (
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="accent"
                    className="ml-[10px]"
                  >
                    Please enter a valid URL.
                  </Text>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#2C4374] to-[#062938] h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-center sm:items-start justify-center gap-12 w-full max-w-[850px] mx-auto">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">{renderPage()}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end w-full gap-3">
                {page > 1 ? (
                  <Button
                    variant="back"
                    onClick={() => setSearchParams({ page: `${page - 1}` })}
                    darkMode={true}
                  />
                ) : (
                  <Button
                    variant="back"
                    onClick={() => navigate("/apply/about?page=4")}
                    darkMode={true}
                  />
                )}
                <Button
                  disabled={
                    (page == 1 && !school) ||
                    (page == 2 && (!year || !program)) ||
                    (page == 3 && !hackathonCount) ||
                    (page == 4 && !resume) ||
                    (page == 5 &&
                      (githubError || linkedinError || portfolioError))
                  }
                  darkMode={true}
                  onClick={() => {
                    if (page < 5) {
                      setSearchParams({ page: `${page + 1}` });
                    } else {
                      updateFormData();
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 1 ? true : val,
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply/long-answer");
                    }
                  }}
                  variant="next"
                />
              </div>
              <div className="flex justify-end w-full z-10">
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
        src={PLAYER_IMAGES[selectedSkin][selectedItem]}
        alt="Player"
        className=" absolute h-[140px] sm:bottom-[85px] sm:right-[200px] right-[100px] bottom-[35px]"
      />
      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px] "
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
