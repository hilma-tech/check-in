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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'א\'1',1),(2,'ב\'1',1);
/*!40000 ALTER TABLE `classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom__student_user`
--

DROP TABLE IF EXISTS `classroom__student_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom__student_user` (
  `classroom_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`student_id`),
  KEY `IDX_501ee3754c2e684ae4c4b35aba` (`classroom_id`),
  KEY `IDX_597c61b24605e0afd5ceacab11` (`student_id`),
  CONSTRAINT `FK_501ee3754c2e684ae4c4b35aba3` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_597c61b24605e0afd5ceacab11f` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom__student_user`
--

LOCK TABLES `classroom__student_user` WRITE;
/*!40000 ALTER TABLE `classroom__student_user` DISABLE KEYS */;
INSERT INTO `classroom__student_user` VALUES (1,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f'),(1,'144c9833-d5bc-4fb6-8279-183ea2e65ef3'),(1,'1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83'),(1,'1f9ca189-28d5-40b3-8d73-58f9a10b806a'),(2,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f'),(2,'1f9ca189-28d5-40b3-8d73-58f9a10b806a'),(2,'71f29a5a-c62f-47eb-aac3-679b767c7eed');
/*!40000 ALTER TABLE `classroom__student_user` ENABLE KEYS */;
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
/*!40000 ALTER TABLE `classroom_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_student_user`
--

DROP TABLE IF EXISTS `classroom_student_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_student_user` (
  `class_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`class_id`,`student_id`),
  KEY `IDX_1332ef0ba0881d10d836583665` (`class_id`),
  KEY `IDX_38f771775f54fca67fe7faa71b` (`student_id`),
  CONSTRAINT `FK_1332ef0ba0881d10d8365836655` FOREIGN KEY (`class_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_38f771775f54fca67fe7faa71be` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_student_user`
--

LOCK TABLES `classroom_student_user` WRITE;
/*!40000 ALTER TABLE `classroom_student_user` DISABLE KEYS */;
INSERT INTO `classroom_student_user` VALUES (1,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f'),(2,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f');
/*!40000 ALTER TABLE `classroom_student_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_students_user`
--

DROP TABLE IF EXISTS `classroom_students_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_students_user` (
  `classroom_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`student_id`),
  KEY `IDX_d18fbff55e05b613a11fb97e71` (`classroom_id`),
  KEY `IDX_cbc71976148435b8f22d407bc9` (`student_id`),
  CONSTRAINT `FK_cbc71976148435b8f22d407bc94` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_d18fbff55e05b613a11fb97e711` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_students_user`
--

LOCK TABLES `classroom_students_user` WRITE;
/*!40000 ALTER TABLE `classroom_students_user` DISABLE KEYS */;
INSERT INTO `classroom_students_user` VALUES (1,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f'),(1,'1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83'),(2,'13277e95-eaf8-4de4-a6d1-f1dee37ed23f');
/*!40000 ALTER TABLE `classroom_students_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_teacher_user`
--

DROP TABLE IF EXISTS `classroom_teacher_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_teacher_user` (
  `classroom_id` int NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`teacher_id`),
  KEY `IDX_e550da650194dbec8dfd5762dd` (`classroom_id`),
  KEY `IDX_c339f95df3329d95ce2b981aae` (`teacher_id`),
  CONSTRAINT `FK_c339f95df3329d95ce2b981aae3` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_e550da650194dbec8dfd5762dde` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_teacher_user`
--

LOCK TABLES `classroom_teacher_user` WRITE;
/*!40000 ALTER TABLE `classroom_teacher_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `classroom_teacher_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_teachers_user`
--

DROP TABLE IF EXISTS `classroom_teachers_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_teachers_user` (
  `teacher_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  `class_id` int NOT NULL,
  PRIMARY KEY (`class_id`,`teacher_id`),
  KEY `IDX_01a232bba5bd359058115aced9` (`teacher_id`),
  KEY `IDX_9a48b039ff7d32cac2e930bbd3` (`classroom_id`),
  KEY `IDX_6a094e45ba2860d47802694e9b` (`class_id`),
  CONSTRAINT `FK_01a232bba5bd359058115aced9d` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_6a094e45ba2860d47802694e9ba` FOREIGN KEY (`class_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9a48b039ff7d32cac2e930bbd34` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_teachers_user`
--

LOCK TABLES `classroom_teachers_user` WRITE;
/*!40000 ALTER TABLE `classroom_teachers_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `classroom_teachers_user` ENABLE KEYS */;
UNLOCK TABLES;

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
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3eba8e668001b7e4313de7d0fc5` (`gameId`),
  CONSTRAINT `FK_3eba8e668001b7e4313de7d0fc5` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,0,63,'בגלחדמבחל','גםדכםן',''),(2,0,64,'בגךלג','סצךגד',''),(3,0,67,'בגד','בגד','text');
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
  `game_name` varchar(50) NOT NULL,
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  `description` varchar(30) NOT NULL,
  `requirements` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=68 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'הפומלה של פדות','/image/vMUnnnlTkG15DnKDi7fIFyM6ACgk9xga.jpg',_binary '\0','',''),(2,'רון','/image/7VAXR4VP1y2wCNmuwJRQT5lYTa8xO1g3.jpg',_binary '\0','',''),(3,'כגדחךלכחדלךגדכ','/image/PzwrBzAm2gaJ1diMC2zmM36YiPYazuhu.jpg',_binary '\0','',''),(4,'ךלחגדשךלכגדש','/image/LoMZoeTvigswVKJyd5MqZbHLMtt22651.jpg',_binary '\0','',''),(5,'גכדשגד','/image/52I9tPR9Lxc0ZhkYY3dVCR6N5OdIRcXA.jpg',_binary '\0','',''),(6,'לכגדסםך','/image/HDdjsXu271JR3aBCJhMyZIfiTaIbfo1F.jpg',_binary '\0','',''),(7,'זה נורמלי','/image/xXcX7Yhj5ADoIpBeaB78gPkScFtbhOcj.jpg',_binary '\0','',''),(8,'צבדלחגדן','/image/zRV1wiBZtj1sxbrxa0v858dmwVA5dpg9.jpg',_binary '\0','',''),(9,'בגד','/image/D3f4f884NVIbL07VzWoRH21K6x1AbM7R.jpg',_binary '\0','',''),(10,'חמגשלחכג','/image/XntUtK8zVbCRoPxAnSpLghTDgES8xlIi.jpg',_binary '\0','',''),(11,'צלבסגצ','/image/bHLiZQKLoOv0Mj0nf0lHNsQtxllwgIrI.jpg',_binary '\0','',''),(12,'בגדב','/image/kknQSAxCfGieJnM2VL3zJeCLpIlguTcE.jpg',_binary '\0','',''),(13,'במבלחג','/image/zgSpyPbwh9ra0c9kiATDsNdZzhobitPi.jpg',_binary '\0','',''),(14,'מגל','/image/dJ8Q1cD1r06GZB7HQ7xmlLNeBwPzcJcP.jpg',_binary '\0','',''),(15,'בלג','/image/hmPRrP9W4EIwZlZU6boxWOPfoqXHIliI.jpg',_binary '\0','',''),(16,'בךלכגמלהב','/image/8nNuOeUyo2kEDl9j2WHgwLzqyq1FvrJn.jpg',_binary '\0','',''),(17,'לןחוטארק','/image/jiGjraO9ooSI4c7ITzc21lzWUZT5mA2d.jpg',_binary '\0','',''),(18,'שלום רון','/image/CtHXyk4ZXqqLl5MONMPTGB6VEzS8R66o.jpg',_binary '\0','',''),(19,'בהנ','/image/6o1YStiebfxmdkAExS0v3j1K7BBWYpyI.jpg',_binary '\0','',''),(20,'סבהנמכסיגיסבנננגזע','/image/dilcaMVhvE6ewTmfpBelhGOgp26dWexn.png',_binary '\0','',''),(21,'שלום','/image/LTQA0lfG16XBCNQ41UC49sDWhdVw8Uv4.jpg',_binary '\0','',''),(22,'עננים','/image/l59SpvTtBC7d312gkeemqcTiwCl2aNvd.png',_binary '\0','',''),(23,'מתושלח הלך לגן אתמול בחמש','/image/b048Y7nwUjq7fkzDjznbrlyNaw1Q9juk.png',_binary '\0','',''),(24,'ילכיכגפםלזילך','/image/CaTnmWk45fkz01pYCmS2i7p7nB4e4yY0.png',_binary '\0','',''),(25,'לעיההסעכגנד טא','/image/0rQwXXJUt1p9fDmVK0y8Owo8C8Vyfb0z.png',_binary '\0','',''),(26,'ףךל','/image/5V5pKF8BtEPwJXDiXYFTM7KOwSxhbeyo.png',_binary '\0','',''),(27,'עכינה','/image/liNtUAWZusnGoQd7I2hpngI5Re3dAnRY.png',_binary '\0','',''),(28,'יייייייייייייייייייייייייייי','/image/NUueWTGYvdnmsUKBiu9CGIU9fk0P1GAs.png',_binary '\0','',''),(29,'מלכגחסד סדלגמ','/image/ZLYW4YmzlHzwY5XXzXXVbChFeVkr8ffS.jpg',_binary '\0','',''),(30,'מיצי הגבר','/image/SHi70X4EGLM25BKaGZbD9MlW1L6qkss1.jpg',_binary '\0','',''),(31,'חבלחג','/image/PYntYAsfNFs4K4WKfJOoMkQsVH3Z1Bw0.jpg',_binary '\0','',''),(32,'צךלהכג','/image/qFeyX3Fe6ORjXyZAEXyUrqYMHMjSKe2s.jpg',_binary '\0','',''),(33,'גסמחמג','/image/4AyLu32zFKTm97yx6FK7xv4LgB6vAAOO.jpg',_binary '\0','',''),(34,'חיעכ','/image/qURmcFZ6v4R2b6XTBwxSXie3Q11v117y.jpg',_binary '\0','',''),(35,'משחק חדש','/image/aWVVDc0XICKLvufgtnnrdzqN1sW90SMx.jpg',_binary '\0','',''),(36,'אלעד','/image/9OuPfwfnN2r214ydmi8tX7qQYvS9I0Dm.jpg',_binary '\0','',''),(37,'עוד אלעד','/image/v7S7qQIrHKoa23qqjb06Mr6bYYsYTeQp.jpg',_binary '\0','',''),(38,'חן','/image/5RWSJintzutql7KSgfBO0E7TJ4iRoNH9.jpg',_binary '\0','',''),(39,'חסר שם','/image/UKlAen5an0s8Zb0hKSf2ZICJt4jPagrR.jpg',_binary '\0','',''),(41,'משחק חדש יותר','/image/go7vH9mWXZqQge5sn6zFDQX2BzzSVCg2.jpg',_binary '\0','',''),(42,'אאאאאאא','/image/a4aohscGllfZn0D69gVaeD8FpMypBiTb.jpg',_binary '\0','',''),(43,'בת ציון','/image/0fdHEwPfsqwvhIsdJYuJWV5VJCBWr9NI.jpg',_binary '\0','',''),(44,'אא','/image/JolHqTt3Dn1A6MO6K6h1qkRrIuH4z4Wo.jpg',_binary '\0','',''),(45,'מבחגלמבלחמ','/image/iG1b2ql34FtcRsxCX0vryjYH89P9Pw2t.jpg',_binary '\0','',''),(46,'משחק','/image/ip9tUGi1dijxm7iM8SP4vjK0F05Kt5kH.jpg',_binary '\0','',''),(47,'אנשים','/image/KPTTu4WAr4ym1t7tTIaLt6EgELOXlPVU.jpg',_binary '\0','',''),(48,'אין שם','/image/TL30S5wVnXQMXaN2y9rUNhveNIm8pqzh.jpg',_binary '\0','',''),(49,'אין רעיון לשם','/image/DH7VnSznCCf8FQ0bteE0LlJNV3nWxxCP.jpg',_binary '\0','',''),(50,'עוד משחק','/image/bqV7ZPOH0up4PAYnapISfrzDsjck4OsZ.jpg',_binary '\0','',''),(51,'ועוד משחק','/image/9T3hO32TUIjdSynrvlMeUU7RYZWKIuiC.jpg',_binary '\0','',''),(52,'ואחרון חביב','/image/DTQYB9OddJy0KzC73EgvIQocGKMiFKgT.jpg',_binary '\0','',''),(53,'שם המשחק','/image/6FogYeGmiVx54YomTaZIf0DuIjhVjrQm.jpg',_binary '\0','',''),(55,'שלום לכולם','/image/mpnJBsTkd4cqKVYdOKLBNnlCUMtdVFbe.jpg',_binary '\0','',''),(57,'שלום נוסף','/image/6hRNFhiYlgnmMVOxlKSYCnplxF3G5Q6h.jpg',_binary '\0','',''),(59,'איקס עיגול','/image/3gfETPXIlvqbPo0SKCGNaJljbTQzova4.jpg',_binary '\0','',''),(60,'משחק לדוגמא','/image/F5VkXqtbRDAXS3bQToz0UEvaM1CjWBDL.jpg',_binary '\0','',''),(61,'נסיוןנסיוןנסיון','/image/XBVP2Rq36NFiEqYMOAvah1hPhmAr9p2t.png',_binary '\0','',''),(62,'צסךלגדחןכ','/image/yr22iuhD8EMVPsH9d8Y5hOR7dcXk8E1M.jpg',_binary '\0','',''),(63,'צסלךדגב','/image/fNedKFoG9HEaCQVOQ4IyLhRk7CPraPp8.jpg',_binary '\0','',''),(64,'צבסלמלג','/image/V3tw8SBhmAZAdrLtFckMZRV8CRQrqpwz.jpg',_binary '\0','',''),(66,'עננים  ','/image/qPPW54vOXRxnuFMkjJOjciVuXHRrosQe.jpg',_binary '\0','',''),(67,'בל','/image/rq3aH9k46CgQrdhhdd771kpfc417l4AU.jpg',_binary '\0','','');
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
INSERT INTO `role` VALUES (1,'superAdmin','Able to access and edit everything','cdkjsfisjcmkzds38cs'),(2,'superTeacher','able to add student and teachet to there school','nckcj248ncxji8w'),(3,'teacher','able to add student to class and add class','x3iw9rumxdkij8'),(4,'student','able to play','mdkxckmcwr9834mdl');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'עשה חיל','אפרת'),(2,'חומת שמואל','ירושלים'),(3,'צביה','מעלות');
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `school_teachers_user`
--

DROP TABLE IF EXISTS `school_teachers_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school_teachers_user` (
  `schoolId` int NOT NULL,
  `userId` varchar(36) NOT NULL,
  PRIMARY KEY (`schoolId`,`userId`),
  KEY `IDX_f2de58374f86b741d06c8635fb` (`schoolId`),
  KEY `IDX_87b6f10dc542b51a6673d2980a` (`userId`),
  CONSTRAINT `FK_87b6f10dc542b51a6673d2980a8` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f2de58374f86b741d06c8635fb4` FOREIGN KEY (`schoolId`) REFERENCES `school` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school_teachers_user`
--

LOCK TABLES `school_teachers_user` WRITE;
/*!40000 ALTER TABLE `school_teachers_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `school_teachers_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `student_user_classroom`
--

DROP TABLE IF EXISTS `student_user_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student_user_classroom` (
  `classroom_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`student_id`),
  KEY `IDX_645bd673048bc95c407ebcc2e0` (`classroom_id`),
  KEY `IDX_70216aa6692c4b5915fadda60d` (`student_id`),
  CONSTRAINT `FK_645bd673048bc95c407ebcc2e09` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_70216aa6692c4b5915fadda60de` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `student_user_classroom`
--

LOCK TABLES `student_user_classroom` WRITE;
/*!40000 ALTER TABLE `student_user_classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `student_user_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teacher_classroom`
--

