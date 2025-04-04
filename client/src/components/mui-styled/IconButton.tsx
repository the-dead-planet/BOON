import { withStyles } from '@mui/styles';
import { IconButton as MuiIconButton } from '@mui/material';

export const IconButton = withStyles(({ palette }) => ({
    root: {
        borderRadius: '10px',
        padding: '6px',
        color: palette.text.primary,
        '& span': {
            // paddingLeft: ".4em",
        },
        '&:hover': {
            backgroundColor: 'transparent',
            '& svg, span, .MuiSvgIcon-root': {
                // filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, .13))',
                color: palette.secondary.main,
            },
        },
    },
    colorPrimary: {
        '&:hover': {
            backgroundColor: 'transparent',
            '& svg, span, .MuiSvgIcon-root': {
                // filter: 'drop-shadow(4px 4px 8px rgba(0, 0, 0, .13))',
                color: palette.secondary.main,
            },
        },
    },
    colorSecondary: {
        color: palette.secondary.main,
        border: `solid 1px transparent`,
        '&:hover': {
            backgroundColor: 'transparent',
            border: `solid 1px ${palette.secondary.main}`,
            '& svg, span, .MuiSvgIcon-root': {},
        },
    },
}))(MuiIconButton);
