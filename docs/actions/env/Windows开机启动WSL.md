# Windows开机启动WSL

`win+R`运行`shell:startup`打开开机启动程序文件夹，创建vbs脚本`wsl.vbs`

```bash
Set objShell = CreateObject("WScript.Shell")
objShell.Run "cmd /c wsl", 0
Set objShell = Nothing
```

重启即可
