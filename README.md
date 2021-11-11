# SMTP邮件服务器应用

采用前后端分离架构

后端：python + socket编程，flask框架搭建后端服务器，mysql数据库

前端：react + node.js前端服务器

## 后端

### 数据库配置

在数据库中创建smtp数据库

使用项目根目录下的`smtp.sql`进行数据库表的初始化，输入如下命令：

`mysql -u root -p smtp < ./smtp.sql`

配置`/backend/utils/databaseConfig.py`中的数据库连接参数

### SMTP服务配置

在`/backend/utils`文件下新建`SMTPSenderConfig.yaml`文件，配置smtp服务

配置如下属性：

```yaml
mailServer: smtp.qq.com
serverPort: 587
fromAddress: xxxx@xx.com
username: xxxx
password: ***  #smtp服务密码而非邮箱密码
```

### 启动后端服务器

在`backend`目录下运行：

`python ./__init__.py	`



## 前端

### 配置前端服务器

需要安装node.js

在`/frontend/react-front`目录下运行：

`npm install`

`npm start`

即可运行开发服务器

可使用`npm run build`打包发布，使用`serve -s build`运行部署服务器