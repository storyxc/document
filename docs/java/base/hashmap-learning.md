# JDK1.8 HashMap源码学习

## HashMap
HashMap是开发中最常用的容器之一，它也是Java集合框架中极为重要的组成部分，HashMap实现了Map接口，并继承 AbstractMap 抽象类

```java
public class HashMap<K,V> extends AbstractMap<K,V>
    implements Map<K,V>, Cloneable, Serializable {
	***    
}
```

首先了解下HashMap的几个字段

```java
static final int DEFAULT_INITIAL_CAPACITY = 1 << 4; // 默认的初始容量
static final int MAXIMUM_CAPACITY = 1 << 30; //最大容量
static final float DEFAULT_LOAD_FACTOR = 0.75f; //默认负载因子
transient Node<K,V>[] table; //哈希桶数组
transient int size; //容器中键值对的个数
transient int modCount;	//容器内部结构发生变化的次数，主要用于迭代的快速失败
int threshold; //阈值 table * loadFactor size超过这个值就会扩容
final float loadFactor; //负载因子 默认0.75
```

Node的结构

```java
static class Node<K,V> implements Map.Entry<K,V> {
    final int hash;
    final K key;
    V value;
    Node<K,V> next;

    Node(int hash, K key, V value, Node<K,V> next) {
        this.hash = hash;
        this.key = key;
        this.value = value;
        this.next = next;
    }

    public final K getKey()        { return key; }
    public final V getValue()      { return value; }
    public final String toString() { return key + "=" + value; }

    public final int hashCode() {
        return Objects.hashCode(key) ^ Objects.hashCode(value);
    }

    public final V setValue(V newValue) {
        V oldValue = value;
        value = newValue;
        return oldValue;
    }

    public final boolean equals(Object o) {
        if (o == this)
            return true;
        if (o instanceof Map.Entry) {
            Map.Entry<?,?> e = (Map.Entry<?,?>)o;
            if (Objects.equals(key, e.getKey()) &&
                Objects.equals(value, e.getValue()))
                return true;
        }
        return false;
    }
}
```

Node（JDK1.8之前叫Entry）是HashMap的静态内部类，实现了Map.Entry接口，包括了hash，key，value和下一节点next四个属性，**是构成哈希表的基石，是哈希表存储的元素的具体形式。** 

### 构造方法

```java
public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " +
                                           initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " +
                                           loadFactor);
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}
=====================================================================
public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
=====================================================================
public HashMap() {
   this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}
=====================================================================
public HashMap(Map<? extends K, ? extends V> m) {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
    putMapEntries(m, false);
}
```

HashMap的初始容量和负载因子是影响map性能的关键参数，容量指的是table数组的大小，负载因子是衡量哈希表使用程度的一个尺度，负载因子越小，那哈希表空间的利用率就越低，造成的空间浪费就越严重。而如果负载因子越大，哈希表的利用率越高，带来的问题就是查找效率的下降。0.75是对空间和时间成本的折衷选择，一般情况下无需修改。

## HashMap的数据结构

- hash的概念：把任意长度的输入，通过hash算法，转换成相同长度的输出（通常为整型)。

