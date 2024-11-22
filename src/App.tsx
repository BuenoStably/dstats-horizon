import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DUSDPage from "./pages/dUSD";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/dusd" element={<DUSDPage />} />
            </Routes>
          </div>
          <footer className="py-8 flex justify-center items-center">
            <img 
              src="https://app.testnet.dtrinity.org/dlend/dTrinity-White-Logo.png" 
              alt="dTrinity Logo" 
              className="h-12 object-contain"
            />
          </footer>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;