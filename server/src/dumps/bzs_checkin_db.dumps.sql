-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: checkin
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'א\'3',1),(2,'ב\'4',2),(3,'י\'8',1),(4,'ד\'2',1),(5,'ב\'1',2);
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
INSERT INTO `classroom_game` VALUES (1,45),(1,46),(1,47);
/*!40000 ALTER TABLE `classroom_game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_student_user`
--

DROP TABLE IF EXISTS `classroom_student_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_student_user` (
  `classroom_id` int NOT NULL,
  `student_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`student_id`),
  KEY `IDX_5ff9b90bc50eac5005a0bf860f` (`classroom_id`),
  KEY `IDX_38f771775f54fca67fe7faa71b` (`student_id`),
  CONSTRAINT `FK_38f771775f54fca67fe7faa71be` FOREIGN KEY (`student_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_5ff9b90bc50eac5005a0bf860f1` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_student_user`
--

LOCK TABLES `classroom_student_user` WRITE;
/*!40000 ALTER TABLE `classroom_student_user` DISABLE KEYS */;
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
/*!40000 ALTER TABLE `classroom_students_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `classroom_teachers_user`
--

DROP TABLE IF EXISTS `classroom_teachers_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `classroom_teachers_user` (
  `classroom_id` int NOT NULL,
  `teacher_id` varchar(36) NOT NULL,
  PRIMARY KEY (`classroom_id`,`teacher_id`),
  KEY `IDX_9a48b039ff7d32cac2e930bbd3` (`classroom_id`),
  KEY `IDX_01a232bba5bd359058115aced9` (`teacher_id`),
  CONSTRAINT `FK_01a232bba5bd359058115aced9d` FOREIGN KEY (`teacher_id`) REFERENCES `user` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_9a48b039ff7d32cac2e930bbd34` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_teachers_user`
--

LOCK TABLES `classroom_teachers_user` WRITE;
/*!40000 ALTER TABLE `classroom_teachers_user` DISABLE KEYS */;
INSERT INTO `classroom_teachers_user` VALUES (1,'fbfa90a5-e044-450f-bdaa-0f2062ddb682'),(2,'fbfa90a5-e044-450f-bdaa-0f2062ddb682'),(3,'fbfa90a5-e044-450f-bdaa-0f2062ddb682'),(4,'fbfa90a5-e044-450f-bdaa-0f2062ddb682'),(5,'fbfa90a5-e044-450f-bdaa-0f2062ddb682');
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
  `field_name` varchar(50) NOT NULL,
  `default_value` varchar(150) NOT NULL,
  `order` int NOT NULL,
  `gameId` int DEFAULT NULL,
  `type` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_3eba8e668001b7e4313de7d0fc5` (`gameId`),
  CONSTRAINT `FK_3eba8e668001b7e4313de7d0fc5` FOREIGN KEY (`gameId`) REFERENCES `game` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,'כגכג','כגכ',0,37,'text'),(2,'בלגד','בגלדכיב',0,38,'text'),(3,'בהנבהנ','הבנבנ',0,39,'text'),(4,'סבהסבה','סבהסבה',0,40,'text'),(5,'fdgfghvvvb','nvvhgf',0,41,'text'),(6,'tetr','tretretre',0,42,'text'),(7,'rewrwre','rwerwr',0,43,'text'),(8,'ewrew','rewrew',0,44,'text'),(9,'kkkkkkkkkkkk','kkkkkkkkkk',0,45,'text'),(10,'rrrrrrrrrrq','rrrrrrrrr',0,46,'text'),(11,'ffffffffff','rrrrrrrrr',0,47,'text'),(12,'עכגג','בעכביע',0,48,'text'),(13,'hvhvhgvh','bv bv  hvhgvv',0,49,'text'),(14,'ggggggggggggggggg','nbbjkhbkjh',0,50,'text'),(15,'jnckjn','[\"cxvxc\",\"לחגדמבלח\"]',0,51,'choice'),(16,'חהגמח','דלחמלח',0,52,'text'),(17,'בסחמה','[\"סלבמנ\",\"עכי\",\"לחסמהלח\"]',1,52,'choice');
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'שם','/image/Rg2FUjX305yg9mS2PIm9Oj9syMBW4F4i.png',_binary '\0','',''),(2,'משחק שלא יעבוד','/image/ikX5X9sV0MjbIAvTV7WKjPqwl2flUnaG.jpg',_binary '\0','',''),(3,'י','/image/hAUG1PTAmOHEvGUUtEHnc8yNeZVCrFak.jpg',_binary '\0','',''),(4,'אין שם','/image/lv8tmsIsHPc9kBMNrmxfuWXpVEAOy2l6.jpg',_binary '\0','',''),(5,'שם המשחק','/image/s7Y8wihzkAh6KMjxtP68ifVprPCzKC9R.png',_binary '\0','',''),(6,'ןדויבןוילי','/image/pvq5dGSbh115K9CBKzUUsnOlZqwzdlep.png',_binary '\0','',''),(7,'ליאור','/image/4vS3Yv7G830uOfTAiOYmtxeQkLVbKGGh.png',_binary '\0','',''),(8,'ודטגע','/image/89DO5vxUEwx2BsFVaQ1bggo3mdWi42iC.png',_binary '\0','',''),(9,'דגילכדח','/image/BUbvLrIBK1M4izhNRhH1xBkNxD0myUlF.png',_binary '\0','',''),(10,'א','/image/K9mWFTUT6AkUpsh9cNmeQ2QcUpd6ktDA.png',_binary '\0','',''),(11,'חגעכחדיעג','/image/trVSuvahhnw0vw2kdF42Eskd7uDd6lRP.png',_binary '\0','',''),(12,'חטכחכחכיכחיכח','/image/cwNY3v6ORLwKMhrxrA2UTtNlpj9se5lJ.jpg',_binary '\0','',''),(13,'צמייחיעיי','/image/TJ3aLBX9fWr5KJ2yP6pWXOF7HfGy2QVy.jpg',_binary '\0','',''),(14,'יסמזנמ','/image/Riz8wpw6p292vNRqge8F6gYlClUfbLtP.jpg',_binary '\0','',''),(15,'לגחלהידלח','/image/hSPVVECkTUNfLbFLRfnz8D32LIvLttWT.jpg',_binary '\0','',''),(16,'שזסדסגגגג','/image/Ys7NnXOQ4QgXoQoK8dfebi1H1VK9odoS.jpg',_binary '\0','',''),(17,'כחעגדחעג','/image/eEc7QbgzQTKMrVdURmu9BnXRuBx0Hysw.jpg',_binary '\0','',''),(18,'ציעחגכ','/image/tixiUUySaauUu1mtX0twAYyotsjGHlfy.jpg',_binary '\0','',''),(19,'לדעכלגחד','/image/MmYKk42quclH0mXQuEUkfxqmTc3th2r9.jpg',_binary '\0','',''),(20,'לחדגכעילחגד','/image/EHGNeGNQI0g22Xc0lIKOCCezxBrAQHiY.jpg',_binary '\0','',''),(21,'מחגרכלןקהעילן','/image/YJZ86XZ30RRhZ9dS87qWVfkPLdvXGuVF.jpg',_binary '\0','',''),(22,'אכרקטע','/image/IUyb5AFK4xaFg8eHmBdALvnB9OFjOMI6.jpg',_binary '\0','',''),(23,'ראטי','/image/hMLuCXuqQUmNrEddg5XJqT0lYMCcDW1m.jpg',_binary '\0','',''),(24,'טואוטאוטאא','/image/bXp4X5k3OzL5eiy9tTALUhJZoqUm9JBO.jpg',_binary '\0','',''),(25,'לילחילחי','/image/eaTs0lWw31gyXumZGwZORGrpFpM0AO1S.jpg',_binary '\0','',''),(26,'לללגוי','/image/ywW4fdiEVtkEFZZLvZIRCMiDfl1nFY7q.jpg',_binary '\0','',''),(27,'פליימוביל','/image/s603LwRCKIuiFfhg49JtF4sqK4zAzl2H.png',_binary '\0','',''),(28,'םלצםצםלצ','/image/FSGEeyQoz4inlsLapZEckSvE3kqlZ1RN.png',_binary '\0','',''),(29,'םלםחםלחלךלח','/image/nYNTXL2AZUB9FW4FwNNSZn1o1T9mwpVn.jpg',_binary '\0','',''),(30,'קבבבבבב','/image/7LjPBrOcndataB5y0ylZrEq31Os6TW2r.jpg',_binary '\0','',''),(31,'חבדןמ','/image/2VSxVryMFgUn9mW97Xukj5p9VFiP5N47.png',_binary '\0','',''),(32,'רד פנדה','/image/lAeslXxcEKsotSx4O5xrMfaWGZuXKeK4.jpg',_binary '\0','',''),(33,'טאלל פנדה','/image/F5Ou9mqeFASgWQhXXM42KhcMlNVXLTTP.jpg',_binary '\0','',''),(34,'פנדה בר','/image/aImSfUh2Rj2e2SEwxMEXJ3PyKtiZoXft.jpg',_binary '\0','',''),(35,'קקקקקק','/image/RstucxThYJZTYb3MIQolytqqTms6jFEa.jpg',_binary '\0','',''),(36,'דחיכלחגדי','/image/HQ6YyQS1n6S0LWHfAN6XDLJKKKJJRkLz.jpg',_binary '\0','',''),(37,'דגכגדכ','/image/hd23SVDZGJdVaW1GBwOFfGXjSI8MgN5r.png',_binary '\0','',''),(38,'צסגל','/image/qoEZjJBTfPXkVMfNwBNFeKC7aXy8rM7s.png',_binary '\0','',''),(39,'שדגדגדש','/image/7lseHiNDZs3FOywBrl54aKzLMnALBCuJ.jpg',_binary '\0','',''),(40,'בהנבנ','/image/jwQQnx9nKGH9HOK7KTkinBPpN1xO3nZ0.jpg',_binary '\0','',''),(41,'fdgdg','/image/XCXXzX5kZOUZluyZz1FigC2vbc1D1inc.jpg',_binary '\0','',''),(42,'hdhgfhg','/image/SY8THDIGyIZlhVv2uR737uBSYefH7WDf.jpg',_binary '\0','',''),(43,'gfdsf','/image/5BwaLzjT16Ij4rNXU55rrF78yR2xcpoM.jpg',_binary '\0','',''),(44,'jhghj','/image/u3r9jz1jJKFlgwmaoOhL1rCbqgk0Mfy9.jpg',_binary '\0','',''),(45,'kkkkkkkkkkkk','/image/Qb5XQIrmL8jI5dsn6JtueC4YOFoGFko4.jpg',_binary '\0','',''),(46,'jjjjjjjjjj','/image/xAOm4w5j015EGuUGXSNwXcRtpsVqqcXA.jpg',_binary '\0','',''),(47,'gffff','/image/2LMGYcVxKGds8mYlh2uESCdbzpQ0J8Yq.jpg',_binary '\0','',''),(48,'uuuuuuuuu','/image/xUHN0q7Uuu6eLOJr8ws35dxOkf0mS4hF.jpg',_binary '\0','',''),(49,'vcfxdxszsssssssssssssssssssss','/image/V0SfAnzG23bo5bmcFMb8UueWrekq5lbh.jpg',_binary '\0','vhvgvhgvhgvhgvhgvghvhv','ygvgyvhhhhhhhhhhh'),(50,'iiiiiiiiiii','/image/QOp1aSMyfhG4lNI0ViUUky5x7PhNZvFJ.jpg',_binary '\0','hgjjjjjjjjjjjjjjjj','fjdgfhdgfd'),(51,'kjxcn','/image/KWsIflKU1cFLG9P3tZ2D0iY4sZFMKOR2.png',_binary '\0','jxnckj','jnckjnc'),(52,'לחם לחם משמיים','/image/gXcl6YL7gNKaPjm2Ra7Nz9a6NNguvGyv.jpg',_binary '\0','לחמלח','לחמגלחב');
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
INSERT INTO `role` VALUES (1,'superAdmin','Able to access and edit everything','Nv^@%sjv*&s^:p(DKSWBD687462'),(2,'superTeacher','Able to add students and teachers to their school','ku6rj/.kiiut65ewxvngf'),(3,'teacher','Able to add students to their class, and add class to themselves, and games to their classes','mnbghctrsew((&YIYJHJbGstr'),(4,'student','Able to play games','KJBxs6dtrgfoishfd/.,\';743yr');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
/*!40000 ALTER TABLE `school` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updated` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `type` varchar(255) NOT NULL,
  `id` varchar(36) NOT NULL,
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
INSERT INTO `user` VALUES ('mineymo1@gmail.com','$2b$10$rODih1kTr1AsT0mCLXUhmOnIk8UW52RXqpenUKvtvuOe0AO48GwSS','2020-11-22 16:21:37.241695','2020-11-22 16:21:37.241695','SuperAdmin','df3f0bda-b2dc-4385-ac6b-ff4573eb348c',NULL,NULL),('teacher@gmail.com','$2b$10$Q/qYXLbSteYByHKImRd4uusXgjzSTy5vojHNYA3.Zbx2.5bdbhzPy','2020-12-23 09:55:29.573620','2020-12-23 09:55:29.573620','Teacher','fbfa90a5-e044-450f-bdaa-0f2062ddb682',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
INSERT INTO `user_role` VALUES ('df3f0bda-b2dc-4385-ac6b-ff4573eb348c',1),('fbfa90a5-e044-450f-bdaa-0f2062ddb682',3);
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

-- Dump completed on 2020-12-29 14:44:48
