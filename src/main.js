import { createApp } from "vue";
import App from "./App.vue";
import { APP_ID } from './config'
import './index.css'
function inject() {
  let div = document.createElement("div");
  div.setAttribute("id", APP_ID);
  document.body.appendChild(div);
  createApp(App).mount(`#${APP_ID}`);
}

inject()