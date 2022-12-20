import { CSS, JavaScript, browser, cd, html, network, oop } from "./nav";
import { walk } from "../util";

const path = "./docs/工作区/基本知识/";
const commonPath = "/工作区/基本知识/";
const expandPath = "/工作区/";

const browserSidebar = [walk(path, browser)];
const htmlSidebar = [walk(path, html)];
const cssSidebar = [walk(path, CSS)];
const oopSidebar = [walk(path, oop)];
const javaScriptSidebar = [walk(path, JavaScript)];
const cdSidebar = [walk(path, cd)];
const networkSidebar = [walk("./docs" + expandPath, network)];

export const baseSidebar = {
  [commonPath + html]: htmlSidebar,
  [commonPath + CSS]: cssSidebar,
  [commonPath + JavaScript]: javaScriptSidebar,
  [commonPath + oop]: oopSidebar,
  [commonPath + cd]: cdSidebar,
  [commonPath + browser]: browserSidebar,
  [expandPath + network]: networkSidebar,
};
