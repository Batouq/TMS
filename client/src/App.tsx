import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Index";
import NotFound from "./pages/NotFound/Index";
function App() {
  return (
    <div className="landingPageContainer">
      <div className="landingPageColumn">one</div>
      <div className="landingPageContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <div className="landingPageColumn">two</div>
    </div>
  );
}

export default App;
