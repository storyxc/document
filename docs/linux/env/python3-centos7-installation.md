# Centos7安装Python3环境

1. 安装编译工具

```bash
yum -y groupinstall "Development tools"
yum -y install zlib-devel bzip2-devel openssl-devel ncurses-devel sqlite-devel readline-devel tk-devel gdbm-devel db4-devel libpcap-devel xz-devel
yum install -y libffi-devel zlib1g-dev
yum install zlib* -y
```

2. 下载安装包

```bash
wget https://www.python.org/ftp/python/3.7.2/Python-3.7.2.tar.xz
```

这一步骤提示我wget命令找不到，所以要先安装wget

```bash
yum -y install wget
```

再次执行下载安装包的命令

3. 下载完成后解压并安装

```bash
mkdir /usr/local/python3  
tar -xvf  Python-3.7.2.tar.xz
cd Python-3.7.2
# 指定安装位置 提高运行速度 第三个是为了解决pip需要用到ssl
./configure --prefix=/usr/local/python3 --with-ssl 
make && make install
```
> ./configure --prefix=/usr/local/python3 --enable-optimizations --with-ssl 
> --enable-optimizations参数可能在低版本gcc导致编译报错 去掉即可

4. 创建软链接

```bash
ln -s /usr/local/python3/bin/python3 /usr/local/bin/python3
ln -s /usr/local/python3/bin/pip3 /usr/local/bin/pip3
```

5. 验证

```bash
python3 -v
pip3 -v
```

