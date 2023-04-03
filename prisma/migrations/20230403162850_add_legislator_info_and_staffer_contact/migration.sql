/*
  Warnings:

  - You are about to drop the column `capitolWebsiteUrl` on the `Legislator` table. All the data in the column will be lost.
  - You are about to drop the column `chamberWebsiteUrl` on the `Legislator` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Legislator" DROP COLUMN "capitolWebsiteUrl",
DROP COLUMN "chamberWebsiteUrl";

-- CreateTable
CREATE TABLE "LegislatorInfo" (
    "id" TEXT NOT NULL,
    "phone" TEXT,
    "email" TEXT,
    "capitolOfficeNumber" TEXT,
    "districtAddress" TEXT,
    "capitolAddress" TEXT,
    "websiteUrl" TEXT,
    "chamberWebsiteUrl" TEXT,
    "capitolWebsiteUrl" TEXT,
    "legislatorId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LegislatorInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StafferContact" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "position" TEXT,
    "legislatorId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StafferContact_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LegislatorInfo_organizationId_idx" ON "LegislatorInfo"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "LegislatorInfo_legislatorId_organizationId_key" ON "LegislatorInfo"("legislatorId", "organizationId");

-- CreateIndex
CREATE INDEX "StafferContact_organizationId_idx" ON "StafferContact"("organizationId");

-- AddForeignKey
ALTER TABLE "LegislatorInfo" ADD CONSTRAINT "LegislatorInfo_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegislatorInfo" ADD CONSTRAINT "LegislatorInfo_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StafferContact" ADD CONSTRAINT "StafferContact_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StafferContact" ADD CONSTRAINT "StafferContact_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
