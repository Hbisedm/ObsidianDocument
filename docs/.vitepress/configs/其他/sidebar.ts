import {
  designPatterns,
  devQuestion,
  devTool,
  engineering,
  experienceQuestion,
  packageTool,
  performance,
  readSource,
  skills,
} from "./nav";
import { walk } from "../util";

const path = "./docs/工作区/";
const commonPath = "/工作区/";

const devToolSidebar = [walk(path, devTool)];
const devQuestionSidebar = [walk(path, devQuestion)];
const experienceQuestionSidebar = [walk(path, experienceQuestion)];
const skillsSidebar = [walk(path, skills)];
const performanceSidebar = [walk(path, performance)];
const readSourceSidebar = [walk(path, readSource)];
const packageToolSidebar = [
  walk(path, packageTool),
  walk(path, packageTool + "/Vite"),
  walk(path, packageTool + "/webpack"),
];
const designPatternsSidebar = [walk(path, designPatterns)];

const engineeringSub = ["打包工具/Vite", "打包工具/webpack"];

const engineeringSidebar = [walk(path, engineering)];

engineeringSub.forEach((item) => {
  engineeringSidebar.push(walk(path, engineering + "/" + item));
});

export const otherSidebar = {
  [commonPath + devTool]: devToolSidebar,
  [commonPath + devQuestion]: devQuestionSidebar,
  [commonPath + experienceQuestion]: experienceQuestionSidebar,
  [commonPath + skills]: skillsSidebar,
  [commonPath + performance]: performanceSidebar,
  [commonPath + readSource]: readSourceSidebar,
  [commonPath + packageTool]: packageToolSidebar,
  [commonPath + designPatterns]: designPatternsSidebar,
  [commonPath + engineering]: engineeringSidebar,
};
