const path = require("path");
const fs = require("fs");

// 动态生成侧边栏函数
export const walk = function (dir, subDir = "") {
  let results: any = [];
  const list = fs.readdirSync(dir + subDir);
  list.forEach((file) => {
    file = dir + subDir + "/" + file;
    if (path.extname(file) === ".md") {
      results.push(file);
    }
  });
  const items = results
    .map((item) => {
      return {
        text: path.basename(item, ".md"),
        link: item.slice(6, -3),
      };
    })
    .sort((a, b) => {
      const index1 = Number(a.text.split(".")[0]);
      const index2 = Number(b.text.split(".")[0]);
      return index1 - index2;
    });
  return {
    text: subDir,
    collapsible: true,
    collapsed: false,
    items: items,
  };
};

export const generateNavItem = (
  navName: string,
  commonPath: string,
  dirNames: string[]
) => {
  const len = dirNames.length;

  const items = dirNames.reduce((prev, curr) => {
    const item = {
      text: curr,
      link: commonPath + curr + "/README",
    };
    prev.push(item);
    return prev;
  }, [] as { text: string; link: string }[]);

  return {
    text: navName,
    items,
  };
};
