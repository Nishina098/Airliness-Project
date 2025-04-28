-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 07, 2025 at 05:16 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eticket_airplanes`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nm_admin` varchar(255) NOT NULL,
  `username_admin` varchar(255) NOT NULL,
  `email_admin` varchar(255) NOT NULL,
  `img_admin` varchar(255) DEFAULT NULL,
  `url_admin` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `uuid`, `nm_admin`, `username_admin`, `email_admin`, `img_admin`, `url_admin`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, '5fefc21f-9988-4a37-8e43-f32b71fd520d', 'Super Admin', 'superadmin', 'admin@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$vRuFJy0De3z4Mdc0iBe3bg$nL7ZYVSqUvW4zytDYTvEHoz7A5mP16uL6rgpX8d3psE', 'administrator', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34');

-- --------------------------------------------------------

--
-- Table structure for table `maskapai`
--

CREATE TABLE `maskapai` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `nama_maskapai` varchar(255) NOT NULL,
  `kode_maskapai` varchar(10) NOT NULL,
  `logo_maskapai` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `status_operasional` enum('aktif','nonaktif') NOT NULL DEFAULT 'aktif',
  `jumlah_pesawat` int(11) NOT NULL,
  `nomor_kontak` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `website` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'maskapai',
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `maskapai`
--

