import heart from "../assets/heart.svg";
import Text from "../components/Text/Text";
import grassSVG from "../assets/grass.svg";
import appleSVG from "../assets/apple.svg";
import tree1SVG from "../assets/tree1.svg";
import tree2SVG from "../assets/tree2.svg";
import signSVG from "../assets/sign.svg";
import shrubSVG from "../assets/shrub.svg";
import shrub2SVG from "../assets/shrub2.svg";
import cloudSVG from "../assets/cloudsLaptop.svg";
import cloudPhoneSVG from "../assets/cloudsPhone.svg";
import checkCircle from "../assets/check_circle.svg";
import { PLAYER_IMAGES } from "../constants/images";
import { useApplicationContext } from "../contexts/ApplicationContext";
import ReviewField from "../components/ReviewField/ReviewField";
import Button from "../components/Button/Button";
import { fetchHt6 } from "../api/client";
import { type ApiResponse } from "../api/client";
import { type IApplication } from "../types/application";

import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Application {
  firstName: string;
  lastName: string;
  email: string;
  hackerApplication: IApplication;
}

export default function Submitted() {
  const location = useLocation();
  const { selectedSkin, selectedItem } = useApplicationContext();
  const { setProfile } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [application, setApplication] = useState<Application | null>(null);
  const GRASSCOUNT = 40;

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (location.state?.application) {
          setApplication(location.state.application);
        } else {
          const user = await fetchHt6<ApiResponse<Application>>(
            "/api/action/profile"
          );
          if (user.message) {
            setApplication(user.message);
          }
        }
      } catch (error) {
        console.error("Failed to fetch application:", error);
      }
    };
    fetchApplication();
  }, [location.state]);

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full flex flex-col justify-center items-center text-center">
      <div className="overflow-hidden absolute bottom-0 left-[60%] sm:flex hidden">
        {Array.from({ length: 3 }).map((_, index) => (
          <img
            key={index}
            src={grassSVG}
            alt="Grass"
            className="sm:h-[118px] sm:w-[77px] h-[46px] mb-[77px] w-[30px]"
          />
        ))}
      </div>
      <img
        src={cloudSVG}
        alt="Cloud"
        className="absolute w-full top-0 left-0 hidden sm:block"
      />

      <img
        src={cloudPhoneSVG}
        alt="Cloud"
        className="absolute w-full top-[80px] left-0 sm:hidden block"
      />

      <div className="overflow-hidden absolute bottom-0 left-0 w-full flex justify-between items-end">
        {Array.from({ length: GRASSCOUNT }).map((_, index) => (
          <img
            key={index}
            src={grassSVG}
            alt="Grass"
            className="sm:h-[118px] sm:w-[78px] h-[46px] w-[30px]"
          />
        ))}
      </div>

      <img
        src={appleSVG}
        alt="Apple"
        className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[170px] left-[calc(60%+20px)] w-[35px] h-[35px] bottom-[42px]"
      />

      <div className="w-full overflow-hidden absolute top-0 left-0 h-full sm:flex hidden">
        <img
          src={signSVG}
          alt="Sign"
          className="absolute h-[96px] w-[100px] bottom-[170px] left-[calc(60%+130px)]"
        />

        <img
          src={shrubSVG}
          alt="Shrub"
          className="absolute h-[90px] w-[130px] bottom-[90px] left-[calc(60%+200px)]"
        />

        <img
          src={shrub2SVG}
          alt="Two Shrubs"
          className="absolute h-[90px] w-[200px] bottom-[90px] left-[calc(60%-150px)]"
        />
        <img
          src={shrubSVG}
          alt="Shrub"
          className="absolute h-[90px] w-[130px] bottom-[90px] right-[-30px]"
        />

        <img
          src={tree1SVG}
          alt="Pine tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] left-[-30px]"
        />

        <img
          src={shrub2SVG}
          alt="Two Shrubs"
          className="absolute h-[90px] w-[200px] bottom-[90px] left-[10%]"
        />

        <img
          src={tree2SVG}
          alt="Tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] right-[20px]"
        />

        <img
          src={tree2SVG}
          alt="Tree"
          className="absolute h-[300px] w-[300px] bottom-[80px] left-[calc(10%+130px)]"
        />
      </div>
      <div className="flex flex-col items-center justify-center z-10 w-full max-w-[850px] mx-auto px-4">
        <img src={heart} alt="Heart" className="w-16 mb-8" />

        <Text
          textType="heading-lg"
          textFont="rubik"
          textColor="primary"
          className="z-[100] text-center"
        >
          Thanks for applying!
        </Text>
        <Text
          textType="heading-md"
          textWeight="regular"
          textFont="rubik"
          textColor="secondary"
          className="text-center mt-4"
        >
          Application submitted successfully
        </Text>
        <div className="flex flex-col md:flex-row gap-4 mt-8">
          <button
            className="hover:bg-[#20b7ac] relative sm:w-[180px] w-full bg-[#00887E] border-black sm:border-[5px] border-[3px] sm:h-[80px] h-[50px] flex justify-center items-center transition-colors cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            <Text
              textType="heading-sm"
              textWeight="regular"
              textFont="rubik"
              textColor="white"
            >
              Review application
            </Text>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] left-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] right-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] left-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] right-[-6px]"></div>
          </button>
          <button
            className="hover:bg-red-400 relative sm:w-[180px] w-full bg-red-300 border-black sm:border-[5px] border-[3px] sm:h-[80px] h-[50px] flex justify-center items-center transition-colors cursor-pointer"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("refreshToken");
              setProfile(null);
              window.location.href = "/";
            }}
          >
            <Text
              textType="heading-sm"
              textWeight="regular"
              textFont="rubik"
              textColor="black"
            >
              Log out
            </Text>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] left-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] top-[-6px] right-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] left-[-6px]"></div>
            <div className="absolute w-[6px] h-[6px] bg-[#B9F2FC] bottom-[-6px] right-[-6px]"></div>
          </button>
        </div>
      </div>

      {showModal && application && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-[#E6EFF3]/80 backdrop-blur-lg rounded-2xl p-2 md:p-8 shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-2 md:px-8">
              <div className="flex justify-between items-center">
                <Text
                  textType="heading-lg"
                  textFont="rubik"
                  textColor="primary"
                  className="mb-6 pt-6"
                >
                  Your Application
                </Text>
                <img
                  src={PLAYER_IMAGES[selectedSkin][selectedItem]}
                  alt="Player"
                  className="h-[100px]"
                />
              </div>

              <div className="max-h-[35vh] overflow-y-auto space-y-6">
                <div className="space-y-7">
                  <div className="flex items-center gap-2">
                    <Text
                      textType="heading-sm"
                      textFont="rubik"
                      textColor="primary"
                    >
                      About You
                    </Text>
                    <img src={checkCircle} alt="Complete" className="w-3 h-3" />
                  </div>
                  <div className="rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                      <ReviewField
                        label="Location"
                        value={`${application.hackerApplication.city}, ${application.hackerApplication.province}, ${application.hackerApplication.country}`}
                      />
                      <ReviewField
                        label="Emergency Contact"
                        value={`${application.hackerApplication.emergencyContact.firstName} ${application.hackerApplication.emergencyContact.lastName}, ${application.hackerApplication.emergencyContact.phoneNumber}`}
                      />
                      <ReviewField
                        label="Emergency Contact Relationship"
                        value={
                          application.hackerApplication.emergencyContact
                            .relationship
                        }
                      />
                      <ReviewField
                        label="Full Name"
                        value={`${application.firstName} ${application.lastName}`}
                      />
                      <ReviewField label="Email" value={application.email} />
                    </div>
                  </div>
                </div>

                <div className="space-y-7">
                  <div className="flex items-center gap-2">
                    <Text
                      textType="heading-sm"
                      textFont="rubik"
                      textColor="primary"
                    >
                      Your Experience
                    </Text>
                    <img src={checkCircle} alt="Complete" className="w-3 h-3" />
                  </div>
                  <div className="rounded-md">
                    <div className="grid grid-cols-2 gap-y-4">
                      <ReviewField
                        label="School"
                        value={application.hackerApplication.school}
                      />
                      <ReviewField
                        label="Program and Year"
                        value={`${application.hackerApplication.program} - ${application.hackerApplication.levelOfStudy}`}
                      />
                      <ReviewField
                        label="Hackathon Experience"
                        value={application.hackerApplication.hackathonsAttended}
                      />
                      <ReviewField
                        label="Links"
                        value={
                          application.hackerApplication.githubLink ||
                          application.hackerApplication.linkedinLink ||
                          application.hackerApplication.portfolioLink
                            ? "filled"
                            : null
                        }
                        renderValue={() => (
                          <div className="space-y-1 flex flex-col">
                            {application.hackerApplication.githubLink && (
                              <Text
                                textType="paragraph-lg-semibold"
                                textFont="rubik"
                                textColor="primary"
                              >
                                GitHub:{" "}
                                {application.hackerApplication.githubLink}
                              </Text>
                            )}
                            {application.hackerApplication.linkedinLink && (
                              <Text
                                textType="paragraph-lg-semibold"
                                textFont="rubik"
                                textColor="primary"
                              >
                                LinkedIn:{" "}
                                {application.hackerApplication.linkedinLink}
                              </Text>
                            )}
                            {application.hackerApplication.portfolioLink && (
                              <Text
                                textType="paragraph-lg-semibold"
                                textFont="rubik"
                                textColor="primary"
                              >
                                Portfolio:{" "}
                                {application.hackerApplication.portfolioLink}
                              </Text>
                            )}
                          </div>
                        )}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-7">
                  <div className="flex items-center gap-2">
                    <Text
                      textType="heading-sm"
                      textFont="rubik"
                      textColor="primary"
                    >
                      Long Answer Responses
                    </Text>
                    <img src={checkCircle} alt="Complete" className="w-3 h-3" />
                  </div>
                  <div className="rounded-md space-y-4">
                    <ReviewField
                      label="Tell us about a project you’ve enjoyed working on (this can be
              non-technical!). What made you decide to work on this project?
              What challenges did you face and how did you overcome them?"
                      value={
                        application.hackerApplication.creativeResponseEssay
                      }
                    />
                    <ReviewField
                      label="If you could not do anything related to school, work, or coding
              for 4 months, what would you do and why?"
                      value={application.hackerApplication.whyHT6Essay}
                    />
                    <ReviewField
                      label="You are given an elephant. You cannot sell or give away the
              elephant. What do you do with the elephant?"
                      value={application.hackerApplication.oneSentenceEssay}
                    />
                  </div>
                </div>

                <div className="space-y-7">
                  <div className="flex items-center gap-2">
                    <Text
                      textType="heading-sm"
                      textFont="rubik"
                      textColor="primary"
                    >
                      Survey
                    </Text>
                    <img src={checkCircle} alt="Complete" className="w-3 h-3" />
                  </div>
                  <div className="rounded-md">
                    <div className="grid grid-cols-2 gap-y-4">
                      <ReviewField
                        label="T-shirt Size"
                        value={application.hackerApplication.shirtSize}
                      />
                      <ReviewField
                        label="Dietary Restrictions"
                        value={
                          application.hackerApplication.dietaryRestrictions
                        }
                      />
                      <ReviewField
                        label="Gender and Background"
                        value={`${application.hackerApplication.gender}, ${application.hackerApplication.ethnicity}`}
                      />
                      <ReviewField
                        label="How did you hear about us?"
                        value={application.hackerApplication.howDidYouHearAboutHT6?.join(
                          ", "
                        )}
                      />
                      <ReviewField
                        label="MLH Consent"
                        value={
                          application.hackerApplication.mlhCOC ? "Yes" : "No"
                        }
                      />
                      <ReviewField
                        label="MLH Data Consent"
                        value={
                          application.hackerApplication.mlhData ? "Yes" : "No"
                        }
                      />
                      <ReviewField
                        label="MLH Email Consent"
                        value={
                          application.hackerApplication.mlhEmail ? "Yes" : "No"
                        }
                      />
                      <ReviewField
                        label="Email Consent"
                        value={
                          application.hackerApplication.emailConsent
                            ? "Yes"
                            : "No"
                        }
                      />
                      <ReviewField
                        label="Resume Share Permission"
                        value={
                          application.hackerApplication.resumeSharePermission
                            ? "Yes"
                            : "No"
                        }
                      />
                      <ReviewField
                        label="Previous Hack the 6ix Experience"
                        value={application.hackerApplication.previousHT6Experience?.join(
                          ", "
                        )}
                      />
                      <ReviewField
                        label="Workshop Preferences"
                        value={application.hackerApplication.requestedWorkshops?.join(
                          ", "
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <Button
                  variant="primary"
                  onClick={() => setShowModal(false)}
                  className="bg-[#008F81]  text-white"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
