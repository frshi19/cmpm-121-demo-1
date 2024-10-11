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
  { name: "Steak House", cost: 100, rate: 2 },
  { name: "Packing Plant", cost: 1000, rate: 30 },
  { name: "Steer Slaughterer", cost: 10000, rate: 400 },
  { name: "Cattle Cloner", cost: 100000, rate: 5000 },
];

// empty list to hold upgrade buttons
const upgradeButtons: HTMLButtonElement[] = [];

// global variables
let counter: number = 0;
let lastTimestamp: number = performance.now();
const incrementPerSecond: number = 1;
let growthRate: number = 0;

// make a list of upgrade counts for each available item, so 5 items starting at 0
const upgradeCounts: number[] = [0, 0, 0, 0, 0];

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

// function to create upgrade buttons and push them to upgradeButtons list
function createUpgradeButton(item: Item, index: number) {
  const upgradeButton: HTMLButtonElement = document.createElement("button");
  upgradeButton.innerHTML = `${item.name} (Count: ${upgradeCounts[index]}) (Cost: ${item.cost})`;
  // apply descriptive title to button
  if (item.name == "Butcher")
    upgradeButton.title =
      "A cattle butchering butch butcher that creates 1 steak every 10 seconds";
  else if (item.name == "Steak House")
    upgradeButton.title = "Serves fresh raw steaks straight from the source";
  else if (item.name == "Packing Plant")
    upgradeButton.title =
      "Provides packed prime porterhouses with premium packaging";
  else if (item.name == "Steer Slaughterer")
    upgradeButton.title =
      "Skilled staff slaughter steers and supply select steaks";
  else if (item.name == "Cattle Cloner")
    upgradeButton.title = "Clone carbon-copy cattle to cultivate continuously";
  upgradeButton.addEventListener("click", () => {
    if (counter >= item.cost) {
      counter -= item.cost;
      growthRate += item.rate;
      upgradeCounts[index]++;
      item.cost *= 1.15;
      updateCounterDisplay(counterDiv);
      updateStatusDisplay(statusDiv);
      updateUpgradeDisplay(
        upgradeButton,
        item.name,
        upgradeCounts[index],
        item.cost,
      );
    }
  });
  upgradeButtons.push(upgradeButton);
  upgradeDiv.appendChild(upgradeButton);
}

// function to check if upgrade is available
function checkUpgradeAvailability(cost: number) {
  if (counter < cost) {
    return true;
  } else {
    return false;
  }
}

// Increments steak
function continuousGrowth() {
  const currentTimestamp = performance.now();
  const delta = currentTimestamp - lastTimestamp; // Calculate time elapsed
  const increment = (incrementPerSecond * delta) / 1000; // Calculate frame-based increment
  counter += increment * growthRate;

  updateCounterDisplay(counterDiv); // Update counter display

  lastTimestamp = currentTimestamp;

  //iterate through upgradeButtons and disable if not enough steaks and enable if enough steaks
  for (let i = 0; i < upgradeButtons.length; i++) {
    if (checkUpgradeAvailability(availableItems[i].cost)) {
      upgradeButtons[i].disabled = true;
    } else {
      upgradeButtons[i].disabled = false;
    }
  }

  requestAnimationFrame(continuousGrowth); // Request next frame
}

//create upgrade buttons for each item in availableItems
for (let i = 0; i < availableItems.length; i++) {
  createUpgradeButton(availableItems[i], i);
}
requestAnimationFrame(continuousGrowth);
