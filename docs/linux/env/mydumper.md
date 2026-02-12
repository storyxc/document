# mydumper

```
https://mydumper.github.io/mydumper/docs/html/index.html#
```

## 备份

`mydumper -h host -P port -u username -a -B 数据库 -T 表1,表2 -o ./目录名 --trx-consistency-only  --skip-tz-utc -t 4 `

## 恢复

`myloader -h host -P port -u username -a -B 数据库 -o -d 目录 -t 4`