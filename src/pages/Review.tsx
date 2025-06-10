import { PLAYER_IMAGES } from "../constants/images";
import apple from "../assets/apple.svg";
import brickhouse from "../assets/brickhouse_review.svg";
import bush from "../assets/bush.svg";
import checkCircle from "../assets/check_circle.svg";
import exclamation from "../assets/Exclamation.svg";
import { type IPartialApplication } from "../types/application";
import { fetchHt6 } from "../api/client";
import { type ApiResponse } from "../api/client";

import Text from "../components/Text/Text";
import { useState } from "react";
import { useApplicationContext } from "../contexts/ApplicationContext";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

interface UserResponse {
  computedApplicationOpen: number;
  computedApplicationDeadline: number;
  hackerApplication?: {
    resumeFileName?: string;
  };
}

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

export default function Review() {
  const navigate = useNavigate();
  const { formData, selectedSkin, selectedItem } = useApplicationContext();
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const isFormComplete = () => {
    return (
      formData?.fullName &&
      formData?.email &&
      formData?.city &&
      formData?.province &&
      formData?.country &&
      formData?.emergencyFirstName &&
      formData?.emergencyLastName &&
      formData?.emergencyPhone &&
      formData?.emergencyRelationship &&
      formData?.school &&
      formData?.year &&
      formData?.program &&
      formData?.hackathonCount &&
      formData?.resume &&
      formData?.accomplish &&
      formData?.project &&
      formData?.funFact &&
      formData?.tshirtSize &&
      formData?.gender &&
      formData?.ethnicity
    );
  };

  const handleSubmit = async () => {
    const missing: string[] = [];
    if (missing.length > 0) {
      setMissingFields(missing);
      setShowSubmitModal(false);
      return;
    }

    try {
      const application: IPartialApplication = {
        phoneNumber: formData.emergencyPhone || "1234567890",
        age: 20,
        gender: formData.gender || "Prefer not to say",
        ethnicity: formData.ethnicity || "Prefer not to answer",
        school: formData.school || "University of Toronto",
        program: formData.program || "Computer Science",
        levelOfStudy: "Undergraduate Year 1",
        graduationYear: 2025,
        hackathonsAttended: "None",
        creativeResponseEssay:
          formData.accomplish ||
          "I want to learn and build something cool at Hack the 6ix. I am excited to work with new technologies and meet other passionate developers. I hope to create something innovative and meaningful during the hackathon. I want to learn and build something cool at Hack the 6ix. I am excited to work with new technologies and meet other passionate developers. I hope to create something innovative and meaningful during the hackathon. I want to learn and build something cool at Hack the 6ix. I am excited to work with new technologies and meet other passionate developers. I hope to create something innovative and meaningful during the hackathon.",
        whyHT6Essay:
          formData.project ||
          "I recently built a web application using React and Node.js. I implemented user authentication, real-time updates, and a responsive design. The project helped me learn about full-stack development and working with APIs. I recently built a web application using React and Node.js. I implemented user authentication, real-time updates, and a responsive design. The project helped me learn about full-stack development and working with APIs. I recently built a web application using React and Node.js. I implemented user authentication, real-time updates, and a responsive design. The project helped me learn about full-stack development and working with APIs.",
        mlhCOC: formData.permission1 || true,
        mlhData: formData.permission2 || true,
        mlhEmail: formData.emailPermission || true,
        shirtSize: formData.tshirtSize || "M",
        city: formData.city || "Toronto",
        province: formData.province || "Ontario",
        country: formData.country || "Canada",
        emergencyContact: {
          firstName: formData.emergencyFirstName || "Emergency",
          lastName: formData.emergencyLastName || "Contact",
          phoneNumber: formData.emergencyPhone || "1234567890",
          relationship: formData.emergencyRelationship || "Other"
        },
        githubLink: formData.github || "https://github.com",
        linkedinLink: formData.linkedin || "https://linkedin.com",
        portfolioLink: formData.portfolio || "https://portfolio.com",
        dietaryRestrictions: "Vegetarian",
        emailConsent: formData.emailPermission || true,
        resumeSharePermission: true
      };

      const user = await fetchHt6<ApiResponse<UserResponse>>(
        "/api/action/profile"
      );

      if (!user.message.hackerApplication?.resumeFileName) {
        throw new Error(
          "Please upload your resume before submitting your application"
        );
      }

      await fetchHt6<
        ApiResponse<{ status: 200; message: "Success" }>,
        { submit: boolean; application: IPartialApplication }
      >("/api/action/updateapp", {
        body: { submit: true, application },
        method: "POST"
      });
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 403
      ) {
        const fields =
          (error as { message?: { fields?: string[] } }).message?.fields || [];
        setMissingFields(fields);
        setShowSubmitModal(false);
      }
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-[linear-gradient(to_bottom,_#B1E1F9,_#E5DCD9,_#FCD2B3,_#F5AB42)] min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-[1000px] bg-[#E6EFF3]/80 rounded-2xl p-8 shadow-lg mt-32 mb-16 z-10">
        <div className="px-8">
          <Text
            textType="heading-lg"
            textFont="rubik"
            textColor="primary"
            className="mb-6 pt-6"
          >
            Review your application
          </Text>

          {missingFields.length > 0 && (
            <div className="mb-6 p-4 bg-red-100/80 rounded-lg">
              <Text
                textType="paragraph-lg"
                textFont="rubik"
                textColor="primary"
                className="font-bold mb-2"
              >
                Please complete the following fields:
              </Text>
              <ul className="list-disc pl-6">
                {missingFields.map((field) => (
                  <li key={field}>
                    <Text
                      textType="paragraph-lg"
                      textFont="rubik"
                      textColor="primary"
                    >
                      {field.replace(/^\//, "").replace(/\//g, " > ")}
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-2 mb-6">
            {isFormComplete() ? (
              <div className="flex items-center gap-2 bg-green-100/80 px-4 py-2 rounded-[90px] border border-[#007A46]">
                <img src={checkCircle} alt="Check" className="w-5 h-5" />
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="green"
                  className="font-medium text-[#007A46]"
                >
                  Ready to submit
                </Text>
              </div>
            ) : (
              <div className="flex items-center gap-2 bg-orange-100/80 px-4 py-2 rounded-[90px] border border-[#F58120]">
                <img src={exclamation} alt="Exclamation" className="w-5 h-5" />
                <Text
                  textType="paragraph-sm"
                  textFont="rubik"
                  textColor="orange"
                  className="font-medium text-[#F58120]"
                >
                  Incomplete application
                </Text>
              </div>
            )}
          </div>
        </div>

        <div className="max-h-[35vh] overflow-y-auto px-8 space-y-6">
          {/* About You Section */}
          <div className="space-y-7">
            <div className="flex items-center gap-2">
              <Text textType="heading-sm" textFont="rubik" textColor="primary">
                About You
              </Text>
              {formData?.fullName &&
              formData?.email &&
              formData?.city &&
              formData?.province &&
              formData?.country &&
              formData?.emergencyFirstName &&
              formData?.emergencyLastName &&
              formData?.emergencyPhone ? (
                <img src={checkCircle} alt="Complete" className="w-3 h-3" />
              ) : (
                <img src={exclamation} alt="Incomplete" className="w-3 h-3" />
              )}
            </div>
            <div className="rounded-md">
              <div className="grid grid-cols-2 gap-y-4">
                {/* Full Name */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Full Name
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.fullName ? "primary" : "gray"}
                  >
                    {formData?.fullName || "Not filled"}
                  </Text>
                </div>

                {/* Location */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Location
                  </Text>
                  {formData?.city && formData?.province && formData?.country ? (
                    <>
                      <Text
                        textType="paragraph-lg-semibold"
                        textFont="rubik"
                        textColor="primary"
                      >
                        {`${formData.city}, ${formData.province}`}
                      </Text>
                      <Text
                        textType="paragraph-lg-semibold"
                        textFont="rubik"
                        textColor="primary"
                      >
                        {formData.country}
                      </Text>
                    </>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Email
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.email ? "primary" : "gray"}
                  >
                    {formData?.email || "Not filled"}
                  </Text>
                </div>

                {/* Emergency Contact */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Emergency Contact
                  </Text>
                  {formData?.emergencyFirstName &&
                  formData?.emergencyLastName &&
                  formData?.emergencyPhone ? (
                    <>
                      <Text
                        textType="paragraph-lg-semibold"
                        textFont="rubik"
                        textColor="primary"
                      >
                        {`${formData.emergencyFirstName} ${formData.emergencyLastName}`}
                      </Text>
                      <Text
                        textType="paragraph-lg-semibold"
                        textFont="rubik"
                        textColor="primary"
                      >
                        {formData.emergencyPhone}
                      </Text>
                    </>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Experience Information */}
          <div className="space-y-7">
            <div className="flex items-center gap-2">
              <Text textType="heading-sm" textFont="rubik" textColor="primary">
                Your Experience
              </Text>
              {formData?.school &&
              formData?.resume &&
              formData?.program &&
              formData?.year &&
              formData?.hackathonCount ? (
                <img src={checkCircle} alt="Complete" className="w-3 h-3" />
              ) : (
                <img src={exclamation} alt="Incomplete" className="w-3 h-3" />
              )}
            </div>
            <div className="rounded-md">
              <div className="grid grid-cols-2 gap-y-4">
                {/* School */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    School (Most Recently Attended)
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.school ? "primary" : "gray"}
                  >
                    {formData?.school || "Not filled"}
                  </Text>
                </div>

                {/* Resume */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Resume Uploaded*
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.resume ? "primary" : "gray"}
                  >
                    {formData?.resume ? "Resume uploaded" : "Not filled"}
                  </Text>
                </div>

                {/* Program and Year */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Program and Year of Study
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={
                      formData?.program && formData?.year ? "primary" : "gray"
                    }
                  >
                    {formData?.program && formData?.year
                      ? `${formData.program} - Year ${formData.year}`
                      : "Not filled"}
                  </Text>
                </div>

                {/* Social Links */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Links to Socials
                  </Text>
                  {formData?.github ||
                  formData?.linkedin ||
                  formData?.portfolio ? (
                    <div className="space-y-1">
                      {formData?.github && (
                        <Text
                          textType="paragraph-lg-semibold"
                          textFont="rubik"
                          textColor="primary"
                        >
                          GitHub: {formData.github}
                        </Text>
                      )}
                      {formData?.linkedin && (
                        <Text
                          textType="paragraph-lg-semibold"
                          textFont="rubik"
                          textColor="primary"
                        >
                          LinkedIn: {formData.linkedin}
                        </Text>
                      )}
                      {formData?.portfolio && (
                        <Text
                          textType="paragraph-lg-semibold"
                          textFont="rubik"
                          textColor="primary"
                        >
                          Portfolio: {formData.portfolio}
                        </Text>
                      )}
                    </div>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>

                {/* Hackathon Experience */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Number of Previous Hackathons Attended*
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.hackathonCount ? "primary" : "gray"}
                  >
                    {formData?.hackathonCount || "Not filled"}
                  </Text>
                </div>
              </div>
            </div>
          </div>

          {/* Long Answer Responses */}
          <div className="space-y-7">
            <div className="flex items-center gap-2">
              <Text textType="heading-sm" textFont="rubik" textColor="primary">
                Long Answer Responses
              </Text>
              {formData?.accomplish &&
              formData?.project &&
              formData?.funFact ? (
                <img src={checkCircle} alt="Complete" className="w-3 h-3" />
              ) : (
                <img src={exclamation} alt="Incomplete" className="w-3 h-3" />
              )}
            </div>
            <div className="rounded-md space-y-4">
              <div className="flex flex-col gap-1.5">
                <Text
                  textType="paragraph-sm-semibold"
                  textFont="rubik"
                  textColor="primary"
                >
                  What would you like to accomplish at Hack the 6ix?
                </Text>
                <Text
                  textType="paragraph-lg-semibold"
                  textFont="rubik"
                  textColor={formData?.accomplish ? "primary" : "gray"}
                  className="whitespace-pre-wrap"
                >
                  {formData?.accomplish || "Not filled"}
                </Text>
              </div>
              <div className="flex flex-col gap-1.5">
                <Text
                  textType="paragraph-sm-semibold"
                  textFont="rubik"
                  textColor="primary"
                >
                  What is one project you were proud of? What tools and methods
                  did you use to complete it?
                </Text>
                <Text
                  textType="paragraph-lg-semibold"
                  textFont="rubik"
                  textColor={formData?.project ? "primary" : "gray"}
                  className="whitespace-pre-wrap"
                >
                  {formData?.project || "Not filled"}
                </Text>
              </div>
              <div className="flex flex-col gap-1.5">
                <Text
                  textType="paragraph-sm-semibold"
                  textFont="rubik"
                  textColor="primary"
                >
                  Fun Fact
                </Text>
                <Text
                  textType="paragraph-lg-semibold"
                  textFont="rubik"
                  textColor={formData?.funFact ? "primary" : "gray"}
                >
                  {formData?.funFact || "Not filled"}
                </Text>
              </div>
            </div>
          </div>

          {/* Survey Information */}
          <div className="space-y-7">
            <div className="flex items-center gap-2">
              <Text textType="heading-sm" textFont="rubik" textColor="primary">
                Survey
              </Text>
              {formData?.selectedWorkshops &&
              formData.selectedWorkshops.length > 0 &&
              formData?.tshirtSize &&
              (formData?.gender || formData?.ethnicity) ? (
                <img src={checkCircle} alt="Complete" className="w-3 h-3" />
              ) : (
                <img src={exclamation} alt="Incomplete" className="w-3 h-3" />
              )}
            </div>
            <div className="rounded-md">
              <div className="grid grid-cols-2 gap-y-4">
                {/* Workshops */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    3 Workshops You Are Interested In
                  </Text>
                  {formData?.selectedWorkshops &&
                  formData.selectedWorkshops.length > 0 ? (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="primary"
                    >
                      {formData.selectedWorkshops
                        .slice(0, 3)
                        .map(
                          (workshop) =>
                            WORKSHOPS.find((w) => w.value === workshop)
                              ?.label || workshop
                        )
                        .join(", ")}
                    </Text>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>

                {/* Dietary Restrictions */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Dietary Restrictions
                  </Text>
                  {formData?.dietaryRestrictions || formData?.allergies ? (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="primary"
                    >
                      {[formData?.dietaryRestrictions, formData?.allergies]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>

                {/* T-shirt Size */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    T-shirt Size
                  </Text>
                  <Text
                    textType="paragraph-lg-semibold"
                    textFont="rubik"
                    textColor={formData?.tshirtSize ? "primary" : "gray"}
                  >
                    {formData?.tshirtSize
                      ? TSHIRT_SIZES.find(
                          (s) => s.value === formData.tshirtSize
                        )?.label
                      : "Not filled"}
                  </Text>
                </div>

                {/* Gender and Background */}
                <div className="flex flex-col gap-1.5">
                  <Text
                    textType="paragraph-sm-semibold"
                    textFont="rubik"
                    textColor="primary"
                  >
                    Gender and Background
                  </Text>
                  {formData?.gender || formData?.ethnicity ? (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="primary"
                    >
                      {[formData?.gender, formData?.ethnicity]
                        .filter(Boolean)
                        .join(", ")}
                    </Text>
                  ) : (
                    <Text
                      textType="paragraph-lg-semibold"
                      textFont="rubik"
                      textColor="gray"
                    >
                      Not filled
                    </Text>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`${
            showSubmitModal
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } fixed inset-0 flex items-center justify-center bg-black/50 z-50`}
        >
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
            <Text
              textType="heading-lg"
              textFont="rubik"
              textColor="primary"
              className="mb-4 text-[#F5AB42]"
            >
              Submit Application?
            </Text>
            <Text
              textType="paragraph-lg"
              textFont="rubik"
              textColor="primary"
              className="mb-4"
            >
              Once you submit this application, you{" "}
              <span className="text-[#F5AB42] font-bold">
                cannot make any changes
              </span>
              .
            </Text>
            <Text
              textType="paragraph-lg"
              textFont="rubik"
              textColor="primary"
              className="mb-8"
            >
              Please review your answers to ensure they are accurate.
            </Text>
            <div className="flex justify-center gap-4">
              <Button
                variant="secondary"
                onClick={() => setShowSubmitModal(false)}
                className="border-[#008F81] text-[#008F81]"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => handleSubmit()}
                className="bg-[#008F81] text-white"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>

        <div
          className={`flex justify-end gap-4 mt-6 transition-opacity duration-300 z-20`}
        >
          <Button variant="back" onClick={() => navigate("/apply/survey")}>
            Back
          </Button>
          <Button onClick={() => setShowSubmitModal(true)}>Submit</Button>
        </div>
      </div>

      <img
        src={PLAYER_IMAGES[selectedSkin][selectedItem]}
        alt="Player"
        className=" absolute sm:h-[140px] h-[70px] sm:bottom-[100px] sm:right-[200px] right-[100px] bottom-[35px]"
      />
      <img
        src={apple}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px]  animate-bounce-custom"
      />
      <img
        src={bush}
        alt="Brush"
        className="sm:block hidden absolute sm:bottom-[90px] sm:right-[350px] right-[270px] bottom-[38px]"
      />

      <img
        src={bush}
        alt="Brush"
        className="sm:block hidden absolute right-[350px] bottom-[90px]"
      />
      <img
        src={bush}
        alt="Brush"
        className="sm:block hidden absolute left-[10px] bottom-[100px]"
      />
      <img
        src={brickhouse}
        alt="Brush"
        className="sm:block hidden absolute left-[0px] bottom-[100px]"
      />
    </div>
  );
}
