import { copyCodePlugin } from "vuepress-plugin-copy-code2";
import { navbar } from "./config/navConfig";
import { head } from "./config/headConfig";
import { defaultTheme } from "vuepress";
import sidebarConfig from "./config/sidebarConfig";
import { searchPlugin } from "@vuepress/plugin-search";

export default {
  lang: "zh-CN",
  title: "故事",
  description: "故事的个人博客",
  base: "/",
  plugins: [
    copyCodePlugin({
      // 插件选项
    }),
    searchPlugin({
      locales: {
        "/": {
          placeholder: "搜索",
        },
      },
      hotKeys: [
        {
          key: "k",
          ctrl: true,
        },
        {
          key: "K",
          ctrl: true,
        },
      ],
      maxSuggestions: 10,
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    }),
  ],
  theme: defaultTheme({
    navbar,
    sidebar: sidebarConfig,
    colorModeSwitch: true,
    repo: "storyxc/document",
    sidebarDepth: 0,
    docsDir: "docs",
    docsBranch: "main",
    docsRepo: "storyxc/document",
    editLinkText: "在GitHub上编辑此页",
    lastUpdatedText: "上次更新",
    contributorsText: "贡献者",
  }),
  head,
};
