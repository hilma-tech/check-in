-- MySQL dump 10.13  Distrib 8.0.23, for Linux (x86_64)
--
-- Host: localhost    Database: checkin
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `class_field`
--

DROP TABLE IF EXISTS `class_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `class_field` (
  `id` int NOT NULL AUTO_INCREMENT,
  `new_value` varchar(255) NOT NULL,
  `class_id` int DEFAULT NULL,
  `field_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_cc64a5e4b5c1f5e65d137b7292` (`class_id`),
  UNIQUE KEY `REL_5084d250412d9ff08b46643a37` (`field_id`),
  CONSTRAINT `FK_5084d250412d9ff08b46643a370` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`),
  CONSTRAINT `FK_cc64a5e4b5c1f5e65d137b72925` FOREIGN KEY (`class_id`) REFERENCES `classroom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_field`
--

LOCK TABLES `class_field` WRITE;
/*!40000 ALTER TABLE `class_field` DISABLE KEYS */;
/*!40000 ALTER TABLE `class_field` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (2,'א\'1',1),(3,'ב\'5',1),(4,'א\'2',1),(5,'ד\'4',1),(6,'ה\'1',1),(7,'א\'3',1),(8,'ב\'2',1),(9,'ג\'1',1);
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
  `classroom_id` int DEFAULT NULL,
  `field_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ef6001153b3d1baf00d4307607c` (`classroom_id`),
  KEY `FK_28211bf7506a8fd301f86988bb2` (`field_id`),
  CONSTRAINT `FK_28211bf7506a8fd301f86988bb2` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`),
  CONSTRAINT `FK_ef6001153b3d1baf00d4307607c` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_field`
--

LOCK TABLES `classroom_field` WRITE;
/*!40000 ALTER TABLE `classroom_field` DISABLE KEYS */;
INSERT INTO `classroom_field` VALUES (1,'/image/Sm3ZkrLS00KDi2VB7YNcMHbzwRXWpOhU.png',6,2),(2,'שדה שדה שדה',6,3),(4,'blob:http://localhost:3000/9027efc9-059b-4091-b4ba-0770caa76207',5,4),(5,'blob:http://localhost:3000/27745250-6c8f-4a21-9ff3-96fcb3851411',5,5),(6,'[\"שניצל\",\"תירס\",\"פירה\",\"פירה בטטה\",\"בטטה\",\"צ\'יפס בטטה\"]',5,1);
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
INSERT INTO `classroom_game` VALUES (2,1),(2,5),(5,5),(5,9),(5,11),(5,12),(5,13),(5,14),(6,6),(6,12);
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'שדה','choice','[\"שניצל\",\"תירס\",\"פירה\",\"פירה בטטה\",\"בטטה\",\"צ\'יפס בטטה\"]',1,11),(2,'שגיאה','image','/image/Sm3ZkrLS00KDi2VB7YNcMHbzwRXWpOhU.png',1,12),(3,'שדה','text','שדה שדה שדה',6,12),(4,'kkkkkkkkkkkkkk','image','blob:http://localhost:3000/9027efc9-059b-4091-b4ba-0770caa76207',1,13),(5,'חיח חיח','image','blob:http://localhost:3000/27745250-6c8f-4a21-9ff3-96fcb3851411',1,14),(6,'לללל','choice','[\"חחח\",\"חחח\",\"חחח\",\"חחח\",\"חחח\",\"\\\" חחחחח\"]',1,16),(8,'שדההההה','choice','[\"0\",\"1\",\"פירה\",\".\"]',1,21),(9,'חטכח','image','/image/KOb3a5d2nBIe8OM9uLMV0riwpLDD86VP.jpg',3,22),(11,'תעופה','choice','[\"אני מנסה להבין מה קורה פה\",\"אבל האתר הזה ממש לא ברור\",\"הצילו פדות\",\"זה ממש לא מובן\",\"רון היה פה\",\"מגניב\"]',1,24);
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
  `description` varchar(30) DEFAULT NULL,
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  `game_name` varchar(30) NOT NULL,
  `requirements` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'njs','/image/xdpFEQovlQ7OYfeMLi6iJHE6jkroIQpx.jpg',_binary '\0','xs',NULL),(2,'a xm','/image/qc0TxJ6wJ2ZUnoND3AByuP8kDZXC4LLc.jpg',_binary '\0','msk',NULL),(5,'מחדשמס','/image/SELQ9vharyefeCWO8EV7yV2b7iI2l22t.jpg',_binary '\0','סדלחמס',NULL),(6,'תמונה','/image/3ADQMVqDP4Ls802QquIUHFhpCv5SW5Xy.jpg',_binary '\0','תמונה',NULL),(9,'xnkjdnkj','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','xknjdw','xmkds'),(11,'תיאור שהוא לא 30','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','משחקים בקוד','להתקבל להילמה'),(12,'משהו','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','ugi','kyfkfkuf'),(13,'kkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','שלום','kkkkkkkkkkkk'),(14,'ארך ארך','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','חיימון לימון','אתה יודע כמה אבא אוהב חציר '),(16,'לל','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','יייי','ללל'),(17,'לללל','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','חח','ggggggggg'),(20,'kdsm','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','mxkdxmsmk','hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh'),(21,'חיעחעחיעחיע','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','םטל לחחדילח ילח י',''),(22,'','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','עחכיגכגחצעיכ',''),(24,'חרא של משחק','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','תופסת','להשתעמם');
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
INSERT INTO `role` VALUES (1,'superAdmin','Able to access and edit everything','xkju48ewtjcoiu984u'),(2,'superTeacher','Able to add student and teacher to there school','xmdirdwjfcureq98e32'),(3,'teacher','Able to add student to class and add classes','mlkdsef98uxmwieau89'),(4,'student','Able to play','kmfcjiwumawkqje9i3du');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'עשה חיל','אפרת'),(2,'אורות משה','באר שבע');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_classroom`
--

DROP TABLE IF EXISTS `student_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_classroom` (
  `classroom_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`student_id`),
  KEY `IDX_d3a519efc01c006351f375c6d7` (`classroom_id`),
  KEY `IDX_b0a7ccbf28e8e4c488aee77be0` (`student_id`),
  CONSTRAINT `FK_b0a7ccbf28e8e4c488aee77be07` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d3a519efc01c006351f375c6d7a` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_classroom`
