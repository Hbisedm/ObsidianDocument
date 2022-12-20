import { generateNavItem } from "./../util";

const commonPath = "/工作区/基本知识/";
const expandPath = "/工作区/";

export const html = "HTML";
export const CSS = "CSS";
export const JavaScript = "JavaScript";
const base = [html, CSS, JavaScript];

export const oop = "面向对象";
export const cd = "C端开发";
export const browser = "浏览器";
export const network = "网络知识";
const expand = [oop, cd, browser];

const a = generateNavItem("前端三剑客", commonPath, base);
const b = generateNavItem("拓展", commonPath, expand);
const c = generateNavItem("", expandPath, [network]);

export const baseNav = {
  text: "基本知识",
  //   activeMatch: "/工作区/基本知识/",
  items: [a, b, c],
};
