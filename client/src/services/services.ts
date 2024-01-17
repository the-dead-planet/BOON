/**
 * Interfaces of all external service definitions.
 * The default export, `Services`, is a composite of all available servies.
 * See the README file for more context about how the module is expected to be used.
 */
import { CrudService } from '../logic/service';
import * as Types from '../logic/types';

export type WrappedUserData = { user: Types.User };

export interface AuthService {
    login(password: string, email: string): Promise<WrappedUserData>;
    logout(): Promise<void>;
    register(username: string, password: string, email: string, team: string): Promise<WrappedUserData>;
    whoami(): Promise<WrappedUserData>;
}

export type CommentsService = CrudService<Comment, Types.CommentData>;
export type LikesService = CrudService<Types.Like, Types.LikeData>;
export type PostsService = CrudService<Types.Post, Types.PostData>;
export type ProjectsService = CrudService<Types.Project, Types.ProjectData>;
export type SprintsService = CrudService<Types.Sprint, Types.SprintData>;
export type UsersService = Pick<CrudService<Types.User, Types.UserData>, 'getAll' | 'getOne' | 'update'>;

export default interface Services {
    authService: AuthService;
    commentsService: CommentsService;
    likesService: LikesService;
    postsService: PostsService;
    projectsService: ProjectsService;
    sprintsService: SprintsService;
    usersService: UsersService;
}
