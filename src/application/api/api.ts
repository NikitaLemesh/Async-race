import { API, InfoCar, CarSped, Winner } from "./helperApi";

export const getCar = async (url: string, id: number): Promise<InfoCar> => {
  const respons = await fetch(`${url}/${API.Garage}/${id}`);
  return await respons.json();
};

export const getCars = async (url: string, page: number, limit = 7) => {
  const respons = await fetch(
    `${url}/${API.Garage}?_page=${page}&_limit=${limit}`
  );
  return {
    item: await respons.json(),
    count: respons.headers.get("X-Total-Count"),
  };
};

export const createCar = async (
  url: string,
  car: InfoCar
): Promise<InfoCar> => {
  const respons = await fetch(`${url}/${API.Garage}`, {
    method: "POST",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await respons.json();
};

export const deleteCarFromServer = async (
  url: string,
  id: number
): Promise<void> => {
  const respons = await fetch(`${url}/${API.Garage}/${id}`, {
    method: "DELETE",
  });
  return await respons.json();
};

export const updateCar = async (
  url: string,
  id: number,
  car: InfoCar
): Promise<InfoCar> => {
  const respons = await fetch(`${url}/${API.Garage}/${id}`, {
    method: "PUT",
    body: JSON.stringify(car),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await respons.json();
};

export const srartEngine = async (
  url: string,
  id: number
): Promise<CarSped> => {
  const respons = await fetch(`${url}/${API.Engine}?id=${id}&status=started`, {
    method: "PATCH",
  });
  return await respons.json();
};

export const stopEngine = async (url: string, id: number): Promise<CarSped> => {
  const respons = await fetch(`${url}/${API.Engine}?id=${id}&status=stopped`, {
    method: "PATCH",
  });
  return await respons.json();
};

export const drive = async (url: string, id: number) => {
  const respons = await fetch(`${url}/${API.Engine}?id=${id}&status=drive`, {
    method: "PATCH",
  }).catch();
  if (respons.status !== 200) {
    return { success: false };
  } else {
    return { ...(await respons.json()) };
  }
};

export const getWinner = async (url: string, id: number): Promise<Winner> => {
  const respons = await fetch(`${url}/${API.Winners}/${id}`);
  return await respons.json();
};

export const createWinner = async (url: string, body: Winner) => {
  const respons = await fetch(`${url}/${API.Winners}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await respons.json();
};

export const deleteWinner = async (url: string, id: number): Promise<void> => {
  const respons = await fetch(`${url}/${API.Winners}/${id}`, {
    method: "DELETE",
  });
  return await respons.json();
};

export const updateWinner = async (
  url: string,
  id: number,
  dody: Winner
): Promise<Winner> => {
  const respons = await fetch(`${url}/${API.Garage}/${id}`, {
    method: "PUT",
    body: JSON.stringify(dody),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return await respons.json();
};
