export enum API {
  Address = "http://127.0.0.1:3000",
  Garage = "garage",
  Engine = "engine",
  Winners = "winners",
}

export interface InfoCar {
  name: string;
  color: string;
  id?: number;
}

export interface InfoCars {
  item: InfoCar;
  count: string | null;
}

export interface CarSped {
  velocity: number;
  distance: number;
}

export interface CountPage {
  pageGarage: number;
  pageWinner: number;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}
