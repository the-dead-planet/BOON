import { Container } from '@mui/material';
import Card from '../Card';
import { Format } from '../../constants/dateFormats';
// import usersService from '../../../services/usersService';
import { User, Post, Project, Comment, Like, Sprint } from '../../logic/types';
import * as Utils from '../../utils';
import * as AppState from '../../app-state';

// Detailed view of a sprint object.
// To be used to display all available information about a given instance, i.e.
// on a detail page.


interface Props {
    post: Post | undefined;
    projects: Map<string, Project>;
    sprints: Map<string, Sprint>;
    comments: Map<string, Comment>;
    likes: Map<string, Like>;
    users: Map<string, User>;
    toggleCommentsPanel: (toggle: boolean) => void;
}

export const SinglePost = ({
    post,
    sprints,
    projects,
    comments,
    likes,
    users,
    toggleCommentsPanel,
}: Props) => {
    const getSprint = (id: string) =>
        [...sprints.values()]?.reduce((acc, sprint) => (sprint.posts.includes(id) ? sprint : acc));

    const getProject = (id: string) =>
        [...projects.values()]?.reduce((acc, project) => (project.posts.includes(id) ? project : acc));

    return post ? (
        <Container maxWidth="md">
            <Card
                object={post}
                model={'Post'}
                comments={post.comments.map((id) => comments.get(id))}
                likes={post.likes.map((id) => likes.get(id))}
                author={'author' in post && post.author ? users.get(post.author?._id)?.publicName ?? 'Unknown user' : 'Unknown user'}
                title={post.title}
                titleLink={`/posts/${post._id}`}
                created={Utils.DateTime.toFormat(post.created, Format.EXT_DATE_FORMAT)}
                tags={[
                    { title: `Sprint ${getSprint(post._id).number}`, link: `/sprints/${getSprint(post._id)._id}` },
                    { title: getProject(post._id).title, link: `/projects/${getProject(post._id)._id}` },
                ]}
                body={post.body}
                menuItems={[
                    {
                        name: 'Go to related project',
                        path: `/projects/${
                            [...projects.entries()]
                                .filter(([_projectId, proj]) => proj.posts.includes(post._id))
                                .flat()[0] || ''
                        }`,
                    },
                ]}
                removeObject={(obj) =>
                    AppState.removeObject({ child: 'posts', childId: obj.objectId, parent: 'sprints', parentId: getSprint(post._id)?._id })
                }
                toggleCommentsPanel={toggleCommentsPanel}
                divider={true}
                hover={true}
                linkBack={{ name: 'Home', path: '/' }}
            />
            {/* TODO: Add list of projects to a side column on the right and remove pagination */}
            {/* TODO: Comments should expand under a post, show 3 by default and add a "show all" button to expand further */}
            {/* TODO: Quote should be only inserted in Sprints */}
        </Container>
    ) : (
        <></>
    );
};
