import "./App.css";

import SidePage from "./components/SidePage";
import MainRoutes from "./Routes/MainRoutes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="landingPageContainer">
      <Toaster />
      <div className="landingPageColumn">
        <SidePage />
      </div>
      <div className="landingPageContent">
        <MainRoutes />
      </div>
      <div className="landingPageColumn"></div>
    </div>
  );
}

export default App;
