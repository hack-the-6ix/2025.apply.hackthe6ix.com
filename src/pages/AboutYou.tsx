import tree2SVG from "../assets/tree2.svg";
import birdlogSVG from "../assets/bird_log.svg";
import appleSVG from "../assets/apple.svg";
import cliffSVG from "../assets/cliff.svg";
import Text from "../components/Text/Text";
import Input from "../components/Input/Input";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useApplicationContext } from "../contexts/ApplicationContext";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import Dropdown from "../components/Dropdown/Dropdown";
import { PLAYER_IMAGES } from "../constants/images";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useEnums } from "../contexts/EnumsContext";
import type { FormData } from "../contexts/ApplicationContext";
import type { Profile } from "../auth/types";

export default function AboutYou() {
  const navigate = useNavigate();
  const { enums } = useEnums();
  const {
    setCompletedSection,
    completedSection,
    selectedItem,
    selectedSkin,
    formData,
    setFormData
  } = useApplicationContext();
  const { profile, setProfile } = useAuth();

  const formDataRef = useRef<FormData>(formData);
  const profileRef = useRef<Profile | null>(profile);

  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    profileRef.current = profile;
  }, [profile]);

  const [emailPermission, setEmailPermission] = useState(
    formData?.emailPermission || false
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");

  // Form state
  const [firstName, setFirstName] = useState(formData?.firstName || "");
  const [lastName, setLastName] = useState(formData?.lastName || "");
  const [email, setEmail] = useState(formData?.email || "");
  const [city, setCity] = useState(formData?.city || "");
  const [province, setProvince] = useState(formData?.province || "");
  const [country, setCountry] = useState(formData?.country || "");
  const [emergencyFirstName, setEmergencyFirstName] = useState(
    formData?.emergencyFirstName || ""
  );
  const [emergencyLastName, setEmergencyLastName] = useState(
    formData?.emergencyLastName || ""
  );
  const [emergencyPhone, setEmergencyPhone] = useState(
    formData?.emergencyPhone || ""
  );
  const [emergencyRelationship, setEmergencyRelationship] = useState(
    formData?.emergencyRelationship || ""
  );

  useEffect(() => {
    const currentFormData = formDataRef.current;
    let shouldUpdateFormData = false;
    if (
      currentFormData.firstName !== firstName ||
      currentFormData.lastName !== lastName ||
      currentFormData.email !== email ||
      currentFormData.city !== city ||
      currentFormData.province !== province ||
      currentFormData.country !== country ||
      currentFormData.emergencyFirstName !== emergencyFirstName ||
      currentFormData.emergencyLastName !== emergencyLastName ||
      currentFormData.emergencyPhone !== emergencyPhone ||
      currentFormData.emergencyRelationship !== emergencyRelationship ||
      currentFormData.emailPermission !== emailPermission
    ) {
      shouldUpdateFormData = true;
    }

    if (shouldUpdateFormData) {
      setFormData({
        ...currentFormData,
        firstName,
        lastName,
        email,
        city,
        province,
        country,
        emergencyFirstName,
        emergencyLastName,
        emergencyPhone,
        emergencyRelationship,
        emailPermission
      });
    }

    const currentProfile = profileRef.current;
    if (currentProfile) {
      let shouldUpdateProfile = false;
      if (
        currentProfile.firstName !== firstName ||
        currentProfile.lastName !== lastName ||
        currentProfile.email !== email
      ) {
        shouldUpdateProfile = true;
      }
      if (shouldUpdateProfile) {
        setProfile({
          ...currentProfile,
          firstName,
          lastName,
          email
        });
      }
    }
  }, [
    firstName,
    lastName,
    email,
    city,
    province,
    country,
    emergencyFirstName,
    emergencyLastName,
    emergencyPhone,
    emergencyRelationship,
    emailPermission,
    setFormData,
    setProfile
  ]);

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC]  h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-center sm:items-start justify-center gap-12 w-full max-w-[850px] z-30">
          <div className="flex flex-col items-start w-full gap-2">
            <div className="flex flex-col gap-4">
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
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="w-full sm:w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        First Name*
                      </Text>
                      <Input
                        placeholder="Sir"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div className="w-full sm:w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Last Name*
                      </Text>
                      <Input
                        placeholder="Hacks"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {page === 2 && (
                <>
                  <Input
                    placeholder="hacker@hackthe6ix.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!w-2/3"
                  />
                  <div className="ml-2 py-2">
                    <Checkbox
                      textColor={"#08566B"}
                      backgroundColor="#B3E9FC"
                      checked={emailPermission}
                      onChange={() => setEmailPermission(!emailPermission)}
                      label="I give permission to Hack the 6ix for sending me emails containing information from the event sponsors. "
                    />
                  </div>
                </>
              )}

              {page === 3 && (
                <div>
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
                  <div className="flex flex-col sm:flex-row gap-0 sm:gap-4 w-full">
                    <div
                      className={`w-full z-60 ${
                        country === "Canada" ? "sm:w-1/2" : ""
                      }`}
                    >
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Country*
                      </Text>
                      <div className="w-full">
                        <Dropdown
                          placeholder="Select Country"
                          options={enums?.countries || []}
                          value={country}
                          onChange={(value) => setCountry(value)}
                        />
                      </div>
                    </div>
                    {country === "Canada" && (
                      <div className="w-full sm:w-1/2 z-30">
                        <Text
                          textType="paragraph-sm"
                          textFont="rubik"
                          textColor="primary"
                          className="ml-[10px]"
                        >
                          Province*
                        </Text>
                        <Dropdown
                          placeholder="Select Province"
                          options={enums?.province || []}
                          value={province}
                          onChange={(value) => setProvince(value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {page === 4 && (
                <div className=" overflow-y-auto max-h-[200px]">
                  <div className="flex flex-col sm:flex-row gap-4 w-full">
                    <div className="w-full sm:w-1/2">
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
                    <div className="w-full sm:w-1/2">
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
                  <div className="flex flex-col mt-4 sm:mt-0 sm:flex-row gap-4 w-full">
                    <div className="w-full sm:w-1/2">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Phone Number*
                      </Text>
                      <Input
                        placeholder="##########"
                        value={emergencyPhone}
                        onChange={(e) =>
                          setEmergencyPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 10)
                          )
                        }
                        maxLength={10}
                      />
                    </div>
                    <div className="w-full">
                      <Text
                        textType="paragraph-sm"
                        textFont="rubik"
                        textColor="primary"
                        className="ml-[10px]"
                      >
                        Relationship to Emergency Contact*
                      </Text>
                      <Dropdown
                        placeholder="Select Relationship"
                        options={enums?.emergencyContactRelationship || []}
                        value={emergencyRelationship}
                        onChange={(value) => setEmergencyRelationship(value)}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col-reverse sm:flex-row justify-center sm:justify-end w-full gap-3">
              <Button
                variant="back"
                onClick={() => {
                  if (page > 1) {
                    setSearchParams({ page: `${page - 1}` });
                  } else {
                    navigate("/apply/player?page=2");
                  }
                }}
                className="w-full sm:w-auto"
              />
              <Button
                disabled={
                  (page == 1 && (!firstName || !lastName)) ||
                  (page == 2 && (!email || !emailPermission)) ||
                  (page == 3 && (!city || !province || !country)) ||
                  (page == 4 &&
                    (!emergencyFirstName ||
                      !emergencyLastName ||
                      !emergencyPhone ||
                      !emergencyRelationship))
                }
                onClick={() => {
                  if (page < 4) {
                    setSearchParams({ page: `${page + 1}` });
                  } else {
                    const updateCompleted = completedSection.map((val, i) =>
                      i === 0 ? true : val
                    );
                    setCompletedSection(updateCompleted);
                    navigate("/apply/experience?page=1");
                  }
                }}
                variant="next"
                className="w-full sm:w-auto"
              />
            </div>

            <div className="flex z-10 justify-end w-full">
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
        className="absolute h-[140px] sm:bottom-[85px] sm:right-[200px] right-[100px] bottom-[35px]"
      />

      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px]"
      />
    </div>
  );
}
