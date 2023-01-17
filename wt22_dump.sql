CREATE DATABASE  IF NOT EXISTS `wt22` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `wt22`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: wt22
-- ------------------------------------------------------
-- Server version	5.7.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `nastavniks`
--

DROP TABLE IF EXISTS `nastavniks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nastavniks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nastavniks`
--

LOCK TABLES `nastavniks` WRITE;
/*!40000 ALTER TABLE `nastavniks` DISABLE KEYS */;
INSERT INTO `nastavniks` VALUES (1,'USERNAME2','$2b$10$tYNv/U.MNRkPQAohxtTf2Olld6.dU6myx/4TiN0ail4Qks9luxi2K'),(2,'USERNAME','$2b$10$WZUb1ufVRm9QntmQIp2jve5ikV7X4HkF/cgirlcS92sw0rdk6Bfc2');
/*!40000 ALTER TABLE `nastavniks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmets`
--

DROP TABLE IF EXISTS `predmets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predmets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `naziv` varchar(255) NOT NULL,
  `brojPredavanjaSedmicno` int(11) NOT NULL,
  `brojVjezbiSedmicno` int(11) NOT NULL,
  `nastavnikId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `naziv` (`naziv`),
  KEY `nastavnikId` (`nastavnikId`),
  CONSTRAINT `predmets_ibfk_1` FOREIGN KEY (`nastavnikId`) REFERENCES `nastavniks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmets`
--

LOCK TABLES `predmets` WRITE;
/*!40000 ALTER TABLE `predmets` DISABLE KEYS */;
INSERT INTO `predmets` VALUES (1,'Razvoj mobilnih aplikacija',2,2,1),(2,'Web Tehnologije',2,2,2),(3,'Razvoj programskih rjesenja',3,2,2);
/*!40000 ALTER TABLE `predmets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `predmetstudents`
--

DROP TABLE IF EXISTS `predmetstudents`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `predmetstudents` (
  `studentId` int(11) NOT NULL,
  `predmetId` int(11) NOT NULL,
  PRIMARY KEY (`studentId`,`predmetId`),
  UNIQUE KEY `predmetstudents_studentId_predmetId_unique` (`studentId`,`predmetId`),
  KEY `predmetId` (`predmetId`),
  CONSTRAINT `predmetstudents_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `predmetstudents_ibfk_2` FOREIGN KEY (`predmetId`) REFERENCES `predmets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `predmetstudents`
--

LOCK TABLES `predmetstudents` WRITE;
/*!40000 ALTER TABLE `predmetstudents` DISABLE KEYS */;
INSERT INTO `predmetstudents` VALUES (1,1),(2,1),(1,2),(2,2),(1,3),(2,3);
/*!40000 ALTER TABLE `predmetstudents` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prisustvos`
--

DROP TABLE IF EXISTS `prisustvos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prisustvos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sedmica` int(11) NOT NULL,
  `predavanja` int(11) DEFAULT NULL,
  `vjezbe` int(11) DEFAULT NULL,
  `index` int(11) NOT NULL,
  `studentId` int(11) NOT NULL,
  `predmetId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `studentId` (`studentId`),
  KEY `predmetId` (`predmetId`),
  CONSTRAINT `prisustvos_ibfk_1` FOREIGN KEY (`studentId`) REFERENCES `students` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  CONSTRAINT `prisustvos_ibfk_2` FOREIGN KEY (`predmetId`) REFERENCES `predmets` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prisustvos`
--

LOCK TABLES `prisustvos` WRITE;
/*!40000 ALTER TABLE `prisustvos` DISABLE KEYS */;
INSERT INTO `prisustvos` VALUES (1,1,2,2,12345,1,1),(2,2,2,2,12345,1,1),(3,3,2,2,12345,1,1),(4,1,1,2,12345,1,2),(5,2,1,2,12345,1,2),(6,3,1,2,12345,1,2),(7,1,1,1,12345,1,3),(8,2,1,1,12345,1,3),(9,3,1,1,12345,1,3),(10,1,0,2,12346,2,1),(11,2,0,2,12346,2,1),(12,3,0,2,12346,2,1),(13,1,1,2,12346,2,2),(14,2,1,2,12346,2,2),(15,3,1,2,12346,2,2),(16,1,1,0,12346,2,3),(17,2,1,0,12346,2,3),(18,3,1,0,12346,2,3);
/*!40000 ALTER TABLE `prisustvos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `students` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(255) NOT NULL,
  `index` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index` (`index`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `students`
--

LOCK TABLES `students` WRITE;
/*!40000 ALTER TABLE `students` DISABLE KEYS */;
INSERT INTO `students` VALUES (1,'Neko Nekic',12345),(2,'Drugi Neko',12346);
/*!40000 ALTER TABLE `students` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-17  4:24:32
