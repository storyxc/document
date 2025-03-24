# logrotate

## 介绍

logrotate 是 Linux 下用于 管理日志文件自动轮转、压缩、删除 的工具。它可以 防止日志文件无限增长，占满磁盘空间，并支持 定期清理旧日志。

 **日志轮转（Rotate）**：定期创建新日志，并重命名旧日志。

 **日志压缩（Compress）**：轮转后自动使用 gzip 等压缩旧日志，减少磁盘占用。

 **删除过旧日志（Remove）**：可设置 **保留 X 天的日志**，超过的自动删除。

 **限制日志大小（Size-based Rotation）**：可以设定 **当日志达到一定大小时轮转**。

 **自动执行（Cron 任务）**：一般会 **每天由系统自动运行**。

 **轮转后执行命令（postrotate）**：轮转完成后可 **重启 Nginx、Apache、MySQL 等服务**，让它们重新生成日志文件。

### **运行方式**

logrotate **通常由 cron 定时执行**，默认每天检查一次，位于：

```sh
/etc/cron.daily/logrotate
```

也可以手动执行

```sh
logrotate -f /etc/logrotate.d/nginx  # 立即轮转 nginx 日志
```

### **配置文件**

logrotate **主配置文件** 位于：`/etc/logrotate.conf`

**各服务的独立日志规则** 通常在：`/etc/logrotate.d/`

如：

```sh
/etc/logrotate.d/nginx  # Nginx 日志轮转
/etc/logrotate.d/mysql  # MySQL 日志轮转
/etc/logrotate.d/syslog # 系统日志轮转
```

### 配置示例

#### nginx日志轮转

```sh
/data/wwwlogs/nginx/*.log {
    daily                # 每天轮转日志
    missingok            # 如果日志文件不存在，不报错
    rotate 14            # 只保留最近 14 天的日志
    compress             # 轮转后压缩（默认 gzip）
    delaycompress        # 延迟一轮再压缩，避免日志仍在写入时被压缩
    notifempty           # 如果日志为空，则不轮转
    create 0640 root adm # 轮转后创建新日志，权限 0640，root 拥有，adm 组可读
    dateext              # 旧日志文件加上日期后缀（access.log.2024-03-20）
    dateformat .%Y-%m-%d # 日期后缀格式
    postrotate           # 轮转后执行命令，重启 Nginx 日志
        /bin/kill -USR1 `cat /var/run/nginx.pid` 2>/dev/null || true
    endscript
}
```

### 手动执行logrotate

#### 测试配置

`logrotate -d /etc/logrotate.d/nginx`

#### 强制执行轮转

`logrotate -f /etc/logrotate.d/nginx`