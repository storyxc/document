# pymysql使用



- 安装pymysql
- 建立数据库连接
- 获取cursor对象
- 使用cursor执行sql
- 增删改-commit/rollback 查询-fetch
- 关闭数据库连接





## 案例

安装:`pip install pymysql`

代码:

### 查询

```python
import pymysql


connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
cursor = connection.cursor(cursor=pymysql.cursors.DictCursor)
cursor.execute('select * from tb_student')
print(cursor.fetchall())
connection.close()

res:
[{'id': 1, 'name': 'tom', 'age': 18}, {'id': 2, 'name': 'rose', 'age': 17}]
```

### 修改

```python
connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
cursor = connection.cursor()
cursor.execute('update tb_student set name = "jack" where id = 1')
connection.commit()
connection.close()
```

![image-20210429231158834](https://storyxc.com/images/blog//image-20210429231158834.png)

### 删除

```python
import pymysql

connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
cursor = connection.cursor()
try:
    cursor.execute('delete from tb_student where id = 2')
    connection.commit()
except Exception as e:
    connection.rollback()
connection.close()
```

![image-20210429231506901](https://storyxc.com/images/blog//image-20210429231506901.png)

### 新增

```python
import pymysql

connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
cursor = connection.cursor()
try:
    # 方式1
    cursor.execute('insert into tb_student(name,age) values("mike",20)')
    # 方式2
    cursor.execute('insert into tb_student(name,age) values("%s",%s)' % ('mike',21))
    connection.commit()
except Exception as e:
    connection.rollback()
connection.close()

```

![image-20210429232050677](https://storyxc.com/images/blog//image-20210429232050677.png)



## 通过上下文管理器自定义Mysql类

```python
import pymysql


class Mysql(object):
    def __enter__(self):
        self.connection = pymysql.connect(host='127.0.0.1', port=3306, user='root', password='root', database='python')
        return self.connection

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.connection.close()


if __name__ == '__main__':
    with Mysql() as conn:
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        try:
            sql = "select * from tb_student"
            cursor.execute(sql)
            res = cursor.fetchall()
            print(res)
        except:
            print('error')

```

