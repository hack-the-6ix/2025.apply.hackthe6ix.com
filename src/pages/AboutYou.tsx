import tree2SVG from "../assets/tree2.svg";
import birdlogSVG from "../assets/bird_log.svg";
import appleSVG from "../assets/apple.svg";

import cliffSVG from "../assets/cliff.svg";
import Text from "../components/Text/Text";
import Input from "../components/Input/Input";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/ContextProvider";
import { useContext, useState } from "react";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import Dropdown from "../components/Dropdown/Dropdown";
import { CANADIAN_PROVINCES } from "../constants/locations";
import { PLAYER_IMAGES } from "../constants/images";

export default function AboutYou() {
  const navigate = useNavigate();
  const { setCompletedSection, completedSection, selectedItem, selectedSkin, formData, setFormData } =
    useContext(Context);
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);

  // Form state
  const [fullName, setFullName] = useState(formData?.fullName || '');
  const [email, setEmail] = useState(formData?.email || '');
  const [city, setCity] = useState(formData?.city || '');
  const [province, setProvince] = useState(formData?.province || '');
  const [country, setCountry] = useState(formData?.country || '');
  const [emergencyFirstName, setEmergencyFirstName] = useState(formData?.emergencyFirstName || '');
  const [emergencyLastName, setEmergencyLastName] = useState(formData?.emergencyLastName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(formData?.emergencyPhone || '');
  const [emergencyRelationship, setEmergencyRelationship] = useState(formData?.emergencyRelationship || '');

  const updateFormData = () => {
    setFormData({
      ...formData,
      fullName,
      email,
      city,
      province,
      country,
      emergencyFirstName,
      emergencyLastName,
      emergencyPhone,
      emergencyRelationship
    });
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC]  h-[100vh] w-full flex flex-col justify-center items-start">
      <div className="w-full h-full flex items-center justify-start px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-12 w-full max-w-[1200px] sm:ml-[158px] -mt-[100px]">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 py-4">
              {page === 1 && (
                <Text
                  textType="heading-lg"
                  textFont="rubik"
                  textColor="primary"
                >
                  Nice! Next, fill in some information on yourself:
                </Text>
              )}
              {page === 2 && (
                <Text
                  textType="heading-lg"
                  textFont="rubik"
                  textColor="primary"
                >
                  What's your email?
                </Text>
              )}
              {page === 3 && (
                <Text
                  textType="heading-lg"
                  textFont="rubik"
                  textColor="primary"
                >
                  Where are you located?
                </Text>
              )}
              {page === 4 && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="ml-[5px]"
                  >
                    Emergency Information
                  </Text>
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="primary"
                    className="ml-[5px]"
                  >
                    Your safety is our priority. In the case of an emergency,
                    this person will be contacted. We respect your privacy and
                    guarantee that this information will be only be accessed by
                    authorized personnel.{" "}
                  </Text>
                </>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              {page === 1 && (
                <>
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="primary"
                    className="ml-[10px]"
                  >
                    Your full name*
                  </Text>
                  <Input 
                    placeholder="John Doe" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </>
              )}

              {page === 2 && (
                <>
                  <Input 
                    placeholder="john.doe@university.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className="ml-2 py-2">
                    <Checkbox 
                      textColor={"#08566B"} 
                      backgroundColor="#B3E9FC" 
                      checked={checked} 
                      onChange={() => setChecked(!checked)} 
                      label="I give permission to Hack the 6ix for sending me emails containing information from the event sponsors. " 
                    />
                  </div>
                </>
              )}

              {page === 3 && (
                <>
                  <Text
                    textType="paragraph-sm"
                    textFont="rubik"
                    textColor="primary"
                    className="ml-[10px]"
                  >
                    City*
                  </Text>
                  <Input 
                    placeholder="Toronto" 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Province*
                      </Text>
                      <Dropdown
                        options={CANADIAN_PROVINCES}
                        value={province}
                        onChange={(value) => setProvince(value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Country*
                      </Text>
                      <Dropdown
                        options={[{ label: "Canada", value: "CA" }]}
                        value={country}
                        onChange={(value) => setCountry(value)}
                      />
                    </div>
                  </div>
                </>
              )}
              {page === 4 && (
                <>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        First Name*
                      </Text>
                      <Input 
                        placeholder="Jane" 
                        value={emergencyFirstName}
                        onChange={(e) => setEmergencyFirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Last Name*
                      </Text>
                      <Input 
                        placeholder="Doe" 
                        value={emergencyLastName}
                        onChange={(e) => setEmergencyLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Phone Number*
                      </Text>
                      <Input 
                        placeholder="###-###-####" 
                        value={emergencyPhone}
                        onChange={(e) => setEmergencyPhone(e.target.value)}
                      />
                    </div>
                    <div className="w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Relationship*
                      </Text>
                      <Dropdown
                        options={[
                          { label: "Parent", value: "parent" },
                          { label: "Guardian", value: "guardian" },
                          { label: "Sibling", value: "sibling" },
                          { label: "Spouse", value: "spouse" },
                          { label: "Friend", value: "friend" },
                          { label: "Other", value: "other" },
                        ]}
                        value={emergencyRelationship}
                        onChange={(value) => setEmergencyRelationship(value)}
                      />
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-row justify-end w-full gap-3">
              <Button
                variant="back"
                onClick={() => {
                  if (page === 1) {
                    navigate("/apply?section=player");
                  } else {
                    setPage(page - 1);
                  }
                }}
              >
                Back
              </Button>
              <Button
                disabled={(page == 1 && !fullName) || (page == 2 && (!email || !checked)) || (page == 3 && (!city || !province || !country) )
                   || (page == 4 && (!emergencyFirstName || !emergencyLastName || !emergencyPhone || !emergencyRelationship) )
                }
                onClick={() => {
                  if (page < 4) {
                    setPage(page + 1);
                  } else {
                    updateFormData();
                    const updateCompleted = completedSection.map((val, i) =>
                      i === 0 ? true : val
                    );
                    setCompletedSection(updateCompleted);
                    navigate("/apply?section=experience");
                  }
                }}
              >
                Next
              </Button>
            </div>

            <div className="flex justify-end w-full">
              <ProgressBar numSteps={4} currPage={page} />
            </div>
          </div>
        </div>
      </div>

      <img
        src={tree2SVG}
        alt="Tree"
        className="sm:block hidden absolute h-[300px] w-[300px] bottom-[80px] left-[25px]"
      />

      <img
        src={birdlogSVG}
        alt="bird on log"
        className="sm:block hidden absolute h-[120px] w-[280px] bottom-[90px] left-[250px]"
      />

      <img
        src={cliffSVG}
        alt="cliff"
        className="sm:block hidden absolute h-[600px]  bottom-[27px] right-[0px]"
      />

      <img
        src={PLAYER_IMAGES[selectedSkin][selectedItem]}
        alt="Player"
        className=" absolute sm:h-[140px] h-[70px] sm:bottom-[85px] sm:right-[200px] right-[100px] bottom-[35px]"
      />

      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px]  animate-bounce-custom"
      />
    </div>
  );
}
