import { srartEngine, drive, stopEngine } from "../../application/api/api";
import { URL_ADDRESS } from "../../application/api/constants";
import { Winner } from "../../application/api/helperApi";
import { WINNER } from "../../application/store/store";
import { createMessage } from "./garage";

interface ArrayCarsTime {
  id: number;
  time: number;
}
const array: ArrayCarsTime[] = [];
let requestId: number;
let winner: number | undefined;
export async function getCarMoveTime(idCar?: string): Promise<number> {
  const engine = await srartEngine(URL_ADDRESS, Number(idCar));
  const time = engine.distance / engine.velocity;
  return time;
}

export async function getDrive(idCar?: string): Promise<void> {
  const driveCar = await drive(URL_ADDRESS, Number(idCar));
  const res = (await driveCar.success) ? true : false;
  if (res) {
    if (!winner) {
      winner = Number(idCar);
      const car = array.find((item) => item.id === winner);
      if (car) {
        createNewWinner(winner, 1, car.time);
        showMessage();
      }
    }
  }
  if (!res) {
    cancelAnimationFrame(requestId);
  }
}

export async function stopCar(idCar?: string): Promise<void> {
  await stopEngine(URL_ADDRESS, Number(idCar))
    .then(() => cancelAnimationFrame(requestId))
    .then(() => moveCarToStart(idCar));
}

function moveCarToStart(idCar?: string) {
  const carContainer = document.getElementById(`${idCar}`) as HTMLElement;
  const car = carContainer.querySelector(".image__car") as HTMLElement;
  const startPosition = carContainer.offsetLeft;
  car.style.transform = `translate(${startPosition}px)`;
}

export async function getAmimation(idCar?: string): Promise<void> {
  getCarMoveTime(idCar).then((timeRace) => {
    array.push({ id: Number(idCar), time: timeRace });
    const distanceRace = document.body.clientWidth - 150;
    const carContainer = document.getElementById(`${idCar}`) as HTMLElement;
    const car = carContainer.querySelector(".image__car") as HTMLElement;
    const frameCount = (timeRace / 1000) * 60;
    let currentX = carContainer.offsetLeft;
    const dx = (distanceRace - carContainer.offsetLeft) / frameCount;
    const tick = (): void => {
      currentX += dx;
      car.style.transform = `translate(${currentX}px)`;
      if (currentX < distanceRace) {
        requestId = requestAnimationFrame(tick);
      }
    };
    tick();
    getDrive(idCar);
    winner = undefined;
  });
}

async function createNewWinner(id: number, pos: number, time: number) {
  const winnerInfo: Winner = {
    id: id,
    wins: pos,
    time: time,
  };
  WINNER.push(winnerInfo);
}

function showMessage() {
  createMessage(WINNER);
  setTimeout(() => {
    removeMessage();
  }, 1500);
}

function removeMessage() {
  const message = document.querySelector(".message");
  message?.remove();
}
