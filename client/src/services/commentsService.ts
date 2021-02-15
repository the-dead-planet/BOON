import { CommentData, Comment } from '../logic/types';
import { crudService } from '../logic/service';
import { CommentsService } from './services';

const commentsService: CommentsService = crudService<Comment, CommentData>('comments');

export default commentsService;
