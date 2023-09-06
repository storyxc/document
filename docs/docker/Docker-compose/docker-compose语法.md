# docker-compose语法

## 基础模板

> https://docs.docker.com/compose/compose-file/

```yml
version: "3.8" # version是compose文件格式版本号 需要和Docker Engine对应 https://docs.docker.com/compose/compose-file/compose-file-v3/

services:  
  service1:   
    image: image_name:version  #指定镜像
    container_name: service1       #容器名
    environment:							 #指定环境变量	
      - A=1
      - B=2
    restart: always            #重启策略
    volumes:                   #数据卷挂载
      - /etc/localtime:/etc/localtime:ro
    ports:                     #端口映射配置
      - "6610:6610"
      - "6611:6611"
    links:                      #定义到另一个服务中的容器的网络链接,可以在此容器直接用服务名访问另一个容器，links也有服务之间的隐式依赖关系，因此也决定了服务启动的顺序。
      - service2
    env_file:
    	- ./a.env
    	- ./b.env
    devices:
      - "/dev/ttyUSB0:/dev/ttyUSB0"
      - "/dev/sda:/dev/xvda:rwm"
    dns:
     - 8.8.8.8
  service2:      
    build:                     #构建配置
    	context: .               #指定包含Dockerfile的目录或一个git仓库的url
    	dockerfile: webapp.Dockerfile   #指定要使用的Dockerfile名称，默认找Dockerfile，和dockerfile_inline参数不能同时使用
    	dockerfile_inline:       #直接在compose文件里写Dockerfile指令 和dockerfile参数不能同时使用
    		FROM xxx
    		RUN some command
    container_name: service2
    network_mode: "host"      #配置网络模式，none(禁用所有容器网络)/host(使用宿主接口)/service:{name}(只能访问指定服务)
    networks:                #指定容器连接的docker网络
    	- netA
    	- netB
    depends_on:               #依赖某个服务，决定了服务的启动和关闭顺序
    	- service3

```

