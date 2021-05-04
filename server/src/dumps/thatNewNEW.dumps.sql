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
  `school_id` int DEFAULT NULL,
  `name` varchar(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_1cc38e80e4137dafc6c79b721c1` (`school_id`),
  CONSTRAINT `FK_1cc38e80e4137dafc6c79b721c1` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom`
--

LOCK TABLES `classroom` WRITE;
/*!40000 ALTER TABLE `classroom` DISABLE KEYS */;
INSERT INTO `classroom` VALUES (28,44,'א\'2'),(29,44,'ב\'3'),(33,50,'ג\'4'),(34,51,'ג\'5'),(37,44,'ב\'1'),(38,44,'ס\'3'),(41,46,'ו\'7'),(42,46,'ז\'6'),(43,44,'אבג');
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
  UNIQUE KEY `IDX_87ccbfc9b30e46437b6e7f719d` (`classroom_id`,`field_id`),
  KEY `FK_f7031ca819f3f79983273dd25cf` (`game_id`),
  KEY `FK_28211bf7506a8fd301f86988bb2` (`field_id`),
  CONSTRAINT `FK_28211bf7506a8fd301f86988bb2` FOREIGN KEY (`field_id`) REFERENCES `field` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_ef6001153b3d1baf00d4307607c` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK_f7031ca819f3f79983273dd25cf` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=186 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `classroom_field`
--

LOCK TABLES `classroom_field` WRITE;
/*!40000 ALTER TABLE `classroom_field` DISABLE KEYS */;
INSERT INTO `classroom_field` VALUES (176,'להנות ',40,28,25),(177,'[\"one\",\"two\",\"three\"]',34,29,19),(178,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,29,20),(179,'jsafd',34,29,18),(180,'להנות ',40,29,25),(182,'blah blah',31,28,15),(183,'/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',34,28,20),(184,'jsafd',34,28,18),(185,'[\"one\",\"two\",\"three\"]',34,28,19);
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
INSERT INTO `classroom_game` VALUES (28,31),(28,34),(28,40),(28,41),(28,43),(28,45),(29,34),(29,40);
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
  CONSTRAINT `FK_f535c2132ba21d4781e19ec07ef` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (15,'texttt','text','blah blah',1,31),(18,'text','text','jsafd',1,34),(19,'choicee','choice','[\"one\",\"two\",\"three\"]',3,34),(20,'pictchure','image','/image/GNHazZY0P0Jj22GdyiSbeaYUU77KJLkI.jpg',5,34),(25,'מטרות המשחק','text','להנות ',1,40),(26,' גדשש','choice','[\"dd\",\"dd\",\"dd\"]',1,41),(27,'gfdg','text','hgchgfdgf',1,42),(28,'יגדעכחד','text','דיגכה',1,43),(29,'לחדגיכלח','text','דשלחגעכיח',1,44),(30,'םדגיכ','text','גלכחיע',1,47),(31,'דגלחכי','text','גדךלחמכ',2,47),(32,'כךלחדיכ','text','דגךלחמכ',1,48),(33,'לכטגטא','text','בעכגאכג',1,49),(34,'ןודגכ','image','/image/wpE3VKxMXzdGjIRZCQqMmgtuWnT38DoR.jpg',1,75),(35,'דצמגכנ','image','/image/nAKoMMtwmQglYhOfN0AwvV5ot5hb1XFk.png',1,76),(36,'ZDבסZX','image','/image/VYTTDhggzxX2RS8X13IbRFPKJfSOzHl1.png',1,77),(37,'kjszbd','image','/image/fTH1Jl1HBmjMaLpeOBUFjggNoERtWO9B.png',1,80),(38,'fvc','text','csdc',1,81),(39,'csdc','text','cd',1,82),(40,'cdsc','text','cdc',2,82),(41,'cfdvc','image','/image/56BL4WLwnY4oomNNWZ2geAIUwGxxFGem.jpg',2,83),(42,'dfv','text','dsc',1,83),(43,'cdscv','image','/image/BcwhNzKOsSHWNcWPRGY6WPsZjXh6SjPW.png',1,84),(44,'mlkj','image','/image/WXriASKYYGJ6Cq49pGruUkDlAu2L4pUe.jpg',1,85),(45,'cdfv','image','/image/6iNPiBnP6RvxjVWhc8X2fBblL3CQV8H7.jpg',1,86),(46,'exde','image','/image/oOZgXV819bAVouV9tevYcL9l62pV9OPX.jpg',1,87),(47,'xdex','image','/image/5zOVAfesdHSweks1ged7UHE0bQ77awxs.jpg',1,88),(48,'xdw','image','/image/Y9k7Sxw8pKtcBt73pgLdIQtQkcVL6AhI.jpg',2,88),(49,'gxfdz','image','/image/97k7xM6bO4RCIxvIcoSERmnwjRz91eyJ.png',1,89),(50,'askdh','text','ksbd',1,90),(51,'gghchg','image','/image/DtgRJ3x8tPintLMXEPcP104ku7jn52SF.jpg',1,91),(52,'sadnmbms','text','dsnfhbmn',1,92),(53,'csa','text','dsa',1,93),(54,'gffd','image','/image/XvJColxv0mIjqh7PeNgPQddMvpnV1TXp.png',2,93);
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
) ENGINE=InnoDB AUTO_INCREMENT=96 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (31,'text only','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL,NULL),(34,'image text choice','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0',NULL,NULL,NULL),(40,'פינג פונג','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','משחקים מטקות רק לא בים בשביל שהאשכנזים שבנו לא יקבלו כוויות צלייה דרגה 3','בשביל לשחק כדאי להשיג מטקות כדור ורשת.',NULL),(41,'רקד  ד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','      sa     as ','השגד ',NULL),(42,'פדותתתתתתתת','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(43,'ןוטןיעלחד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(44,'דגליכע','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(45,'עכיחעכ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(46,'עכחדעכיח','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(47,'דלחגיכלחגד','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(48,'מצדנבצ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(49,'גטאגא','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(50,'kkkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(51,'jjjjjjjjjjjjjj','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',NULL),(52,'kk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','sda','',''),(53,'k','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(54,'kkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(55,'kkkkkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(56,'kkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(57,'kkkkkkkk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(58,'Shalom','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.loom.com/share/13b2159f462f4e6093c5d5bdecf21b7e'),(59,'hiya','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(60,'kajgs','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(61,'msnbc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(62,'htdgfd','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(63,'anbfdmn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(64,'nsabdfn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(65,'ksjbafbsdfb','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(66,'akndlka','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(67,'idsufhkjdsfn','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(68,'kjsafbkjsdb','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(69,'kjsdkjf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(70,'sjbfmnsbf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(71,'ksjbdfkm','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(72,'osijf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','loom.com/share/d344db487566448eb72655b9a8cf502e'),(73,'snckd','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditGame.jsx'),(74,'kdjfhgks','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditGame.jsx'),(75,'hjdsfjh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(76,'שחדגמ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(77,'דשכ','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://www.youtube.com/'),(78,'jhsdgf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','','https://github.com/hilma-tech/check-in/blob/master/client/src/pages/superAdmin/EditTeacher.jsx'),(79,'jdsbfjh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(80,'zkjxhbk','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(81,'sdfc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(82,'fdszvcs','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(83,'fdvcfdv','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(84,'cdscfds','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(85,'mfdkslm','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(86,'cdsfv','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(87,'xcdfc','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(88,'qsjw','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(89,'hjfhf','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(90,'ksdjfh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(91,'hmvcx','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(92,'shkjdh','https://www.kindpng.com/picc/m/45-455866_hearts-and-stars-png-v-colorful-heart-and.png',_binary '\0','','',''),(93,'two','https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg',_binary '\0','jshdfg','nzbxvc',''),(95,'שקר גס','https://t3.ftcdn.net/jpg/03/88/80/98/240_F_388809884_QkITxFdPCb4j9hIjA0U3tk7RmI390DeH.jpg',_binary '\0','שקרי ביותר','אמן שכן','');
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
  CONSTRAINT `FK_49a820e199b6ba54c42267c6b45` FOREIGN KEY (`classroom_id`) REFERENCES `classroom` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
INSERT INTO `permission` VALUES (2,NULL,'ב','13:03','14:03',29),(3,NULL,'ב','15:03','16:03',29),(4,NULL,'ב','12:03','13:03',29),(6,NULL,'ג','11:08','12:05',29),(8,NULL,'ד','13:08','17:09',29),(9,NULL,'ד','11:04','14:06',29);
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
  `city` varchar(30) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `school`
--

LOCK TABLES `school` WRITE;
/*!40000 ALTER TABLE `school` DISABLE KEYS */;
INSERT INTO `school` VALUES (44,'סניקרס','בית שמש'),(46,'ליצ\'י','סוט'),(49,'סבבה','עפולה'),(50,'eek','גרעיני'),(51,'familia','משפוחה');
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
INSERT INTO `student_classroom` VALUES ('f6079b34-2aef-418c-8462-7af1158d427d',33);
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
INSERT INTO `teacher_classroom` VALUES (28,'2de835a7-3dc6-4e5e-a36f-45892dbbf758'),(28,'e83eb568-051b-4af6-80df-ccdb4e779a9d'),(29,'0e13f3ed-0915-4646-8492-0090cda6a631'),(29,'2de835a7-3dc6-4e5e-a36f-45892dbbf758'),(29,'b780a80c-760f-4052-b88e-f3eafe5050b9'),(29,'ec317ddb-fb49-4ed6-bcf9-13bae607fc1d'),(43,'2de835a7-3dc6-4e5e-a36f-45892dbbf758');
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
  CONSTRAINT `FK_ed1bcfe9ae995a567b529f316a2` FOREIGN KEY (`school_id`) REFERENCES `school` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('0e13f3ed-0915-4646-8492-0090cda6a631','bond@gmail.com','$2b$10$b7W.16dilw60SOCx7nylT.Bd9oKlb5FoIWI1s4l9mdv7v60sMT4dq','2021-04-19 11:55:01.770198','2021-04-19 11:55:01.000000','Teacher',44,0,'022a020a16643b3d9005bad9e72a4e931fdfa775f207643b05a12cd4eb6c0116349a65c81e5c49fb48cbb29e4896e3bc6ba4','Savannah','Parent'),('2de835a7-3dc6-4e5e-a36f-45892dbbf758','batzy@gmail.com','$2b$10$dFWFLq0Vl/7OiyoGQIPMauPkHrJv3DdD2cSDFhbB5qdXzzsFtnG2W','2021-04-05 15:35:46.543909','2021-05-02 11:23:55.000000','Teacher',44,1,'','בתצי','רוזננננtrs'),('70df752c-744b-4ee2-ace4-e56da048b23e','superadmin@gmail.com','$2b$10$Th1aiBam/B9kQqGcJX/fM.E32DH1mB3TxB/yirmrhCC58uBiBdGqe','2021-01-03 12:30:56.415866','2021-01-03 12:30:56.415866','SuperAdmin',NULL,0,NULL,NULL,NULL),('b780a80c-760f-4052-b88e-f3eafe5050b9','cnkjs63@gmail.com','$2b$10$DWX1P5N0ETT4TdD9SP9GMerAJo3kLno9ShpPBIFw4pITLVGt//mtS','2021-04-11 10:55:09.406201','2021-04-14 11:47:12.000000','Teacher',44,0,'be875c6245f37969eaa59050ebb1d6898b48e83e5a4f469032a9b42ddfcb7b11d9365585982d37c7626ad3a4ea0998e1170d','הרברט','שמופסי'),('e83eb568-051b-4af6-80df-ccdb4e779a9d','batzionrr@gmail.com','$2b$10$6BVU77xVXm9utwzPjoyS/OaQsFW.Uk7sBYIai5kbGAHj26mt/s73y','2021-04-27 11:42:24.216709','2021-05-02 12:07:45.000000','Teacher',44,0,NULL,'hfkvhs','cbd kjnkjds'),('ec317ddb-fb49-4ed6-bcf9-13bae607fc1d','a.ds@cs.co','$2b$10$UNuczAelFg/mUdPVb0Fdveq9U5Jw4Ov96YixXQfohSnvAzar.HFh2','2021-04-12 11:41:43.621298','2021-04-14 11:46:04.000000','Teacher',44,0,'4b87923c4d2f4ec6e1c2d518a5dfc3a4ae4ebd3235ef7bebe2603e902a2b73c0fbb8227dc20d6e97c55d2d7098241e9361a2','sand','castle'),('f6079b34-2aef-418c-8462-7af1158d427d','userrrnem','$2b$10$tTRausILx3egegldkqNSZ.LmnTcHM1hXMX.4xbkbkz5arpiSipRXO','2021-04-12 11:28:12.384604','2021-04-12 11:28:12.384604','Student',50,0,NULL,'אושי','כבהן');
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
INSERT INTO `user_role` VALUES ('70df752c-744b-4ee2-ace4-e56da048b23e',1),('0e13f3ed-0915-4646-8492-0090cda6a631',3),('2de835a7-3dc6-4e5e-a36f-45892dbbf758',3),('b780a80c-760f-4052-b88e-f3eafe5050b9',3),('e83eb568-051b-4af6-80df-ccdb4e779a9d',3),('ec317ddb-fb49-4ed6-bcf9-13bae607fc1d',3),('f6079b34-2aef-418c-8462-7af1158d427d',4);
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

-- Dump completed on 2021-05-04  9:27:54
