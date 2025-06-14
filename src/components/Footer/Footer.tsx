import { useApplicationContext } from "../../contexts/ApplicationContext";

const Footer = () => {
  const { formData } = useApplicationContext();

  return (
    <div className="w-full absolute bottom-4 z-10">
      <div className="w-[80%] mx-auto flex justify-between items-center">
        <div className="bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black flex items-center">
          {formData
            ? `Signed in as ${formData.firstName} ${formData.lastName}`
            : "Not signed in"}
        </div>
        <div className="hidden md:flex bg-[#EBA867] rounded-md p-2 font--jersey-10-regular border border-black items-center gap-4">
          Due June 25, 2025
        </div>
      </div>
    </div>
  );
};

export default Footer;
