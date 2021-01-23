import axios from 'axios';
import { SprintData, Sprint } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type SprintsService = CrudService<Sprint, SprintData>;

const sprintsService: SprintsService = crudService<Sprint, SprintData>('sprints');

export default sprintsService;
