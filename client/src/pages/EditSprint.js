import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import moment from 'moment';
import sprintsService from '../services/sprintsService';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import Loading from '../components/Loading';
import '../styles/main.css';

const EditSprint = ({ match, user, push }) => {
    const { id } = useParams();

    const [sprint, setSprint] = useState(null);

    const getSprint = async () => {
        const sprint = await sprintsService.getOne({ objectId: id });
        console.log(sprint);
        setSprint(sprint);
    };

    useEffect(() => {
        if (!sprint) {
            getSprint();
        }
    });

    console.log('sprint is: ', sprint);

    return (
        <React.Fragment>
            <NavBar user={user} />
            <h1 className="center">Edit Sprint {id}</h1>
            {!sprint ? (
                <Loading />
            ) : (
                <Formik
                    initialValues={{
                        number: sprint.number,
                        title: sprint.title,
                        dateFrom: moment(sprint.dateFrom).format(FORMIK_DATE_FORMAT),
                        dateTo: moment(sprint.dateTo).format(FORMIK_DATE_FORMAT),
                        body: sprint.body,
                    }}
                    onSubmit={data => {
                        sprintsService.update({ ...data, objectId: id }).then(() => {
                            push('/sprints');
                        });
                    }}
                >
                    {() => (
                        <Form>
                            <div className="center">
                                <p>
                                    Number
                                    <Field type="number" name="number" />
                                </p>
                                <p>
                                    Title
                                    <Field type="text" name="title" />
                                </p>
                                <p>
                                    Date From
                                    <Field type="date" name="dateFrom" />
                                </p>
                                <p>
                                    Date To
                                    <Field type="date" name="dateTo" />
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

export default authenticatedPage(withPush(EditSprint));
