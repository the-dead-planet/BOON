import axios from 'axios';
import { PostData, Post, CrudService } from '../logic/types';
import { crudService } from '../logic/service';

type PostsService = CrudService<Post, PostData>;

const postsService: PostsService = crudService<Post, PostData>('posts');

export default postsService;
