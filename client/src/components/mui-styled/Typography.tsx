import { withStyles } from '@material-ui/core/styles';
import { Typography as MuiTypography } from '@material-ui/core';

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
