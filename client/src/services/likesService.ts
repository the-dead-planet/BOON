import axios from 'axios';
import { Like, LikeData, CrudService } from '../logic/types';
import { crudService } from '../logic/service';

type LikesService = CrudService<Like, LikeData>;

const likesService: LikesService = crudService<Like, LikeData>('likes');

export default likesService;
