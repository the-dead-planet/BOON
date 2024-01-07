import mongoose from 'mongoose';
import { generateData } from './seeds-data';
import * as Models from '../models';

const Sprint = mongoose.model('Sprint');
const Post = mongoose.model('Post');
const Project = mongoose.model('Project');
const User = mongoose.model('User');
const Team = mongoose.model('Team');
const Comment = mongoose.model('Comment');
const Like = mongoose.model('Like');

/**
 * Populates database with demo "lorem ipsum" content.
 * @param password 
 * @returns 
 */
export const populateDataBaseWithDemoContent = async (password: string) => {
    const data = generateData(password);

    return removeData([Sprint, Post, Project, Team, Comment, Like, User])
        .then((_res) => createTeams(data.teams, []))
        .then((_teams) => createUsers(data.users, []))
        .then((users) =>
            createProjects(data.projects, users)
                .then(() => createSprints(data.sprints, users))
                .then(() => createPosts(data.posts, users))
                .then(() => createComments(data.comments, users, [Sprint, Post]))
                .then(() => createLikes(data.likes, users, [Sprint, Post, Comment]))
        )
        .then(() => addIdReferences(Team, User, 'members'))
        .then(() => addIdReferences(Sprint, Post, 'posts'))
        .then(() => addIdReferences(Project, Post, 'posts'))
        .then(() => console.log('Finished creating data'));
};

/**
 * Removes data from all models.
 * @param models 
 * @returns 
 */
const removeData = async (models: typeof mongoose.Model[]) =>
    Promise.all(
        models.map((model) =>
            model
                .deleteMany({})
                .then((res) => console.log(res))
                .catch((err) => console.log(err))
        )
    );

/**
 * Generic function which creates a single object based on given data.
 * @param model 
 * @param data 
 * @returns 
 */
async function createObject<T>(model: typeof mongoose.Model, data: unknown): Promise<T> {
    return model.create(data);
}

/**
 * Generic function to create all objects in one schema as promise.all
 * @param create 
 * @param data 
 * @param args 
 * @returns 
 */
async function createObjects<TRaw, T>(
    create: (datum: TRaw, users: Models.UserSchema[]) => Promise<T>,
    data: TRaw[],
    users: Models.UserSchema[]
): Promise<T[]> {
    return Promise.all(data.map((datum) => create(datum, users)));
};

/**
 * Creates one team.
 * @param datum 
 * @returns 
 */
const createTeam = async (datum: Models.TeamSchemaRaw, _users: Models.UserSchema[]): Promise<Models.TeamSchema> => {
    return createObject<Models.TeamSchema>(Team, {
        title: datum.title,
        body: datum.body,
    });
}

/**
 * Creates many teams.
 * @param data 
 * @param users 
 * @returns 
 */
const createTeams = async (data: Models.TeamSchemaRaw[], users: Models.UserSchema[]): Promise<Models.TeamSchema[]> => {
    return createObjects<Models.TeamSchemaRaw, Models.TeamSchema>(createTeam, data, users);
}

/**
 * Creates one user.
 * @param datum 
 * @returns 
 */
const createUser = async (datum: Models.UserSchemaRaw): Promise<Models.UserSchema> => {
    return User.register(
        new User({
            username: datum.username,
            publicName: datum.publicName,
            role: datum.role,
            country: datum.country,
            joined: datum.joined,
            left: datum.left,
            skills: datum.skills,
            auth: datum.auth,
        }),
        datum.password
    ) as unknown as Models.UserSchema;
}

/**
 * Creates many users.
 * @param data 
 * @param users 
 * @returns 
 */
const createUsers = async (data: Models.UserSchemaRaw[], users: Models.UserSchema[]): Promise<Models.UserSchema[]> => {
    return createObjects<Models.UserSchemaRaw, Models.UserSchema>(createUser, data, users);;
}

/**
 * Creates one project.
 * @param datum 
 * @param users 
 * @returns 
 */
const createProject = async (datum: Models.ProjectSchemaRaw, users: Models.UserSchema[]): Promise<Models.ProjectSchema> => {
    return createObject(Project, {
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });
}

/**
 * Creates many projects and assigns a random users as authors of each of them.
 * @param data 
 * @param users 
 * @returns 
 */
const createProjects = (data: Models.ProjectSchemaRaw[], users: Models.UserSchema[]): Promise<Models.ProjectSchema[]> => {
    return createObjects<Models.ProjectSchemaRaw, Models.ProjectSchema>(createProject, data, users);
}

/**
 * Creates one sprint and assigns to a random user as the author.
 * Creates many posts associated with that sprint.
 * @param datum 
 * @param users 
 * @returns 
 */
