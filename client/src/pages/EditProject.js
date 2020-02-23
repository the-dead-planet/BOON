import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
// import moment from 'moment';
import projectsService from '../services/projectsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import '../styles/main.css';

const EditProject = ({ user, push }) => {
    const { id } = useParams();

    const [project, setProject] = useState(null);

    const getProject = async () => {
        const project = await projectsService.getOne({ objectId: id });
        setProject(project);
    };

    useEffect(() => {
        if (!project) {
            getProject();
        }
    });

    return (
        <React.Fragment>
            <NavBar user={user} />
            <h1 className="center">Edit Project {id}</h1>
            {!project ? (
                <Loading />
            ) : (
                <Formik
                    initialValues={{
                        title: project.title,
                        body: project.body,
                    }}
                    onSubmit={data => {
                        projectsService.update({ ...data, objectId: id }).then(() => {
                            push('/projects');
                        });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="center">
                                <p>
                                    Title
                                    <Field type="text" name="title" />
                                </p>
                                <p>
                                    Description
                                    <Field type="text" name="body" />
                                </p>
                                <p>
                                    <button type="submit">Submit</button>
                                </p>
                            </div>
                        </Form>
                    )}
                </Formik>
            )}
        </React.Fragment>
    );
};

export default authenticatedPage(withPush(EditProject));
