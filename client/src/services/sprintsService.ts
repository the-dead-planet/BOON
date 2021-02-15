import { SprintData, Sprint } from '../logic/types';
import { crudService } from '../logic/service';
import { SprintsService } from './services';

const sprintsService: SprintsService = crudService<Sprint, SprintData>('sprints');

export default sprintsService;
