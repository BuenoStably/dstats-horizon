import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { Stack, Typography, Box } from "@mui/material"
import { useChart } from "./ChartContext"
import { getPayloadConfigFromPayload } from "./utils"

export const ChartLegend = RechartsPrimitive.Legend

export const ChartLegendContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign"> & {
      hideIcon?: boolean
      nameKey?: string
    }
>(
  (
    { className, hideIcon = false, payload, verticalAlign = "bottom", nameKey },
    ref
  ) => {
    const { config } = useChart()

    if (!payload?.length) {
      return null
    }

    return (
      <Stack
        ref={ref}
        direction="row"
        spacing={4}
        justifyContent="center"
        alignItems="center"
        sx={{
          pt: verticalAlign === "bottom" ? 3 : 0,
          pb: verticalAlign === "top" ? 3 : 0
        }}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`
          const itemConfig = getPayloadConfigFromPayload(config, item, key)

          return (
            <Stack
              key={item.value}
              direction="row"
              spacing={1.5}
              alignItems="center"
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: 0.5,
                    bgcolor: item.color
                  }}
                />
              )}
              <Typography variant="body2">
                {itemConfig?.label}
              </Typography>
            </Stack>
          )
        })}
      </Stack>
    )
  }
)
ChartLegendContent.displayName = "ChartLegendContent"