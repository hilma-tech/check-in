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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `field`
--

LOCK TABLES `field` WRITE;
/*!40000 ALTER TABLE `field` DISABLE KEYS */;
INSERT INTO `field` VALUES (1,0,1,'את שם השדה','מה אני אמורה לרשום כאן??','text'),(2,1,2,'לא באנגלית','/image/LwEnvglpVGTtMyfLtywpWcs3ckKNR9Uw.jpg','image'),(3,0,3,'ךלכגדחגדכ','[\"לחכגדךךלכחד\",\"חדגחךדגחשד\",\"כדחגךלכש\",\"ךלחכדגחשךכ\",\"חךלגדכחש\",\"חכגדלשךחכ\"]','choice'),(4,0,4,'לכגךדש','חכךלכחגדשך','text'),(5,1,4,'כךלגדחכ','[\"כגדש\",\"כדשכג\",\"כגשד\",\"גכש\",\"חמג\",\"לחיחלי\"]','choice'),(6,0,5,'גכשדכ','גכשדכ','text'),(7,1,6,'ךןיוטג','.....ו!!!!','text'),(8,0,7,'צבדלד','null','text'),(9,0,8,'הכס','[\"fsdf\",\"vdzvc\",\"חמח\",\" צךןםחן\",\"dfv\",\"לצלמ\"]','choice'),(10,0,9,'בדךלגמ','[\"ךסלג צח\",\"צלמ\",\"בצדלגרמחה\",\" כגסהג\",\"לירגר\",\"וכטאג\"]','choice'),(11,0,10,'בלגכ','[\"\",\"סמעכ\",\"מעכס\",\"כגאיסאח\"]','choice'),(12,0,11,'סגדשב','[\"בגש\",\"ארכו\",\"אגאביע\",\" בגדב\",\"גחטטכ\"]','choice'),(13,0,12,'בגזכ','סגכד','text'),(14,0,13,'הגד','[\" בדג\",\"\",\"\",\"בגד\"]','choice'),(15,0,14,'גבלכגמ','[\"\",\"\",\"הבגד\",\"\",\"\",\"הג\"]','choice'),(16,0,15,'בגדש','בגדב','text'),(17,0,16,'צבלמכג','חןטן','text'),(18,0,17,'ךתךל','[\"\",\"\",\"צךל\",\"\",\"\",\"צךלן\"]','choice');
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
  `image` varchar(1000) NOT NULL DEFAULT '/image/amxgDI5RSECPDVwftEI6GWGXFsvTMsXt.jpg',
  `suspended` bit(1) NOT NULL DEFAULT b'0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_4bc6e56e3db9c52e787b5d3251` (`game_name`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'אוכל ','יכולת לאכול','הפומלה של פדות','/image/vMUnnnlTkG15DnKDi7fIFyM6ACgk9xga.jpg',_binary '\0'),(2,'null','null','רון','/image/7VAXR4VP1y2wCNmuwJRQT5lYTa8xO1g3.jpg',_binary '\0'),(3,'วflkŞว໓f &#138','כךלחדכחשךד','כגדחךלכחדלךגדכ','/image/PzwrBzAm2gaJ1diMC2zmM36YiPYazuhu.jpg',_binary '\0'),(4,'חכגדךלכחךלדש','חכגדךלכחגשד','ךלחגדשךלכגדש','/image/LoMZoeTvigswVKJyd5MqZbHLMtt22651.jpg',_binary '\0'),(5,'גכשדג','גכש','גכדשגד','/image/52I9tPR9Lxc0ZhkYY3dVCR6N5OdIRcXA.jpg',_binary '\0'),(6,'בצךלגדזחן','צבסןד','לכגדסםך','/image/HDdjsXu271JR3aBCJhMyZIfiTaIbfo1F.jpg',_binary '\0'),(7,'מאסק','צאזמ','זה נורמלי','/image/xXcX7Yhj5ADoIpBeaB78gPkScFtbhOcj.jpg',_binary '\0'),(8,'צבלגשחרםן','סצםגחכקםן','צבדלחגדן','/image/zRV1wiBZtj1sxbrxa0v858dmwVA5dpg9.jpg',_binary '\0'),(9,'בדגז','בדג','בגד','/image/D3f4f884NVIbL07VzWoRH21K6x1AbM7R.jpg',_binary '\0'),(10,'מכחרקשכחב','צגךלכברק','חמגשלחכג','/image/XntUtK8zVbCRoPxAnSpLghTDgES8xlIi.jpg',_binary '\0'),(11,'במגחש','וסדיוש','צלבסגצ','/image/bHLiZQKLoOv0Mj0nf0lHNsQtxllwgIrI.jpg',_binary '\0'),(12,'בגדבדגבע',' חקלכחכ','בגדב','/image/kknQSAxCfGieJnM2VL3zJeCLpIlguTcE.jpg',_binary '\0'),(13,'בלגדמ','צב ג','במבלחג','/image/zgSpyPbwh9ra0c9kiATDsNdZzhobitPi.jpg',_binary '\0'),(14,'בלגמב',' בתלגדחמ','מגל','/image/dJ8Q1cD1r06GZB7HQ7xmlLNeBwPzcJcP.jpg',_binary '\0'),(15,'מבלחגדש','חמבג','בלג','/image/hmPRrP9W4EIwZlZU6boxWOPfoqXHIliI.jpg',_binary '\0'),(16,'בצךלגד','ךלהבחךכג','בךלכגמלהב','/image/8nNuOeUyo2kEDl9j2WHgwLzqyq1FvrJn.jpg',_binary '\0'),(17,'םןוטאכ','חןם','לןחוטארק','/image/jiGjraO9ooSI4c7ITzc21lzWUZT5mA2d.jpg',_binary '\0');
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
INSERT INTO `user` VALUES ('fe32893c-6b5d-4897-b795-c23173fae1a7','superadmin@gmail.com','$2b$10$usTRf13zMhBhrEr6Y38hKu.1pmOLnvBJ7DWTRfgtqF79H0GniiEL6','2020-11-24 09:47:14.855068','2020-11-24 09:47:14.855068','SuperAdmin');
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

-- Dump completed on 2020-12-06 15:37:15
