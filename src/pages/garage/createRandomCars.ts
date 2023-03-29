import { CAR_MODELS, CAR_NAMES } from "../../application/api/constants";
import { sentNewCar } from "./events/eventsHelper";

export function createRandomCars() {
  for (let i = 0; i < 100; i += 1) {
    const randomNumberName: number = Math.floor(
      Math.random() * (CAR_NAMES.length - 2) + 1
    );
    const randomNumberModel: number = Math.floor(
      Math.random() * (CAR_NAMES.length - 2) + 1
    );
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    const randomName = `${CAR_NAMES[randomNumberName]} ${CAR_MODELS[randomNumberModel]}`;
    sentNewCar(randomName, randomColor);
  }
}
