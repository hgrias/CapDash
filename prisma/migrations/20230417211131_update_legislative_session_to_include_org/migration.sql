/*
  Warnings:

  - A unique constraint covering the columns `[id,state,organizationId]` on the table `LegislativeSession` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "LegislativeSession_id_state_key";

-- AlterTable
ALTER TABLE "LegislativeSession" ADD COLUMN     "legislatorId" TEXT,
ADD COLUMN     "organizationId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "LegislativeSession_id_state_organizationId_key" ON "LegislativeSession"("id", "state", "organizationId");

-- AddForeignKey
ALTER TABLE "LegislativeSession" ADD CONSTRAINT "LegislativeSession_legislatorId_fkey" FOREIGN KEY ("legislatorId") REFERENCES "Legislator"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LegislativeSession" ADD CONSTRAINT "LegislativeSession_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;
