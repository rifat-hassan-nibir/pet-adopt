/*
  Warnings:

  - The values [PENDING,APPROVED,REJECTED] on the enum `PostStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `requesterEmail` on the `AdoptionRequest` table. All the data in the column will be lost.
  - You are about to drop the column `requesterName` on the `AdoptionRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,postId]` on the table `AdoptionRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PostStatus_new" AS ENUM ('AVAILABLE', 'ADOPTED');
ALTER TABLE "public"."AdoptionPost" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "AdoptionPost" ALTER COLUMN "status" TYPE "PostStatus_new" USING ("status"::text::"PostStatus_new");
ALTER TYPE "PostStatus" RENAME TO "PostStatus_old";
ALTER TYPE "PostStatus_new" RENAME TO "PostStatus";
DROP TYPE "public"."PostStatus_old";
ALTER TABLE "AdoptionPost" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';
COMMIT;

-- AlterTable
ALTER TABLE "AdoptionPost" ALTER COLUMN "status" SET DEFAULT 'AVAILABLE';

-- AlterTable
ALTER TABLE "AdoptionRequest" DROP COLUMN "requesterEmail",
DROP COLUMN "requesterName";

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionRequest_userId_postId_key" ON "AdoptionRequest"("userId", "postId");
