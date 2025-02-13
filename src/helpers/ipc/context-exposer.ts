import { exposeThemeContext } from "./theme/route";
import { exposeWindowContext } from "./window/window-context";
import { exposeApiContext } from "./api/route";

export default function exposeContexts() {
  exposeWindowContext();
  exposeThemeContext();
  exposeApiContext();
}
