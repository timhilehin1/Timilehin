import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { useEffect } from "react";
import { initGA, trackPageView } from "./utils/ga4";

function App() {
  useEffect(() => {
    initGA();
    trackPageView(window.location.pathname);
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
