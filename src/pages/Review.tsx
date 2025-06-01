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
  const { formData } = useContext(Context);

  return (
    <div className="sm:gap-0 gap-4 overflow-hidden p-8 bg-[linear-gradient(to_bottom,_#B1E1F9,_#E5DCD9,_#FCD2B3,_#F5AB42)] h-[100vh] w-full flex flex-col justify-center items-center">
      <div className="w-full max-w-[800px] bg-white/80 rounded-lg p-6 shadow-lg">
        <Text textType="heading-lg" textFont="rubik" textColor="primary" className="mb-6">
          Review Your Information
        </Text>
        
        <div className="max-h-[60vh] overflow-y-auto pr-4 space-y-6">
          {/* Personal Information */}
          <div className="space-y-2">
            <Text textType="heading-sm" textFont="rubik" textColor="primary">
              Personal Information
            </Text>
            <div className="bg-white/50 p-4 rounded-md">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Full Name</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.fullName || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Email</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.email || 'Not provided'}</Text>
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
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">City</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.city || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Province</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.province || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Country</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.country || 'Not provided'}</Text>
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
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Contact Name</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                    {formData?.emergencyFirstName && formData?.emergencyLastName 
                      ? `${formData.emergencyFirstName} ${formData.emergencyLastName}`
                      : 'Not provided'}
                  </Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Phone Number</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.emergencyPhone || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Relationship</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.emergencyRelationship || 'Not provided'}</Text>
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
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">School</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.school || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Year of Study</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.year || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Program</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.program || 'Not provided'}</Text>
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
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Hackathon Experience</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.hackathonCount || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Resume</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.resume ? 'Uploaded' : 'Not provided'}</Text>
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
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">GitHub</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.github || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">LinkedIn</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.linkedin || 'Not provided'}</Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Portfolio</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">{formData?.portfolio || 'Not provided'}</Text>
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
              <div>
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">What would you like to accomplish at Hack the 6ix?</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor="primary" className="whitespace-pre-wrap">
                  {formData?.accomplish || 'Not provided'}
                </Text>
              </div>
              <div>
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">What is one project you were proud of? What tools and methods did you use to complete it?</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor="primary" className="whitespace-pre-wrap">
                  {formData?.project || 'Not provided'}
                </Text>
              </div>
              <div>
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Fun Fact</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                  {formData?.funFact || 'Not provided'}
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
              <div>
                <Text textType="paragraph-sm" textFont="rubik" textColor="primary">T-shirt Size</Text>
                <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                  {formData?.tshirtSize ? TSHIRT_SIZES.find(s => s.value === formData.tshirtSize)?.label : 'Not provided'}
                </Text>
              </div>

              {/* Dietary and Allergies */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Dietary Restrictions</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                    {formData?.dietaryRestrictions || 'None'}
                  </Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Allergies</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                    {formData?.allergies || 'None'}
                  </Text>
                </div>
              </div>

              {/* Gender and Ethnicity */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Gender</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                    {formData?.gender || 'Not provided'}
                  </Text>
                </div>
                <div>
                  <Text textType="paragraph-sm" textFont="rubik" textColor="primary">Ethnicity</Text>
                  <Text textType="paragraph-lg" textFont="rubik" textColor="primary">
                    {formData?.ethnicity || 'Not provided'}
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
    </div>
  );
}