import { defineConfig } from 'vitepress'
import { head } from "./config/headConfig"
import { sidebar } from "./config/sidebarConfig"
import { navbar } from "./config/navConfig";

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "故事而已的个人站",
    description: "document",
    lastUpdated: true,
    cleanUrls: false,
    base: "/",
    head: head,
    themeConfig: {
        search: {
            provider: 'algolia',
            options: {
                appId: 'TPENR7QRGF',
                apiKey: 'd9aad78323bfe2cbe216b0da54f9fd68',
                indexName: 'storyxc'
            }
        },
        logo: { src: '/favicon.ico' },
        // https://vitepress.dev/reference/default-theme-config
        nav: navbar,
        socialLinks: [
            { icon: 'github', link: 'https://github.com/storyxc' }
        ],
        sidebar: sidebar,
        editLink: {
            text: '在 GitHub 上编辑此页',
            pattern: 'https://github.com/storyxc/document/edit/main/docs/:path',
        },
        footer: {
            message: '<a href="https://beian.miit.gov.cn/" target="_blank">豫ICP备19046036号</a></span>',
            copyright: 'Copyright © 2019-2024<span><a href="https://storyxc.com" target="_blank" style="font-weight:bold"> story</a>'
        }
    }
})
