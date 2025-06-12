import brickhouse from "../assets/brickhouse.svg";
import pinetree from "../assets/pine_tree.svg";
import campfire from "../assets/campfire.svg";
import apple from "../assets/apple.svg";
import { PLAYER_IMAGES } from "../constants/images";
import firefly from "../assets/firefly.svg";
import cloud from "../assets/cloud.svg";
import cloudgroup2 from "../assets/cloudgroup2.svg";

import { useState, useEffect } from "react";
import Text from "../components/Text/Text";
import Dropdown from "../components/Dropdown/Dropdown";
import Checkbox from "../components/Checkbox/Checkbox";
import Button from "../components/Button/Button";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../contexts/ApplicationContext";
import { useSearchParams } from "react-router-dom";
import {
  DIETARY_RESTRICTIONS,
  GENDER_OPTIONS,
  ETHNICITY_OPTIONS,
  WORKSHOPS
} from "../constants/survey";

const HOW_DID_YOU_HEAR = [
  "Instagram",
  "Discord",
  "Website",
  "Email",
  "LinkedIn",
  "Word of mouth",
  "JamHacks",
  "GeeseHacks",
  "UofTHacks",
  "MasseyHacks",
  "UW Data Science Club"
];

const TSHIRT_SIZES = ["S", "M", "L", "XL", "2XL", "3XL"];

