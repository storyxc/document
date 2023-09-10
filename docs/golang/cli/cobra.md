# Cobra

Cobra是一个能够快速构建cli工具的库，相比于之前用过的Python的argparser模块，Cobra更加强大、灵活，还有自动生成文档等功能。

> https://github.com/spf13/cobra/blob/main/site/content/user_guide.md

### 安装cobra依赖

`go get -u github.com/spf13/cobra@latest`

### 安装cobra-cli工具

`go install github.com/spf13/cobra-cli@latest`

> cobra-cli会被安装到GOPATH的bin目录

### 使用cobra-cli初始化项目

```shell
cd cobra-learn
cobra-cli init                             
// Your Cobra application is ready at
// /Users/story/Developer/go/src/cobra-learn
```

生成的目录结构:

```shell
├── LICENSE
├── cmd
│   └── root.go
├── go.mod
├── go.sum
└── main.go
```

```go
// main.go
package main

import "cobra-learn/cmd"

func main() {
	cmd.Execute()
}

```

```go
// root.go
package cmd

import (
	"os"

	"github.com/spf13/cobra"
)



// rootCmd represents the base command when called without any subcommands
var rootCmd = &cobra.Command{
	Use:   "cobra-learn",
	Short: "A brief description of your application",
	Long: `A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	// Uncomment the following line if your bare application
	// has an action associated with it:
	// Run: func(cmd *cobra.Command, args []string) { },
}

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	// Here you will define your flags and configuration settings.
	// Cobra supports persistent flags, which, if defined here,
	// will be global for your application.

	// rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $HOME/.cobra-learn.yaml)")

	// Cobra also supports local flags, which will only run
	// when this action is called directly.
	rootCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
```

执行命令`go run main.go`会输出定义的详细描述

```shell
➜  cobra-learn go run main.go                             
A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.
```

### 给命令添加子命令

```shell
➜  cobra-learn cobra-cli add version
version created at /Users/story/Developer/go/src/cobra-learn
```

目录结构:

```shell
├── LICENSE
├── cmd
│   ├── root.go
│   └── version.go
├── go.mod
├── go.sum
└── main.go
```

```go
// version.go
package cmd

import (
	"fmt"

	"github.com/spf13/cobra"
)

// versionCmd represents the version command
var versionCmd = &cobra.Command{
	Use:   "version",
	Short: "A brief description of your command",
	Long: `A longer description that spans multiple lines and likely contains examples
and usage of using your command. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.`,
	Run: func(cmd *cobra.Command, args []string) {
		fmt.Println("version called")
	},
}

func init() {
	rootCmd.AddCommand(versionCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// versionCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// versionCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
```

执行`go build`编译项目,会在项目根目录生成二进制文件`cobra-learn`执行该命令：

```shell
➜  cobra-learn ./cobra-learn    
A longer description that spans multiple lines and likely contains
examples and usage of using your application. For example:

Cobra is a CLI library for Go that empowers applications.
This application is a tool to generate the needed files
to quickly create a Cobra application.

Usage:
  cobra-learn [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  help        Help about any command
  version     A brief description of your command

Flags:
  -h, --help     help for cobra-learn
  -t, --toggle   Help message for toggle

Use "cobra-learn [command] --help" for more information about a command.
```

执行`cobra-learn version`：

```shell
➜  cobra-learn ./cobra-learn version
version called
```

可以看到调用命令执行的就是`Run`属性对应的函数

### 给命令增加flag

```go
func init() {
	rootCmd.AddCommand(versionCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// versionCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	versionCmd.Flags().StringP("ver", "v", "1.0", "版本号")
}
```

```shell
➜  cobra-learn go build
➜  cobra-learn ./cobra-learn version
Usage:
  cobra-learn version [flags]

Flags:
  -h, --help         help for version
  -v, --ver string   版本号 (default "1.0")

```

在Run函数中获取flag

```go
Run: func(cmd *cobra.Command, args []string) {
		ver, _ := cmd.Flags().GetString("ver")
		fmt.Println(ver)
}
```

```shell
➜  cobra-learn go build                       
➜  cobra-learn ./cobra-learn version --ver 123
123 # 使用name
➜  cobra-learn ./cobra-learn version -v 1234  
1234 # 使用shorthand
➜  cobra-learn ./cobra-learn version        
1.0 # 不带flag 使用默认值
```

### 修改命令配置

#### 自定义usage输出

可以看到上面输出的`./cobra-learn version`的uage信息是默认的

```shell
Usage:
  cobra-learn version [flags]
```

我们可以通过`SetUsageTemplate`或`SetUsageFunc`自定义这一内容：

- SetUsageTemplate

```go
func init() {
	rootCmd.AddCommand(versionCmd)
	rootCmd.AddCommand(versionCmd)
	versionCmd.SetUsageTemplate(
		`Usage: story version [options] <ver>` + "\n" +
			`版本号` + "\n" +
			`Options:` + "\n" +
			`  -h, --help   help for version` + "\n",
	)
}	
```

```shell
➜  cobra-learn go build
➜  cobra-learn ./cobra-learn version
Error: accepts 1 arg(s), received 0
Usage: story version [options] <ver>
版本号
Options:
  -h, --help   help for version
```

- SetUsageFunc

```go
func init() {
	rootCmd.AddCommand(versionCmd)
	versionCmd.SetUsageFunc(func(cmd *cobra.Command) error {
		fmt.Println("Usage: story version")
		return nil
	})
}
```

```go
➜  cobra-learn go build             
➜  cobra-learn ./cobra-learn version
Usage: story version
```

#### 限制arg参数

- Number of arguments:
  - `NoArgs` - report an error if there are any positional args.
  - `ArbitraryArgs` - accept any number of args.
  - `MinimumNArgs(int)` - report an error if less than N positional args are provided.
  - `MaximumNArgs(int)` - report an error if more than N positional args are provided.
  - `ExactArgs(int)` - report an error if there are not exactly N positional args.
  - `RangeArgs(min, max)` - report an error if the number of args is not between `min` and `max`.

- Content of the arguments:
  - `OnlyValidArgs` - report an error if there are any positional args not specified in the `ValidArgs` field of `Command`, which can optionally be set to a list of valid values for positional args.

例：`Args:  cobra.ExactArgs(1)`

执行不带参数时：

```shell
➜  cobra-learn ./cobra-learn version
Error: accepts 1 arg(s), received 0 # 提示需要提供一个参数
Usage: story version
```