- HashMap的数据结构：

  HashMap的底层数据结构结合了数组和链表（JDK1.8之前)，实际上就是一个链表数组，也就是上文提到的Node<K,V> table[]。我们都知道数组的优势是查找快，增删慢，而链表则是增删快，查找慢，而这种链表数组——拉链法，结合了二者的优势，查找快，增删也快。查找元素的时间复杂度为O（1+n），n为链表的长度。在JDK1.8之后，为了解决哈希冲突频繁的问题，在原来的基础上又引入了红黑树，当链表长度超过8时，链表便会转化为红黑树结构，查找的时间复杂度从O(1+n)变成了O(1+lgn），大大提高了查询效率，不必再遍历链表。



- JDK1.8之前的HashMap结构
![Snipaste_20200608_234022.png](https://storyxc.com/images/blog//Snipaste_2020-06-08_23-40-22.png)
- JDK1.8的HashMap结构
![Snipaste_20200608_234101.png](https://storyxc.com/images/blog//Snipaste_2020-06-08_23-41-01.png)

## HashMap的功能 

HashMap中的方法很多，这里主要从hash，put，get，resize几个点深入研究

### hash

```java
static final int hash(Object key) {
    int h;
    return (key == null) ? 0 : (h = key.hashCode()) ^ (h >>> 16);
}
```

首先，我们可以发现HashMap是允许null键的，而HashTable则不支持。

`hash`方法的本质是对`key.hashCode()`和`key.hashCode()>>>16`进行异或运算，`>>>`为无符号右移运算符，就是将补码右移后高位补0。`^`异或是参与运算的数每一位上的数字对比，相同结果为0，不同结果为1。

所以hash方法的功能就是对高16bit和低16bit进行异或运算来减少碰撞。

### put方法

```java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}
```

### putVal方法

```java
final V putVal(int hash, K key, V value, boolean onlyIfAbsent,
               boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    //如果table为空或者为初始化则进行初始化
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    //计算插入的索引值（n- 1) & hash，如果数组中这个索引位置为空 则直接插入，next指针指向为null
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    else {
        //如果key已经存在了，直接覆盖value
        Node<K,V> e; K k;
        if (p.hash == hash &&
            ((k = p.key) == key || (key != null && key.equals(k))))
            //把第一个元素赋值给e记录
            e = p;
        //如果是红黑树
        else if (p instanceof TreeNode)
            //插入红黑树
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        else {
            //如果为链表，进行遍历直到下一个节点为null或者key存在
            for (int binCount = 0; ; ++binCount) {
                if ((e = p.next) == null) {
                    //插入链表最末端
                    p.next = newNode(hash, key, value, null);
                    //如果链表长度达到阈值 转换为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1) // -1 for 1st
                        treeifyBin(tab, hash);
                    break;
                }
                //判断链表中的节点key与即将插入的key是否相同
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                //和前面的e = p.next对应 用来遍历链表
                p = e;
            }
        }
        //如果key存在，则覆盖原来的value，返回oldValue
        if (e != null) { // existing mapping for key
            V oldValue = e.value;
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            //访问后的回调函数
            afterNodeAccess(e);
            return oldValue;
        }
    }
    //记录结构修改
    ++modCount;
    //如果哈希表中的键值对数量达到阈值，进行扩容
    if (++size > threshold)
        resize();
    //插入后的回调函数
    afterNodeInsertion(evict);
    return null;
}
```

流程梳理：

1. 计算key的hash值 （h = key.hashCode() ^ h >>> 16)

2. 根据hash值和table数组的长度n计算插入table数组的索引，(n - 1) & hash。由于n始终是2的n次方（为什么后面会介绍），所以(n - 1) & hash 相等于 hash % n ，但是位运算要比取模效率更高

3. 多种情况

   - 如果该位置没有数据，新生成一个节点保存新数据，返回null

   - 如果该位置有数据且是红黑树结构，那么执行相应的插入 / 更新操作；

   - 如果该位置有数据且是链表
     - 该链表没有这个节点，采用尾插法新增节点保存新数据，返回null
     - 链表上有这个节点，比较key.hash是否一致，一致则覆盖value，返回oldValue
    
流程图:
![Snipaste_20200620_163737.png](https://storyxc.com/images/blog//Snipaste_2020-06-20_16-37-37.png)

### get

```java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    // 1. 定位键值对所在桶的位置
    if ((tab = table) != null && (n = tab.length) > 0 &&
        (first = tab[(n - 1) & hash]) != null) {
        if (first.hash == hash && // always check first node
            ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            // 2. 如果 first 是 TreeNode 类型，则调用黑红树查找方法
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
                
            // 2. 对链表进行查找
            do {
                if (e.hash == hash &&
                    ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

### resize

```java
    final Node<K,V>[] resize() {
        //oldTable指向当前hash桶数组
        Node<K,V>[] oldTab = table;
        int oldCap = (oldTab == null) ? 0 : oldTab.length;
        int oldThr = threshold;
        int newCap, newThr = 0;
        if (oldCap > 0) {//如果旧的hash桶不为空
            if (oldCap >= MAXIMUM_CAPACITY) {
                //如果大于最大容量,则阈值设置为最大整数的值 
                threshold = Integer.MAX_VALUE;
                return oldTab;
            }
            else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY &&
                     oldCap >= DEFAULT_INITIAL_CAPACITY)
                //如果旧的hash桶容量扩容一次(左移1位)后小于最大值,并且旧的桶容量大于默认值16
                //新桶容量 = 旧桶容量*2
                newThr = oldThr << 1; // double threshold
        }
        else if (oldThr > 0) // initial capacity was placed in threshold
            newCap = oldThr;
        else {               // zero initial threshold signifies using defaults
            //初始化
            newCap = DEFAULT_INITIAL_CAPACITY;
            newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
        }
        if (newThr == 0) {
            float ft = (float)newCap * loadFactor;
            newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                      (int)ft : Integer.MAX_VALUE);
        }
        threshold = newThr;
        @SuppressWarnings({"rawtypes","unchecked"})
        //初始化一个容量为newCap的新hash桶数组
        Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
        //将新桶复制给旧的hash桶数组
        table = newTab;
        if (oldTab != null) {
            //如果旧的hash桶不为空,则开始扩容操作
            for (int j = 0; j < oldCap; ++j) {
                Node<K,V> e;
                if ((e = oldTab[j]) != null) {//旧桶j处节点值赋值给e,如果不为空,将旧桶j节点设置为空
                    oldTab[j] = null;
                    if (e.next == null)//如果e后面没有节点
                        newTab[e.hash & (newCap - 1)] = e;//直接对e的hash值对新数组长度求模获得hash桶中存储位置
                    else if (e instanceof TreeNode)//如果e为红黑树节点,将e添加到红黑树中
                        ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                    else { // preserve order //如果是链表
                        Node<K,V> loHead = null, loTail = null;
                        Node<K,V> hiHead = null, hiTail = null;
                        Node<K,V> next;
                        do {
                            next = e.next;//将e的下一节点赋值给next
                            if ((e.hash & oldCap) == 0) {//如果e的hash值对旧桶长度求模为0
                                if (loTail == null)
                                    loHead = e;//如果loTail为null,将e赋给loHead
                                else
                                    loTail.next = e;//非则将e赋值给loTail的next节点
                                loTail = e;//将e赋值给loTail节点
                            }
                            else {//如果e的hash值对旧桶长度取模不为0
                                if (hiTail == null)
                                    hiHead = e;//hiHead为null,将e赋值给hiHead
                                else
                                    hiTail.next = e;//否则e赋值给hiTail.next
                                hiTail = e;//将e赋值给hiTail
                            }
                        } while ((e = next) != null);//直到e为空
                        if (loTail != null) {
                            //如果loTail不为空,将loTail的下一节点设置为null
                            loTail.next = null;
                            //将loHead赋值给新桶的j处
                            newTab[j] = loHead;
                        }
                        if (hiTail != null) {
                            //如果hiTail不为空,将hiTail的下一节点设置为null
                            hiTail.next = null;
                            //hiHead赋值给新桶的j+旧桶数组长度处
                            newTab[j + oldCap] = hiHead;
                        }
                    }
                }
            }
        }
        return newTab;
    }
```

### 为什么table的长度总是2的n次幂
- tableSizeFor(int cap)方法

```java
    static final int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }
