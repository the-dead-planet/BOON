import { ReactChild, ReactChildren } from 'react';

type Children = ReactChild | ReactChildren | Array<ReactChild>;
type Mode = 'light' | 'dark' | undefined;
type DrawerVariant = 'persistent' | 'temporary';
type Input =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';

interface UserObject {
    _id: string;
    email: string;
    publicName: string;
    darkMode: boolean | undefined;
}

interface UserData {
    objectId: string;
    email: string;
    publicName: string;
    darkMode: boolean | undefined;
}

interface Auth {
    username: string;
    password: string;
    team: string;
    email: string;
}

interface Login {
    email: string;
    password: string;
}

type User = UserObject | undefined | null;

interface StateType {
    user: User | null;
    whoamiRequestDone: boolean;
    mode: Mode;
    notifications: Array<Notification>;
    data: StateData;
}

type StateDataFunc = () => StateData;

type StateData = {
    projects: Map<string, Project>;
    sprints: Map<string, Sprint>;
    posts: Map<string, Post>;
    comments: Map<string, Comment>;
    teams: Map<string, Team>;
    users: Map<string, User>;
    likes: Map<string, Like>;
};

// TODO: consider using `keyof StateData` instead.
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types
type StateDataKeys = 'posts' | 'comments' | 'likes' | 'sprints' | 'projects' | 'teams' | 'users';

interface DataItem {
    title: string;
    src: string;
}

interface Action {
    name: string;
    path: string;
}
interface Jumbotron {
    img?: string;
    title: string;
    subtitle: string;
    actions?: Array<Action>;
    onClick?: any;
}

interface Drawer {
    variant: DrawerVariant;
}

interface Comment {
    _id: string;
    author: string;
    likes: Array<Like>;
    body: string;
    created: Date;
    edited: Date;
}

interface CommentData {
    objectId?: string;
    body: string;
}

interface Like {
    _id: string;
    author: string;
    type: 'Thumb up' | 'Thumb down' | 'Heart';
    created: Date;
}

interface LikeData {
    objectId?: string;
    type: 'Thumb up' | 'Thumb down' | 'Heart';
}

interface ValidationError {
    error: string;
    touched: boolean;
}

interface PostLayout {
    id: string;
    title: string;
    subtitle: string;
    body?: string;
    content?: React.ReactElement;
    additional?: any;
}

interface Sprint {
    _id: string;
    number: number;
    dateFrom: Date;
    dateTo: Date;
    title: string;
    body: string;
    posts: Array<string>;
    comments: Array<string>;
    likes: Array<string>;
    author: User;
    created: Date;
    edited: Date;
}

interface SprintData {
    objectId?: string;
    number: number;
    dateFrom: string;
    dateTo: string;
    title: string;
    body: string;
}

interface Post {
    _id: string;
    author: User;
    title: string;
    body: string;
    comments: Array<string>;
    likes: Array<string>;
    created: Date;
    edited: Date;
}

interface PostData {
    objectId?: string;
    title: string;
    body: string;
}

interface Project {
    _id: string;
    author: User;
    title: string;
    body: string;
    posts: Array<string>;
    created: Date;
    edited: Date;
}

interface ProjectData {
    objectId?: string;
    title: string;
    body: string;
}

interface Team {
    _id: string;
    title: string;
    body: string;
    members: Array<string>;
    created: Date;
    edited: Date;
}

interface TeamData {
    objectId?: string;
    title: string;
    body: string;
}

type MongoObject = Post | Sprint | Project | Comment | Like | UserObject | Team;
type Model = 'Sprint' | 'Post' | 'Project' | 'Team' | 'Comment' | 'Like';
type Path = 'author' | 'posts' | 'comments' | 'likes' | 'sprints' | 'projects' | 'teams' | 'users';

interface SprintSubmit {
    number: number;
    dateFrom: string;
    dateTo: string;
    title: string;
    body: string;
}

interface PostSubmit {
    project: string;
    title: string;
    body: string;
}

interface ProjectSubmit {
    title: string;
    body: string;
}

interface CommentSubmit {
    body: string;
}

interface Submit {
    project?: string;
    title?: string;
    body?: string;
    number?: number;
    dateFrom?: Date;
    dateTo?: Date;
}

interface FeedLayout {
    posts: Array<{
        id: string;
        title: string;
        subtitle: string;
        body?: string;
        content?: React.ReactElement;
        additional?: any;
    }>;
}

interface Landing {
    user: User;
    mode: Mode;
    setMode: any;
    title: string;
    subtitle: string;
    button: { name: string; path: string };
}

interface Notification {
    id: string;
    message: string;
}

interface NotificationProps {
    notifications: Array<Notification>;
    onNotificationShown: any;
    addNotification: any;
}

interface LinkTo {
    name?: string;
    path?: string;
}

interface MenuItem {
    name: string;
    path?: string;
    onClick?: any;
}

type MenuItems = Array<MenuItem>;

type DataPath = 'sprints' | 'posts' | 'comments' | 'projects' | 'likes' | 'users' | 'teams';
type DataPathParent = 'sprints' | 'posts' | 'projects' | 'teams';

// Used for deletion, pass deleted object as a child
type DataPairs =
    | { parent: 'sprints'; child: 'posts'; parentId?: string; childId: string }
    | { parent: 'sprints'; child: 'comments'; parentId?: string; childId: string }
    | { parent: 'sprints'; child: 'likes'; parentId?: string; childId: string }
    | { parent: 'posts'; child: 'comments'; parentId?: string; childId: string }
    | { parent: 'posts'; child: 'likes'; parentId?: string; childId: string }
    | { parent: 'projects'; child: 'comments'; parentId?: string; childId: string }
    | { parent: 'projects'; child: 'likes'; parentId?: string; childId: string }
    | { parent: 'teams'; child: 'users'; parentId?: string; childId: string }
    | { parent: undefined; child: 'sprints'; parentId?: string; childId: string }
    | { parent: undefined; child: 'projects'; parentId?: string; childId: string }
    | { parent: undefined; child: 'teams'; parentId?: string; childId: string };

interface Page {
    path?: string;
    currentId?: string;
    nextId?: string;
    previousId?: string;
    primary?: string;
    secondary?: string;
    list?: Array<PageListItem>;
}

interface PageListItem {
    path: string;
    id: string;
    name: string;
    number?: number;
}

interface NavContentItem {
    header: string;
    list: Array<NavListItem>;
    activeId?: string;
}

interface NavListItem {
    id: string;
    name: string;
    path: string;
    hash?: boolean; // if path is refering to an id of any of the html components on the page, use HashLink, otherwise use Link
}

type NavContent = Array<NavContentItem>;

interface SideColumn {
    header: string;
    body: string;
}

export type {
    Children,
    DataItem,
    Auth,
    Login,
    User,
    UserData,
    Mode,
    DrawerVariant,
    Input,
    Drawer,
    StateType,
    StateDataFunc,
    StateData,
    StateDataKeys,
    Action,
    Jumbotron,
    Comment,
    CommentData,
    Like,
    LikeData,
    Team,
    TeamData,
    ValidationError,
    PostLayout,
    Post,
    PostData,
    Sprint,
    SprintData,
    MongoObject,
    Model,
    Path,
    Project,
    ProjectData,
    SprintSubmit,
    PostSubmit,
    ProjectSubmit,
    CommentSubmit,
    Submit,
    FeedLayout,
    Landing,
    Notification,
    NotificationProps,
    LinkTo,
    MenuItem,
    MenuItems,
    DataPath,
    DataPathParent,
    DataPairs,
    Page,
    NavContent,
    SideColumn,
};
