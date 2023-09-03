import { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "故事" }],
    [
        "meta",
        {
            name: "keywords",
            content: "Java,Python,Golang,Linux,JavaScript,Vue,VitePress,后端开发,前端开发,全栈开发",
        },
    ],
];
