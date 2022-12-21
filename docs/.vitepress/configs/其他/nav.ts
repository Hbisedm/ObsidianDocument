import { generateNavItem } from "./../util";

const commonPath = "/工作区/";

export const devTool = "开发工具";
export const devQuestion = "开发问题";
export const experienceQuestion = "项目经验";
export const skills = "技巧操作";
const develop = [devTool, devQuestion, experienceQuestion, skills];

export const performance = "性能调优";
export const readSource = "阅读源码";
export const packageTool = "打包工具";
export const engineering = "工程化";
export const designPatterns = "设计模式";
const up = [performance, readSource, engineering, packageTool, designPatterns];

const a = generateNavItem("开发", commonPath, develop);
const b = generateNavItem("提升", commonPath, up);

export const otherNav = {
  text: "其他",
  items: [a, b],
};
