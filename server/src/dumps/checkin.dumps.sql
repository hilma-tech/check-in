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
INSERT INTO `field` VALUES (1,0,63,'בגלחדמבחל','גםדכםן'),(2,0,64,'בגךלג','סצךגד');
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
) ENGINE=InnoDB AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,'אוכל ','יכולת לאכול','הפומלה של פדות','/image/vMUnnnlTkG15DnKDi7fIFyM6ACgk9xga.jpg',_binary '\0'),(2,'null','null','רון','/image/7VAXR4VP1y2wCNmuwJRQT5lYTa8xO1g3.jpg',_binary '\0'),(3,'วflkŞว໓f &#138','כךלחדכחשךד','כגדחךלכחדלךגדכ','/image/PzwrBzAm2gaJ1diMC2zmM36YiPYazuhu.jpg',_binary '\0'),(4,'חכגדךלכחךלדש','חכגדךלכחגשד','ךלחגדשךלכגדש','/image/LoMZoeTvigswVKJyd5MqZbHLMtt22651.jpg',_binary '\0'),(5,'גכשדג','גכש','גכדשגד','/image/52I9tPR9Lxc0ZhkYY3dVCR6N5OdIRcXA.jpg',_binary '\0'),(6,'בצךלגדזחן','צבסןד','לכגדסםך','/image/HDdjsXu271JR3aBCJhMyZIfiTaIbfo1F.jpg',_binary '\0'),(7,'מאסק','צאזמ','זה נורמלי','/image/xXcX7Yhj5ADoIpBeaB78gPkScFtbhOcj.jpg',_binary '\0'),(8,'צבלגשחרםן','סצםגחכקםן','צבדלחגדן','/image/zRV1wiBZtj1sxbrxa0v858dmwVA5dpg9.jpg',_binary '\0'),(9,'בדגז','בדג','בגד','/image/D3f4f884NVIbL07VzWoRH21K6x1AbM7R.jpg',_binary '\0'),(10,'מכחרקשכחב','צגךלכברק','חמגשלחכג','/image/XntUtK8zVbCRoPxAnSpLghTDgES8xlIi.jpg',_binary '\0'),(11,'במגחש','וסדיוש','צלבסגצ','/image/bHLiZQKLoOv0Mj0nf0lHNsQtxllwgIrI.jpg',_binary '\0'),(12,'בגדבדגבע',' חקלכחכ','בגדב','/image/kknQSAxCfGieJnM2VL3zJeCLpIlguTcE.jpg',_binary '\0'),(13,'בלגדמ','צב ג','במבלחג','/image/zgSpyPbwh9ra0c9kiATDsNdZzhobitPi.jpg',_binary '\0'),(14,'בלגמב',' בתלגדחמ','מגל','/image/dJ8Q1cD1r06GZB7HQ7xmlLNeBwPzcJcP.jpg',_binary '\0'),(15,'מבלחגדש','חמבג','בלג','/image/hmPRrP9W4EIwZlZU6boxWOPfoqXHIliI.jpg',_binary '\0'),(16,'בצךלגד','ךלהבחךכג','בךלכגמלהב','/image/8nNuOeUyo2kEDl9j2WHgwLzqyq1FvrJn.jpg',_binary '\0'),(17,'םןוטאכ','חןם','לןחוטארק','/image/jiGjraO9ooSI4c7ITzc21lzWUZT5mA2d.jpg',_binary '\0'),(18,'רון אומר שלום hi78y790980','להגיד שלום hi45','שלום רון','/image/CtHXyk4ZXqqLl5MONMPTGB6VEzS8R66o.jpg',_binary '\0'),(19,'kjugh','hiuj','בהנ','/image/6o1YStiebfxmdkAExS0v3j1K7BBWYpyI.jpg',_binary '\0'),(20,'\n\n\nconst a = 5;\nconsole.log(a);\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n','123 3211 ','סבהנמכסיגיסבנננגזע','/image/dilcaMVhvE6ewTmfpBelhGOgp26dWexn.png',_binary '\0'),(21,';;',';','שלום','/image/LTQA0lfG16XBCNQ41UC49sDWhdVw8Uv4.jpg',_binary '\0'),(22,'  @Post(\'/addGame\')','kjhjhj','עננים','/image/l59SpvTtBC7d312gkeemqcTiwCl2aNvd.png',_binary '\0'),(23,'ללל','לחלל','מתושלח הלך לגן אתמול בחמש','/image/b048Y7nwUjq7fkzDjznbrlyNaw1Q9juk.png',_binary '\0'),(24,'לגכףךליזכאזר','לרצVT>EWLGKE\'ר','ילכיכגפםלזילך','/image/CaTnmWk45fkz01pYCmS2i7p7nB4e4yY0.png',_binary '\0'),(25,'הכעסזגכ','<a href={https://he.wiktionary.org/wiki/%D7%99%D7%95%D7%A0%D7%99%D7%A7%D7%95%D7%93} />','לעיההסעכגנד טא','/image/0rQwXXJUt1p9fDmVK0y8Owo8C8Vyfb0z.png',_binary '\0'),(26,'.ץתצמ','ףךמ ','ףךל','/image/5V5pKF8BtEPwJXDiXYFTM7KOwSxhbeyo.png',_binary '\0'),(27,'כה &#128571','עכי ','עכינה','/image/liNtUAWZusnGoQd7I2hpngI5Re3dAnRY.png',_binary '\0'),(28,'יייי','file:///home/carmel/projects/check-in/client/src/dumps/delete','יייייייייייייייייייייייייייי','/image/NUueWTGYvdnmsUKBiu9CGIU9fk0P1GAs.png',_binary '\0'),(29,'בגךלדמגד','צבךלגמ\n\nמבסחגד ','מלכגחסד סדלגמ','/image/ZLYW4YmzlHzwY5XXzXXVbChFeVkr8ffS.jpg',_binary '\0'),(30,'חגחגחגחגח','חייב להיכנס','מיצי הגבר','/image/SHi70X4EGLM25BKaGZbD9MlW1L6qkss1.jpg',_binary '\0'),(31,'בךלצג','דצבךלג','חבלחג','/image/PYntYAsfNFs4K4WKfJOoMkQsVH3Z1Bw0.jpg',_binary '\0'),(32,'כצךל','כצלר','צךלהכג','/image/qFeyX3Fe6ORjXyZAEXyUrqYMHMjSKe2s.jpg',_binary '\0'),(33,'מגד','סחגד','גסמחמג','/image/4AyLu32zFKTm97yx6FK7xv4LgB6vAAOO.jpg',_binary '\0'),(34,'לבצגב','בצלגדב','חיעכ','/image/qURmcFZ6v4R2b6XTBwxSXie3Q11v117y.jpg',_binary '\0'),(35,'בדיקה','בדיקה','משחק חדש','/image/aWVVDc0XICKLvufgtnnrdzqN1sW90SMx.jpg',_binary '\0'),(36,'בן אדם גבוה','להיות גבוה','אלעד','/image/9OuPfwfnN2r214ydmi8tX7qQYvS9I0Dm.jpg',_binary '\0'),(37,'הפעם הם לא חחים בסרט כד שאלעד לא יתעצבן','לא להתעצבן','עוד אלעד','/image/v7S7qQIrHKoa23qqjb06Mr6bYYsYTeQp.jpg',_binary '\0'),(38,'אין ל חן','פשוט להיות חן','חן','/image/5RWSJintzutql7KSgfBO0E7TJ4iRoNH9.jpg',_binary '\0'),(39,'בשביל מוריה','אין','חסר שם','/image/UKlAen5an0s8Zb0hKSf2ZICJt4jPagrR.jpg',_binary '\0'),(41,'בלג','מבחג','משחק חדש יותר','/image/go7vH9mWXZqQge5sn6zFDQX2BzzSVCg2.jpg',_binary '\0'),(42,'במלחכג','סגלדמ','אאאאאאא','/image/a4aohscGllfZn0D69gVaeD8FpMypBiTb.jpg',_binary '\0'),(43,'בן אדם מדהים','להיות בת ציון','בת ציון','/image/0fdHEwPfsqwvhIsdJYuJWV5VJCBWr9NI.jpg',_binary '\0'),(44,'אאא','אא','אא','/image/JolHqTt3Dn1A6MO6K6h1qkRrIuH4z4Wo.jpg',_binary '\0'),(45,'מגמב','במצלג','מבחגלמבלחמ','/image/iG1b2ql34FtcRsxCX0vryjYH89P9Pw2t.jpg',_binary '\0'),(46,'משחק','משחק','משחק','/image/ip9tUGi1dijxm7iM8SP4vjK0F05Kt5kH.jpg',_binary '\0'),(47,'בצלגח','במלגמ','אנשים','/image/KPTTu4WAr4ym1t7tTIaLt6EgELOXlPVU.jpg',_binary '\0'),(48,'במלגדב','סמלגד','אין שם','/image/TL30S5wVnXQMXaN2y9rUNhveNIm8pqzh.jpg',_binary '\0'),(49,'צבךל','סלגחך','אין רעיון לשם','/image/DH7VnSznCCf8FQ0bteE0LlJNV3nWxxCP.jpg',_binary '\0'),(50,'צבלכגד','מבגלחמל','עוד משחק','/image/bqV7ZPOH0up4PAYnapISfrzDsjck4OsZ.jpg',_binary '\0'),(51,'בלכק','מבלגמ','ועוד משחק','/image/9T3hO32TUIjdSynrvlMeUU7RYZWKIuiC.jpg',_binary '\0'),(52,'בצלכחלהב','במלחמכגד','ואחרון חביב','/image/DTQYB9OddJy0KzC73EgvIQocGKMiFKgT.jpg',_binary '\0'),(53,'התיאור יכול להיות כל דבר.\nאתיות באנגלית, בעברית, מספרים, סימנים... הכל...','הדרישות','שם המשחק','/image/6FogYeGmiVx54YomTaZIf0DuIjhVjrQm.jpg',_binary '\0'),(55,'מבחגמדלח','מלחבד','שלום לכולם','/image/mpnJBsTkd4cqKVYdOKLBNnlCUMtdVFbe.jpg',_binary '\0'),(57,'לצבלג','צלבגד','שלום נוסף','/image/6hRNFhiYlgnmMVOxlKSYCnplxF3G5Q6h.jpg',_binary '\0'),(59,'לחבחלגד','לבצגלחד','איקס עיגול','/image/3gfETPXIlvqbPo0SKCGNaJljbTQzova4.jpg',_binary '\0'),(60,'מבלחגכלז','בצלחכד','משחק לדוגמא','/image/F5VkXqtbRDAXS3bQToz0UEvaM1CjWBDL.jpg',_binary '\0'),(61,'ךטארק','דגקדגלגח','נסיוןנסיוןנסיון','/image/XBVP2Rq36NFiEqYMOAvah1hPhmAr9p2t.png',_binary '\0'),(62,'דגמלח','סתגך\'צק','צסךלגדחןכ','/image/yr22iuhD8EMVPsH9d8Y5hOR7dcXk8E1M.jpg',_binary '\0'),(63,'ב חגדבח\n\nב\n\nגב\nף\n\n בצדב',' גבמלג','צסלךדגב','/image/fNedKFoG9HEaCQVOQ4IyLhRk7CPraPp8.jpg',_binary '\0'),(64,'במגד','מבסלחגד','צבסלמלג','/image/V3tw8SBhmAZAdrLtFckMZRV8CRQrqpwz.jpg',_binary '\0'),(66,'כביאבי','באטטא','עננים  ','/image/qPPW54vOXRxnuFMkjJOjciVuXHRrosQe.jpg',_binary '\0');
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
  `schoolId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_78a916df40e02a9deb1c4b75ed` (`username`),
  KEY `IDX_31ef2b4d30675d0c15056b7f6e` (`type`),
  KEY `FK_709e51110daa2b560f0fc32367b` (`schoolId`),
  CONSTRAINT `FK_709e51110daa2b560f0fc32367b` FOREIGN KEY (`schoolId`) REFERENCES `school` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('05153a7c-1470-46e4-9447-77c42db24d8f','student5@gmail.com','$2b$10$kESDWtj27NXy5cHQMQPljebceMvAZEzCbuWk7rtjGrV6dHKyHC7cq','2020-12-22 11:35:17.348802','2020-12-22 11:35:17.348802','Student','שירה גולשטיין',1),('13277e95-eaf8-4de4-a6d1-f1dee37ed23f','student4@gmail.com','$2b$10$IGVl.9hAcY7NlGt7Q0x4rOFA1AJcxaIYFhcCsnNJtiypSCxq72Ubm','2020-12-22 11:34:55.371287','2020-12-22 11:34:55.371287','Student','בת ציון רוז',1),('1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83','student1@gmail.com','$2b$10$OaLYrcnennV.UcRx0z9VE.4Mg80hHAbO5d5woBWdWBlBMzpKAA3ZK','2020-12-22 11:33:51.762698','2020-12-22 11:33:51.762698','Student','אדווה אורן',1),('1f9ca189-28d5-40b3-8d73-58f9a10b806a','student6@gmail.com','$2b$10$lSGfdS5FW2fK99rRGIEGs./XU8lmqtJIjnOMubXcuTwWOESKg3Zvu','2020-12-22 11:35:32.645470','2020-12-22 11:35:32.645470','Student','רון איסר',1),('233b5b0a-22c0-48e2-9ab2-3696ded77935','teacher2@gmail.com','$2b$10$neZDpVpzPiFMqjoeVrUfZO9w6S9hN5o8AdewZbn0kd4MV/jn2mF4C','2020-12-23 10:21:45.923068','2020-12-23 10:21:45.923068','Teacher','נורית כהן',2),('2a99dedc-7036-490c-822c-8f2145929e20','student3@gmail.com','$2b$10$BgaqQWmwoOVX1R2ys6zFHuXY8XOtgymz7M.ItojR/czviDYrV/TuK','2020-12-22 11:34:31.539350','2020-12-22 11:34:31.539350','Student','בן אדם',1),('3e956faf-8919-4b20-83bb-e86abf58d7d4','student8@gmail.com','$2b$10$pvB3lfLqq7l2jpuU1/RH.urEwscwZ0RHMUX3DYB/HT5dqrCE.bWDm','2020-12-23 09:28:59.008570','2020-12-23 09:28:59.008570','Student','עינב בורג',1),('4b43bc86-65d2-41e9-bde8-5a06222bddb8','student2@gmail.com','$2b$10$UKyp9jw.Fhz/FoIirH.QgeT67StMQTz7IN8HPK60LKV3i7SN.ovx2','2020-12-22 11:34:17.494585','2020-12-22 11:34:17.494585','Student','שלמה קיפניס',1),('4be3a08f-f7ca-413d-abfc-1332240f5e6e','student10@gmail.com','$2b$10$TtK0dd.s.6BBnJ1EXw8xf.FNoGF.o7xmiffvINQ2PX8Zp3uKmTUMK','2020-12-23 09:49:35.209045','2020-12-23 09:49:35.209045','Student','רות תשובה',1),('4e82178c-02a1-49af-bfe6-2d23e21126e2','teacher3@gmail.com','$2b$10$UhcgquFsCykJ2gQfn9ndjeDIAM3WW8H845rI5y8XhGfkrWSm5dD36','2020-12-23 10:22:18.589259','2020-12-23 10:22:18.589259','Teacher','רחל ויצמן',3),('71f29a5a-c62f-47eb-aac3-679b767c7eed','student9@gmail.com','$2b$10$X6elnBkI/cBMz4FzoP7bl.H/Mf578c4fgUOuUzzyWXusanuglAVD6','2020-12-23 09:37:57.251526','2020-12-23 09:37:57.251526','Student','שקד סולמון',1),('76460c3d-5923-4fd9-ac98-d8fc57ac5d04','student@gmail.com','$2b$10$I/Ad/sOSjQWIwHuxHTKok.9xwDIvYdjJfzUXi04j3erCQPSaDgUHO','2020-12-22 11:33:18.775939','2020-12-22 11:33:18.775939','Student','מוריה קדוש',1),('aff4cf84-52cd-4eea-92fc-ec5346584e22','teacher4@gmail.com','$2b$10$EDkAVBZNfPZY6iaVBKUsvu3NxH8VJMTfgwf.ZFWjaRugrH6694eEK','2020-12-23 10:22:45.361554','2020-12-23 10:22:45.361554','Teacher','חגית פינגלין',3),('bc9ccae8-7027-44e3-adde-6947c7f11c01','teacher@gmail.com','$2b$10$.SNFe2T0h7/x3abU1Q9AEeGszEEYsAROCWtI6iVSj6J/3jGRTXmSG','2020-12-23 10:21:03.109510','2020-12-23 10:21:03.109510','Teacher','מיכל יגל',1),('f29cfe44-9099-4b84-a08b-e9bff17ca6dd','teacher1@gmail.com','$2b$10$Dc3.6dXZbsJTCyiEW1pvQukDY7TLKx/afF.8F175t9eraKWcJcwqi','2020-12-23 10:21:23.827749','2020-12-23 10:21:23.827749','Teacher','חוה כהן',2),('f91a2e6d-f04f-4dac-983b-d5d4fe412e8d','student7@gmail.com','$2b$10$QXZSpbY.qcpxnSX6FJhyTuFr/oCJIi7VGfqYcpEStUAIJ8dpK30KC','2020-12-22 11:35:51.161964','2020-12-22 11:35:51.161964','Student','טליה איתן',1),('fe32893c-6b5d-4897-b795-c23173fae1a7','superadmin@gmail.com','$2b$10$usTRf13zMhBhrEr6Y38hKu.1pmOLnvBJ7DWTRfgtqF79H0GniiEL6','2020-11-24 09:47:14.855068','2020-11-24 09:47:14.855068','SuperAdmin',NULL,NULL);
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
INSERT INTO `user_role` VALUES ('fe32893c-6b5d-4897-b795-c23173fae1a7',1),('233b5b0a-22c0-48e2-9ab2-3696ded77935',2),('4e82178c-02a1-49af-bfe6-2d23e21126e2',2),('aff4cf84-52cd-4eea-92fc-ec5346584e22',2),('bc9ccae8-7027-44e3-adde-6947c7f11c01',2),('f29cfe44-9099-4b84-a08b-e9bff17ca6dd',2),('05153a7c-1470-46e4-9447-77c42db24d8f',4),('13277e95-eaf8-4de4-a6d1-f1dee37ed23f',4),('1ef9e975-f9b0-4f3b-b3f3-20d1be0e1c83',4),('1f9ca189-28d5-40b3-8d73-58f9a10b806a',4),('2a99dedc-7036-490c-822c-8f2145929e20',4),('3e956faf-8919-4b20-83bb-e86abf58d7d4',4),('4b43bc86-65d2-41e9-bde8-5a06222bddb8',4),('4be3a08f-f7ca-413d-abfc-1332240f5e6e',4),('71f29a5a-c62f-47eb-aac3-679b767c7eed',4),('76460c3d-5923-4fd9-ac98-d8fc57ac5d04',4),('f91a2e6d-f04f-4dac-983b-d5d4fe412e8d',4);
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

-- Dump completed on 2020-12-23 10:31:26
