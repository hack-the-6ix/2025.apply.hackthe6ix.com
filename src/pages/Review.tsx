import { PLAYER_IMAGES } from "../constants/images";
import apple from "../assets/apple.svg"
import brickhouse from "../assets/brickhouse_review.svg"
import bush from "../assets/bush.svg"
import mushroom from "../assets/mushroom.svg"

import Input from '../components/Input/Input';
import Text from '../components/Text/Text';
import { useContext } from 'react';
import { Context } from '../components/ContextProvider';
import Button from '../components/Button/Button';
import { useNavigate } from 'react-router-dom';

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
  { label: "Basics in Python", value: "python12" },
];

const TSHIRT_SIZES = [
  { label: "XS", value: "xs" },
  { label: "S", value: "s" },
  { label: "M", value: "m" },
  { label: "L", value: "l" },
  { label: "XL", value: "xl" },
  { label: "XXL", value: "xxl" },
];

export default function Review() {
  const navigate = useNavigate();
  const { formData, selectedSkin, selectedItem } = useContext(Context);

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-[linear-gradient(to_bottom,_#B1E1F9,_#E5DCD9,_#FCD2B3,_#F5AB42)] min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-[1000px] bg-[#E6EFF3]/80 rounded-2xl p-6 shadow-lg mt-32 mb-16 z-10">
        <Text textType="heading-lg" textFont="rubik" textColor="primary" className="mb-6">
          Review Your Information
        </Text>
        
        <div className="max-h-[35vh] overflow-y-auto pr-4 space-y-6">
          {/* Personal Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Personal Information
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Full Name</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.fullName ? "primary" : "gray"} className="font-bold">{formData?.fullName || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Email</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.email ? "primary" : "gray"} className="font-bold">{formData?.email || 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Location
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">City</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.city ? "primary" : "gray"} className="font-bold">{formData?.city || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Province</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.province ? "primary" : "gray"} className="font-bold">{formData?.province || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Country</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.country ? "primary" : "gray"} className="font-bold">{formData?.country || 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Emergency Contact
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Contact Name</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.emergencyFirstName && formData?.emergencyLastName ? "primary" : "gray"} className="font-bold">
                    {formData?.emergencyFirstName && formData?.emergencyLastName 
                      ? `${formData.emergencyFirstName} ${formData.emergencyLastName}`
                      : 'Not filled'}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Phone Number</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.emergencyPhone ? "primary" : "gray"} className="font-bold">{formData?.emergencyPhone || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Relationship</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.emergencyRelationship ? "primary" : "gray"} className="font-bold">{formData?.emergencyRelationship || 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Education Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Education
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">School</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.school ? "primary" : "gray"} className="font-bold">{formData?.school || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Year of Study</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.year ? "primary" : "gray"} className="font-bold">{formData?.year || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Program</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.program ? "primary" : "gray"} className="font-bold">{formData?.program || 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Experience
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Hackathon Experience</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.hackathonCount ? "primary" : "gray"} className="font-bold">{formData?.hackathonCount || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Resume</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.resume ? "primary" : "gray"} className="font-bold">{formData?.resume ? 'Uploaded' : 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Social Links
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">GitHub</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.github ? "primary" : "gray"} className="font-bold">{formData?.github || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">LinkedIn</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.linkedin ? "primary" : "gray"} className="font-bold">{formData?.linkedin || 'Not filled'}</Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Portfolio</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.portfolio ? "primary" : "gray"} className="font-bold">{formData?.portfolio || 'Not filled'}</Text>
                </div>
              </div>
            </div>
          </div>

          {/* Long Answer Responses */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Long Answer Responses
            </Text>
            <div className="bg-white/50 p-4 rounded-md space-y-4">
              <div className="flex flex-col">
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">What would you like to accomplish at Hack the 6ix?</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.accomplish ? "primary" : "gray"} className="whitespace-pre-wrap font-bold">
                  {formData?.accomplish || 'Not filled'}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">What is one project you were proud of? What tools and methods did you use to complete it?</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.project ? "primary" : "gray"} className="whitespace-pre-wrap font-bold">
                  {formData?.project || 'Not filled'}
                </Text>
              </div>
              <div className="flex flex-col">
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Fun Fact</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.funFact ? "primary" : "gray"} className="font-bold">
                  {formData?.funFact || 'Not filled'}
                </Text>
              </div>
            </div>
          </div>

          {/* Survey Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Survey Information
            </Text>
            <div className="bg-white/50 p-4 rounded-md space-y-4">
              {/* Workshop Selections */}
              <div>
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Selected Workshops</Text>
                <div className="mt-2">
                  {formData?.selectedWorkshops && formData.selectedWorkshops.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {formData.selectedWorkshops.map((workshop) => (
                        <div key={workshop} className="bg-white/30 px-3 py-1 rounded-full">
                          <Text textType="paragraph-sm" textFont="rubik" textColor="primary">
                            {WORKSHOPS.find(w => w.value === workshop)?.label || workshop}
                          </Text>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Text textType="paragraph-lg" textFont="rubik" textColor="primary">Not provided</Text>
                  )}
                </div>
              </div>

              {/* T-shirt Size */}
              <div className="flex flex-col">
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">T-shirt Size</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.tshirtSize ? "primary" : "gray"} className="font-bold">
                  {formData?.tshirtSize ? TSHIRT_SIZES.find(s => s.value === formData.tshirtSize)?.label : 'Not filled'}
                </Text>
              </div>

              {/* Dietary and Allergies */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Dietary Restrictions</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.dietaryRestrictions ? "primary" : "gray"} className="font-bold">
                    {formData?.dietaryRestrictions || 'None'}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Allergies</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.allergies ? "primary" : "gray"} className="font-bold">
                    {formData?.allergies || 'None'}
                  </Text>
                </div>
              </div>

              {/* Gender and Ethnicity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Gender</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.gender ? "primary" : "gray"} className="font-bold">
                    {formData?.gender || 'Not filled'}
                  </Text>
                </div>
                <div className="flex flex-col">
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary" className="font-bold">Ethnicity</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor={formData?.ethnicity ? "primary" : "gray"} className="font-bold">
                    {formData?.ethnicity || 'Not filled'}
                  </Text>
                </div>
              </div>

              {/* Permissions */}
              <div className="space-y-2">
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Permissions</Text>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${formData?.permission1 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <Text textType="paragraph-sm" textFont="rubik" textColor="primary">
                      Permission to use information for event purposes
                    </Text>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${formData?.permission2 ? 'bg-green-500' : 'bg-red-500'}`} />
                    <Text textType="paragraph-sm" textFont="rubik" textColor="primary">
                      Permission to share information with sponsors
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button variant="back" onClick={() => navigate('/apply?section=survey')}>
            Back
          </Button>
          <Button onClick={() => navigate('/apply?section=submit')}>
            Submit Application
          </Button>
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
        className="sm:block hidden absolute left-[10px] bottom-[90px]"
      />
      <img
        src={brickhouse}
        alt="Brush"
        className="sm:block hidden absolute left-[0px] bottom-[38px]"
      />

    </div>
  );
}