import { makeStyles, createStyles } from '@mui/styles';
import { JUMBOTRON_HEIGHT, TOOLBAR_HEIGHT } from '../../styles/constants';
import { Link } from '../../utils/Link';
import { Grid, Button, Typography, Hidden, Grow, Theme } from '@mui/material';
import * as Routes from '../../routes';
import * as Types from '../../logic/types';
//import * as jumbotronLight from '../../img/landing/JumbotronLight.png';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        jumbotronImg: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: JUMBOTRON_HEIGHT,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            backgroundColor: '#000', // backgroundImage imported as a component in Layout.tsx
            boxShadow: '0px 2px 4px -1px rgba(0,0, 0.2)',
        },
        jumbotronContent: {
            marginTop: `${TOOLBAR_HEIGHT}px`,
            position: 'absolute',
            color: '#fff',
            height: `calc(${JUMBOTRON_HEIGHT} - ${JUMBOTRON_HEIGHT}px)`,
        },
        offset: {
            margin: theme.spacing(1),
        },
    })
);

const Jumbotron: React.FC<Types.Jumbotron> = ({ img = '', title = 'Hello', subtitle = 'Welcome', actions = [] }) => {
    const classes = useStyles();
    // TODO: use react-image
    const imgStyle = { backgroundImage: `url(${img})` };

    return (
        <>
            {/* Background image */}
            <div className={classes.jumbotronImg} style={imgStyle} />

            {/* Main content */}
            <Grow timeout={2000} in={true}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    className={classes.jumbotronContent}
                >
                    <Grid item xs={12} md={6} container alignItems="center" direction="column">
                        <Typography variant="h2">{title}</Typography>
                        <Typography variant="h4" gutterBottom>
                            {subtitle}
                        </Typography>

                        <Grid item container justifyContent="center">
                            {actions &&
                                actions.map((action, i) => (
                                    <Grid item key={`item-${i}`}>
                                        <Link to={`${action.path}?next=${Routes.Types.RouterPaths.Sprints}`}>
                                            <Button key={`button-${i}`} variant="contained" className={classes.offset}>
                                                {action.name}
                                            </Button>
                                        </Link>
                                    </Grid>
                                ))}
                        </Grid>
                    </Grid>

                    <Hidden smDown>
                        <Grid item md={6}></Grid>
                    </Hidden>
                </Grid>
            </Grow>
        </>
    );
};

export default Jumbotron;
