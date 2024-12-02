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
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    h5: true;
    h6: true;
    subtitle1: true;
    subtitle2: true;
    body1: true;
    body2: true;
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    'chart-timeframe': true;
    text: true;
    outlined: true;
    contained: true;
  }
}

declare module '@mui/material/Card' {
  interface CardPropsVariantOverrides {
    'metric': true;
    'chart': true;
    elevation: true;
    outlined: true;
  }
}

export {};