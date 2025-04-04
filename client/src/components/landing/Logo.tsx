import { makeStyles, createStyles } from '@mui/styles';
import { HashLink } from '../../utils/Link';
import { Typography, Theme } from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        offset: {
            padding: '0.2em',
        },
    })
);

interface Props {
    id?: string;
}

export const Logo = ({ id = '#main-content' }: Props) => {
    const classes = useStyles();

    return (
        <HashLink to={id}>
            <Typography variant="h4">— The —</Typography>
            <Typography variant="h1">BOON</Typography>
            <Typography className={classes.offset} variant="body2" gutterBottom>
                UK <VolumeUpIcon fontSize="small" />
                /bu:n/ | US <VolumeUpIcon fontSize="small" /> /bu:n/
            </Typography>
        </HashLink>
    );
};
