import { withStyles } from '@material-ui/core/styles';
import { TextField as MuiTextField } from '@material-ui/core';

// TODO: this is just an example,
const TextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'rgba(255, 255, 255, 0.87)',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'rgba(255, 255, 255, 0.87)',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
            '&:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
            },
        },
    },
})(MuiTextField);

export default TextField;
