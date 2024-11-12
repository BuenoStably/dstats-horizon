import { Snackbar, Alert, AlertTitle, Box } from '@mui/material';

export const Toast = Snackbar;
export const ToastAction = Alert;
export const ToastClose = Alert;
export const ToastDescription = Alert;
export const ToastProvider = Box;
export const ToastTitle = AlertTitle;
export const ToastViewport = Box;

export type ToastProps = React.ComponentProps<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;