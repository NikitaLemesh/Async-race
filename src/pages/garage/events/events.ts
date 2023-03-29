import {
  changeOrDeleteCar,
  getInfoAboutNewCar,
  switchGaragePages,
  startAndStopRaceForAllCars,
} from "./eventsHelper";

function addListnerUpdateCar() {
  const carsWrapperContainer = document?.querySelector(
    ".cars-wrapper-container"
  ) as HTMLElement;
  carsWrapperContainer?.addEventListener("click", changeOrDeleteCar);
}

function addListnerGetInfoAboutNewCar() {
  const divCreateCar = document?.querySelector(
    ".button__car"
  ) as HTMLButtonElement;
  divCreateCar?.addEventListener("click", getInfoAboutNewCar);
}

function addListnerStartAndStopRaceForAllCars() {
  const btnRaceGenerat = document.querySelector(
    ".btn__race-generat"
  ) as HTMLDivElement;
  btnRaceGenerat.addEventListener("click", startAndStopRaceForAllCars);
}

function addListenerSwitchGaragePages() {
  const divBtn = document.querySelector(".div__buttons");
  divBtn?.addEventListener("click", switchGaragePages);
}

export function addListeners(): void {
  addListnerGetInfoAboutNewCar();
  addListnerUpdateCar();
  addListenerSwitchGaragePages();
  addListnerStartAndStopRaceForAllCars();
}
