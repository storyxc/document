# netty+websocket实现即时通讯功能

大致思路:
- 后台应用启动后开启nettyserver
- 前台登录后使用websocket连接netty
- 登录时先向netty发送一条初始化消息,服务器将保存通道和当前用户的关系映射
- 通讯双方都上线时,即可以开始聊天


后台:


- 应用启动后,开启netty服务器
```java
@Component
public class ServerStarter implements ApplicationListener<ContextRefreshedEvent> {

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        if (event.getApplicationContext().getParent() == null ){
            try {
                new IMServer().start();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

```

- nettyserver
```java
/**
 * @author Xc
 * @description
 * @createdTime 2020/7/9 9:23
 */
public class IMServer {
    Logger logger = LoggerFactory.getLogger(IMServer.class);

    public void start() throws InterruptedException {
        NioEventLoopGroup boss = new NioEventLoopGroup();
        NioEventLoopGroup worker = new NioEventLoopGroup();
        ServerBootstrap serverBootstrap = new ServerBootstrap();
        serverBootstrap.group(boss,worker)
                .channel(NioServerSocketChannel.class)
                .localAddress(8000)
		//自定义初始化器
                .childHandler(new IMStoryInitializer());
        ChannelFuture future = serverBootstrap.bind();
        future.addListener(new ChannelFutureListener() {
            @Override
            public void operationComplete(ChannelFuture future) throws Exception {
                logger.info("server start on 8000");
            }
        });
    }
}
```

- 初始化器
```java
/**
 * @author Xc
 * @description
 * @createdTime 2020/7/9 9:28
 */
public class IMStoryInitializer extends ChannelInitializer<SocketChannel> {
    
    @Override
    protected void initChannel(SocketChannel ch) throws Exception {
        ChannelPipeline pipeline = ch.pipeline();
        //http编解码器
        pipeline.addLast(new HttpServerCodec());
        //以块写数据
        pipeline.addLast(new ChunkedWriteHandler());
        //聚合器
        pipeline.addLast(new HttpObjectAggregator(64*1024));

        //websocket
        pipeline.addLast(new WebSocketServerProtocolHandler("/ws"));
        //自定义handler
        pipeline.addLast(new ChatHandler());
        
    }
}
```
- 自定义handler
```java
/**
 * @author Xc
 * @description
 * @createdTime 2020/7/9 9:34
 */
public class ChatHandler extends SimpleChannelInboundHandler<TextWebSocketFrame> {

    /**
     * 管理所有channel
     */
    public static ChannelGroup channels = new DefaultChannelGroup(GlobalEventExecutor.INSTANCE);

    @Override
    protected void channelRead0(ChannelHandlerContext ctx, TextWebSocketFrame msg) throws Exception {
        //客户端发过来的消息
        String content = msg.text();
        //当前通道
        Channel channel = ctx.channel();

        Message message = JSON.parseObject(content, Message.class);

        String data = message.getMsg();

        String fromUser = message.getFromUser();
        //客户端建立连接后先发送一条init消息,后台保存这个通道和用户信息的映射
        if (StringUtils.equals(message.getAction(), "init")) {
            ChannelUserContext.put(fromUser,channel);
        } else if (StringUtils.equals(message.getAction(),"chat")){
            Channel toChannel = ChannelUserContext.get(message.getToUser());
            if (toChannel != null) {
                //消息接收方在线
                toChannel.writeAndFlush(new TextWebSocketFrame(JSON.toJSONString(message.getFromUser() + " : " + message.getMsg())));
            } else {
                //接收方不在线 离线消息推送
            }

        }

    }

    @Override
    public void handlerAdded(ChannelHandlerContext ctx) throws Exception {
        channels.add(ctx.channel());
    }

    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) throws Exception {
        channels.remove(ctx.channel());
    }
}
```
- 通道和用户的映射保存
```java
/**
 * @author Xc
 * @description
 * @createdTime 2020/7/9 9:46
 */
public class ChannelUserContext {

    private static ConcurrentHashMap<String, Channel> userChannelMap;

    static{
        userChannelMap = new ConcurrentHashMap<>();
    }

    public static void put(String user, Channel channel){
        userChannelMap.put(user,channel);
    }

    public static Channel get(String user) {
        return userChannelMap.get(user);
    }
    
}
```
- message
```java
/**
 * @author Xc
 * @description
 * @createdTime 2020/7/9 9:38
 */
@Data
public class Message implements Serializable {
    private static final long serialVersionUID = 301234912340234L;
    private String msg;
    private String fromUser;
    private String toUser;
    private String action;
}
```

前台页面1
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>WebSocket客户端</title>
</head>
<body>
<script type="text/javascript">
    var socket;

    //如果浏览器支持WebSocket
    if(window.WebSocket){
        //参数就是与服务器连接的地址
        socket = new WebSocket("ws://localhost:8000/ws");

        //客户端收到服务器消息的时候就会执行这个回调方法
        socket.onmessage = function (event) {
			console.log(event);
            var ta = document.getElementById("responseText");
            ta.value = ta.value + "\n"+event.data;
        }

        //连接建立的回调函数
        socket.onopen = function(event){
            var ta = document.getElementById("responseText");

            ta.value = "连接开启";
            var message = '{"action":"init","msg":"test","fromUser":"张三","toUser":"李四"}';
            socket.send(message);
        }

        //连接断掉的回调函数
        socket.onclose = function (event) {
            var ta = document.getElementById("responseText");
            ta.value = ta.value +"\n"+"连接关闭";
        }
    }else{
        alert("浏览器不支持WebSocket！");
    }

    //发送数据
    function send(message){
        if(!window.WebSocket){
            return;
        }

        //当websocket状态打开
        if(socket.readyState == WebSocket.OPEN){
			message = '{"action":"chat","msg":"'+ message +'","fromUser":"张三","toUser":"李四"}';
            socket.send(message);
        }else{
            alert("连接没有开启");
        }
    }
</script>
<form onsubmit="return false">
    <textarea name = "message" style="width: 400px;height: 200px"></textarea>

    <input type ="button" value="张三:发送数据" onclick="send(this.form.message.value);">

    <h3>服务器输出：</h3>

    <textarea id ="responseText" style="width: 400px;height: 300px;"></textarea>

    <input type="button" onclick="javascript:document.getElementById('responseText').value=''" value="清空数据">
</form>
</body>
</html>
```
页面二就是对这个页面稍微改一下


启动后台后打开两个页面,即可开始进行通讯
![1.jpg](https://storyxc.com/images/blog//066e71b5e86d4b7fb03a82cf440496e4.jpg)

![2.jpg](https://storyxc.com/images/blog//9e901e6eff0941d1a2542b2c15df351e.jpg)
![3.jpg](https://storyxc.com/images/blog//df96070561aa44fa91e6d82156ec9505.jpg)
![4.jpg](https://storyxc.com/images/blog//0bcfbfa509bb42a79ddf823a6c057033.jpg)