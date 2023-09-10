# cpu占用率高排查思路



1.`top`命令找出cpu占用率高的进程pid

2.`top -H -p pid` 找出cpu占用率高的线程tid

3.`printf "%x" tid`命令打印出tid的十六进制形式

4.`jstack pid | grep 十六进制tid -A 行数`打印堆栈信息 或者 `jstack pid >> log.txt`将堆栈信息保存在文件中，再从文件中查找对应线程的信息

5.`jstat -gcutil pid 5000` 每隔5秒打印一次gc情况
```
S0：幸存1区当前使用比例
S1：幸存2区当前使用比例
E：伊甸园区使用比例
O：老年代使用比例
M：元数据区使用比例
CCS：压缩使用比例
YGC：年轻代垃圾回收次数
FGC：老年代垃圾回收次数
FGCT：老年代垃圾回收消耗时间
GCT：垃圾回收消耗总时间
```
6.`jmap -heap pid` 查看堆内存详细信息

7.`jmap -histo pid > xxx.log` 输出gc日志到文件