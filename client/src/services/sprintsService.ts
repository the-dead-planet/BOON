import axios from 'axios';
import { SprintData, Sprint, CrudService } from '../logic/types';
import { crudService } from '../logic/service';

type SprintsService = CrudService<Sprint, SprintData>;

const sprintsService: SprintsService = crudService<Sprint, SprintData>('sprints');

export default sprintsService;
