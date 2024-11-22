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
          <main className="flex-grow">
            <div className="w-full max-w-[1280px] mx-auto px-4 mb-16">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dusd" element={<DUSDPage />} />
              </Routes>
            </div>
          </main>
          <div className="w-full">
            <div className="h-[20vh] bg-gradient-to-t from-primary/80 to-transparent" />
            <footer className="py-8 flex justify-center items-center">
              <img 
                src="https://app.testnet.dtrinity.org/dlend/dTrinity-White-Logo.png" 
                alt="dTrinity Logo" 
                className="h-9 object-contain"
              />
            </footer>
          </div>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;