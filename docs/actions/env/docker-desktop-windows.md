# Windows下Docker Desktop安装





1. 官网下载安装包Docker Desktop Installer.exe

2. 运行安装并重启

3. 提示WSL2的linux内核安装不完整,点击链接跟随教程操作

   ![image-20210427020640967](https://storyxc.com/images/blog//image-20210427020640967.png)

4. 执行指引中的命令

   - 步骤 1 - 启用适用于 Linux 的 Windows 子系统`dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart` 	
   -  步骤 2 - 检查运行 WSL 2 的要求，不同架构的系统版本要求不同
   - 步骤 3 - 启用虚拟机功能，前提是开启虚拟化，如何开启虚拟化不再赘述`dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart`
   - 步骤 4 - 下载 Linux 内核更新包，地址：https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi
   - 步骤 5 - 将 WSL 2 设置为默认版本`wsl --set-default-version 2`
   - 步骤 6 - 安装所选的 Linux 分发，官方提供的方案是在微软商店中下载，因为网络原因很难实现，采取手动下载或命令行下载，参考地址`https://docs.microsoft.com/zh-cn/windows/wsl/install-manual`，下载完成后cd到下载的目录，执行`Add-AppxPackage .\filename`即可
     - 查看所有安装的分发版本`wsl --list --all`
     - 卸载指定的分发版本`wsl --unregister <DistributionName>`
   - 打开已安装的分发版本，在安装后会提示创建linux账户和密码