DROP TABLE IF EXISTS `teacher_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher_classroom` (
  `teacher_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`classroom_id`),
  KEY `IDX_b63bca24c77077230ad0c85229` (`teacher_id`),
  KEY `IDX_bd7b3447b9efe33396652993ec` (`classroom_id`),
  CONSTRAINT `FK_b63bca24c77077230ad0c852295` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_bd7b3447b9efe33396652993ecf` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teacher_classroom`
--

LOCK TABLES `teacher_classroom` WRITE;
/*!40000 ALTER TABLE `teacher_classroom` DISABLE KEYS */;
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
  `name` varchar(50) DEFAULT NULL,
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
INSERT INTO `user` VALUES ('05153a7c-1470-46e4-9447-77c42db24d8f','student5@gmail.com','$2b$10$kESDWtj27NXy5cHQMQPljebceMvAZEzCbuWk7rtjGrV6dHKyHC7cq','2020-12-22 11:35:17.348802','2020-12-22 11:35:17.348802','Student','שירה גולשטיין',2),('0fb8abbf-79f1-45e8-a72e-1338a5511baf','teacher6@gmail.com','$2b$10$JRhBcj8xZ32wWeuzFZyOrewxalUJl01o71l.GyP4gHRkFHzYVX5pK','2020-12-23 15:45:18.768791','2020-12-23 15:45:18.768791','Teacher','שקדיה סלמון',3),('13277e95-eaf8-4de4-a6d1-f1dee37ed23f','student4@gmail.com','$2b$10$IGVl.9hAcY7NlGt7Q0x4rOFA1AJcxaIYFhcCsnNJtiypSCxq72Ubm','2020-12-22 11:34:55.371287','2020-12-22 11:34:55.371287','Student','בת ציון רוז',1),('144c9833-d5bc-4fb6-8279-183ea2e65ef3','student101@gmail.com','$2b$10$tF5oulvdAu7jmwS9RpZ2wuHs9astbslnrGnXVXOPp9J0zjsz8vYo6','2020-12-23 15:43:58.038441','2020-12-23 15:43:58.038441','Student','פז גלבולגבגבצקי',1),('1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83','student1@gmail.com','$2b$10$OaLYrcnennV.UcRx0z9VE.4Mg80hHAbO5d5woBWdWBlBMzpKAA3ZK','2020-12-22 11:33:51.762698','2020-12-22 11:33:51.762698','Student','אדווה אורן',1),('1f9ca189-28d5-40b3-8d73-58f9a10b806a','student6@gmail.com','$2b$10$lSGfdS5FW2fK99rRGIEGs./XU8lmqtJIjnOMubXcuTwWOESKg3Zvu','2020-12-22 11:35:32.645470','2020-12-22 11:35:32.645470','Student','רון איסר',1),('233b5b0a-22c0-48e2-9ab2-3696ded77935','teacher2@gmail.com','$2b$10$neZDpVpzPiFMqjoeVrUfZO9w6S9hN5o8AdewZbn0kd4MV/jn2mF4C','2020-12-23 10:21:45.923068','2020-12-23 10:21:45.923068','Teacher','נורית כהן',2),('2a99dedc-7036-490c-822c-8f2145929e20','student3@gmail.com','$2b$10$BgaqQWmwoOVX1R2ys6zFHuXY8XOtgymz7M.ItojR/czviDYrV/TuK','2020-12-22 11:34:31.539350','2020-12-22 11:34:31.539350','Student','בן אדם',1),('3e956faf-8919-4b20-83bb-e86abf58d7d4','student8@gmail.com','$2b$10$pvB3lfLqq7l2jpuU1/RH.urEwscwZ0RHMUX3DYB/HT5dqrCE.bWDm','2020-12-23 09:28:59.008570','2020-12-23 09:28:59.008570','Student','עינב בורג',1),('42bd71c3-f808-4691-bf90-c7128b1996d4','teacher7@gmail.com','$2b$10$OFerLCglIQwTT9VDPjFZpu7Wuzwet5DLXN6s/v4.qSdSWIVtzed1u','2020-12-23 15:45:58.975568','2020-12-23 15:45:58.975568','Teacher','כנרת מיכאלשוולי',3),('4b43bc86-65d2-41e9-bde8-5a06222bddb8','student2@gmail.com','$2b$10$UKyp9jw.Fhz/FoIirH.QgeT67StMQTz7IN8HPK60LKV3i7SN.ovx2','2020-12-22 11:34:17.494585','2020-12-22 11:34:17.494585','Student','שלמה קיפניס',1),('4be3a08f-f7ca-413d-abfc-1332240f5e6e','student10@gmail.com','$2b$10$TtK0dd.s.6BBnJ1EXw8xf.FNoGF.o7xmiffvINQ2PX8Zp3uKmTUMK','2020-12-23 09:49:35.209045','2020-12-23 09:49:35.209045','Student','רות תשובה',1),('4e82178c-02a1-49af-bfe6-2d23e21126e2','teacher3@gmail.com','$2b$10$UhcgquFsCykJ2gQfn9ndjeDIAM3WW8H845rI5y8XhGfkrWSm5dD36','2020-12-23 10:22:18.589259','2020-12-23 10:22:18.589259','Teacher','רחל ויצמן',3),('6a61c66f-22fa-470c-a382-96bfa1a72baf','teacher8@gmail.com','$2b$10$xaodl.1m89jADBzgKD0mlOkKiTjALLkcJ1QKUEpY/ZE04Z11gnlHC','2020-12-23 15:46:37.884492','2020-12-23 15:46:37.884492','Teacher','חיים מישישווילי',3),('71f29a5a-c62f-47eb-aac3-679b767c7eed','student9@gmail.com','$2b$10$X6elnBkI/cBMz4FzoP7bl.H/Mf578c4fgUOuUzzyWXusanuglAVD6','2020-12-23 09:37:57.251526','2020-12-23 09:37:57.251526','Student','שקד סולמון',1),('76460c3d-5923-4fd9-ac98-d8fc57ac5d04','student@gmail.com','$2b$10$I/Ad/sOSjQWIwHuxHTKok.9xwDIvYdjJfzUXi04j3erCQPSaDgUHO','2020-12-22 11:33:18.775939','2020-12-22 11:33:18.775939','Student','מוריה קדוש',1),('850d2bf2-9f4b-4e0d-b6a9-d384df42f408','student100@gmail.com','$2b$10$R/B46Lu1xrQUSoEbhMUJO.Hn5lMZGPa.nCfi5f3FPnuOG26.QcgRi','2020-12-23 15:25:37.259083','2020-12-23 15:25:37.259083','Student','חן נוימן',1),('ab6b1284-cb39-4325-99c2-8b718fa7a3d3','teacher5@gmail.com','$2b$10$ZLM9rgA9mTSIDk5ZHY8D/uPvMDIRsl9RP3Cz6A72q4s/vNT.co.gm','2020-12-23 15:44:42.525655','2020-12-23 15:44:42.525655','Teacher',' שקד סלמון',3),('aff4cf84-52cd-4eea-92fc-ec5346584e22','teacher4@gmail.com','$2b$10$EDkAVBZNfPZY6iaVBKUsvu3NxH8VJMTfgwf.ZFWjaRugrH6694eEK','2020-12-23 10:22:45.361554','2020-12-23 10:22:45.361554','Teacher','חגית פינגלין',3),('bc9ccae8-7027-44e3-adde-6947c7f11c01','teacher@gmail.com','$2b$10$.SNFe2T0h7/x3abU1Q9AEeGszEEYsAROCWtI6iVSj6J/3jGRTXmSG','2020-12-23 10:21:03.109510','2020-12-23 10:21:03.109510','Teacher','מיכל יגל',1),('f29cfe44-9099-4b84-a08b-e9bff17ca6dd','teacher1@gmail.com','$2b$10$Dc3.6dXZbsJTCyiEW1pvQukDY7TLKx/afF.8F175t9eraKWcJcwqi','2020-12-23 10:21:23.827749','2020-12-23 10:21:23.827749','Teacher','חוה כהן',2),('f91a2e6d-f04f-4dac-983b-d5d4fe412e8d','student7@gmail.com','$2b$10$QXZSpbY.qcpxnSX6FJhyTuFr/oCJIi7VGfqYcpEStUAIJ8dpK30KC','2020-12-22 11:35:51.161964','2020-12-22 11:35:51.161964','Student','טליה איתן',1),('fe32893c-6b5d-4897-b795-c23173fae1a7','superadmin@gmail.com','$2b$10$usTRf13zMhBhrEr6Y38hKu.1pmOLnvBJ7DWTRfgtqF79H0GniiEL6','2020-11-24 09:47:14.855068','2020-11-24 09:47:14.855068','SuperAdmin',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user__classroom_classroom`
--

DROP TABLE IF EXISTS `user__classroom_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user__classroom_classroom` (
  `student_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  PRIMARY KEY (`student_id`,`classroom_id`),
  KEY `IDX_0ef0afa7a184c8963eec4e7e0f` (`student_id`),
  KEY `IDX_eea02ae784f70821a0e7428009` (`classroom_id`),
  CONSTRAINT `FK_0ef0afa7a184c8963eec4e7e0ff` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_eea02ae784f70821a0e74280096` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user__classroom_classroom`
--

LOCK TABLES `user__classroom_classroom` WRITE;
/*!40000 ALTER TABLE `user__classroom_classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `user__classroom_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classroom_classroom`
--

DROP TABLE IF EXISTS `user_classroom_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_classroom_classroom` (
  `teacher_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`classroom_id`),
  KEY `IDX_1c918515bf587321c1c6641641` (`teacher_id`),
  KEY `IDX_f6739a6f1297444087b1ea14cb` (`classroom_id`),
  CONSTRAINT `FK_1c918515bf587321c1c6641641b` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f6739a6f1297444087b1ea14cb2` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classroom_classroom`
--

LOCK TABLES `user_classroom_classroom` WRITE;
/*!40000 ALTER TABLE `user_classroom_classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_classroom_classroom` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_classrooms_classroom`
--

DROP TABLE IF EXISTS `user_classrooms_classroom`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_classrooms_classroom` (
  `teacher_id` varchar(36) NOT NULL,
  `classroom_id` int NOT NULL,
  PRIMARY KEY (`teacher_id`,`classroom_id`),
  KEY `IDX_f09d27354254793f3eae0ba3c9` (`teacher_id`),
  KEY `IDX_76672e45633c96eaa2a7041ed1` (`classroom_id`),
  CONSTRAINT `FK_76672e45633c96eaa2a7041ed17` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f09d27354254793f3eae0ba3c91` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_classrooms_classroom`
--

LOCK TABLES `user_classrooms_classroom` WRITE;
/*!40000 ALTER TABLE `user_classrooms_classroom` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_classrooms_classroom` ENABLE KEYS */;
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
INSERT INTO `user_role` VALUES ('fe32893c-6b5d-4897-b795-c23173fae1a7',1),('0fb8abbf-79f1-45e8-a72e-1338a5511baf',2),('233b5b0a-22c0-48e2-9ab2-3696ded77935',2),('42bd71c3-f808-4691-bf90-c7128b1996d4',2),('4e82178c-02a1-49af-bfe6-2d23e21126e2',2),('6a61c66f-22fa-470c-a382-96bfa1a72baf',2),('ab6b1284-cb39-4325-99c2-8b718fa7a3d3',2),('aff4cf84-52cd-4eea-92fc-ec5346584e22',2),('bc9ccae8-7027-44e3-adde-6947c7f11c01',2),('f29cfe44-9099-4b84-a08b-e9bff17ca6dd',2),('05153a7c-1470-46e4-9447-77c42db24d8f',4),('13277e95-eaf8-4de4-a6d1-f1dee37ed23f',4),('144c9833-d5bc-4fb6-8279-183ea2e65ef3',4),('1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83',4),('1f9ca189-28d5-40b3-8d73-58f9a10b806a',4),('2a99dedc-7036-490c-822c-8f2145929e20',4),('3e956faf-8919-4b20-83bb-e86abf58d7d4',4),('4b43bc86-65d2-41e9-bde8-5a06222bddb8',4),('4be3a08f-f7ca-413d-abfc-1332240f5e6e',4),('71f29a5a-c62f-47eb-aac3-679b767c7eed',4),('76460c3d-5923-4fd9-ac98-d8fc57ac5d04',4),('850d2bf2-9f4b-4e0d-b6a9-d384df42f408',4),('f91a2e6d-f04f-4dac-983b-d5d4fe412e8d',4);
/*!40000 ALTER TABLE `user_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_school_school`
--

DROP TABLE IF EXISTS `user_school_school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_school_school` (
  `userId` varchar(36) NOT NULL,
  `schoolId` int NOT NULL,
  PRIMARY KEY (`userId`,`schoolId`),
  KEY `IDX_728ff9f2d3d09af71991b04c79` (`userId`),
  KEY `IDX_405f3f20a4dc4f8abe7fdfdaf2` (`schoolId`),
  CONSTRAINT `FK_405f3f20a4dc4f8abe7fdfdaf2d` FOREIGN KEY (`schoolId`) REFERENCES `school` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_728ff9f2d3d09af71991b04c792` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_school_school`
--

LOCK TABLES `user_school_school` WRITE;
/*!40000 ALTER TABLE `user_school_school` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_school_school` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-29  9:56:27
