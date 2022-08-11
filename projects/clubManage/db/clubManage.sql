-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: clubManage
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `activity_table`
--

DROP TABLE IF EXISTS `activity_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `activity_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `initiator` varchar(50) NOT NULL,
  `thedescribe` varchar(200) NOT NULL,
  `starttime` datetime NOT NULL,
  `endtime` datetime NOT NULL,
  `place` varchar(50) NOT NULL,
  `maxnum` varchar(20) NOT NULL,
  `state` varchar(20) NOT NULL DEFAULT '申报中',
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `activity_table`
--

LOCK TABLES `activity_table` WRITE;
/*!40000 ALTER TABLE `activity_table` DISABLE KEYS */;
INSERT INTO `activity_table` VALUES (1,'test_name','test_type','test_initiator','test_thedescribe','2022-01-01 00:00:00','2023-01-01 00:00:00','test_place','test_maxnum','审核通过','2022-01-27 12:12:34'),(2,'test_name2','test_type2','test_initiator2','test_thedescribe2','2022-01-01 00:00:01','2023-01-01 00:00:01','test_place2','test_maxnum2','审核通过','2022-01-27 12:12:45'),(3,'团课','思政教育','李四','帮助大家树立正确的思想观念','2022-01-01 00:00:01','2023-01-01 00:00:01','东九楼D102','50','审核通过','2022-02-08 11:43:57'),(4,'退役军人宣讲','国防教育','李四','特地请了自愿参军的退役学长过来宣讲','2022-01-01 00:00:02','2023-01-01 00:00:02','东十二F101','200','审核通过','2022-02-08 11:43:59'),(5,'安全教育主题团课','安全教育','李四','强化大家的安全意识，共建安全校园','2022-01-02 00:00:00','2022-02-02 00:00:00','东九楼D504','50','审核未通过','2022-02-08 11:44:01'),(6,'敬老院看望老人','志愿服务','李四','敬老院看望老人，给老人带来一份温暖','2022-01-23 00:07:40','2022-02-02 00:00:00','洪山区敬老院','100','申报中','2022-01-22 16:07:59'),(7,'电信学院篮球赛','体育活动','李四','举办一年一度的电信学院篮球赛','2022-01-17 00:00:00','2022-01-29 00:00:00','韵苑体育馆','200','申报中','2022-01-23 07:48:23');
/*!40000 ALTER TABLE `activity_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aesthetic_edu`
--

DROP TABLE IF EXISTS `aesthetic_edu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aesthetic_edu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  `aesthetic_education` int NOT NULL DEFAULT '0',
  `score1` int NOT NULL DEFAULT '0',
  `name1` varchar(50) NOT NULL DEFAULT '审美能力',
  `score2` int NOT NULL DEFAULT '0',
  `name2` varchar(50) NOT NULL DEFAULT '艺术能力',
  `score_type` int NOT NULL DEFAULT '111',
  `upper_limit` int NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `USER_ID4` (`user_id`),
  KEY `ACT_ID4` (`act_id`),
  CONSTRAINT `ACT_ID4` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `USER_ID4` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aesthetic_edu`
--

LOCK TABLES `aesthetic_edu` WRITE;
/*!40000 ALTER TABLE `aesthetic_edu` DISABLE KEYS */;
INSERT INTO `aesthetic_edu` VALUES (1,2,3,2,1,'审美能力',1,'艺术能力',111,20),(2,5,4,6,3,'审美能力',3,'艺术能力',111,20);
/*!40000 ALTER TABLE `aesthetic_edu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appeal_table`
--

DROP TABLE IF EXISTS `appeal_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appeal_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `act_id` int NOT NULL,
  `act_name` varchar(50) NOT NULL,
  `act_type` varchar(50) NOT NULL,
  `user_id` int NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `reason` varchar(300) NOT NULL,
  `state` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appeal_table`
--

LOCK TABLES `appeal_table` WRITE;
/*!40000 ALTER TABLE `appeal_table` DISABLE KEYS */;
INSERT INTO `appeal_table` VALUES (2,4,'退役军人宣讲','国防教育',5,'李四','2022-02-08 11:01:58','对自己的思政得分有统计错误的怀疑','通过'),(3,1,'test_name','test_type',5,'李四','2022-02-08 11:28:57','test','驳回');
/*!40000 ALTER TABLE `appeal_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collage_man`
--

DROP TABLE IF EXISTS `collage_man`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collage_man` (
  `id` int NOT NULL AUTO_INCREMENT,
  `depart_id` int NOT NULL,
  `collage` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `DEPART_ID` (`depart_id`),
  CONSTRAINT `DEPART_ID` FOREIGN KEY (`depart_id`) REFERENCES `depart_man` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collage_man`
--

LOCK TABLES `collage_man` WRITE;
/*!40000 ALTER TABLE `collage_man` DISABLE KEYS */;
INSERT INTO `collage_man` VALUES (1,1,'电子信息与通信学院'),(3,1,'管理学院'),(4,3,'光电研究中心');
/*!40000 ALTER TABLE `collage_man` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `depart_man`
--

DROP TABLE IF EXISTS `depart_man`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depart_man` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depart_man`
--

LOCK TABLES `depart_man` WRITE;
/*!40000 ALTER TABLE `depart_man` DISABLE KEYS */;
INSERT INTO `depart_man` VALUES (1,'本科生部门'),(3,'博士生部门'),(4,'研究生部门');
/*!40000 ALTER TABLE `depart_man` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `intellectual_edu`
--

DROP TABLE IF EXISTS `intellectual_edu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `intellectual_edu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  `intellectual_education` int NOT NULL DEFAULT '0',
  `score1` int NOT NULL DEFAULT '0',
  `name1` varchar(50) NOT NULL DEFAULT '学习态度',
  `score2` int NOT NULL DEFAULT '0',
  `name2` varchar(50) NOT NULL DEFAULT '创新精神',
  `score3` int NOT NULL DEFAULT '0',
  `name3` varchar(50) NOT NULL DEFAULT '学习成绩',
  `score_type` varchar(10) NOT NULL DEFAULT '100',
  `upper_limit` int NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `USER_ID2` (`user_id`),
  KEY `ACT_ID2` (`act_id`),
  CONSTRAINT `ACT_ID2` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `USER_ID2` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `intellectual_edu`
--

LOCK TABLES `intellectual_edu` WRITE;
/*!40000 ALTER TABLE `intellectual_edu` DISABLE KEYS */;
INSERT INTO `intellectual_edu` VALUES (4,2,3,9,3,'学习态度',3,'创新精神',3,'学习成绩','100',20),(5,4,3,9,3,'学习态度',3,'创新精神',3,'学习成绩','100',20);
/*!40000 ALTER TABLE `intellectual_edu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `labor_edu`
--

DROP TABLE IF EXISTS `labor_edu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `labor_edu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  `labor_education` int NOT NULL DEFAULT '0',
  `score1` int NOT NULL DEFAULT '0',
  `name1` varchar(50) NOT NULL DEFAULT '劳动态度',
  `score2` int NOT NULL DEFAULT '0',
  `name2` varchar(50) NOT NULL DEFAULT '劳动实践',
  `score_type` varchar(10) NOT NULL DEFAULT '000',
  `upper_limit` int NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `USER_ID5` (`user_id`),
  KEY `ACT_ID5` (`act_id`),
  CONSTRAINT `ACT_ID5` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `USER_ID5` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `labor_edu`
--

LOCK TABLES `labor_edu` WRITE;
/*!40000 ALTER TABLE `labor_edu` DISABLE KEYS */;
INSERT INTO `labor_edu` VALUES (1,2,3,6,3,'劳动态度',3,'劳动实践','000',20);
/*!40000 ALTER TABLE `labor_edu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moral_edu`
--

DROP TABLE IF EXISTS `moral_edu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moral_edu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  `moral_education` int NOT NULL DEFAULT '0',
  `score1` int NOT NULL DEFAULT '0',
  `name1` varchar(50) NOT NULL DEFAULT '政治态度',
  `score2` int NOT NULL DEFAULT '0',
  `name2` varchar(50) NOT NULL DEFAULT '爱国观念',
  `score3` int NOT NULL DEFAULT '0',
  `name3` varchar(50) NOT NULL DEFAULT '集体观念',
  `score_type` varchar(10) NOT NULL DEFAULT '120',
  `upper_limit` int NOT NULL DEFAULT '40',
  PRIMARY KEY (`id`),
  KEY `USER_ID` (`user_id`),
  KEY `ACT_ID` (`act_id`),
  CONSTRAINT `ACT_ID` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `USER_ID` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moral_edu`
--

LOCK TABLES `moral_edu` WRITE;
/*!40000 ALTER TABLE `moral_edu` DISABLE KEYS */;
INSERT INTO `moral_edu` VALUES (13,2,3,9,3,'政治态度',3,'爱国观念',3,'集体观念','120',20),(14,4,3,9,1,'政治态度',5,'爱国观念',3,'集体观念','120',20),(15,5,3,5,2,'政治态度',1,'爱国观念',2,'集体观念','120',20),(16,4,4,9,3,'政治态度',3,'爱国观念',3,'集体观念','120',20),(17,5,4,13,3,'政治态度',5,'爱国观念',5,'集体观念','120',20);
/*!40000 ALTER TABLE `moral_edu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sports_edu`
--

DROP TABLE IF EXISTS `sports_edu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sports_edu` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  `sports_education` int NOT NULL DEFAULT '0',
  `score1` int NOT NULL DEFAULT '0',
  `name1` varchar(50) NOT NULL DEFAULT '身体素质',
  `score2` int NOT NULL DEFAULT '0',
  `name2` varchar(50) NOT NULL DEFAULT '锻炼时间',
  `score_type` varchar(10) NOT NULL DEFAULT '000',
  `upper_limit` int NOT NULL DEFAULT '20',
  PRIMARY KEY (`id`),
  KEY `USER_ID3` (`user_id`),
  KEY `ACT_ID3` (`act_id`),
  CONSTRAINT `ACT_ID3` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `USER_ID3` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sports_edu`
--

LOCK TABLES `sports_edu` WRITE;
/*!40000 ALTER TABLE `sports_edu` DISABLE KEYS */;
INSERT INTO `sports_edu` VALUES (1,2,3,7,2,'身体素质',5,'锻炼时间','000',20),(2,5,4,7,2,'身体素质',5,'锻炼时间','000',20);
/*!40000 ALTER TABLE `sports_edu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `user_act_score1_view`
--

DROP TABLE IF EXISTS `user_act_score1_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_score1_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_score1_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`,
 1 AS `moral_education`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_act_score2_view`
--

DROP TABLE IF EXISTS `user_act_score2_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_score2_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_score2_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`,
 1 AS `moral_education`,
 1 AS `intellectual_education`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_act_score3_view`
--

DROP TABLE IF EXISTS `user_act_score3_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_score3_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_score3_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`,
 1 AS `moral_education`,
 1 AS `intellectual_education`,
 1 AS `sports_education`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_act_score4_view`
--

DROP TABLE IF EXISTS `user_act_score4_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_score4_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_score4_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`,
 1 AS `moral_education`,
 1 AS `intellectual_education`,
 1 AS `sports_education`,
 1 AS `aesthetic_education`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_act_score5_view`
--

DROP TABLE IF EXISTS `user_act_score5_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_score5_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_score5_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`,
 1 AS `moral_education`,
 1 AS `intellectual_education`,
 1 AS `sports_education`,
 1 AS `aesthetic_education`,
 1 AS `labor_education`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `user_act_view`
--

DROP TABLE IF EXISTS `user_act_view`;
/*!50001 DROP VIEW IF EXISTS `user_act_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `user_act_view` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `studentid`,
 1 AS `act_id`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `user_ref_act`
--

DROP TABLE IF EXISTS `user_ref_act`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_ref_act` (
  `user_id` int NOT NULL,
  `act_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`act_id`),
  KEY `FK_ACTIVITY` (`act_id`),
  CONSTRAINT `FK_ACTIVITY` FOREIGN KEY (`act_id`) REFERENCES `activity_table` (`id`),
  CONSTRAINT `FK_USER` FOREIGN KEY (`user_id`) REFERENCES `user_table` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_ref_act`
--

LOCK TABLES `user_ref_act` WRITE;
/*!40000 ALTER TABLE `user_ref_act` DISABLE KEYS */;
INSERT INTO `user_ref_act` VALUES (1,1),(4,1),(5,1),(5,2),(2,3),(4,3),(5,3),(4,4),(5,4),(2,5),(4,5),(5,5),(5,7);
/*!40000 ALTER TABLE `user_ref_act` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_table`
--

DROP TABLE IF EXISTS `user_table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_table` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `faculty` varchar(50) NOT NULL,
  `classroom` varchar(50) NOT NULL,
  `studentid` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `identity` varchar(50) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `depart_man_id` int NOT NULL DEFAULT '0',
  `collage_man_id` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_table`
--

LOCK TABLES `user_table` WRITE;
/*!40000 ALTER TABLE `user_table` DISABLE KEYS */;
INSERT INTO `user_table` VALUES (1,'test3','test','test3','test','test','test','2022-02-08 11:43:41',0,0),(2,'test','test','test','test','test','test','2022-02-08 11:43:41',0,0),(4,'张三','电子信息与通信学院','电磁2004班','U202013009','$2b$10$47XUhdkizQFXGKHAswfdm.1S76By3w0ZXcOkcD8HsY6pdWRjzlTY2','普通学生','2022-02-08 11:43:43',0,0),(5,'李四','电子信息与通信学院','通信1810班','U201813801','$2b$10$xr4u3b0u/fFb9IuhrF.FPO4gfzyYPWYFG1jouG0C34t5zLHsbwLjW','部门管理员','2022-02-08 11:50:28',0,0);
/*!40000 ALTER TABLE `user_table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `user_act_score1_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_score1_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_score1_view` AS select `user_act_view`.`id` AS `id`,`user_act_view`.`name` AS `name`,`user_act_view`.`studentid` AS `studentid`,`user_act_view`.`act_id` AS `act_id`,`moral_edu`.`moral_education` AS `moral_education` from (`user_act_view` left join `moral_edu` on(((`user_act_view`.`act_id` = `moral_edu`.`act_id`) and (`user_act_view`.`id` = `moral_edu`.`user_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_act_score2_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_score2_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_score2_view` AS select `user_act_score1_view`.`id` AS `id`,`user_act_score1_view`.`name` AS `name`,`user_act_score1_view`.`studentid` AS `studentid`,`user_act_score1_view`.`act_id` AS `act_id`,`user_act_score1_view`.`moral_education` AS `moral_education`,`intellectual_edu`.`intellectual_education` AS `intellectual_education` from (`user_act_score1_view` left join `intellectual_edu` on(((`user_act_score1_view`.`act_id` = `intellectual_edu`.`act_id`) and (`user_act_score1_view`.`id` = `intellectual_edu`.`user_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_act_score3_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_score3_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_score3_view` AS select `user_act_score2_view`.`id` AS `id`,`user_act_score2_view`.`name` AS `name`,`user_act_score2_view`.`studentid` AS `studentid`,`user_act_score2_view`.`act_id` AS `act_id`,`user_act_score2_view`.`moral_education` AS `moral_education`,`user_act_score2_view`.`intellectual_education` AS `intellectual_education`,`sports_edu`.`sports_education` AS `sports_education` from (`user_act_score2_view` left join `sports_edu` on(((`user_act_score2_view`.`act_id` = `sports_edu`.`act_id`) and (`user_act_score2_view`.`id` = `sports_edu`.`user_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_act_score4_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_score4_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_score4_view` AS select `user_act_score3_view`.`id` AS `id`,`user_act_score3_view`.`name` AS `name`,`user_act_score3_view`.`studentid` AS `studentid`,`user_act_score3_view`.`act_id` AS `act_id`,`user_act_score3_view`.`moral_education` AS `moral_education`,`user_act_score3_view`.`intellectual_education` AS `intellectual_education`,`user_act_score3_view`.`sports_education` AS `sports_education`,`aesthetic_edu`.`aesthetic_education` AS `aesthetic_education` from (`user_act_score3_view` left join `aesthetic_edu` on(((`user_act_score3_view`.`act_id` = `aesthetic_edu`.`act_id`) and (`user_act_score3_view`.`id` = `aesthetic_edu`.`user_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_act_score5_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_score5_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_score5_view` AS select `user_act_score4_view`.`id` AS `id`,`user_act_score4_view`.`name` AS `name`,`user_act_score4_view`.`studentid` AS `studentid`,`user_act_score4_view`.`act_id` AS `act_id`,`user_act_score4_view`.`moral_education` AS `moral_education`,`user_act_score4_view`.`intellectual_education` AS `intellectual_education`,`user_act_score4_view`.`sports_education` AS `sports_education`,`user_act_score4_view`.`aesthetic_education` AS `aesthetic_education`,`labor_edu`.`labor_education` AS `labor_education` from (`user_act_score4_view` left join `labor_edu` on(((`user_act_score4_view`.`act_id` = `labor_edu`.`act_id`) and (`user_act_score4_view`.`id` = `labor_edu`.`user_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `user_act_view`
--

/*!50001 DROP VIEW IF EXISTS `user_act_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `user_act_view` AS select `user_table`.`id` AS `id`,`user_table`.`name` AS `name`,`user_table`.`studentid` AS `studentid`,`user_ref_act`.`act_id` AS `act_id` from ((`user_table` join `activity_table`) join `user_ref_act` on(((`user_table`.`id` = `user_ref_act`.`user_id`) and (`activity_table`.`id` = `user_ref_act`.`act_id`)))) */
/*!50002 WITH CASCADED CHECK OPTION */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-08 20:18:44
