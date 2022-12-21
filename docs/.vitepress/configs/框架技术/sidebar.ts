import {
  officialAccounts,
  miniProgram,
  react,
  tailwindCss,
  ts,
  vue,
} from "./nav";
import { walk } from "../util";

const path = "./docs/工作区/框架技术/";
const commonPath = "/工作区/框架技术/";

const vueSub = [
  "插件开发",
  "开发操作",
  "项目搭建",
  "学习源码",
  "原理",
  "组件",
  "VueRouter",
  "Vuex",
];

const officialAccountSidebar = [walk(path, officialAccounts)];
const miniProgramSidebar = [walk(path, miniProgram)];
const reactSidebar = [walk(path, react)];
const tailwindCssSidebar = [walk(path, tailwindCss)];
const tsSidebar = [walk(path, ts)];
const vueSidebar = [walk(path, vue)];
vueSub.forEach((item) => {
  vueSidebar.push(walk(path, vue + "/" + item));
});

export const frameworkSidebar = {
  [commonPath + officialAccounts]: officialAccountSidebar,
  [commonPath + miniProgram]: miniProgramSidebar,
  [commonPath + react]: reactSidebar,
  [commonPath + tailwindCss]: tailwindCssSidebar,
  [commonPath + ts]: tsSidebar,
  [commonPath + vue]: vueSidebar,
};
