# README

本文档用于介绍该社团管理系统的部署与使用

## 准备工作

### 一、数据库准备

#### 1.安装mysql8.0.26数据库

教程地址:[MySQL8.0.26的安装与配置——详细教程 - viljz - 博客园 (cnblogs.com)](https://www.cnblogs.com/viljz/archive/2021/10/18/15411395.html)

可自行上网百度mysql数据库的教程

#### 2.创建数据库和用户

```sql
# 创建数据库
create database clubmanage;
# 创建用户并授权
create user 'clubmanage'@'localhost' identified by '123456';
grant all privileges on clubmanage.* to "clubmanage"@"localhost";
flush privileges # 刷新权限
```

#### 3.导入数据表

```sql
mysql -u root -p clubmanage < clubManage.sql
```

### 二、node.js后端准备

####  1.安装node.js

教程地址：[Node.js 安装配置 | 菜鸟教程 (runoob.com)](https://www.runoob.com/nodejs/nodejs-install-setup.html)

#### 2.安装cnpm淘宝代理

```shell
# 升级或安装 cnpm
npm install cnpm -g
```

### 三、vue前端准备工作

#### 1.安装vue-cli

```shell
# 全局安装 vue-cli
$ cnpm install --global vue-cli
```

-----------------------------------

至此，准备工作已全部完成





## 启动项目

### 前端启动

```shell
# 1.cd 到项目根文件夹的 client 目录下
cd ./client
# 2.启动前端
npm run serve
```

### 后端启动

```shell
# 1.在项目根目录下
npm run server
```

### 说明

```shell
前端运行在http://127.0.0.1:8080/上
后端运行在http://127.0.0.1:8888/上
```



## 错误码说明

| 错误码 | 说明               |
| :----- | ------------------ |
| 200    | 正常               |
| 10001  | 非法请求           |
| 10002  | 数据库错误         |
| 10003  | 生成加密密钥出错   |
| 10004  | 生成令牌出错       |
|        |                    |
|        |                    |
|        |                    |
|        |                    |
| 10011  | 该学号已被注册     |
| 10012  | 学号或密码错误     |
| 10013  | 修改密码旧密码错误 |
| 10014  | 该部门已存在       |
| 10015  | 该学院已存在       |
|        |                    |





## 数据库说明

#### user_table 用户表

```sql
create table user_table(
	id int not null AUTO_INCREMENT,
    name  varchar(50) not null,
    faculty varchar(50) not null,
    classroom varchar(50) not null,
    studentid varchar(50) not null,
    password varchar(100) not null,
    identity varchar(50) not null,
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    depart_man_id int not null default 0,
    collage_man_id int not null default 0,
    PRIMARY KEY (id)
);
```

#### activity_table 活动表

```sql
create table activity_table(
	id int not null AUTO_INCREMENT,
    name varchar(50) not null,
    type varchar(50) not null,
    initiator varchar(50) not null,
    thedescribe varchar(200) not null,
    starttime timestamp not null,
    endtime timestamp not null,
    place varchar(50) not null,
    maxnum varchar(20) not null,
   	state varchar(20) not null DEFAULT "申报中",
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);
```

#### user_ref_act 用户和活动关联表

```sql
create table user_ref_act(
	user_id int not null,
    act_id int not null
);

ALTER TABLE user_ref_act ADD CONSTRAINT FK_USER FOREIGN KEY(user_id) REFERENCES user_table(ID);
ALTER TABLE user_ref_act ADD CONSTRAINT FK_ACTIVITY FOREIGN KEY(act_id) REFERENCES activity_table(ID);
ALTER TABLE user_ref_act ADD CONSTRAINT PK_USER_REF_ACTIVITY PRIMARY KEY(user_id,act_id);
```

#### appeal_table 申诉表

```sql
create table appeal_table(
    id int not null AUTO_INCREMENT,
    act_id int not null,
    act_name varchar(50) not null,
    act_type varchar(50) not null,
   	user_id int not null,
    user_name varchar(50) not null,
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    reason varchar(300) not null,
    state varchar(20) not null default "",
    PRIMARY KEY (id)
);
```

### 五张打分表

#### moral_edu 德育

```sql
create table moral_edu(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    act_id int not null,
    moral_education int not null default 0,
    
    score1 int not null default 0,
    name1 varchar(50) not null default "政治态度",
    score2 int not null default 0,
    name2 varchar(50) not null default "爱国观念",
    score3 int not null default 0,
    name3 varchar(50) not null default "集体观念",
    
    
    score_type varchar(10) not null default "000",
    upper_limit int not null default 20,
    PRIMARY KEY (id),
    CONSTRAINT `USER_ID` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
    CONSTRAINT `ACT_ID` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`)
);
```

#### intellectual_edu 智育

```sql
create table intellectual_edu(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    act_id int not null,
    intellectual_education int not null default 0,
    
    score1 int not null default 0,
    name1 varchar(50) not null default "学习态度",
    score2 int not null default 0,
    name2 varchar(50) not null default "创新精神",
    score3 int not null default 0,
    name3 varchar(50) not null default "学习成绩",
    
    
    score_type score_type varchar(10) not null default "000",
    upper_limit int not null default 20,
    PRIMARY KEY (id),
    CONSTRAINT `USER_ID2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
    CONSTRAINT `ACT_ID2` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`)
);
```

#### sports_edu 体育

```sql
create table sports_edu(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    act_id int not null,
    sports_education int not null default 0,
    
    score1 int not null default 0,
    name1 varchar(50) not null default "身体素质",
    score2 int not null default 0,
    name2 varchar(50) not null default "锻炼时间",
    
    score_type score_type varchar(10) not null default "000",
    upper_limit int not null default 20,
    PRIMARY KEY (id),
    CONSTRAINT `USER_ID3` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
    CONSTRAINT `ACT_ID3` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`)
);
```

#### aesthetic_edu 美育

```sql
create table aesthetic_edu(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    act_id int not null,
    aesthetic_education int not null default 0,
    
    score1 int not null default 0,
    name1 varchar(50) not null default "审美能力",
    score2 int not null default 0,
    name2 varchar(50) not null default "艺术能力",
    
    score_type varchar(10) not null default "000",
    upper_limit int not null default 20,
    PRIMARY KEY (id),
    CONSTRAINT `USER_ID4` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
    CONSTRAINT `ACT_ID4` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`)
);
```

#### labor_edu 劳育

```sql
create table labor_edu(
    id int not null AUTO_INCREMENT,
    user_id int not null,
    act_id int not null,
    labor_education int not null default 0,
    
    score1 int not null default 0,
    name1 varchar(50) not null default "劳动态度",
    score2 int not null default 0,
    name2 varchar(50) not null default "劳动实践",
    

    score_type varchar(10) not null default "000",
    upper_limit int not null default 20,
    PRIMARY KEY (id),
    CONSTRAINT `USER_ID5` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`),
    CONSTRAINT `ACT_ID5` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`)
);
```

### 部门管理两张表

#### depart_man 部门表

```sql
create table depart_man(
    id int not null AUTO_INCREMENT,
    department varchar(50) not null,
    PRIMARY KEY (id)
);
```

#### collage_man 二级学院表

```sql
create table collage_man(
    id int not null AUTO_INCREMENT,
    depart_id int not null,
    collage varchar(50) not null,
    PRIMARY KEY (id),
    CONSTRAINT `DEPART_ID` FOREIGN KEY (`depart_id`) REFERENCES `depart_man` (`id`)
);
```

