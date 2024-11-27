import * as React from "react"
import * as RechartsPrimitive from "recharts"
import { Paper, Typography, Box, Stack } from "@mui/material"
import { useChart } from "./ChartContext"
import { getPayloadConfigFromPayload } from "./utils"

export const ChartTooltip = RechartsPrimitive.Tooltip

export const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof RechartsPrimitive.Tooltip> &
    React.ComponentProps<"div"> & {
      hideLabel?: boolean
      hideIndicator?: boolean
      indicator?: "line" | "dot" | "dashed"
      nameKey?: string
      labelKey?: string
    }
>(
  (
    {
      active,
      payload,
      className,
      indicator = "dot",
      hideLabel = false,
      hideIndicator = false,
      label,
      labelFormatter,
      labelClassName,
      formatter,
      color,
      nameKey,
      labelKey,
    },
    ref
  ) => {
    const { config } = useChart()

    const tooltipLabel = React.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null
      }

      const [item] = payload
      const key = `${labelKey || item.dataKey || item.name || "value"}`
      const itemConfig = getPayloadConfigFromPayload(config, item, key)
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label

      if (labelFormatter) {
        return (
          <Typography variant="subtitle2" className={labelClassName}>
            {labelFormatter(value, payload)}
          </Typography>
        )
      }

      if (!value) {
        return null
      }

      return (
        <Typography variant="subtitle2" className={labelClassName}>
          {value}
        </Typography>
      )
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ])

    if (!active || !payload?.length) {
      return null
    }

    const nestLabel = payload.length === 1 && indicator !== "dot"

    return (
      <Paper
        ref={ref}
        elevation={3}
        sx={{
          minWidth: '8rem',
          p: 1.5,
          borderRadius: 1,
          bgcolor: 'background.paper'
        }}
      >
        {!nestLabel ? tooltipLabel : null}
        <Stack spacing={1.5}>
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`
            const itemConfig = getPayloadConfigFromPayload(config, item, key)
            const indicatorColor = color || item.payload.fill || item.color

            return (
              <Stack
                key={item.dataKey}
                direction="row"
                spacing={2}
                alignItems={indicator === "dot" ? "center" : "stretch"}
              >
                {itemConfig?.icon ? (
                  <itemConfig.icon />
                ) : (
                  !hideIndicator && (
                    <Box
                      sx={{
                        width: indicator === "dot" ? 10 : 4,
                        height: indicator === "dot" ? 10 : "auto",
                        borderRadius: 0.5,
                        bgcolor: indicatorColor,
                        border: indicator === "dashed" ? `1.5px dashed ${indicatorColor}` : "none",
                        my: nestLabel && indicator === "dashed" ? 0.5 : 0
                      }}
                    />
                  )
                )}
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems={nestLabel ? "flex-end" : "center"}
                  sx={{ flex: 1 }}
                >
                  <Stack spacing={1.5}>
                    {nestLabel ? tooltipLabel : null}
                    <Typography variant="body2" color="text.secondary">
                      {itemConfig?.label || item.name}
                    </Typography>
                  </Stack>
                  {item.value && (
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: 'monospace',
                        fontWeight: 500
                      }}
                    >
                      {item.value.toLocaleString()}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )
          })}
        </Stack>
      </Paper>
    )
  }
)
ChartTooltipContent.displayName = "ChartTooltipContent"