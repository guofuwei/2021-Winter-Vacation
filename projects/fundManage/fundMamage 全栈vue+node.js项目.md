# fundMamage 全栈vue+node.js项目

## userTable

```sql
create table usertable(
	id int not null AUTO_INCREMENT,
    name  varchar(50) not null,
    password varchar(100) not null,
    email varchar(100) not null,
    avatar varchar(100) not null,
    identify varchar(50) not null,
    date timestamp not null DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

insert into usertable(name,password,email,avatar,identify) VALUES('test','test','test','test','test');
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

