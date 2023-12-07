-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 07/12/2023 às 03:29
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `tinderproject`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `image` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `item`
--

INSERT INTO `item` (`id`, `title`, `image`) VALUES
(8, 'Javascript', 'uploads/Javascript_popeg.png'),
(9, 'Typescript', 'uploads/Typescript_vc4q0.png'),
(10, 'JuliaLang', 'uploads/JuliaLang_7ns8l.png'),
(12, 'RLang', 'uploads/RLang_avw2j.png'),
(13, 'Java', 'uploads/Java_m16rr.png'),
(14, 'CSS', 'uploads/CSS_di00j.png'),
(15, 'HTML5', 'uploads/HTML5_2pnr5.png'),
(16, 'Python', 'uploads/Python_mwg1h.png'),
(17, 'PHP', 'uploads/PHP_d6u19.png'),
(18, 'Swift', 'uploads/Swift_io0re.png'),
(19, 'Kotlin', 'uploads/Kotlin_j0mwf.jpeg'),
(20, 'C++', 'uploads/C++_g4d68.png'),
(21, 'Csharp', 'uploads/Csharp_0e08v.png'),
(22, 'Assembly', 'uploads/Assembly_pkjnq.png'),
(100, 'GoLang', 'uploads/GoLang_547bn.png'),
(101, 'Scala', 'uploads/Scala_yco9c.png'),
(117, 'LuaLang', 'uploads/LuaLang_f1yeg.png'),
(118, 'React', 'uploads/React_8l2cw.png');

-- --------------------------------------------------------

--
-- Estrutura para tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL,
  `username` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `is_Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `user`
--

INSERT INTO `user` (`id`, `email`, `username`, `password`, `is_Admin`) VALUES
(1, 'admin123@gmail.com', 'admin', 'senha123', 1),
(7, 'felipe.gomes@aluno.feliz.ifrs.edu.br', 'Felipe', 'afr21', 0);

-- --------------------------------------------------------

--
-- Estrutura para tabela `user_item`
--

CREATE TABLE `user_item` (
  `userID` int(11) NOT NULL,
  `itemID` int(11) NOT NULL,
  `likeQuantity` int(11) NOT NULL,
  `dislikeQuantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Despejando dados para a tabela `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('d265022a-5af2-4f57-9206-8a62a95ba059', 'acb297dc2f9e6687f530c4fc422219404c109142fc232864fe6ebf20eb6f903a', '2023-11-19 21:20:55.686', '20231119212055_init', NULL, NULL, '2023-11-19 21:20:55.492', 1);

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Item_title_key` (`title`);

--
-- Índices de tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`),
  ADD UNIQUE KEY `User_username_key` (`username`);

--
-- Índices de tabela `user_item`
--
ALTER TABLE `user_item`
  ADD PRIMARY KEY (`userID`,`itemID`),
  ADD KEY `User_Item_itemID_fkey` (`itemID`);

--
-- Índices de tabela `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=119;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `user_item`
--
ALTER TABLE `user_item`
  ADD CONSTRAINT `User_Item_itemID_fkey` FOREIGN KEY (`itemID`) REFERENCES `item` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `User_Item_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
