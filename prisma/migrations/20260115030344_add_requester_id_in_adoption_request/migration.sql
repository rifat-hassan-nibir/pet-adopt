/*
  Warnings:

  - You are about to drop the column `userId` on the `AdoptionRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[requesterId,postId]` on the table `AdoptionRequest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requesterId` to the `AdoptionRequest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdoptionRequest" DROP CONSTRAINT "AdoptionRequest_userId_fkey";

-- DropIndex
DROP INDEX "AdoptionRequest_userId_postId_key";

-- AlterTable
ALTER TABLE "AdoptionRequest" DROP COLUMN "userId",
ADD COLUMN     "requesterId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AdoptionRequest_requesterId_postId_key" ON "AdoptionRequest"("requesterId", "postId");

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_requesterId_fkey" FOREIGN KEY ("requesterId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
