/*
  Warnings:

  - You are about to drop the column `tagId` on the `Interaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_tagId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP COLUMN "tagId";

-- CreateTable
CREATE TABLE "_InteractionTags" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_InteractionTags_AB_unique" ON "_InteractionTags"("A", "B");

-- CreateIndex
CREATE INDEX "_InteractionTags_B_index" ON "_InteractionTags"("B");

-- AddForeignKey
ALTER TABLE "_InteractionTags" ADD CONSTRAINT "_InteractionTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Interaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_InteractionTags" ADD CONSTRAINT "_InteractionTags_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
