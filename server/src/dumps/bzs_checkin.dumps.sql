-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: checkin
-- ------------------------------------------------------
-- Server version	8.0.23-0ubuntu0.20.04.1

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
-- Table structure for table `access_logger`
--

DROP TABLE IF EXISTS `access_logger`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `access_logger` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL,
  `success` tinyint NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_592498efcc7b3c679d433037b1d` (`userId`),
  CONSTRAINT `FK_592498efcc7b3c679d433037b1d` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `access_logger`
--

LOCK TABLES `access_logger` WRITE;
/*!40000 ALTER TABLE `access_logger` DISABLE KEYS */;
/*!40000 ALTER TABLE `access_logger` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom`
--

DROP TABLE IF EXISTS `classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `school_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'א\'1',1),(2,'ב\'3',1),(3,'ה\'2',1),(4,'ב\'1',1),(12,'ג\'4',1),(13,'ד\'2',1),(14,'ה\'1',1),(15,'ו\'3',1),(16,'ז\'2',1),(17,'ח\'1',1),(18,'ט\'3',1),(19,'י\'2',1),(20,'י\'1',1),(21,'א\'3',1),(22,'ב\'4',1),(23,'ה\'7',1),(24,'ו\'5',1),(25,'ג\'2',31);
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_field`
--

DROP TABLE IF EXISTS `classroom_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `new_value` varchar(255) NOT NULL,
  `game_id` int DEFAULT NULL,
  `classroom_id` int DEFAULT NULL,
  `field_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f7031ca819f3f79983273dd25cf` (`game_id`),
  KEY `FK_ef6001153b3d1baf00d4307607c` (`classroom_id`),
  KEY `FK_28211bf7506a8fd301f86988bb2` (`field_id`),
  CONSTRAINT `FK_28211bf7506a8fd301f86988bb2` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`),
  CONSTRAINT `FK_ef6001153b3d1baf00d4307607c` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`),
  CONSTRAINT `FK_f7031ca819f3f79983273dd25cf` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_field`
--

LOCK TABLES `classroom_field` WRITE;
/*!40000 ALTER TABLE `classroom_field` DISABLE KEYS */;
INSERT INTO `classroom_field` VALUES (40,'[\"בעצים\",\"בנט\",\"לפיד\",\"סער\"]',22,3,2),(41,'עצים',22,3,1),(42,'/image/F2OnEYAF0TGoDYEy8FXvIRnc3uuswrMb.jpg',22,3,3),(78,'כעדגעד',22,1,1),(79,'[\"ביבי\",\"בנט\",\"לפיד\",\"סער\"]',22,1,2),(80,'/image/sCcbMPZ6CCTNBRvjFANkMtcZANlsdcpv.jpg',22,1,3),(90,'/image/nIn5gbx3gQ4EPRRpj8P4bj0gaJ4a5NFd.png',36,1,21),(99,'/image/fpmYHLEwRVeumEYb23E3ZNyCrFnA9xgU.jpg',33,1,17),(100,'blah blah',31,1,15),(101,'blah blah',31,2,15),(102,'/image/fpmYHLEwRVeumEYb23E3ZNyCrFnA9xgU.jpg',33,2,17),(103,'[\"one\",\"two\",\"three\"]',34,2,19),(104,'jsafd',34,2,18),(105,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,2,20),(106,'?',38,1,22),(107,'[\"?\",\"?\",\"?\"]',38,1,23);
/*!40000 ALTER TABLE `classroom_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_game`
--

DROP TABLE IF EXISTS `classroom_game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_game` (
  `classroom_id` int NOT NULL,
  `game_id` int NOT NULL,
  PRIMARY KEY (`classroom_id`,`game_id`),
  KEY `IDX_22334e664f29a9ccb6f482a320` (`classroom_id`),
  KEY `IDX_2568d0bf3be282646fb27a195c` (`game_id`),
  CONSTRAINT `FK_22334e664f29a9ccb6f482a3207` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_2568d0bf3be282646fb27a195cd` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_game`
--

LOCK TABLES `classroom_game` WRITE;
/*!40000 ALTER TABLE `classroom_game` DISABLE KEYS */;
INSERT INTO `classroom_game` VALUES (1,22),(1,31),(1,33),(1,35),(1,36),(1,38),(2,31),(2,33),(2,34),(3,22);
/*!40000 ALTER TABLE `classroom_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `field`
--

