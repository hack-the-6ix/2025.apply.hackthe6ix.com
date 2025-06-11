import brickhouse from "../assets/brickhouse.svg";
import pinetree from "../assets/pine_tree.svg";
import campfire from "../assets/campfire.svg";
import apple from "../assets/apple.svg";
import { PLAYER_IMAGES } from "../constants/images";
import firefly from "../assets/firefly.svg";
import cloud from "../assets/cloud.svg";
import cloudgroup2 from "../assets/cloudgroup2.svg";

import { useState, useRef, useEffect } from "react";
import Text from "../components/Text/Text";
import Dropdown from "../components/Dropdown/Dropdown";
import Input from "../components/Input/Input";
import Checkbox from "../components/Checkbox/Checkbox";
import Button from "../components/Button/Button";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useApplicationContext } from "../contexts/ApplicationContext";
import { useSearchParams } from "react-router-dom";
import type { FormData } from "../contexts/ApplicationContext";

const WORKSHOPS = [
  { label: "Basics in Python", value: "python1" },
  { label: "Basics in Python", value: "python2" },
  { label: "Basics in Python", value: "python3" },
  { label: "Basics in Python", value: "python4" },
  { label: "Basics in Python", value: "python5" },
  { label: "Basics in Python", value: "python6" },
  { label: "Basics in Python", value: "python7" },
  { label: "Basics in Python", value: "python8" },
  { label: "Basics in Python", value: "python9" },
  { label: "Basics in Python", value: "python10" },
  { label: "Basics in Python", value: "python11" },
  { label: "Basics in Python", value: "python12" }
];

const TSHIRT_SIZES = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" }
];

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

  const formDataRef = useRef<FormData>(formData);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  // Initialize state from context
  const [selectedWorkshops, setSelectedWorkshops] = useState<string[]>(
    formData?.selectedWorkshops || []
  );
  const [tshirtSize, setTshirtSize] = useState(formData?.tshirtSize || "");
  const [dietaryRestrictions, setDietaryRestrictions] = useState(
    formData?.dietaryRestrictions || ""
  );
  const [allergies, setAllergies] = useState(formData?.allergies || "");
  const [gender, setGender] = useState(formData?.gender || "");
  const [ethnicity, setEthnicity] = useState(formData?.ethnicity || "");
  const [permission1, setPermission1] = useState(
    formData?.permission1 || false
  );
  const [permission2, setPermission2] = useState(
    formData?.permission2 || false
  );

  useEffect(() => {
    const currentFormData = formDataRef.current;
    let shouldUpdateFormData = false;
    if (
      currentFormData.selectedWorkshops !== selectedWorkshops ||
      currentFormData.tshirtSize !== tshirtSize ||
      currentFormData.dietaryRestrictions !== dietaryRestrictions ||
      currentFormData.allergies !== allergies ||
      currentFormData.gender !== gender ||
      currentFormData.ethnicity !== ethnicity ||
      currentFormData.permission1 !== permission1 ||
      currentFormData.permission2 !== permission2
    ) {
      shouldUpdateFormData = true;
    }

    if (shouldUpdateFormData) {
      setFormData({
        ...currentFormData,
        selectedWorkshops,
        tshirtSize,
        dietaryRestrictions,
        allergies,
        gender,
        ethnicity,
        permission1,
        permission2
      });
    }
  }, [
    selectedWorkshops,
    tshirtSize,
    dietaryRestrictions,
    allergies,
    gender,
    ethnicity,
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

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Please choose 3 workshops that you are interested in.*
            </Text>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 z-50">
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
              onChange={setTshirtSize}
              placeholder="Select your t-shirt size"
              backgroundColor="#646989"
              textColor="white"
              menuBackgroundColor="#646989"
              menuTextColor="white"
              className="w-full"
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4 z-50">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Please specify any dietary restrictions and/or allergies you have.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              <div className="w-full sm:w-1/2">
                <Input
                  value={dietaryRestrictions}
                  onChange={(e) => setDietaryRestrictions(e.target.value)}
                  placeholder="Dietary restrictions..."
                  backgroundColor="#646989"
                  textColor="white"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Input
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="Allergies..."
                  backgroundColor="#646989"
                  textColor="white"
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
                <Input
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  placeholder="Gender..."
                  backgroundColor="#646989"
                  textColor="white"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <Input
                  value={ethnicity}
                  onChange={(e) => setEthnicity(e.target.value)}
                  placeholder="Ethnicity..."
                  backgroundColor="#646989"
                  textColor="white"
                />
              </div>
            </div>
          </div>
        );
      case 5:
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
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] via-[#60639D] to-[#DF6369] h-[100vh] w-full flex flex-col justify-center items-start z-50">
      <div className="w-full h-full flex items-center justify-start px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-12 w-full max-w-[1200px] sm:ml-[158px] -mt-[100px]">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">{renderPage()}</div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-end w-full gap-3 z-50">
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
                    (page == 1 && !selectedWorkshops.length) ||
                    (page == 2 && !tshirtSize) ||
                    (page == 3 && !dietaryRestrictions && !allergies) ||
                    (page == 4 && (!gender || !ethnicity)) ||
                    (page == 5 && (!permission1 || !permission2))
                  }
                  darkMode={true}
                  onClick={() => {
                    if (page < 5) {
                      setSearchParams({ page: `${page + 1}` });
                    } else {
                      updateFormData();
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 3 ? true : val
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply/review");
                    }
                  }}
                  className="z-10"
                >
                  Next
                </Button>
              </div>
              <div className="flex justify-end w-full">
                <ProgressBar darkMode={true} numSteps={5} currPage={page} />
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
          className=" absolute sm:h-[140px] h-[70px] sm:bottom-[85px] sm:right-[120px] right-[100px] bottom-[35px] z-0"
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
