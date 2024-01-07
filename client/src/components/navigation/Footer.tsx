import classNames from 'classnames';
import { Grid, Container, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
// import { Link } from '../../utils/Link';
import { ThemeType } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        footer: {
            marginTop: '6em !important',
            paddingTop: '2em',
            minHeight: '200px',
            width: '100%',
            backgroundColor: theme.palette.primary.main,
            color: 'rgba(255, 255, 255, .6)',
            borderRadius: '20px 20px 0 0',
            position: 'relative',
            '&::after': {
                content: "''",
                position: 'absolute',
                top: '-50px',
                bottom: '100%',
                left: 0,
                right: 0,
                borderStyle: 'solid',
                borderWidth: '0 0 2px 0',
                borderColor: theme.palette.primary.main,
                borderRadius: '20px',
                zIndex: 10,
            },
        },
    })
);

interface Props {
    themeType: ThemeType;
}

const Footer = ({ themeType }: Props) => {
    const classes = useStyles();

    return (
        <Container maxWidth="xl" className={classNames(classes.footer, { ['frostic']: themeType === 'frostic' })}>
            <Grid container justifyContent="space-around" alignItems="center">
                Footer content
            </Grid>
        </Container>
    );
};

export default Footer;
