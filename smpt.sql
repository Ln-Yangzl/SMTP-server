-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: smtp
-- ------------------------------------------------------
-- Server version	8.0.26

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
-- Table structure for table `address_book`
--

DROP TABLE IF EXISTS `address_book`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address_book` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL DEFAULT '' COMMENT '通信对象名称',
  `address` varchar(40) NOT NULL COMMENT '邮件地址',
  PRIMARY KEY (`address_id`),
  UNIQUE KEY `address_book_address_id_uindex` (`address_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='通讯录';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_book`
--

LOCK TABLES `address_book` WRITE;
/*!40000 ALTER TABLE `address_book` DISABLE KEYS */;
/*!40000 ALTER TABLE `address_book` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_drafts`
--

DROP TABLE IF EXISTS `mail_drafts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail_drafts` (
  `mail_id` int NOT NULL AUTO_INCREMENT,
  `receivers` varchar(100) NOT NULL DEFAULT '' COMMENT '收件人，以逗号分隔',
  `subject` varchar(50) NOT NULL DEFAULT '' COMMENT '邮件主题',
  `content` varchar(200) NOT NULL DEFAULT '' COMMENT '邮件正文，长度大于200时存储地址',
  `is_file` tinyint(1) NOT NULL DEFAULT '0' COMMENT '指示content是否存储的是文件地址',
  `update_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间/更新时间',
  PRIMARY KEY (`mail_id`),
  UNIQUE KEY `mail_drafts_mail_id_uindex` (`mail_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_drafts`
--

LOCK TABLES `mail_drafts` WRITE;
/*!40000 ALTER TABLE `mail_drafts` DISABLE KEYS */;
/*!40000 ALTER TABLE `mail_drafts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_sended`
--

DROP TABLE IF EXISTS `mail_sended`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mail_sended` (
  `mail_id` int NOT NULL AUTO_INCREMENT,
  `receivers` varchar(100) NOT NULL COMMENT '收件人，以逗号分隔',
  `subject` varchar(50) NOT NULL COMMENT '邮件主题',
  `content` varchar(200) NOT NULL DEFAULT '' COMMENT '邮件正文，大于100字符时保存文件地址',
  `is_file` tinyint(1) NOT NULL DEFAULT '0' COMMENT '指示content栏是否为文件地址',
  `send_time` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '邮件发送时间',
  PRIMARY KEY (`mail_id`),
  UNIQUE KEY `mail_log_mail_id_uindex` (`mail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='记录已发送的邮件';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_sended`
--

LOCK TABLES `mail_sended` WRITE;
/*!40000 ALTER TABLE `mail_sended` DISABLE KEYS */;
INSERT INTO `mail_sended` VALUES (1,'565213263@qq.com;979710450@qq.com','前后端连通测试','测试正文1\n行2测试\n行3asdfasdfa',0,'2021-10-28 18:26:59'),(2,'565213263@qq.com;979710450@qq.com','前后端连通测试2+发送测试','测试正文1\n行2测试\n行3asdfasdfa',0,'2021-10-28 18:36:26'),(3,'565213263@qq.com;979710450@qq.com','前后端连通测试2+发送测试1','测试正文1\n行2测试\n行3asdfasdfa',0,'2021-10-28 18:51:19'),(4,'565213263@qq.com;979710450@qq.com','前后端连通测试2+发送测试1','测试正文1\n行2测试\n行3asdfasdfa',0,'2021-10-28 18:59:11'),(5,'565213263@qq.com;979710450@qq.com','前后端连通测试2+发送测试1','测试正文1\n行2测试\n行3asdfasdfa',0,'2021-10-28 18:59:31'),(6,'565213263@qq.com','发送超时重连测试','',0,'2021-10-28 19:08:39'),(7,'565213263@qq.com','发送超时重连测试2','',0,'2021-10-28 19:30:14'),(8,'565213263@qq.com','邮件超时重试3','',0,'2021-10-28 19:59:33');
/*!40000 ALTER TABLE `mail_sended` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-28 22:41:22
