# 通过mysql的binlog恢复被误删的数据

## 背景

同事手抖在测试环境数据库执行了`delete from tb_xxx`没加where语句，数据库是单机版且没有备份，且binlog不完整。

## 处理

鉴于以上条件，只能通过找出执行的删除语句的binlog，找出来之后将删除语句反向执行了。



查看binlog文件：`SHOW BINARY LOGS;` 

刷新binlog文件：`flush logs;`将binlog截断

查看binlog内容：`show binlog events in mysql-bin.xxxx`

找到具体删除语句在那个位置/时间后可以将binlog内容导出到文件中

`mysqlbinlog --no-defaults --base64-output=decode-rows -v --start-position=xxx --stop-position=xxx --database=xxx /path/to/binlog.0001 > ~/partial_binlog.sql`

如果知道具体执行的时间，也可以将开始/结束位点改为开始/结束时间：

`mysqlbinlog --no-defaults --base64-output=decode-rows -v --start-datetime="2024-05-29 14:45:45" --stop-datetime="2024-05-29 14:50:00" --database=xxx /path/to/binlog.0001 > ~/partial_binlog.sql`

> 来自chatgpt的解释
>
> ### 参数解释
>
> 1. `mysqlbinlog`：这是MySQL提供的一个工具，用于读取二进制日志文件并将其转换为文本格式。
> 2. `--no-defaults`：此选项告诉 `mysqlbinlog` 工具忽略配置文件中的默认设置，确保命令仅使用显式提供的参数。
> 3. `--base64-output=decode-rows`：此选项指示 `mysqlbinlog` 工具将以 Base64 编码存储的行事件解码为可读的格式。这样可以更好地查看 `DELETE`、`INSERT` 和 `UPDATE` 语句中的具体数据。
> 4. `-v` 或 `--verbose`：此选项启用详细输出模式，会显示更多的信息，包括解码后的行事件的具体内容。
> 5. `--start-position=xxx`：指定从二进制日志文件的哪个位置开始读取事件。`xxx` 应替换为实际的开始位置。
> 6. `--stop-position=xxx`：指定读取到二进制日志文件的哪个位置结束。`xxx` 应替换为实际的结束位置。
> 7. `--database=xxx`：指定只输出与某个数据库相关的事件。`xxx` 应替换为实际的数据库名称。
> 8. `/path/to/binlog.0001`：指定要读取的二进制日志文件的路径和名称。需要替换为实际的文件路径。
> 9. `> ~/partial_binlog.sql`：将输出重定向到指定的文件 `~/partial_binlog.sql` 中。
>
> ### 作用总结
>
> 这条命令会：
>
> - 从指定的二进制日志文件 (`/path/to/binlog.0001`) 中读取日志事件。
> - 仅提取与指定数据库 (`--database=xxx`) 相关的事件。
> - 从指定的开始位置 (`--start-position=xxx`) 到结束位置 (`--stop-position=xxx`) 之间的日志事件。
> - 将日志事件解码为可读的SQL语句，并将输出写入到文件 `~/partial_binlog.sql` 中。
>
> 此命令常用于从二进制日志中恢复特定时间范围内的数据库操作，特别是用于数据恢复或审计操作。

执行结束后会在文件最后部份注释中输出解码后的DELETE语句内容，这里直接通过python脚本处理一下，把DELETE替换成INSERT语句，回到数据库中执行即可。（需要稍微调整下细节）

脚本：

```python
if __name__ == '__main__':
    # 打开原始binlog日志文件和目标SQL文件
    input_file = "partial_binlog.sql"
    output_file = "ok.sql"

    # 读取原始binlog文件内容
    with open(input_file, "r", encoding="utf-8") as f:
        content = f.read()

    # 替换DELETE为INSERT，使用正则表达式进行复杂替换
    import re

    content = re.sub(r'### DELETE FROM', ';INSERT INTO', content)
    content = re.sub(r'### WHERE', 'SELECT', content)
    content = re.sub(r'###', '', content)
    content = re.sub(r'@1=', '', content)
    content = re.sub(r'@[1-9]=', ',', content)
    content = re.sub(r'@[1-9][0-9]=', ',', content)
    content = re.sub(r'@[1-9][0-9][0-9]=', ',', content)

    # 将处理后的内容写入目标SQL文件
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(content)

    print("转换完成:", output_file)
```



