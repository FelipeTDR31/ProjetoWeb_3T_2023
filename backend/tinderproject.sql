-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13/12/2023 às 23:55
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

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
(119, 'Typescript', 'uploads/Typescript_thir9.png'),
(120, 'LuaLang', 'uploads/LuaLang_wk424.png'),
(121, 'Assembly', 'uploads/Assembly_teep3.png'),
(122, 'Python', 'uploads/Python_j57g6.jpeg'),
(123, 'Java', 'uploads/Java_sjryf.png'),
(124, 'JuliaLang', 'uploads/JuliaLang_stpjy.png'),
(125, 'Kotlin', 'uploads/Kotlin_2izk7.jpeg'),
(126, 'C++', 'uploads/C++_cgqjf.png'),
(127, 'Csharp', 'uploads/Csharp_i04ty.png'),
(128, 'Cobol', 'uploads/Cobol_0i999.png'),
(129, 'GoLang', 'uploads/GoLang_3t18t.png'),
(130, 'React', 'uploads/React_ygs3o.png'),
(131, 'CSS', 'uploads/CSS_tl9dr.jpeg'),
(132, 'HTML', 'uploads/HTML_ngxtd.png'),
(133, 'Vuejs', 'uploads/Vuejs_qjj71.jpg');

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
(7, 'felipe.gomes@aluno.feliz.ifrs.edu.br', 'Felipe', 'afr21', 0),
(13, 'charles@aluno.feliz.ifrs.edu.br', 'Charles', '123456', 0),
(14, 'igor@aluno.feliz.ifrs.edu.br', 'Igor', '654321', 0),
(15, 'lucas@aluno.feliz.ifrs.edu.br', 'Lucas', '123', 0);

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

--
-- Despejando dados para a tabela `user_item`
--

INSERT INTO `user_item` (`userID`, `itemID`, `likeQuantity`, `dislikeQuantity`) VALUES
(7, 8, 1, 0),
(7, 119, 1, 0),
(7, 120, 0, 1),
(7, 121, 1, 0),
(7, 122, 0, 1),
(7, 123, 1, 0),
(7, 124, 0, 1),
(7, 125, 1, 0),
(7, 126, 1, 0),
(7, 127, 1, 0),
(7, 128, 1, 0),
(7, 129, 0, 1),
(7, 130, 1, 0),
(7, 131, 0, 1),
(7, 132, 1, 0),
(7, 133, 1, 0),
(13, 8, 1, 0),
(13, 119, 1, 0),
(13, 120, 0, 1),
(13, 121, 1, 0),
(13, 122, 1, 0),
(13, 123, 0, 1),
(13, 124, 1, 0),
(13, 125, 0, 1),
(13, 126, 1, 0),
(13, 127, 1, 0),
(13, 128, 1, 0),
(13, 129, 0, 1),
(13, 130, 1, 0),
(13, 131, 1, 0),
(13, 132, 1, 0),
(14, 8, 1, 0),
(14, 119, 1, 0),
(14, 120, 0, 1),
(14, 121, 1, 0),
(14, 122, 1, 0),
(14, 123, 0, 1),
(14, 124, 1, 0),
(14, 125, 0, 1),
(14, 126, 1, 0),
(14, 127, 1, 0),
(14, 128, 0, 1),
(14, 129, 1, 0),
(14, 130, 1, 0),
(14, 131, 0, 1),
(14, 132, 0, 1),
(14, 133, 1, 0),
(15, 8, 1, 0),
(15, 119, 1, 0),
(15, 120, 0, 1),
(15, 121, 1, 0),
(15, 122, 1, 0),
(15, 123, 1, 0),
(15, 124, 0, 1),
(15, 125, 0, 1),
(15, 126, 0, 1),
(15, 127, 0, 1),
(15, 128, 0, 1),
(15, 129, 0, 1),
(15, 130, 0, 1),
(15, 131, 0, 1),
(15, 132, 0, 1),
(15, 133, 0, 1);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
