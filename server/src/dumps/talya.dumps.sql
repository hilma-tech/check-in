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
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'א\'1',1),(2,'ב\'3',1),(3,'ה\'2',1),(4,'ב\'1',1),(12,'ג\'4',1),(13,'ד\'2',1),(14,'ה\'1',1),(15,'ו\'3',1),(16,'ז\'2',1),(17,'ח\'1',1),(18,'ט\'3',1),(19,'י\'2',1),(20,'י\'1',1),(21,'א\'3',1),(22,'ב\'4',1);
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
  `game_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_ef6001153b3d1baf00d4307607c` (`classroom_id`),
  KEY `FK_28211bf7506a8fd301f86988bb2` (`field_id`),
  KEY `FK_f7031ca819f3f79983273dd25cf` (`game_id`),
  CONSTRAINT `FK_28211bf7506a8fd301f86988bb2` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`),
  CONSTRAINT `FK_ef6001153b3d1baf00d4307607c` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`),
  CONSTRAINT `FK_f7031ca819f3f79983273dd25cf` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_field`
--

LOCK TABLES `classroom_field` WRITE;
/*!40000 ALTER TABLE `classroom_field` DISABLE KEYS */;
INSERT INTO `classroom_field` VALUES (11,'bgvf',1,14,NULL),(14,'ssssssss44444444',13,12,33),(15,'fgrfds',13,13,33),(26,'/image/mbMweAWZdxCQ2OwXeblDB24qBMymjSQE.jpg',13,21,37),(27,'4יאעקכרקר',1,16,36),(28,'[\"בבגדג\",\"כגד\",\"דגכ\",\"גדכ\",\"כגד\",\"גכד\"]',1,20,36),(29,'איטר45אר',1,19,36),(30,'/image/s6CJNm1VSVFTNUPeCfy866rzvqmGY3nB.png',1,17,36),(31,'[\"cdsc\",\"קכ\",\"גדגדכד\",\"ק\",\"כגדגד\",\"גדכגכגדכגד\"]',1,18,36);
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
INSERT INTO `classroom_game` VALUES (1,34),(1,36),(13,30),(13,33),(13,37);
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
INSERT INTO `field` VALUES (12,'ewfcds','text','ssssssss',1,33),(13,'cs','text','fgrfds',2,33),(14,'etnhyrrgfds','text','bgvf',1,34),(15,'h','text','rgbvf',1,35),(16,'גחםדשןח','text','4יאעקכרקר',1,36),(17,'אקעכקא','image','/image/s6CJNm1VSVFTNUPeCfy866rzvqmGY3nB.png',5,36),(18,'קאערענכה','multi-choice','[\"cdsc\",\"קכ\'ג\",\"גדגדכד\",\"ק\'רכד\",\"כ\'כגדגד\",\"גדכגכגדכגד\"]',7,36),(19,'כדגש43ט5','text','איטר45אר',9,36),(20,'עכגד','choice','[\"בבגדג\",\"כגד\",\"דגכ\",\"גדכ\",\"כגד\",\"גכד\"]',3,36),(21,'הכגזד','image','/image/mbMweAWZdxCQ2OwXeblDB24qBMymjSQE.jpg',1,37);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (30,'משחק נחמד מאוד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(33,'משחק אקראי','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(34,'vgjhc x','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(35,'dxtryghj','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(36,'משחק ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL),(37,'קכגד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL);
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
INSERT INTO `student_classroom` VALUES ('01ee99fa-9d9c-46ad-9228-68d1767361a1',1),('0a23b7ab-d646-4e44-8717-2d7665175457',1),('0bd6787c-449a-4c55-b49e-721e37e8b7cc',1),('0d28bd03-71ca-432d-afcb-8f5d8d4b297e',1),('1254035b-7074-45c6-88d6-1726f06be15e',1),('1332ba4e-294b-4b57-8dd3-b7b794e93916',1),('15b84897-ea51-4637-869a-a6e36f656b59',1),('16d708b1-f8ef-40da-99e2-e367adf551cd',1),('1d3b0df0-4fb9-4e53-9f6c-485d42d63c85',1),('1ed516b4-1198-460a-b172-94a4cd55efad',1),('213c6029-7e09-4545-bfa2-73d57a8b0278',1),('27b42b3b-ca31-4325-8bf4-1d5cb313e04f',1),('2dcbe0c8-67b3-438d-a912-8a58f9e70314',1),('357091cf-99da-44e2-a88a-9f01cf0f2c96',1),('38c5481e-51f1-4c1f-85da-97f2407f6dd5',1),('3d653cdf-565d-415b-a3e9-88f35b44ebba',1),('4064a4f0-5be3-4707-8038-eebec4bc71ff',1),('40a7f3da-42c6-453d-88e1-043306105075',1),('41792bb4-7ec1-4007-b022-259d60b5bf6f',1),('46c0ecc5-3ba0-4ec1-9fdb-1d1c0243d627',1),('49379026-0df7-4feb-bf4c-dc5e9aa7d395',1),('553e90d8-fb31-4cf2-bad4-672041858f14',1),('5e3cb28c-1da6-4c79-8278-f0cf50f20bd2',1),('5ef6e076-1533-43bd-88bc-d23706ff0fa0',1),('733ace70-b5b3-43c2-8dae-4821b30663b7',1),('778e33fc-0e21-4f00-8b46-b9128e0f6693',1),('7faeac48-e7d1-4325-b8a3-ee7be229a748',1),('897afb08-d0f6-4d76-8c57-8d568a401c8c',1),('923efabc-768b-4f1e-b3a8-9108ac4180e4',1),('9494ef70-2217-4b85-a0e0-f70e33ae8d74',1),('969bf635-7a1a-4d0e-8908-359e0cb4ce36',1),('a03ac7a2-0f47-48d7-955d-06dd29bcc34a',1),('a41f49fd-b319-45d6-be47-a6a456c81adf',1),('a52ed175-11ef-474c-b141-cb89fe55eea4',1),('a55c082a-e23a-432e-b9a8-58a4ef42354f',1),('a5964bef-a4e1-43f2-853a-85ee4b99c5fa',1),('b526fcd3-df11-4358-b1ef-e199355e8e66',1),('b908eecd-bcb6-4d7b-8332-9e2c1ad1019c',1),('bd1d8475-b727-420a-9ac4-f7ab47a3de1a',1),('c6a721d7-34b0-4ffc-bfc0-0fca70976ee1',1),('c8c64e13-dd3d-4318-96f7-cd37854f2909',1),('cb8dc71c-75d6-425a-976b-b77fe63c8e5a',1),('cebc7d34-9eb4-494e-b00f-e83faa697e08',1),('cf8b324e-a5c1-4212-8708-f39219dde2b7',1),('d0b16e09-a16d-4382-bf7a-af92fdb42712',1),('e200ab4c-a4b5-4a7e-859f-b3583cf1d547',1),('e461920b-b018-454c-8eee-952022f583fe',1),('e56e835e-0233-48fc-a799-f4fb6836121a',1),('e7f4ecd9-c7ec-42a2-9753-0ab2f59d17c2',1),('f451ccf4-bb16-4461-adaa-e03ab2f6a55d',1),('f904bf21-0f04-4141-8d2d-7087e00f22d4',1),('f9794d1e-09a4-4916-b2c3-730f488aa3b7',1),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',1),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',2),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',3),('0a987c38-da62-4fe3-9855-e2daa5c80f17',4),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',4),('a4ff784f-b3bf-4bff-aa34-43c2e8c65f7e',12),('bb3195bf-a84d-4cfb-a049-25bd739e8218',12),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',12),('0a987c38-da62-4fe3-9855-e2daa5c80f17',13),('9b0a1e7d-7004-4ca7-9f9d-9166269cdb3b',13),('c5e14294-493b-4f31-8702-77ff8f3d8c67',13),('cc90aee3-d6a2-4c7c-acba-054c8421877f',13),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',13),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',14),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',15),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',16),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',17),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',18),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',19),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',20),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',21),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',22);
/*!40000 ALTER TABLE `student_classroom` ENABLE KEYS */;
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
INSERT INTO `teacher_classroom` VALUES (1,'4ed98b3e-389b-4618-a4be-77f4e17eb94f'),(1,'a31234d5-319b-4f71-8291-fd4123fc0d86'),(1,'ad4aefb2-7fe6-4c19-b1da-5e52a69f5e08'),(2,'a31234d5-319b-4f71-8291-fd4123fc0d86'),(3,'d0c0bada-7f3b-454b-90ee-701452beb898'),(4,'4ed98b3e-389b-4618-a4be-77f4e17eb94f'),(4,'59883cff-d50f-4e76-89f7-d071f38eea09'),(4,'60d96602-801c-4234-a2b4-e0683f13cdce'),(4,'a31234d5-319b-4f71-8291-fd4123fc0d86'),(12,'a31234d5-319b-4f71-8291-fd4123fc0d86'),(13,'a31234d5-319b-4f71-8291-fd4123fc0d86');
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
  `school_id` int DEFAULT NULL,
  `verificationToken` varchar(150) DEFAULT NULL,
  `emailVerified` tinyint DEFAULT '0',
  `first_name` varchar(30) DEFAULT NULL,
  `last_name` varchar(30) DEFAULT NULL,
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
INSERT INTO `user` VALUES ('01ee99fa-9d9c-46ad-9228-68d1767361a1','kutyrt','$2b$10$9o3qqgJX08niNYT6jJh3oeYXEzRZVUQ/hNnew.JYG1cO.n3FJ9Pni','2021-03-14 11:38:20.923350','2021-03-14 16:14:25.000000','Student',1,NULL,0,NULL,NULL),('0a23b7ab-d646-4e44-8717-2d7665175457','eyumfadf','$2b$10$.SQ8PbdNVEkgnErHE11cJO/9cDMTLQvA84zN50ATWKnnfg9.BlIT2','2021-03-14 11:38:22.844321','2021-03-14 11:38:22.844321','Student',1,NULL,0,NULL,NULL),('0a987c38-da62-4fe3-9855-e2daa5c80f17','yhtvwvvdd','$2b$10$yHYXhobL.IjfKB1UX/qOPuTSdrXxPCzzDjug2QD7Zwloy6NsuByOC','2021-03-10 11:55:53.804903','2021-03-11 13:55:01.000000','Student',1,NULL,0,NULL,NULL),('0bd6787c-449a-4c55-b49e-721e37e8b7cc','mhnbgsrhy','$2b$10$UhK..rJnG7AI5ESzrHOZ0.C9ql36gV5FuZGU66ZSxWfu.Q8tWVu9m','2021-03-14 11:38:21.255832','2021-03-14 11:38:21.255832','Student',1,NULL,0,NULL,NULL),('0d28bd03-71ca-432d-afcb-8f5d8d4b297e','greagrn','$2b$10$p4LkzmEhqCdjOKl1EFKKMu52X.yABnLhZticM5m8dXt1bBmCayZSO','2021-03-14 11:38:20.419917','2021-03-14 11:38:20.419917','Student',1,NULL,0,NULL,NULL),('1254035b-7074-45c6-88d6-1726f06be15e','hgcjhdghf','$2b$10$8MlYa3MWzlELiy8XEYcNQ.UwVBLoKTvvOAM9T4FCkn0YsM5V/r5wm','2021-03-14 11:38:21.752526','2021-03-14 11:38:21.752526','Student',1,NULL,0,NULL,NULL),('1332ba4e-294b-4b57-8dd3-b7b794e93916','fghfgd','$2b$10$b/3Ip5K8kyybSxgz3O2reewmw0dT87jcW.Y5/BsugEpJx2MgRUBUq','2021-03-14 11:38:22.256900','2021-03-14 11:38:22.256900','Student',1,NULL,0,NULL,NULL),('15b84897-ea51-4637-869a-a6e36f656b59','vtzwgae','$2b$10$qtU8BuqshQv6VMx3WUL2/.v.y30cV3m2o/G25akFsW2SqrieM/2M2','2021-03-14 11:38:19.993859','2021-03-14 11:38:19.993859','Student',1,NULL,0,NULL,NULL),('16d708b1-f8ef-40da-99e2-e367adf551cd','greag','$2b$10$NcLwXQClpRnGt1gLq5D.LekFPsmS7VQbJvhI/OcmYmprk1dEcZorW','2021-03-14 11:38:20.332547','2021-03-14 11:38:20.332547','Student',1,NULL,0,NULL,NULL),('1d3b0df0-4fb9-4e53-9f6c-485d42d63c85','fewewdfz','$2b$10$2lGJ3dK3emoN5g2h7X2bhOLyZdAqPqynu0ndAz4MfOzR7TYhuJ/8i','2021-03-14 11:38:19.737552','2021-03-14 11:38:19.737552','Student',1,NULL,0,NULL,NULL),('1ed516b4-1198-460a-b172-94a4cd55efad','mbvc','$2b$10$xxrcq1jIU5wFRnyg2fInyeOwil0NLhYfDB27D85OCmKJk2kuzaZUW','2021-03-14 11:38:21.674175','2021-03-14 11:38:21.674175','Student',1,NULL,0,NULL,NULL),('213c6029-7e09-4545-bfa2-73d57a8b0278','cjkfdjhvkdj','$2b$10$Ypvf9BWo4Dl781HRCw0ojOJ./iDuE0kuc4FsykgJVw3dNfR5Rtbl2','2021-03-14 11:41:57.270314','2021-03-14 11:41:57.270314','Student',1,NULL,0,NULL,NULL),('27b42b3b-ca31-4325-8bf4-1d5cb313e04f','Taejfudfg','$2b$10$ZbVBFiSB1Gn3n0L/nGjtjuE9mjh7fYBuAGpLrSyN.MudjmE6hh/uK','2021-03-14 11:41:57.187081','2021-03-14 11:41:57.187081','Student',1,NULL,0,NULL,NULL),('2dcbe0c8-67b3-438d-a912-8a58f9e70314','fhgfxfghgn','$2b$10$T/qKLQTMQ6rkG5yjc9W7Su5oVeGTGig1t.Q1TVkKZE9E9SbCkC03W','2021-03-14 11:38:21.837803','2021-03-14 11:38:21.837803','Student',1,NULL,0,NULL,NULL),('357091cf-99da-44e2-a88a-9f01cf0f2c96','dsfsdfds','$2b$10$vdlK.SePH0dr9XcCkmBN3eQv5W3G/iq3hXHd9bs/1/OqggxS0C2..','2021-03-14 11:41:57.104435','2021-03-14 11:41:57.104435','Student',1,NULL,0,NULL,NULL),('38c5481e-51f1-4c1f-85da-97f2407f6dd5','nfumhngf','$2b$10$V1.RSJl/00pBRmOKWwsV2e4TwSo5sagb/xZxoTarPzZqzvdGByqHq','2021-03-14 11:38:21.921027','2021-03-14 11:38:21.921027','Student',1,NULL,0,NULL,NULL),('3d653cdf-565d-415b-a3e9-88f35b44ebba','utdmh','$2b$10$VM/DO.ozunat/hl/U0p2UOJlaQhpDUt0O25dvd8ssG40j5TQp7wxG','2021-03-14 11:38:21.338602','2021-03-14 11:38:21.338602','Student',1,NULL,0,NULL,NULL),('4064a4f0-5be3-4707-8038-eebec4bc71ff','taejdfg','$2b$10$W2j3oWWGU50Dtiu7l4bfV.qxbmj1H0yawLJdX3e2O/Iruk24Gs8KS','2021-03-14 11:38:20.166794','2021-03-14 11:38:20.166794','Student',1,NULL,0,NULL,NULL),('40a7f3da-42c6-453d-88e1-043306105075','yturytnhx','$2b$10$EYjamxlyDJKHlpBjNwgs4u2fUTyTyiUzAiwu6jUyKBU92SEHZ7PwG','2021-03-14 11:38:21.588649','2021-03-14 11:38:21.588649','Student',1,NULL,0,NULL,NULL),('41792bb4-7ec1-4007-b022-259d60b5bf6f','dfgfdfg','$2b$10$Njk6LuBJJC0LXLPuC3qsrO5.b/6gxKeSeq8YZIpgmStj0E/fsBzO2','2021-03-14 11:38:20.504272','2021-03-14 11:38:20.504272','Student',1,NULL,0,NULL,NULL),('46c0ecc5-3ba0-4ec1-9fdb-1d1c0243d627','mjnhfg','$2b$10$wFaIH53AuOSOSA7RjZe1h.hU4kNqvSvPafUh2xP.DsCdKWQ.6Nxv6','2021-03-14 11:38:22.004968','2021-03-14 11:38:22.004968','Student',1,NULL,0,NULL,NULL),('49379026-0df7-4feb-bf4c-dc5e9aa7d395','rtrtrtrtrtדגכד','$2b$10$2G5W/Wm.SOMfM8AowMCke.8QlaCI4jOVSvmR19ny03eJ7fEXovOva','2021-03-14 13:04:44.983326','2021-03-14 13:04:44.983326','Student',1,NULL,0,NULL,NULL),('4b92f0c7-5c17-4df5-935b-a80e76000e6b','ckfsdfcksnf','$2b$10$iOeTMiJsdqCoju0GLIVyXuFLhpjMbpi3kTJSzBHebJBazFsacntEG','2021-03-17 13:55:28.346401','2021-03-17 13:55:28.346401','Student',1,NULL,0,NULL,NULL),('4ed98b3e-389b-4618-a4be-77f4e17eb94f','talya1eitan@gmail.com','$2b$10$o70LizKCVpkZ57CNaZb.AOo5uGf4gyJbCypP4dGkzAzsvTU.4ozTi','2021-03-17 16:03:29.154177','2021-03-17 16:03:47.000000','Teacher',1,NULL,1,NULL,NULL),('553e90d8-fb31-4cf2-bad4-672041858f14','gfdhsenb','$2b$10$7yeyTvXzD6aANOFZQ02RcOFTLfN5i/pDNuCDU6SzFCuKMQS.HQIb6','2021-03-14 11:38:20.674056','2021-03-14 11:38:20.674056','Student',1,NULL,0,NULL,NULL),('59883cff-d50f-4e76-89f7-d071f38eea09','gyfshdk@gmail.com','$2b$10$5U5NU7z2owk0Hm9q03hU4uyXQfsRHVlt.JSmklB7lXmycLn0w9iYu','2021-03-17 12:59:40.063912','2021-03-17 12:59:40.000000','Teacher',1,'fe0dbf05911fa865fc850091c0b15e03e2692303b6b3b61e924f65c1257f79cf2de928cf913b3dd1da1e4e581783b3a741be',0,NULL,NULL),('5e3cb28c-1da6-4c79-8278-f0cf50f20bd2','etjrngz','$2b$10$V1ucg8DBDGSmEXe2HS.AEuU226cBkfFO41qgREaMZngXUKaoqAy3O','2021-03-14 11:38:21.170340','2021-03-14 11:38:21.170340','Student',1,NULL,0,NULL,NULL),('5ef6e076-1533-43bd-88bc-d23706ff0fa0','junhg','$2b$10$1XmmMLk.84yuNwSUKJMaBuRtNLe4xV9aBm88NaJM2AzIybeIFsKL.','2021-03-14 11:38:21.005230','2021-03-14 11:38:21.005230','Student',1,NULL,0,NULL,NULL),('60d96602-801c-4234-a2b4-e0683f13cdce','thds@gmail.com','$2b$10$8o1LHpPlaD4B84QYy.QLF.aeQFkCTEFsGfNGNaM6LqnpG3ZGpDpFm','2021-03-10 17:14:49.907192','2021-03-10 17:14:49.000000','Teacher',1,'6b5b0cb9a421717102142e1b2cb7151297892396921a4a72ffe043d538e91f31f39340001d7f57f3d47844272db074176770',0,NULL,NULL),('70df752c-744b-4ee2-ace4-e56da048b23e','superadmin@gmail.com','$2b$10$Th1aiBam/B9kQqGcJX/fM.E32DH1mB3TxB/yirmrhCC58uBiBdGqe','2021-01-03 12:30:56.415866','2021-01-03 12:30:56.415866','SuperAdmin',NULL,NULL,0,NULL,NULL),('733ace70-b5b3-43c2-8dae-4821b30663b7','jyrefd','$2b$10$uQo8XrePmi03skb38ZIxY.oDePYp9R/lPWHbnJo4JLWnqhyc7f9M.','2021-03-14 11:38:23.090336','2021-03-14 11:38:23.090336','Student',1,NULL,0,NULL,NULL),('778e33fc-0e21-4f00-8b46-b9128e0f6693','gfhggfdh','$2b$10$LNm8IGoX5wOpXkRspNcWKOiMzDojLy2BMFj5IZVPKQVB2VTuhUBVK','2021-03-14 11:38:22.503742','2021-03-14 11:38:22.503742','Student',1,NULL,0,NULL,NULL),('7faeac48-e7d1-4325-b8a3-ee7be229a748','hdhhgfd','$2b$10$4UHnpYurXnCfh31sna9qC.4/kKcz4VvtDv.acVYjjumv2PEkMghmu','2021-03-14 11:38:22.421505','2021-03-14 11:38:22.421505','Student',1,NULL,0,NULL,NULL),('897afb08-d0f6-4d76-8c57-8d568a401c8c','grvfcdsx','$2b$10$kkRhlzztmkA97V8npfrsbea7DzRpTBCZkHjS2DUW0Mvi902ZfkGTq','2021-03-14 11:41:56.847737','2021-03-14 11:41:56.847737','Student',1,NULL,0,NULL,NULL),('923efabc-768b-4f1e-b3a8-9108ac4180e4','hgfdfghgfjut','$2b$10$AGGGsNlKt3iThnQPouFNGO2ipEXwwTId360a8EIFfOzrME9HLsJmW','2021-03-14 11:38:22.674563','2021-03-14 11:38:22.674563','Student',1,NULL,0,NULL,NULL),('9494ef70-2217-4b85-a0e0-f70e33ae8d74','gfdsgfdgjty','$2b$10$bzQ4kz9DCObMIsCekFK7LO4xJciQE3GPpvnbyUNVOGYOEBE9qlEaq','2021-03-14 11:38:20.842345','2021-03-14 11:38:20.842345','Student',1,NULL,0,NULL,NULL),('969bf635-7a1a-4d0e-8908-359e0cb4ce36','ghfdfgh','$2b$10$s08L2ztmlGrku0GOO.ol5.X4NMFTBOWXXnrzaneefaeE77Lqsfv8i','2021-03-14 11:38:22.584074','2021-03-14 11:38:22.584074','Student',1,NULL,0,NULL,NULL),('9b0a1e7d-7004-4ca7-9f9d-9166269cdb3b','swdegevfa','$2b$10$MmihWj65HyqXsJnUm4eXrutbhm8RQ73vI8nfEbeUP3IagnXelVw4O','2021-03-11 10:41:54.656094','2021-03-11 16:23:46.000000','Student',1,NULL,0,NULL,NULL),('a03ac7a2-0f47-48d7-955d-06dd29bcc34a','ewrrerew','$2b$10$/qp0Y9bEiR1AiMh9gbRcIeoYA.LKtdA2sSalg.dCs9I4OV/oZ9RMW','2021-03-14 11:38:22.926091','2021-03-14 11:38:22.926091','Student',1,NULL,0,NULL,NULL),('a31234d5-319b-4f71-8291-fd4123fc0d86','ftx@gmail.com','$2b$10$qStp2HVOuLHht3rzhh1z0e2XylZWwBKgy/JSmeTjD8ZkPEWmPr9Bi','2021-03-10 17:47:43.600967','2021-03-10 17:47:43.000000','Teacher',1,'19e778a8b621a43bfc9b6c7c6ae6e56c93b91646d12f5e62112468fa665fa4cde9bd326a4f4d5f8669e549b536b0af110df6',0,NULL,NULL),('a41f49fd-b319-45d6-be47-a6a456c81adf','fdfghsesgb','$2b$10$.NE9PbD08IRSx3kcC/.s8ObVrhKVKbVpMeYjWAEKSRDHmqucdyPGS','2021-03-14 11:38:20.250400','2021-03-14 11:38:20.250400','Student',1,NULL,0,NULL,NULL),('a4ff784f-b3bf-4bff-aa34-43c2e8c65f7e','rtrtrtrtrtrtrr','$2b$10$AWQLWDODFiQECZuBmWZjje7B6DyfWPTYq/PXvNvTCJeQv/tDCT0Ze','2021-03-14 12:38:19.241237','2021-03-14 12:38:19.241237','Student',1,NULL,0,NULL,NULL),('a52ed175-11ef-474c-b141-cb89fe55eea4','snjcmklcfgbdjs','$2b$10$Dj1CSpu.eb4.5zGMZ2TDYuD2dKMP/b3GkyAxKT6V1EhdwZox0WpsC','2021-03-14 11:30:31.424770','2021-03-14 11:30:31.424770','Student',1,NULL,0,NULL,NULL),('a55c082a-e23a-432e-b9a8-58a4ef42354f','ghdghhfg','$2b$10$don/XrECa9Ia1gB88rXc7.v/3yZ3ZXXM4UzGxRUdv2uyl/FfCou.m','2021-03-14 11:38:22.171611','2021-03-14 11:38:22.171611','Student',1,NULL,0,NULL,NULL),('a5964bef-a4e1-43f2-853a-85ee4b99c5fa','nrhtrghj','$2b$10$A3FsuXv/uzLdLErFmR54w.ztv1jwxUNlsKLcXTUmEMN3C9vgkeAm.','2021-03-14 11:38:22.336741','2021-03-14 11:38:22.336741','Student',1,NULL,0,NULL,NULL),('ad4aefb2-7fe6-4c19-b1da-5e52a69f5e08','fewdsc@gwds.coms','$2b$10$dU9aJn3cIyoIrT.6ht1LGedF7wiqBmsm.FlO0Zmmu0klpEz16LYTm','2021-03-17 17:12:16.644364','2021-03-17 17:12:16.000000','Teacher',1,'dcb5add9f5711aa381c9639f787a83819fc702943e2610fab26fab3963b3a2568c27d100d5a29af47b96336c6839dbd0f0f3',0,NULL,NULL),('b24e65e6-fb0d-41a5-82b0-ca348acd23c4','435אקכהד','$2b$10$88IuD21mML5kyFS.ESoChOqnAx5cBRj95.6HH9MkoiCrqP64uj./C','2021-03-14 13:05:17.641870','2021-03-14 13:05:17.641870','Student',1,NULL,0,NULL,NULL),('b526fcd3-df11-4358-b1ef-e199355e8e66','htefvehtwtgf','$2b$10$P5WOa9CS1kQ53ghxbiGyLeM9COtXwBScTHIIpqOTlV7oXoW8JgBQ.','2021-03-14 11:41:56.931229','2021-03-14 11:41:56.931229','Student',1,NULL,0,NULL,NULL),('b908eecd-bcb6-4d7b-8332-9e2c1ad1019c','gdxghgd','$2b$10$lbtQWYwdesxQmNImoU0SMOXAAKAfGyutYkKRmuykCXQn0VoqfVWYa','2021-03-14 11:38:20.762227','2021-03-14 11:38:20.762227','Student',1,NULL,0,NULL,NULL),('bb3195bf-a84d-4cfb-a049-25bd739e8218','בגהככקבד','$2b$10$h63rrw124nkOwfCOXjeHb.P2VoSbfVpiSVAqza4scYvsWai6N5hki','2021-03-11 15:56:47.995114','2021-03-11 15:56:47.995114','Student',1,NULL,0,NULL,NULL),('bd1d8475-b727-420a-9ac4-f7ab47a3de1a','mjnhfbgdf','$2b$10$U3NWutflaUwTeP04FncW5OxF.QaYvvAopVfvFgVBcYYYpaFZ.evB.','2021-03-14 11:38:21.088481','2021-03-14 11:38:21.088481','Student',1,NULL,0,NULL,NULL),('c5e14294-493b-4f31-8702-77ff8f3d8c67','talyaeitan','$2b$10$fEWCvr5wL2LzsNy4sFdrmeSgINSKfzYWLoWK3kB8juQUe..7nHhEm','2021-03-10 11:55:29.714567','2021-03-11 15:41:01.000000','Student',1,NULL,0,NULL,NULL),('c6a721d7-34b0-4ffc-bfc0-0fca70976ee1','bfcdxs','$2b$10$iu0yUr2VtLKSE0s1N3JkDu1TD.g3EmVnZu2ctNLSk8WNIpMDVgxtO','2021-03-14 11:41:56.682573','2021-03-14 11:41:56.682573','Student',1,NULL,0,NULL,NULL),('c8c64e13-dd3d-4318-96f7-cd37854f2909','mhdt','$2b$10$D.92p4S.fJqYYwsQUuoxsO4DAFVMqALiF4lXzgaCdhP000wCXlwGa','2021-03-14 11:38:21.422661','2021-03-14 11:38:21.422661','Student',1,NULL,0,NULL,NULL),('cb8dc71c-75d6-425a-976b-b77fe63c8e5a','gfrds','$2b$10$HSMsG1I9QSYZWU9kLeh/7u25R0SSG.yn4rPmfbl386eQNjdM7AvZy','2021-03-14 11:41:56.767865','2021-03-14 11:41:56.767865','Student',1,NULL,0,NULL,NULL),('cc90aee3-d6a2-4c7c-acba-054c8421877f','dsfsdfsdfds','$2b$10$iOIf60p0fWmlMTErlT.S2O6Qjx01RqRdUngV02X72lfpmTm7w35pi','2021-03-11 10:42:13.648231','2021-03-11 10:42:13.648231','Student',1,NULL,0,NULL,NULL),('cebc7d34-9eb4-494e-b00f-e83faa697e08','xcwqtryh','$2b$10$.N6BImPngF2pcmEps86LA.xfY2k85.nYncqhGP4ZCYaU1LL0tZj1C','2021-03-14 11:38:23.011003','2021-03-14 11:38:23.011003','Student',1,NULL,0,NULL,NULL),('cf8b324e-a5c1-4212-8708-f39219dde2b7','ityute','$2b$10$26KKD9TF6QD8BPblKcqg3e.3SORzMuHBXQKJRVGGWdsZ7hyPOnpFC','2021-03-14 11:38:22.759527','2021-03-14 11:38:22.759527','Student',1,NULL,0,NULL,NULL),('d0b16e09-a16d-4382-bf7a-af92fdb42712','tgdsjuy','$2b$10$FuvrtXXqyg04IUxhDlPWDOizUWGHE/iB8pGF5zySuZT6qoXdbmCJ.','2021-03-14 11:38:21.505948','2021-03-14 11:38:21.505948','Student',1,NULL,0,NULL,NULL),('d0c0bada-7f3b-454b-90ee-701452beb898','gdsfx@gmail.com','$2b$10$0mgB84YuC7b4SNeKmICkgO/VYp3i2Mo/3Wuh5xgn5bDZAqUm3WuTa','2021-03-14 12:23:02.237721','2021-03-14 12:23:02.000000','Teacher',1,'03f9b1d16bf7dd9847c956dfc019d892ceaee157ed77ebfb67251142a6ad13444aa229a68b69312eece4adbf6e7cdb744864',0,NULL,NULL),('d9fdac43-ae08-4a0f-a2ff-b5ee84a99518','Cfcdfxlkmdfcfd','$2b$10$qah8nklJJAJFM60CWu3qZubD5RSskfGvKlCRzR6Elu13t/IX54prq','2021-03-14 11:30:31.532039','2021-03-14 11:30:31.532039','Student',1,NULL,0,NULL,NULL),('e200ab4c-a4b5-4a7e-859f-b3583cf1d547','rtyesyre','$2b$10$fw0knKxGMIGGl.ScC8emQOtilhLTBrF7LAd/VGV9q08dNtWc68wQa','2021-03-14 11:38:20.080490','2021-03-14 11:38:20.080490','Student',1,NULL,0,NULL,NULL),('e461920b-b018-454c-8eee-952022f583fe','evfcdwf','$2b$10$M4tV4OIhESflAIV0D.Wxp.evuxsupWysGX7NVvyBWUSbWrTAAo82m','2021-03-14 11:38:19.648393','2021-03-14 11:38:19.648393','Student',1,NULL,0,NULL,NULL),('e56e835e-0233-48fc-a799-f4fb6836121a','kuthgyrgfd','$2b$10$B7/iro15yVOhPMOlCn66SukUTM9hESldnHvyM/evq596aAZ5HgS32','2021-03-14 11:38:20.590194','2021-03-14 11:38:20.590194','Student',1,NULL,0,NULL,NULL),('e7f4ecd9-c7ec-42a2-9753-0ab2f59d17c2','hjbfjdvncj','$2b$10$r6JifxDkMBNXeZgPeQvW/.38XAQn7WpMsRpq2ZO2DKB43S7lzmLG.','2021-03-14 11:41:57.018122','2021-03-14 11:41:57.018122','Student',1,NULL,0,NULL,NULL),('e9cc720c-74c4-4e58-b987-fbd6ebfcc3ea','jifore@gmail.com','$2b$10$WlD8ySERVexZSlAhVcgvfua1oknVhADG1FJ/JbLRpFbs.XcGyzeiK','2021-03-10 17:45:40.628279','2021-03-10 17:45:40.000000','Teacher',31,'4e84a9c06eed526eac053dbc2cdca067ae3a80835f64e330ffc822c89afb4fd6d71c3dee32fec8b5d0ba722d6141e609758e',0,NULL,NULL),('ef5ce87e-200a-4630-aa7c-5feb3b91b94e','shira6657@gmail.com','$2b$10$Rsc6Rc2peGMHXsRz3mDPx.vpOXo0V0W8l.rBp.qt.9kFwbvKFGO9m','2021-03-10 16:13:10.777586','2021-03-10 16:13:10.000000','Teacher',31,'139290179cfd941611458c2861e0b064f130cdf568da27484b438c14a702d30565ffaf62b7186c471f8a87fa3c8e46f432d6',0,NULL,NULL),('f451ccf4-bb16-4461-adaa-e03ab2f6a55d','fadfrff','$2b$10$LhSs42TPKH9.blEUMQbl4.8QY5TjOTURM3u9TmYyBgLOLHvZ/TLmO','2021-03-14 11:38:19.909454','2021-03-14 11:38:19.909454','Student',1,NULL,0,NULL,NULL),('f904bf21-0f04-4141-8d2d-7087e00f22d4','ytsgnxhxd','$2b$10$o.27uKJ9hB0M3zYGiFGKH.por4wotkN.k7XWtseEjaZ3pIIy9B8Q6','2021-03-14 11:38:22.088174','2021-03-14 11:38:22.088174','Student',1,NULL,0,NULL,NULL),('f9794d1e-09a4-4916-b2c3-730f488aa3b7','cnfghj','$2b$10$wNB1xn.EskVxsq7nRUVcHe1kfuWVKfshXDGhLVTBC3Wkv6MEuVqrO','2021-03-14 11:38:19.824774','2021-03-14 11:38:19.824774','Student',1,NULL,0,NULL,NULL),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5','grrngbd','$2b$10$LQkfYchJd4BOYHfm7o3NwOnp3tVitPLk8IRBrSnIQg9WFuOhIIVy.','2021-03-14 12:51:35.570873','2021-03-14 12:51:35.570873','Student',1,NULL,0,NULL,NULL);
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
INSERT INTO `user_role` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e',1),('4ed98b3e-389b-4618-a4be-77f4e17eb94f',3),('59883cff-d50f-4e76-89f7-d071f38eea09',3),('60d96602-801c-4234-a2b4-e0683f13cdce',3),('a31234d5-319b-4f71-8291-fd4123fc0d86',3),('ad4aefb2-7fe6-4c19-b1da-5e52a69f5e08',3),('d0c0bada-7f3b-454b-90ee-701452beb898',3),('e9cc720c-74c4-4e58-b987-fbd6ebfcc3ea',3),('ef5ce87e-200a-4630-aa7c-5feb3b91b94e',3),('01ee99fa-9d9c-46ad-9228-68d1767361a1',4),('0a23b7ab-d646-4e44-8717-2d7665175457',4),('0a987c38-da62-4fe3-9855-e2daa5c80f17',4),('0bd6787c-449a-4c55-b49e-721e37e8b7cc',4),('0d28bd03-71ca-432d-afcb-8f5d8d4b297e',4),('1254035b-7074-45c6-88d6-1726f06be15e',4),('1332ba4e-294b-4b57-8dd3-b7b794e93916',4),('15b84897-ea51-4637-869a-a6e36f656b59',4),('16d708b1-f8ef-40da-99e2-e367adf551cd',4),('1d3b0df0-4fb9-4e53-9f6c-485d42d63c85',4),('1ed516b4-1198-460a-b172-94a4cd55efad',4),('213c6029-7e09-4545-bfa2-73d57a8b0278',4),('27b42b3b-ca31-4325-8bf4-1d5cb313e04f',4),('2dcbe0c8-67b3-438d-a912-8a58f9e70314',4),('357091cf-99da-44e2-a88a-9f01cf0f2c96',4),('38c5481e-51f1-4c1f-85da-97f2407f6dd5',4),('3d653cdf-565d-415b-a3e9-88f35b44ebba',4),('4064a4f0-5be3-4707-8038-eebec4bc71ff',4),('40a7f3da-42c6-453d-88e1-043306105075',4),('41792bb4-7ec1-4007-b022-259d60b5bf6f',4),('46c0ecc5-3ba0-4ec1-9fdb-1d1c0243d627',4),('49379026-0df7-4feb-bf4c-dc5e9aa7d395',4),('4b92f0c7-5c17-4df5-935b-a80e76000e6b',4),('553e90d8-fb31-4cf2-bad4-672041858f14',4),('5e3cb28c-1da6-4c79-8278-f0cf50f20bd2',4),('5ef6e076-1533-43bd-88bc-d23706ff0fa0',4),('733ace70-b5b3-43c2-8dae-4821b30663b7',4),('778e33fc-0e21-4f00-8b46-b9128e0f6693',4),('7faeac48-e7d1-4325-b8a3-ee7be229a748',4),('897afb08-d0f6-4d76-8c57-8d568a401c8c',4),('923efabc-768b-4f1e-b3a8-9108ac4180e4',4),('9494ef70-2217-4b85-a0e0-f70e33ae8d74',4),('969bf635-7a1a-4d0e-8908-359e0cb4ce36',4),('9b0a1e7d-7004-4ca7-9f9d-9166269cdb3b',4),('a03ac7a2-0f47-48d7-955d-06dd29bcc34a',4),('a41f49fd-b319-45d6-be47-a6a456c81adf',4),('a4ff784f-b3bf-4bff-aa34-43c2e8c65f7e',4),('a52ed175-11ef-474c-b141-cb89fe55eea4',4),('a55c082a-e23a-432e-b9a8-58a4ef42354f',4),('a5964bef-a4e1-43f2-853a-85ee4b99c5fa',4),('b24e65e6-fb0d-41a5-82b0-ca348acd23c4',4),('b526fcd3-df11-4358-b1ef-e199355e8e66',4),('b908eecd-bcb6-4d7b-8332-9e2c1ad1019c',4),('bb3195bf-a84d-4cfb-a049-25bd739e8218',4),('bd1d8475-b727-420a-9ac4-f7ab47a3de1a',4),('c5e14294-493b-4f31-8702-77ff8f3d8c67',4),('c6a721d7-34b0-4ffc-bfc0-0fca70976ee1',4),('c8c64e13-dd3d-4318-96f7-cd37854f2909',4),('cb8dc71c-75d6-425a-976b-b77fe63c8e5a',4),('cc90aee3-d6a2-4c7c-acba-054c8421877f',4),('cebc7d34-9eb4-494e-b00f-e83faa697e08',4),('cf8b324e-a5c1-4212-8708-f39219dde2b7',4),('d0b16e09-a16d-4382-bf7a-af92fdb42712',4),('d9fdac43-ae08-4a0f-a2ff-b5ee84a99518',4),('e200ab4c-a4b5-4a7e-859f-b3583cf1d547',4),('e461920b-b018-454c-8eee-952022f583fe',4),('e56e835e-0233-48fc-a799-f4fb6836121a',4),('e7f4ecd9-c7ec-42a2-9753-0ab2f59d17c2',4),('f451ccf4-bb16-4461-adaa-e03ab2f6a55d',4),('f904bf21-0f04-4141-8d2d-7087e00f22d4',4),('f9794d1e-09a4-4916-b2c3-730f488aa3b7',4),('fc20b7a4-78e2-43eb-8faf-c203585a0ff5',4);
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

-- Dump completed on 2021-03-18  8:47:21
