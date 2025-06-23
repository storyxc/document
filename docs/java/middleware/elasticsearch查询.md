# elasticsearch查询



### 查询mapping

```sh
curl -X GET http://localhost:9200/index/_mapping?pretty
```



### 轻量搜索

```sh
curl --location --request GET 'http://127.0.0.1:9200/#{index}/#{type}/_search' \
--header 'Content-Type: application/json' \
--data-raw '{
  "query": {
    "match": {
      "id": "12345"
    }
  }
}'
```

