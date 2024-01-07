import { withStyles } from '@mui/styles';
import { Typography as MuiTypography } from '@mui/material';

export const TypographyLink = withStyles(({ palette }) => ({
    root: {
        padding: '6px 12px',
        '&:hover': {
            color: palette.secondary.main,
        },
    },
}))(MuiTypography);

export const TypographyLinkOutlined = withStyles(({ palette }) => ({
    root: {
        padding: '6px 12px',
        '&:hover': {
            color: palette.secondary.main,
        },
    },
    colorSecondary: {
        borderRadius: '4px',
        border: '1px solid transparent',
        '&:hover': {
            borderColor: palette.secondary.main,
        },
    },
}))(MuiTypography);