DROP TABLE IF EXISTS `field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `field_name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `default_value` varchar(150) NOT NULL,
  `order` int NOT NULL,
  `game_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_f535c2132ba21d4781e19ec07ef` (`game_id`),
  CONSTRAINT `FK_f535c2132ba21d4781e19ec07ef` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'טקסטים','text','כעדגעד',1,22),(2,'בחירות 2021','choice','[\"ביבי\",\"בנט\",\"לפיד\",\"סער\"]',4,22),(3,'תמונה כלשהי','image','/image/sCcbMPZ6CCTNBRvjFANkMtcZANlsdcpv.jpg',2,22),(15,'texttt','text','blah blah',1,31),(16,'choicey','choice','[\"ksjdf\",\"ifueriy436\"]',1,32),(17,'burning','image','/image/fpmYHLEwRVeumEYb23E3ZNyCrFnA9xgU.jpg',1,33),(18,'text','text','jsafd',1,34),(19,'choicee','choice','[\"one\",\"two\",\"three\"]',3,34),(20,'pictchure','image','/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',5,34),(21,'jhgsdjf','image','/image/nIn5gbx3gQ4EPRRpj8P4bj0gaJ4a5NFd.png',1,36),(22,'לחדלחגדכ','text','?',1,38),(23,'לחכעלחכ','choice','[\"?\",\"?\",\"?\"]',5,38);
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
  `game_name` varchar(30) NOT NULL,
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  `description` varchar(255) DEFAULT NULL,
  `requirements` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (22,'בלופ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(31,'text only','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(32,'choice only','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(33,'image','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(34,'image text choice','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(35,'peduts idea','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(36,'עננים','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(38,'ןגועכח','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'superAdmin','Able to access and edit everything','mckjneder83u4mzxs'),(2,'superTeacher','Able to add student and teacher to there school','cdsakdo491u8xlks'),(3,'teacher','Able to add student to class and add classes','mxdired9432udxjdoi8e'),(4,'student','Able to play','xmlkdji9ur98usw3d');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `city` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'sneakerers','בית שמש'),(31,'burn it','constintopale');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_classroom`
--

DROP TABLE IF EXISTS `student_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_classroom` (
  `student_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  PRIMARY KEY (`student_id`,`classroom_id`),
  KEY `IDX_b0a7ccbf28e8e4c488aee77be0` (`student_id`),
  KEY `IDX_d3a519efc01c006351f375c6d7` (`classroom_id`),
  CONSTRAINT `FK_b0a7ccbf28e8e4c488aee77be07` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d3a519efc01c006351f375c6d7a` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_classroom`
--

LOCK TABLES `student_classroom` WRITE;
/*!40000 ALTER TABLE `student_classroom` DISABLE KEYS */;
INSERT INTO `student_classroom` VALUES ('68365ee0-e27e-4e41-9482-b0d073712098',1),('9a309c72-d927-4f90-bcab-6ea57767db1f',1),('cac9c534-4665-406b-844e-348738ea8122',1),('cac9c534-4665-406b-844e-348738ea8122',3),('cac9c534-4665-406b-844e-348738ea8122',12),('8559b07e-397e-45bf-920e-11bd973c0bef',14);
/*!40000 ALTER TABLE `student_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_classroom`
--

DROP TABLE IF EXISTS `teacher_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_classroom` (
  `classroom_id` int NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`teacher_id`),
  KEY `IDX_bd7b3447b9efe33396652993ec` (`classroom_id`),
  KEY `IDX_b63bca24c77077230ad0c85229` (`teacher_id`),
  CONSTRAINT `FK_b63bca24c77077230ad0c852295` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_bd7b3447b9efe33396652993ecf` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_classroom`
--

LOCK TABLES `teacher_classroom` WRITE;
/*!40000 ALTER TABLE `teacher_classroom` DISABLE KEYS */;
INSERT INTO `teacher_classroom` VALUES (1,'18bf6661-8387-4f75-a8f8-9e10edb94f56'),(1,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(2,'2a8d4b36-ca8b-4ea1-a709-f7b911df3db5'),(2,'c45e50eb-8964-48a3-9b49-0e52c7b8ec44'),(2,'c6c56837-f9ec-4037-9130-40374e03ed65'),(2,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(3,'330e9f7e-9524-4d6a-8ca1-24d20d49ea26'),(3,'9c288f8d-5503-4f61-b6c1-65aec58ab91b'),(3,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(3,'da91d0c5-7364-4a67-b052-82560d74b45d'),(4,'18bf6661-8387-4f75-a8f8-9e10edb94f56'),(4,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(12,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(13,'c45e50eb-8964-48a3-9b49-0e52c7b8ec44'),(13,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(14,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(15,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(16,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(17,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(18,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(19,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(20,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(21,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(22,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(23,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(24,'c3b1b07b-e102-433b-9ea4-ee38e17092ca'),(24,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(25,'17f295a1-3c00-4662-b9d3-1771de948f73'),(25,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260');
/*!40000 ALTER TABLE `teacher_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `two_factor`
--

DROP TABLE IF EXISTS `two_factor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `two_factor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) DEFAULT NULL,
  `attempt` tinyint unsigned NOT NULL DEFAULT '0',
  `code_created_date` timestamp(6) NULL DEFAULT NULL,
  `user_blocked_date` timestamp(6) NULL DEFAULT NULL,
  `user_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_162c7f53b41b84102a8e06eff1` (`user_id`),
  CONSTRAINT `FK_162c7f53b41b84102a8e06eff18` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `two_factor`
--

LOCK TABLES `two_factor` WRITE;
/*!40000 ALTER TABLE `two_factor` DISABLE KEYS */;
/*!40000 ALTER TABLE `two_factor` ENABLE KEYS */;
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
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `school_id` int DEFAULT NULL,
  `emailVerified` tinyint DEFAULT '0',
  `verificationToken` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`),
  KEY `FK_ed1bcfe9ae995a567b529f316a2` (`school_id`),
  CONSTRAINT `FK_ed1bcfe9ae995a567b529f316a2` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('032156a3-8784-40fc-8a27-600e73ef4989','fsgfxcnbvmn','$2b$10$X7T783TiQNjZMVZB6VWKVuz/8umdUV/T753ZKHUy4/CHbuf6MyNaO','2021-03-09 09:51:15.358816','2021-03-09 09:51:15.358816','Student','hgdd','rsfd',1,0,NULL),('122bec87-a1bb-4bef-8c25-938f94a12355','jgsd@gmail.com','$2b$10$nndkNm8tA6VhqMCmVtGJDOexR6K7zGeofanvD2tVDiSSLJngSwO/S','2021-03-09 10:11:34.713062','2021-03-09 10:11:34.713062','Teacher','EEEEE','eeeee',31,0,NULL),('1287d1ba-6f3f-4708-b281-ca6273d08238','batz@gmail.com','$2b$10$RcZlcrWJR2Rko2E4oK56qeaUXA/t6R2R/qMwcYNVgyLBIIWsaCh0.','2021-03-07 15:37:49.482460','2021-03-07 15:37:49.000000','Teacher','prati','family',31,0,'064d946141f66622557733c29a4c5562fc9420a1580cee26d17db917b984dd54a342d60368907bee76ee68a8c88faa329f44'),('17f295a1-3c00-4662-b9d3-1771de948f73','hdgfsvc@gmail.com','$2b$10$GbpQoRJXHG3GcXwsGo2mj.sQVAd3KhVlSC9lzvVWKN0wiMZKXdVim','2021-03-15 14:03:51.131013','2021-03-15 14:03:51.000000','Teacher','DSdferh','nfhhte',31,0,'b5ce02d82ba5286173c8c7a318e3aa56ec64664e331e143a30c366f0069bac9796bca2e66b938104108cd8a94c6be825a02c'),('18bf6661-8387-4f75-a8f8-9e10edb94f56','jhggcd@gmail.com','$2b$10$w8SfFwOuh7kO0IieczGdj.f0IOIGkoieSPZBWRzrWGDzpostk/stG','2021-03-16 10:12:57.740496','2021-03-16 10:12:57.000000','Teacher','kshfk','amsdb',1,0,'1eb800bffec2ffc3a27cd18da316a81a2a8e09de339dba30d72eccb635c1a251b50cf755c450453643c67497bacf93a195e3'),('1966ed8c-7e7b-49ea-a914-a1eaf7a9258f','iytyuyygfs','$2b$10$mtG5dMlso.eOfzVrlUjQ7OLooV24/BW/WndAENSeHowIS0UnvYLEO','2021-03-09 09:44:58.909003','2021-03-09 09:44:58.909003','Student','fgdgf','resfs',1,0,NULL),('283ec611-fd31-49c4-9df2-032b656ef10b','hjfdfhgkoiu','$2b$10$N6PWLYi.SQTiRmFet5RBPuGEgkkI4U0mah0daPOH/K20GaSEO9eiW','2021-03-09 10:00:39.725437','2021-03-09 10:00:39.725437','Student','tttttttt','ydgugd',1,0,NULL),('2a8d4b36-ca8b-4ea1-a709-f7b911df3db5','yoghurt@gmail.com','$2b$10$IIESG7Tw31VlhdEXxC7QkuKV0IUhQL4vfIm7KYaJzk.brie//cnIu','2021-03-14 12:34:22.833210','2021-03-14 12:34:22.000000','Teacher','Yםך','Bןוטאק',1,0,'c684191407e78c6ce683622790bbd844ead5df0f298d43d348098d6e1a73c4d4ffce0e58c6657010831e65d774c721a54075'),('330e9f7e-9524-4d6a-8ca1-24d20d49ea26','shospi@gmail.com','$2b$10$ybOZ2MVskf6mSKKgbF1fw.RozsKGYZ6oTmF3y9hNAXkTV3wsq9EQi','2021-03-03 12:06:34.183161','2021-03-03 12:06:34.183161','Teacher','פדות','שוספי',1,0,NULL),('4a71ccff-63b2-4539-840e-772845571491','jhdsg@gmail.com','$2b$10$eMRKafdzhC.Udk/4ZwmBS.3VYWKnL00xlt/WjUs0iaO0voQAJ7yUm','2021-03-09 10:06:18.406267','2021-03-09 10:06:18.000000','Teacher','cccccc','BCCCC',1,0,'62a62ffc515827974f5748fdc7852b0dd8b27d44433aaa515335c04162580b42bd83b53775aa496cde7bedc1ad79ab426967'),('571ea09b-87ac-4a56-8bdb-b5669e789ad5','hgcytre65e','$2b$10$kipeP3sNbU5hWXvRVMLEeulebb41qMPSpsJhXA5coeQtVAyx0pqfy','2021-03-09 09:47:40.576724','2021-03-09 09:47:40.576724','Student','jhfhg','tdetrsd',1,0,NULL),('68365ee0-e27e-4e41-9482-b0d073712098','batz1234','$2b$10$JXgrhbGhUnnhDl/jcsrObueaMVJyYJZMwrj2BGn0L1MbVSMdtY8ui','2021-03-09 10:13:24.257609','2021-03-16 14:51:33.000000','Student','בתצי','רוזי',1,0,NULL),('70df752c-744b-4ee2-ace4-e56da048b23e','superadmin@gmail.com','$2b$10$Th1aiBam/B9kQqGcJX/fM.E32DH1mB3TxB/yirmrhCC58uBiBdGqe','2021-01-03 12:30:56.415866','2021-01-03 12:30:56.415866','SuperAdmin',NULL,NULL,NULL,0,NULL),('7da0892c-923d-432e-80c2-1a489536a2a4','trsfcyhgi@gmail.com','$2b$10$8keEU37aU19aksnYyfbhBuQnPtmADeVemaLB9LJH7EJv0SWetB1yG','2021-03-14 12:54:39.504415','2021-03-14 12:54:39.000000','Teacher',',jkjgjkf','bfdhgstrew',31,0,'b51e146aabc2f2e710e0e6a2a495bdb97c43b07b97c0777e753918de48f3b144003e0bfda60d5044755d88894e1f4c37c18e'),('810a5bb8-1938-480c-afb6-b0e92a869b76','yyyyyyyyyy','$2b$10$dg7RH9gNgjuNaueMiVAOTOlSzu.xDe18SJJ0.de1kYywfvARVFE8a','2021-03-09 09:46:28.461563','2021-03-09 09:46:28.461563','Student','fgdgf','resfs',1,0,NULL),('8559b07e-397e-45bf-920e-11bd973c0bef','Fשאgreek','$2b$10$TcUfV5YwipXj47VtSBIbCeUdMaFj.5xbrFu1afLS3nFUm2dJ2fpKq','2021-03-14 12:59:04.932567','2021-03-14 12:59:04.932567','Student','Mט','ןעB',1,0,NULL),('9287e43f-fc2d-42e5-a4f4-9fcffeff3bd0','kdjdk@gmail.com','$2b$10$YjLZTzFf7pbXtA0Ece3e5O0op020r.Uzg8XbYJip6OuuHtjW6rlf2','2021-03-09 10:09:16.499048','2021-03-09 10:09:16.499048','Teacher','ddddd','DDD',1,0,NULL),('99fb6d72-b963-42b8-b1de-403f08319ad0','gfdgfd@gmail.com','$2b$10$Tnmo90IGJVP.x4e09zCa7e.eyEMbJBGt0sLzKa/S/EP8teDXoWPwa','2021-03-09 09:38:17.243991','2021-03-09 09:38:17.000000','Teacher','ghfhf','trer',1,0,'a22fdeee2e812d00279ddb113486b74c828b78c49a69477b364118ea27ae3239a67c5675160d51a977b401dde7734ca3889c'),('9a309c72-d927-4f90-bcab-6ea57767db1f','student2','$2b$10$pJgIcgCk7VwkEluwRXRo6u7ysWYuc.e3HmshfEEFAgCEyXDG/4mHW','2021-03-11 12:41:21.587083','2021-03-11 12:41:21.587083','Student','Big Student','Family',1,0,NULL),('9c288f8d-5503-4f61-b6c1-65aec58ab91b','cookkes@gmail.com','$2b$10$qYcYMEVirCkeOrox3.yJ0.lOlZsT9ctVy9Frg1Q7H4vgf7tfhyPtK','2021-03-14 12:52:56.722566','2021-03-14 12:52:56.000000','Teacher','שלום','כהן',1,0,'dceb9dd051b0788d29a137f4e9c0164dccb58dfc87dc4c2ec04274b3093f54a4f4d1948d4044d0de1bca593b7dfc2708edf4'),('af537225-e048-48d3-8641-a9de5126b193','trsgfs','$2b$10$Ei6hpm9D2/aoVQS7TOcL7ua63JPcIk84hT6USrtyLhNyGeM9UA73C','2021-03-09 09:44:45.015817','2021-03-09 09:44:45.015817','Student','fgdgf','resfs',1,0,NULL),('c3b1b07b-e102-433b-9ea4-ee38e17092ca','hgdgfz@gmail.com','$2b$10$Zd8VEARmY/3UJ.8/8Bl3BelOSHqGOkrQUUHZw1uWrWfQ5jw0awMdi','2021-03-15 14:08:51.014153','2021-03-15 14:08:51.000000','Teacher','SSSSSSSSS','gfsfdsfd',1,0,'1c800b09cacdfecad03e11e7d325ce59e736e04aed90c9f8580e26b69128c648b90d5465bb0ccb2da9e5a2d04480586c3081'),('c45e50eb-8964-48a3-9b49-0e52c7b8ec44','jhgcd@gmail.com','$2b$10$7saQzePmEDJoZeFP8g8YCuB4GkGCw6EtaOdpryNhlS.us1wYDPpAm','2021-03-15 13:49:30.672310','2021-03-15 13:49:30.000000','Teacher','Yjkdsf','dsnmfb',1,0,'4d482de4ce30c70e4cff9c3d1bb2bed36993703a8782e54728bb072b3a23b0ff999e244f671783cf24c9f6c10e8f79316ec1'),('c6c56837-f9ec-4037-9130-40374e03ed65','knlds@gmail.com','$2b$10$AGkqYgc4BO0.ZsQY8KWVROBEyKIP1c35D75raX.hUf2gB5sB3ke1G','2021-03-15 13:52:43.172774','2021-03-15 13:52:43.000000','Teacher','OOOOOOOO','ooooooooo',1,0,'de69444df3aa877e666fb88e666b3f69ced4586ff07c107b4d91066b8b7f5c006baf094fd437a3f65cda9f48a4e965bece5c'),('cac9c534-4665-406b-844e-348738ea8122','student1@gmail.com','$2b$10$B1ru6gXbTuWu0n.l5pb/eO7UGytF1Uc.y2pXaDzhQKAFUM2mWlTau','2021-01-03 12:36:05.518737','2021-03-09 11:46:49.000000','Student','יאיר','רוזנפלנר',1,0,NULL),('d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260','teacher1@gmail.com','$2b$10$A1taxxgMbUuqu/f/pW2vaup2.AcbKRz4YV0qnu7erjIAHvDLdmKS6','2021-01-03 12:37:04.691071','2021-01-03 12:37:04.691071','Teacher','מורן','לוי',1,0,NULL),('da91d0c5-7364-4a67-b052-82560d74b45d','jsadfj@gmail.com','$2b$10$VmjiD6emdyOvoUviwZiMl.wieimU0e6D9ngMSXInGsKPZvUA/qT/S','2021-03-15 13:46:37.440754','2021-03-15 13:46:37.000000','Teacher','SHiuhdf','dasnbf',1,0,'4ab073c78bfc075e34944d67914ed9c00a02c1aa6b222149139bf712ed5709e51b583e994ed65b3689106fc222fd67a58bae'),('de542f43-0ff2-4dd3-a242-8387776379ae','jbjhj@gmail.com','$2b$10$0skOXpjgLAHHDCpc4IgSWO6JYmBm5gBa6UAf6cq6wccg0d2vbgzr.','2021-03-09 10:04:40.473756','2021-03-09 10:04:40.000000','Teacher','bbbbbbbbb','BBBBBB',1,0,'e8f1fb8393941b221f9d0e38850c8e922c80f199b3e63d9c21780bdfd62e41fb3c4032b64cc423da039abb795907577de9f0');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_password`
--

DROP TABLE IF EXISTS `user_password`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `password` varchar(255) NOT NULL,
  `userId` varchar(36) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3e755bee2cdcee50a9e742776d8` (`userId`),
  CONSTRAINT `FK_3e755bee2cdcee50a9e742776d8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_password`
--

LOCK TABLES `user_password` WRITE;
/*!40000 ALTER TABLE `user_password` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_password` ENABLE KEYS */;
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
INSERT INTO `user_role` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e',1),('122bec87-a1bb-4bef-8c25-938f94a12355',3),('1287d1ba-6f3f-4708-b281-ca6273d08238',3),('17f295a1-3c00-4662-b9d3-1771de948f73',3),('18bf6661-8387-4f75-a8f8-9e10edb94f56',3),('2a8d4b36-ca8b-4ea1-a709-f7b911df3db5',3),('330e9f7e-9524-4d6a-8ca1-24d20d49ea26',3),('4a71ccff-63b2-4539-840e-772845571491',3),('7da0892c-923d-432e-80c2-1a489536a2a4',3),('9287e43f-fc2d-42e5-a4f4-9fcffeff3bd0',3),('99fb6d72-b963-42b8-b1de-403f08319ad0',3),('9c288f8d-5503-4f61-b6c1-65aec58ab91b',3),('c3b1b07b-e102-433b-9ea4-ee38e17092ca',3),('c45e50eb-8964-48a3-9b49-0e52c7b8ec44',3),('c6c56837-f9ec-4037-9130-40374e03ed65',3),('d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260',3),('da91d0c5-7364-4a67-b052-82560d74b45d',3),('de542f43-0ff2-4dd3-a242-8387776379ae',3),('032156a3-8784-40fc-8a27-600e73ef4989',4),('1966ed8c-7e7b-49ea-a914-a1eaf7a9258f',4),('283ec611-fd31-49c4-9df2-032b656ef10b',4),('571ea09b-87ac-4a56-8bdb-b5669e789ad5',4),('68365ee0-e27e-4e41-9482-b0d073712098',4),('810a5bb8-1938-480c-afb6-b0e92a869b76',4),('8559b07e-397e-45bf-920e-11bd973c0bef',4),('9a309c72-d927-4f90-bcab-6ea57767db1f',4),('af537225-e048-48d3-8641-a9de5126b193',4),('cac9c534-4665-406b-844e-348738ea8122',4);
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

-- Dump completed on 2021-03-17 11:49:51
