import React, { useState, useEffect } from 'react';
// import moment from 'moment';
import postsService from '../services/postsService';
import sprintsService from '../services/sprintsService';
import PostForm from '../components/forms/Post';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';
import { useParams } from 'react-router-dom';

const AddPost = ({ user, sprintId, push }) => {
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

    return (
        <React.Fragment>
            <NavBar user={user} />
            <PostForm
                title={sprint ? `Add post to sprint ${sprint.number}` : `Add post`}
                initialValues={{
                    project: '',
                    title: '',
                    body: '',
                }}
                onSubmit={data => {
                    const extendedData = {
                        ...data,
                        sprintId: id,
                        model: 'Sprint',
                    };
                    return postsService.add(extendedData);
                }}
            />
        </React.Fragment>
    );
};

export default authenticatedPage(withPush(AddPost));
