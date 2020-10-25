import { withStyles } from '@material-ui/core/styles';
import { Typography as MuiTypography } from '@material-ui/core';

export const TypographyLink = withStyles(({ palette }) => ({
    root: {
        // color: palette.primary.main,
        '&:hover': {
            color: palette.secondary.main,
        },
    },
}))(MuiTypography);