INSERT INTO `maskapai` (`id`, `uuid`, `nama_maskapai`, `kode_maskapai`, `logo_maskapai`, `deskripsi`, `status_operasional`, `jumlah_pesawat`, `nomor_kontak`, `email`, `website`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
(1, 'd21aa899-eade-475a-925d-000d9bd2e461', 'Maskapai 1', 'MK1', 'maskapai1.png', 'Deskripsi untuk maskapai 1', 'aktif', 60, '081234560001', 'maskapai1@gmail.com', 'https://www.maskapai1.com', '$argon2id$v=19$m=65536,t=3,p=4$hcbnb4u7LmnCp8Ga8NWlUg$P92mfUhu76/i7n9swbKrmxqrjc6YsD6ZvA0RQRXQZXY', 'maskapai', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
(2, '80171ad6-c212-4ffc-8b6c-c229fb5b7c6d', 'Maskapai 2', 'MK2', 'maskapai2.png', 'Deskripsi untuk maskapai 2', 'aktif', 70, '081234560002', 'maskapai2@gmail.com', 'https://www.maskapai2.com', '$argon2id$v=19$m=65536,t=3,p=4$hcbnb4u7LmnCp8Ga8NWlUg$P92mfUhu76/i7n9swbKrmxqrjc6YsD6ZvA0RQRXQZXY', 'maskapai', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
(3, '6bf2ccbe-1fdb-47e0-a5d0-36801b30ae03', 'Maskapai 3', 'MK3', 'maskapai3.png', 'Deskripsi untuk maskapai 3', 'aktif', 80, '081234560003', 'maskapai3@gmail.com', 'https://www.maskapai3.com', '$argon2id$v=19$m=65536,t=3,p=4$hcbnb4u7LmnCp8Ga8NWlUg$P92mfUhu76/i7n9swbKrmxqrjc6YsD6ZvA0RQRXQZXY', 'maskapai', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
(4, '8605d420-fcd0-4b78-8fca-2753d7a17261', 'Maskapai 4', 'MK4', 'maskapai4.png', 'Deskripsi untuk maskapai 4', 'aktif', 90, '081234560004', 'maskapai4@gmail.com', 'https://www.maskapai4.com', '$argon2id$v=19$m=65536,t=3,p=4$hcbnb4u7LmnCp8Ga8NWlUg$P92mfUhu76/i7n9swbKrmxqrjc6YsD6ZvA0RQRXQZXY', 'maskapai', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
(5, 'a4bd8ac2-6a94-4e36-a626-79df514c6936', 'Maskapai 5', 'MK5', 'maskapai5.png', 'Deskripsi untuk maskapai 5', 'aktif', 100, '081234560005', 'maskapai5@gmail.com', 'https://www.maskapai5.com', '$argon2id$v=19$m=65536,t=3,p=4$hcbnb4u7LmnCp8Ga8NWlUg$P92mfUhu76/i7n9swbKrmxqrjc6YsD6ZvA0RQRXQZXY', 'maskapai', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
(7, 'c88952df-979f-4506-b9b6-a6919caa3355', 'garuda', 'GRD', 'c8262110c54cc1655deb60cf39c48c91.jpg', 'Garuda Airliness', 'aktif', 50, '0812000000019', 'garuda@gmail.com', 'https://www.garuda.com', '$argon2id$v=19$m=65536,t=3,p=4$f+3sSC25PG90m9twMTVAig$rXUYfIjokUaa2bE/wXXs31RHHIFt/PnosDRBVaEt8oY', 'maskapai', NULL, '2025-04-07 14:43:44', '2025-04-07 14:43:44');

-- --------------------------------------------------------

--
-- Table structure for table `penerbangan`
--

CREATE TABLE `penerbangan` (
  `id` int(11) NOT NULL,
  `kode_penerbangan` varchar(255) NOT NULL,
  `maskapai` varchar(255) NOT NULL,
  `dari` varchar(255) NOT NULL,
  `ke` varchar(255) NOT NULL,
  `tanggal_berangkat` datetime NOT NULL,
  `durasi_penerbangan` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL,
  `kapasitas` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penerbangan`
--

INSERT INTO `penerbangan` (`id`, `kode_penerbangan`, `maskapai`, `dari`, `ke`, `tanggal_berangkat`, `durasi_penerbangan`, `harga`, `kapasitas`, `createdAt`, `updatedAt`) VALUES
(2, 'GA-1234', 'Maskapai 1', 'Manado', 'Banjarmasin', '2025-03-27 01:14:00', '2 jam 0 menit', 2000000, 150, '2025-03-20 01:14:39', '2025-03-20 01:14:39'),
(3, 'KT-1234', 'Maskapai 2', 'Padang', 'Surabaya', '2025-03-24 01:15:00', '8 jam 0 menit', 4000000, 100, '2025-03-20 01:15:49', '2025-03-20 01:15:49'),
(4, 'GH-1234', 'Maskapai 3', 'Surabaya', 'Makassar', '2025-03-27 04:21:00', '4 jam 2 menit', 1500000, 70, '2025-03-20 04:22:01', '2025-03-20 04:22:01'),
(5, 'MS-1876', 'Maskapai 5', 'Semarang', 'Medan', '2025-03-24 04:24:00', '1 jam 30 menit', 2000000, 80, '2025-03-20 04:25:21', '2025-03-20 04:25:21'),
(6, 'MS-1898', 'Maskapai 1', 'Denpasar', 'Palembang', '2025-04-30 05:18:00', '2 jam 2 menit', 2000000, 30, '2025-04-07 05:19:09', '2025-04-07 05:19:09'),
(8, 'GR-4421', 'garuda', 'Jakarta', 'Banjarmasin', '2025-04-25 14:55:00', '2 jam 33 menit', 4000000, 20, '2025-04-07 14:55:41', '2025-04-07 14:55:41'),
(9, 'MS-4452', 'Maskapai 2', 'Padang', 'Bandung', '2025-04-19 15:12:00', '5 jam 2 menit', 3200000, 12, '2025-04-07 15:12:54', '2025-04-07 15:12:54');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('-Iy_AIZMEj1QvyjgyVRU2g9oR8kClSv6', '2025-04-08 15:07:51', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:51.819Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:51', '2025-04-07 15:07:51'),
('-W4SJf7opFfTlaNnsZfhgjJBOL3AUnfA', '2025-04-08 15:07:12', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:12.873Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:12', '2025-04-07 15:07:12'),
('0_En0rkwrgDlz3MglD_z1rJFEcUP9khR', '2025-04-08 12:54:34', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T12:54:34.187Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 12:54:34', '2025-04-07 12:54:34'),
('1jcFYgp6FXrbmUdU6KWtqY0dn3B8AVwB', '2025-04-08 09:40:58', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:40:58.244Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:40:58', '2025-04-07 09:40:58'),
('1rCNLIcxnnxVql_wihTDarlT8OCR4CFv', '2025-04-08 08:43:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:43:18.675Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:43:18', '2025-04-07 08:43:18'),
('22HTemriKtLNd93lKv29kblZ6Wf_Fl_3', '2025-04-08 05:07:32', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:07:32.344Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:07:32', '2025-04-07 05:07:32'),
('4M0RFJQ2b-6LUCaALa9lshkmDT47TvgO', '2025-04-08 13:49:26', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T13:45:42.755Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"},\"userId\":\"d21aa899-eade-475a-925d-000d9bd2e461\",\"role\":\"maskapai\",\"nama_maskapai\":\"Maskapai 1\"}', '2025-04-07 13:45:42', '2025-04-07 13:49:26'),
('6JbadI4KLoSEfeog_4WsdXtjkSyvj_SR', '2025-04-08 05:04:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:04:18.674Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:04:18', '2025-04-07 05:04:18'),
('9IbNISnPiStNTF2skawn7fKofGYeNkpD', '2025-04-08 15:14:11', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:14:11.546Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:14:11', '2025-04-07 15:14:11'),
('9M9eYSIkFsrDhd_Hu-7R8lH2t8v13tYk', '2025-04-08 15:13:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:13:29.287Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:13:29', '2025-04-07 15:13:29'),
('9WWmI4hm2C3Zcg0Wsss41dUNMGdVePR_', '2025-04-08 08:43:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:43:18.700Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:43:18', '2025-04-07 08:43:18'),
('9zeJuLZGiF5g7eZJ1zQF_X5-BnydU5MF', '2025-04-08 08:10:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:10:15.714Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:10:15', '2025-04-07 08:10:15'),
('aCYx-DREnD1TY_NUYmLLpo5tP2iCM6bB', '2025-04-08 09:29:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:29:15.682Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:29:15', '2025-04-07 09:29:15'),
('aZ7M_l4FNEFu-xYQ8DV56pFxlkxeyuj0', '2025-04-08 05:12:22', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:12:22.892Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:12:22', '2025-04-07 05:12:22'),
('BbIwqObPK2C-IulbMCOvqe2z5BZ1nmBy', '2025-04-08 05:11:05', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:11:05.124Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:11:05', '2025-04-07 05:11:05'),
('bM_6s3wvNpY7zMy6ru0AaOIqz14nw0ST', '2025-04-08 10:00:37', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T10:00:37.921Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 10:00:37', '2025-04-07 10:00:37'),
('btPmF0vBryZfyTb9Ljcdcj5dBGV691ej', '2025-04-08 08:43:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:43:18.690Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:43:18', '2025-04-07 08:43:18'),
('c-W8Z-uZzGM0-QrDMDvB1lllIiSrfYYT', '2025-04-08 12:54:34', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T12:54:34.164Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 12:54:34', '2025-04-07 12:54:34'),
('cZnd-R85n9Le6m4XnHeb2QO7KNuJ4KSe', '2025-04-08 04:05:49', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T04:05:49.944Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 04:05:49', '2025-04-07 04:05:49'),
('E2bkAOR99SYtxn3hR9QeEEODw8huxZCD', '2025-04-08 15:07:12', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:12.886Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:12', '2025-04-07 15:07:12'),
('ecxMwvXJfhNUyCq9MoZg0X-yn4Ee4sHa', '2025-04-08 05:11:05', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:11:05.082Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:11:05', '2025-04-07 05:11:05'),
('EItAlLTaKx_NjEcVI4BSl6MLpsUUJFOq', '2025-04-08 09:40:58', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:40:58.264Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:40:58', '2025-04-07 09:40:58'),
('eOvQJu2bokH7P0YrrQrETlxocMU-0MhB', '2025-04-08 08:10:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:10:15.708Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:10:15', '2025-04-07 08:10:15'),
('EPCcefx6tN60AIw-q6XcpC3mtY4PRFaj', '2025-04-08 15:07:51', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:51.795Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:51', '2025-04-07 15:07:51'),
('eVCNM4HWBrx-pq67e6lbnC5v9jl2P2HD', '2025-04-08 13:38:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T13:38:29.144Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 13:38:29', '2025-04-07 13:38:29'),
('ewCKSPJBnYx7G60-K_fzAKpL-hnwTRhM', '2025-04-08 10:00:37', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T10:00:37.947Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 10:00:37', '2025-04-07 10:00:37'),
('f5BplmjhfYXBfnziDa1_Q4L6vC3wvZI5', '2025-04-08 05:17:21', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:17:21.317Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:17:21', '2025-04-07 05:17:21'),
('fyJ4bm18qNs_v___5DV2fblU73XAnLnn', '2025-04-08 15:13:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:13:29.278Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:13:29', '2025-04-07 15:13:29'),
('gX0xK7F0he7eKK5OyljPGROS6d5ehdqV', '2025-04-08 15:14:11', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:14:11.560Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:14:11', '2025-04-07 15:14:11'),
('HfS4ZnkJPhRB3hJz6N_JbzARM8MY04ee', '2025-04-08 08:10:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:10:15.693Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:10:15', '2025-04-07 08:10:15'),
('HGwQrZvftSnBBN95rhCgdwoiyFKQk_L5', '2025-04-08 13:38:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T13:38:29.140Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 13:38:29', '2025-04-07 13:38:29'),
('HkOc47YvGLMzt7LBd-eVqYrQe4fdjsm0', '2025-04-08 10:00:37', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T10:00:37.940Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 10:00:37', '2025-04-07 10:00:37'),
('hMCOQ98rdPvgiklRjTjxGr69PFY1_2os', '2025-04-08 08:03:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:03:29.347Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:03:29', '2025-04-07 08:03:29'),
('Hpv31S7xXIrOIsDLmY_ILat-sNnvPWro', '2025-04-08 15:07:12', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:12.856Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:12', '2025-04-07 15:07:12'),
('hULr2XB-UDpJUoZLR5ePrT7ks8jV2S6p', '2025-04-08 08:03:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:03:29.379Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:03:29', '2025-04-07 08:03:29'),
('iBJvF_4CUVYXHCVbQhwvmVUActWSwSaf', '2025-04-08 15:07:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:18.134Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:18', '2025-04-07 15:07:18'),
('iEBYQCF7DX3zb_IOuq6Hjc-OqoGTrBmM', '2025-04-08 05:09:32', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:09:32.981Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:09:32', '2025-04-07 05:09:32'),
('Jb184ofktxqFnjmiZUTSaNDulDt7um7W', '2025-04-08 05:08:42', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:08:42.151Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:08:42', '2025-04-07 05:08:42'),
('jGMNyBlFmBiKT-gxs0R7YnY5oxAFbYLd', '2025-04-08 10:01:43', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T10:01:43.989Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 10:01:44', '2025-04-07 10:01:44'),
('jL37mvqeVKjQdn5cYvAUtq_LiY9k78nv', '2025-04-08 05:10:52', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:10:52.739Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:10:52', '2025-04-07 05:10:52'),
('JNLbdnWYVKAgUPyZm0weFwaRlzspIb_u', '2025-04-08 09:36:01', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:36:01.517Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:36:01', '2025-04-07 09:36:01'),
('kGAelmKuvYOqA3fSVLXubYZFFbaB53Z3', '2025-04-08 09:36:01', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:36:01.548Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:36:01', '2025-04-07 09:36:01'),
('kpM_TEjG2se5EYp5Evra7HeWRxnz6xGN', '2025-04-08 08:07:57', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:07:57.408Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:07:57', '2025-04-07 08:07:57'),
('l5l8FR4oVxUNvs4bQWMf0INMsD348_LF', '2025-04-08 09:36:01', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:36:01.498Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:36:01', '2025-04-07 09:36:01'),
('LA0QgCvIeXSe7pPUhaVhPEhfXg8Ck4cy', '2025-04-08 13:38:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T13:38:29.095Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 13:38:29', '2025-04-07 13:38:29'),
('liStChEugA8uFeteeaTtgRr8getVUb1M', '2025-04-08 05:19:46', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:19:46.923Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:19:46', '2025-04-07 05:19:46'),
('n52M3eomgbqGCg8-Rg_0MAszBX5Ni2Sm', '2025-04-08 05:10:52', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:10:52.779Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:10:52', '2025-04-07 05:10:52'),
('NgaWN5icdo3IdRe-gn0VIaE80IMRGUWi', '2025-04-08 05:10:52', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:10:52.710Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:10:52', '2025-04-07 05:10:52'),
('NqxobHH73xp9Onx81mPOyEizZsP5999_', '2025-04-08 05:17:21', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:17:21.738Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:17:21', '2025-04-07 05:17:21'),
('o3EtHkkpQEo28fZSwEZvdcVTFhZv-lXT', '2025-04-08 05:04:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:04:18.720Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:04:18', '2025-04-07 05:04:18'),
('oH9bLQMvY4I1uvB5qrRVmLRRVXStLHRx', '2025-04-08 05:19:46', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:19:46.907Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:19:46', '2025-04-07 05:19:46'),
('OvCKSnd2ScyeqYKH_pf6XdbPcG8eakNn', '2025-04-08 05:11:05', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:11:05.107Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:11:05', '2025-04-07 05:11:05'),
('QrnP2XXw02iJHqmiEbTHU0R5Y7ATlukz', '2025-04-08 05:04:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:04:18.764Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:04:18', '2025-04-07 05:04:18'),
('r6UbkQBKOFfknXOQAx58kx-pGsKjc-ar', '2025-04-08 05:07:32', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:07:32.405Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:07:32', '2025-04-07 05:07:32'),
('rmZi2DGRFdtJhBX1C8tibcX36S5OxAgV', '2025-04-08 09:40:58', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:40:58.280Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:40:58', '2025-04-07 09:40:58'),
('rNex73cPdOH_GUKslBa-DMyskxtHkYcZ', '2025-04-08 15:14:11', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:14:11.536Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:14:11', '2025-04-07 15:14:11'),
('sALxPm1jyImde-HzQEaXNxJXNvZcV7Ag', '2025-04-08 15:07:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:18.145Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:18', '2025-04-07 15:07:18'),
('sIQyql1_3V1hQt9uKx6ubIw9k2D20WqL', '2025-04-08 15:07:51', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:51.809Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:51', '2025-04-07 15:07:51'),
('STMxU8jx-f244xh9zm4U7h8-k5kS3d2v', '2025-04-08 05:19:46', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:19:46.729Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:19:46', '2025-04-07 05:19:46'),
('Sx45fElHTPqbyNkomdqQkS6NYaXGZ-Lt', '2025-04-08 05:17:21', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:17:21.715Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:17:21', '2025-04-07 05:17:21'),
('TC43VLWirlyo8SyDRn6vh26iq1Vzt2Ua', '2025-04-08 05:08:42', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:08:42.193Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:08:42', '2025-04-07 05:08:42'),
('TJ0qyE_lXZFWCa6wZhH91_Jmxc0LQWDA', '2025-04-08 05:09:33', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:09:33.009Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:09:33', '2025-04-07 05:09:33'),
('tov1hFoTg5WpWT8M3eTOfmk7RhFNy0F6', '2025-04-08 09:29:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:29:15.704Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:29:15', '2025-04-07 09:29:15'),
('tui2huHXxehZoS0SJC7V8FU5eKYoNhjb', '2025-04-08 08:07:57', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:07:57.387Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:07:57', '2025-04-07 08:07:57'),
('tWpke-U_lajng6l4PjQ8Ye_bcpJ-tFsy', '2025-04-08 05:12:22', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:12:22.994Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:12:23', '2025-04-07 05:12:23'),
('U2T1FFOCR3IGlnUW8mep4J_6tqLt21jE', '2025-04-08 05:07:32', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:07:32.378Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:07:32', '2025-04-07 05:07:32'),
('uBGHVPX4Le9wKtYRBfjvWyJ4u6Vq1nBN', '2025-04-08 12:54:34', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T12:54:34.204Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 12:54:34', '2025-04-07 12:54:34'),
('UQ19OFNZCfiO8Y71u5HUVKTfuHorsbRK', '2025-04-08 05:12:22', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:12:22.987Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:12:23', '2025-04-07 05:12:23'),
('V7QMToWRX1MhX8dwqh4c4udTvoObn-GX', '2025-04-08 10:01:43', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T10:01:43.848Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 10:01:43', '2025-04-07 10:01:43'),
('VaeNpxpQznE4U_9Ms4vOYlDMzV9aSPae', '2025-04-08 09:29:15', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T09:29:15.648Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 09:29:15', '2025-04-07 09:29:15'),
('Wb80ASfnao5n7ZYFN3Yp6L3UTw9RTbgH', '2025-04-08 15:07:18', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:07:18.159Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:07:18', '2025-04-07 15:07:18'),
('wl0hQnSU86r5OahbpDygCQzgtDQQG7FI', '2025-04-08 05:08:42', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:08:42.164Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:08:42', '2025-04-07 05:08:42'),
('XsslLXAowKGZNMvVdJR6ttALWnUj3tMP', '2025-04-08 08:07:57', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:07:57.397Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:07:57', '2025-04-07 08:07:57'),
('XtY3cH1X3ePOSDHxtZwmn-5bfYnf2Aqt', '2025-04-08 08:03:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T08:03:29.324Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 08:03:29', '2025-04-07 08:03:29'),
('zlv-9MmKWwVW5xYL35H1ZvE0bl3grHcz', '2025-04-08 15:13:29', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T15:13:29.303Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 15:13:29', '2025-04-07 15:13:29'),
('zv8CWsIcDSlmFWKl_4fnR_sVEySNxxbf', '2025-04-08 05:09:33', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T05:09:33.005Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 05:09:33', '2025-04-07 05:09:33'),
('_O4SAZOTMkCN5KCIuNIFZEiaYhGrmxGU', '2025-04-08 04:08:59', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-04-08T04:08:59.349Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":\"lax\"}}', '2025-04-07 04:08:59', '2025-04-07 04:08:59');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id_transaksi` int(11) NOT NULL,
  `uuid_user` varchar(255) NOT NULL,
  `id_penerbangan` int(11) NOT NULL,
  `kode_booking` varchar(20) NOT NULL,
  `jumlah_tiket` int(11) NOT NULL,
  `total_harga` decimal(10,2) NOT NULL,
  `metode_pembayaran` enum('transfer','kartu kredit','e-wallet') NOT NULL,
  `status_pembayaran` enum('pending','berhasil','gagal') DEFAULT 'pending',
  `bukti_pembayaran` varchar(255) DEFAULT NULL,
  `url_bukti` varchar(255) DEFAULT NULL,
  `tanggal_transaksi` datetime DEFAULT NULL,
  `status_tiket` enum('aktif','tidak aktif') DEFAULT 'tidak aktif',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id_transaksi`, `uuid_user`, `id_penerbangan`, `kode_booking`, `jumlah_tiket`, `total_harga`, `metode_pembayaran`, `status_pembayaran`, `bukti_pembayaran`, `url_bukti`, `tanggal_transaksi`, `status_tiket`, `createdAt`, `updatedAt`) VALUES
(1, '51a01273-43e4-4da0-8a2f-9814a1dd565b', 6, 'BK17440185562097', 1, 2000000.00, 'transfer', 'berhasil', NULL, NULL, '2025-04-07 09:35:56', 'aktif', '2025-04-07 09:35:56', '2025-04-07 09:54:23'),
(2, '51a01273-43e4-4da0-8a2f-9814a1dd565b', 6, 'BK1744018837071411', 1, 2000000.00, 'transfer', 'gagal', NULL, NULL, '2025-04-07 09:40:37', 'tidak aktif', '2025-04-07 09:40:37', '2025-04-07 09:54:28'),
(3, '1440c8c2-f441-4ac2-bc81-8c48efee410c', 6, 'BK1744019984994184', 1, 2000000.00, 'transfer', 'berhasil', NULL, NULL, '2025-04-07 09:59:45', 'aktif', '2025-04-07 09:59:45', '2025-04-07 10:02:21'),
(4, '1440c8c2-f441-4ac2-bc81-8c48efee410c', 6, 'BK1744019991295784', 1, 2000000.00, 'e-wallet', 'gagal', NULL, NULL, '2025-04-07 09:59:51', 'tidak aktif', '2025-04-07 09:59:51', '2025-04-07 10:01:40'),
(5, 'c1193a0e-5b88-4004-af96-a7430e7ed20c', 8, 'BK1744038412490902', 1, 4000000.00, 'transfer', 'berhasil', NULL, NULL, '2025-04-07 15:06:52', 'aktif', '2025-04-07 15:06:52', '2025-04-07 15:10:37'),
(6, 'c1193a0e-5b88-4004-af96-a7430e7ed20c', 8, 'BK1744038419724185', 1, 4000000.00, 'kartu kredit', 'gagal', NULL, NULL, '2025-04-07 15:06:59', 'tidak aktif', '2025-04-07 15:06:59', '2025-04-07 15:07:05'),
(7, '51a01273-43e4-4da0-8a2f-9814a1dd565b', 8, 'BK1744038464397620', 4, 16000000.00, 'transfer', 'berhasil', NULL, NULL, '2025-04-07 15:07:44', 'aktif', '2025-04-07 15:07:44', '2025-04-07 15:10:35'),
(8, '51a01273-43e4-4da0-8a2f-9814a1dd565b', 9, 'BK1744038792994829', 2, 6400000.00, 'transfer', 'berhasil', NULL, NULL, '2025-04-07 15:13:13', 'aktif', '2025-04-07 15:13:13', '2025-04-07 15:14:29'),
(9, '51a01273-43e4-4da0-8a2f-9814a1dd565b', 9, 'BK1744038798139272', 1, 3200000.00, 'e-wallet', 'gagal', NULL, NULL, '2025-04-07 15:13:18', 'tidak aktif', '2025-04-07 15:13:18', '2025-04-07 15:13:21'),
(10, 'c1193a0e-5b88-4004-af96-a7430e7ed20c', 9, 'BK1744038845139640', 1, 3200000.00, 'transfer', 'gagal', NULL, NULL, '2025-04-07 15:14:05', 'tidak aktif', '2025-04-07 15:14:05', '2025-04-07 15:14:27');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uuid` varchar(255) NOT NULL,
  `nm_user` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email_user` varchar(255) NOT NULL,
  `img_user` varchar(255) DEFAULT NULL,
  `url_user` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `refresh_token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uuid`, `nm_user`, `username`, `email_user`, `img_user`, `url_user`, `password`, `role`, `refresh_token`, `createdAt`, `updatedAt`) VALUES
('1440c8c2-f441-4ac2-bc81-8c48efee410c', 'user 2', 'users2', 'users2@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('1857127a-e142-41d9-8ea3-f7f29ac83fc4', 'user 9', 'users9', 'users9@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('4a393aa7-fbe0-4b10-a2fe-38a1faf08c92', 'user 4', 'users4', 'users4@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('4bcfdf02-270f-4c04-aa91-ab5fb802666b', 'user 3', 'users3', 'users3@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('51a01273-43e4-4da0-8a2f-9814a1dd565b', 'user 1', 'users1', 'users1@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('5a678c6f-e9c1-4b34-96df-2d839ac3f62e', 'user 10', 'users10', 'users10@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('9d5a6e8b-a610-494a-b5e3-d72bad1f2013', 'user 5', 'users5', 'users5@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('a89e754d-456b-4219-9bfd-d44da36f8295', 'user 6', 'users6', 'users6@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('c03c97d1-3981-4a0c-9eb0-5d79f53733eb', 'user 8', 'users8', 'users8@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34'),
('c1193a0e-5b88-4004-af96-a7430e7ed20c', 'nyoba', 'nyoba', 'nyoba@gmail.com', '632bc8501e7b4db8b53bc4f9b391dc41.jpg', 'http://localhost:5000/images/users/632bc8501e7b4db8b53bc4f9b391dc41.jpg', '$argon2id$v=19$m=65536,t=3,p=4$YD6IVOaebNihqJTECgkXSw$3YqUimL9v1pV7LB9NUIsYT2unyC/2obBieVgiSSd7dQ', 'pelanggan', NULL, '2025-04-07 14:36:17', '2025-04-07 14:36:17'),
('dfc685d5-877b-42a0-887d-ef4784bccb4d', 'nyoba2', 'nyoba2', 'nyoba2@gmail.com', '1dc0f2185f0bd253f26363236792e264.jpg', 'http://localhost:5000/images/users/1dc0f2185f0bd253f26363236792e264.jpg', '$argon2id$v=19$m=65536,t=3,p=4$ZWgzd7LRUYPMdOeX3a4Xyw$0hAL9p8mePNni737AzFr+oSMByNwBLe2FgX+yoNdNB4', 'pelanggan', NULL, '2025-04-07 14:37:05', '2025-04-07 14:37:05'),
('e55e28db-6a62-4dda-92ec-952d40e424fe', 'user 7', 'users7', 'users7@gmail.com', NULL, NULL, '$argon2id$v=19$m=65536,t=3,p=4$ALuBO/CCOhyhuqKNLE7rqw$Ly9lNHtP1kjzr0uJI6r52kKpPz5wmW3iFInriINzuwM', 'pelanggan', NULL, '2025-03-20 00:43:34', '2025-03-20 00:43:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `maskapai`
--
ALTER TABLE `maskapai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `penerbangan`
--
ALTER TABLE `penerbangan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id_transaksi`),
  ADD KEY `uuid_user` (`uuid_user`),
  ADD KEY `id_penerbangan` (`id_penerbangan`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uuid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `maskapai`
--
ALTER TABLE `maskapai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `penerbangan`
--
ALTER TABLE `penerbangan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id_transaksi` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_31` FOREIGN KEY (`uuid_user`) REFERENCES `users` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_32` FOREIGN KEY (`id_penerbangan`) REFERENCES `penerbangan` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