```

测试类
```java
public class Test {
    public static void main(String[] args) {

        int cap = 65538;
        System.out.println(Integer.toBinaryString(cap));
        System.out.println(Integer.toBinaryString(cap-1));
        int i = tableSizeFor(cap);
        System.out.println(Integer.toBinaryString(i));
    }

    static final int tableSizeFor(int cap) {
        int n = cap - 1;
        n |= n >>> 1;
        System.out.println(Integer.toBinaryString(n));
        n |= n >>> 2;
        System.out.println(Integer.toBinaryString(n));
        n |= n >>> 4;
        System.out.println(Integer.toBinaryString(n));
        n |= n >>> 8;
        System.out.println(Integer.toBinaryString(n));
        n |= n >>> 16;
        System.out.println(Integer.toBinaryString(n));
        return (n < 0) ? 1 : (n >= MAXIMUM_CAPACITY) ? MAXIMUM_CAPACITY : n + 1;
    }
}
```

运行结果
```
010000000000000010
010000000000000001
011000000000000001
011110000000000001
011111111000000001
011111111111111111
011111111111111111
100000000000000000
```

- 分析
第一次运行：
    10000000000000010        n >>> 1;
    01000000000000000        进行|运算
    11000000000000001
    把最大位的1，通过位移后移一位，并且通过|运算，组合起来
第二次运行：
    11000000000000001        n >>> 2;
    00110000000000000        进行|运算
    11110000000000001
    把最大的两位，已经变成1的，往后移动两位，并且通过|运算，组合起来
第三次运行：
    11110000000000001        n >>> 4;
    00001111000000000        进行|运算
    11111111000000001
    把最大4位，已经变成1的，往后移动4位，并且通过|运算，组合起来
第四次运行：
    11111111000000001        n >>> 8;
    00000000111111110        进行|运算
    11111111111111111
    把最大的8位，已经变成1的，往后移动8位，并且通过|运算，组合起来
第五次运算：
    同上进行16位运算
第六次运算：
    返回结果,格式为最高位为1其他为全为0的值,即一定是2的整数次幂
