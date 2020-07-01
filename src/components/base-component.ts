export default abstract class Component<
  T extends HTMLElement,
  U extends HTMLElement
> {
  templateElement: HTMLTemplateElement;
  element: U;
  hostElement: T;

  constructor(
    templateId: string,
    hostElementId: string,
    inserAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      templateId
    ) as HTMLTemplateElement;

    const importNode = document.importNode(this.templateElement.content, true);
    this.hostElement = document.getElementById(hostElementId) as T;
    this.element = importNode.firstElementChild as U;
    if (newElementId) this.element.id = newElementId;
    this.attach(inserAtStart);
  }

  private attach(inserAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      inserAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract configure(): void;

  abstract renderContent(): void;
}
