/*
  Warnings:

  - You are about to drop the column `name` on the `profile` table. All the data in the column will be lost.
  - Added the required column `country` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone_no` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `profile` DROP COLUMN `name`,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone_no` VARCHAR(191) NOT NULL;
