# fundMamage 全栈vue+node.js项目

## usertable

```sql
create table usertable(
	id int not null AUTO_INCREMENT,
    name  varchar(50) not null,
    password varchar(100) not null,
    email varchar(100) not null,
    avatar varchar(100),
    identify varchar(50) not null,
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

insert into usertable(name,password,email,avatar,identify) VALUES('test','test','test','test','test');
```

## profiletable

```sql
create table profiletable(
	id int not null AUTO_INCREMENT,
    userid int not null,
    type varchar(50) not null,
    mydescribe varchar(100) not null,
    income varchar(50) not null,
    expend varchar(50) not null,
    cash varchar(50) not null,
    remark varchar(100) not null,
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY(userid) REFERENCES usertable(id)
);

insert into profiletable(userid,type,mydescribe,income,expend,cash,remark) values(1,"test","test","test","test","test","test");

update profiletable set type='test2',mydescribe='test2',income='test2',expend='test2',cash='test2',remark='test2' where id=1;

delete from profiletable where id=1;
```





## api

### register

```json
{
    "name":"test",
    "password":"test",
    "email":"test",
    "avatar":"test",
    "identify":"test"
}
```

