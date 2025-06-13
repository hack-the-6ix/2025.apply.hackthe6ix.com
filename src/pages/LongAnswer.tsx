import cloud from "../assets/cloud.svg";
import cloud_group from "../assets/cloud_group.svg";
import firefly from "../assets/firefly.svg";
import pine_tree from "../assets/pine_tree.svg";
import corner_rock3 from "../assets/corner_rock3.svg";
import { PLAYER_IMAGES } from "../constants/images";
import apple from "../assets/apple.svg";

import { useState, useRef, useEffect } from "react";
import Text from "../components/Text/Text";
import TextArea from "../components/TextArea/TextArea";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../contexts/ApplicationContext";
import { useSearchParams } from "react-router-dom";
import type { FormData } from "../contexts/ApplicationContext";

export default function LongAnswer() {
  const navigate = useNavigate();
  const {
    setCompletedSection,
    completedSection,
    selectedItem,
    selectedSkin,
    formData,
    setFormData
  } = useApplicationContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  const formDataRef = useRef<FormData>(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Initialize state from context
  const [accomplish, setAccomplish] = useState(formData?.accomplish || "");
  const [project, setProject] = useState(formData?.project || "");
  const [funFact, setFunFact] = useState(formData?.funFact || "");

  useEffect(() => {
    const currentFormData = formDataRef.current;
    let shouldUpdateFormData = false;
    if (
      currentFormData.accomplish !== accomplish ||
      currentFormData.project !== project ||
      currentFormData.funFact !== funFact
    ) {
      shouldUpdateFormData = true;
    }

    if (shouldUpdateFormData) {
      setFormData({
        ...currentFormData,
        accomplish,
        project,
        funFact
      });
    }
  }, [accomplish, project, funFact, setFormData]);

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-md" textFont="rubik" textColor="white">
              Tell us about a project you’ve enjoyed working on (this can be
              non-technical!). What made you decide to work on this project?
              What challenges did you face and how did you overcome them?*
            </Text>
            <TextArea
              value={accomplish}
              onChange={(e) => setAccomplish(e.target.value)}
              placeholder="Tell us what you hope to achieve..."
              backgroundColor="#3D4759"
              textColor="white"
              rows={10}
              maxWords={200}
              showWordCount={true}
            />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4">
            <Text
              textType="heading-md"
              textFont="rubik"
              textColor="white"
              className="mt-12"
            >
              If you could not do anything related to school, work, or coding
              for 4 months, what would you do and why?*
            </Text>
            <TextArea
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Share your project experience..."
              backgroundColor="#3D4759"
              textColor="white"
              rows={10}
              maxWords={50}
              showWordCount={true}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-md" textFont="rubik" textColor="white">
              You are given an elephant. You cannot sell or give away the
              elephant. What do you do with the elephant?*
            </Text>
            <Input
              value={funFact}
              onChange={(e) => setFunFact(e.target.value)}
              placeholder="Share something interesting about yourself..."
              backgroundColor="#3D4759"
              textColor="white"
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] to-[#06162F] h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden relative z-10">
        <div className="flex flex-col items-center sm:items-start justify-center gap-12 w-full max-w-[850px] sm:w-2/3 mx-auto">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">{renderPage()}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row justify-center sm:justify-end w-full gap-3">
                {page > 1 ? (
                  <Button
                    variant="back"
                    onClick={() => setSearchParams({ page: `${page - 1}` })}
                    darkMode={true}
                    className="w-full sm:w-auto"
                  />
                ) : (
                  <Button
                    variant="back"
                    onClick={() => navigate("/apply/experience?page=5")}
                    darkMode={true}
                    className="w-full sm:w-auto"
                  />
                )}
                <Button
                  disabled={
                    (page == 1 && !accomplish) ||
                    (page == 2 && !project) ||
                    (page == 3 && !funFact)
                  }
                  darkMode={true}
                  onClick={() => {
                    if (page < 3) {
                      setSearchParams({ page: `${page + 1}` });
                    } else {
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 2 ? true : val
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply/survey");
                    }
                  }}
                  className="w-full sm:w-auto"
                  variant="next"
                />
              </div>
              <div className="flex justify-center sm:justify-end w-full">
                <ProgressBar darkMode={true} numSteps={3} currPage={page} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <img
          src={corner_rock3}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[150px] w-[150px] top-[15px] left-[-30px]"
        />
        <img
          src={pine_tree}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] left-[0px]"
        />
        <img
          src={cloud}
          alt="cloud"
          className="sm:block hidden absolute bottom-[120px] left-[0px]"
        />
        <img
          src={pine_tree}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] left-[220px]"
        />
        <img
          src={cloud}
          alt="cloud"
          className="sm:block hidden absolute bottom-[120px] left-[240px]"
        />
        <img
          src={firefly}
          alt="firefly"
          className="sm:block hidden absolute bottom-[140px] left-[100px] animate-float"
        />
        <img
          src={pine_tree}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] right-[140px]"
        />
        <img
          src={pine_tree}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] right-[0px]"
        />
        <img
          src={pine_tree}
          alt="corner_rocks"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] right-[0px]"
        />
        <img
          src={cloud_group}
          alt="cloud_group"
          className="sm:block hidden absolute h-[350px] w-[350px] top-[80px] right-[0]"
        />
        <img
          src={PLAYER_IMAGES[selectedSkin][selectedItem]}
          alt="Player"
          className="absolute h-[140px] sm:bottom-[85px] sm:right-[200px] right-[100px] bottom-[35px]"
        />
        <img
          src={apple}
          alt="Apple"
          className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px] animate-bounce-custom"
        />
        <img
          src={firefly}
          alt="firefly"
          className="sm:block hidden absolute bottom-[45px] right-[230px] animate-float"
        />
        <img
          src={firefly}
          alt="firefly"
          className="sm:block hidden absolute bottom-[200px] right-[30px] animate-float"
        />
      </div>
    </div>
  );
}
