import { BrowserWindow } from "electron";
import { addThemeEventListeners } from "./theme/route";
import { addWindowEventListeners } from "./window/window-listeners";
import { addApiEventListeners } from "./api/route";

export default function registerListeners(mainWindow: BrowserWindow) {
  addWindowEventListeners(mainWindow);
  addThemeEventListeners();
  addApiEventListeners();
}
