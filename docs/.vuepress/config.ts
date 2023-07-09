import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { navbar } from "./config/navConfig";
import { head } from "./config/headConfig";
import { defaultTheme } from "vuepress";
import sidebarConfig from "./config/sidebarConfig";

export default {
  lang: "zh-CN",
  title: "故事",
  description: "故事的个人博客",
  base: "/",
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
  ],
  theme: defaultTheme({
    navbar,
    sidebar: sidebarConfig,
    colorModeSwitch: true,
    repo: "storyxc/document",
    sidebarDepth: 0,
    editLinkText: "在GitHub上编辑此页",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
  }),
  head,
};
