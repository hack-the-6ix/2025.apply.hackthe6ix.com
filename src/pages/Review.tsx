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
import ReviewField from "../components/ReviewField/ReviewField";

interface UserResponse {
  computedApplicationOpen: number;
  computedApplicationDeadline: number;
  hackerApplication?: {
    resumeFileName?: string;
  };
}

export default function Review() {
  const navigate = useNavigate();
  const { formData, selectedSkin, selectedItem } = useApplicationContext();
  const [missingFields, setMissingFields] = useState<string[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [modalContentType, setModalContentType] = useState<
    | "confirmSubmit"
    | "missingFields"
    | "resumeMissing"
    | "submissionFailed"
    | "alreadyApplied"
    | "fieldErrors"
    | null
  >(null);

  const getMissingFields = () => {
    const missing: string[] = [];
    if (!formData?.firstName) missing.push("First Name");
    if (!formData?.lastName) missing.push("Last Name");
    if (!formData?.email) missing.push("Email");
    if (!formData?.city) missing.push("City");
    if (!formData?.province) missing.push("Province");
    if (!formData?.country) missing.push("Country");
    if (!formData?.emergencyFirstName)
      missing.push("Emergency Contact First Name");
    if (!formData?.emergencyLastName)
      missing.push("Emergency Contact Last Name");
    if (!formData?.emergencyPhone) missing.push("Emergency Contact Phone");
    if (!formData?.emergencyRelationship)
      missing.push("Emergency Contact Relationship");
    if (!formData?.school) missing.push("School");
    if (!formData?.year) missing.push("Year of Study");
    if (!formData?.program) missing.push("Program");
    if (!formData?.hackathonCount) missing.push("Hackathon Count");
    if (!formData?.resume) missing.push("Resume");
    if (!formData?.accomplish)
      missing.push("What would you like to accomplish at Hack the 6ix?");
    if (!formData?.project) missing.push("One project you were proud of");
    if (!formData?.funFact) missing.push("Fun Fact");
    if (!formData?.tshirtSize) missing.push("T-shirt Size");
    if (!formData?.gender) missing.push("Gender");
    if (!formData?.ethnicity) missing.push("Ethnicity");
    if (!formData?.howDidYouHearAboutHT6)
      missing.push("How did you hear about us?");
    return missing;
  };

  const isFormComplete = () => {
    return (
      formData?.firstName &&
      formData?.lastName &&
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
      formData?.ethnicity &&
      formData?.howDidYouHearAboutHT6
    );
  };

  const handleSubmit = async () => {
    setShowModal(false);
    setIsSubmitting(true);
    const currentMissing = getMissingFields();
    if (currentMissing.length > 0) {
      setMissingFields(currentMissing);
      setModalContentType("missingFields");
      setShowModal(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const application: IPartialApplication = {
        phoneNumber: formData.emergencyPhone,
        age: 20,
        gender: formData.gender,
        ethnicity: formData.ethnicity,
        school: formData.school,
        program: formData.program,
        levelOfStudy: "Undergraduate Year 1",
        graduationYear: 2025,
        hackathonsAttended: "None",
        creativeResponseEssay: formData.accomplish,
        whyHT6Essay: formData.project,
        oneSentenceEssay: formData.funFact,
        mlhCOC: formData.permission1,
        mlhData: formData.permission2,
        mlhEmail: formData.emailPermission,
        shirtSize: formData.tshirtSize,
        city: formData.city,
        province: formData.province,
        country: formData.country,
        emergencyContact: {
          firstName: formData.emergencyFirstName || "",
          lastName: formData.emergencyLastName || "",
          phoneNumber: formData.emergencyPhone || "",
          relationship: formData.emergencyRelationship || ""
        },
        githubLink: formData.github,
        linkedinLink: formData.linkedin,
        portfolioLink: formData.portfolio,
        dietaryRestrictions:
          formData.dietaryRestrictions === "None"
            ? ""
            : formData.dietaryRestrictions,
        emailConsent: formData.emailPermission,
        resumeSharePermission: true,
        howDidYouHearAboutHT6: formData.howDidYouHearAboutHT6,
        previousHT6Experience: formData.previousHT6Experience,
        avatarBase: selectedSkin,
        avatarItem: selectedItem
      };

      const user = await fetchHt6<ApiResponse<UserResponse>>(
        "/api/action/profile"
      );

      if (!user.message.hackerApplication?.resumeFileName) {
        setModalContentType("resumeMissing");
        setShowModal(true);
        return;
      }

      await fetchHt6<
        ApiResponse<{ status: 200; message: "Success" }>,
        { submit: boolean; application: IPartialApplication }
      >("/api/action/updateapp", {
        body: { submit: true, application },
        method: "POST"
      });

      const updatedProfile = await fetchHt6<ApiResponse<UserResponse>>(
        "/api/action/profile"
      );

      navigate("/submitted", {
        state: { application: updatedProfile.message.hackerApplication }
      });
    } catch (error: unknown) {
      if (
        error &&
        typeof error === "object" &&
        "status" in error &&
        error.status === 403
      ) {
        const errorMessage = (error as { message?: string }).message;
        if (errorMessage === "You have already applied!") {
          setModalContentType("alreadyApplied");
        } else {
          const fieldErrors =
            (error as { error?: string[][] }).error?.map(
              ([field, message]) => ({
                field: field.replace("/", ""),
                message
              })
            ) || [];
          setMissingFields(fieldErrors.map((err) => err.message));
          setModalContentType("fieldErrors");
        }
        setShowModal(true);
      } else {
        setModalContentType("submissionFailed");
        setShowModal(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden bg-[linear-gradient(to_bottom,_#B1E1F9,_#E5DCD9,_#FCD2B3,_#F5AB42)] min-h-screen w-full flex flex-col items-center px-4">
      <div className="w-full max-w-[1000px] bg-[#E6EFF3]/80 rounded-2xl shadow-lg mt-32 mb-16 z-10 p-4 md:p-8">
        <div>
          <div className="flex justify-between items-center">
            <Text
              textType="heading-lg"
              textFont="rubik"
              textColor="primary"
              className="mb-6 pt-6"
            >
              Review your application
            </Text>
            <img
              src={PLAYER_IMAGES[selectedSkin][selectedItem]}
              alt="Player"
              className="h-[100px] "
            />
          </div>

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

          <div className="max-h-[35vh] overflow-y-auto space-y-6">
            {/* About You Section */}
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <Text
                  textType="heading-sm"
                  textFont="rubik"
                  textColor="primary"
                >
                  About You
                </Text>
                {formData?.firstName &&
                formData?.lastName &&
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  <ReviewField
                    label="Full Name"
                    value={
                      formData?.firstName && formData?.lastName
                        ? `${formData.firstName} ${formData.lastName}`
                        : null
                    }
                  />
                  <ReviewField
                    label="Location"
                    value={
                      formData?.city && formData?.province && formData?.country
                        ? `${formData.city}, ${formData.province}, ${formData.country}`
                        : null
                    }
                  />
                  <ReviewField label="Email" value={formData?.email} />
                  <ReviewField
                    label="Emergency Contact"
                    value={
                      formData?.emergencyFirstName &&
                      formData?.emergencyLastName &&
                      formData?.emergencyPhone
                        ? `${formData.emergencyFirstName} ${formData.emergencyLastName}, ${formData.emergencyPhone}`
                        : null
                    }
                  />
                </div>
              </div>
            </div>

            {/* Experience Information */}
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <Text
                  textType="heading-sm"
                  textFont="rubik"
                  textColor="primary"
                >
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  <ReviewField
                    label="School (Most Recently Attended)"
                    value={formData?.school}
                  />
                  <ReviewField
                    label="Resume Uploaded*"
                    value={formData?.resume ? "Resume uploaded" : null}
                  />
                  <ReviewField
                    label="Program and Year of Study"
                    value={
                      formData?.program && formData?.year
                        ? `${formData.program} - ${formData.year}`
                        : null
                    }
                  />
                  <ReviewField
                    label="Links to Socials"
                    value={
                      formData?.github ||
                      formData?.linkedin ||
                      formData?.portfolio
                        ? "filled"
                        : null
                    }
                    renderValue={() => (
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
                    )}
                  />
                  <ReviewField
                    label="Number of Previous Hackathons Attended*"
                    value={formData?.hackathonCount}
                  />
                </div>
              </div>
            </div>

            {/* Long Answer Responses */}
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <Text
                  textType="heading-sm"
                  textFont="rubik"
                  textColor="primary"
                >
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
                <ReviewField
                  label="What would you like to accomplish at Hack the 6ix?"
                  value={formData?.accomplish}
                />
                <ReviewField
                  label="What is one project you were proud of? What tools and methods did you use to complete it?"
                  value={formData?.project}
                />
                <ReviewField label="Fun Fact" value={formData?.funFact} />
              </div>
            </div>

            {/* Survey Information */}
            <div className="space-y-7">
              <div className="flex items-center gap-2">
                <Text
                  textType="heading-sm"
                  textFont="rubik"
                  textColor="primary"
                >
                  Survey Information
                </Text>
                {formData?.tshirtSize &&
                formData?.gender &&
                formData?.ethnicity &&
                formData?.howDidYouHearAboutHT6 ? (
                  <img src={checkCircle} alt="Complete" className="w-3 h-3" />
                ) : (
                  <img src={exclamation} alt="Incomplete" className="w-3 h-3" />
                )}
              </div>
              <div className="rounded-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                  <ReviewField
                    label="T-shirt Size"
                    value={formData?.tshirtSize}
                  />
                  <ReviewField label="Gender" value={formData?.gender} />
                  <ReviewField label="Ethnicity" value={formData?.ethnicity} />
                  <ReviewField
                    label="Dietary Restrictions"
                    value={formData?.dietaryRestrictions}
                  />
                  <ReviewField
                    label="Previous Hack the 6ix Experience"
                    value={formData?.previousHT6Experience?.join(", ")}
                  />
                  <ReviewField
                    label="How did you hear about us?"
                    value={formData?.howDidYouHearAboutHT6?.join(", ")}
                  />
                  <ReviewField
                    label="Workshop Preferences"
                    value={formData?.requestedWorkshops?.join(", ")}
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              showModal
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            } fixed inset-0 flex items-center justify-center bg-black/50 z-50`}
          >
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md text-center">
              {modalContentType === "confirmSubmit" && (
                <>
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
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
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
                </>
              )}

              {modalContentType === "missingFields" && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-4 text-red-600"
                  >
                    Incomplete Application
                  </Text>
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
                            {field}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
                      className="bg-[#008F81] text-white"
                    >
                      Okay
                    </Button>
                  </div>
                </>
              )}

              {modalContentType === "resumeMissing" && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-4 text-red-600"
                  >
                    Resume Missing
                  </Text>
                  <Text
                    textType="paragraph-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-8"
                  >
                    Please upload your resume before submitting your
                    application.
                  </Text>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
                      className="bg-[#008F81] text-white"
                    >
                      Okay
                    </Button>
                  </div>
                </>
              )}

              {modalContentType === "submissionFailed" && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-4 text-red-600"
                  >
                    Submission Failed
                  </Text>
                  <Text
                    textType="paragraph-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-8"
                  >
                    There was an error submitting your application. Please try
                    again.
                  </Text>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
                      className="bg-[#008F81] text-white"
                    >
                      Okay
                    </Button>
                  </div>
                </>
              )}

              {modalContentType === "alreadyApplied" && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-4 text-red-600"
                  >
                    Already Applied
                  </Text>
                  <Text
                    textType="paragraph-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-8"
                  >
                    You have already submitted an application for Hack the 6ix.
                  </Text>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
                      className="bg-[#008F81] text-white"
                    >
                      Okay
                    </Button>
                  </div>
                </>
              )}

              {modalContentType === "fieldErrors" && (
                <>
                  <Text
                    textType="heading-lg"
                    textFont="rubik"
                    textColor="primary"
                    className="mb-4 text-red-600"
                  >
                    Submission Denied
                  </Text>
                  <div className="mb-6 p-4 bg-red-100/80 rounded-lg">
                    <Text
                      textType="paragraph-lg"
                      textFont="rubik"
                      textColor="primary"
                      className="font-bold mb-2"
                    >
                      Please fix the following issues:
                    </Text>
                    <ul className="list-disc pl-6">
                      {missingFields.map((field, index) => (
                        <li key={index}>
                          <Text
                            textType="paragraph-lg"
                            textFont="rubik"
                            textColor="primary"
                          >
                            {field}
                          </Text>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex justify-center gap-4">
                    <Button
                      variant="primary"
                      onClick={() => {
                        setShowModal(false);
                        setModalContentType(null);
                      }}
                      className="bg-[#008F81] text-white"
                    >
                      Okay
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>

          <div
            className={`flex justify-end gap-4 mt-6 transition-opacity duration-300 z-20`}
          >
            <Button
              variant="back"
              onClick={() => navigate("/apply/survey?page=5")}
              disabled={isSubmitting}
            >
              Back
            </Button>
            <Button
              onClick={() => {
                const currentMissing = getMissingFields();
                if (currentMissing.length > 0) {
                  setMissingFields(currentMissing);
                  setModalContentType("missingFields");
                } else {
                  setModalContentType("confirmSubmit");
                }
                setShowModal(true);
              }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>

        <img
          src={apple}
          alt="Apple"
          className="absolute sm:h-[70px] sm:w-[70px] sm:bottom-[90px] sm:right-[150px] right-[70px] w-[35px] h-[35px] bottom-[38px] "
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
    </div>
  );
}
