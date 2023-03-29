import {
  createWinnersPageTitle,
  createWinnersWrapper,
  createWinnerPageNumber,
  createWinnersTable,
  createWinnerRow,
} from "./winners";

export class WinnersPage {
  idPage: string;
  constructor(idPage: string) {
    this.idPage = idPage;
  }
  render() {
    createWinnersWrapper();
    createWinnersPageTitle(this.idPage);
    createWinnerPageNumber();
    createWinnersTable();
    createWinnerRow();
  }
}