--

LOCK TABLES `student_classroom` WRITE;
/*!40000 ALTER TABLE `student_classroom` DISABLE KEYS */;
INSERT INTO `student_classroom` VALUES (2,'49739f95-c75c-48b7-a36a-da29a70ea75e'),(2,'5af62047-8aab-4e2c-881e-e234990a5aca'),(2,'632255e1-cdf5-41ac-aa65-12e4223256bd'),(2,'67cf45be-29c8-48b3-9862-89619b60db70'),(2,'858a3ca0-f56b-447f-993b-6e8a3ad1267a'),(2,'9a6ef5e3-e763-4801-bc38-4b982d00d0d2'),(2,'a8126e30-4211-404e-9596-8d7323ec4dd9'),(3,'49739f95-c75c-48b7-a36a-da29a70ea75e'),(3,'5af62047-8aab-4e2c-881e-e234990a5aca'),(3,'67cf45be-29c8-48b3-9862-89619b60db70'),(3,'7ecf389d-ee81-41bd-ac9b-ac3f3d071986'),(3,'858a3ca0-f56b-447f-993b-6e8a3ad1267a'),(3,'9a6ef5e3-e763-4801-bc38-4b982d00d0d2'),(3,'a8126e30-4211-404e-9596-8d7323ec4dd9'),(4,'67cf45be-29c8-48b3-9862-89619b60db70'),(4,'b61cd0b1-170a-4288-820c-35592a87ccf1'),(5,'0b536580-7221-48f4-9452-accc32426d9f'),(5,'25c230a0-1462-4e35-b98c-b1f23d075d67'),(5,'28210a29-7577-4da4-9324-bfdde1e7c0a1'),(5,'32ac3f63-2777-4d3a-84bf-4e720dd83b86'),(5,'9990ac15-957f-4ae8-a95e-ca18e7b9a835'),(5,'ab105bc3-0126-4e51-bb21-f683786dfc21'),(5,'ff954a5a-2dab-47d7-99cb-bbe7e734fc26'),(6,'4802da91-4bd8-4c03-9c12-e402a7bf2e9c'),(6,'ab105bc3-0126-4e51-bb21-f683786dfc21'),(7,'ff954a5a-2dab-47d7-99cb-bbe7e734fc26'),(8,'4d434072-abd7-41aa-bd32-d7c5a822825c'),(8,'b61cd0b1-170a-4288-820c-35592a87ccf1');
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
INSERT INTO `teacher_classroom` VALUES (2,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(2,'3a601cf8-324f-41e3-8a9c-edbf4a820d36'),(4,'3a601cf8-324f-41e3-8a9c-edbf4a820d36'),(5,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(5,'a3d5ebab-5e26-4f98-9bee-fe7d2de385e9'),(5,'d7643bde-a764-44fe-9d68-72ae837ad1e7'),(6,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(7,'3a601cf8-324f-41e3-8a9c-edbf4a820d36');
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
INSERT INTO `user` VALUES ('009b4262-089a-4cb5-8a39-0d901eebff6d','mfqqqqqqq','$2b$10$YQ3WzD2Ru1DAQzsuoTAui.AiFKLAEd2yKT32c3UB5IRNfsaKgHkA2','2021-03-02 17:59:45.006924','2021-03-02 17:59:45.006924','Student','cxcrncg','mcdfsdfc',1,0,NULL),('0352174f-4853-42ef-98a5-96a16d58835b','kszxnksccjjd','$2b$10$50MMcSxOrQZ4HTkTXvFOEeL7Web319X7.dwV6TcI2KCkMkmtBg6/m','2021-02-25 11:03:40.218654','2021-02-25 11:03:40.218654','Student','cxcrnc','mcdfc',1,0,NULL),('09046eb7-e487-4f3b-9a37-b19f56d038cb',' mkczJnc','$2b$10$nzn7x18kdqu1GdLliEvOCetMOwPumlydugKMMqrOxcQfl.WpRBZ.W','2021-02-25 10:48:59.033482','2021-02-25 10:48:59.033482','Student','xscnkjnk','dsc',2,0,NULL),('0b536580-7221-48f4-9452-accc32426d9f','nckudshiu','$2b$10$C/tvsMiNQDkYLu8U5qnwAufmDbK8/7dnZFwroJRuWUJadz9D7JsHO','2021-03-03 10:38:57.070226','2021-03-03 10:38:57.070226','Student','gdcvf','cljjcfsdx',1,0,NULL),('0ebb8167-724c-465d-8b51-b72c6f5e42d2','aaaaaaaaaaaaaa','$2b$10$tNI2NmOK3csL1DwLa15lV.2HDxNb9Wrt5/ad4NZ0NSoXTAPLhmRfe','2021-03-02 17:56:08.813409','2021-03-02 17:56:08.813409','Student','gdf','cljjcfsdx',1,0,NULL),('177ee1c5-8f39-4f2b-8b4c-4a232311a328','teacher1@gmail.com','$2b$10$XBRfSiZqRTSsLPOYo4rTqec0k5s7s1SgRMo6eH3vO/LDjVmKAP3xm','2021-01-11 12:32:15.805489','2021-02-22 17:24:37.809000','Teacher','אלזה','סבג',2,0,NULL),('19f3875a-36c3-4396-b395-3c19617e0700','vvmflkvsiaa','$2b$10$za9MBRdFrN9Q.ai3h3KJAORbHLHl9YqD8pY60ZDfUD3pUVQRwSTTS','2021-03-03 10:19:00.368033','2021-03-03 10:19:00.368033','Student','gdcvf','cljjcfsdx',1,0,NULL),('1b678386-4ebf-4f92-9212-6e76f9d2d835','student200@gmail.com','$2b$10$KSkMJpKHo4mOaH2jx0oJ/OQgvgnr5VNTmFjGNHikHVorSYYno5UIK','2021-02-21 11:50:45.682157','2021-02-21 11:50:45.682157','Student','שם','תלמיד',2,0,NULL),('1c71fcde-1459-4fc1-b502-42e134ec249f','ksjcssccjjd','$2b$10$9IrBpdsAZW/wc7RQ4.Kghe0ratAUYHT0zRqgA9BMoyTTzusJoVNTq','2021-02-25 11:01:34.828059','2021-02-25 11:01:34.828059','Student','jxsnknkcxcrnc','mcdfc',1,0,NULL),('20e9fbdd-9611-465a-b849-76ba923fc06a','mksdcimdu','$2b$10$7ngwzNNa2g.0DP3LUET3YOnX4X0Qlqs79eXTaPjTevNUzxhCI2hrS','2021-02-24 11:34:45.200938','2021-02-24 11:34:45.200938','Student','mcklsks js','xcmls',2,0,NULL),('2385264a-05d8-4c79-bd19-91f4293d2f85','ksjcscd','$2b$10$MukBcoSRwksGEbVaJGPkgOewu9V2SkaQVGTd36/a5qWYpD0PWaD7O','2021-02-25 10:54:41.760922','2021-02-25 10:54:41.760922','Student','jxsnc','mcdd',1,0,NULL),('25c230a0-1462-4e35-b98c-b1f23d075d67','nkjds','$2b$10$oRTl7C.fOSio9iq0JIJP3O2dTGxrkh3DDHaDnHh0Ef1Gavzi4Mm2q','2021-02-23 16:14:10.071511','2021-02-23 16:14:10.071511','Student','mndckjs','mckds',1,0,NULL),('26cbcf71-9cf6-4d60-93e4-a717dbe53bb1','teacher100@gmail.com','$2b$10$zXiEp69aM/RSn6LUaZjTfegDSq4nQkP4nCd/rqP8GFybc./XLof4m','2021-01-03 16:42:07.397311','2021-01-03 16:42:07.397311','Teacher','שירה','גולשטיין',1,0,NULL),('28210a29-7577-4da4-9324-bfdde1e7c0a1','vvmfslflkvsiaa','$2b$10$1IsKekV7WjTioU.qL9rwoOfkllXjHpImSTNkQoZHUnuF5Zsjg0.sq','2021-03-03 10:29:38.137230','2021-03-03 10:29:38.137230','Student','gdcvf','cljjcfsdx',1,0,NULL),('2e8d5172-40d4-439f-bdfa-05bbb4eac782','CmksddsvczJnc','$2b$10$KON1mOxqVSK6IxDnNU2QcOt3H1XRWr07IB4vVAYsO768l/vTWCr1S','2021-02-25 10:52:56.661754','2021-02-25 10:52:56.661754','Student','xsdkjkcsmjnk','dsccs',1,0,NULL),('32ac3f63-2777-4d3a-84bf-4e720dd83b86','cbjslflkvsiaa','$2b$10$DBsbdw9KMwGirkOGrpWU7OnXksCbJmVuTCifcsdgrW37FtOlS5w/.','2021-03-03 10:36:29.214155','2021-03-03 10:36:29.214155','Student','gdcvf','cljjcfsdx',1,0,NULL),('355c8d91-dd30-4628-8619-2cd1b825e477','CdsnxzJznc','$2b$10$0TsATIMwHdwUUAJjMZgKPuqP8OY9cUpRZY7j0HJfFwm7U621OzGwa','2021-02-25 11:03:40.312827','2021-02-25 11:03:40.312827','Student','ccfnk','cljjcx',1,0,NULL),('3a601cf8-324f-41e3-8a9c-edbf4a820d36','einav@gmail.com','$2b$10$v/X35LWTxOoUXVustQYmF.FubQnbsszh0vSzJd.ArS6KQ6grqoJUO','2021-02-17 09:16:26.327310','2021-02-17 09:16:26.327310','Teacher','עינה','בורג',1,0,NULL),('3cada055-7f8e-4584-b2b9-70eea19a47d0','vmflaaacvaa','$2b$10$YRMK2aJVo1kTDWL7l.HIHeGLcL4Dag9Ivfs8Vry0bmklN.7MeD6ny','2021-03-02 18:03:48.311961','2021-03-02 18:03:48.311961','Student','gdf','cljjcfsdx',1,0,NULL),('4802da91-4bd8-4c03-9c12-e402a7bf2e9c','Chen@gmail.com','$2b$10$h6BswQ/K7VcHqBQIvvhWNO.phkPIF8OGsIcJLMWJsQXql3UINP.Ny','2021-02-16 15:34:11.012558','2021-02-16 15:36:38.717630','Student','חן','הייתה פה',1,0,NULL),('49739f95-c75c-48b7-a36a-da29a70ea75e','Bdfkljvcqq','$2b$10$7IwwJNsX1CFSW7T7WjsUF.jQLLrwydIXsUtdVDCOis4p8lV6e0frW','2021-03-03 10:19:00.274323','2021-03-03 10:19:00.274323','Student',' vkmxc','mcdfsdfc',1,0,NULL),('4d434072-abd7-41aa-bd32-d7c5a822825c','jonathan@gmail.com','$2b$10$RbAKR7ctaQ3ehGgcaOLMxORTQoj0jJXypqOUxiICFl1KXFIaols72','2021-02-22 17:16:32.467750','2021-02-22 17:16:32.467750','Student','יונתן','מולר',1,0,NULL),('51821bd7-4ce3-4712-a77f-9b9650554e23','cmldkscsmca','$2b$10$1jZM.JnmGlyMSkvJUEgdkeCjUrOYDYK9bWEqtC11HLFU0keHD.006','2021-02-25 10:42:58.338508','2021-02-25 10:42:58.338508','Student','mslcmsmxk','mcslk',2,0,NULL),('59926edc-8509-4b9e-bced-45cb43fb5697','superadmin@gmail.com','$2b$10$y9Hh7oS6BER1JV9HAoYNhuRKRRIeCRVu24g82q2ama3Sd.7UmS6i2','2021-01-03 13:35:37.312446','2021-01-03 13:35:37.312446','SuperAdmin',NULL,NULL,NULL,0,NULL),('5af62047-8aab-4e2c-881e-e234990a5aca','Bdcbdjdljvcqq','$2b$10$5nggnssUsfMS54Lso7svSO67MbQfPDUK8erW2TSWg5uS29ovbwPJ2','2021-03-03 10:36:29.121792','2021-03-03 10:36:29.121792','Student','cvsdkmxc','mcdfsdfc',1,0,NULL),('5d19d13b-1570-4e8c-952e-6899d6139983','mcxlkdsnkc','$2b$10$6L5FeJrjrhUoe6TtSxDQYuDggazj8iaB2yKxy1lmYZGqEy2cgPe4S','2021-02-24 11:31:12.925139','2021-02-24 11:31:12.925139','Student','mcllqksc','clksnk',2,0,NULL),('5f8fd70c-dd84-4f5f-aa80-69aab3b6e70d','CmksdzJnc','$2b$10$olO8eQz1.oUZM/NAp4VQse9309GHe2VB3qjK00nDoO9kI6.URkqte','2021-02-25 10:51:37.840856','2021-02-25 10:51:37.840856','Student','xsdkjkjnk','dsc',2,0,NULL),('613c5002-1181-4b85-b83c-9e2575f0cce6','moshemoshe','$2b$10$mo82/KNBvTNyY2QCtCXIHeRA1vZWMdCddqzpvyt.iO4gwJWdRYwNS','2021-02-23 12:01:50.875201','2021-02-23 12:01:50.875201','Student','משה','כהן',1,0,NULL),('632255e1-cdf5-41ac-aa65-12e4223256bd','student111@gmail.com','$2b$10$D5hvdCaNJ56GQHPcxTvEfub5mf/nlQ.Xck2WqfEzCGGgqEMNFJNbq','2021-01-03 13:35:52.565108','2021-01-03 13:35:52.565108','Student','בת ציון','רוז',1,0,NULL),('66bfc759-13f1-47d1-980c-90678a9e2863','mxkxmsdsmck','$2b$10$ZoHNSDVXB8jva66BDCO4A.J9yvBxTwIz6EnoFQlgF7LF0aG.qRsAG','2021-02-25 10:42:58.245081','2021-02-25 10:42:58.245081','Student','mxkmke','cdsk',1,0,NULL),('67cf45be-29c8-48b3-9862-89619b60db70','student1@gmail.com','$2b$10$V0fw1JScS9YBTmWhWyblCutYQqGDaER7v5uYhL.LPMbte0zBbcp0G','2021-01-03 14:52:51.936521','2021-01-03 14:52:51.936521','Student','אדווה','אורן',1,0,NULL),('6c513c8d-ecaa-4a5a-b1bb-78002c851a9d','mfqqqqqcxqq','$2b$10$FitPQxg6KkiobxhwaP1kle1ShkF1/lDWJajxpG2tj1PCIYgPWtRDu','2021-03-02 18:03:48.219968','2021-03-02 18:03:48.219968','Student','cxcrncg','mcdfsdfc',1,0,NULL),('6edbc8cc-9448-4a9c-a5c0-bf33c61503ca','mclkdxkj','$2b$10$iVj.85CuWEwZ1IfthvOqxOQ3BfCpJLITGEy47Wc/4TTuMOea4eGJC','2021-02-24 11:29:23.302824','2021-02-24 11:29:23.302824','Student','mclkfd','ckds',2,0,NULL),('6f494f82-77ff-405c-bd75-e77c803f9255','ksjcscjjd','$2b$10$sJVpHhWG4Fw9dvImeIPfh.TdXhRIgg8p/.p/HeMVjLQwni4jWpv9u','2021-02-25 10:55:45.504078','2021-02-25 10:55:45.504078','Student','jxscrnc','mcdfxd',1,0,NULL),('752f1911-2466-4fb0-a9d7-de698e0c69a4','CdsjdzJznc','$2b$10$Te4uhZZQ.h/6NbqdRxE0b.a79mI3.hjiaaJrgPQyNXcQEvDku8byi','2021-02-25 11:01:34.911251','2021-02-25 11:01:34.911251','Student','csmjczcxzcfnk','cljjcx',1,0,NULL),('7ecf389d-ee81-41bd-ac9b-ac3f3d071986','noy@gmail.com','$2b$10$F7FC8OBrYpenW6O01Uval.WEO4xNC2AgtUrliVMPtquMEHBPn7KTO','2021-02-18 11:39:11.383452','2021-02-18 11:39:11.383452','Student','נוי','צולשין',1,0,NULL),('8450e4f0-75b4-4e02-bfab-5e132898cde9','vvmflksiaa','$2b$10$rU5AQ/v4b.vPBSbgMap5teE4BHW/i5f4af3gAOjCzY6b9uc77qk8q','2021-03-02 18:05:44.316177','2021-03-02 18:05:44.316177','Student','gdf','cljjcfsdx',1,0,NULL),('858a3ca0-f56b-447f-993b-6e8a3ad1267a','Bdcbdjcbdjs','$2b$10$JBQQCBswi7xCBYqHMuUC4eV0liehi7OgQAUHMD9fWqOKLZTDFmJmG','2021-03-03 10:38:56.976717','2021-03-03 10:38:56.976717','Student','cvsdkmxc','mcdfsdfc',1,0,NULL),('88650e70-5cd4-40a6-87b9-bc72b30e064b','cncdsksj','$2b$10$3w5C6NS7Ayw4pEz7KGwjDO38pJlcAwtWV04ZTaBAKhL96si3N0qPa','2021-02-25 10:51:37.754175','2021-02-25 10:51:37.754175','Student','nmvsnc','cdcdcmd',1,0,NULL),('8a9bdd20-ab3b-4240-b19c-bbba1e10b977','qqqqqqqqqqqqqqq','$2b$10$rAl.dspbur6Rbsu0RldTx.MTWHDH3gvrX.vejU4OV39oOvsDTbJ9O','2021-03-02 17:56:08.721486','2021-03-02 17:56:08.721486','Student','cxcrncg','mcdfsdfc',1,0,NULL),('8bd2c6c5-d34c-4bc8-a6f0-a8096cd48f90','CdsvczJnc','$2b$10$oZ2/mxkC9ri9bxaincACcODhWsBNFDgW37N4h1LRdsSjiviaBFMvy','2021-02-25 10:54:41.843676','2021-02-25 10:54:41.843676','Student','csmjnk','cjds',1,0,NULL),('95c97086-9687-4303-ae15-ab9cbde2c394','mxkdsmck','$2b$10$2PCowqDm95E.Rfim9ndn8uG7r8XrtPSMqnn4S/wvjGjywv9ORDmne','2021-02-24 12:03:09.032106','2021-02-24 12:03:09.032106','Student','cnkds','cdsk',1,0,NULL),('975cbcf0-4076-4732-8bae-e54a6f2b02ef','lipazlipaz','$2b$10$cT.hlXmIxe2jffVCANutye8vVCliz/R/JFzayxtfvbreAuw9Fmih2','2021-02-23 12:01:50.898598','2021-02-23 12:01:50.898598','Student','ליפז','הולצמן',1,0,NULL),('9990ac15-957f-4ae8-a95e-ca18e7b9a835','nckucdsdshiu','$2b$10$tZl1h3Iyo4HgylGWLj5ZaujpD/4.XyWKzU2VPpSdF960jWr47gKRe','2021-03-03 10:41:46.740723','2021-03-03 10:41:46.740723','Student','gdcvf','cljjcfsdx',1,0,NULL),('9a6ef5e3-e763-4801-bc38-4b982d00d0d2','cdazjcbdjs','$2b$10$P9R2fKni/FL3TxVCEakM/eYn1RvdgU5wOI5om5v2xjnmm6Pkqg9.O','2021-03-03 10:41:46.652616','2021-03-03 10:41:46.652616','Student','cvsdkmxc','mcdfsdfc',1,0,NULL),('9c45d42e-8f12-4347-9050-2e2a3ab0cd64','cmldksmca','$2b$10$dYRmmqV2hltggAsLM4idLOU16MIxKyadIq03fkGfEiy1LhEgaQahq','2021-02-24 12:03:09.120211','2021-02-24 12:03:09.120211','Student','mslcms','mcslk',2,0,NULL),('9d66a519-026e-4260-9191-38eca4e5c4df','CdsvckjdzJnc','$2b$10$ghWYYnIKPJfoTPkTJ5O0rOvyIvrMiLNJObbtM.OreDZx4X.KxUyhm','2021-02-25 10:55:45.584473','2021-02-25 10:55:45.584473','Student','csmjcfnk','cljjds',1,0,NULL),('9f317599-d135-45a9-86f6-498060b95a16','CdsjdzJnc','$2b$10$oYiMX1r1NXFbikrN/UhMy.849NFt5GlhH3.WUC0629o9VIrxMh5FK','2021-02-25 10:59:53.943552','2021-02-25 10:59:53.943552','Student','csmjczcfnk','cljjcxds',1,0,NULL),('a286c551-0111-4074-8c88-d28a6d64fc00','CddfbvfsjdzJnc','$2b$10$icLCkgucL/80/PVdvZtnmO3GQifAgjmzHZATTjWVWNaeJ7jztyFrG','2021-03-02 13:18:06.507975','2021-03-02 13:18:06.507975','Student','כגזנעסכ','נגכזדנע',1,0,NULL),('a3d5ebab-5e26-4f98-9bee-fe7d2de385e9','teacher2@gmail.com','$2b$10$1HPNS.bg58p7o/4AnpCVmuB2pp/Ea4N6Ychafnmo2hg4qMxUk7bO.','2021-01-11 12:32:35.222899','2021-02-22 17:24:37.807365','Teacher','רון','איסר',1,0,NULL),('a5ed901c-fa11-44e3-971e-845452ecc5e8','Bdfkljqq','$2b$10$DzZ9xjhXNllQC0MctwjhuO9XVF095QD9GVSu2G15FtFIcW0aKoJMq','2021-03-02 18:05:44.222529','2021-03-02 18:05:44.222529','Student','cxcrncg','mcdfsdfc',1,0,NULL),('a8126e30-4211-404e-9596-8d7323ec4dd9','Bdfkndljvcqq','$2b$10$MfFietzEkmpfpiU5Lt33OOrUyZSjLGWTcopZtMtOy8s5ZvVQJCRoy','2021-03-03 10:29:38.042273','2021-03-03 10:29:38.042273','Student','cvsdkmxc','mcdfsdfc',1,0,NULL),('ab105bc3-0126-4e51-bb21-f683786dfc21','paz@gmail.com','$2b$10$VQQFaxSq2k.ME0i2znBPTu4KuvBsCHyJDWp5IcHY1U7yl3zg1dAM.','2021-02-16 15:39:22.858134','2021-02-16 15:44:38.124906','Student','פז','צגלובובצקי',1,0,NULL),('b61cd0b1-170a-4288-820c-35592a87ccf1','talya@gmail.com','$2b$10$W8/9USZqnujjMDCQFoM8ouKiGoGvsJdd6VSIWZ.wxGbiH8j7bFHVS','2021-02-16 15:35:08.155619','2021-02-16 15:36:38.719172','Student','טליה','איתן',1,0,NULL),('c75bff36-9abc-46cb-bfdc-74f367e74725','mckdscm','$2b$10$.9WeKXf.3qPGK4i0V6BBBOCmGxim7TTrnd9n/SIdTk6cwRtMsdEnW','2021-02-24 11:43:50.964922','2021-02-24 11:43:50.964922','Student','צן חגםד','לבכדלן',2,0,NULL),('c8c6ef76-0c32-4d9c-8274-359b719de332','mkjuf','$2b$10$hK9Dl40ZTZoXSzTm2kWhauyVB5q7AOq8cc39YT.POETLHVb4GMmje','2021-02-23 13:15:05.477091','2021-02-23 13:15:05.477091','Student','mk','nkj',1,0,NULL),('cde16d2c-34eb-4941-aaff-950647fd3470','cnksj','$2b$10$59P6uymCAWXJGq0uVge43e9IjmOsQxQxHyx2Zqt7TUMXD3jctXegi','2021-02-25 10:48:58.947120','2021-02-25 10:48:58.947120','Student','nmxkjdsnc','cdskcmd',1,0,NULL),('d0b345a8-f882-41c6-931a-f98703486baf','vmflaaaaaaaaaaa','$2b$10$fvsL2F/Rk8XvNLNECBWlNuJcje19UUkqWYskcRvAs73aM4MB/zURq','2021-03-02 17:59:45.099657','2021-03-02 17:59:45.099657','Student','gdf','cljjcfsdx',1,0,NULL),('d7643bde-a764-44fe-9d68-72ae837ad1e7','numberone@gmail.com','$2b$10$LbITB6N3pxvmP0Py8Bz5HO3SCxFe0SLY/SZDo1BgdovfaQWsqtD.O','2021-02-22 12:01:15.675355','2021-02-22 12:01:15.675355','Teacher','מלכישוע','היהודי',1,0,NULL),('ecfabb12-f1b7-4af6-81ab-11f04e598c7f','cncdsvsdksj','$2b$10$OxWtHVJ8SeqaJogVp6buv.hjAQF5fI/JbLY4zPLS9LoGslHLrKP5e','2021-02-25 10:52:56.575316','2021-02-25 10:52:56.575316','Student','nmvcdssnc','cdcdcmcdd',1,0,NULL),('f82d9042-6180-4a82-b4b2-56c5db53cffc','ksjcsscjjd','$2b$10$iNMDdpUWuu00919iUPI6ZuWcn7lla4qdFwjWhDFZbAGWMypcTRWTO','2021-02-25 10:59:53.860818','2021-02-25 10:59:53.860818','Student','jxsnkcrnc','mcdfcxd',1,0,NULL),('ff954a5a-2dab-47d7-99cb-bbe7e734fc26','cksd','$2b$10$Zq0YSqcXmasBmaWKhQQQP.G45LJKkKzgMwshCRX1mZU0rQ2rmAHZC','2021-02-23 16:11:34.316524','2021-02-23 16:11:34.316524','Student','mcmlkd','kc nS',1,0,NULL);
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
INSERT INTO `user_role` VALUES ('59926edc-8509-4b9e-bced-45cb43fb5697',1),('3a601cf8-324f-41e3-8a9c-edbf4a820d36',2),('d7643bde-a764-44fe-9d68-72ae837ad1e7',2),('177ee1c5-8f39-4f2b-8b4c-4a232311a328',3),('26cbcf71-9cf6-4d60-93e4-a717dbe53bb1',3),('a3d5ebab-5e26-4f98-9bee-fe7d2de385e9',3),('009b4262-089a-4cb5-8a39-0d901eebff6d',4),('0352174f-4853-42ef-98a5-96a16d58835b',4),('09046eb7-e487-4f3b-9a37-b19f56d038cb',4),('0b536580-7221-48f4-9452-accc32426d9f',4),('0ebb8167-724c-465d-8b51-b72c6f5e42d2',4),('19f3875a-36c3-4396-b395-3c19617e0700',4),('1b678386-4ebf-4f92-9212-6e76f9d2d835',4),('1c71fcde-1459-4fc1-b502-42e134ec249f',4),('20e9fbdd-9611-465a-b849-76ba923fc06a',4),('2385264a-05d8-4c79-bd19-91f4293d2f85',4),('25c230a0-1462-4e35-b98c-b1f23d075d67',4),('28210a29-7577-4da4-9324-bfdde1e7c0a1',4),('2e8d5172-40d4-439f-bdfa-05bbb4eac782',4),('32ac3f63-2777-4d3a-84bf-4e720dd83b86',4),('355c8d91-dd30-4628-8619-2cd1b825e477',4),('3cada055-7f8e-4584-b2b9-70eea19a47d0',4),('4802da91-4bd8-4c03-9c12-e402a7bf2e9c',4),('49739f95-c75c-48b7-a36a-da29a70ea75e',4),('4d434072-abd7-41aa-bd32-d7c5a822825c',4),('51821bd7-4ce3-4712-a77f-9b9650554e23',4),('5af62047-8aab-4e2c-881e-e234990a5aca',4),('5d19d13b-1570-4e8c-952e-6899d6139983',4),('5f8fd70c-dd84-4f5f-aa80-69aab3b6e70d',4),('613c5002-1181-4b85-b83c-9e2575f0cce6',4),('632255e1-cdf5-41ac-aa65-12e4223256bd',4),('66bfc759-13f1-47d1-980c-90678a9e2863',4),('67cf45be-29c8-48b3-9862-89619b60db70',4),('6c513c8d-ecaa-4a5a-b1bb-78002c851a9d',4),('6edbc8cc-9448-4a9c-a5c0-bf33c61503ca',4),('6f494f82-77ff-405c-bd75-e77c803f9255',4),('752f1911-2466-4fb0-a9d7-de698e0c69a4',4),('7ecf389d-ee81-41bd-ac9b-ac3f3d071986',4),('8450e4f0-75b4-4e02-bfab-5e132898cde9',4),('858a3ca0-f56b-447f-993b-6e8a3ad1267a',4),('88650e70-5cd4-40a6-87b9-bc72b30e064b',4),('8a9bdd20-ab3b-4240-b19c-bbba1e10b977',4),('8bd2c6c5-d34c-4bc8-a6f0-a8096cd48f90',4),('95c97086-9687-4303-ae15-ab9cbde2c394',4),('975cbcf0-4076-4732-8bae-e54a6f2b02ef',4),('9990ac15-957f-4ae8-a95e-ca18e7b9a835',4),('9a6ef5e3-e763-4801-bc38-4b982d00d0d2',4),('9c45d42e-8f12-4347-9050-2e2a3ab0cd64',4),('9d66a519-026e-4260-9191-38eca4e5c4df',4),('9f317599-d135-45a9-86f6-498060b95a16',4),('a286c551-0111-4074-8c88-d28a6d64fc00',4),('a5ed901c-fa11-44e3-971e-845452ecc5e8',4),('a8126e30-4211-404e-9596-8d7323ec4dd9',4),('ab105bc3-0126-4e51-bb21-f683786dfc21',4),('b61cd0b1-170a-4288-820c-35592a87ccf1',4),('c75bff36-9abc-46cb-bfdc-74f367e74725',4),('c8c6ef76-0c32-4d9c-8274-359b719de332',4),('cde16d2c-34eb-4941-aaff-950647fd3470',4),('d0b345a8-f882-41c6-931a-f98703486baf',4),('ecfabb12-f1b7-4af6-81ab-11f04e598c7f',4),('f82d9042-6180-4a82-b4b2-56c5db53cffc',4),('ff954a5a-2dab-47d7-99cb-bbe7e734fc26',4);
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

-- Dump completed on 2021-03-03 14:18:26
