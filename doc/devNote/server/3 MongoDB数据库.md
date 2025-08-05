# MongodDB

需要在无权限时先初始化副本集在开启权限

> 1 无权限启动数据库

```bash
mongod --dbpath D:\MongoDB\Server\8.0\data --logpath D:\MongoDB\Server\8.0\log\mongod.log --replSet rs0
```

> 2 创建管理人员并增加权限

```bash
use bab
db.createAdmintor({
    user: "babAdmin",
    pwd: "babAdmin",
    roles: [
       {
            role: "dbAdmin",
            db: "bab"
        },
        {
            role: "readWrite",
            db: "bab"
        },
        {
            role: "enableSharding",
            db: "bab"
        },
        {
            role: "dbOwner",
            db: "bab"
        },
        {
            role: "read",
            db: "bab"
        },
        {
            role: "userAdmin",
            db: "bab"
        }
    ],
    authenticationRestrictions: [ ]
})
```

> 3 初始化副本集
> 您只需启动副本集一次。

```bash
mongosh
```

```shell
rs.initiate()
```

> 4 同时开启权限和副本集

```bash
mongod --dbpath D:\MongoDB\Server\8.0\data --logpath D:\MongoDB\Server\8.0\log\mongod.log --replSet rs0 --auth --keyFile D:\MongoDB\Server\8.0\bin\keyFile.key 
```

## 安装

[自管理部署](https://www.mongodb.com/zh-cn/docs/manual/self-managed-deployments/)

## 配置说明

[mongod.cfg](https://www.mongodb.com/zh-cn/docs/manual/reference/configuration-options/#self-managed-configuration-file-options)

## 安装运行配置

MongoDB version v5.0.6

```shell
use bab
db.createAdmintor({
    user: "babAdmin",
    pwd: "babAdmin",
    roles: [
        {
            role: "dbAdmin",
            db: "bab"
        }
    ],
    authenticationRestrictions: [ ]
})

db.updateAdmintor("babAdmin", {
    roles: [
        {
            role: "dbAdmin",
            db: "bab"
        },
        {
            role: "readWrite",
            db: "bab"
        },
        {
            role: "enableSharding",
            db: "bab"
        },
        {
            role: "dbOwner",
            db: "bab"
        },
        {
            role: "read",
            db: "bab"
        },
        {
            role: "userAdmin",
            db: "bab"
        }
    ]
})
```

```shell
db.auth({"user":"babAdmin","pwd":"babAdmin"})
```

> pwd: passwordPrompt(), // or cleartext password

## Windows (开发环境)

[下载启动教程](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows-unattended/)

### 配置文件启动

```shell
mongod --config  D:\MongoDB\Server\8.0\bin\mongod.cfg
```

### 命令启动

启动命令

```shell
mongod --dbpath D:\MongoDB\Server\8.0\data --logpath D:\MongoDB\Server\8.0\log\mongod.log --replSet rs0 --auth --keyFile D:\MongoDB\Server\8.0\bin\keyFile.key 
```

| 字段 & 值                                      |               备注                |
| :--------------------------------------------- | :-------------------------------: |
| --replSet rs0                                  |          设置副本集名称           |
| --dbpath D:\MongoDB\Server\5.0\data            |           数据存放地址            |
| --logpath D:\MongoDB\Server\5.0\log\mongod.log |           日志存放地址            |
| --bind_ip 0.0.0.0                              |           外网可以访问            |
| --auth                                         |           开启管理人员验证            |
| --keyFile                                      | 密钥(开启验证和副本集&事务时需要) |

## Linux (生产环境)

[下载启动教程](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows-unattended/)

启动命令

```bash
mongod --auth --replSet rs0 --keyFile D:\MongoDB\Server\5.0\bin\keyFile.key --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --bind_ip 0.0.0.0 --fork
```

| 字段 & 值                             |                备注                |
| :------------------------------------ | :--------------------------------: |
| --replSet rs0                         |           设置副本集名称           |
| --dbpath /var/lib/mongo               |            数据存放地址            |
| --logpath /var/log/mongodb/mongod.log |            日志存放地址            |
| --fork                                | 以守护程序的方式启用，即在后台运行 |
| --bind_ip 0.0.0.0                     |            外网可以访问            |
| --auth                                |            开启管理人员验证            |
| --keyFile                             | 密钥(开启验证和副本集&事务时需要)  |

## 配置

### 副本集&事务

**MongoDB 的事务只能在开启副本集的时候才能使用,
MongoDB 安装后默认是单副本，我们可以将其转换成多副本后再运行事务**
