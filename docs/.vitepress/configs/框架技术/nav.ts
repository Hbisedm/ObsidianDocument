import { generateNavItem } from "./../util";

const commonPath = "/工作区/框架技术/";

export const officialAccounts = "公众号";
export const tailwindCss = "TailwindCSS";
export const react = "React";
export const ts = "TypeScript";
export const vue = "Vue";
export const miniProgram = "小程序";

const base = [officialAccounts, tailwindCss, react, ts, vue, miniProgram];

const a = generateNavItem("", commonPath, base);

export const frameworkNav = {
  text: "框架技术",
  //   activeMatch: "/工作区/基本知识/",
  items: [a],
};
