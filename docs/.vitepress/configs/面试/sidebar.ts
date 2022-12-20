import { walk } from "../util";
import { openQuestion, penQuestion, speechless } from "./nav";

const path = "./docs/工作区/关于面试/";
const commonPath = "/工作区/关于面试/";

const boringSidebar = [walk(path, speechless)];
const penSidebar = [walk(path, penQuestion)];
const openSidebar = [walk(path, openQuestion)];

export const interviewSidebar = {
  [commonPath + speechless]: boringSidebar,
  [commonPath + penQuestion]: penSidebar,
  [commonPath + openQuestion]: openSidebar,
};
