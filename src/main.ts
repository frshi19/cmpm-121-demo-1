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
const upgradeACost = 10;
const upgradeBCost = 100;
const upgradeCCost = 1000;
let upgradeACount = 0;
let upgradeBCount = 0;
let upgradeCCount = 0;

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
button.addEventListener("click", () => {
  incrementCounter();
});
if (appDiv) {
  appDiv.appendChild(button);
}

// function to increate the growth rate
function increaseGrowthRate(amount: number, cost: number) {
  growthRate += amount;
  counter -= cost;
}

// create status div
const statusDiv: HTMLDivElement = document.createElement("div");
statusDiv.id = "status"

if (appDiv) {
  appDiv.appendChild(statusDiv);
}

statusDiv.innerHTML = `per second: ${growthRate}`;

// function for updating status display
function updateStatusDisplay(div: HTMLDivElement) {
  div.innerHTML = `per second: ${growthRate}`;
}

// create upgrade div
const upgradeDiv: HTMLDivElement = document.createElement("div");
upgradeDiv.id = "upgrades";

// Append the upgradeDiv to the app element
if (appDiv) {
  appDiv.appendChild(upgradeDiv);
}

function updateUpgradeDisplay(div: HTMLButtonElement, upgradeName: string, count: number) {
  div.innerHTML = `${upgradeName} (Count: ${count})`
}

// create upgrade button A
const upgradeButtonA: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(upgradeButtonA, "Butcher", upgradeACount)
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonA);
}
upgradeButtonA.addEventListener("click", () => {
  increaseGrowthRate(0.1, upgradeACost);
  updateStatusDisplay(statusDiv);
  upgradeACount += 1;
  updateUpgradeDisplay(upgradeButtonA, "Butcher", upgradeACount)
});

// create upgrade button B
const upgradeButtonB: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(upgradeButtonB, "Farm", upgradeBCount)
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonB);
}
upgradeButtonB.addEventListener("click", () => {
  increaseGrowthRate(2.0, upgradeBCost);
  updateStatusDisplay(statusDiv);
  upgradeBCount += 1;
  updateUpgradeDisplay(upgradeButtonB, "Farm", upgradeBCount)
});

// create upgrade button C
const upgradeButtonC: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(upgradeButtonC, "Steak House", upgradeCCount)
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonC);
}
upgradeButtonC.addEventListener("click", () => {
  increaseGrowthRate(50, upgradeCCost);
  updateStatusDisplay(statusDiv);
  upgradeCCount += 1;
  updateUpgradeDisplay(upgradeButtonC, "Steak House", upgradeCCount)
});

// Increments steak
function continuousGrowth() {
  const currentTimestamp = performance.now();
  const delta = currentTimestamp - lastTimestamp; // Calculate time elapsed
  const increment = (incrementPerSecond * delta) / 1000; // Calculate frame-based increment
  counter += increment * growthRate;

  updateCounterDisplay(counterDiv); // Update counter display

  lastTimestamp = currentTimestamp;
  requestAnimationFrame(continuousGrowth); // Request next frame

  // check if upgrade A is available
  if (counter < upgradeACost) {
    upgradeButtonA.disabled = true;
  } else if (counter >= upgradeACost) {
    upgradeButtonA.disabled = false;
  }

  // check if upgrade B is available
  if (counter < upgradeBCost) {
    upgradeButtonB.disabled = true;
  } else if (counter >= upgradeBCost) {
    upgradeButtonB.disabled = false;
  }

  // check if upgrade C is available
  if (counter < upgradeCCost) {
    upgradeButtonC.disabled = true;
  } else if (counter >= upgradeCCost) {
    upgradeButtonC.disabled = false;
  }
}

requestAnimationFrame(continuousGrowth);
