import '@mui/material/styles';
import '@mui/material/Button';
import '@mui/material/Card';
import '@mui/material/Typography';

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

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'chart-timeframe': true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    'metric': true;
    'chart': true;
  }
}

export {};