# 责任链模式

## 背景

根据不同的订单结算金额规则配置，来计算出每一条订单商品的结算金额，每条规则都有自己的匹配条件，匹配上的则应用该条规则所配置的结算金额计算公式。客户可以配置多条不同的规则，组成一条规则链。每条订单商品记录按规则的顺序依次进行条件匹配，如果匹配上则停止，匹配不上继续，直至规则链结束，没有匹配则使用默认规则进行兜底。

## 责任链模式

责任链模式（Chain of Responsibility Pattern）是一种软件设计模式，它可以让多个对象都有机会处理请求，从而避免了请求的发送者和接收者之间的耦合关系。在责任链模式中，每个对象都有其对应的处理请求的方法，如果一个对象不能够处理该请求，那么它会将这个请求传递给下一个对象来处理，直到找到能够处理该请求的对象为止。

责任链模式通常由以下几个角色组成：

1. 抽象处理者（Handler）：定义了处理请求的接口，同时也可以实现一些公共的处理逻辑；
2. 具体处理者（Concrete Handler）：继承自抽象处理者，实现了具体的处理方法，如果能够处理该请求，则处理请求；否则将请求转发给下一个处理者；
3. 客户端（Client）：创建请求对象，并将请求对象传递给第一个处理者；
4. 请求对象（Request）：封装了需要处理的数据和请求类型等信息。

责任链模式的优点在于它能够降低系统的耦合度，增强系统的可扩展性和灵活性。同时，由于责任链模式中的处理者之间是松散耦合的，因此可以方便地增加或删除处理者，而不会影响到其他部分的功能。

## 实现

上述需求，其实就是典型的责任链模式的应用场景。而责任链模式一般有两种实现：指针和集合的方式。

指针模式是最常见的责任链模式实现方式之一。在这种模式下，每个处理对象都持有一个指向下一个处理对象的引用，形成一个链表。当请求到达一个处理对象时，如果该对象无法处理该请求，则将请求传递给链表中的下一个对象，直到找到能够处理该请求的对象为止。

集合模式是另一种责任链模式实现方式。与指针模式不同的是，集合模式下，所有的处理对象被封装在一个集合中，每个对象都具有相同的处理机会。当请求到达集合时，集合中的每个对象都有机会去处理请求，直到有一个对象成功地处理了请求或者所有对象都无法处理该请求为止。

### 责任链

```java
public abstract class HandlerChain<T, R extends Rule> {

    protected List<Handler<T, R>> handlers;

    public void setHandlers(List<Handler<T, R>> handlers) {
        this.handlers = handlers;
    }

    public List<Handler<T, R>> getHandlers() {
        return handlers;
    }

    public void handle(T t) {
        if (CollUtil.isNotEmpty(handlers)) {
            for (Handler<T, R> handler : handlers) {
                if (!handler.handle(t)) {
                    break;
                }
            }
        }
    }

    public void clear() {
        if (CollUtil.isNotEmpty(handlers)) {
            handlers.clear();
        }
    }
}
```

### 处理器

```java
public abstract class Handler<T, R extends Rule> {

    protected CommonDynamicParam param;
    protected R rule;

    public abstract boolean handle(T t);

    public CommonDynamicParam getParam() {
        return param;
    }

    public void setParam(CommonDynamicParam param) {
        this.param = param;
    }

    public R getRule() {
        return rule;
    }

    public void setRule(R rule) {
        this.rule = rule;
        this.param = JSON.parseObject(rule.getSettlementCondition(), CommonDynamicParam.class);
    }
}
```

## 

### 大致流程

1. 实现具体的Handler处理器逻辑（handle）

2. 初始化处理器集合`List<Handler>`,并交给责任链对象HandlerChain管理

3. 调用责任链的handle方法处理对象
