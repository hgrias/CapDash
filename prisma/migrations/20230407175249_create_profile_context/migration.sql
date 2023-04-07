/*
  Warnings:

  - You are about to drop the `LegislatorInfo` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "LegislatorInfo" DROP CONSTRAINT "LegislatorInfo_legislatorId_fkey";

-- AlterTable
ALTER TABLE "Legislator" ADD COLUMN     "capitolAddress" TEXT,
ADD COLUMN     "capitolOfficeNumber" TEXT,
ADD COLUMN     "capitolWebsiteUrl" TEXT,
ADD COLUMN     "chamberWebsiteUrl" TEXT,
ADD COLUMN     "districtAddress" TEXT,
ADD COLUMN     "email" TEXT,
ADD COLUMN     "nickName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "websiteUrl" TEXT;

-- DropTable
DROP TABLE "LegislatorInfo";
