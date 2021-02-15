import { Like, LikeData } from '../logic/types';
import { crudService } from '../logic/service';
import { LikesService } from './services';

const likesService: LikesService = crudService<Like, LikeData>('likes');

export default likesService;
