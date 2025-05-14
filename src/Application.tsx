import Navbar from "./components/Navbar/Navbar";
import AboutYou from "./pages/AboutYou";
function Application() {
  return (
    <div className="w-full">
        <Navbar complete={[false, false, false, false, true]}/>
        <AboutYou />
    </div>
  );
}

export default Application;
