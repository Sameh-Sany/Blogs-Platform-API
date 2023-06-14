-- AlterTable
ALTER TABLE `user` ADD COLUMN `role` ENUM('user', 'admin') NULL DEFAULT 'user';
