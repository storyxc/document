# 读取excel & 使用ssh通道连接rds更新数据

```python
import pymysql
from sshtunnel import SSHTunnelForwarder
import pymysql.cursors
import xlrd


def querySQL(ssh_config, db_config, sql):
    with SSHTunnelForwarder(
            (ssh_config['host'], ssh_config['port']),
            ssh_password=ssh_config['password'],
            ssh_username=ssh_config['username'],
            remote_bind_address=(db_config['host'], db_config['port'])
    ) as server:
        db = pymysql.connect(
            host='127.0.0.1',
            port=server.local_bind_port,
            user=db_config['username'],
            passwd=db_config['password'],
            db=db_config['db_name'],
            charset="utf8",
            cursorclass=pymysql.cursors.DictCursor)

        cursor = db.cursor()
        data = {}
        try:
            cursor.execute(sql)
            data = cursor.fetchone()
            db.commit()
        except:
            db.rollback()

        db.close()
        cursor.close()
        return data


class ExcelData(object):
    def __init__(self, data_path, sheetname):
        self.data_path = data_path  # excle表格路径，需传入绝对路径
        self.sheetname = sheetname  # excle表格内sheet名
        self.data = xlrd.open_workbook(self.data_path)  # 打开excel表格
        self.table = self.data.sheet_by_name(self.sheetname)  # 切换到相应sheet
        self.keys = self.table.row_values(0)  # 第一行作为key值
        self.rowNum = self.table.nrows  # 获取表格行数
        self.colNum = self.table.ncols  # 获取表格列数

    def readExcel(self):
        if self.rowNum < 2:
            print("excle内数据行数小于2")
        else:
            L = []  # 列表L存放取出的数据
            for i in range(1, self.rowNum):  # 从第二行（数据行）开始取数据
                sheet_data = {}  # 定义一个字典用来存放对应数据
                for j in range(self.colNum):  # j对应列值
                    sheet_data[self.keys[j]] = self.table.row_values(i)[j]  # 把第i行第j列的值取出赋给第j列的键值，构成字典
                L.append(sheet_data)  # 一行值取完之后（一个字典），追加到L列表中
            # print(type(L))
            return L


if __name__ == "__main__":
    # 远程登录配置信息
    ssh_config = {
        'host': '',
        'port': 22,
        'username': '',
        'password': ''
    }
    # 数据库配置信息
    db_config = {
        'host': '',
        'port': 3306,
        'username': '',
        'password': '',
        'db_name': ''
    }

    path = ""
    sheetname = ""
    get_data = ExcelData(path, sheetname)
    dataList = get_data.readExcel()
    process_result = []
    with open('./res.txt', 'w') as f:
        for data in dataList:
            # 查询语句
            try:
                sql = ''

                # 查询
                res = querySQL(ssh_config, db_config, sql)

                update_sql = ""
                f.write(update_sql + '\n')
                # print(res)
            except Exception as e:
                error = '... 处理失败'
                process_result.append(error)
    print(process_result)
```

