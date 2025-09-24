/*
  Warnings:

  - You are about to drop the column `email` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roleId` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_roleId_fkey`;

-- DropIndex
DROP INDEX `User_email_key` ON `user`;

-- DropIndex
DROP INDEX `User_roleId_fkey` ON `user`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `email`,
    DROP COLUMN `name`,
    ADD COLUMN `fullname` VARCHAR(255) NULL,
    ADD COLUMN `username` VARCHAR(255) NULL,
    MODIFY `roleId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_username_key` ON `User`(`username`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `roles`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
