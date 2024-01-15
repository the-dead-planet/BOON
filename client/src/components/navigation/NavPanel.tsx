import classNames from 'classnames';
import { Typography, Box, Theme } from '@mui/material';
import { makeStyles, createStyles } from '@mui/styles';
import { NAVBAR_LEFT_WIDTH } from '../../styles/constants';
import { LinkComponent } from '../../utils/Link';
import * as Types from '../../logic/types';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sideCol: {
            // position: 'absolute',
            minWidth: `${NAVBAR_LEFT_WIDTH}px`,
            maxWidth: `${NAVBAR_LEFT_WIDTH}px`,
            [theme.breakpoints.only('xs')]: {
                minWidth: '100%',
                maxWidth: '100%',
            },
        },
        navContainer: ({ variant }: { variant: Types.Variant }) => ({
            padding: 0,
            width: '100%',
            border: `solid 1.5px ${variant === 'secondary' ? theme.palette.primary.main : theme.palette.primary.main}`,
            // borderTopWidth: "20px"
        }),
        navButton: {
            marginBottom: theme.spacing(1),
            padding: theme.spacing(1.5),
            border: `solid 4px ${theme.palette.secondary.main}`,
            textAlign: 'center',
            textTransform: 'uppercase',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.contrastText,
                cursor: 'pointer',
                boxShadow: `4px 4px ${theme.palette.secondary.dark}`,
            },
            '&:active': {
                backgroundColor: theme.palette.secondary.dark,
                borderColor: theme.palette.secondary.dark,
                boxShadow: `4px 4px ${theme.palette.primary.main}`,
            },
        },
        navTitle: ({ variant }: { variant: Types.Variant }) => ({
            backgroundColor: variant === 'secondary' ? theme.palette.primary.main : theme.palette.primary.main,
            color: 'rgba(255, 255, 255, .87)',
            padding: '.2em',
            textAlign: 'center',
            textTransform: 'uppercase',
        }),
        panelButton: {
            padding: '.2em .8em',
            '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, .06)',
            },
            '&:active': {
                backgroundColor: 'rgba(0, 0, 0, .1)',
            },
        },
        selected: (_obj: { variant: Types.Variant }) => ({
            textTransform: 'uppercase',
        }),
        sideColContainer: {
            marginBottom: theme.spacing(1),
            padding: '.4em',
            position: 'relative',
            '&::before': {
                content: "''",
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                border: `solid 1.5px ${theme.palette.primary.main}`,
            },
        },
        sideColTitle: {
            padding: theme.spacing(1.5, 0),
            textAlign: 'center',
            textTransform: 'uppercase',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.main,
        },
        sideColBody: {
            padding: theme.spacing(1),
            textAlign: 'center',
            // textAlign: "justify",
        },
    })
);

interface Props {
    variant?: Types.Variant;
    contents: Types.NavContent;
    sideColumn?: Types.SideColumn;
    createButton?: Types.NavButton;
}

// A temporary component that is going to be implemented in Layout in the long run.
export const NavPanel: React.FC<Props> = ({ variant, contents, createButton }) => {
    const classes = useStyles({ variant });
    const user = Hooks.useSubject(AppState.user$);
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        <Box className={classes.sideCol}>
            {/* Create button - to be displayed only if user has sufficient auth => admin or editor */}
            {/* TODO: Create a separate component which specifies components which require certain authorization */}
            {/* And include those in tests */}
            {createButton && user && ['admin', 'editor'].includes(user.role) ? (
                <Typography
                    variant="body1"
                    color="secondary"
                    className={classes.navButton}
                    onClick={createButton.onClick}
                >
                    {createButton.name}
                </Typography>
            ) : undefined}

            {/* Main navigation panel */}
            <Box className={classNames(classes.navContainer, { frostic: ui.theme === 'frostic' })}>
                {contents.map((content, index) => (
                    <Box key={index}>
                        <Typography variant="body2" className={classes.navTitle}>
                            {content.header}
                        </Typography>

                        {content.list.map((item, i) => (
                            <LinkComponent key={i} hash={item.hash || false} to={item.path}>
                                <Typography
                                    variant="body2"
                                    // color={variant}
                                    className={`${classes.panelButton} ${
                                        item.id === content.activeId ? classes.selected : undefined
                                    }`}
                                >
                                    {item.name}
                                </Typography>
                            </LinkComponent>
                        ))}
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

interface SideColProps {
    variant?: Types.Variant;
    header: string;
    body: string;
}

export const SideCol: React.FC<SideColProps> = ({ variant, header, body }) => {
    const classes = useStyles({ variant });
    const ui = Hooks.useSubject(AppState.ui$);

    return (
        <Box className={classes.sideCol}>
            <Box className={classNames(classes.sideColContainer, { frostic: ui.theme === 'frostic' })}>
                <Typography variant="h5" className={classes.sideColTitle}>
                    {header}
                </Typography>
                <Typography variant="body2" className={classes.sideColBody}>
                    {body}
                </Typography>
            </Box>
        </Box>
    );
};
