declare module '@mui/material/styles' {
  interface TypographyVariants {
    'metric-value': React.CSSProperties;
    'metric-label': React.CSSProperties;
  }

  interface TypographyVariantsOptions {
    'metric-value'?: React.CSSProperties;
    'metric-label'?: React.CSSProperties;
  }
}

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    'metric-value': true;
    'metric-label': true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    'metric': true;
    'chart': true;
  }
}

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    'metric': true;
    'chart': true;
  }
}

export {};