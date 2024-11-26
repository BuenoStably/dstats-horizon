import * as React from "react"
import { Chip, ChipProps } from "@mui/material"

export interface BadgeProps extends ChipProps {}

function Badge({ className, variant = "filled", size = "small", ...props }: BadgeProps) {
  return (
    <Chip
      variant={variant}
      size={size}
      {...props}
    />
  )
}

export { Badge }