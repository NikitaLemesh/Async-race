import { URL_ADDRESS } from "../../application/api/constants";
import { getCar } from "../../application/api/api";
import Winners from "./winners.html";
import { WINNER } from "../../application/store/store";

export function createWinnersWrapper() {
  const header = document.querySelector(".header");
  const div = document.createElement("div");
  div.id = "winners";
  header?.after(div);
}

export function createWinnersPageTitle(idPage: string): void {
  const div = document.getElementById(idPage);
  const title = document.createElement("h1");
  title.classList.add("title");
  title.textContent = "Winners";
  div?.append(title);
}

export async function createWinnerPageNumber(): Promise<void> {
  const pageTitle = document.querySelector(".title");
  const pageNumber = document.createElement("p");
  pageNumber.classList.add("page__number-winners");
  pageNumber.textContent = `Page # (${1})`;
  pageTitle?.after(pageNumber);
}

export async function createWinnersTable() {
  const pageNumber = document.querySelector(".page__number-winners");
  const pageTable = document.createElement("table");
  pageTable.classList.add("table__page");
  pageTable.innerHTML = Winners;
  pageNumber?.after(pageTable);
}

export async function createWinnerRow() {
  WINNER.forEach(async (item) => {
    const car = await getCar(URL_ADDRESS, item.id);
    const winnersContainer = document.querySelector(".tr_title") as HTMLElement;
    const newWinner = document.createElement("tr") as HTMLElement;
    newWinner.classList.add("tr_car");
    newWinner.innerHTML = `
      <td>${getNumber() + 1}</td>
      <td ><svg class="image__car" style="fill: ${car.color}">
      <use xlink:href="#carSvgImage"></use>
      </svg></td>
      <td>${car.name}</td>
      <td>${1}</td>
      <td>${Math.floor(item.time) / 1000}</td>`;
    winnersContainer.after(newWinner);
  });
}

function getNumber(): number {
  const winners = document.querySelectorAll(".tr_car");
  return winners.length;
}
