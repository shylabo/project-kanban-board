import Component from "./base-components";
import * as Validation from "../util/validation";
import { autobind } from "../decorators/autobind";
import { projectState } from "../state/project-state";

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionTitleInputElement: HTMLInputElement;
  mandayTitleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');

    this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
    this.descriptionTitleInputElement = this.element.querySelector('#description') as HTMLInputElement;
    this.mandayTitleInputElement = this.element.querySelector('#manday') as HTMLInputElement;

    this.configure();
  }

  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionTitleInputElement.value;
    const enteredManday = this.mandayTitleInputElement.value;

    const titleValidatable: Validation.Validatable = {
      value: enteredTitle,
      required: true,
    };

    const descriptionValidatable: Validation.Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5,
    };

    const mandayValidatable: Validation.Validatable = {
      value: enteredManday,
      required: true,
      min: 1,
      max: 1000,
    };

    if(
      !Validation.validate(titleValidatable) ||
      !Validation.validate(descriptionValidatable) ||
      !Validation.validate(mandayValidatable)
    ) {
      alert('input value is not correct... try it again.');
      return;
    } else {
      return [enteredTitle, enteredDescription, +enteredManday];
    }
  }

  configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(){};

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionTitleInputElement.value = '';
    this.mandayTitleInputElement.value = '';
  }

  @autobind
  private submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, desc, manday] = userInput;
      projectState.addProject(title, desc, manday);
      this.clearInputs();
    }
  }
}