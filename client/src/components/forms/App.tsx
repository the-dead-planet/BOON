import React from 'react';
import { makeStyles, createStyles } from '@mui/styles';
import { Formik, Form, FormikValues, FormikHelpers } from 'formik';
import { Grid, Paper, Typography, Hidden, Alert, Theme } from '@mui/material';
import { withValidationList } from '../../utils/withValidation';
import image from '../../img/content/vintage/watch.jpg';
import { Mode } from '../../logic/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formPaper: {
            color: theme.palette.text.primary,
            width: '100%',
            maxWidth: '70em',
            margin: '0 auto',
            overflow: 'hidden',
        },
        img: {
            display: 'block',
            // height: "auto",
            width: '100%',
            objectFit: 'cover',
            margin: '0 auto',
        },
        content: {
            padding: '6em',
            [theme.breakpoints.down('sm')]: {
                padding: '2em',
            },
        },
        error: {
            margin: '1em 0',
        },
    })
);

interface GridFormProps {
    children: React.ReactChild | Array<React.ReactChild | undefined> | undefined;
    title?: string;
}

// Centered form wrapped in a grid on paper
export const AppFormLayout = ({ children, title }: GridFormProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.formPaper}>
            <Grid container direction="row">
                <Hidden smDown>
                    <Grid item xs={6}>
                        <img className={classes.img} src={image} />
                    </Grid>
                </Hidden>

                <Grid container direction="column" justifyContent="center" item xs={12} md={6} className={classes.content}>
                    {title && (
                        <Grid item>
                            <Typography color="textPrimary" align="center" variant="h4" gutterBottom>
                                {title}
                            </Typography>
                        </Grid>
                    )}

                    {children}
                </Grid>
            </Grid>
        </Paper>
    );
};

// const EmailValidator = _;
// TODO: add a mechanism from router to make sure user wants to close the window if the forms are partially filled but not submitted
interface Props {
    mode: Mode;
    initialValues: { [field: string]: unknown; };
    onSubmit?: (values:  { [field: string]: unknown; }, formikHelpers: FormikHelpers<FormikValues>) => void | Promise<unknown>
    validate?: (values:  { [field: string]: unknown; }) => void;
    validationSchema?: unknown;
    children: React.ReactElement;
    submitSection: React.ReactNode;
    submitPos?: 'bottom' | 'right';
    error?: string;
    content?: React.ReactNode;
}

/* 
    Raw form to use in components with paper.
    Provide either validate or validationSchema
*/
// TODO: handle providing both validate and validationSchema / provide validate as a function
export const AppForm: React.FC<Props> = ({
    initialValues,
    onSubmit,
    validationSchema,
    submitSection,
    children,
    error,
    content,
}: Props) => {
    const classes = useStyles();

    // Disable submit button if errors appear, enable if all input values meet validation criteria
    // const [submitDisabled, setDisabled] = useState(false);

    return (
        <Formik
            initialValues={initialValues as FormikValues}
            onSubmit={onSubmit ?? (() => {})}
            // validate={validate}
            validationSchema={validationSchema}
        >
            {({ errors, touched }) => {
                return (
                    <Form>
                        <Grid container justifyContent="center">
                            {content}

                            {error && (
                                <Grid item xs={12} className={classes.error}>
                                    <Alert variant="filled" severity="error">
                                        {error}
                                    </Alert>
                                </Grid>
                            )}

                            {withValidationList(children, errors, touched)}

                            {/* This prop should receive at least a button with type submit */}
                            {submitSection}
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};
