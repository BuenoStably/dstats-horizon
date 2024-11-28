import { useState } from "react";
import Navbar from "@/components/Navbar";
import MetricCard from "@/components/MetricCard";
import { Box, Container, Typography, Grid } from "@mui/material";
import { Percent, Users, ArrowUpDown, BarChart3, UserMinus } from "lucide-react";
import ChartCard from "@/components/ChartCard";
import LineChartWithGradient from "@/components/charts/LineChartWithGradient";
import { generateMockApyData } from "@/utils/mockApyData";
import { filterDataByTimeframe } from "@/utils/dateUtils";

const DLENDPage = () => {
  const [supplyTimeframe, setSupplyTimeframe] = useState("7D");
  const [borrowTimeframe, setBorrowTimeframe] = useState("7D");

  const metrics = [
    {
      value: "9.0",
      label: "Debt Ratio",
      tooltip: "Current debt ratio of the protocol",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><ArrowUpDown /></Box>,
    },
    {
      value: "80.0%",
      label: "Current LTV",
      tooltip: "Current Loan to Value ratio",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><BarChart3 /></Box>,
    },
    {
      value: "90.0%",
      label: "Current Utilization",
      tooltip: "Current protocol utilization rate",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><Percent /></Box>,
    },
    {
      value: "268",
      label: "Lenders",
      tooltip: "Total number of unique lenders",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><Users /></Box>,
    },
    {
      value: "127",
      label: "Borrowers",
      tooltip: "Total number of unique borrowers",
      icon: <Box sx={{ width: { xs: 20, sm: 24 }, height: { xs: 20, sm: 24 } }}><UserMinus /></Box>,
    },
  ];

  const supplyApyData = generateMockApyData(3.5, 4.8);
  const borrowApyData = generateMockApyData(5.2, 5.9);

  const formatPercentage = (value: number) => `${value.toFixed(2)}%`;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: 'text.primary' }}>
          dLEND Analytics
        </Typography>
        
        <Grid container spacing={2}>
          {metrics.map((metric, index) => (
            <Grid item xs={12} sm={6} lg={2.4} key={index}>
              <MetricCard 
                value={metric.value}
                label={metric.label}
                tooltip={metric.tooltip}
                icon={metric.icon}
              />
            </Grid>
          ))}
        </Grid>
        
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid container item xs={12} lg={6}>
              <ChartCard 
                title="Raw dUSD Supply APY" 
                onTimeframeChange={setSupplyTimeframe}
              >
                <LineChartWithGradient
                  data={filterDataByTimeframe(supplyApyData, supplyTimeframe)}
                  valueFormatter={formatPercentage}
                />
              </ChartCard>
            </Grid>

            <Grid container item xs={12} lg={6}>
              <ChartCard 
                title="Raw dUSD Borrow APY" 
                onTimeframeChange={setBorrowTimeframe}
              >
                <LineChartWithGradient
                  data={filterDataByTimeframe(borrowApyData, borrowTimeframe)}
                  valueFormatter={formatPercentage}
                />
              </ChartCard>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DLENDPage;