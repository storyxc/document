import { type DefaultTheme } from "vitepress";

export const navbar: DefaultTheme.NavItem[] = [
    { text: "首页", link: "/" },
    // { text: "Guide", link: "/guide" },
    {
        text: "Java",
        link: "/java/",
    },
    {
        text: "Python",
        link: "/python/",
    },
    {
        text: "Golang",
        link: "/golang/",
    },
    {
        text: "Linux",
        link: "/linux/",
    },
    {
        text: "Frontend",
        link: "/frontend/",
    },
    {
        text: "Docker",
        link: "/docker/",
    },
    {
        text: "实践",
        link: "/actions/",
    },
    {
        text: "折腾",
        link: "/tinker/",
    }
];
