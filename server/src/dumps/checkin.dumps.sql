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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (2,'א\'1',1),(3,'ב\'5',1),(4,'א\'2',1),(5,'ד\'4',1);
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
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
INSERT INTO `classroom_game` VALUES (2,6),(2,7);
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
  `gameId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3eba8e668001b7e4313de7d0fc5` (`gameId`),
  CONSTRAINT `FK_3eba8e668001b7e4313de7d0fc5` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'תמונה','image','/image/8OnReYSs8dGBCPf23DlyDRY0tQHS9p6E.jpg',1,6),(2,'בחירה','choice','[\"גכ\",\"\",\"\",\"גה\",\"הב\"]',3,6);
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
  `description` varchar(30) NOT NULL,
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  `game_name` varchar(30) NOT NULL,
  `requirements` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'njs','/image/xdpFEQovlQ7OYfeMLi6iJHE6jkroIQpx.jpg',_binary '\0','xs',''),(2,'a xm','/image/qc0TxJ6wJ2ZUnoND3AByuP8kDZXC4LLc.jpg',_binary '\0','msk',''),(3,'sajn','/image/NqYZ75jPvhfB5x12YRBnbGlhdK3FWlSU.jpg',_binary '\0','znkjxsa',''),(5,'מחדשמס','/image/SELQ9vharyefeCWO8EV7yV2b7iI2l22t.jpg',_binary '\0','סדלחמס',''),(6,'תמונה','/image/3ADQMVqDP4Ls802QquIUHFhpCv5SW5Xy.jpg',_binary '\0','תמונה',''),(7,'במגלח','/image/UWptlfm0MUZon5GK4BrB69bvj1M6iiN2.jpg',_binary '\0','משחק חדש','במגלד');
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
INSERT INTO `student_classroom` VALUES (2,'632255e1-cdf5-41ac-aa65-12e4223256bd');
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
INSERT INTO `teacher_classroom` VALUES (2,'177ee1c5-8f39-4f2b-8b4c-4a232311a328'),(2,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(2,'67cf45be-29c8-48b3-9862-89619b60db70'),(2,'a3d5ebab-5e26-4f98-9bee-fe7d2de385e9'),(3,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(4,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1'),(5,'26cbcf71-9cf6-4d60-93e4-a717dbe53bb1');
/*!40000 ALTER TABLE `teacher_classroom` ENABLE KEYS */;
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
  `school_id` int DEFAULT NULL,
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
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
INSERT INTO `user` VALUES ('177ee1c5-8f39-4f2b-8b4c-4a232311a328','teacher1@gmail.com','$2b$10$XBRfSiZqRTSsLPOYo4rTqec0k5s7s1SgRMo6eH3vO/LDjVmKAP3xm','2021-01-11 12:32:15.805489','2021-01-11 12:32:15.805489','Teacher',1,'אלזה','סבג'),('26cbcf71-9cf6-4d60-93e4-a717dbe53bb1','teacher100@gmail.com','$2b$10$zXiEp69aM/RSn6LUaZjTfegDSq4nQkP4nCd/rqP8GFybc./XLof4m','2021-01-03 16:42:07.397311','2021-01-03 16:42:07.397311','Teacher',1,'שירה','גולשטיין'),('59926edc-8509-4b9e-bced-45cb43fb5697','superadmin@gmail.com','$2b$10$y9Hh7oS6BER1JV9HAoYNhuRKRRIeCRVu24g82q2ama3Sd.7UmS6i2','2021-01-03 13:35:37.312446','2021-01-03 13:35:37.312446','SuperAdmin',NULL,NULL,NULL),('632255e1-cdf5-41ac-aa65-12e4223256bd','student111@gmail.com','$2b$10$D5hvdCaNJ56GQHPcxTvEfub5mf/nlQ.Xck2WqfEzCGGgqEMNFJNbq','2021-01-03 13:35:52.565108','2021-01-03 13:35:52.565108','Student',2,'בת ציון','רוז'),('67cf45be-29c8-48b3-9862-89619b60db70','student1@gmail.com','$2b$10$V0fw1JScS9YBTmWhWyblCutYQqGDaER7v5uYhL.LPMbte0zBbcp0G','2021-01-03 14:52:51.936521','2021-01-03 14:52:51.936521','Student',1,'אלעד','ראובני'),('a3d5ebab-5e26-4f98-9bee-fe7d2de385e9','teacher2@gmail.com','$2b$10$1HPNS.bg58p7o/4AnpCVmuB2pp/Ea4N6Ychafnmo2hg4qMxUk7bO.','2021-01-11 12:32:35.222899','2021-01-11 12:32:35.222899','Teacher',1,'רון','איסר');
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
INSERT INTO `user_role` VALUES ('59926edc-8509-4b9e-bced-45cb43fb5697',1),('177ee1c5-8f39-4f2b-8b4c-4a232311a328',3),('26cbcf71-9cf6-4d60-93e4-a717dbe53bb1',3),('a3d5ebab-5e26-4f98-9bee-fe7d2de385e9',3),('632255e1-cdf5-41ac-aa65-12e4223256bd',4),('67cf45be-29c8-48b3-9862-89619b60db70',4);
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

-- Dump completed on 2021-01-11 12:35:55
