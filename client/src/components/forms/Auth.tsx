import { FormikHelpers, FormikValues } from 'formik';
import { makeStyles, createStyles } from '@mui/styles';
// import EmailValidator from 'email-validator';
import * as Yup from 'yup';
import { Button, Box, Tooltip, Typography, Grid, Theme } from '@mui/material';
import { Link } from '../../utils/Link';
import { AppFormLayout, AppForm } from './App';
import { GridField } from './GridFields';
import { IconButton } from '../mui-styled/IconButton';
import { CatIconOutlined, TreeIconOutlined, PartyIconOutlined } from '../../icons/Icons';
import * as Hooks from '../../hooks';
import * as AppState from '../../app-state';

const useStyles = makeStyles((_theme: Theme) =>
    createStyles({
        submitSection: {
            marginTop: '2em',
            '& button': {
                width: '48%',
            },
            '& button:nth-child(odd)': {
                marginRight: '2%',
            },
            '& button:nth-child(even)': {
                marginLeft: '2%',
            },
        },
        icons: {
            margin: '0 auto 1em auto',
            display: 'inline-block',
            '& button': {
                padding: '1em .5em',
            },
        },
        subtitle: {
            marginBottom: '1em',
        },
    })
);

interface Props {
    register: boolean;
    initialValues: { [field: string]: unknown; };
    onSubmit: (values: { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>;
}

// TODO: Add checkbox for 'stay logged in' and use cookies for keeping auth
// TODO: Consider adding one page with both login and register divided by a vertical Divider instead of two separate
const AuthForm = ({ register, initialValues, onSubmit }: Props) => {
    const classes = useStyles();
    const ui = Hooks.useSubject(AppState.ui$);

    const validationSchema = (_values: { [field: string]: unknown; }) =>
        Yup.object().shape({
            email: Yup.string().email().required('Required'),
            password: Yup.string()
                .required('No password provided.')
                .min(8, 'Password is too short - should be 8 chars minimum.')
                .matches(/(?=.*[0-9])/, 'Password must contain a number.'),
        });

    return (
        <AppFormLayout title={register ? 'Register' : 'Login'}>
            <AppForm
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={register ? validationSchema : undefined}
                content={
                    <>
                        <Box className={classes.icons}>
                            <Tooltip title={`${register ? 'Register' : 'Log in'} with Catz`} placement="bottom" arrow>
                                <IconButton>
                                    <CatIconOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={`${register ? 'Register' : 'Log in'} with Treez`} placement="bottom" arrow>
                                <IconButton>
                                    <TreeIconOutlined />
                                </IconButton>
                            </Tooltip>
                            <Tooltip
                                title={`${register ? 'Register' : 'Log in'} with Partiez`}
                                placement="bottom"
                                arrow
                            >
                                <IconButton>
                                    <PartyIconOutlined />
                                </IconButton>
                            </Tooltip>
                        </Box>

                        <Typography
                            color="textPrimary"
                            variant="body2"
                            align="center"
                            gutterBottom
                            className={classes.subtitle}
                        >
                            Or use your e-mail address
                        </Typography>
                    </>
                }
                submitSection={
                    <Grid item xs={12} className={classes.submitSection}>
                        <Link to={`/${register ? 'login' : 'register'}${location?.search ? location.search : ''}`}>
                            <Button variant="outlined" color={ui.mode === 'dark' ? undefined : 'primary'} type="submit">
                                {register ? 'Log in' : 'Register'}
                            </Button>
                        </Link>
                        <Button
                            variant={ui.mode === 'dark' ? 'outlined' : 'contained'}
                            color={ui.mode === 'dark' ? undefined : 'primary'}
                            title="submit"
                            type="submit"
                        >
                            {register ? 'Register' : 'Log in'}
                        </Button>
                    </Grid>
                }
            >
                <>
                    <GridField
                        xs={12}
                        required
                        fullWidth
                        variant="outlined"
                        name="email"
                        id="auth-email"
                        label={`${!register ? 'Username / ' : ''}E-mail`}
                    />

                    {register ? (
                        <GridField
                            xs={12}
                            fullWidth
                            variant="outlined"
                            required
                            name="username"
                            id="auth-username"
                            label="Username"
                        />
                    ) : null}

                    <GridField
                        xs={12}
                        fullWidth
                        variant="outlined"
                        required
                        type="password"
                        name="password"
                        id="auth-password"
                        label="Password"
                    />
                </>
            </AppForm>
        </AppFormLayout>
    );
};

export default AuthForm;
