/*
  Warnings:

  - A unique constraint covering the columns `[chamber,state,district,organizationId]` on the table `Legislator` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Legislator_firstName_lastName_state_district_organizationId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Legislator_chamber_state_district_organizationId_key" ON "Legislator"("chamber", "state", "district", "organizationId");
