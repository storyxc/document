# Dockerfile语法



Docker可以通过读取Dockerfile中的指令自动构建映像。Dockerfile是一个文本文档，其中包含用户在命令行上调用来组装镜像的所有命令。

> https://docs.docker.com/engine/reference/builder/

## 语法

```dockerfile
# 注释
INSTRUCTION arguments
```

指令大小写不敏感，所以使用小写也不影响构建，但习惯上都将指令大写用于区分指令和参数。

Dockerfile必须以`FROM`指令开始(特殊情况：ARG指令）。

> ```dockerfile
> ARG  CODE_VERSION=latest
> FROM base:${CODE_VERSION}
> CMD  /code/run-app
> ```

### 支持环境变量替换的指令

- `ADD`
- `COPY`
- `ENV`
- `EXPOSE`
- `FROM`
- `LABEL`
- `STOPSIGNAL`
- `USER`
- `VOLUME`
- `WORKDIR`
- `ONBUILD`

> ```dockerfile
> FROM busybox
> ENV FOO=/bar
> WORKDIR ${FOO}   # WORKDIR /bar
> ADD . $FOO       # ADD . /bar
> COPY \$FOO /quux # COPY $FOO /quux
> ```

## 基本模板

```dockerfile
FROM image_name:version as alias1
# FROM [--platform=<platform>] <image>[:<tag>] [AS <name>] 一个Dockerfile中FROM可以多次出现 用于构建多个镜像或者将一个构建阶段用作另一个构建阶段的依赖项
MAINTAINER storyxc #维护文档的人,现在用LABEL xxx=xxx代替了

RUN xxx 
# RUN <command> shell格式，默认在linux上使用/bin/sh -c执行，windows上 cmd /S /C执行
# RUN ['executable', 'param1', 'param2'] exec格式 

# Deploy Biliup
FROM python:3.9 as alias2

ENV TZ=Asia/Shanghai
# ENV指定环境变量

EXPOSE 19159/tcp
EXPOSE 19149/udp
# 注明暴露的端口，只是声明作用，实际没有功能

ADD hom* /mydir/
# ADD指令用于向镜像内拷贝文件 目录 不仅能复制本机的文件，也能将远程URL的资源复制到镜像中
# ADD [--chown=<user>:<group>] [--chmod=<perms>] [--checksum=<checksum>] <src>... <dest>
# ADD [--chown=<user>:<group>] [--chmod=<perms>] ["<src>",... "<dest>"]
# ADD可以识别压缩格式，把可解压的文件解压为目录，远程URL资源不会被解压

VOLUME /opt
# 指定创建一个具有指定名称的挂载点 可以使用JSON数组格式 或多个参数纯字符串

COPY --from=alias1 /dir1 /dir2
# COPY [--chown=<user>:<group>] [--chmod=<perms>] <src>... <dest>
# COPY [--chown=<user>:<group>] [--chmod=<perms>] ["<src>",... "<dest>"]

WORKDIR /opt
# WORKDIR指定工作目录，如果没有则会被创建，如果WORKDIR后出现了相对路径，都是相对WORKDIR的

CMD ["param1", "param2"]
# CMD指令有三种格式
# CMD ["executable","param1","param2"]  exec格式 最常用，不会有变量替换，需要变量替换需要使用shell格式或类似["shell", "-c", "e cho $HOME"]
# CMD ["param1","param2"] 作为ENTRYPOINT的默认参数，如果是这个用法 那么ENTRYPOINT指令也要用JSON数组的格式书写
# CMD command param1 param2 shell格式
# 一个Dockerfile中只能有一个CMD指令，如果写了多个那么只有最后一个生效

ENTRYPOINT ["biliup"]
# ENTRYPOINT ["executable", "param1", "param2"]
# ENTRYPOINT command param1 param2
```



![image-20230324223443650](https://storyxc.com/images/blog/image-20230324223443650.png)