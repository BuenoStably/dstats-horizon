import * as React from "react"
import { Button as MuiButton, ButtonProps as MuiButtonProps } from "@mui/material"

export interface ButtonProps extends MuiButtonProps {
  component?: React.ElementType;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "contained", size = "medium", component, ...props }, ref) => {
    const Component = component || MuiButton;
    return (
      <Component
        ref={ref}
        variant={variant}
        size={size}
        {...props}
      />
    );
  }
);
Button.displayName = "Button"

export { Button }