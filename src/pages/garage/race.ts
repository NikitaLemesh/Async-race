export function getCollectionId(): string[] {
  const car = document.querySelectorAll(
    ".div__car-container"
  ) as NodeListOf<Element>;
  const arraCars = Array.from(car);
  const res: string[] = arraCars.map((item) => {
    const item2 = item.id;
    return item2;
  });
  return res;
}
