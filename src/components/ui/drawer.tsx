import * as React from "react"
import { 
  Drawer as MuiDrawer,
  IconButton,
  Box
} from "@mui/material"
import { Close as CloseIcon } from '@mui/icons-material'
import { cn } from "@/lib/utils"

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  anchor?: 'left' | 'right' | 'top' | 'bottom';
}

const Drawer = ({ open, onClose, children, anchor = 'bottom' }: DrawerProps) => (
  <MuiDrawer
    anchor={anchor}
    open={open}
    onClose={onClose}
    PaperProps={{
      className: cn(
        "bg-background rounded-t-[10px] border",
        anchor === 'bottom' && "mt-24"
      )
    }}
  >
    <Box className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
    <IconButton
      onClick={onClose}
      className="absolute right-4 top-4"
      size="small"
    >
      <CloseIcon />
    </IconButton>
    {children}
  </MuiDrawer>
);

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
);

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
);

const DrawerTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const DrawerDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Drawer,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}