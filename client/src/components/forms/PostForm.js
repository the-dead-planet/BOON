import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import projectsService from '../../services/projectsService';

const PostForm = props => {
    const useStyles = makeStyles(theme => ({
        root: {
            height: '100%',
            flexGrow: 1,
            flexWrap: 'wrap',
            display: 'flex',
            // alignContent: 'center',
            justifyContent: 'center',
            margin: '3% auto',
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
            width: '500px', //TODO: correct it
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();

    const [projects, setProjects] = useState(null);

    const getProjects = async () => {
        let res = await projectsService.getAll();
        setProjects(res);
    };

    useEffect(() => {
        if (!projects) {
            getProjects();
        }
    });

    const [project, setProject] = React.useState('');

    // const inputLabel = React.useRef(null);
    // const [labelWidth, setLabelWidth] = React.useState(0);
    // React.useEffect(() => {
    //     setLabelWidth(inputLabel.current.offsetWidth);
    // }, []);

    const handleChange = event => {
        setProject(event.target.value);
    };

    const projectSelectList = projects
        ? projects.map(project => (
              <MenuItem key={project._id} value={project._id}>
                  {project.title}
              </MenuItem>
          ))
        : null;

    return (
        <Formik initialValues={props.initialValues} onSubmit={props.onSubmit}>
            {() => (
                <div className={classes.root}>
                    <Form>
                        <Paper className={classes.paper}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <h1>{props.title}</h1>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        className={classes.formControl}
                                        fullWidth
                                        as={FormControl}
                                        name="project"
                                        required
                                        id="add-post-project"
                                    >
                                        <InputLabel id="add-post-project-label">Project</InputLabel>
                                        <Select
                                            labelId="add-post-project-select"
                                            id="add-post-project"
                                            value={project}
                                            onChange={handleChange}
                                        >
                                            {projectSelectList}
                                        </Select>
                                    </Field>
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        as={TextField}
                                        name="title"
                                        required
                                        id="add-post-title"
                                        label="Post name"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        multiline
                                        rows="5"
                                        as={TextField}
                                        name="body"
                                        required
                                        id="add-post-body"
                                        label="How's this increment going to make the place a better world?"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button type="submit">Submit</Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Form>
                </div>
            )}
        </Formik>
    );
};

export default PostForm;
