/*
  Warnings:

  - The values [Democrat,Republican,Other,UNKNOWN] on the enum `Party` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `days` on the `LegislativeSession` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `LegislativeSession` table. All the data in the column will be lost.
  - You are about to drop the column `sessionNumber` on the `LegislativeSession` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `LegislativeSession` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `LegislativeSession` table. All the data in the column will be lost.
  - You are about to drop the column `chamber` on the `Legislator` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `LegislatorInfo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,state]` on the table `LegislativeSession` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[role,state,district,organizationId]` on the table `Legislator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[legislatorId]` on the table `LegislatorInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `yearEnd` to the `LegislativeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `yearStart` to the `LegislativeSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Legislator` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Sen', 'Rep');

-- AlterEnum
BEGIN;
CREATE TYPE "Party_new" AS ENUM ('D', 'R', 'O', 'I');
ALTER TABLE "Legislator" ALTER COLUMN "party" TYPE "Party_new" USING ("party"::text::"Party_new");
ALTER TYPE "Party" RENAME TO "Party_old";
ALTER TYPE "Party_new" RENAME TO "Party";
DROP TYPE "Party_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Interaction" DROP CONSTRAINT "Interaction_sessionId_fkey";

-- DropForeignKey
ALTER TABLE "Legislator" DROP CONSTRAINT "Legislator_currentSessionId_fkey";

-- DropForeignKey
ALTER TABLE "LegislatorInfo" DROP CONSTRAINT "LegislatorInfo_organizationId_fkey";

-- DropIndex
DROP INDEX "Legislator_chamber_state_district_organizationId_key";

-- DropIndex
DROP INDEX "LegislatorInfo_legislatorId_organizationId_key";

-- DropIndex
DROP INDEX "LegislatorInfo_organizationId_idx";

-- AlterTable
ALTER TABLE "LegislativeSession" DROP COLUMN "days",
DROP COLUMN "endDate",
DROP COLUMN "sessionNumber",
DROP COLUMN "startDate",
DROP COLUMN "type",
ADD COLUMN     "archived" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sessionName" TEXT,
ADD COLUMN     "sessionTag" TEXT,
ADD COLUMN     "sessionTitle" TEXT,
ADD COLUMN     "sineDie" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "special" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "yearEnd" INTEGER NOT NULL,
ADD COLUMN     "yearStart" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "LegislativeSession_id_seq";

-- AlterTable
ALTER TABLE "Legislator" DROP COLUMN "chamber",
ADD COLUMN     "legiscanId" INTEGER,
ADD COLUMN     "personHash" TEXT,
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "district" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "LegislatorInfo" DROP COLUMN "organizationId",
ADD COLUMN     "nickName" TEXT;

-- DropEnum
DROP TYPE "Chamber";

-- DropEnum
DROP TYPE "LegislativeSessionType";

-- CreateIndex
CREATE UNIQUE INDEX "LegislativeSession_id_state_key" ON "LegislativeSession"("id", "state");

-- CreateIndex
CREATE UNIQUE INDEX "Legislator_role_state_district_organizationId_key" ON "Legislator"("role", "state", "district", "organizationId");

-- CreateIndex
CREATE UNIQUE INDEX "LegislatorInfo_legislatorId_key" ON "LegislatorInfo"("legislatorId");
