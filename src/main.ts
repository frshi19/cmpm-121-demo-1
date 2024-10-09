import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Frank's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;

const counterDiv: HTMLDivElement = document.createElement("div");
counterDiv.id = "counterDisplay";
updateCounterDisplay(counterDiv);

// Append the counterDiv to the app element
const appDiv: HTMLElement | null = document.getElementById("app");
if (appDiv) {
  appDiv.appendChild(counterDiv);
}

function updateCounterDisplay(div: HTMLDivElement) {
  if (counter == 1) {
    div.innerHTML = `${counter} steak`;
  } else {
    div.innerHTML = `${counter} steaks`;
  }
}

function incrementCounter() {
  counter += 1;
  const counterDiv: HTMLElement | null =
    document.getElementById("counterDisplay");
  if (counterDiv) {
    updateCounterDisplay(counterDiv as HTMLDivElement);
  }
}

const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🥩";
button.onclick = incrementCounter;
if (appDiv) {
  appDiv.appendChild(button);
}

setInterval(incrementCounter, 1000)