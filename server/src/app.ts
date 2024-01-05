import path  from 'path';
import express, { Request } from 'express';
import expressSession from 'express-session';
import bodyParser from 'body-parser';
import passport from 'passport';
import * as passportLocal from 'passport-local';
const LocalStrategy = passportLocal.Strategy;
import * as Models from './models';
import ModelRoutesDefinition from './common/model-routes-definition';
import ModelRegistry from './common/model-registry';
import { RequestMethod } from './common/request';
import Link from './common/link';
import Routes from './common/routes';
import { SingleModelField, ManyModelField } from './common/model-field';
import * as RouterRoutes from './routes';
import { handleErrors } from './middleware';

declare global {
    namespace Express {
        interface User extends Models.UserSchema { }
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
        Models.userModel.authenticate()
    )
);

passport.serializeUser(Models.userModel.serializeUser());
passport.deserializeUser(Models.userModel.deserializeUser());

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
    }, {}),

    User: new ModelRoutesDefinition({}, {}),
});

// TODO: We should use express.Router: const commentRouter = express.Router(); app.use(/comment, commentRouter) etc.. to simplify things 
// https://expressjs.com/en/guide/routing.html#express-router
const routes = new Routes(
    [
        RouterRoutes.getAuthRoutes,
        RouterRoutes.getCommentRoutes,
        RouterRoutes.getLikeRoutes,
        RouterRoutes.getPostRoutes,
        RouterRoutes.getProjectRoutes,
        RouterRoutes.getSprintRoutes,
        RouterRoutes.getTeamRoutes,
        RouterRoutes.getUserRoutes
    ]
        .map((routesModule) => routesModule(modelRegistry))
        .flat()
);

routes.connect(app);

app.use(handleErrors);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('./build'));

    app.get('*', function (req, res) {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
    });
}

export default app;
