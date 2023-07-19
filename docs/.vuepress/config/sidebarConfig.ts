export default {
  "/java": [
    {
      text: "基础",
      children: [
        "/java/base/String类的深入学习.md",
        "/java/base/JDK1.8HashMap源码学习.md",
        "/java/base/Java8新特性回顾.md",
      ],
    },
    {
      text: "框架",
      children: [
        "/java/framework/ConfigurationProperties注解.md",
        "/java/framework/JavaSPI机制和Springboot自动装配原理.md",
        "/java/framework/Java日志发展历史.md",
        "/java/framework/Mybatis Generator配置.md",
        "/java/framework/POI事件模式解析并读取Excel文件数据.md",
        "/java/framework/Spring Cloud Config接入.md",
        "/java/framework/SpringMVC的执行流程源码分析.md",
        "/java/framework/dubbo接口超时配置.md",
        "/java/framework/logback自定义.md",
        "/java/framework/netty+websocket实现即时通讯功能.md",
        "/java/framework/spring-session实现集群session共享.md",
        "/java/framework/springcloud优雅下线服务.md",
        "/java/framework/swagger+knife4j.md",
        "/java/framework/使用EasyExcel导出excel.md",
        "/java/framework/使用spring validation进行参数校验.md",
        "/java/framework/分布式定时任务解决方案xxl-job.md",
        "/java/framework/后端允许跨域配置.md",
        "/java/framework/自定义MybatisPlusGenerator.md",
        "/java/framework/Spring配置和条件化组件加载注解.md",
      ],
    },
    {
      text: "中间件",
      children: [
        "/java/middleware/分布式锁解决方案.md",
        "/java/middleware/关于消息中间件MQ.md",
        "/java/middleware/kafka学习记录.md",
        "/java/middleware/kakfa实践.md",
        "/java/middleware/kakfa重复消费问题处理.md",
        "/java/middleware/kafka常用命令记录.md",
      ],
    },
    {
      text: "数据库",
      children: [
        "/java/database/MySql索引.md",
        "/java/database/SQL优化学习.md",
        "/java/database/Otter实现数据全量增量同步.md",
      ],
    },
    {
      text: "工具",
      children: [
        "/java/devtool/Maven的生命周期.md",
        "/java/devtool/nexus无法下载依赖的问题记录.md",
      ],
    },
    {
      text: "其他",
      children: [
        "/java/others/linux服务器安装OpenOffice踩坑.md",
        "/java/others/POI踩坑-zip file is closed.md",
        "/java/others/OpenJDK没有jstack等命令的解决办法.md",
        "/java/others/微信小程序加密数据对称解密工具类.md",
        "/java/others/mybatis的classpath配置导致的jar包读取问题.md",
        "/java/others/feign请求导致的用户ip获取问题记录.md",
        "/java/others/ribbon刷新服务列表间隔和canal的坑.md",
        "/java/others/cpu占用率高排查思路.md",
      ],
    },
  ],
  "/python": [
    {
      text: "基础",
      children: [
        "/python/base/python基础语法.md",
        "/python/base/python并发编程.md",
        "/python/base/装饰器深入.md",
      ],
    },
    {
      text: "爬虫",
      children: [
        "/python/crawler/requests模块入门.md",
        "/python/crawler/验证码识别和模拟登录.md",
        "/python/crawler/多线程爬取梨视频网站的热门视频.md",
        "/python/crawler/selenium模块.md",
        "/python/crawler/python配合ffmpeg下载bilibili视频.md",
        "/python/crawler/scrapy框架入门.md",
        "/python/crawler/scrapy进阶.md",
        "/python/crawler/CrawlSpider全站爬取.md",
        "/python/crawler/分布式爬虫和增量式爬虫.md",
        "/python/crawler/增量式爬虫实践案例 下载指定b站up主的所有作品.md",
        "/python/crawler/小红书爬虫.md",
      ],
    },
    {
      text: "web",
      children: ["/python/web/Django入门.md", "/python/web/pymysql使用.md"],
    },
    {
      text: "其他",
      children: [
        "/python/others/argparse模块入门.md",
        "/python/others/切换windows代理设置开关.md",
        "/python/others/Alfred插件-快速使用编辑器打开指定文件.md",
        "/python/others/youtube-upload.md",
        "/python/others/读取excel&ssh通道连接rds更新数据.md",
        "/python/others/使用pandas模块进行数据处理.md",
      ],
    },
  ],
  "/golang": [
    {
      text: "基础",
      children: [
        "/golang/base/golang基础语法.md",
        "/golang/base/GoTemplate.md",
      ],
    },
    {
      text: "web",
      children: ["/golang/web/Gin.md"],
    },
    {
      text: "cli",
      children: ["/golang/cli/Cobra.md"],
    },
    {
      text: "工具",
      children: ["/golang/tools/redis-cleaner.md"],
    }
  ],
  "/linux": [
    {
      text: "环境",
      children: [
        "/linux/env/从零搭建Linux虚拟机环境.md",
        "/linux/env/Centos7安装Python3环境.md",
        "/linux/env/bash常用的快捷键.md",
        "/linux/env/阿里云服务器挂载阿里云盘.md",
        "/linux/env/centos7防火墙命令.md",
        "/linux/env/阿里云服务器启用密钥登录并禁用密码登录.md",
        "/linux/env/Linux服务器文件目录共享映射配置.md",
        "/linux/env/腾讯云服务器存在对外攻击行为的处理.md",
        "/linux/env/Linux设置swap空间.md",
        "/linux/env/链接和别名(ln、alias).md",
        "/linux/env/nginx配置.md",
        "/linux/env/Linux访问权限控制之ACL.md",
        "/linux/env/Linux私钥登陆提示server refused our key.md",
        "/linux/env/Ubuntu-server.md",
      ],
    },
    {
      text: "应用",
      children: [
        "/linux/applications/canal部署.md",
        "/linux/applications/Linux中使用selenium.md",
        "/linux/applications/screen的进阶用法.md",
        "/linux/applications/iptables.md",
        "/linux/applications/FFmpeg相关.md",
        "/linux/applications/Grafana.md",
      ],
    },
    {
      text: "硬件",
      children: ["/linux/hardware/linux磁盘操作相关.md"],
    },
  ],
  "/frontend": [
    {
      text: "基础",
      children: [
        "/frontend/base/HTML.md",
        "/frontend/base/CSS.md",
        "/frontend/base/JavaScript.md",
        "/frontend/base/Nodejs.md",
        "/frontend/base/Typescript.md",
        "/frontend/base/Webpack.md",
        "/frontend/base/jQuery.md",
      ],
    },
    {
      text: "框架",
      children: ["/frontend/framework/Vue.md"],
    },
    {
      text: "其他",
      children: [
        "/frontend/others/swift语法.md",
        "/frontend/others/SwiftUI入门.md",
        "/frontend/others/HackingWithSwift-1.md",
        "/frontend/others/HackingWithSwift-2.md",
        "/frontend/others/ElementPlus el-upload源码分析.md",
      ],
    },
  ],
  "/docker": [
    {
      text: "Docker",
      children: [
        "/docker/Dockerfile语法.md",
        "/docker/Docker/常用指令.md",
      ],
    },
    {
      text: "Docker Compose",
      children: ["/docker/Docker-compose/docker-compose语法.md"],
    },
  ],
  "/actions": [
    {
      text: "工具",
      children: [
        "/actions/tools/git命令整理.md",
        "/actions/tools/Markdown基础语法.md",
        "/actions/tools/Typora、PicGo、七牛云实现markdown图片自动上传图床.md",
        "/actions/tools/iterm2配合oh-my-zsh配置个性主题终端.md",
        "/actions/tools/iterm2配置ssh快速连接.md",
        "/actions/tools/各系统下校验文件一致性.md",
        "/actions/tools/linux设置macOS时间机器server.md",
        "/actions/tools/book-searcher电子书镜像.md",
        "/actions/tools/Sketch.md",
      ],
    },
    {
      text: "环境",
      children: [
        "/actions/env/Windows下Docker Desktop安装.md",
        "/actions/env/git配置socks5代理解决github上down代码慢的问题.md",
        "/actions/env/mysql启动报错排查及处理.md",
        "/actions/env/macOS开启终端的代理.md",
        "/actions/env/git配置多ssh-key \u0026\u0026 Gitee 和 Github 同步更新.md",
        "/actions/env/docker+jenkins+gitee自动化部署vue项目.md",
        "/actions/env/使用github actions进行持续部署.md",
        "/actions/env/macos开机自动执行脚本.md",
        "/actions/env/powershell美化.md",
      ],
    },
    {
      text: "设计模式",
      children: [
        "/actions/DesignPattern/策略模式的具体实现.md",
        "/actions/DesignPattern/责任链模式.md",
      ],
    },
  ],
  "/tinker": [
    {
      text: "虚拟机",
      children: [
        "/tinker/vm/VMWare虚拟机的几种网络连接模式.md",
        "/tinker/vm/PVE异常关机后磁盘检查处理.md",
        "/tinker/vm/安装PVE虚拟机并在PVE安装truenas.md",
      ],
    },
    {
      text: "家庭网络",
      children: [
        "/tinker/network/移动光猫改桥接模式.md",
        "/tinker/network/家庭服务器home server搭建.md",
        "/tinker/network/frp内网穿透.md",
        "/tinker/network/openwrt安装及配置.md",
        "/tinker/network/windows挂载webdav的问题处理.md",
        "/tinker/network/pt下载入门.md",
        "/tinker/network/openwrt开启ipv6.md",
        "/tinker/network/山特ups配合nut实现断电安全关机.md",
      ],
    },
  ],
};
