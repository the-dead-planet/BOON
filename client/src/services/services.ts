/**
 * Interfaces of all external service definitions.
 * The default export, `Services`, is a composite of all available servies.
 * See the README file for more context about how the module is expected to be used.
 */
import {
    User,
    CommentData,
    Comment,
    Like,
    LikeData,
    Post,
    PostData,
    Project,
    ProjectData,
    Sprint,
    SprintData,
    UserData,
} from '../logic/types';
import { CrudService } from '../logic/service';

export type WrappedUserData = { user: User };

export interface AuthService {
    login(password: string, email: string): Promise<WrappedUserData>;
    logout(): Promise<void>;
    register(username: string, password: string, email: string, team: string): Promise<WrappedUserData>;
    whoami(): Promise<WrappedUserData>;
}

export type CommentsService = CrudService<Comment, CommentData>;
export type LikesService = CrudService<Like, LikeData>;
export type PostsService = CrudService<Post, PostData>;
export type ProjectsService = CrudService<Project, ProjectData>;
export type SprintsService = CrudService<Sprint, SprintData>;
export type UsersService = Pick<CrudService<User, UserData>, 'getAll' | 'getOne' | 'update'>;

export default interface Services {
    authService: AuthService;
    commentsService: CommentsService;
    likesService: LikesService;
    postsService: PostsService;
    projectsService: ProjectsService;
    sprintsService: SprintsService;
    usersService: UsersService;
}
