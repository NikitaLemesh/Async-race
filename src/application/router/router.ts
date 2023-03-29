import { PagesId } from "./helperRouter";
import { GaragePage } from "../../pages/garage/renderPageGarage";
import { WinnersPage } from "../../pages/winners/renderWinnersPage";

function removeDiv() {
  document.getElementById(PagesId.GaragePage)?.remove();
  document.getElementById(PagesId.WinnersPage)?.remove();
}

export function renderNewPage(idPage: string) {
  removeDiv();
  let page = null;
  if (idPage === PagesId.GaragePage) {
    page = new GaragePage(idPage);
  } else if (idPage === PagesId.WinnersPage) {
    page = new WinnersPage(idPage);
  }

  if (page) {
    page.render();
  }
}

export function routeChange() {
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    renderNewPage(hash);
  });
}
