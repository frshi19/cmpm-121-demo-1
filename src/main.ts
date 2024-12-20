import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Steak Cutter";
document.title = gameName;
app.innerHTML = `<h1>${gameName}</h1>`;

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

const costScale = 1.15;

let counter = 0,
  lastTimestamp = performance.now(),
  growthRate = 0;
const upgradeCounts = new Array(availableItems.length).fill(0);

const descriptions: Record<string, string> = {
  Butcher:
    "A cattle butchering butch butcher that creates 1 steak every 10 seconds",
  "Steak House": "Serves fresh raw steaks straight from the source",
  "Packing Plant": "Provides packed prime porterhouses with premium packaging",
  "Steer Slaughterer":
    "Skilled staff slaughter steers and supply select steaks",
  "Cattle Cloner": "Clone carbon-copy cattle to cultivate continuously",
};

function createDivElement(id: string): HTMLDivElement {
  const div = document.createElement("div");
  div.id = id;
  app.appendChild(div);
  return div;
}

function updateDisplay() {
  counterDiv.innerHTML = `${Math.trunc(counter * 10) / 10} ${counter == 1 ? "steak" : "steaks"}`;
  statusDiv.innerHTML = `per second: ${Math.trunc(growthRate * 100) / 100}`;
  // iterate through all the upgrade buttons and disable them if the cost is too high and enable them if the cost is low enough
  availableItems.forEach((item, i) => {
    const upgradeButton = upgradeDiv.children[i] as HTMLButtonElement;
    upgradeButton.disabled = counter < item.cost;
  });
}

function createButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.innerHTML = "🥩";
  button.style.fontSize = "100px"; // Inspiration: https://shawn-sw.github.io/cmpm-121-demo-1/
  button.style.backgroundColor = "transparent";
  button.style.border = "none";
  button.style.outline = "none";
  button.addEventListener("click", () => {
    counter++;
    updateDisplay();
  });
  return button;
}

function createUpgradeButton(item: Item, index: number) {
  const upgradeButton = document.createElement("button");
  upgradeButton.title = descriptions[item.name];
  upgradeDiv.appendChild(upgradeButton);
  updateUpgradeButton(upgradeButton, item, index);
}

function updateUpgradeButton(
  button: HTMLButtonElement,
  item: Item,
  index: number,
) {
  button.innerHTML = `${item.name} (Count: ${upgradeCounts[index]}) (Cost: ${Math.trunc(item.cost * 100) / 100})`;
  button.addEventListener("click", () => {
    applyButtonUpgrade(button, item, index);
  });
}

function applyButtonUpgrade(
  button: HTMLButtonElement,
  item: Item,
  index: number,
) {
  if (counter >= item.cost) {
    counter -= item.cost;
    growthRate += item.rate;
    upgradeCounts[index]++;
    item.cost *= costScale;
    updateDisplay();
    updateUpgradeButton(button, item, index);
  }
}

function continuousGrowth() {
  const currentTimestamp = performance.now();
  const delta = currentTimestamp - lastTimestamp;
  counter += (delta * growthRate) / 1000;
  lastTimestamp = currentTimestamp;
  updateDisplay();
  requestAnimationFrame(continuousGrowth);
}

// set body background color to db5050
document.body.style.backgroundColor = "#db5050"; // Inspiration: https://rozy-dixon.github.io/cmpm-121-demo-1/

const counterDiv = createDivElement("counterDisplay");
counterDiv.style.fontSize = "50px";
const statusDiv = createDivElement("status");
statusDiv.style.fontSize = "20px";
const upgradeDiv = createDivElement("upgrades");

app.append(counterDiv, createButton(), statusDiv, upgradeDiv);
availableItems.forEach((item, i) => createUpgradeButton(item, i));
requestAnimationFrame(continuousGrowth);
