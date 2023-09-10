import { type DefaultTheme } from "vitepress/types/default-theme";

export const sidebar: DefaultTheme.Sidebar = {
    "/java": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "String类的深入学习", link: "/java/base/class-string-leaning" },
                { text: "JDK1.8HashMap源码学习", link: "/java/base/hashmap-learning" },
                { text: "Java8新特性回顾", link: "/java/base/java8-features" },
            ],
        },
        {
            text: "框架",
            collapsed: false,
            items: [
                { text: "ConfigurationProperties注解", link: "/java/framework/configuration-properties-annotation" },
                {
                    text: "JavaSPI机制和Springboot自动装配原理",
                    link: "/java/framework/java-spi-spring-autoconfig"
                },
                { text: "Java日志发展历史", link: "/java/framework/java-log-history" },
                { text: "Mybatis Generator配置", link: "/java/framework/mybatis-generator-config" },
                {
                    text: "POI事件模式解析并读取Excel文件数据",
                    link: "/java/framework/poi-event-mode-read-excel"
                },
                { text: "Spring Cloud Config接入", link: "/java/framework/spring-cloud-config" },
                { text: "SpringMVC的执行流程源码分析", link: "/java/framework/springmvc-process-analysis" },
                { text: "dubbo接口超时配置", link: "/java/framework/dubbo-timeout-config" },
                { text: "logback自定义", link: "/java/framework/logback-config" },
                { text: "netty+websocket实现即时通讯功能", link: "/java/framework/netty-websocket-im" },
                {
                    text: "spring-session实现集群session共享",
                    link: "/java/framework/spring-session"
                },
                { text: "springcloud优雅下线服务", link: "/java/framework/springcloud-graceful-shutdown" },
                { text: "swagger+knife4j", link: "/java/framework/swagger-knife4j" },
                { text: "使用EasyExcel导出excel", link: "/java/framework/easyexcel-export" },
                {
                    text: "使用spring validation进行参数校验",
                    link: "/java/framework/spring-validation"
                },
                { text: "分布式定时任务解决方案xxl-job", link: "/java/framework/xxljob" },
                { text: "后端允许跨域配置", link: "/java/framework/cors" },
                { text: "自定义MybatisPlusGenerator", link: "/java/framework/mybatisplus-generator" },
                { text: "Spring配置和条件化组件加载注解", link: "/java/framework/spring-conditional" },
            ],
        },
        {
            text: "中间件",
            collapsed: false,
            items: [
                { text: "分布式锁解决方案", link: "/java/middleware/distributed-lock" },
                { text: "关于消息中间件MQ", link: "/java/middleware/mq" },
                { text: "kafka学习记录", link: "/java/middleware/kafka-learning" },
                { text: "kakfa实践", link: "/java/middleware/kafka-practice" },
                { text: "kakfa重复消费问题处理", link: "/java/middleware/kafka-duplicate-consumption" },
                { text: "kafka常用命令记录", link: "/java/middleware/kafka-cmd" },
            ],
        },
        {
            text: "数据库",
            collapsed: false,
            items: [
                { text: "MySql索引", link: "/java/database/mysql-index" },
                { text: "SQL优化学习", link: "/java/database/sql-optimize" },
                { text: "Otter实现数据全量增量同步", link: "/java/database/otter-sync" },
            ],
        },
        {
            text: "工具",
            collapsed: false,
            items: [
                { text: "Maven的生命周期", link: "/java/devtool/maven-lifecycle" },
                { text: "nexus无法下载依赖的问题记录", link: "/java/devtool/nexus-resolve-dependency" },
            ],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                { text: "linux服务器安装OpenOffice踩坑", link: "/java/others/linux-openoffice" },
                { text: "POI踩坑-zip file is closed", link: "/java/others/poi-zip-closed" },
                { text: "OpenJDK没有jstack等命令的解决办法", link: "/java/others/openjdk-jstack" },
                { text: "微信小程序加密数据对称解密工具类", link: "/java/others/wechat-decrypt" },
                {
                    text: "mybatis的classpath配置导致的jar包读取问题",
                    link: "/java/others/mybatis-classpath-config"
                },
                { text: "feign请求导致的用户ip获取问题记录", link: "/java/others/feign-request-userip-issue" },
                { text: "ribbon刷新服务列表间隔和canal的坑", link: "/java/others/ribbon-refresh-canal-issue" },
                { text: "cpu占用率高排查思路", link: "/java/others/cpu-high-usage-troubleshoot" },
            ],
        },
    ],
    "/python": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "python基础语法", link: "/python/base/python-syntax" },
                { text: "python并发编程", link: "/python/base/python-concurrency" },
                { text: "装饰器深入", link: "/python/base/python-decorator" },
            ],
        },
        {
            text: "爬虫",
            collapsed: false,
            items: [
                { text: "requests模块入门", link: "/python/crawler/requests-module" },
                { text: "验证码识别和模拟登录", link: "/python/crawler/captcha-identification-login" },
                { text: "多线程爬取梨视频网站的热门视频", link: "/python/crawler/multithreaded-crawling-pear-video" },
                { text: "selenium模块", link: "/python/crawler/selenium-module" },
                { text: "python配合ffmpeg下载bilibili视频", link: "/python/crawler/python-ffmpeg-download-bilibili" },
                { text: "scrapy框架入门", link: "/python/crawler/scrapy-basic" },
                { text: "scrapy进阶", link: "/python/crawler/scrapy-advanced" },
                { text: "CrawlSpider全站爬取", link: "/python/crawler/crawl-spider-full-station-crawl" },
                { text: "分布式爬虫和增量式爬虫", link: "/python/crawler/distributed-incremental-crawler" },
                {
                    text: "增量式爬虫实践案例 下载指定b站up主的所有作品",
                    link: "/python/crawler/incr-bilibili"
                },
                { text: "小红书爬虫", link: "/python/crawler/xiaohongshu-crawler" },
            ],
        },
        {
            text: "web",
            collapsed: false,
            items: [
                { text: "Django入门", link: "/python/web/django-basic" },
                { text: "pymysql使用", link: "/python/web/pymysql-usage" },
            ],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                { text: "argparse模块入门", link: "/python/others/argparse-basic" },
                { text: "切换windows代理设置开关", link: "/python/others/windows-proxy-switch" },
                {
                    text: "Alfred插件-快速使用编辑器打开指定文件",
                    link: "/python/others/alfred-file-opener"
                },
                { text: "youtube-upload", link: "/python/others/youtube-upload" },
                { text: "读取excel&ssh通道连接rds更新数据", link: "/python/others/excel-ssh-rds" },
                { text: "使用pandas模块进行数据处理", link: "/python/others/pandas" },
            ],
        },
    ],
    "/golang": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "Golang基础语法", link: "/golang/base/golang-syntax" },
                { text: "GoTemplate", link: "/golang/base/go-template" },
            ],
        },
        {
            text: "web",
            collapsed: false,
            items: [{ text: "Gin", link: "/golang/web/gin" }],
        },
        {
            text: "cli",
            collapsed: false,
            items: [{ text: "Cobra", link: "/golang/cli/cobra" }],
        },
        {
            text: "工具",
            collapsed: false,
            items: [{ text: "redis-cleaner", link: "/golang/tools/redis-cleaner" }],
        }
    ],
    "/linux": [
        {
            text: "环境",
            collapsed: false,
            items: [
                { text: "从零搭建Linux虚拟机环境", link: "/linux/env/linux-vm-setup" },
                { text: "Centos7安装Python3环境", link: "/linux/env/python3-centos7-installation" },
                { text: "bash常用的快捷键", link: "/linux/env/bash-shortcuts" },
                { text: "centos7防火墙命令", link: "/linux/env/centos7-firewall" },
                {
                    text: "阿里云服务器启用密钥登录并禁用密码登录",
                    link: "/linux/env/aliyun-ssh-login-private-key"
                },
                { text: "Linux服务器文件目录共享映射配置", link: "/linux/env/linux-nfs" },
                { text: "Linux设置swap空间", link: "/linux/env/linux-swap" },
                { text: "链接和别名(ln、alias)", link: "/linux/env/link-alias" },
                { text: "Linux访问权限控制之ACL", link: "/linux/env/linux-acl" },
                {
                    text: "Linux私钥登陆提示server refused our key",
                    link: "/linux/env/linux-private-key-server-refused-key"
                },
                { text: "Ubuntu-server", link: "/linux/env/ubuntu-server" },
                { text: "ArchLinux安装", link: "/linux/env/arch-linux-installation" },
            ],
        },
        {
            text: "应用",
            collapsed: false,
            items: [
                { text: "Nginx配置", link: "/linux/applications/nginx" },
                { text: "Canal部署", link: "/linux/applications/canal" },
                { text: "Linux中使用selenium", link: "/linux/applications/linux-selenium" },
                { text: "screen的进阶用法", link: "/linux/applications/screen" },
                { text: "iptables", link: "/linux/applications/iptables" },
                { text: "FFmpeg相关", link: "/linux/applications/ffmpeg" },
                { text: "Grafana", link: "/linux/applications/grafana" },
            ],
        },
        {
            text: "硬件",
            collapsed: false,
            items: [{ text: "linux磁盘操作相关", link: "/linux/hardware/linux-disk" }],
        },
    ],
    "/frontend": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "HTML", link: "/frontend/base/html" },
                { text: "CSS", link: "/frontend/base/css" },
                { text: "JavaScript", link: "/frontend/base/javascript" },
                { text: "Nodejs", link: "/frontend/base/nodejs" },
                { text: "Typescript", link: "/frontend/base/typescript" },
                { text: "Webpack", link: "/frontend/base/webpack" },
                { text: "jQuery", link: "/frontend/base/jquery" },
            ],
        },
        {
            text: "框架",
            collapsed: false,
            items: [{ text: "Vue", link: "/frontend/framework/vue" }],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                { text: "swift语法", link: "/frontend/others/swift-syntax" },
                { text: "SwiftUI入门", link: "/frontend/others/swiftui-syntax" },
                { text: "HackingWithSwift-1", link: "/frontend/others/hackingwithswift-1" },
                { text: "HackingWithSwift-2", link: "/frontend/others/hackingwithswift-2" },
                { text: "ElementPlus el-upload源码分析", link: "/frontend/others/elementplus-el-upload" },
            ],
        },
    ],
    "/docker": [
        {
            text: "Docker",
            collapsed: false,
            items: [
                { text: "Dockerfile语法", link: "/docker/Docker/dockerfile-syntax" },
                { text: "常用指令", link: "/docker/Docker/common-instruction" },
            ],
        },
        {
            text: "Docker Compose",
            collapsed: false,
            items: [{ text: "docker-compose语法", link: "/docker/Docker-compose/docker-compose-syntax" }],
        },
    ],
    "/actions": [
        {
            text: "工具",
            collapsed: false,
            items: [
                { text: "git命令整理", link: "/actions/tools/git-cmd" },
                { text: "Markdown基础语法", link: "/actions/tools/markdown-syntax" },
                {
                    text: "Typora、PicGo、七牛云实现markdown图片自动上传图床",
                    link: "/actions/tools/typora-picgo-qiniu"
                },
                {
                    text: "iterm2配合oh-my-zsh配置个性主题终端",
                    link: "/actions/tools/iterm2-oh-my-zsh"
                },
                { text: "iterm2配置ssh快速连接", link: "/actions/tools/iterm2-ssh-conn-config" },
                { text: "各系统下校验文件一致性", link: "/actions/tools/file-consistency-check" },
                { text: "linux设置macOS时间机器server", link: "/actions/tools/linux-time-machine" },
                { text: "book-searcher电子书镜像", link: "/actions/tools/book-searcher" },
                { text: "Sketch", link: "/actions/tools/sketch" },
            ],
        },
        {
            text: "环境",
            collapsed: false,
            items: [
                { text: "Windows下Docker Desktop安装", link: "/actions/env/docker-desktop-windows" },
                {
                    text: "git配置socks5代理解决github上down代码慢的问题",
                    link: "/actions/env/git-proxy"
                },
                { text: "mysql启动报错排查及处理", link: "/actions/env/mysql-troubleshoot" },
                { text: "macOS开启终端的代理", link: "/actions/env/terminal-proxy-macos" },
                {
                    text: "git配置多ssh-key && Gitee 和 Github 同步更新",
                    link: "/actions/env/git-repo-multi-remote"
                },
                {
                    text: "docker+jenkins+gitee自动化部署vue项目",
                    link: "/actions/env/cicd-vue"
                },
                { text: "使用github actions进行持续部署", link: "/actions/env/github-actions" },
                { text: "macos开机自动执行脚本", link: "/actions/env/startup-script-macos" },
                { text: "powershell美化", link: "/actions/env/powershell-beautify" },
            ],
        },
        {
            text: "设计模式",
            collapsed: false,
            items: [
                { text: "策略模式的具体实现", link: "/actions/designpattern/strategy-pattern" },
                { text: "责任链模式", link: "/actions/designpattern/chain-of-responsibility-pattern" },
            ],
        },
    ],
    "/tinker": [
        {
            text: "虚拟机",
            collapsed: false,
            items: [
                { text: "VMWare虚拟机的几种网络连接模式", link: "/tinker/vm/vmware-network" },
                { text: "PVE异常关机后磁盘检查处理", link: "/tinker/vm/pve-disk-check-after-abnormal-shutdown" },
                { text: "安装PVE虚拟机并在PVE安装truenas", link: "/tinker/vm/pve-truenas" },
            ],
        },
        {
            text: "家庭网络",
            collapsed: false,
            items: [
                { text: "移动光猫改桥接模式", link: "/tinker/network/modem-to-bridge-mode" },
                { text: "家庭服务器home server搭建", link: "/tinker/network/home-server-setup" },
                { text: "使用https访问内网服务", link: "/tinker/network/access-internal-service-using-https" },
                { text: "frp内网穿透", link: "/tinker/network/frp" },
                { text: "openwrt安装及配置", link: "/tinker/network/openwrt" },
                { text: "windows挂载webdav的问题处理", link: "/tinker/network/windows-webdav" },
                { text: "pt下载入门", link: "/tinker/network/pt" },
                { text: "openwrt开启ipv6", link: "/tinker/network/openwrt-ipv6" },
                { text: "山特ups配合nut实现断电安全关机", link: "/tinker/network/ups-nut-shutdown" },
            ],
        },
    ],
};
