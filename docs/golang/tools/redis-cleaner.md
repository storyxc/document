# Redis-cleaner
```go
package main

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"log"
)

func main() {
	ctx := context.Background()
	// 创建Redis客户端
	client := redis.NewClient(&redis.Options{
		Addr: "localhost:6379",
		DB:   1,
	})

	// 定义匹配模式和批量处理大小
	matchPattern := "*"
	batchSize := 1000

	// 设置游标初始值和删除计数器
	startCursor := uint64(0)
	keysDeleted := 0
	memSaved := 0

	for {
		// 扫描Redis中的key
		keys, cursor, err := client.Scan(ctx, startCursor, matchPattern, int64(batchSize)).Result()

		if err != nil {
			log.Fatal(err)
		}

		// 检查每个key的过期时间并删除符合条件的键
		for _, key := range keys {
			ttl, err := client.TTL(ctx, key).Result()
			if err != nil {
				log.Fatal(err)
			}

			// 如果过期时间大于15年，则删除该键
			if ttl.Hours() > 24*365*10 {
				mem, err := client.MemoryUsage(ctx, key).Result()
				if err != nil {
					log.Fatal(err)
				}
				err = client.Del(ctx, key).Err()
				if err != nil {
					log.Fatal(err)
				}
				memSaved += int(mem)
				keysDeleted++
			}
		}

		// 如果游标为0，则表示已完成遍历
		if cursor == 0 {
			break
		}
		startCursor = cursor
	}

	fmt.Printf("已删除 %d 个过期时间大于10年的键\n", keysDeleted)
	fmt.Printf("已释放 %d MB内存\n", memSaved/1024/1024)

	// 关闭Redis客户端连接
	err := client.Close()
	if err != nil {
		log.Fatal(err)
	}
}

```