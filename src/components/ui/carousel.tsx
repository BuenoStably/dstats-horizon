import * as React from "react"
import { 
  MobileStepper,
  Button,
  Paper,
  Box
} from "@mui/material"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { cn } from "@/lib/utils"

interface CarouselProps {
  children: React.ReactNode[];
  className?: string;
  autoPlay?: boolean;
  interval?: number;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className, autoPlay = false, interval = 3000 }, ref) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = React.Children.count(children);

    const handleNext = () => {
      setActiveStep((prevStep) => (prevStep + 1) % maxSteps);
    };

    const handleBack = () => {
      setActiveStep((prevStep) => (prevStep - 1 + maxSteps) % maxSteps);
    };

    React.useEffect(() => {
      if (!autoPlay) return;
      
      const timer = setInterval(handleNext, interval);
      return () => clearInterval(timer);
    }, [autoPlay, interval]);

    return (
      <Box
        ref={ref}
        className={cn("relative", className)}
        role="region"
        aria-roledescription="carousel"
      >
        <Box className="overflow-hidden">
          <Box
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeStep * 100}%)` }}
          >
            {React.Children.map(children, (child, index) => (
              <Box
                key={index}
                className="min-w-full flex-shrink-0"
                role="group"
                aria-roledescription="slide"
              >
                {child}
              </Box>
            ))}
          </Box>
        </Box>

        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className="bg-transparent"
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
            >
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </Box>
    );
  }
);
Carousel.displayName = "Carousel";

export { Carousel };