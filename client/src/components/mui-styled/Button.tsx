import { withStyles } from '@mui/styles';
import { Button as MuiButton } from '@mui/material';

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
