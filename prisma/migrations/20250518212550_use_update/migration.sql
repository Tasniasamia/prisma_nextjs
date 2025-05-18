/*
  Warnings:

  - You are about to drop the `profile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `profile` DROP FOREIGN KEY `Profile_userId_fkey`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `country` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `per_address` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `phone_no` VARCHAR(191) NULL DEFAULT '',
    ADD COLUMN `pre_address` VARCHAR(191) NULL DEFAULT '';

-- DropTable
DROP TABLE `profile`;
