/*
  Warnings:

  - You are about to drop the column `title` on the `AdoptionPost` table. All the data in the column will be lost.
  - Added the required column `name` to the `AdoptionPost` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdoptionPost" DROP CONSTRAINT "AdoptionPost_userId_fkey";

-- DropForeignKey
ALTER TABLE "AdoptionRequest" DROP CONSTRAINT "AdoptionRequest_postId_fkey";

-- DropForeignKey
ALTER TABLE "AdoptionRequest" DROP CONSTRAINT "AdoptionRequest_userId_fkey";

-- AlterTable
ALTER TABLE "AdoptionPost" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "AdoptionPost" ADD CONSTRAINT "AdoptionPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_postId_fkey" FOREIGN KEY ("postId") REFERENCES "AdoptionPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
