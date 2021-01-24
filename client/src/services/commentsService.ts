import axios from 'axios';
import { CommentData, Comment } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type CommentsService = CrudService<Comment, CommentData>;

const commentsService: CommentsService = crudService<Comment, CommentData>('comments');

export default commentsService;
