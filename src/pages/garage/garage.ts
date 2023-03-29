import { getCars, getCar } from "../../application/api/api";
import { InfoCar, Winner } from "../../application/api/helperApi";
import { COUNT_PAGE, URL_ADDRESS } from "../../application/api/constants";
import { addListeners } from "./events/events";
import Form from "./form.html";
import Car from "./car.html";
import Buttons from "./buttons.html";

export function createGarageWrapper(): void {
  const header = document.querySelector(".header") as HTMLElement;
  const div = document.createElement("div") as HTMLDivElement;
  div.id = "garage";
  header?.after(div);
}

export function createForm(): void {
  const header = document.getElementById("garage") as HTMLElement;
  const headerButtons = document.createElement("form") as HTMLFormElement;
  headerButtons.classList.add("header-buttons");
  headerButtons.innerHTML = Form;
  header?.append(headerButtons);
  const btnReset = document.querySelector(".btn__reset") as HTMLButtonElement;
  btnReset.disabled = true;
}

export function createCarsWrapper(): void {
  const headerButtons = document.querySelector(
    ".header-buttons"
  ) as HTMLButtonElement;
  const carsWrapper = document.createElement("div") as HTMLDivElement;
  carsWrapper.classList.add("cars-wrapper-container");
  headerButtons?.after(carsWrapper);
}

export async function createGaragePageTitle(): Promise<void> {
  const cars = await getCars(URL_ADDRESS, COUNT_PAGE.pageGarage);
  const carsWrapper = document.querySelector(".cars-wrapper-container");
  const pageTitle = document.createElement("h1");
  pageTitle.classList.add("page__title");
  pageTitle.textContent = `Garage (${cars.count})`;
  carsWrapper?.append(pageTitle);
}

export async function createGaragePageNumber(): Promise<void> {
  await getCars(URL_ADDRESS, COUNT_PAGE.pageGarage);
  const pageTitle = document.querySelector(".page__title");
  const pageNumber = document.createElement("p");
  pageNumber.classList.add("page__number");
  pageNumber.textContent = `Page # (${COUNT_PAGE.pageGarage})`;
  pageTitle?.after(pageNumber);
}

export async function createCarsContainer(): Promise<void> {
  const cars = await getCars(URL_ADDRESS, COUNT_PAGE.pageGarage);
  const pageNumber = document.querySelector(".page__number") as HTMLElement;
  const arrayCars = cars.item;
  arrayCars.reverse().forEach((item: InfoCar) => {
    const car = document.createElement("div") as HTMLDivElement;
    addCarIdAndClassList(car, item.id);
    car.innerHTML = Car;
    pageNumber?.after(car);
    addCarName(item.name);
    addCarColor(item.color);
    addClassNameBtnStop(item.id);
    addClassNameBtnStart(item.id);
    disabledBtnStop();
  });
  addListeners();
}

function disabledBtnStop() {
  const btnStop = document.querySelector(".btn__stop") as HTMLButtonElement;
  btnStop.disabled = true;
}

function addCarIdAndClassList(car: HTMLElement, id: number | undefined) {
  car.classList.add("div__car-container");
  car.id = String(id);
}

function addCarName(name: string) {
  const span = document.querySelector(".car-model") as HTMLElement;
  span.textContent = name;
}

function addCarColor(color: string) {
  const svgImage = document.querySelector(".image__car") as HTMLElement;
  svgImage.style.fill = color;
}

function addClassNameBtnStop(id?: number) {
  const btn = document.querySelector(".btn__stop");
  btn?.classList.add(`btn__stop-${id}`);
}

function addClassNameBtnStart(id?: number) {
  const btn = document.querySelector(".btn__start");
  btn?.classList.add(`btn__start-${id}`);
}

export function createPaginationButtons(): void {
  const div = document.getElementById("garage") as HTMLDivElement;
  const divButtons = document.createElement("div") as HTMLDivElement;
  divButtons.classList.add("div__buttons");
  divButtons.innerHTML = Buttons;
  div?.append(divButtons);
}

export async function createMessage(winner: Winner[]) {
  const lastWinner = winner[winner.length - 1];
  const car = await getCar(URL_ADDRESS, lastWinner.id);
  const body = document.body;
  const message = document.createElement("p");
  message.classList.add("message");
  message.textContent = `Win ${car.name} time ${Math.floor(lastWinner.time)}ms`;
  body.append(message);
}
