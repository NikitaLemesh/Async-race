import {
  createForm,
  createCarsContainer,
  createGarageWrapper,
  createCarsWrapper,
  createGaragePageTitle,
  createPaginationButtons,
  createGaragePageNumber,
} from "./garage";

export class GaragePage {
  idPage: string;
  constructor(idPage: string) {
    this.idPage = idPage;
  }
  render() {
    createGarageWrapper();
    createForm();
    createCarsWrapper();
    createGaragePageTitle();
    createGaragePageNumber();
    createPaginationButtons();
    createCarsContainer();
  }
}
