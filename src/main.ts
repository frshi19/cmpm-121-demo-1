import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Frank's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// global variables
let counter: number = 0;
let lastTimestamp: number = performance.now();
const incrementPerSecond: number = 1;
let growthRate: number = 0;

// create counter display
const counterDiv: HTMLDivElement = document.createElement("div");
counterDiv.id = "counterDisplay";
updateCounterDisplay(counterDiv);

// Append the counterDiv to the app element
const appDiv: HTMLElement | null = document.getElementById("app");
if (appDiv) {
  appDiv.appendChild(counterDiv);
}

// function for updating counter display
function updateCounterDisplay(div: HTMLDivElement) {
  if (Math.floor(counter) == 1) {
    div.innerHTML = `${Math.floor(counter)} steak`;
  } else {
    div.innerHTML = `${Math.floor(counter)} steaks`;
  }
}

// Increases counter by 1
function incrementCounter() {
  counter += 1;
  const counterDiv: HTMLElement | null =
    document.getElementById("counterDisplay");
  if (counterDiv) {
    updateCounterDisplay(counterDiv as HTMLDivElement);
  }
}

// create the button
const button: HTMLButtonElement = document.createElement("button");
button.innerHTML = "🥩";
button.onclick = incrementCounter;
if (appDiv) {
  appDiv.appendChild(button);
}

// function to increate the growth rate
function increaseGrowthRate() {
  growthRate += 1;
  counter -= 10;
}

// create upgrade div
const upgradeDiv: HTMLDivElement = document.createElement("div");
upgradeDiv.id = "upgrades";

// Append the upgradeDiv to the app element
if (appDiv) {
  appDiv.appendChild(upgradeDiv);
}

// create upgrade button
const upgradeButton: HTMLButtonElement = document.createElement("button");
upgradeButton.innerHTML = "Butcher"
if (appDiv) {
  upgradeDiv.appendChild(upgradeButton);
}
upgradeButton.onclick = increaseGrowthRate;

// Increments steak
function continuousGrowth() {
  const currentTimestamp = performance.now();
  const delta = currentTimestamp - lastTimestamp; // Calculate time elapsed
  const increment = (incrementPerSecond * delta) / 1000; // Calculate frame-based increment
  counter += increment * growthRate;

  updateCounterDisplay(counterDiv); // Update counter display

  lastTimestamp = currentTimestamp;
  requestAnimationFrame(continuousGrowth); // Request next frame

  // check if upgrade is available
  if (counter < 10) {
    upgradeButton.disabled = true;
  }
  else if (counter >= 10) {
    upgradeButton.disabled = false;
  }
}

requestAnimationFrame(continuousGrowth);
