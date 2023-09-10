# 切换windows代理设置开关

```python

import winreg

INTERNET_SETTINGS = winreg.OpenKey(winreg.HKEY_CURRENT_USER,
    r'Software\Microsoft\Windows\CurrentVersion\Internet Settings',
    0, winreg.KEY_ALL_ACCESS)
name = 'ProxyEnable'

def toggle_proxy():
    _, reg_type = get_key()
    winreg.SetValueEx(INTERNET_SETTINGS, name, 0, reg_type, 1 if _ == 0 else 0)

def get_key():
    return winreg.QueryValueEx(INTERNET_SETTINGS,name)

toggle_proxy()

```


[windows下可执行文件下载点我](https://github.com/storyxc/toggle_proxy/releases/download/windows/toggle_proxy.exe)