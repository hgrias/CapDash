/*
  Warnings:

  - The values [O] on the enum `Party` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `StafferContact` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Party_new" AS ENUM ('D', 'R', 'I', 'G', 'L', 'N');
ALTER TABLE "Legislator" ALTER COLUMN "party" TYPE "Party_new" USING ("party"::text::"Party_new");
ALTER TYPE "Party" RENAME TO "Party_old";
ALTER TYPE "Party_new" RENAME TO "Party";
DROP TYPE "Party_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "StafferContact" DROP CONSTRAINT "StafferContact_legislatorId_fkey";

-- DropForeignKey
ALTER TABLE "StafferContact" DROP CONSTRAINT "StafferContact_organizationId_fkey";

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "imageUri" TEXT;

-- DropTable
DROP TABLE "StafferContact";

-- CreateTable
CREATE TABLE "StafferInfo" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT,
    "legislatorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StafferInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StafferInfo" ADD CONSTRAINT "StafferInfo_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
