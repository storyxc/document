# Poetry

> Poetry: PYTHON PACKAGING AND DEPENDENCY MANAGEMENT MADE EASY
>
> https://python-poetry.org/

## 简介

Poetry是一个Python包管理工具，类似于pip，但是远比pip强大，除了依赖管理外，还能自动解析依赖的关系，还可以管理项目的虚拟环境，打包、发布。
> pip的缺陷：移除依赖时不能自动解析依赖的关系
>
> 如果执行pip install flask，pip会自动安装flask所依赖的包，但是如果执行pip uninstall flask，pip只会移除flask包，而不会移除flask依赖的包，这样就会导致项目中存在无用的包，只能我们手动移除。但是手动移除包是很危险的，因为一不小心可能会把其他包依赖的包删除了导致项目不能正常运行。

Poetry使用了[PEP 518](https://peps.python.org/pep-0518/)提出的`pyproject.toml`配置文件，在依赖管理方面替代了传统的`requirements.txt`，在构建方面替换了传统的`setup.py`，更加清晰、灵活。

## 安装和基本使用

### 安装

> https://python-poetry.org/docs/#installing-with-the-official-installer

Poetry在各个操作系统的默认安装路径：

- `~/Library/Application Support/pypoetry` on MacOS.
- `~/.local/share/pypoetry` on Linux/Unix.
- `%APPDATA%\pypoetry` on Windows.

在安装时指定`POETRY_HOME`环境变量：

```sh
curl -sSL https://install.python-poetry.org | POETRY_HOME=/etc/poetry python3 -
```

将`$POETRY_HOME/bin`添加到PATH

查看版本：`poetry --version`

更新版本：`poetry self update`

命令补全：

```sh
mkdir $ZSH_CUSTOM/plugins/poetry
poetry completions zsh > $ZSH_CUSTOM/plugins/poetry/_poetr
```

```shell
# .zshrc
plugins=(
  git
  zsh-autosuggestions
  zsh-syntax-highlighting
  poetry
  ...
)
```

### 初始化

- 初始化项目：`poetry init`

## 使用

- 配置虚拟环境生成到项目路径下：`poetry config virtualenvs.in-project true`

> 默认的情况poetry会将虚拟环境生成到特定目录(根据操作系统有不同)，命名规则为项目名-random-python版本，这样并不方便管理，所以改为在项目目录下生成虚拟环境，更符合使用习惯，修改后生成的虚拟环境在项目路径下的.venv

- 创建虚拟环境：`poetry env use python`

> 取决于python在PATH中link的版本，也可以改为poetry env use python3.11

- 启动虚拟环境：`poetry shell`
- 退出虚拟环境：`exit`
- 新增依赖：`poetry add`

>执行poetry add后会自动将add的包信息和版本添加到pyproject.toml中(不会记录该包依赖的其他包)，这样就可以区分出主动安装的是什么包，和基于依赖关系安装的是什么包。
>
>除了pyproject.toml，项目中还会生成一个poetry.lock文件(类似npm的lock文件或原来的requirements.txt)，记录安装的所有依赖和对应版本

- 指定版本新增依赖：
  - `^`：表示匹配指定版本的最新次版本（minor version）和补丁版本（patch version），但不改变主版本（major version）。
    - 示例：`poetry add Django@^2.1.0` 表示匹配2.x.x中最新的版本不包括3.0.0。
  - `~`：表示匹配指定版本的最新补丁版本，不改变主版本和次版本。
    - 示例：`poetry add Django@~1.2.3`表示匹配1.2.x中最新的版本，但不包括1.3.0。
  - `>=`：表示匹配指定版本或更高版本，不限制最后一位的变化。
    - 示例：`poetry add Django>=3.2.0`表示匹配Django3.2版本及其更高版本。
  - `==`：表示严格匹配指定版本。
    - 示例：`poetry add numpy==1.21.3`表示只匹配精确版本号为1.21.3。
- 新增依赖到dev-dependencies：`poetry add xxx -D`或`poetry add xxx --dev`
- 手动更新依赖版本：
  - 更新`pyproject.toml`中的依赖版本
  - 更新lock文件中的版本：`poetry lock`
  - 重新安装依赖到虚拟环境：`poetry install`

- `poetry install`
  - **安装依赖项：** 执行该命令将会读取`pyproject.toml`文件中的`[tool.poetry.dependencies]`部分，并根据其中的规范（例如包的名称和版本要求）来安装依赖项。
  - **生成锁文件：** 如果项目中没有`poetry.lock`文件，`poetry install`会生成`poetry.lock`文件。这个锁文件包含了确切的依赖项版本，确保在不同的环境中使用相同的软件包版本。
  - **加速依赖项安装：** 如果存在`poetry.lock`文件，`poetry install`将首先检查锁文件并使用其中的版本信息，而不是重新计算依赖关系。这有助于提高依赖项安装的速度。
  - **创建虚拟环境：** 如果项目中没有虚拟环境`poetry install`会自动创建一个虚拟环境，并将依赖项安装到该虚拟环境中。如果已经存在虚拟环境，将会使用现有的虚拟环境。
- 更新依赖：`poetry update`
- 列出依赖：`poetry show`
  - 树状依赖：`poetry show --tree`
- 移除依赖：`poetry remove`
- 输出requirements.txt：`poetry export`
  - `poetry export -f requirements.txt -o requirements.txt --without-hashes`

- 打包：`poetry build`

  - 只打包wheel：`poetry build -f wheel`

- 发布：`poetry publish`

  > 需要配置仓库

