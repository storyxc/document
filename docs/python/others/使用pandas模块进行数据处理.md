# 使用pandas模块进行数据处理

> 以csv/txt文件为例

## 读取文件

`pd.read_csv()`：返回一个DataFrame或TextFileReader

- header指定具体表头行数,如果没有则header=None，第一行是表头则header=0,header还可以是一个列表例如header=[0,1,3],此时会有多个标题，且1和3之间的行会被忽略掉
- seq指定分割符，默认为','
- skiprows跳过某一行，行号从0开始，例如skiprows=2或skiprows=[0,1,200]
- nrows指定需要读取的行数，从第一行开始,例如nrows=1000

- na_values空值置换,会把指定的值替换为空值例如na_values=['\\N', 15]会把字符串\N和数字15替换为空值NaN
  - 如果na_values的参数是一个字典，那就可以为具体的列来指定缺失值的样子。我们就可以指定在Age这一列，0要被看成缺失值；在Comment这一列，“该用户没有评价”被看成缺失值。`na_values={'Age':0,'Comment':'该用户没有评价'}`
- iterator: True时返回一个TextFileReader，用于大文件处理，可以逐块处理文件
- chunksize：指定文件块大小，返回一个TextFileReader
- encoding：指定编码
- index_col：读取时指定索引列，和df.set_index效果相同
- names：文件中没有表头，手动指定表头，需要和header配合使用
> names和header的使用场景主要如下：
>
> 1. csv文件有表头并且是第一行，那么names和header都无需指定;
> 2. csv文件有表头、但表头不是第一行，可能从下面几行开始才是真正的表头和数据，这个时候指定header即可;
> 3. csv文件没有表头，全部是纯数据，那么我们可以通过names手动生成表头;
> 4. csv文件有表头、但是这个表头你不想用，这个时候同时指定names和header。先用header选出表头和数据，然后再用names将表头替换掉，其实就等价于将数据读取进来之后再对列名进行rename;




## 数据相关概念

### DataFrame

多行多列的二维数组、整个表格、多行多列

### Series

一维数据、一行或一列

### index

对应纵向上的行

> 替换索引为某一列的值：df.set_index('xxx', inplace=True)

### columns

对应横向上的列



## 查询数据

### 几种方法

1. df.loc，根据行、列的标签值查询（既能查询又能覆盖写入）

   - 行根据行标签，也就是索引筛选，列根据列标签，列名筛选

   - 如果选取的是所有行或者所有列，可以用：代替

   - 行标签选取的时候，两端都包含，比如[0:5]指的是0，1，2，3，4，5

2. df.iloc，根据行、列的数字位置查询

   - iloc基于位置索引，简言之，就是第几行第几列，只不过这里的**行列都是从0开始**的。

   - iloc的0：X中不包括X，只能到X-1.

3. df.where

4. df.query

### df.loc

1. 使用单个label值查询

   - 查找并替换某一列的值&转换数据类型：df.loc[:, 'x'] = df['x'].str.replace('X','').astype('int32')

   - 查询单个值：df.loc['index', 'column']
   - 得到一个Series：df.loc['index', ['column1', 'column2']]

2. 使用值列表批量查询

   - 得到一个Series：df.loc(['index1', 'index2', 'index3'], 'column1')
   - 得到DataFrame：df.loc(['index1', 'index2', 'index3'], ['column1', 'column2'])

3. 使用数值区间进行范围查询（包含区间的开始和结尾）

   - 行index按区间：df.loc[1:2, 'colum1']
   - 列index按区间：df.loc[1, 'column1': 'column2']
   - 行列都按区间：df.loc[1:2, 'column1': 'column2']

4. 使用条件表达式查询

   - 简单条件查询，年龄小于18：df.loc[df['age'] < 18, :]
   - 复杂条件查询，年龄小于18且姓名为张三：df.loc[(df['age'] < 18) & (df['name'] == '张三'), :]

5. 调用函数查询

   - lambda表达式：df.loc[lambda df: df['age'] > 18, :]

   - 调用函数：

     ```python
     def query_adult(x):
         return df['age'] > 18
       
     df.loc[query_adult, :]
     ```

     

## 新增数据列

### 几种方法

1. 直接赋值

   - df.loc[:, 'newAge'] = df['age'] + 1

2. df.apply

   - apply赋值 基于 0-'index' 1-'columns' 操作跨行/跨列


   - ```python
     def get_is_adult(x):
       if x['age'] >= 18:
           return '成年'
       else:
           return '未成年'
     
     df.loc[:, 'isAdult'] = df.apply(get_is_adult, axis=1)

3. df.assign

   - assign添加一列：返回一个新的DataFrame，存在的列会被覆盖，如果参数是callable只能直接操作DataFrame，如果不是callable则直接赋值
   - df = df.assign(newAge=lambda x: x['age'] + 1)

4. 按条件选择分组并分别赋值

   - df.loc[df['highTemp'] - df['lowTemp'] > 10, 'tempDiff'] = '温差大'
   - df.loc[df['highTemp'] - df['lowTemp'] <= 10, 'tempDiff'] = '温差小'

   > 按字段分组查看数量： df['tempDiff'].value_counts()

## 数据合并

```
df_list = [df]
df2 = pd.concat(df_list)

if not os.path.exists('../resources/data1.csv'):
    df2.to_csv('../resources/data1.csv', mode='a', index=False, header=True)
else:
    df2.to_csv('../resources/data1.csv', mode='a', index=False, header=False)
```

## axis参数

pandas的axis参数：指的是跨该axis，例如指定columns 则是跨列，也就是沿着列名水平方向执行

- 跨列操作：在横向上遍历每行，对每行的数据进行操作

- 跨行操作：在水平方向遍历每列，对每列数据进行操作

