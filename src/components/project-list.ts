import Component from './base-component';
import { AutoBind } from '../decorators/autobind';
import { Project } from '../models/project';
import { DragTarget } from '../models/drag-drop';
import { ProjectStatus } from '../models/project-status';
import { ProjectItem } from './project-item';
import { projectState } from '../state/project-state';

export class ProjectList extends Component<HTMLDivElement, HTMLUListElement>
  implements DragTarget {
  projects: Project[] = [];
  ulElement: HTMLUListElement = {} as HTMLUListElement;
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer?.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  @AutoBind
  dropHandler(event: DragEvent): void {
    const projectId = event.dataTransfer?.getData('text/plain')!;
    projectState.moveProject(
      projectId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
  }

  @AutoBind
  dragLeaveHandler(_: DragEvent): void {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  renderContent() {
    this.element.querySelector('h2')!.textContent = this.type.toUpperCase();
    this.ulElement = this.element.querySelector('ul')!;
    this.ulElement.id = `${this.type}-projects-list`;
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('drop', this.dropHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter((project) => {
        if (this.type === 'active') {
          return project.status === ProjectStatus.Active;
        }
        return project.status === ProjectStatus.Finished;
      });
      this.projects = relevantProjects;
      this.renderProjects();
    });
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    ) as HTMLUListElement;

    this.removeAllChildElements(listEl);

    for (const project of this.projects) {
      new ProjectItem(project, this.element.querySelector('ul')!.id);
    }
  }

  private removeAllChildElements(listEl: HTMLUListElement) {
    while (listEl.firstChild) {
      listEl.removeChild(listEl.lastChild!);
    }
  }
}
