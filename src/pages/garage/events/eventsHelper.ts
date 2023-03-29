import {
  createCar,
  deleteCarFromServer,
  getCar,
  updateCar,
} from "../../../application/api/api";
import { startAllCars, stopAllCars, unDisabledOrDisabled } from "./utilsEvent";
import { InfoCar } from "../../../application/api/helperApi";
import { COUNT_PAGE, URL_ADDRESS } from "../../../application/api/constants";
import { renderNewPage } from "../../../application/router/router";
import { createRandomCars } from "../createRandomCars";
import { getAmimation, stopCar } from "../animation";
import { getCollectionId } from "../race";

const carInfo: InfoCar = {
  name: "",
  color: "",
  id: 0,
};

export function sentNewCar(nameCar: string, colorcar: string): void {
  const infoNewCar: InfoCar = {
    name: nameCar,
    color: colorcar,
  };
  createCar(URL_ADDRESS, infoNewCar);
}

export function getInfoAboutNewCar(event: Event): void {
  event.preventDefault();
  const target = event?.target as HTMLElement;
  const buttonCreateCar = target.closest(".btn__create-car");
  const buttonUpdateCar = target.closest(".btn__update-car");
  const inputColorCar = document.querySelector(
    ".inpur__color-car"
  ) as HTMLInputElement;
  const inputCreateCar = document.querySelector(
    ".input__create-car"
  ) as HTMLInputElement;
  const inputUpdateCar = document.querySelector(
    ".input__update-car"
  ) as HTMLInputElement;
  const inputUpdateColorCar = document.querySelector(
    ".input__update-color-car"
  ) as HTMLInputElement;
  if (buttonCreateCar) {
    if (inputCreateCar.value) {
      sentNewCar(inputCreateCar.value, inputColorCar.value);
      inputCreateCar.value = "";
    }
    renderNewPage("garage");
  }
  if (buttonUpdateCar) {
    if (inputUpdateCar.value) {
      carInfo.name = inputUpdateCar.value;
      carInfo.color = inputUpdateColorCar.value;
      updateCar(URL_ADDRESS, Number(carInfo.id), carInfo);
      inputUpdateCar.value = "";
      renderNewPage("garage");
    }
  }
}

export async function changeOrDeleteCar(event: MouseEvent): Promise<void> {
  event.preventDefault();
  const target = event?.target as HTMLElement;
  const targetSelect = target.closest(".btn__select-car") as HTMLButtonElement;
  const targetRemove = target.closest(".btn__remove-car") as HTMLButtonElement;
  const targetStart = target.closest(".btn__start") as HTMLButtonElement;
  const targetStop = target.closest(".btn__stop") as HTMLButtonElement;
  if (targetRemove) {
    const parantId = targetRemove.parentElement?.parentElement?.id;
    deleteCarFromServer(URL_ADDRESS, Number(parantId));
    renderNewPage("garage");
  }
  if (targetSelect) {
    const parantId = targetSelect.parentElement?.parentElement?.id;
    const input = document.querySelector(
      ".input__update-car"
    ) as HTMLInputElement;
    const car = await getCar(URL_ADDRESS, Number(parantId));
    input.value = car.name;
    carInfo.color = car.color;
    carInfo.id = car.id;
    carInfo.name = car.name;
  }
  if (targetStart) {
    const parantId = targetStart.parentElement?.parentElement?.id;
    unDisabledOrDisabled(targetStart, "btn__stop");
    await getAmimation(parantId);
  }
  if (targetStop) {
    const parantId = targetStop.parentElement?.parentElement?.id;
    unDisabledOrDisabled(targetStop, "btn__stop");
    stopCar(parantId);
  }
}

export function switchGaragePages(event: Event): void {
  event.preventDefault();
  const target = event?.target as HTMLElement;
  const targetNextBtn = target.closest(".btn__next-page");
  const targetPrevBtn = target.closest(".btn__prev-page");
  if (targetPrevBtn) {
    if (COUNT_PAGE.pageGarage !== 1) {
      COUNT_PAGE.pageGarage -= 1;
      renderNewPage("garage");
    }
  }
  if (targetNextBtn) {
    COUNT_PAGE.pageGarage += 1;
    renderNewPage("garage");
  }
}

export async function startAndStopRaceForAllCars(event: Event): Promise<void> {
  event.preventDefault();
  const target = event?.target as HTMLElement;
  const targetGenerateBtn = target.closest(
    ".btn__generate"
  ) as HTMLButtonElement;
  const targetRace = target.closest(".btn__race") as HTMLButtonElement;
  const targetReset = target.closest(".btn__reset") as HTMLButtonElement;
  if (targetGenerateBtn) {
    createRandomCars();
  }
  if (targetRace) {
    unDisabledOrDisabled(targetRace, "btn__reset");
    startAllCars(getCollectionId());
  }
  if (targetReset) {
    unDisabledOrDisabled(targetReset, "btn__reset");
    stopAllCars(getCollectionId());
  }
}
