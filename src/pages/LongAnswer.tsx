import cloud from "../assets/cloud.svg"
import cloud_group from "../assets/cloud_group.svg"
import firefly from "../assets/firefly.svg"
import pine_tree from "../assets/pine_tree.svg"
import corner_rock3 from "../assets/corner_rock3.svg"
import p12 from "../assets/players/12.png"
import apple from "../assets/apple.svg"
import cloud2 from "../assets/cloud2.svg"

import { useState } from 'react';
import Text from '../components/Text/Text';
import TextArea from '../components/TextArea/TextArea';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import ProgressBar from '../components/ProgressBar/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../components/ContextProvider';

export default function LongAnswer() {
  const navigate = useNavigate();
  const { setCompletedSection, completedSection } = useContext(Context);
  const [page, setPage] = useState(1);
  const [accomplish, setAccomplish] = useState("");
  const [project, setProject] = useState("");
  const [funFact, setFunFact] = useState("");

  const renderPage = () => {
    switch (page) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              What would you like to accomplish at Hack the 6ix?*
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
            <Text textType="heading-lg" textFont="rubik" textColor="white" className="mt-12">
              What is one project you were proud of? What tools and methods did you use to complete it?*
            </Text>
            <TextArea
              value={project}
              onChange={(e) => setProject(e.target.value)}
              placeholder="Share your project experience..."
              backgroundColor="#3D4759"
              textColor="white"
              rows={10}
              maxWords={200}
              showWordCount={true}
            />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-4">
            <Text textType="heading-lg" textFont="rubik" textColor="white">
              Fun Fact*
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
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-linear-to-b from-[#21293C] to-[#06162F] h-[100vh] w-full flex flex-col justify-center items-start">
      <div className="w-full h-full flex items-center justify-start px-4 py-8 overflow-hidden relative z-10">
        <div className="flex flex-col items-start justify-center gap-12 w-full max-w-[1200px] sm:ml-[158px] -mt-[100px]">
          <div className="flex flex-col items-start w-full gap-6 max-w-[850px]">
            <div className="flex flex-col gap-4 w-full">
              {renderPage()}
            </div>
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-row justify-end w-full gap-3">
                {page > 1 && (
                  <Button variant="back" onClick={() => setPage(page - 1)} darkMode={true} />
                )}
                <Button
                  darkMode={true}
                  onClick={() => {
                    if (page < 3) {
                      setPage(page + 1);
                    } else {
                      const updateCompleted = completedSection.map((val, i) =>
                        i === 2 ? true : val
                      );
                      setCompletedSection(updateCompleted);
                      navigate("/apply?section=survey");
                    }
                  }}
                />
              </div>
              <div className="flex justify-end w-full">
                <ProgressBar darkMode={true} numSteps={3} currPage={page} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <img
        src={corner_rock3}
        alt="corner_rocks"
        className="sm:block hidden absolute h-[30] w-[30] top-[15px] left-[0px]"
      />
      <img
        src={pine_tree}
        alt="corner_rocks"
        className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] left-[0px] z-[1]"
      />
      <img
        src={cloud}
        alt="cloud"
        className="sm:block hidden absolute bottom-[120px] left-[-200px]"
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
        className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] right-[-70px]"
      />
      <img
        src={pine_tree}
        alt="corner_rocks"
        className="sm:block hidden absolute h-[250px] w-[250px] bottom-[80px] right-[-170px]"
      />
      <img
        src={cloud_group}
        alt="cloud_group"
        className="sm:block hidden absolute h-[350px] w-[350px] top-[80px] right-[0]"
      />
      <img
        src={p12}
        alt="p12"
        className="sm:block hidden absolute h-[140px] w-[140px] bottom-[90px] right-[185px]"
      />
      <img
        src={apple}
        alt="apple"
        className="sm:block hidden absolute bottom-[90px] right-[150px] animate-bounce-custom"
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
      <img
        src={cloud2}
        alt="cloud2"
        className="sm:block hidden absolute bottom-[100px] right-[0]"
      />
    </div>
  );
}
  