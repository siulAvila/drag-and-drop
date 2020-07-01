import Component from './base-component';
import { NumberPositive } from '../decorators/number-positive';
import { Required } from '../decorators/required';
import { AutoBind } from '../decorators/autobind';
import { Project } from '../models/project';
import { FormField } from '../models/form';
import { Form } from '../models/form';
import { ProjectStatus } from '../models/project-status';
import { projectState } from '../state/project-state';
import { formValidateFields } from '../util/validator';

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  inputPeopleHTML: HTMLInputElement;
  inputDescriptionHTML: HTMLInputElement;
  inputTitleHTML: HTMLInputElement;

  @Required
  title: FormField = {
    value: '',
  };

  @Required
  description: FormField = {
    value: '',
  };

  @NumberPositive
  @Required
  people: FormField = {
    value: '',
  };

  form: Form = {} as Form;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.inputPeopleHTML = this.element.querySelector(
      '#people'
    )! as HTMLInputElement;

    this.inputDescriptionHTML = this.element.querySelector(
      '#description'
    )! as HTMLInputElement;

    this.inputTitleHTML = this.element.querySelector(
      '#title'
    )! as HTMLInputElement;

    this.configure();
    this.createForm();
  }

  configure(): void {
    this.element.addEventListener('submit', this.formSubmit);
  }
  renderContent(): void {
    throw new Error('Method not implemented.');
  }

  private createForm() {
    this.form = {
      title: this.title,
      description: this.description,
      people: this.people,
    };
  }

  @AutoBind
  private formSubmit() {
    event?.preventDefault();
    this.setFormValues();
    formValidateFields(this.form);
    if (this.form.valid) {
      const project = new Project(
        this.form['description'].value as string,
        this.form['title'].value as string,
        this.form['people'].value as number,
        ProjectStatus.Active
      );

      projectState.addProject(project);
      this.clearForm();
    }
  }

  private setFormValues() {
    this.people.value =
      this.inputPeopleHTML.value ?? Number(this.inputPeopleHTML.value);
    this.description.value = this.inputDescriptionHTML.value;
    this.title.value = this.inputTitleHTML.value;
  }

  private clearForm() {
    this.inputPeopleHTML.value = '';
    this.inputDescriptionHTML.value = '';
    this.inputTitleHTML.value = '';
  }
}
