import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Frank's amazing game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button : HTMLButtonElement = document.createElement('button');
button.innerHTML = '🥩';
const appDiv: HTMLElement | null = document.getElementById('app');
if (appDiv) {
    appDiv.appendChild(button);
}