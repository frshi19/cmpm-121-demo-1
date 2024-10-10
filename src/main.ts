import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Steak Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// step 9 code
interface Item {
  name: string;
  cost: number;
  rate: number;
}

const availableItems: Item[] = [
  { name: "Butcher", cost: 10, rate: 0.1 },
  { name: "Farm", cost: 100, rate: 2 },
  { name: "Steak House", cost: 1000, rate: 50 },
];

// global variables
let counter: number = 0;
let lastTimestamp: number = performance.now();
const incrementPerSecond: number = 1;
let growthRate: number = 0;

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
  if (Math.trunc(counter * 10) / 10 == 1) {
    div.innerHTML = `${Math.trunc(counter * 10) / 10} steak`;
  } else {
    div.innerHTML = `${Math.trunc(counter * 10) / 10} steaks`;
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
statusDiv.id = "status";

if (appDiv) {
  appDiv.appendChild(statusDiv);
}

statusDiv.innerHTML = `per second: ${growthRate}`;

// function for updating status display
function updateStatusDisplay(div: HTMLDivElement) {
  div.innerHTML = `per second: ${Math.trunc(growthRate * 100) / 100}`;
}

// create upgrade div
const upgradeDiv: HTMLDivElement = document.createElement("div");
upgradeDiv.id = "upgrades";

// Append the upgradeDiv to the app element
if (appDiv) {
  appDiv.appendChild(upgradeDiv);
}

function updateUpgradeDisplay(
  div: HTMLButtonElement,
  upgradeName: string,
  count: number,
  cost: number,
) {
  div.innerHTML = `${upgradeName} (Count: ${count}) (Cost: ${Math.trunc(cost * 100) / 100})`;
}

// create upgrade button A
const upgradeButtonA: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(
  upgradeButtonA,
  availableItems[0].name,
  upgradeACount,
  availableItems[0].cost,
);
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonA);
}
upgradeButtonA.addEventListener("click", () => {
  increaseGrowthRate(availableItems[0].rate, availableItems[0].cost);
  updateStatusDisplay(statusDiv);
  upgradeACount += 1;
  availableItems[0].cost *= 1.15;
  updateUpgradeDisplay(
    upgradeButtonA,
    availableItems[0].name,
    upgradeACount,
    availableItems[0].cost,
  );
});

// create upgrade button B
const upgradeButtonB: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(
  upgradeButtonB,
  availableItems[1].name,
  upgradeBCount,
  availableItems[1].cost,
);
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonB);
}
upgradeButtonB.addEventListener("click", () => {
  increaseGrowthRate(availableItems[1].rate, availableItems[1].cost);
  updateStatusDisplay(statusDiv);
  upgradeBCount += 1;
  availableItems[1].cost *= 1.15;
  updateUpgradeDisplay(
    upgradeButtonB,
    availableItems[1].name,
    upgradeBCount,
    availableItems[1].cost,
  );
});

// create upgrade button C
const upgradeButtonC: HTMLButtonElement = document.createElement("button");
updateUpgradeDisplay(
  upgradeButtonC,
  availableItems[2].name,
  upgradeCCount,
  availableItems[2].cost,
);
if (appDiv) {
  upgradeDiv.appendChild(upgradeButtonC);
}
upgradeButtonC.addEventListener("click", () => {
  increaseGrowthRate(availableItems[2].rate, availableItems[2].cost);
  updateStatusDisplay(statusDiv);
  upgradeCCount += 1;
  availableItems[2].cost *= 1.15;
  updateUpgradeDisplay(
    upgradeButtonC,
    availableItems[2].name,
    upgradeCCount,
    availableItems[2].cost,
  );
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
  if (counter < availableItems[0].cost) {
    upgradeButtonA.disabled = true;
  } else if (counter >= availableItems[0].cost) {
    upgradeButtonA.disabled = false;
  }

  // check if upgrade B is available
  if (counter < availableItems[1].cost) {
    upgradeButtonB.disabled = true;
  } else if (counter >= availableItems[1].cost) {
    upgradeButtonB.disabled = false;
  }

  // check if upgrade C is available
  if (counter < availableItems[2].cost) {
    upgradeButtonC.disabled = true;
  } else if (counter >= availableItems[2].cost) {
    upgradeButtonC.disabled = false;
  }
}

requestAnimationFrame(continuousGrowth);
