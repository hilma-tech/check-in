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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `class_field`
--

LOCK TABLES `class_field` WRITE;
/*!40000 ALTER TABLE `class_field` DISABLE KEYS */;
INSERT INTO `class_field` VALUES (1,'/image/gtFIowRh4u2EvHgenFC9hUNz3300aZtI.jpg',1,3);
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
INSERT INTO `classroom_game` VALUES (1,1),(1,2),(1,6),(1,8),(1,9),(1,11);
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'טאכ','text','יעה',1,3),(2,'בחירה','choice','[\"דגכמנ\",\"\",\"לגמ\",\"\",\"שלום\"]',1,8),(3,'תמונה','image','/image/gtFIowRh4u2EvHgenFC9hUNz3300aZtI.jpg',1,9),(4,'ךלזחכךלגדחכ','image','/image/1Sq3PrB0ut30N9YQ3F5QVT8LMUB5Svwa.jpg',1,11),(5,'zhjcxj','image','/image/eUJrfwgzUezM6gwi05IQl41KIJayTrzB.jpg',1,12),(6,'חנסב','image','/image/Fe9ZcgScXnGh99D7jfcnQF3YcAzZNIGY.jpg',1,13),(7,'יעח','text','חיחח',1,14),(8,'טאגטא','image','/image/sIz0Fxki6uLjc7rzBG6fce7PzRwDFBVA.jpg',2,14),(9,'יעכיעג','text','עכגעכגע',3,15),(10,'מצהצ','multi-choice','[\"יגי\",\"\",\"עיגע\",\"חכיחכ\"]',1,15),(11,'עכדעכד','image','/image/PNRHSz4xpv3KTJLbqxSbjHIe6oznSsj8.jpg',4,15),(12,'לבחהנתס','image','/image/acQyxu72QeMr50AnTo6xrM7zt3YNga1l.jpg',1,17),(13,'שחגכל','text','לחגנל',1,18),(14,'field the','text','the field',1,19);
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
  `description` varchar(30) NOT NULL,
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  `requirements` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'gcgf','resre','/image/ShVj7Yy9eGzFkYS5HTo0x1aJEKooODBm.jpg',_binary '\0',NULL),(2,'רקע','טכגט','/image/Eu3CwrlgcssFFrAZct6kGvKI0IZfbKoA.jpg',_binary '\0',NULL),(3,'טאכ','חיעח','/image/hgTJYeBO6XJCkXuh2yjISQuJpSnPefML.jpg',_binary '\0',NULL),(6,'טאכדכ','וע','/image/DDGdgk61ykeCCLcQidFRtgVj0dKkffbE.jpg',_binary '\0',NULL),(7,'גחבמ','לדחמ1','/image/cVnJXYzchqQkxZoIA0Qy59DUW225jmxI.jpg',_binary '\0',NULL),(8,'בחירה','גלדחכ','/image/KDjGwrBUMkSNVAJXutuevT0BOZ73FTqz.jpg',_binary '\0',NULL),(9,'תמונה','חטכס','/image/3uBCCqYeVA7SVeXUSA0UrdsGRxHysqcR.jpg',_binary '\0',NULL),(10,'gfdg','trdtr','/image/8xBWAyebzLPDBOroE2YRK40j0LsylBLA.png',_binary '\0',NULL),(11,'חדגכיע','לחגיכלגי','/image/cgMoysNe5YWthMz6FImjaoxU7N1JDZXx.jpg',_binary '\0',NULL),(12,'slkjdhk','kjfhkj','/image/navMZPrX8HVfvVszqMbF7OUxT8nMv4KN.jpg',_binary '\0',NULL),(13,'פדות','ןחיג','/image/GIOnCtPLoZiKdoTa5ZXbTwWVWuF5k0kk.jpg',_binary '\0',NULL),(14,'חיסג','חיכלחיכ','/image/zFsWrYlXb4l4gAVRdxtznl1rSqY06xut.jpg',_binary '\0',NULL),(15,'בסדר','טכריכ','/image/ZaNARJvzm43yEPvuEG01E9aiy1fmHu3t.jpg',_binary '\0',NULL),(16,'ארשדג','חיגכע','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL),(17,'מצבנדצ','נצבסנ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL),(18,'גדלעחגיכ','לחיכנלח','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL),(19,'mickey mouse','game','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','play');
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
INSERT INTO `student_classroom` VALUES ('cac9c534-4665-406b-844e-348738ea8122',1),('cac9c534-4665-406b-844e-348738ea8122',3),('cac9c534-4665-406b-844e-348738ea8122',12);
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
INSERT INTO `teacher_classroom` VALUES (1,'cac9c534-4665-406b-844e-348738ea8122'),(1,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(2,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(3,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(4,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(12,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(13,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(14,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(15,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(16,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(17,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(18,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(19,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(20,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(21,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260'),(22,'d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260');
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
  `first_name` varchar(50) DEFAULT NULL,
  `last_name` varchar(50) DEFAULT NULL,
  `school_id` int DEFAULT NULL,
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
INSERT INTO `user` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e','superadmin@gmail.com','$2b$10$Th1aiBam/B9kQqGcJX/fM.E32DH1mB3TxB/yirmrhCC58uBiBdGqe','2021-01-03 12:30:56.415866','2021-01-03 12:30:56.415866','SuperAdmin',NULL,NULL,NULL),('cac9c534-4665-406b-844e-348738ea8122','student1@gmail.com','$2b$10$QbCs2jBYL49YfpPHHUlDyO3ni6uTGHeO/0fZndZ8xaEJ7HpejyVtm','2021-01-03 12:36:05.518737','2021-01-03 12:36:05.518737','Student','יאיר','רוזנפלנר',1),('d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260','teacher1@gmail.com','$2b$10$A1taxxgMbUuqu/f/pW2vaup2.AcbKRz4YV0qnu7erjIAHvDLdmKS6','2021-01-03 12:37:04.691071','2021-01-03 12:37:04.691071','Teacher','מורן','לוי',1);
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
INSERT INTO `user_role` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e',1),('d2f3ee5f-87ad-4ed0-b6ac-7bc9119bc260',3),('cac9c534-4665-406b-844e-348738ea8122',4);
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

-- Dump completed on 2021-02-09 10:28:50
