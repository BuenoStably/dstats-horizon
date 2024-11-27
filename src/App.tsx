import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Container, Box } from "@mui/material";
import { theme } from "./theme";
import Index from "./pages/Index";
import DUSDPage from "./pages/dUSD";
import DLENDPage from "./pages/dLEND";
import LiquidityPage from "./pages/Liquidity";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box 
            sx={{ 
              minHeight: "100vh", 
              display: "flex", 
              flexDirection: "column",
              position: "relative",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(to top, rgba(135, 2, 255, 0.8), transparent)",
                pointerEvents: "none",
                zIndex: 0
              }
            }}
          >
            <Box component="main" sx={{ flexGrow: 1, position: "relative", zIndex: 1 }}>
              <Container maxWidth="lg" sx={{ px: 2, mb: 8 }}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dusd" element={<DUSDPage />} />
                  <Route path="/dlend" element={<DLENDPage />} />
                  <Route path="/liquidity" element={<LiquidityPage />} />
                </Routes>
              </Container>
            </Box>
            <Box 
              component="footer" 
              sx={{ 
                py: 4, 
                display: "flex", 
                justifyContent: "center", 
                alignItems: "center",
                position: "relative",
                zIndex: 1
              }}
            >
              <Box
                component="img"
                src="https://app.testnet.dtrinity.org/dlend/dTrinity-White-Logo.png"
                alt="dTrinity Logo"
                sx={{ height: 36, objectFit: "contain" }}
              />
            </Box>
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;