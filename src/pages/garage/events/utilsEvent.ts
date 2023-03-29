import { getAmimation, stopCar } from "../animation";

export function disabledAllBtn(className: string): void {
  getClassNamesArray(className).forEach((item) => {
    const btn = document.querySelector(`.${item}`) as HTMLButtonElement;
    btn.disabled = true;
  });
}

export function unDisabledAllBtn(className: string): void {
  getClassNamesArray(className).forEach((item) => {
    const btn = document.querySelector(`.${item}`) as HTMLButtonElement;
    btn.disabled = false;
  });
}

export function getClassNamesArray(className: string): Array<string> {
  const btnStartCollection = document.querySelectorAll(`.${className}`);
  const btnStartArray = Array.from(btnStartCollection);
  const secondClassName = btnStartArray.map((item) => item.classList[1]);
  return secondClassName;
}

export async function startAllCars(array: string[]): Promise<void> {
  array.map(async (item: string) => {
    disabledAllBtn("btn__start");
    unDisabledAllBtn("btn__stop");
    await getAmimation(item);
  });
}

export async function stopAllCars(array: string[]): Promise<void> {
  array.forEach(async (item: string) => {
    disabledAllBtn("btn__stop");
    unDisabledAllBtn("btn__start");
    await stopCar(item);
  });
}

export function unDisabledOrDisabled(
  node: HTMLButtonElement,
  className: string
): void {
  let btn = node.nextSibling?.nextSibling as HTMLButtonElement;
  if (node.classList.contains(className)) {
    btn = node.previousSibling?.previousSibling as HTMLButtonElement;
  }
  btn.disabled = !btn.disabled;
  node.disabled = !node.disabled;
}
