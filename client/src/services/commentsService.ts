import axios from 'axios';
import { CommentData, Comment, CrudService } from '../logic/types';
import { crudService } from '../logic/service';

type CommentsService = CrudService<Comment, CommentData>;

const commentsService: CommentsService = crudService<Comment, CommentData>('comments');

export default commentsService;
