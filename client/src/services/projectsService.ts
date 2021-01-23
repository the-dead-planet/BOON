import axios from 'axios';
import { ProjectData, Project, CrudService } from '../logic/types';
import { crudService } from '../logic/service';

type ProjectsService = CrudService<Project, ProjectData>;

const projectsService: ProjectsService = crudService<Project, ProjectData>('projects');

export default projectsService;
