import { withStyles } from '@material-ui/core/styles';
import { Button as MuiButton } from '@material-ui/core';

export const Button = withStyles(({ palette }) => ({
    root: {
        textTransform: 'none',
        '&:hover': {
            color: palette.secondary.main,
        },
    },
    outlinedPrimary: {
        border: `1.5px solid ${palette.primary.main}`,
        '&:hover': {
            border: `1.5px solid ${palette.primary.main}`,
        },
    },
    outlinedSecondary: {
        border: `1.5px solid ${palette.secondary.main}`,
        '&:hover': {
            border: `1.5px solid ${palette.secondary.main}`,
        },
    },
}))(MuiButton);