const createSprint = async (datum: Models.SprintSchemaRaw, users: Models.UserSchema[]): Promise<Models.SprintSchema> => {
    return createObject(Sprint, {
        number: datum.number,
        dateFrom: datum.dateFrom,
        dateTo: datum.dateTo,
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });
}

/**
 * Creates many sprints with their associated posts.
 * @param data 
 * @param users 
 * @returns 
 */
const createSprints = async (data: Models.SprintSchemaRaw[], users: Models.UserSchema[]): Promise<Models.SprintSchema[]> => {
    return createObjects(createSprint, data, users);
}

/**
 * Creates one post and assigns it to a random user (author) and project. 
 * Adds its ID to sprint.posts array.
 * @param datum 
 * @param users 
 * @returns 
 */
const createPost = async (datum: Models.PostSchemaRaw, users: Models.UserSchema[]): Promise<Models.PostSchema> => {
    return createObject(Post, {
        title: datum.title,
        body: datum.body,
        author: generateRandom(users)._id,
    });
}

/**
 * Creates many posts related to one sprint.
 * @param data 
 * @param users 
 * @returns 
 */
const createPosts = async (data: Models.PostSchemaRaw[], users: Models.UserSchema[]): Promise<Models.PostSchema[]> => {
    return createObjects<Models.PostSchemaRaw, Models.PostSchema>(createPost, data, users);
}

/**
 * Creates many comments.
 * @param datum 
 * @param users 
 * @returns 
 */
const createComment = async (datum: Models.CommentSchemaRaw, users: Models.UserSchema[]): Promise<Models.CommentSchema> => {
    return createObject(Comment, {
        body: datum.body,
        author: generateRandom(users)._id,
    });
}

/**
 * Creates comments and randomly assigns them to sprints and posts .comments array.
 * One user can add multiple comments to multiple or the same object.
 * @param data 
 * @param users 
 * @param models 
 * @returns 
 */
const createComments = async (data: Models.CommentSchemaRaw[], users: Models.UserSchema[], models: typeof mongoose.Model[]): Promise<Models.CommentSchema[]> => {
    return Promise.all(
        models.map((model) =>
            model
                .find({})
                .then((objects) =>
                    objects.map((object) =>
                        Promise.all(
                            Array.from({ length: random(10) }, () => 1).map(() =>
                                createComment(data[random(data.length)], users).then((comment) =>
                                    object.comments.push(comment._id)
                                )
                            )
                        ).then(() => object.save())
                    )
                )
        )
    ).then(() => Comment.find({})); // TODO: workaround, without this likes were not populating for Comment schema
}

// Create Likes
const createLike = async (datum: Models.LikeSchemaRaw, user: Models.UserSchema): Promise<Models.LikeSchema> =>
    createObject(Like, {
        type: datum.type,
        author: user._id,
    });

/**
 * Create random likes and add to selected sprints and posts.
 * Max. one like per user-post or user-sprint combination.
 * Not all users have to give likes, not all objects need to receive likes.
 * @param data 
 * @param users 
 * @param models 
 * @returns 
 */
const createLikes = async (data: Models.LikeSchemaRaw[], users: Models.UserSchema[], models: typeof mongoose.Model[]): Promise<Models.LikeSchema[]> => {
    const createdLikes: Models.LikeSchema[] = [];

    for (const model of models) {
        const modelObjects = await model.find({});

        for (const modelObject of modelObjects) {
            const likePromises: Promise<Models.LikeSchema>[] = users
                .filter((_user, i) => i % random(users.length) === 0)
                .map((user) =>
                    // console.log("Creating like in model", model, "for object", object.title)
                    createLike(data[random(data.length)], user).then((like) => modelObject.likes.push(like._id))
                );

            const likes: Models.LikeSchema[] = await Promise.all(likePromises);
            const like = await modelObject.save();
            createdLikes.push(like);
        }
    }

    return createdLikes;
}

/**
 * Add ID references (only) to parent objects, e.g. project.posts, sprint.posts.
 * Distribute children evenly among all parent objects.
 * @param parentModel 
 * @param childModel 
 * @param attrName 
 * @returns 
 */
const addIdReferences = (parentModel: typeof mongoose.Model, childModel: typeof mongoose.Model, attrName: string) => {
    return parentModel.find({}).then((parents) =>
        childModel.find({}).then((children) =>
            parents.map((parent, parentInd) => {
                children
                    .filter((child, childInd) => parentInd === childInd % parents.length)
                    .map((child) => {
                        // console.log(`parent `, parentModel, ` adding child`, childModel)
                        return parent[attrName].push(child._id);
                    });
                return parent.save();
            })
        )
    );
}

function generateRandom<T>(objects: T[]): T {
    return objects[random(objects.length)];
};

const random = (n: number) => Math.floor(Math.random() * n);
