import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Frank's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter: number = 0;
let lastTimestamp: number = performance.now();
const incrementPerSecond: number = 1;

const counterDiv: HTMLDivElement = document.createElement("div");
counterDiv.id = "counterDisplay";
updateCounterDisplay(counterDiv);

// Append the counterDiv to the app element
const appDiv: HTMLElement | null = document.getElementById("app");
if (appDiv) {
  appDiv.appendChild(counterDiv);
}

function updateCounterDisplay(div: HTMLDivElement) {
  if (Math.floor(counter) == 1) {
    div.innerHTML = `${Math.floor(counter)} steak`;
  } else {
    div.innerHTML = `${Math.floor(counter)} steaks`;
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

function continuousGrowth() {
  const currentTimestamp = performance.now();
  const delta = currentTimestamp - lastTimestamp; // Calculate time elapsed
  const increment = (incrementPerSecond * delta) / 1000; // Calculate frame-based increment
  counter += increment;

  updateCounterDisplay(counterDiv); // Update counter display

  lastTimestamp = currentTimestamp;
  requestAnimationFrame(continuousGrowth); // Request next frame
}

requestAnimationFrame(continuousGrowth); 