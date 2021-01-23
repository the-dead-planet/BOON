import axios from 'axios';
import { PostData, Post } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type PostsService = CrudService<Post, PostData>;

const postsService: PostsService = crudService<Post, PostData>('posts');

export default postsService;