export default function Survey() {
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

  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>(
    formData?.requestedWorkshops || []
  );
  const [tshirtSize, setTshirtSize] = useState(formData?.tshirtSize || "");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    formData?.dietaryRestrictions || ""
  );
  const [gender, setGender] = useState(formData?.gender || "");
  const [ethnicity, setEthnicity] = useState(formData?.ethnicity || "");
  const [howDidYouHearAboutHT6, sethowDidYouHearAboutHT6] = useState<string[]>(
    formData?.howDidYouHearAboutHT6 || []
  );
  const [permission1, setPermission1] = useState(
    formData?.permission1 || false
  );
  const [permission2, setPermission2] = useState(
    formData?.permission2 || false
  );

  useEffect(() => {
    const updatedFormData = {
      ...formData,
      requestedWorkshops: selectedWorkshops,
      tshirtSize,
      dietaryRestrictions,
      gender,
      ethnicity,
      howDidYouHearAboutHT6,
      permission1,
      permission2
    };
    setFormData(updatedFormData);
  }, [
    selectedWorkshops,
    tshirtSize,
    dietaryRestrictions,
    gender,
    ethnicity,
    howDidYouHearAboutHT6,
    permission1,
    permission2,
    setFormData
  ]);

  const handleWorkshopToggle = (value: string) => {
    if (selectedWorkshops.includes(value)) {
      setSelectedWorkshops(selectedWorkshops.filter((v) => v !== value));
    } else if (selectedWorkshops.length < 3) {
      setSelectedWorkshops([...selectedWorkshops, value]);
    }
  };

  const handlehowDidYouHearAboutHT6Toggle = (value: string) => {
    if (howDidYouHearAboutHT6.includes(value)) {
      sethowDidYouHearAboutHT6(
        howDidYouHearAboutHT6.filter((v) => v !== value)
      );
    } else {
      sethowDidYouHearAboutHT6([...howDidYouHearAboutHT6, value]);
    }
  };

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Please choose 3 workshops that you are interested in.*
            </Text>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 z-50">
              {WORKSHOPS.map((workshop) => (
                <Checkbox
                  key={workshop.value}
                  checked={selectedWorkshops.includes(workshop.value)}
                  onChange={() => handleWorkshopToggle(workshop.value)}
                  label={workshop.label}
                  backgroundColor="#656B8C"
                  textColor="white"
                />
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              What's your t-shirt size?*
            </Text>
            <Dropdown
              options={TSHIRT_SIZES}
              value={tshirtSize}
              onChange={setTshirtSize}
              placeholder="Select your t-shirt size"
              theme="dark"
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Please specify any dietary restrictions you have.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="w-full">
                <Dropdown
                  options={DIETARY_RESTRICTIONS}
                  value={dietaryRestrictions}
                  onChange={setDietaryRestrictions}
                  placeholder="Select dietary restrictions..."
                  theme="dark"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Please specify your gender and background:
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="w-full sm:w-1/2">
                <Dropdown
                  options={GENDER_OPTIONS}
                  value={gender}
                  onChange={setGender}
                  placeholder="Select gender..."
                  theme="dark"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Dropdown
                  options={ETHNICITY_OPTIONS}
                  value={ethnicity}
                  onChange={setEthnicity}
                  placeholder="Select ethnicity..."
                  theme="dark"
                />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              How did you hear about Hack the 6ix?*
            </Text>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {HOW_DID_YOU_HEAR.map((option) => (
                <Checkbox
                  key={option}
                  checked={howDidYouHearAboutHT6.includes(option)}
                  onChange={() => handlehowDidYouHearAboutHT6Toggle(option)}
                  label={option}
                  backgroundColor="#656B8C"
                  textColor="white"
                />
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Final step: we need your permission!
            </Text>
            <div className="flex flex-col gap-4">
              <Checkbox
                checked={permission1}
                onChange={setPermission1}
                label="I give permission to Hack the 6ix to use my information for the purpose of the event."
                backgroundColor="#475D7B"
                textColor="white"
              />
              <Checkbox
                checked={permission2}
                onChange={setPermission2}
                label="I give permission to Hack the 6ix to share my information with our sponsors."
                backgroundColor="#475D7B"
                textColor="white"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] via-[#60639D] to-[#DF6369] h-[100vh] w-full flex flex-col justify-center items-center z-50">
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-center sm:items-start justify-center gap-12 w-full max-w-[850px] sm:w-2/3 mx-auto">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">{renderPage()}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-end w-full gap-3 z-10">
                {page > 1 ? (
                  <Button
                    variant="back"
                    onClick={() => setSearchParams({ page: `${page - 1}` })}
                    darkMode={true}
                  />
                ) : (
                  <Button
                    variant="back"
                    onClick={() => navigate("/apply/long-answer?page=3")}
                    darkMode={true}
                  />
                )}
                <Button
                  disabled={
                    (page == 1 && selectedWorkshops.length !== 3) ||
                    (page == 2 && !tshirtSize) ||
                    (page == 4 && (!gender || !ethnicity)) ||
                    (page == 5 && !howDidYouHearAboutHT6.length) ||
                    (page == 6 && (!permission1 || !permission2))
                  }
                  darkMode={true}
                  onClick={() => {
                    if (page < 6) {
                      setSearchParams({ page: `${page + 1}` });
                    } else {
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 3 ? true : val
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply/review");
                    }
                  }}
                >
                  Next
                </Button>
              </div>
              <div className="flex justify-end w-full">
                <ProgressBar darkMode={true} numSteps={6} currPage={page} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={brickhouse}
          alt="brickhouse"
          className="sm:block hidden absolute h-[140px] w-[140px] bottom-[90px] right-[-32px] z-0"
        />
        <img
          src={PLAYER_IMAGES[selectedSkin][selectedItem]}
          alt="Player"
          className=" absolute h-[140px] sm:bottom-[85px] sm:right-[120px] right-[100px] bottom-[35px] z-0"
        />
        <img
          src={apple}
          alt="Apple"
          className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[80px] right-[70px] w-[35px] h-[35px] bottom-[38px] animate-bounce-custom z-0"
        />
        <img
          src={campfire}
          alt="campfire"
          className="sm:block hidden absolute bottom-[80px] right-[250px] z-0"
        />
        <img
          src={firefly}
          alt="firefly"
          className="sm:block hidden absolute bottom-[30px] right-[270px] animate-float z-0"
        />
        <img
          src={firefly}
          alt="firefly"
          className="sm:block hidden absolute bottom-[70px] right-[170px] animate-float z-0"
        />
        <img
          src={pinetree}
          alt="pinetree"
          className="sm:block hidden absolute h-[250px] w-[250px] bottom-[70px] left-[-60px] z-0"
        />
        <img
          src={cloud}
          alt="cloud"
          className="sm:block hidden absolute bottom-[140px] left-[-200px] z-0"
        />
        <img
          src={cloudgroup2}
          alt="cloud"
          className="sm:block hidden absolute top-[240px] right-[-0px] z-0"
        />
      </div>
    </div>
  );
}
