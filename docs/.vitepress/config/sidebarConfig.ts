import { type DefaultTheme } from "vitepress/types/default-theme";

export const sidebar: DefaultTheme.Sidebar = {
    "/java": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "String类的深入学习", link: "/java/base/String类的深入学习" },
                {
                    text: "JDK1.8HashMap源码学习",
                    link: "/java/base/JDK1.8HashMap源码学习",
                },
                { text: "Java8新特性回顾", link: "/java/base/Java8新特性回顾" },
            ],
        },
        {
            text: "框架",
            collapsed: false,
            items: [
                {
                    text: "ConfigurationProperties注解",
                    link: "/java/framework/ConfigurationProperties注解",
                },
                {
                    text: "JavaSPI机制和Springboot自动装配原理",
                    link: "/java/framework/JavaSPI机制和Springboot自动装配原理",
                },
                { text: "Java日志发展历史", link: "/java/framework/Java日志发展历史" },
                {
                    text: "Mybatis Generator配置",
                    link: "/java/framework/Mybatis Generator配置",
                },
                {
                    text: "POI事件模式解析并读取Excel文件数据",
                    link: "/java/framework/POI事件模式解析并读取Excel文件数据",
                },
                {
                    text: "Spring Cloud Config接入",
                    link: "/java/framework/Spring Cloud Config接入",
                },
                {
                    text: "SpringMVC的执行流程源码分析",
                    link: "/java/framework/SpringMVC的执行流程源码分析",
                },
                {
                    text: "dubbo接口超时配置",
                    link: "/java/framework/dubbo接口超时配置",
                },
                { text: "logback自定义", link: "/java/framework/logback自定义" },
                {
                    text: "netty+websocket实现即时通讯功能",
                    link: "/java/framework/netty+websocket实现即时通讯功能",
                },
                {
                    text: "spring-session实现集群session共享",
                    link: "/java/framework/spring-session实现集群session共享",
                },
                {
                    text: "springcloud优雅下线服务",
                    link: "/java/framework/springcloud优雅下线服务",
                },
                { text: "swagger+knife4j", link: "/java/framework/swagger+knife4j" },
                {
                    text: "使用EasyExcel导出excel",
                    link: "/java/framework/使用EasyExcel导出excel",
                },
                {
                    text: "使用spring validation进行参数校验",
                    link: "/java/framework/使用spring validation进行参数校验",
                },
                {
                    text: "分布式定时任务解决方案xxl-job",
                    link: "/java/framework/分布式定时任务解决方案xxl-job",
                },
                { text: "后端允许跨域配置", link: "/java/framework/后端允许跨域配置" },
                {
                    text: "自定义MybatisPlusGenerator",
                    link: "/java/framework/自定义MybatisPlusGenerator",
                },
                {
                    text: "Spring配置和条件化组件加载注解",
                    link: "/java/framework/Spring配置和条件化组件加载注解",
                },
            ],
        },
        {
            text: "中间件",
            collapsed: false,
            items: [
                { text: "分布式锁解决方案", link: "/java/middleware/分布式锁解决方案" },
                { text: "关于消息中间件MQ", link: "/java/middleware/关于消息中间件MQ" },
                { text: "kafka学习记录", link: "/java/middleware/kafka学习记录" },
                { text: "kakfa实践", link: "/java/middleware/kakfa实践" },
                {
                    text: "kakfa重复消费问题处理",
                    link: "/java/middleware/kakfa重复消费问题处理",
                },
                {
                    text: "kafka常用命令记录",
                    link: "/java/middleware/kafka常用命令记录",
                },
                {
                    text: "elasticsearch查询",
                    link: "/java/middleware/elasticsearch查询",
                }
            ],
        },
        {
            text: "数据库",
            collapsed: false,
            items: [
                { text: "MySql索引", link: "/java/database/MySql索引" },
                { text: "SQL优化学习", link: "/java/database/SQL优化学习" },
                {
                    text: "Otter实现数据全量增量同步",
                    link: "/java/database/Otter实现数据全量增量同步",
                },
            ],
        },
        {
            text: "工具",
            collapsed: false,
            items: [
                { text: "Maven的生命周期", link: "/java/devtool/Maven的生命周期" },
                {
                    text: "nexus无法下载依赖的问题记录",
                    link: "/java/devtool/nexus无法下载依赖的问题记录",
                },
            ],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                {
                    text: "linux服务器安装OpenOffice踩坑",
                    link: "/java/others/linux服务器安装OpenOffice踩坑",
                },
                {
                    text: "POI踩坑-zip file is closed",
                    link: "/java/others/POI踩坑-zip file is closed",
                },
                {
                    text: "OpenJDK没有jstack等命令的解决办法",
                    link: "/java/others/OpenJDK没有jstack等命令的解决办法",
                },
                {
                    text: "微信小程序加密数据对称解密工具类",
                    link: "/java/others/微信小程序加密数据对称解密工具类",
                },
                {
                    text: "mybatis的classpath配置导致的jar包读取问题",
                    link: "/java/others/mybatis的classpath配置导致的jar包读取问题",
                },
                {
                    text: "feign请求导致的用户ip获取问题记录",
                    link: "/java/others/feign请求导致的用户ip获取问题记录",
                },
                {
                    text: "ribbon刷新服务列表间隔和canal的坑",
                    link: "/java/others/ribbon刷新服务列表间隔和canal的坑",
                },
                {
                    text: "cpu占用率高排查思路",
                    link: "/java/others/cpu占用率高排查思路",
                },
                {
                    text: "通过mysql的binlog恢复被误删的数据",
                    link: "/java/others/通过mysql的binlog恢复被误删的数据",
                },
            ],
        },
    ],
    "/python": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "python基础语法", link: "/python/base/python基础语法" },
                { text: "python并发编程", link: "/python/base/python并发编程" },
                { text: "装饰器深入", link: "/python/base/装饰器深入" },
                { text: "Poetry", link: "/python/base/Poetry" },
            ],
        },
        {
            text: "爬虫",
            collapsed: false,
            items: [
                { text: "requests模块入门", link: "/python/crawler/requests模块入门" },
                {
                    text: "验证码识别和模拟登录",
                    link: "/python/crawler/验证码识别和模拟登录",
                },
                {
                    text: "多线程爬取梨视频网站的热门视频",
                    link: "/python/crawler/多线程爬取梨视频网站的热门视频",
                },
                { text: "selenium模块", link: "/python/crawler/selenium模块" },
                {
                    text: "python配合ffmpeg下载bilibili视频",
                    link: "/python/crawler/python配合ffmpeg下载bilibili视频",
                },
                { text: "scrapy框架入门", link: "/python/crawler/scrapy框架入门" },
                { text: "scrapy进阶", link: "/python/crawler/scrapy进阶" },
                {
                    text: "CrawlSpider全站爬取",
                    link: "/python/crawler/CrawlSpider全站爬取",
                },
                {
                    text: "分布式爬虫和增量式爬虫",
                    link: "/python/crawler/分布式爬虫和增量式爬虫",
                },
                {
                    text: "增量式爬虫实践案例 下载指定b站up主的所有作品",
                    link: "/python/crawler/增量式爬虫实践案例 下载指定b站up主的所有作品",
                },
                { text: "小红书爬虫", link: "/python/crawler/小红书爬虫" },
            ],
        },
        {
            text: "web",
            collapsed: false,
            items: [
                { text: "Django入门", link: "/python/web/Django入门" },
                { text: "pymysql使用", link: "/python/web/pymysql使用" },
            ],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                { text: "argparse模块入门", link: "/python/others/argparse模块入门" },
                {
                    text: "切换windows代理设置开关",
                    link: "/python/others/切换windows代理设置开关",
                },
                {
                    text: "Alfred插件-快速使用编辑器打开指定文件",
                    link: "/python/others/Alfred插件-快速使用编辑器打开指定文件",
                },
                { text: "youtube-upload", link: "/python/others/youtube-upload" },
                {
                    text: "读取excel&ssh通道连接rds更新数据",
                    link: "/python/others/读取excel&ssh通道连接rds更新数据",
                },
                {
                    text: "使用pandas模块进行数据处理",
                    link: "/python/others/使用pandas模块进行数据处理",
                },
            ],
        },
    ],
    "/golang": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "Golang基础语法", link: "/golang/base/golang基础语法" },
                { text: "GoTemplate", link: "/golang/base/GoTemplate" },
            ],
        },
        {
            text: "web",
            collapsed: false,
            items: [{ text: "Gin", link: "/golang/web/Gin" }],
        },
        {
            text: "cli",
            collapsed: false,
            items: [{ text: "Cobra", link: "/golang/cli/Cobra" }],
        },
        {
            text: "工具",
            collapsed: false,
            items: [{ text: "redis-cleaner", link: "/golang/tools/redis-cleaner" }],
        },
    ],
    "/linux": [
        {
            text: "环境",
            collapsed: false,
            items: [
                {
                    text: "从零搭建Linux虚拟机环境",
                    link: "/linux/env/从零搭建Linux虚拟机环境",
                },
                {
                    text: "Centos7安装Python3环境",
                    link: "/linux/env/Centos7安装Python3环境",
                },
                { text: "bash常用的快捷键", link: "/linux/env/bash常用的快捷键" },
                { text: "centos7防火墙命令", link: "/linux/env/centos7防火墙命令" },
                {
                    text: "服务器启用ssh密钥登录并禁用密码登录",
                    link: "/linux/env/服务器启用ssh密钥登录并禁用密码登录",
                },
                {
                    text: "Linux服务器文件目录共享映射配置",
                    link: "/linux/env/Linux服务器文件目录共享映射配置",
                },
                { text: "Linux设置swap空间", link: "/linux/env/Linux设置swap空间" },
                {
                    text: "链接和别名(ln、alias)",
                    link: "/linux/env/链接和别名(ln、alias)",
                },
                {
                    text: "Linux访问权限控制之ACL",
                    link: "/linux/env/Linux访问权限控制之ACL",
                },
                {
                    text: "Linux私钥登陆提示server refused our key",
                    link: "/linux/env/Linux私钥登陆提示server refused our key",
                },
                { text: "Ubuntu-server", link: "/linux/env/Ubuntu-server" },
                { text: "ArchLinux安装", link: "/linux/env/ArchLinux安装" },
                { text: "Linux常用指令", link: "/linux/env/Linux常用指令" },
                { text: "logrotate", link: "/linux/env/logrotate" },
                { text: "mydumper", link: "/linux/env/mydumper" }
            ],
        },
        {
            text: "应用",
            collapsed: false,
            items: [
                { text: "Nginx配置", link: "/linux/applications/Nginx配置" },
                { text: "Canal部署", link: "/linux/applications/Canal部署" },
                {
                    text: "Linux中使用selenium",
                    link: "/linux/applications/Linux中使用selenium",
                },
                {
                    text: "screen的进阶用法",
                    link: "/linux/applications/screen的进阶用法",
                },
                { text: "iptables", link: "/linux/applications/iptables" },
                { text: "FFmpeg相关", link: "/linux/applications/FFmpeg相关" },
                { text: "Grafana", link: "/linux/applications/Grafana" },
                { text: "Clash", link: "/linux/applications/Clash" },
                { text: "Rclone", link: "/linux/applications/Rclone" },
                { text: "acme.sh使用", link: "linux/applications/acme.sh使用" }
            ],
        },
        {
            text: "硬件",
            collapsed: false,
            items: [
                {
                    text: "linux磁盘操作相关",
                    link: "/linux/hardware/linux磁盘操作相关",
                },
            ],
        },
    ],
    "/frontend": [
        {
            text: "基础",
            collapsed: false,
            items: [
                { text: "HTML", link: "/frontend/base/HTML" },
                { text: "CSS", link: "/frontend/base/CSS" },
                { text: "JavaScript", link: "/frontend/base/JavaScript" },
                { text: "Nodejs", link: "/frontend/base/Nodejs" },
                { text: "Typescript", link: "/frontend/base/Typescript" },
                { text: "Webpack", link: "/frontend/base/Webpack" },
                { text: "jQuery", link: "/frontend/base/jQuery" },
            ],
        },
        {
            text: "框架",
            collapsed: false,
            items: [{ text: "Vue", link: "/frontend/framework/Vue" }],
        },
        {
            text: "其他",
            collapsed: false,
            items: [
                { text: "swift语法", link: "/frontend/others/swift语法" },
                { text: "SwiftUI入门", link: "/frontend/others/SwiftUI入门" },
                {
                    text: "HackingWithSwift-1",
                    link: "/frontend/others/HackingWithSwift-1",
                },
                {
                    text: "HackingWithSwift-2",
                    link: "/frontend/others/HackingWithSwift-2",
                },
                {
                    text: "ElementPlus el-upload源码分析",
                    link: "/frontend/others/ElementPlus el-upload源码分析",
                },
            ],
        },
    ],
    "/docker": [
        {
            text: "Docker",
            collapsed: false,
            items: [
                { text: "Dockerfile语法", link: "/docker/Dockerfile语法" },
                {
                    text: "docker-compose语法",
                    link: "/docker/docker-compose语法",
                },
                { text: "常用指令", link: "/docker/常用指令" },
                { text: "macvlan", link: "/docker/docker网络之macvlan" },
            ],
        },
    ],
    "/actions": [
        {
            text: "工具",
            collapsed: false,
            items: [
                { text: "git命令整理", link: "/actions/tools/git命令整理" },
                { text: "Markdown基础语法", link: "/actions/tools/Markdown基础语法" },
                {
                    text: "Typora、PicGo、七牛云实现markdown图片自动上传图床",
                    link: "/actions/tools/Typora、PicGo、七牛云实现markdown图片自动上传图床",
                },
                {
                    text: "iterm2配合oh-my-zsh配置个性主题终端",
                    link: "/actions/tools/iterm2配合oh-my-zsh配置个性主题终端",
                },
                { text: "powershell美化", link: "/actions/tools/powershell美化" },
                { text: "哪吒探针页面美化", link: "/actions/tools/哪吒探针页面美化" },
                {
                    text: "iterm2配置ssh快速连接",
                    link: "/actions/tools/iterm2配置ssh快速连接",
                },
                {
                    text: "各系统下校验文件一致性",
                    link: "/actions/tools/各系统下校验文件一致性",
                },
                {
                    text: "linux设置macOS时间机器server",
                    link: "/actions/tools/linux设置macOS时间机器server",
                },
                {
                    text: "book-searcher电子书镜像",
                    link: "/actions/tools/book-searcher电子书镜像",
                },
                { text: "Sketch", link: "/actions/tools/Sketch" },
            ],
        },
        {
            text: "环境",
            collapsed: false,
            items: [
                {
                    text: "git配置socks5代理解决github上down代码慢的问题",
                    link: "/actions/env/git配置socks5代理解决github上down代码慢的问题",
                },
                {
                    text: "mysql启动报错排查及处理",
                    link: "/actions/env/mysql启动报错排查及处理",
                },
                {
                    text: "macOS开启终端的代理",
                    link: "/actions/env/macOS开启终端的代理",
                },
                {
                    text: "git配置多ssh-key && Gitee 和 Github 同步更新",
                    link: "/actions/env/git配置多ssh-key && Gitee 和 Github 同步更新",
                },
                {
                    text: "docker+jenkins+gitee自动化部署vue项目",
                    link: "/actions/env/docker+jenkins+gitee自动化部署vue项目",
                },
                {
                    text: "Docker容器内访问MacOS宿主机中的kafka",
                    link: "/actions/env/Docker容器内访问MacOS宿主机中的kafka",
                },
                {
                    text: "使用github actions进行持续部署",
                    link: "/actions/env/使用github actions进行持续部署",
                },
                {
                    text: "macos开机自动执行脚本",
                    link: "/actions/env/macos开机自动执行脚本",
                },
                {
                    text: "WSL",
                    link: "/actions/env/WSL",
                },
                {
                    text: "typecho部署",
                    link: "/actions/env/typecho部署"
                }
            ],
        },
        {
            text: "设计模式",
            collapsed: false,
            items: [
                {
                    text: "策略模式的具体实现",
                    link: "/actions/designpattern/策略模式的具体实现",
                },
                { text: "责任链模式", link: "/actions/designpattern/责任链模式" },
            ],
        },
    ],
    "/tinker": [
        {
            text: "虚拟机",
            collapsed: false,
            items: [
                {
                    text: "VMWare虚拟机的几种网络连接模式",
                    link: "/tinker/vm/VMWare虚拟机的几种网络连接模式",
                },
                {
                    text: "PVE异常关机后磁盘检查处理",
                    link: "/tinker/vm/PVE异常关机后磁盘检查处理",
                },
                {
                    text: "安装PVE虚拟机并在PVE安装truenas",
                    link: "/tinker/vm/安装PVE虚拟机并在PVE安装truenas",
                },
            ],
        },
        {
            text: "家庭网络",
            collapsed: false,
            items: [
                {
                    text: "移动光猫改桥接模式",
                    link: "/tinker/network/移动光猫改桥接模式",
                },
                {
                    text: "家庭服务器home server搭建",
                    link: "/tinker/network/home server搭建",
                },
                { text: "frp内网穿透", link: "/tinker/network/frp内网穿透" },
                {
                    text: "openwrt安装及配置",
                    link: "/tinker/network/openwrt安装及配置",
                },
                {
                    text: "windows挂载webdav的问题处理",
                    link: "/tinker/network/windows挂载webdav的问题处理",
                },
                { text: "pt下载入门", link: "/tinker/network/pt下载入门" },
                { text: "openwrt开启ipv6", link: "/tinker/network/openwrt开启ipv6" },
                {
                    text: "山特ups配合nut实现断电安全关机",
                    link: "/tinker/network/山特ups配合nut实现断电安全关机",
                },
                {
                    text: "ubuntu-server开启网络唤醒",
                    link: "/tinker/network/ubuntu-server开启网络唤醒",
                },
                {
                    text: "Cloudflare WARP代理",
                    link: "/tinker/network/Cloudflare WARP代理",
                }
            ],
        },
    ],
};
