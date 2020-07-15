
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

interface State {
    user: User,
    whoAmIRequestDone: boolean,
    mode: Mode,
    query: string,
    data: Array<DataItem>
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
    created: Date,
    body: string,
}

interface Like {
    _id: string,
    author: string,
    type: 'thumbs up' | 'heart',
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
    author: User,
}

interface Post {
    title: string,
    subtitle: string,
    body?: string,
    content?: any,
}

interface Object { 
    _id: string, 
    author: User,
}

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

export type {
    DataItem,
    User,
    Mode,
    DrawerVariant,
    Input,
    Drawer,
    State,
    Action,
    Jumbotron,
    Comment,
    Like,
    ValidationError,
    PostLayout,
    Post,
    Sprint,
    Object,
    FeedLayout,
    Landing,
}