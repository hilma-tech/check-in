-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: checkin
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order` int NOT NULL,
  `gameId` int DEFAULT NULL,
  `field_name` varchar(50) NOT NULL,
  `default_value` varchar(150) NOT NULL,
  `type` enum('text','choice','image','multi-choice') NOT NULL DEFAULT 'text',
  PRIMARY KEY (`id`),
  KEY `FK_3eba8e668001b7e4313de7d0fc5` (`gameId`),
  CONSTRAINT `FK_3eba8e668001b7e4313de7d0fc5` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,0,69,'הי','[{\"id\":0,\"value\":\"הי\"}]','text'),(2,0,70,'משעמם לי','[{\"id\":0,\"value\":\"לא להתיחס\"}]','text'),(3,0,71,'שמים','[{\"id\":0,\"value\":\"כחולים\"}]','text'),(4,0,72,'שדה 1','[{\"id\":0,\"value\":\"טקסט\"}]','text'),(5,0,73,'לה לה לה','[{\"id\":0,\"value\":\"למההההה\"}]','text'),(6,0,74,'אין שדא','[{\"id\":0,\"value\":\"לא רוצים שדות\"}]','text'),(7,1,74,'צריך לנסות גם את זה','[{\"id\":\"0\",\"value\":\"אז מנסים\"},null,null,{\"id\":\"3\",\"value\":\"ומנסים\"},null,{\"id\":\"5\",\"value\":\"בתקווה שיעבוד\"}]','text'),(8,0,75,'כוי','[{\"id\":0,\"value\":\"צךלסגהןכ\"}]','text'),(9,0,76,'בקשה','[{\"id\":0,\"value\":\"בבקשה שהדבר הזה יעבוד\"}]','text'),(10,0,77,'יאגא','[{\"id\":0,\"value\":\"לסככר\"}]','text'),(11,0,78,'ננננננננ','[{\"id\":0,\"value\":\"צצצצצצצצצצצצצ\"}]','text'),(12,0,79,'דגק','[{\"id\":0,\"value\":\"גק\'גק\"}]','text'),(13,0,80,'כקכק','[{\"id\":0,\"value\":\"גקרכ\"}]','text'),(14,0,81,'חמחמח','[{\"id\":0,\"value\":\"חמחוי\"}]','text'),(15,0,82,'בגדש','[{\"id\":0,\"value\":\"סגד\"}]','text'),(16,0,83,'גקב','[{\"id\":0,\"value\":\"ק\'גקב\"}]','text'),(17,0,84,'בבקשהההההההההה','[{\"id\":0,\"value\":\"אין לי כבר כוחות\"}]','text'),(18,0,89,'       ','[{\"value\":\"     \"}]','text'),(19,0,91,'גמקחג','[\"צגלןחגןרק\"]','text'),(20,0,92,'ההההההההההה','[\"blob:http://localhost:3000/ac5be22a-176e-4709-9037-811d8954a548\"]','image'),(21,0,93,'ש','[\"blob:http://localhost:3000/897f693b-0ac4-4e8e-8bab-ca2d00608d02\"]','image'),(22,0,94,'ג','[\"blob:http://localhost:3000/d136712a-61b4-4bd0-a89c-a033b948a7f7\"]','image'),(23,0,95,'א','[\"blob:http://localhost:3000/0de2180e-fd37-4b80-8f2e-a8b81e5c1ee2\"]','image'),(24,0,96,'ס','[\"blob:http://localhost:3000/eaa6bd15-d977-4088-a080-335fdd120c0f\"]','image'),(25,0,97,'ט','[\"blob:http://localhost:3000/6e6700a6-8947-4080-ba5e-e4e088ca91d1\"]','image'),(26,0,98,'מ','[\"blob:http://localhost:3000/9db3e456-b0e9-44b7-8697-13c5259d9fb8\"]','image'),(27,0,99,'ה','[\"blob:http://localhost:3000/c7559f88-2789-4e6b-b96b-168dd50c7600\"]','image'),(28,0,100,'ר','[\"blob:http://localhost:3000/43392230-e445-4ecb-badc-2c549476d970\"]','image'),(29,0,101,'ת','[\"blob:http://localhost:3000/a0cc4f31-c57e-4f7d-9922-18b5f445ac12\"]','image'),(30,0,102,'ב','[{\"id\":0,\"value\":\"blob:http://localhost:3000/5b84ed97-0cea-4ca6-8593-75b77e129a48\"}]','image'),(31,1,102,'בב','[{\"id\":2,\"value\":\"blob:http://localhost:3000/f8bc1192-08cb-4a43-a1e4-a39870c72645\"}]','image'),(32,0,103,'מ','[{\"id\":1,\"value\":\"blob:http://localhost:3000/49913587-5a28-44d9-a335-f44a59b3ec67\"}]','image'),(33,1,103,'ממ','[{\"id\":2,\"value\":\"blob:http://localhost:3000/0a8eea7c-fca4-41fb-8579-1d4d2eb2ac44\"}]','image'),(34,0,106,'ך','[{\"id\":1,\"value\":\"blob:http://localhost:3000/f34a056f-d2cd-43a9-848d-960e3b7781a1\"}]','image'),(35,0,107,'בגךככ','[{\"id\":0,\"value\":\"/image/7iSmVJybLL9hbwQOmrVu1KGru07JsDbn.png\"}]','image'),(36,0,108,'בג','[{\"id\":0,\"value\":\"/image/hzh03wNN2S2D2z6x6kBL8ePMKuBU1IiC.png\"}]','image'),(37,1,108,'בגד','[{\"id\":0,\"value\":\"בסגד\"}]','text'),(38,0,109,'צולצלח','[{\"id\":0,\"value\":\"צול\"}]','text'),(39,1,109,'צלחע','[{\"id\":1,\"value\":\"/image/9yv1R8dGt3YD4OQRpZYLyfcLsVtPsnGd.png\"}]','image'),(40,0,110,'טקסט','[{\"id\":0,\"value\":\"הההה\"}]','text'),(41,1,110,'תמונה','[{\"id\":1,\"value\":\"/image/jdnlqaEinGm5kV63rvnwB8E5Oeo475wL.png\"}]','image'),(42,2,110,'בחירה','[{\"id\":\"0\",\"value\":\"ז\"},{\"id\":\"1\",\"value\":\"ב\"},{\"id\":\"2\",\"value\":\"ס\"},{\"id\":\"3\",\"value\":\"ה\"},{\"id\":\"4\",\"value\":\"מ\"},{\"id\":\"5\",\"value\":\"נ\"}]','choice'),(43,3,110,'בחירה מרובה','[{\"id\":\"0\",\"value\":\"ל\"},{\"id\":\"1\",\"value\":\"ח\"},{\"id\":\"2\",\"value\":\"י\"},{\"id\":\"3\",\"value\":\"ע\"},{\"id\":\"4\",\"value\":\"כ\"},{\"id\":\"5\",\"value\":\"ג\"}]','multi-choice'),(44,0,111,'בדיקה טקסט','הההההה','text'),(45,1,111,'בדיקה תמונה','/image/4o8UlVx8cQ6jFpHkLi0aQWBzxLnWoWux.png','image'),(46,2,111,'בדיקה בחירה','[\"יח\",\"ביע\",\"יעמ\",\"עכני\",\"גסנ\",\"בהכ\"]','choice'),(47,3,111,'בדיקה בחירה מרובה','[\"ע\",\"כע\",\"עכ\",\"גכהע\",\"נע\",\"נעה\"]','multi-choice');
/*!40000 ALTER TABLE `field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `file_permission`
--

