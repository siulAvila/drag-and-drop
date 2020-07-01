import Component from './base-component';
import { AutoBind } from '../decorators/autobind';
import { Project } from '../models/project';
import { Draggable } from '../models/drag-drop';

export class ProjectItem extends Component<HTMLDivElement, HTMLUListElement>
  implements Draggable {
  constructor(private _project: Project, private _hostId: string) {
    super('single-project', _hostId, false, _project.id);
    this.renderContent();
    this.configure();
  }

  get people() {
    if (this._project.people === 1) {
      return `1 person`;
    }
    return `${this._project.people} persons`;
  }

  @AutoBind
  dragStartHandler(event: DragEvent): void {
    event.dataTransfer!.setData('text/plain', this._project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  dragEndHandler(_: DragEvent): void {}

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }
  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this._project.title;
    this.element.querySelector('h3')!.textContent = this.people + ' assigned';
    this.element.querySelector('p')!.textContent = this._project.description;
  }
}
