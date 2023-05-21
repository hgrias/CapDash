/*
  Warnings:

  - A unique constraint covering the columns `[name,organizationId]` on the table `Tag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Note" ALTER COLUMN "legislatorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "description" TEXT,
ADD COLUMN     "icon" TEXT DEFAULT 'Tag';

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_organizationId_key" ON "Tag"("name", "organizationId");
