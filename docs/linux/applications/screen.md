# screen的进阶用法

## 以detatch模式创建daemon会话

`screen -dmS <name>`

## 向会话窗口中发送文本

`screen -S <name> -X stuff <text>`

例如：`screen -S <name> -X stuff abc`，当attach之后，窗口中已经有了abc

如果想执行命令：

```shell
screen -S <name> -X stuff "<command> \n"
screen -S <name> -X stuff "<command> \r"
---
screen -S centos -X stuff  $'<command> \n'
---
screen -S new_screen -X stuff "cd /dir
"
```

## 清理screen窗口

`screen -S <name> -X quit`