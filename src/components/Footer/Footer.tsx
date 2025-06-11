import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { profile } = useAuth();

  return (
    <div className="w-full absolute bottom-4 z-50">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center">
          {profile
            ? `Signed in as ${profile.firstName} ${profile.lastName}`
            : "Not signed in"}
        </div>
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center gap-1">
          <div
            className={`w-3 h-3 rounded-sm border border-black mr-2 bg-yellow-300`}
          ></div>
          Not Submitted
        </div>
      </div>
    </div>
  );
};

export default Footer;
