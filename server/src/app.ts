import path  from 'path';
import express, { Request } from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import * as Models from './models';
import ModelRoutesDefinition from './common/ModelRoutesDefinition';
import ModelRegistry from './common/ModelRegistry';
import { RequestMethod } from './common/request';
import Link from './common/Link';
import Routes from './common/Routes';
import { SingleModelField, ManyModelField } from './common/ModelField';
// TODO import * as Routes
import authRoutes from './routes/auth';
import commentRoutes from './routes/comment';
import likeRoutes from './routes/like';
import postRoutes from './routes/post';
import projectRoutes from './routes/project';
import sprintRoutes from './routes/sprint';
import teamRoutes from './routes/team';
import userRoutes from './routes/user';
import { handleErrors } from './middleware';

declare global {
    namespace Express {
        interface User extends Models.UserModel.UserSchema { }
    }
}

const app = express();

// Some some random thingies
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Passport config - authentication
app.use(
    expressSession({
        secret: 'Blabla bla bla',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.initialize());
app.use(passport.session());


/*
    Local Strategy uses value of input field with name='email' not 'username'
    User schema still needs to have properties named 'username' and 'password'
    'username' property is filled in with e-mail value when creating object and saving to db
*/
passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password',
        },
        Models.User.authenticate()
    )
);

passport.serializeUser(Models.User.serializeUser());
passport.deserializeUser(Models.User.deserializeUser());

// Define models.
// TODO: move to separate modules, extract `author` and `edited` handlers to decorators
const modelRegistry = new ModelRegistry({
    Comment: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: {
                author: (req: Request) => req.user?._id,
                commentedObject: (req: Request) => new Link(req.body.model, req.body.id, 'comments'),
            },
            [RequestMethod.PUT]: { 
                edited: (_req: Request) => Date.now() 
            },
        }
    ),

    Like: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
        },
        {
            [RequestMethod.POST]: { author: (req: Request) => req.user?._id },
        }
    ),

    Post: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            comments: new ManyModelField('Comment'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: { 
                author: (req: Request) => req.user?._id 
            },
            [RequestMethod.PUT]: { 
                edited: (_req: Request) => Date.now() 
            },
        }
    ),

    Project: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            posts: new ManyModelField('Post'),
            likes: new ManyModelField('Like'),
        },
        {
            [RequestMethod.POST]: { 
                author: (req: Request) => req.user?._id 
            },
            [RequestMethod.PUT]: { 
                edited: (_req: Request) => Date.now() 
            },
        }
    ),

    Sprint: new ModelRoutesDefinition(
        {
            author: new SingleModelField('User'),
            comments: new ManyModelField('Comment'),
            likes: new ManyModelField('Like'),
            posts: new ManyModelField('Post'),
        },
        {
            [RequestMethod.POST]: { author: (req: Request) => req.user?._id },
            [RequestMethod.PUT]: { edited: (_req: Request) => Date.now() },
        }
    ),

    Team: new ModelRoutesDefinition({
        members: new ManyModelField('User'),
    }),

    User: new ModelRoutesDefinition({}),
});

// Handle API routes
const routes = new Routes(
    [
        authRoutes,
        commentRoutes,
        likeRoutes,
        postRoutes,
        projectRoutes,
        sprintRoutes,
        teamRoutes,
        userRoutes
    ]
        .map((routesModule) => routesModule(modelRegistry))
        .flat()
);

routes.connect(app);

app.use(handleErrors);

// Production setup
// Serve static files from the React app
// Catch any other routes than the ones above - must be after all api routes
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

export default app;
