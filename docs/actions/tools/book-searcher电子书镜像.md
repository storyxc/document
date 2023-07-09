# book-searcher电子书镜像站点

> 项目地址：https://github.com/book-searcher-org/book-searcher

## docker-compose.yml

```yml
version: '3'

services:
  book-searcher:
    image: ghcr.io/book-searcher-org/book-searcher:latest
    container_name: book-searcher
    restart: always
    ports:
      - "7070:7070"
    volumes:
      - ./index:/index
```

## 下载index文件

> https://zh.annas-archive.org/datasets
>
> https://onedrive.caomingjun.com/zh-CN/%F0%9F%96%A5%E8%BD%AF%E4%BB%B6/zlib-searcher/

## 启动容器配置IPFS网关

```text
https://cloudflare-ipfs.com
https://dweb.link
https://ipfs.io
https://dw.oho.im
```
