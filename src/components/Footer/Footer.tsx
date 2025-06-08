import { useAuth } from "../../contexts/AuthContext";
import { useSaveStatus } from "../../contexts/SaveStatusContext";

const Footer = () => {
  const { profile } = useAuth();
  const { saveStatus } = useSaveStatus();

  const getIndicatorColor = () => {
    switch (saveStatus) {
      case "Saved":
        return "bg-green-500";
      case "Saving":
        return "bg-yellow-500";
      case "Error":
        return "bg-red-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="w-full absolute bottom-4">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center">
          {profile
            ? `Signed in as ${profile.firstName} ${profile.lastName}`
            : "Not signed in"}
        </div>
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-sm border border-black mr-2 ${getIndicatorColor()}`}
          ></div>
          {saveStatus}
        </div>
      </div>
    </div>
  );
};

export default Footer;
