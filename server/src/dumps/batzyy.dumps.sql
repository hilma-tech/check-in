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
  `schoolIdId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_0478f6eeb81293dee11637c8cbc` (`schoolIdId`),
  CONSTRAINT `FK_0478f6eeb81293dee11637c8cbc` FOREIGN KEY (`schoolIdId`) REFERENCES `school` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (1,'א\'1',1),(2,'ב\'3',1),(3,'ה\'2',1),(4,'ב\'1',1),(12,'ג\'4',1),(13,'ד\'2',1),(14,'ה\'1',1),(15,'ו\'3',1),(16,'ז\'2',1),(17,'ח\'1',1),(18,'ט\'3',1),(19,'י\'2',1),(20,'י\'1',1),(21,'א\'3',1),(22,'ב\'4',1),(23,'ה\'7',1),(24,'ו\'5',1),(25,'ג\'2',31),(26,'ארדארד',43),(27,'אדוארד',43);
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
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_field`
--

LOCK TABLES `classroom_field` WRITE;
/*!40000 ALTER TABLE `classroom_field` DISABLE KEYS */;
INSERT INTO `classroom_field` VALUES (100,'blah blah',31,1,15),(101,'blah blah',31,2,15),(108,'jsafd',34,3,18),(109,'[\"one\",\"two\",\"three\"]',34,3,19),(110,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,3,20),(111,'[\"dd\",\"dd\",\"dd\"]',41,2,26),(112,'jsafd',34,2,18),(113,'[\"one\",\"two\",\"njlkj\"]',34,2,19),(114,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,2,20),(115,'drop table users ',40,2,25),(116,'     undefind',40,4,25),(117,'false',31,4,15),(118,'null',34,4,18),(119,'[\"false\",\"true\",\"0\"]',34,4,19),(120,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,4,20),(121,'[\"11111\",\"12123213\",\"132123\"]',41,4,26),(122,'1q2w3e4r',31,12,15),(123,'drop table users',40,12,25),(124,'false',34,12,18),(125,'[\"sadf\",\"asdf\",\"asfd\"]',34,12,19),(126,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,12,20),(127,'jsafd',34,1,18),(128,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,1,20),(129,'[\"one\",\"two\",\"three\"]',34,1,19),(130,'להנות איתנו',40,1,25);
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
INSERT INTO `classroom_game` VALUES (1,31),(1,34),(1,40),(2,31),(2,34),(2,40),(2,41),(3,34),(4,31),(4,34),(4,40),(4,41),(12,31),(12,34),(12,40);
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
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (15,'texttt','text','blah blah',1,31),(18,'text','text','jsafd',1,34),(19,'choicee','choice','[\"one\",\"two\",\"three\"]',3,34),(20,'pictchure','image','/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',5,34),(25,'מטרות המשחק','text','להנות ',1,40),(26,' גדשש','choice','[\"dd\",\"dd\",\"dd\"]',1,41),(27,'gfdg','text','hgchgfdgf',1,42),(28,'יגדעכחד','text','דיגכה',1,43),(29,'לחדגיכלח','text','דשלחגעכיח',1,44),(30,'םדגיכ','text','גלכחיע',1,47),(31,'דגלחכי','text','גדךלחמכ',2,47),(32,'כךלחדיכ','text','דגךלחמכ',1,48),(33,'לכטגטא','text','בעכגאכג',1,49),(34,'ןודגכ','image','/image/wpE3VKxMXzdGjIRZCQqMmgtuWnT38DoR.jpg',1,75),(35,'דצמגכנ','image','/image/nAKoMMtwmQglYhOfN0AwvV5ot5hb1XFk.png',1,76),(36,'ZDבסZX','image','/image/VYTTDhggzxX2RS8X13IbRFPKJfSOzHl1.png',1,77),(37,'kjszbd','image','/image/fTH1Jl1HBmjMaLpeOBUFjggNoERtWO9B.png',1,80),(38,'fvc','text','csdc',1,81),(39,'csdc','text','cd',1,82),(40,'cdsc','text','cdc',2,82),(41,'cfdvc','image','/image/56BL4WLwnY4oomNNWZ2geAIUwGxxFGem.jpg',2,83),(42,'dfv','text','dsc',1,83),(43,'cdscv','image','/image/BcwhNzKOsSHWNcWPRGY6WPsZjXh6SjPW.png',1,84),(44,'mlkj','image','/image/WXriASKYYGJ6Cq49pGruUkDlAu2L4pUe.jpg',1,85),(45,'cdfv','image','/image/6iNPiBnP6RvxjVWhc8X2fBblL3CQV8H7.jpg',1,86),(46,'exde','image','/image/oOZgXV819bAVouV9tevYcL9l62pV9OPX.jpg',1,87),(47,'xdex','image','/image/5zOVAfesdHSweks1ged7UHE0bQ77awxs.jpg',1,88),(48,'xdw','image','/image/Y9k7Sxw8pKtcBt73pgLdIQtQkcVL6AhI.jpg',2,88),(49,'gxfdz','image','/image/97k7xM6bO4RCIxvIcoSERmnwjRz91eyJ.png',1,89),(50,'askdh','text','ksbd',1,90),(51,'gghchg','image','/image/DtgRJ3x8tPintLMXEPcP104ku7jn52SF.jpg',1,91),(52,'sadnmbms','text','dsnfhbmn',1,92);
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
  `video_link` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (31,'text only','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL,NULL),(34,'image text choice','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL,NULL),(40,'פינג פונג','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','משחקים מטקות רק לא בים בשביל שהאשכנזים שבנו לא יקבלו כוויות צלייה דרגה 3','בשביל לשחק כדאי להשיג מטקות כדור ורשת.',NULL),(41,'רקד  ד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','      sa     as ','השגד ',NULL),(42,'פדותתתתתתתת','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(43,'ןוטןיעלחד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(44,'דגליכע','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(45,'עכיחעכ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(46,'עכחדעכיח','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(47,'דלחגיכלחגד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(48,'מצדנבצ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(49,'גטאגא','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(50,'kkkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(51,'jjjjjjjjjjjjjj','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(52,'kk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','sda','',''),(53,'k','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(54,'kkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(55,'kkkkkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(56,'kkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(57,'kkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(58,'Shalom','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.loom.com/share/13b2159f462f4e6093c5d5bdecf21b7e'),(59,'hiya','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(60,'kajgs','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(61,'msnbc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(62,'htdgfd','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(63,'anbfdmn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(64,'nsabdfn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(65,'ksjbafbsdfb','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(66,'akndlka','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(67,'idsufhkjdsfn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(68,'kjsafbkjsdb','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(69,'kjsdkjf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(70,'sjbfmnsbf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(71,'ksjbdfkm','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(72,'osijf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(73,'snckd','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditGame.jsx'),(74,'kdjfhgks','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditGame.jsx'),(75,'hjdsfjh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(76,'שחדגמ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(77,'דשכ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(78,'jhsdgf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditTeacher.jsx'),(79,'jdsbfjh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(80,'zkjxhbk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(81,'sdfc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(82,'fdszvcs','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(83,'fdvcfdv','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(84,'cdscfds','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(85,'mfdkslm','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(86,'cdsfv','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(87,'xcdfc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(88,'qsjw','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(89,'hjfhf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(90,'ksdjfh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(91,'hmvcx','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(92,'shkjdh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','');
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime DEFAULT NULL,
  `day` varchar(255) DEFAULT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `classroom_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_49a820e199b6ba54c42267c6b45` (`classroom_id`),
  CONSTRAINT `FK_49a820e199b6ba54c42267c6b45` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (1,'sneakerers','בית שמש'),(31,'burn it','constintopale'),(32,'איריס','אחיהוד'),(35,'טווס','טטייךל'),(43,'המסטר','דנס');
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
INSERT INTO `student_classroom` VALUES ('68365ee0-e27e-4e41-9482-b0d073712098',1),('9a309c72-d927-4f90-bcab-6ea57767db1f',1),('b51ffe60-ee29-4504-94fe-6dda5bee61af',1),('cac9c534-4665-406b-844e-348738ea8122',1),('cac9c534-4665-406b-844e-348738ea8122',3),('cac9c534-4665-406b-844e-348738ea8122',12),('8559b07e-397e-45bf-920e-11bd973c0bef',14);
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
INSERT INTO `teacher_classroom` VALUES (1,'ef216bcb-736a-48d6-bb6c-de54ad679fc2'),(14,'ef216bcb-736a-48d6-bb6c-de54ad679fc2');
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
  `emailVerified` tinyint DEFAULT '0',
  `verificationToken` varchar(150) DEFAULT NULL,
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
INSERT INTO `user` VALUES ('032156a3-8784-40fc-8a27-600e73ef4989','fsgfxcnbvmn','$2b$10$X7T783TiQNjZMVZB6VWKVuz/8umdUV/T753ZKHUy4/CHbuf6MyNaO','2021-03-09 09:51:15.358816','2021-03-09 09:51:15.358816','Student',1,0,NULL,NULL,NULL),('1966ed8c-7e7b-49ea-a914-a1eaf7a9258f','iytyuyygfs','$2b$10$mtG5dMlso.eOfzVrlUjQ7OLooV24/BW/WndAENSeHowIS0UnvYLEO','2021-03-09 09:44:58.909003','2021-03-09 09:44:58.909003','Student',1,0,NULL,NULL,NULL),('283ec611-fd31-49c4-9df2-032b656ef10b','hjfdfhgkoiu','$2b$10$N6PWLYi.SQTiRmFet5RBPuGEgkkI4U0mah0daPOH/K20GaSEO9eiW','2021-03-09 10:00:39.725437','2021-03-09 10:00:39.725437','Student',1,0,NULL,NULL,NULL),('571ea09b-87ac-4a56-8bdb-b5669e789ad5','hgcytre65e','$2b$10$kipeP3sNbU5hWXvRVMLEeulebb41qMPSpsJhXA5coeQtVAyx0pqfy','2021-03-09 09:47:40.576724','2021-03-09 09:47:40.576724','Student',1,0,NULL,NULL,NULL),('68365ee0-e27e-4e41-9482-b0d073712098','batz1234','$2b$10$JXgrhbGhUnnhDl/jcsrObueaMVJyYJZMwrj2BGn0L1MbVSMdtY8ui','2021-03-09 10:13:24.257609','2021-03-16 14:51:33.000000','Student',1,0,NULL,NULL,NULL),('70df752c-744b-4ee2-ace4-e56da048b23e','superadmin@gmail.com','$2b$10$Th1aiBam/B9kQqGcJX/fM.E32DH1mB3TxB/yirmrhCC58uBiBdGqe','2021-01-03 12:30:56.415866','2021-01-03 12:30:56.415866','SuperAdmin',NULL,0,NULL,NULL,NULL),('810a5bb8-1938-480c-afb6-b0e92a869b76','yyyyyyyyyy','$2b$10$dg7RH9gNgjuNaueMiVAOTOlSzu.xDe18SJJ0.de1kYywfvARVFE8a','2021-03-09 09:46:28.461563','2021-03-09 09:46:28.461563','Student',1,0,NULL,NULL,NULL),('8559b07e-397e-45bf-920e-11bd973c0bef','Fשאgreek','$2b$10$TcUfV5YwipXj47VtSBIbCeUdMaFj.5xbrFu1afLS3nFUm2dJ2fpKq','2021-03-14 12:59:04.932567','2021-03-14 12:59:04.932567','Student',1,0,NULL,NULL,NULL),('9a309c72-d927-4f90-bcab-6ea57767db1f','student2','$2b$10$pJgIcgCk7VwkEluwRXRo6u7ysWYuc.e3HmshfEEFAgCEyXDG/4mHW','2021-03-11 12:41:21.587083','2021-03-11 12:41:21.587083','Student',1,0,NULL,NULL,NULL),('af537225-e048-48d3-8641-a9de5126b193','trsgfs','$2b$10$Ei6hpm9D2/aoVQS7TOcL7ua63JPcIk84hT6USrtyLhNyGeM9UA73C','2021-03-09 09:44:45.015817','2021-03-09 09:44:45.015817','Student',1,0,NULL,NULL,NULL),('afd93365-0e00-46d5-80f2-870bf88169a7','a-bug','$2b$10$6X9nW5W1VTdmggAa8MxPyenxRq7u6ucN2yc4vBBUq5W5Y86z.2YCC','2021-03-17 14:59:03.224510','2021-03-17 14:59:03.224510','Student',31,0,NULL,NULL,NULL),('b51ffe60-ee29-4504-94fe-6dda5bee61af','ruht','$2b$10$xDEHxH8EtAVJoYbXQ7AoMOzD.az9m9mWxi2urZ3SxGqGrwq7brVtC','2021-03-17 13:00:01.932567','2021-03-17 13:00:01.932567','Student',1,0,NULL,NULL,NULL),('c94022fc-6a28-441f-83dd-4dd2d00f49fd','batzhtrhionrr@gmail.com','$2b$10$QyEm45PBLoU5nHnpHwOmzeZvY6E1k/CQX3gQq5CL4x5qcXbDpW9eC','2021-03-22 11:47:51.388309','2021-03-22 11:47:51.000000','Teacher',32,0,'373b11fbf979169ccef88be87270985dbd05c23fae0815eba233d3da963d2fa08ae59c7f8a3967e41a27d3ab25050d0f8e85','klo','klo'),('cac9c534-4665-406b-844e-348738ea8122','student1@gmail.com','$2b$10$JXpj9lcrn.ZuIKHy4/NYsewnG2AgIxipGZI6r6W.Y.xTRwaEWqNq6','2021-01-03 12:36:05.518737','2021-03-18 10:06:44.000000','Student',1,0,NULL,NULL,NULL),('ef216bcb-736a-48d6-bb6c-de54ad679fc2','batzionrr@gmail.com','$2b$10$lv6e2oinw/lo0ZDew.Oqg.QFYI04jN1oHzh9dlRZPJMbIiNby9lda','2021-03-24 11:43:31.516466','2021-04-05 12:24:06.000000','Teacher',1,1,NULL,'בתצי','רוז');
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
INSERT INTO `user_role` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e',1),('c94022fc-6a28-441f-83dd-4dd2d00f49fd',3),('ef216bcb-736a-48d6-bb6c-de54ad679fc2',3),('032156a3-8784-40fc-8a27-600e73ef4989',4),('1966ed8c-7e7b-49ea-a914-a1eaf7a9258f',4),('283ec611-fd31-49c4-9df2-032b656ef10b',4),('571ea09b-87ac-4a56-8bdb-b5669e789ad5',4),('68365ee0-e27e-4e41-9482-b0d073712098',4),('810a5bb8-1938-480c-afb6-b0e92a869b76',4),('8559b07e-397e-45bf-920e-11bd973c0bef',4),('9a309c72-d927-4f90-bcab-6ea57767db1f',4),('af537225-e048-48d3-8641-a9de5126b193',4),('afd93365-0e00-46d5-80f2-870bf88169a7',4),('b51ffe60-ee29-4504-94fe-6dda5bee61af',4),('cac9c534-4665-406b-844e-348738ea8122',4);
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

-- Dump completed on 2021-04-05 12:28:36
