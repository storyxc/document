# Grafana



## 告警

grafana的告警可以使用Go Template语法来读取内置的变量数据并输出到告警邮件中

比如alert query从Loki日志中查询，可以同时从日志中提取出自己需要的关键属性作为标签:

```shell
count_over_time({job="wechat"} |= `订单申请退款失败` | pattern `<_> orderNo=<orderNo> refundNo=<refundNo>` [1m])
```

上面的查询提取了订单号、退款单号的数据，标签会存在`_value_string_`中，可以使用$values访问，在Summary中填写以下模板：

```go
{{ with $values }}
{{ range $k, $v := . }}
  订单编号: {{$v.Labels.orderNo}}
  退款单号: {{$v.Labels.refundNo}}
  服务器实例: {{$v.Labels.instance}}
{{ end }}
{{ end }}
```
> https://community.grafana.com/t/how-to-use-alert-message-templates-in-grafana/67537/3

## 匿名访问

- 首先在Administration中创建新的组织`Guest`
- 修改配置文件

```ini
# grafana.ini

[auth.anonymous]
# enable anonymous access
enabled = true
# specify organization name that should be used for unauthenticated users
org_name = Guest
# specify role for unauthenticated users
org_role = Viewer

# mask the Grafana version number for unauthenticated users
hide_version = true
```