DROP TABLE IF EXISTS `file_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `file_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` varchar(60) NOT NULL,
  `permission_type` enum('role','user') NOT NULL,
  `role_name` varchar(30) DEFAULT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `permission` enum('allow','deny') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `file_permission`
--

LOCK TABLES `file_permission` WRITE;
/*!40000 ALTER TABLE `file_permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `file_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `requirements` varchar(255) NOT NULL,
  `game_name` varchar(50) NOT NULL,
  `image` varchar(1000) NOT NULL DEFAULT 'blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=112 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (69,'חלח','לחל','הי הי','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(70,'היוש בת ציון','מה שלמך??','שלום','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(71,'למה יש ואלידציה????????','אין לי כוח למלא א כל השדות','עננים','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(72,'תיאור','דרישות','עוד משחק','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(73,'בלון אדום בלון לבן','בלון גדול בלון קטן','בלונים','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(74,'צריך לראות שזה עובד\nאז צריך לרשום דברים\nגם אם הם מאוד לא מעניינים\nכאילו מאוד מאודדדדד לא מעניינים','מה קורה?','מסר לאומה','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(75,'להלהלה','להלהלה','ניסיון תמונה','blob:http://localhost:3000/8e4f6604-fef9-4190-bdd3-3628c7bc572c',_binary '\0'),(76,'לשמור משחק עם תמונה','מקווה שהנסיון יעבוד','נסיון','blob:http://localhost:3000/f9078d30-da8c-4826-96e0-da6b38af21dc',_binary '\0'),(77,'            ','             ','נסיון 2','blob:http://localhost:3000/0f3485a2-a8e5-4437-b8d6-f3c2d86e62b1',_binary '\0'),(78,'יש מקרה קצה של רק רווחים','צריך לתקן','נסיון 3','blob:http://localhost:3000/3932e0c5-a25c-4c85-9c44-d9089b930cc7',_binary '\0'),(79,'גשדוכ','צגלח\'שמ','נמאס מנסיונות','blob:http://localhost:3000/a88d3d74-4134-4a43-b002-973e70e87653',_binary '\0'),(80,'/\'גדק\'גק\'','גק\'ג','גססססס','blob:http://localhost:3000/a2325a6e-e019-4af0-9ea0-30227ae65847',_binary '\0'),(81,'מחח','חטאג','מחמח','blob:http://localhost:3000/65583a37-0bf4-46e6-8112-ca4b9ccc6c5c',_binary '\0'),(82,'גב','בסגב','עננים2','blob:http://localhost:3000/f159fc8f-5335-415b-99b3-c15bc8e94c91',_binary '\0'),(83,'ק\'ג','גק','         קג','blob:http://localhost:3000/81b84c68-d0e5-4105-8fb0-b170584d2f82',_binary '\0'),(84,'בבקשה תכניס תמונה ותשמור','ממש בבקשה','נסיון  ','/image/PgMz3VmVfEzHdh5WnOjiEaFb3IiNmy8U.png',_binary '\0'),(85,'מה','מה','מה','/image/cndLnZxf1JDxLCDtzVJuXcRri3oMSXk3.png',_binary '\0'),(86,'תיאור','דרישות','נסיוןנסיון','/image/Ogxnfo88lcZWvTPf6avoJN27RdhxlZrM.jpg',_binary '\0'),(87,'רק רוצה לוודא שהראוט עובד','בו נראה','אני לא יודעת','/image/gOauPXAqYf91oamD7khxjNagwxoiXafg.png',_binary '\0'),(88,'בלגמ','בגדלל','חגלק','/image/zabPtHY3Hqu7gedfml3oicrm6ypHbfEn.png',_binary '\0'),(89,'    ','    ','     ','/image/U6ZPZxtT4KKlxgjSCQNbmtiY5pIcu65b.png',_binary '\0'),(90,' בגתצד','צדגל','גסחד','/image/vJJ98L1nqygl2Rv9CVvaAP59j7Va2hoc.png',_binary '\0'),(91,'גצלקחר','צגלח','צגלחרקח','/image/P93Z5OGTONSMBAfKQbQaqpMmxykxsQJX.png',_binary '\0'),(92,'בח\'למל','בצלגמבלק','צסגל','/image/HOKuq0zWIEsKwDzN3MJuYyDzRL9xiPCR.png',_binary '\0'),(93,'ש','ש','ש','/image/qT2L6Fcu5KVbqVY8m6mro5VFJ4TjvLqf.png',_binary '\0'),(94,'ג','ג','ג','/image/td0l3fuB8M77hy4ITYwMhCBz2hmaz310.png',_binary '\0'),(95,'א','א','א','/image/DlX4iA1Q5tsw71S5V2tzvqgSaUFGLFf6.png',_binary '\0'),(96,'ס','ס','ס','/image/49yfijc0Xq4khiBpA85dme6Ntmt7iRCy.png',_binary '\0'),(97,'ט','ט','ט','/image/kEsutcy1Yb6NH5H9DvBLISpAy5gtDXJT.png',_binary '\0'),(98,'ך','ך','ך','/image/7lLRCHcC7uef3zcXYpntgAu1vVvxqMXK.png',_binary '\0'),(99,'ה','ה','ה','/image/TVHpUmWIcHk1jPPyPUGSEzeKxyhfvA7m.png',_binary '\0'),(100,'ר','ר','ר','/image/U2FAgeYRrK9QNfWeOVN8YPTaO6oVoode.png',_binary '\0'),(101,'ת','ת','ת','/image/Uv6Q8bYMRUffcx7d9Bz1GIsJfKOEZlYj.jpg',_binary '\0'),(102,'ב','ב','ב','/image/A9lSotv60DbOVNI0HBf2leHxXs6k1Ful.png',_binary '\0'),(103,'מ','מ','מה מצב','/image/N4s21w0zWgNuF5aKRyFCdR5L5aljDuJ6.png',_binary '\0'),(106,'ך','ך','צבךלקחשבןגחדשבןגן','/image/YCSycKAHpiCuPuHKeCMcIYvs2f7zHTSx.png',_binary '\0'),(107,'בלג','בךגל','תכבךקד','/image/Z7INtNyjJ9OiRQtYoVdV3BuLv0Ob10kW.png',_binary '\0'),(108,'צ בלגד','בלגד',' מסזג','/image/R5KIQbvu0F7Tfm4kQlzhdsagpUVlRy3f.png',_binary '\0'),(109,'צלואצ','צולאצ','כרקמוצח','/image/qPVLdzY4hMbQR5lr6K0AqrJMSyFefonQ.png',_binary '\0'),(110,'אין תיאור','אין דרישות','משחק חדש','/image/L68WzZMp4hUor3bHXacJE3ZVARn1f4Cn.png',_binary '\0'),(111,'בדיקה','בדיקה','בדיקה','/image/XlTlXrmSp3wCYlFlHh0XKQY79D1iZuzX.png',_binary '\0');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `description` varchar(255) NOT NULL,
  `roleKey` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'superAdmin','Able to access and edit everything','cdkjsfisjcmkzds38cs');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `super_admin`
--

DROP TABLE IF EXISTS `super_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `super_admin` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_a27f030e660d4e72ce66bd5d0b` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `super_admin`
--

LOCK TABLES `super_admin` WRITE;
/*!40000 ALTER TABLE `super_admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `super_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` varchar(36) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('fe32893c-6b5d-4897-b795-c23173fae1a7','superadmin','$2b$10$usTRf13zMhBhrEr6Y38hKu.1pmOLnvBJ7DWTRfgtqF79H0GniiEL6','2020-11-24 09:47:14.855068','2020-11-24 09:47:14.855068','SuperAdmin');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_role`
--

DROP TABLE IF EXISTS `user_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_role` (
  `user_id` varchar(36) NOT NULL,
  `role_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `IDX_d0e5815877f7395a198a4cb0a4` (`user_id`),
  KEY `IDX_32a6fc2fcb019d8e3a8ace0f55` (`role_id`),
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_role`
--

LOCK TABLES `user_role` WRITE;
/*!40000 ALTER TABLE `user_role` DISABLE KEYS */;
INSERT INTO `user_role` VALUES ('fe32893c-6b5d-4897-b795-c23173fae1a7',1);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-11-29 12:38:26
