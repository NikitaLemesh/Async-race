import { routeChange, renderNewPage } from "../../application/router/router";
import { createHeader } from "../../application/header/header";
import { PagesId } from "../../application/router/helperRouter";

export class App {
  private hashPage: string = window.location.hash.slice(1);
  private idPage = "default-page";
  private checkHash() {
    if (this.hashPage === PagesId.GaragePage) {
      this.idPage = PagesId.GaragePage;
    } else if (this.hashPage === PagesId.WinnersPage) {
      this.idPage = PagesId.WinnersPage;
    }
  }

  render() {
    createHeader();
    this.checkHash();
    renderNewPage(this.idPage);
    routeChange();
  }
}
