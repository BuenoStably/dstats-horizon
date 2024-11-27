import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { Box } from "@mui/material"
import { ChartConfig } from "./types"
import { ChartContext } from "./ChartContext"
import { ChartStyle } from "./ChartStyle"

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ComponentProps<typeof RechartsPrimitive.ResponsiveContainer>["children"]
  }
>(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = React.useId()
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`

  return (
    <ChartContext.Provider value={{ config }}>
      <Box
        data-chart={chartId}
        ref={ref}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '0.75rem',
          '& .recharts-cartesian-axis-tick text': {
            fill: 'text.secondary'
          },
          '& .recharts-cartesian-grid line[stroke="#ccc"]': {
            stroke: 'divider'
          },
          '& .recharts-curve.recharts-tooltip-cursor': {
            stroke: 'divider'
          },
          '& .recharts-dot[stroke="#fff"]': {
            stroke: 'transparent'
          },
          '& .recharts-layer': {
            outline: 'none'
          },
          '& .recharts-polar-grid[stroke="#ccc"]': {
            stroke: 'divider'
          },
          '& .recharts-radial-bar-background-sector': {
            fill: 'action.hover'
          },
          '& .recharts-rectangle.recharts-tooltip-cursor': {
            fill: 'action.hover'
          },
          '& .recharts-reference-line[stroke="#ccc"]': {
            stroke: 'divider'
          },
          '& .recharts-sector[stroke="#fff"]': {
            stroke: 'transparent'
          },
          '& .recharts-sector': {
            outline: 'none'
          },
          '& .recharts-surface': {
            outline: 'none'
          }
        }}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </Box>
    </ChartContext.Provider>
  )
})
ChartContainer.displayName = "ChartContainer"

export { ChartContainer }