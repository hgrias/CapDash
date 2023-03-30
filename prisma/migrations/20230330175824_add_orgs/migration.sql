/*
  Warnings:

  - A unique constraint covering the columns `[firstName,lastName,state,district,organizationId]` on the table `Legislator` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `organizationId` to the `Interaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `Legislator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `organizationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Legislator_firstName_lastName_state_district_key";

-- AlterTable
ALTER TABLE "Interaction" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Legislator" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "organizationId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "websiteUrl" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organization_slug_key" ON "Organization"("slug");

-- CreateIndex
CREATE INDEX "Interaction_organizationId_idx" ON "Interaction"("organizationId");

-- CreateIndex
CREATE INDEX "Legislator_organizationId_idx" ON "Legislator"("organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "Legislator_firstName_lastName_state_district_organizationId_key" ON "Legislator"("firstName", "lastName", "state", "district", "organizationId");

-- CreateIndex
CREATE INDEX "User_organizationId_idx" ON "User"("organizationId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Legislator" ADD CONSTRAINT "Legislator_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Interaction" ADD CONSTRAINT "Interaction_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
