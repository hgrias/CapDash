/*
  Warnings:

  - You are about to drop the column `interactionId` on the `Tag` table. All the data in the column will be lost.
  - Added the required column `organizationId` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_interactionId_fkey";

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "tagId" INTEGER;

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "interactionId",
ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
