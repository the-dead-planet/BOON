import React from "react";

type ThemeType = 'default' | 'frostic' | 'vintage' | 'custom' | undefined;
type Mode = 'light' | 'dark' | undefined;
type DrawerVariant = 'persistent' | 'temporary';
type Col = boolean | 'auto' | 2 | 1 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | undefined;
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

type AuthRole = 'admin' | 'editor' | 'reader' | 'guest';

interface UserObject {
    _id: string;
    email: string;
    publicName: string;
    role: AuthRole;
    mode: boolean | undefined;
}

interface UserData {
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
    onClick?: (event: React.MouseEvent) => void;
}

interface Drawer {
    variant: DrawerVariant;
}

interface Comment {
    _id: string;
    author: string;
    likes: Array<Like>;
    body: string;
    created: string;
    edited: Date;
}

interface CommentData {
    body: string;
}

interface Like {
    _id: string;
    author: string;
    type: 'Thumb up' | 'Thumb down' | 'Heart';
    created: Date;
}

interface LikeData {
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
    content?: React.ReactNode;
    additional?: React.ReactNode;
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

type O = { [key in string]: string };
interface CommentSubmit extends O {
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
        content?: React.ReactNode;
        additional?: React.ReactNode;
    }>;
}

interface Landing {
    user: User;
    mode: Mode;
    onModeChange: (mode: Mode) => void;
    title: string;
    subtitle: string;
    button: { name: string; path: string };
}

interface Notification {
    id: number;
    message: string;
}

interface NotificationProps {
    notifications: Notification[];
    onNotificationShown: (notificationId: string) => void;
    addNotification: (notification: Notification) => void;
}

interface LinkTo {
    name?: string;
    path?: string;
}

interface MenuItem {
    name: string;
    path?: string;
    onClick?: () => void;
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
    links?: string[];
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

type Variant = 'primary' | 'secondary' | undefined;
type Side = 'left' | 'right';

interface NavPanel {
    side: Side;
    content: NavContent;
    variant?: Variant;
}

interface SideColumn {
    header: string;
    body: string;
}

interface CommentsProps {
    parentModel: Model;
    parentId: string;
    addComment: (id: string, comment: Comment) => void;
    removeComment: (comment: WithObjectId) => void;
}

interface DialogButton {
    text: string;
    onClick: () => void;
}

interface DialogProps {
    open: boolean;
    handleClose: () => void;
    message: string;
    contextText?: string;
    content?: React.ReactNode;
    buttonOk: DialogButton;
    fullScreen?: boolean;
}

interface NavButton {
    name: string;
    onClick?: () => void;
    path?: string;
}

type PostsListVariant = 'tiles' | 'full-width';

type CardSubtitleType = 'date' | 'project';

interface Tag {
    title: string;
    link?: string;
}

interface WithObjectId {
    objectId: string;
}

interface RemoveObjectData {
    child: StateDataKeys;
    parent?: StateDataKeys;
    childId: string;
    parentId?: string;
}

export interface UI {
    theme: ThemeType;
    mode: Mode;
}

export type {
    Col,
    DataItem,
    Auth,
    Login,
    User,
    UserData,
    Mode,
    ThemeType,
    DrawerVariant,
    Input,
    Drawer,
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
    UserObject,
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
    Variant,
    Side,
    NavPanel,
    SideColumn,
    CommentsProps,
    DialogButton,
    DialogProps,
    NavButton,
    PostsListVariant,
    CardSubtitleType,
    Tag,
    WithObjectId,
    RemoveObjectData
};
