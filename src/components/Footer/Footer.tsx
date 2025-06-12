import { useApplicationContext } from "../../contexts/ApplicationContext";
import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const { formData } = useApplicationContext();
  const { setProfile } = useAuth();

  return (
    <div className="w-full absolute bottom-4 z-50">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center">
          {formData
            ? `Signed in as ${formData.firstName} ${formData.lastName}`
            : "Not signed in"}
        </div>
        <div className="hidden md:flex bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black items-center gap-4">
          <div
            className={`w-3 h-3 rounded-sm border border-black mr-2 bg-yellow-300`}
          ></div>
          Not Submitted
          {formData && (
            <button
              onClick={() => setProfile(null)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded border border-black"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
