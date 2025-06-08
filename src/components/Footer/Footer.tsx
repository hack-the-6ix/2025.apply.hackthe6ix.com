import { useAuth } from "../../contexts/AuthContext";

const Footer = () => {
  const profile = { useAuth };
  return <div>{profile.toString()}</div>;
};

export default Footer;
