# Linux访问权限控制之ACL



## 什么是ACL

ACL即Access Control List，访问控制列表，POSIX 1003.1e/1003.2c标准中定义的权限管理方式。详细内容可以参考[POSIX Access Control Lists on Linux](https://www.usenix.org/legacy/publications/library/proceedings/usenix03/tech/freenix03/full_papers/gruenbacher/gruenbacher_html/main.html)这篇文章。

> POSIX：POSIX是可移植操作系统接口（Portable Operating System Interface of UNIX）的缩写，POSIX标准定义了操作系统应该为应用程序提供的接口标准，是在各种UNIX操作系统上运行的软件的一系列API标准的总称。POSIX标准意在期望获得源代码级别的软件可移植性。换句话说，为一个POSIX兼容的操作系统编写的程序，应该可以在任何其它的POSIX操作系统（即使是来自另一个厂商）上编译执行。

## 为什么使用ACL

经典的Unix权限模型中每个文件系统对象都定义了三组权限，owner、group和other。也就是常用的`chmod`命令中修改的权限，包括读（r）、写入（w）和执行（x）。但是如果我们想更细颗粒度的控制某些用户的权限时，使用`chmod`、`chown`就很难办了。这就需要ACL来针对单一用户、单一文件或目录来进行权限控制。

## ACL的工作原理

ACL由一系列Access Entry组成，Access Entry又包括三个部分：Entry  type，qualifier(非必须）、权限

Entry  type有以下类型：

- Owner/ACL_USER_OBJ : 相当于Linux里file_owner的权限

- Named user/ACL_USER: 定义了额外的用户可以对此文件拥有的权限
- Owning group/ACL_GROUP_OBJ: 相当于Linux里group的权限
- Named group/ACL_GROUP: 定义了额外的组可以对此文件拥有的权限
- Mask/ACL_MASK: 定义了ACL_USER, ACL_GROUP_OBJ和ACL_GROUP的最大权限 
- Others/ACL_OTHER: 相当于Linux里other的权限



### 访问检查算法

进程请求访问文件系统对象。执行两个步骤。第一步选择与请求进程最匹配的 ACL 条目。ACL 条目按以下顺序查看：所有者、命名用户、（拥有或命名）组、其他。只有一个条目决定访问。第二步检查匹配条目是否包含足够的权限。

一个进程可以是多个组中的成员，因此可以匹配多个组条目。如果这些匹配的组条目中的任何一个包含请求的权限，则选择包含请求的权限的条目（无论选择哪个条目，结果都是相同的）。如果没有匹配的组条目包含请求的权限，则无论选择哪个条目都将拒绝访问。

访问检查算法可以用伪代码描述如下。

- **if**

  进程的用户ID是所有者，所有者条目决定访问权限

- **else if**

  进程的用户 ID 与指定用户条目之一中的限定符匹配，此条目确定访问权限

- **else if**

  进程的组 ID 之一与所属组匹配，并且所属组条目包含请求的权限，此条目确定访问权限

- **else if**

  进程的组 ID 之一与命名组条目之一的限定符匹配，并且此条目包含请求的权限，此条目确定访问权限

- **else if**

  进程的组 ID 之一与所属组或任何命名组条目匹配，但所属组条目或任何匹配命名组条目均不包含请求的权限，这确定访问被拒绝

- **else**

  另一个条目决定访问。

- **if**

  此选择产生的匹配条目是所有者或其他条目，并且它包含请求的权限，授予访问权限

- **else if**

  匹配条目是命名用户、拥有组或命名组条目，并且此条目包含请求的权限，并且掩码条目也包含请求的权限（或没有掩码条目），授予访问权限

- **else**

  访问被拒绝。

> The access check algorithm can be described in pseudo-code as follows.
>
> - **If**
>
>   the user ID of the process is the owner, the owner entry determines access
>
> - **else if**
>
>   the user ID of the process matches the qualifier in one of the named user entries, this entry determines access
>
> - **else if**
>
>   one of the group IDs of the process matches the owning group and the owning group entry contains the requested permissions, this entry determines access
>
> - **else if**
>
>   one of the group IDs of the process matches the qualifier of one of the named group entries and this entry contains the requested permissions, this entry determines access
>
> - **else if**
>
>   one of the group IDs of the process matches the owning group or any of the named group entries, but neither the owning group entry nor any of the matching named group entries contains the requested permissions, this determines that access is denied
>
> - **else**
>
>   the other entry determines access.
>
> - **If**
>
>   the matching entry resulting from this selection is the owner or other entry and it contains the requested permissions, access is granted
>
> - **else if**
>
>   the matching entry is a named user, owning group, or named group entry and this entry contains the requested permissions and the mask entry also contains the requested permissions (or there is no mask entry), access is granted
>
> - **else**
>
>   access is denied.

## ACL命令

- `getfacl`：查看某个文件/目录的ACL权限

- `setfacl`：设置某个文件/目录的ACL权限
  - -m：设置后续acl参数
  - -x：删除后续acl参数
  - -b：删除全部acl参数
  - -k：删除默认acl参数
  - -R：递归设置acl参数
  - -d：设置默认acl参数



## 例子

### 设置指定用户/组权限

- `setfacl -m u:user1:rx /test`：给user1用户设置`/test`目录的rx（r-x）权限
- `setfacl -m g:group1:rx /test`：给group1组设置`/test`目录的rx（r-x）权限
- `setfacl -m o:--x /test`：给other设置x（--x）权限（chmod o+x /test）

### 默认ACL权限

**默认权限下新建的子目录会继承父目录的权限，只有目录才能给默认权限，不是目录的对象仅继承父目录的默认 ACL 作为其访问 ACL。**

- `setfacl -m d:u:user1:rx /test`：给user1用户设置`/test`目录的默认rx权限
- `setfacl -m d:g:group1:rx /test`：给group1组设置`/test`目录的默认rx权限
- `setfacl -m d:o:--x /test`：给other设置`/test`目录的默认x权限

### 最大有效权限mask

如上文所描述的，mask定义了ACL_USER, ACL_GROUP_OBJ和ACL_GROUP的最大权限。例如，mask权限为`r--`，此时不管ACL_USER的权限为多大，就算是``rwx`，最终生效的都只会是`r--`。**概括来说：用户和用户组的权限必须在mask权限的范围之内才能生效，mask权限就是最大有效权限。**

#### 修改mask权限

`setfacl -m m:rx /test`：设置mask权限为r-x，使用`setfacl -m m:权限 路径`

### 删除所有acl权限

`setfacl -b /test`

### 删除指定acl权限

`setfacl -x u:user1 /test`
