/*
  Warnings:

  - Added the required column `otpSentAt` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `otpSentAt` DATETIME(3) NOT NULL;
