import { ProjectData, Project } from '../logic/types';
import { crudService } from '../logic/service';
import { ProjectsService } from './services';

const projectsService: ProjectsService = crudService<Project, ProjectData>('projects');

export default projectsService;
