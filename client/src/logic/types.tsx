
type Mode = "light" | "dark" | undefined
type DrawerVariant = "persistent" | "temporary"
type Input =
    "button" | "checkbox" | "color" | "date" |
    "datetime-local" | "email" | "file" | "hidden" |
    "image" | "month" | "number" | "password" |
    "radio" | "range" | "reset" | "search" |
    "submit" | "tel" | "text" | "time" |
    "url" | "week"

type User = {
    _id: string,
    email: string,
    publicName: string,
    darkMode: boolean | undefined,
} | undefined

interface StateType {
    user: User | null,
    whoamiRequestDone: boolean,
    mode: Mode,
    notifications: Array<Notification>,
    data: StateData,
}

type StateDataFunc = () => StateData

type StateData = {
    projects: Map<string, Project>,
    sprints: Map<string, Sprint>,
    posts: Map<string, Post>,
    comments: Map<string, Comment>,
    teams: Map<string, Team>,
    users: Map<string, User>,
    likes: Map<string, Like>,
}

interface DataItem { 
    title: string,
    src: string 
}

interface Action {
    name: string,
    path: string
}
interface Jumbotron {
    img?: string,
    title: string,
    subtitle: string,
    actions?: Array<Action>,
    onClick?: any,
}

interface Drawer {
    variant: DrawerVariant,
}

interface Comment {
    _id: string,
    author: string,
    likes: Array<Like>,
    body: string,
    created: Date,
    edited: Date,
}

interface Like {
    _id: string,
    author: string,
    type: 'Thumb up' | 'Thumb down' | 'Heart',
    created: Date,
}

interface ValidationError { 
    error: string, 
    touched: boolean 
}

interface PostLayout {
    id: string,
    title: string,
    subtitle: string,
    body?: string,
    content?: React.ReactElement,
    additional?: any,
}

interface Sprint {
    _id: string,
    number: number,
    dateFrom: Date,
    dateTo: Date,
    title: string,
    body: string,
    posts: Array<string>,
    comments: Array<string>,
    likes: Array<string>,
    author: User,
    created: Date,
    edited: Date,
}

interface Post {
    _id: string,
    author: User,
    title: string,
    body: string,
    comments: Array<string>,
    likes: Array<string>,
    created: Date,
    edited: Date,
}

interface Project {
    _id: string,
    author: User,
    title: string,
    body: string,
    posts: Array<string>,
    created: Date,
    edited: Date,
}

interface Team {
    _id: string,
    title: string,
    body: string,
    members: Array<string>,
    created: Date,
    edited: Date,
}


type MongoObject = Post | Sprint | Project | Comment | Like;
type Model = "Sprint" | "Post" | "Project" | "Team" | "Comment" | "Like";
type Path = 'author' | 'posts' | 'comments'| 'likes'| 'sprints' | 'projects';

interface FeedLayout {
    posts: Array<{
        id: string,
        title: string,
        subtitle: string,
        body?: string,
        content?: React.ReactElement,
        additional?: any,
    }>,
}

interface Landing {
    user: User,
    mode: Mode,
    setDarkMode: any,
    title: string,
    subtitle: string,
    button: { name: string, path: string },
}

interface Notification { 
    id: string 
}

export type {
    DataItem,
    User,
    Mode,
    DrawerVariant,
    Input,
    Drawer,
    StateType,
    StateDataFunc,
    StateData,
    Action,
    Jumbotron,
    Comment,
    Like,
    Team,
    ValidationError,
    PostLayout,
    Post,
    Sprint,
    MongoObject,
    Model,
    Path,
    FeedLayout,
    Landing,
    Notification
}