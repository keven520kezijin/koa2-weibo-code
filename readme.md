refactor: 重构
feat: 新增加
feature-xxx: 增加功能的分支
fix-xxx:解决bug

redis-server.exe redis.windows.conf
redis-cli 

keys *

// 没有新建分支的技巧 6-1 创建页面(更多IT教程 微信352852792) 10-18
1、git stash  // 暂存修改部分
2、git checkout -b feature-user-setting // 新建分支且切换到新分支
3、git stash pop // 找回修改部分