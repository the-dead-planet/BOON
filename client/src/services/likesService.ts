import axios from 'axios';
import { Like, LikeData } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type LikesService = CrudService<Like, LikeData>;

const likesService: LikesService = crudService<Like, LikeData>('likes');

export default likesService;
