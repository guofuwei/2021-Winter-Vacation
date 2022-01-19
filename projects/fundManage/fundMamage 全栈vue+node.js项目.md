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







```vue
<template>
  <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%">
    <el-table-column prop="date" label="日期" width="250"> </el-table-column>
    <el-table-column prop="type" label="收支类型" width="150"></el-table-column>
    <el-table-column
      prop="mydescribe"
      label="收支描述"
      width="180"
    ></el-table-column>
    <el-table-column prop="income" label="收入" width="170"> </el-table-column>
    <el-table-column prop="expend" label="支出" width="170"> </el-table-column>

    <el-table-column
      prop="cash"
      label="账户现金"
      align="center"
      width="170"
    ></el-table-column>
    <el-table-column prop="remark" label="备注" align="center" width="220">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "fundList",
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      // 获取表格数据
      this.$axios
        .get("/api/profile/")
        .then((res) => {
          //   console.log(res);
          this.tableData = res.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style scoped>
.fillcontain {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btnRight {
  float: right;
}
.pagination {
  text-align: right;
  margin-top: 10px;
}
</style>
```

