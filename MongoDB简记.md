# MongoDB简记

##  常见命令

```shell
$ mongo # 连接数据库
$ mongo://username:password@localhost/test # 以用户名和密码形式连接到指定数据库 
$ show dbs # 显示所有数据库 
$ db # 显示当前数据库
$ use runoob # 使用runoob数据库
$ runoob.insert({"name":"菜鸟教程"}) # 向runoob数据库中插入数据
$ db.dropDatabase() # 删除数据库


$ db.createCollection() # 创建集合
$ db.collection.drop() # 删除集合
$ show tables/show collections # 查看所有的集合
## 
> db.createCollection("mycol", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } )
$ db.test1.insert({"name":"runoob"}) # 向指定的集合插入数据
$ db.test1.insertOne({"name":"runoob"}) # 向指定的集合插入一条数据
$ db.test1.insertMany([{"a":1},{"b":2}]) # 插入多条


$ db.collection.update(<query>,<update>) # 更新文档
##
> db.test1.update({"title":"MongoDB"},{$set:{"title":"Mongo"}},{multi:true})
$ db.collection.save(<document>) # 更新文档
##
> db.test1.save({
	"_id":ObjectId("620ce0394797e1dd4ba7bf0e"),
	"title":"Runoob test"
})


$ db.test1.deleteOne(<query>,{justOne:<boolean>,writeConcern:<document>}) #移除文档
$ db.test1.deleteMany() # 同上


$ db.collection.find(query,projection) 
$ db.find().pretty() # 更好的形式显示
$ db.collection.find({key1:value1,key2:value2}).pretty() # AND查询
$ db.colection.find($or:[{key1:value1},{key2:value2}]).pretty() # OR查询
$ db.collection.find({title:{$gt:100}}) # 数字的条件查询
$ db.collection.find({title:{$type:2}}) # $type查询
$ db.collection.find({title:{$type:"string"}}) # $type查询
$ db.collection.find().limit(NUMBER) # limit查询 NUMER表示数量
$ db.collection.find().limit(NUMBER).skip(NUMER) # limit查询  skip()方法来跳过指定数量的数据 NUMER表示数量
$ db.collection.find().sort({KEY:1}) # 排序查询 1表示升序，-1表示降序


$ db.collection.createIndex(keys.options)	
## 
> db.col.createIndex({"title":1,"description":-1})
$ db.col.getIndexes() # 查看集合索引
$ db.col.dropIndexes() # 删除所有的索引
$ db.col.dropIndex(<name>) # 删除指定索引


$ db.col.aggregate(AGGREGATE_OPERATION) # 聚合查询
##
> db.test1.aggregate([{$group:{_id:"$by_user",num_total:{$sum:1}}}])
```





