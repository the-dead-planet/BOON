import React from 'react';
// import moment from 'moment';
import postsService from '../services/postsService';
import PostForm from '../components/forms/PostForm';
import { authenticatedPage } from '../components/authenticatedPage';
import { withPush } from '../utils/routingDecorators';
// import { FORMIK_DATE_FORMAT } from '../utils/constants';
import NavBar from '../components/NavBar';
import '../styles/main.css';
import { useParams } from 'react-router-dom';

const AddPost = ({ user, sprintId, push }) => {
    const { id } = useParams();

    return (
        <React.Fragment>
            <NavBar user={user} />
            <PostForm
                title="Add new post"
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
