import App from "./src/app";
import "./style.css";
import { $ } from "./src/utils/querySelector";

window.addEventListener("DOMContentLoaded", (e) => {
  new App($("#app"));
});
