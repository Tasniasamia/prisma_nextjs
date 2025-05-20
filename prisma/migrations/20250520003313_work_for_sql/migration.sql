/*
  Warnings:

  - Added the required column `action` to the `Otp` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Otp_email_key` ON `otp`;

-- AlterTable
ALTER TABLE `otp` ADD COLUMN `action` VARCHAR(191) NOT NULL;
