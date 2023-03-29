import Header from "./header.html";

export function createHeader(): void {
  const body = document.body as HTMLBodyElement;
  const header = document.createElement("header") as HTMLElement;
  header.classList.add("header");
  header.innerHTML = Header;
  body.append(header);
}
