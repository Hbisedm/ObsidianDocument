import {
  designPatterns,
  devQuestion,
  devTool,
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

export const otherSidebar = {
  [commonPath + devTool]: devToolSidebar,
  [commonPath + devQuestion]: devQuestionSidebar,
  [commonPath + experienceQuestion]: experienceQuestionSidebar,
  [commonPath + skills]: skillsSidebar,
  [commonPath + performance]: performanceSidebar,
  [commonPath + readSource]: readSourceSidebar,
  [commonPath + packageTool]: packageToolSidebar,
  [commonPath + designPatterns]: designPatternsSidebar,
};
