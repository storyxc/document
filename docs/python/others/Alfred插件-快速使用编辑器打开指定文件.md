# Alfred插件-快速使用编辑器打开指定文件



```python
import sys
import subprocess
import re
import os

_pattern = r'[^A-Za-z0-9_\-.,:+\/@\n]'


def replace_func(match_obj):
    return '\\' + match_obj.group(0)


def shell_escape(str_param):
    return re.sub(_pattern, replace_func, str_param)


if __name__ == '__main__':
    if os.path.exists(sys.argv[1]):
        file_path = shell_escape(sys.argv[1])
        editor = shell_escape(sys.argv[2])
        command = f"open -a {editor} {file_path}"
        subprocess.Popen(command, shell=True)

```



release：https://github.com/storyxc/Alfred-open-with-editor/releases/download/Alfred/Open.with.Editor.alfredworkflow

repository：https://github.com/storyxc/Alfred-open-with-editor/releases/tag/Alfred





![image-20220221194201279](https://storyxc.com/images/blog/image-20220221194201279.png)