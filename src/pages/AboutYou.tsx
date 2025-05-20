import tree2SVG from "../assets/tree2.svg";
import shrub_flowerSVG from "../assets/bush_flower.svg";
import birdSVG from "../assets/bird.svg";
import Text from "../components/Text/Text"
import Input from "../components/Input/Input"
import ProgressBar from "../components/ProgressBar/ProgressBar";
import { useNavigate } from "react-router-dom";
import { Context } from "../components/ContextProvider";
import { useContext, useState } from "react";
import Button from "../components/Button/Button";
import Checkbox from "../components/Checkbox/Checkbox";
import Dropdown from "../components/Dropdown/Dropdown";
import { CANADIAN_PROVINCES } from '../constants/locations';

export default function AboutYou() {
  const navigate = useNavigate();
  const {setCompletedSection, completedSection} = useContext(Context);
  const [skinChoice, setSkinChoice] = useState(0);
  const [itemChoice, setItemChoice] = useState(0);
  const [page, setPage] = useState(1);

  return (
    <div className="overflow-hidden bg-linear-to-b from-[#ACDCFD] via-[#B3E9FC] to-[#B9F2FC] h-[100vh] w-full">
      <div className="w-full h-full flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="flex flex-col items-start justify-center gap-12 w-full max-w-[1200px] ml-[158px] -mt-[100px]">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 py-4">
              {page === 1 && (
                <Text textType="heading-lg" textFont="rubik" textColor="primary">
                  Nice! Next, fill in some information on yourself:
                </Text>
              )}
              {page === 2 && (
                <Text textType="heading-lg" textFont="rubik" textColor="primary">
                  What's your email?
                </Text>
              )}
              {page === 3 && (
                <Text textType="heading-lg" textFont="rubik" textColor="primary">
                  Where are you located?
                </Text>
              )}
              {page === 4 && (
                <>
                  <Text textType="heading-lg" textFont="rubik" textColor="primary" className="ml-[5px]">
                    Emergency Information
                  </Text>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[5px]">
                  Your safety is our priority. In the case of an emergency, this person will be contacted. We respect your privacy and guarantee that this information will be only be accessed by authorized personnel.                  </Text>
                </>
              )}
            </div>

            <div className="flex flex-col gap-1 w-full">
              {page === 1 && (
                <>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                    Your full name*
                  </Text>
                  <Input placeholder="John Doe"/>
                </>
              )}

              {page === 2 && (
                <>
                  <Input placeholder="john.doe@university.com"/>
                  <div className="ml-2 py-2">
                    <Checkbox label="I give permission to Hack the 6ix for sending me emails containing information from the event sponsors. " />
                  </div>
                </>
              )}

              {page === 3 && (
                <>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                    City*
                  </Text>
                  <Input placeholder="Toronto"/>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        Province*
                      </Text>
                      <Dropdown 
                        options={CANADIAN_PROVINCES}
                        onChange={(value) => console.log(value)} 
                      />
                    </div>
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        Country*
                      </Text>
                      <Dropdown 
                        options={[{ label: "Canada", value: "CA" }]}
                        onChange={(value) => console.log(value)} 
                      />
                    </div>
                  </div>
                </>
              )}
              {page === 4 && (
                <>

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        First Name*
                      </Text>
                      <Input placeholder="Jane"/>
                    </div>
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        Last Name*
                      </Text>
                      <Input placeholder="Doe"/>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        Phone Number*
                      </Text>
                      <Input placeholder="###-###-####"/>
                    </div>
                    <div className="w-1/2">
                      <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="ml-[10px]">
                        Relationship*
                      </Text>
                      <Dropdown 
                        options={[
                          { label: "Parent", value: "parent" },
                          { label: "Guardian", value: "guardian" },
                          { label: "Sibling", value: "sibling" },
                          { label: "Spouse", value: "spouse" },
                          { label: "Friend", value: "friend" },
                          { label: "Other", value: "other" }
                        ]}
                        onChange={(value) => console.log(value)} 
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
                    navigate("/apply?section=playerselect");
                  } else {
                    setPage(page - 1);
                  }
                }}
              >
                Back
              </Button>
              <Button 
                onClick={() => {
                  if (page < 4) {
                    setPage(page + 1);
                  } else {
                    const updateCompleted = completedSection.map((val, i) =>
                      i === 1 ? true : val
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
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[450px]"
      />

      <img
        src={birdSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] left-[300px]"
      />

      <img
        src={shrub_flowerSVG}
        alt="Shrubs"
        className="sm:block hidden absolute h-[90px] w-[200px] bottom-[90px] right-[150px]"
      />
    </div>
  );
}
