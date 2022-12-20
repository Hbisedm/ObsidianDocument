import { generateNavItem } from "./../util";

const commonPath = "/工作区/关于面试/";

export const speechless = "八股文";
export const penQuestion = "笔试题";
export const openQuestion = "开放题";
const expand = [speechless, penQuestion, openQuestion];

export const interviewNav = {
  text: "关于面试",
  items: [generateNavItem("", commonPath, expand)],
};
