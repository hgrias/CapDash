/*
  Warnings:

  - The primary key for the `Interaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Interaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `interactionId` column on the `Tag` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_interactionId_fkey";

-- AlterTable
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Interaction_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Tag" DROP COLUMN "interactionId",
ADD COLUMN     "interactionId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_interactionId_fkey" FOREIGN KEY ("interactionId") REFERENCES "Interaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
