import axios from 'axios';
import { ProjectData, Project } from '../logic/types';
import { crudService, CrudService } from '../logic/service';

type ProjectsService = CrudService<Project, ProjectData>;

const projectsService: ProjectsService = crudService<Project, ProjectData>('projects');

export default projectsService;
