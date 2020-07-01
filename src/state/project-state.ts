import { Project } from '../models/project';
import { ProjectStatus } from '../models/project-status';
import State from './state';

export class ProjectState extends State<Project> {
  private static _instance: ProjectState = new ProjectState();

  private constructor() {
    super();
  }

  static getInstance(): ProjectState {
    return ProjectState._instance;
  }

  addProject(project: Project) {
    this.items.push(project);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.items.find(
      (project: Project) => project.id === projectId
    );
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listener of this.listeners) {
      listener(this.items.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
