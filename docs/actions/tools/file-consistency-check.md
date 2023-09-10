# 各系统下校验文件一致性

之前从网上下软件一直没有校验的习惯，直到从某知名mac破解网站上下了个被人恶意投毒的navicat，本文记录下各系统下校验的操作。内容引用自Apache Kafka官方文档。



## 校验哈希值

|                    |             Windows              |      Linux       | Mac                  |
| :----------------: | :------------------------------: | :--------------: | -------------------- |
| SHA-1 (deprecated) |  certUtil -hashfile *file* SHA1  |  sha1sum *file*  | shasum -a 1 *file*   |
|      SHA-256       | certUtil -hashfile *file* SHA256 | sha256sum *file* | shasum -a 256 *file* |
|      SHA-512       | certUtil -hashfile *file* SHA512 | sha512sum *file* | shasum -a 512 *file* |
|  MD5 (deprecated)  |  certUtil -hashfile *file* MD5   |  md5sum *file*   | md5 *file*           |