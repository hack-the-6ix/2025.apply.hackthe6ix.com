import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { profile } = useAuth();

  return (
    <div className="w-full absolute bottom-4">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center">
          {profile
            ? `Signed in as ${profile.firstName} ${profile.lastName}`
            : "Not signed in"}
        </div>
      </div>
    </div>
  );
};

export default Footer;
