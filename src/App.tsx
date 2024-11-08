import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import DUSDPage from "@/pages/dUSD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dusd" element={<DUSDPage />} />
      </Routes>
    </Router>
  );
}

export default App;