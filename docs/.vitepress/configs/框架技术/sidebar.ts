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

const officialAccountSidebar = [walk(path, officialAccounts)];
const miniProgramSidebar = [walk(path, miniProgram)];
const reactSidebar = [walk(path, react)];
const tailwindCssSidebar = [walk(path, tailwindCss)];
const tsSidebar = [walk(path, ts)];
const vueSidebar = [walk(path, vue)];

export const frameworkSidebar = {
  [commonPath + officialAccounts]: officialAccountSidebar,
  [commonPath + miniProgram]: miniProgramSidebar,
  [commonPath + react]: reactSidebar,
  [commonPath + tailwindCss]: tailwindCssSidebar,
  [commonPath + ts]: tsSidebar,
  [commonPath + vue]: vueSidebar,
};
