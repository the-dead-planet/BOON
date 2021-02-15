import { PostData, Post } from '../logic/types';
import { crudService } from '../logic/service';
import { PostsService } from './services';

const postsService: PostsService = crudService<Post, PostData>('posts');

export default postsService;
